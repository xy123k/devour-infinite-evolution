// ============================================================
//  render/canvas.js — 阶段 0：Canvas 初始化 + 绘制基础库
//  《吞噬·无限进化》TapTap Canvas 化渲染地基
//  依赖：无（可在浏览器 / TapTap 容器独立运行）
// ============================================================
(function () {
    'use strict';

    // ============================================================
    //  安全 DOM 辅助（阶段 5）：无 DOM 容器返回 null/[]，浏览器转发真实 document。
    //  game.js 的全部 document 引用已替换为这些函数（容器内 document 引用 0）。
    // ============================================================
    window.__gid = window.__gid || function (id) { try { return (typeof document !== 'undefined' && document.getElementById) ? document.getElementById(id) : null; } catch (e) { return null; } };
    window.__qs = window.__qs || function (sel) { try { return (typeof document !== 'undefined' && document.querySelector) ? document.querySelector(sel) : null; } catch (e) { return null; } };
    window.__qsa = window.__qsa || function (sel) { try { if (typeof document === 'undefined' || !document.querySelectorAll) return []; return Array.prototype.slice.call(document.querySelectorAll(sel)); } catch (e) { return []; } };
    window.__ce = window.__ce || function (tag) { try { return (typeof document !== 'undefined' && document.createElement) ? document.createElement(tag) : null; } catch (e) { return null; } };
    window.__qadd = window.__qadd || function (ev, fn, opt) { try { if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener(ev, fn, opt); } catch (e) {} };
    window.__qrm = window.__qrm || function (ev, fn, opt) { try { if (typeof document !== 'undefined' && document.removeEventListener) document.removeEventListener(ev, fn, opt); } catch (e) {} };

    // ============================================================
    //  0.1 Canvas 初始化（tt.createCanvas 优先，浏览器降级 DOM）
    // ============================================================
    const hasTT = typeof tt !== 'undefined';
    const isTTEnv = hasTT && typeof tt.createCanvas === 'function';

    // 屏幕尺寸：tt.getSystemInfoSync 优先，降级 window
    function getScreenSize() {
        if (hasTT && typeof tt.getSystemInfoSync === 'function') {
            try {
                const s = tt.getSystemInfoSync();
                if (s && s.windowWidth && s.windowHeight) {
                    return { w: s.windowWidth, h: s.windowHeight };
                }
            } catch (e) {}
        }
        return {
            w: (typeof window !== 'undefined' && window.innerWidth) || 375,
            h: (typeof window !== 'undefined' && window.innerHeight) || 667
        };
    }

    const size = getScreenSize();
    let SCREEN_W = size.w;
    let SCREEN_H = size.h;

    // 创建 canvas：容器环境用 tt.createCanvas，浏览器用 DOM
    let canvas;
    if (isTTEnv) {
        canvas = tt.createCanvas();
    } else {
        canvas = window.__gid('gameCanvas');
        if (!canvas) {
            canvas = window.__ce('canvas');
            canvas.id = 'gameCanvas';
            const _b = window.__qs('body');
            if (_b) _b.appendChild(canvas);
        }
    }

    // DPR 适配：物理像素 = 逻辑像素 × DPR
    const DPR = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    canvas.width = Math.round(SCREEN_W * DPR);
    canvas.height = Math.round(SCREEN_H * DPR);
    canvas.style.width = SCREEN_W + 'px';
    canvas.style.height = SCREEN_H + 'px';
    if (!isTTEnv) {
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '0'; // 位于 .container(z-index:1) 之下、body 背景之上
        canvas.style.pointerEvents = 'auto';
    }

    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    // ============================================================
    //  resize 适配（P1-4）：监听视口变化，重算画布尺寸（含 DPR）并触发当前界面重绘
    // ============================================================
    function handleResize() {
        const s = getScreenSize();
        if (!s.w || !s.h) return;
        SCREEN_W = s.w;
        SCREEN_H = s.h;
        canvas.width = Math.round(SCREEN_W * DPR);
        canvas.height = Math.round(SCREEN_H * DPR);
        if (canvas.style) {
            canvas.style.width = SCREEN_W + 'px';
            canvas.style.height = SCREEN_H + 'px';
        }
        // 重置变换后再按新 DPR 缩放（canvas 尺寸变化会重置画布状态）
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        // 清空文本测量/换行缓存（尺寸变化影响换行结果）
        if (typeof _measureCache !== 'undefined' && _measureCache.clear) _measureCache.clear();
        if (typeof _wrapCache !== 'undefined' && _wrapCache.clear) _wrapCache.clear();
        // 触发重绘（下一帧主循环自然重绘；这里显式清屏避免残影）
        clear();
    }
    if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('resize', handleResize);
    }

    // ============================================================
    //  主题系统（对应 index.html 的 dark / warm / light 三套 CSS 变量）
    //  Canvas 无法读 CSS 变量（容器内无 DOM），故内置配色表
    // ============================================================
    const THEMES = {
        dark: {
            bgPrimary: '#0a0e17', bgSecondary: '#111827', bgCard: '#1a2332',
            bgPopup: '#1e293b', bgHover: '#243044',
            textPrimary: '#e8f0f0', textSecondary: '#b8d0c8', textMuted: '#8a9a95', textFaint: '#5a6a65',
            accent: '#00d4aa', accentDark: '#00897b', success: '#66bb6a',
            warning: '#ffb74d', danger: '#ef5350', info: '#42a5f5', purple: '#ab47bc', orange: '#ff7043',
            quality: { common: '#9e9e9e', rare: '#42a5f5', epic: '#ab47bc', legendary: '#ffa726', mythic: '#ef5350' },
            border: '#2a3a4a', borderSoft: '#1e2e3e', borderAccent: 'rgba(0,212,170,0.3)',
            navGrad1: '#1a2332', navGrad2: '#0a0e17',
            overlay: 'rgba(0,0,0,0.78)'
        },
        warm: {
            bgPrimary: '#f5f0e6', bgSecondary: '#ece4d4', bgCard: '#faf6ee',
            bgPopup: '#fffdf8', bgHover: '#e6dcc8',
            textPrimary: '#3a322a', textSecondary: '#5a4f42', textMuted: '#7a6e5e', textFaint: '#9a8e7c',
            accent: '#a8724a', accentDark: '#8a5c38', success: '#a8924a',
            warning: '#c08a3a', danger: '#a84a4a', info: '#7a8aa8', purple: '#8a6a8a', orange: '#b8704a',
            quality: { common: '#8a7e6e', rare: '#7a8aa8', epic: '#8a6a8a', legendary: '#c08a3a', mythic: '#a84a4a' },
            border: '#d8cdb8', borderSoft: '#e6dcc8', borderAccent: 'rgba(168,114,74,0.35)',
            navGrad1: '#fffdf8', navGrad2: '#f5f0e6',
            overlay: 'rgba(58,50,42,0.5)'
        },
        light: {
            bgPrimary: '#f8f9fa', bgSecondary: '#eef1f5', bgCard: '#ffffff',
            bgPopup: '#ffffff', bgHover: '#e8edf2',
            textPrimary: '#1f2937', textSecondary: '#4b5563', textMuted: '#6b7280', textFaint: '#9ca3af',
            accent: '#059669', accentDark: '#047857', success: '#16a34a',
            warning: '#d97706', danger: '#dc2626', info: '#2563eb', purple: '#7c3aed', orange: '#ea580c',
            quality: { common: '#6b7280', rare: '#2563eb', epic: '#7c3aed', legendary: '#d97706', mythic: '#dc2626' },
            border: '#d1d5db', borderSoft: '#e5e7eb', borderAccent: 'rgba(5,150,105,0.3)',
            navGrad1: '#ffffff', navGrad2: '#f8f9fa',
            overlay: 'rgba(15,23,42,0.5)'
        }
    };

    let _themeName = 'dark';
    if (!isTTEnv && typeof window !== 'undefined' && window.localStorage) {
        try {
            const saved = window.localStorage.getItem('tunshi_theme');
            if (saved && THEMES[saved]) _themeName = saved;
        } catch (e) {}
    }

    const Theme = {
        name: _themeName,
        get(name) {
            return THEMES[_themeName] || THEMES.dark;
        },
        set(name) {
            if (THEMES[name]) _themeName = name;
            // 同步 DOM 主题（浏览器里保持 CSS 变量一致）
            if (!isTTEnv && typeof document !== 'undefined') {
                document.documentElement.setAttribute('data-theme', _themeName);
            }
        }
    };

    // ============================================================
    //  0.2 绘制基础库
    // ============================================================

    // ---- 工具：颜色混合（按压态变暗用）----
    function shade(hex, ratio) {
        // ratio > 0 变亮，< 0 变暗；hex: #rrggbb 或 rgba(...)（rgba 原样返回）
        if (!hex || hex.indexOf('rgba') === 0) return hex;
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        const num = parseInt(hex, 16);
        let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
        if (ratio > 0) {
            r = Math.round(r + (255 - r) * ratio);
            g = Math.round(g + (255 - g) * ratio);
            b = Math.round(b + (255 - b) * ratio);
        } else {
            r = Math.round(r * (1 + ratio));
            g = Math.round(g * (1 + ratio));
            b = Math.round(b * (1 + ratio));
        }
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    // ---- 圆角矩形路径 ----
    function roundRectPath(c, x, y, w, h, r) {
        if (typeof c.roundRect === 'function') {
            c.beginPath();
            c.roundRect(x, y, w, h, r);
            return;
        }
        // 手写路径（兼容无 roundRect 的环境）
        const rr = Math.min(r, w / 2, h / 2);
        c.beginPath();
        c.moveTo(x + rr, y);
        c.lineTo(x + w - rr, y);
        c.arcTo(x + w, y, x + w, y + rr, rr);
        c.lineTo(x + w, y + h - rr);
        c.arcTo(x + w, y + h, x + w - rr, y + h, rr);
        c.lineTo(x + rr, y + h);
        c.arcTo(x, y + h, x, y + h - rr, rr);
        c.lineTo(x, y + rr);
        c.arcTo(x, y, x + rr, y, rr);
        c.closePath();
    }

    // ---- drawRect / drawRoundRect ----
    // opt: {fill, stroke, lineWidth, radius}
    function drawRect(x, y, w, h, opt) {
        opt = opt || {};
        const radius = opt.radius || 0;
        ctx.save();
        if (radius > 0) {
            roundRectPath(ctx, x, y, w, h, radius);
            if (opt.fill) { ctx.fillStyle = opt.fill; ctx.fill(); }
            if (opt.stroke) {
                ctx.strokeStyle = opt.stroke;
                ctx.lineWidth = opt.lineWidth || 1;
                ctx.stroke();
            }
        } else {
            if (opt.fill) { ctx.fillStyle = opt.fill; ctx.fillRect(x, y, w, h); }
            if (opt.stroke) {
                ctx.strokeStyle = opt.stroke;
                ctx.lineWidth = opt.lineWidth || 1;
                ctx.strokeRect(x + ctx.lineWidth / 2, y + ctx.lineWidth / 2, w - ctx.lineWidth, h - ctx.lineWidth);
            }
        }
        ctx.restore();
    }

    // 简写：纯填充矩形
    function fillRect(x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    // ---- 文本测量与换行 ----
    let _fontCache = '';
    function setFont(fontSize, bold) {
        const f = (bold ? 'bold ' : '') + fontSize + 'px "PingFang SC","Microsoft YaHei","Helvetica Neue",sans-serif';
        if (f !== _fontCache) {
            ctx.font = f;
            _fontCache = f;
        }
    }

    // ---- 文本测量/换行缓存（性能：主循环每帧重复绘制，避免重复 measureText）----
    const _measureCache = new Map();
    const _wrapCache = new Map();
    const _MEASURE_MAX = 4000;
    const _WRAP_MAX = 3000;

    // 缓存淘汰：超上限时只删最早一半（整表 clear 会引发一次性大 GC 卡顿）
    function trimCache(map, max) {
        if (map.size <= max) return;
        const toRemove = Math.floor(map.size / 2);
        let i = 0;
        for (const k of map.keys()) {
            if (i >= toRemove) break;
            map.delete(k);
            i++;
        }
    }

    function measureText(text, fontSize, bold) {
        const key = (bold ? 'b' : 'n') + fontSize + '|' + String(text);
        const hit = _measureCache.get(key);
        setFont(fontSize, bold);   // 保持 ctx.font 状态一致（_fontCache 同 font 时零开销）
        if (hit !== undefined) return hit;
        trimCache(_measureCache, _MEASURE_MAX);
        const w = ctx.measureText(String(text)).width;
        _measureCache.set(key, w);
        return w;
    }

    // 自动换行：优先空格断词，超宽再按字符断；返回行数组（带缓存）
    function wrapText(text, maxWidth, fontSize, bold) {
        const str = String(text == null ? '' : text);
        const key = (bold ? 'b' : 'n') + fontSize + '|' + maxWidth + '|' + str;
        const hit = _wrapCache.get(key);
        if (hit) return hit;
        const lines = [];
        // 先按显式换行符分段
        const paragraphs = str.split('\n');
        for (let p = 0; p < paragraphs.length; p++) {
            const para = paragraphs[p];
            // 按空格分词
            const words = para.split(' ');
            let line = '';
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const test = line ? line + ' ' + word : word;
                if (measureText(test, fontSize, bold) <= maxWidth || !line) {
                    line = test;
                } else {
                    // 行已满：先尝试按字符硬断超长词
                    if (measureText(word, fontSize, bold) > maxWidth) {
                        // 把当前行推出去，逐字符断该词
                        if (line) { lines.push(line); line = ''; }
                        let chunk = '';
                        for (const ch of word) {
                            if (measureText(chunk + ch, fontSize, bold) <= maxWidth) {
                                chunk += ch;
                            } else {
                                lines.push(chunk);
                                chunk = ch;
                            }
                        }
                        line = chunk;
                    } else {
                        lines.push(line);
                        line = word;
                    }
                }
            }
            if (line) lines.push(line);
        }
        trimCache(_wrapCache, _WRAP_MAX);
        _wrapCache.set(key, lines);
        return lines;
    }

    // ---- drawText：自动换行 + 对齐 + 截断 ----
    // opt: {x, y, fontSize, color, bold, align, baseline, maxWidth, lineHeight, maxLines}
    // 返回实际行数
    function drawText(text, x, y, opt) {
        opt = opt || {};
        const fontSize = opt.fontSize || 14;
        const color = opt.color || '#e8f0f0';
        const bold = !!opt.bold;
        const align = opt.align || 'left';
        const baseline = opt.baseline || 'top';
        const maxWidth = opt.maxWidth;
        const lineHeight = opt.lineHeight || Math.round(fontSize * 1.4);
        const maxLines = opt.maxLines || 0;

        let lines;
        if (maxWidth) {
            lines = wrapText(text, maxWidth, fontSize, bold);
        } else {
            lines = String(text == null ? '' : text).split('\n');
        }

        let truncated = false;
        if (maxLines > 0 && lines.length > maxLines) {
            lines = lines.slice(0, maxLines);
            // 最后一行加省略号（若放得下）
            const last = lines[maxLines - 1];
            const ellipsis = '…';
            if (measureText(last + ellipsis, fontSize, bold) <= (maxWidth || 1e9)) {
                lines[maxLines - 1] = last + ellipsis;
            } else {
                // 截断到省略号
                let t = last;
                while (t.length > 0 && measureText(t + ellipsis, fontSize, bold) > (maxWidth || 1e9)) {
                    t = t.slice(0, -1);
                }
                lines[maxLines - 1] = t + ellipsis;
            }
            truncated = true;
        }

        setFont(fontSize, bold);
        ctx.fillStyle = color;
        ctx.textBaseline = baseline;

        let startY = y;
        if (baseline === 'middle') startY = y - (lines.length - 1) * lineHeight / 2;
        else if (baseline === 'bottom') startY = y - (lines.length - 1) * lineHeight;

        for (let i = 0; i < lines.length; i++) {
            let tx = x;
            if (align === 'center') tx = x - measureText(lines[i], fontSize, bold) / 2;
            else if (align === 'right') tx = x - measureText(lines[i], fontSize, bold);
            ctx.fillText(lines[i], tx, startY + i * lineHeight);
        }
        return lines.length;
    }

    // ---- 线性渐变工具 ----
    function linearGrad(x, y, w, h, from, to, vertical) {
        const g = vertical
            ? ctx.createLinearGradient(x, y, x, y + h)
            : ctx.createLinearGradient(x, y, x + w, y);
        g.addColorStop(0, from);
        g.addColorStop(1, to);
        return g;
    }

    // ---- drawBar：血条/进度条 ----
    // opt: {fg, bg, text, textColor, fontSize, radius, border, borderColor, height, showText, pctText}
    // pct: 0-1
    function drawBar(x, y, w, h, pct, opt) {
        opt = opt || {};
        const t = Theme.get();
        const bg = opt.bg || 'rgba(0,0,0,0.35)';
        const fg = opt.fg || t.danger;
        const radius = opt.radius == null ? Math.min(h / 2, 6) : opt.radius;
        const clamped = Math.max(0, Math.min(1, pct || 0));

        // 底槽
        drawRect(x, y, w, h, { fill: bg, radius: radius });
        // 填充（宽度为 0 时跳过）
        if (clamped > 0.005) {
            const fw = Math.max(2, w * clamped);
            if (opt.gradient) {
                drawRect(x, y, fw, h, { fill: linearGrad(x, y, fw, h, opt.gradient.from, opt.gradient.to), radius: radius });
            } else {
                drawRect(x, y, fw, h, { fill: fg, radius: radius });
            }
        }
        if (opt.border) {
            drawRect(x, y, w, h, { stroke: opt.borderColor || opt.border, lineWidth: 1, radius: radius });
        }
        // 文字
        if (opt.showText || opt.text != null) {
            const txt = opt.text != null ? String(opt.text) : Math.round(clamped * 100) + '%';
            const txtColor = opt.textColor || '#ffffff';
            const fs = opt.fontSize || Math.max(10, Math.min(h - 4, 12));
            drawText(txt, x + w / 2, y + h / 2, { fontSize: fs, color: txtColor, align: 'center', baseline: 'middle', bold: true });
        }
    }

    // ---- drawButton：按钮（带按压态）----
    // 注册到 Input.buttons；返回按钮 id
    // opt: {id, x, y, w, h, text, fontSize, color, bg, bgPressed, radius, border, borderColor, onTap, disabled, icon, subText}
    function drawButton(opt) {
        const t = Theme.get();
        const Input = window.Input;
        const id = opt.id || ('btn_' + (drawButton._seq = (drawButton._seq || 0) + 1));
        const pressed = Input && Input.isPressed(id) && !opt.disabled;
        // P3-5：桌面悬停反馈（按钮悬停提亮）
        const hovered = !opt.disabled && !pressed && Input && Input._hoverId === id;

        const bg = opt.disabled ? (opt.bgDisabled || 'rgba(90,106,101,0.35)')
            : (pressed ? (opt.bgPressed || shade(opt.bg || t.accent, -0.2))
                : (hovered ? shade(opt.bg || t.accent, 0.14) : (opt.bg || t.accent)));
        const color = opt.disabled ? (opt.colorDisabled || '#8a9a95') : (opt.color || '#0a0e17');
        const radius = opt.radius == null ? 8 : opt.radius;

        // 注册（Input 存在时）
        if (Input && typeof Input.registerButton === 'function') {
            Input.registerButton({
                id: id, x: opt.x, y: opt.y, w: opt.w, h: opt.h,
                onTap: opt.onTap, disabled: !!opt.disabled
            });
        }

        drawRect(opt.x, opt.y, opt.w, opt.h, {
            fill: bg,
            stroke: opt.border || null,
            lineWidth: opt.borderWidth || 1,
            radius: radius
        });
        // 主文字
        if (opt.text != null) {
            const fs = opt.fontSize || 15;
            if (opt.subText) {
                drawText(opt.text, opt.x + opt.w / 2, opt.y + opt.h / 2 - (opt.fontSize || 15) * 0.45, {
                    fontSize: fs, color: color, align: 'center', baseline: 'middle', bold: true
                });
                drawText(opt.subText, opt.x + opt.w / 2, opt.y + opt.h / 2 + (opt.fontSize || 15) * 0.55, {
                    fontSize: Math.max(10, fs - 3), color: color, align: 'center', baseline: 'middle'
                });
            } else {
                drawText(opt.text, opt.x + opt.w / 2, opt.y + opt.h / 2, {
                    fontSize: fs, color: color, align: 'center', baseline: 'middle', bold: true
                });
            }
        }
        return id;
    }

    // ---- drawList：滚动列表（视口裁剪 + 拖拽滚动）----
    // 注册到 Input.lists；返回 list id
    // opt: {id, x, y, w, h, itemH, items, drawItem(item, index, x, y, w), onTap(item, index), gap}
    function drawList(opt) {
        const Input = window.Input;
        const id = opt.id || ('list_' + (drawList._seq = (drawList._seq || 0) + 1));
        const gap = opt.gap || 0;
        const itemH = opt.itemH || 40;

        // 注册/更新到 Input
        if (Input && typeof Input.registerList === 'function') {
            Input.registerList({
                id: id, x: opt.x, y: opt.y, w: opt.w, h: opt.h,
                itemH: itemH, gap: gap, items: opt.items,
                onTap: opt.onTap
            });
        }
        const state = Input && Input.getListState(id);
        const offsetY = state ? state.offsetY : 0;

        // 裁剪视口
        ctx.save();
        ctx.beginPath();
        ctx.rect(opt.x, opt.y, opt.w, opt.h);
        ctx.clip();

        // 计算可见范围
        const totalH = opt.items.length * (itemH + gap) - gap;
        const maxOffset = Math.max(0, totalH - opt.h);
        const clampedOffset = Math.min(maxOffset, Math.max(0, offsetY));

        const firstIdx = Math.max(0, Math.floor(clampedOffset / (itemH + gap)));
        const visibleCount = Math.ceil(opt.h / (itemH + gap)) + 1;
        const yStart = opt.y - clampedOffset + firstIdx * (itemH + gap);

        for (let i = 0; i < visibleCount; i++) {
            const idx = firstIdx + i;
            if (idx >= opt.items.length) break;
            const iy = yStart + i * (itemH + gap);
            // 超出视口上下界的跳过（防止绘制过多）
            if (iy + itemH < opt.y || iy > opt.y + opt.h) continue;
            try {
                opt.drawItem(opt.items[idx], idx, opt.x, iy, opt.w, itemH);
            } catch (e) {
                if (typeof console !== 'undefined') console.error('drawItem error', e);
            }
        }
        ctx.restore();

        // 内容不足时允许下拉回弹的提示条（可选）
        return id;
    }

    // ---- drawModal：模态弹窗（一次绘制原语）----
    // opt: {title, content(字符串或渲染函数), buttons:[{text,color,onTap,bg}], width, onClose, showClose, contentHeight}
    // 返回面板矩形
    function drawModal(opt) {
        const t = Theme.get();
        const w = opt.width || Math.min(340, SCREEN_W - 40);
        // 内容高度：字符串按行数估算，函数给固定高度
        let contentH = opt.contentHeight || 0;
        if (typeof opt.content === 'string' && !contentH) {
            const fs = opt.contentFontSize || 14;
            const lineH = Math.round(fs * 1.6);
            const lines = wrapText(opt.content, w - 36, fs, false).length;
            contentH = Math.min(lines * lineH + 20, SCREEN_H * 0.55);
        }
        const titleH = opt.title ? 46 : 10;
        const btnH = opt.buttons && opt.buttons.length ? 46 : 0;
        const pad = 16;
        const h = titleH + contentH + btnH + pad * 2;
        const x = (SCREEN_W - w) / 2;
        const y = Math.max(10, (SCREEN_H - h) / 2);

        // 遮罩
        drawRect(0, 0, SCREEN_W, SCREEN_H, { fill: t.overlay });
        // 面板
        drawRect(x, y, w, h, { fill: t.bgPopup, radius: 12, stroke: t.border, lineWidth: 1 });
        // 标题
        if (opt.title) {
            drawText(opt.title, x + w / 2, y + 14, { fontSize: 17, color: t.textPrimary, align: 'center', bold: true });
            drawRect(x + 16, y + titleH - 1, w - 32, 1, { fill: t.borderSoft });
        }
        // 内容
        let contentY = y + titleH + 6;
        if (typeof opt.content === 'string') {
            drawText(opt.content, x + 18, contentY, {
                fontSize: opt.contentFontSize || 14, color: t.textSecondary,
                maxWidth: w - 36, lineHeight: Math.round((opt.contentFontSize || 14) * 1.6)
            });
        } else if (typeof opt.content === 'function') {
            opt.content(x + 18, contentY, w - 36, contentH);
        }
        // 按钮
        if (opt.buttons && opt.buttons.length) {
            const btnY = y + h - btnH - pad;
            if (opt.buttons.length === 1) {
                const b = opt.buttons[0];
                drawButton({
                    id: opt.idPrefix ? opt.idPrefix + '_btn0' : null,
                    x: x + 16, y: btnY, w: w - 32, h: 38,
                    text: b.text, bg: b.bg || t.accent, color: b.color || '#0a0e17',
                    fontSize: 15, onTap: b.onTap
                });
            } else {
                const btnW = (w - 32 - 10 * (opt.buttons.length - 1)) / opt.buttons.length;
                opt.buttons.forEach((b, i) => {
                    drawButton({
                        id: opt.idPrefix ? opt.idPrefix + '_btn' + i : null,
                        x: x + 16 + i * (btnW + 10), y: btnY, w: btnW, h: 38,
                        text: b.text, bg: b.bg || t.accent, color: b.color || '#0a0e17',
                        fontSize: 14, onTap: b.onTap
                    });
                });
            }
        }
        // 关闭按钮
        if (opt.showClose && typeof opt.onClose === 'function') {
            const cx = x + w - 24, cy = y + 22;
            drawRect(cx - 10, cy - 10, 20, 20, { radius: 10 });
            ctx.strokeStyle = t.textMuted;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(cx - 4, cy - 4); ctx.lineTo(cx + 4, cy + 4);
            ctx.moveTo(cx + 4, cy - 4); ctx.lineTo(cx - 4, cy + 4);
            ctx.stroke();
            const Input = window.Input;
            if (Input && typeof Input.registerButton === 'function') {
                Input.registerButton({
                    id: (opt.idPrefix || 'modal') + '_close', x: cx - 12, y: cy - 12, w: 24, h: 24,
                    onTap: opt.onClose, disabled: false
                });
            }
        }
        return { x: x, y: y, w: w, h: h };
    }

    // ---- 模态框状态管理（主循环每帧绘制，避免被清屏抹掉）----
    let _currentModal = null;
    function showModal(opt) { _currentModal = opt; }
    function closeModal() { _currentModal = null; }
    function drawModalLayer() {
        if (_currentModal) drawModal(_currentModal);
    }

    // ---- drawToast：轻提示（队列自动消失）----
    const _toasts = [];
    function toast(text, duration, color) {
        _toasts.push({ text: String(text), t: Date.now(), duration: duration || 1800, color: color || null });
        if (_toasts.length > 3) _toasts.shift();
    }
    function drawToasts() {
        const t = Theme.get();
        const now = Date.now();
        for (let i = _toasts.length - 1; i >= 0; i--) {
            const item = _toasts[i];
            const age = now - item.t;
            if (age > item.duration) { _toasts.splice(i, 1); continue; }
            const alpha = age < 150 ? age / 150 : (item.duration - age < 300 ? Math.max(0, (item.duration - age) / 300) : 1);
            const w = Math.min(SCREEN_W - 40, measureText(item.text, 14, false) + 44);
            const h = 40;
            const x = (SCREEN_W - w) / 2;
            const y = SCREEN_H * 0.22;
            ctx.save();
            ctx.globalAlpha = alpha;
            drawRect(x, y, w, h, { fill: 'rgba(10,14,23,0.88)', radius: 20, stroke: t.borderAccent, lineWidth: 1 });
            drawText(item.text, x + w / 2, y + h / 2, {
                fontSize: 14, color: item.color || t.textPrimary, align: 'center', baseline: 'middle'
            });
            ctx.restore();
        }
    }

    // ---- 清屏 ----
    function clear(bg) {
        ctx.fillStyle = bg || Theme.get().bgPrimary;
        ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
    }

    // ============================================================
    //  SVG 图标绘制（P2-2）：把 game.icons 的 SVG 字符串缓存为 Image(data:image/svg+xml)
    //  供 Canvas 直绘界面（顶栏/商店/按钮等）使用；图标异步加载，主循环重绘后自然显示。
    // ============================================================
    const iconCache = new Map();
    function drawIcon(name, x, y, size, color) {
        if (!ctx) return false;
        const g = (typeof game !== 'undefined') ? game : null;
        const svg = g && g.icons ? g.icons[name] : null;
        if (!svg) return false;
        const key = name + '|' + (color || '#ffffff') + '|' + size;
        let img = iconCache.get(key);
        if (!img) {
            // P2-2：SVG 字符串缺 xmlns/width/height 时浏览器拒绝加载或尺寸为 0，补全后再编码
            const colored = svg
                .replace(/currentColor/g, color || '#ffffff')
                .replace(/<svg /, '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" ');
            img = new Image();
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(colored);
            iconCache.set(key, img);
        }
        if (img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, x, y, size, size);
            return true;
        }
        return false;
    }
    function clearIconCache() { iconCache.clear(); }

    // ============================================================
    //  性能管理（P0-2）：低性能环境（软件渲染/低端机）自动降低特效复杂度
    //  quality: 'high' | 'low'；由 ScreenManager 主循环帧耗时统计自动切换，
    //  也可按硬件信号（低核数/小内存）初始降级。
    // ============================================================
    let _quality = 'high';
    (function detectLowPerf() {
        try {
            if (typeof navigator !== 'undefined') {
                const hc = navigator.hardwareConcurrency;
                if (hc && hc <= 2) { _quality = 'low'; return; }
                const dm = navigator.deviceMemory;
                if (dm && dm <= 2) { _quality = 'low'; return; }
            }
        } catch (e) {}
    })();
    function setQuality(q) {
        if (q === 'high' || q === 'low') _quality = q;
    }
    function isLowQuality() { return _quality === 'low'; }

    // ============================================================
    //  导出
    // ============================================================
    window.Render = {
        canvas: canvas,
        ctx: ctx,
        get SCREEN_W() { return SCREEN_W; },
        get SCREEN_H() { return SCREEN_H; },
        DPR: DPR,
        isTTEnv: isTTEnv,
        Theme: Theme,
        // 绘制
        clear: clear,
        drawRect: drawRect,
        fillRect: fillRect,
        drawText: drawText,
        wrapText: wrapText,
        measureText: measureText,
        drawBar: drawBar,
        drawButton: drawButton,
        drawList: drawList,
        drawModal: drawModal,
        showModal: showModal,
        closeModal: closeModal,
        drawModalLayer: drawModalLayer,
        toast: toast,
        drawToasts: drawToasts,
        linearGrad: linearGrad,
        shade: shade,
        setFont: setFont,
        roundRectPath: roundRectPath,
        // SVG 图标（P2-2）
        drawIcon: drawIcon,
        clearIconCache: clearIconCache,
        // 性能管理（P0-2）
        get quality() { return _quality; },
        setQuality: setQuality,
        get isLowQuality() { return isLowQuality(); }
    };
})();
