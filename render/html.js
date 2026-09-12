// ============================================================
//  render/html.js — 阶段 4：轻量 HTML 子集弹窗渲染器
//  《吞噬·无限进化》
//  用途：在 Canvas 模式下渲染 showPopup(html) 传入的弹窗内容，
//        支持游戏弹窗常用的标签与内联样式子集。
//  设计：HTML 字符串 → 节点树 → 自动布局（块/纵向、flex/横向、
//        grid/两列）→ Canvas 绘制 + 点击命中。
// ============================================================
(function () {
    'use strict';

    const R = window.Render;
    const Input = window.Input;

    // ---------------- HTML 解析（轻量） ----------------
    // 支持标签：div/span/button/h2/h3/p/br/strong/b
    // 忽略：svg（整体剔除）、script/style
    function parseHTML(html) {
        // 剔除 svg/script/style 块
        html = String(html || '').replace(/<svg[\s\S]*?<\/svg>/gi, '');
        html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
        html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
        // 解析标签栈（属性整体捕获后由 attrRe 拆解；[^>]* 假设属性值不含 >）
        const root = { tag: 'root', children: [], style: {}, attrs: {} };
        const stack = [root];
        const tagRe = /<(\/)?([a-zA-Z0-9]+)([^>]*?)(\/?)>/g;
        let lastIndex = 0;
        let m;
        while ((m = tagRe.exec(html)) !== null) {
            // 标签前文本
            if (m.index > lastIndex) {
                const text = html.slice(lastIndex, m.index).replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
                if (text.trim()) stack[stack.length - 1].children.push({ tag: '#text', text: text });
            }
            lastIndex = tagRe.lastIndex;
            const closing = m[1] === '/';
            const tag = m[2].toLowerCase();
            if (closing) {
                // 弹出到匹配标签
                for (let i = stack.length - 1; i > 0; i--) {
                    if (stack[i].tag === tag) { stack.length = i; break; }
                }
                continue;
            }
            const attrsRaw = m[3] || '';
            const attrs = {};
            const attrRe = /([a-zA-Z-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
            let am;
            while ((am = attrRe.exec(attrsRaw)) !== null) {
                attrs[am[1].toLowerCase()] = am[3] != null ? am[3] : (am[4] != null ? am[4] : (am[5] != null ? am[5] : ''));
            }
            const node = { tag: tag, children: [], style: parseStyle(attrs.style), attrs: attrs };
            stack[stack.length - 1].children.push(node);
            if (m[4] !== '/' && tag !== 'br' && tag !== 'img' && tag !== 'input') {
                stack.push(node);
            }
        }
        if (lastIndex < html.length) {
            const text = html.slice(lastIndex).replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            if (text.trim()) root.children.push({ tag: '#text', text: text });
        }
        return root;
    }

    function parseStyle(s) {
        const out = {};
        if (!s) return out;
        s.split(';').forEach(function (kv) {
            const idx = kv.indexOf(':');
            if (idx < 0) return;
            const k = kv.slice(0, idx).trim().toLowerCase();
            const v = kv.slice(idx + 1).trim();
            if (k) out[k] = v;
        });
        return out;
    }

    // ---------------- 布局 ----------------
    // 返回 {width, height, nodes:[{node,x,y,w,h,line}]}
    function layout(root, maxW) {
        const result = { width: maxW, height: 0, nodes: [] };
        const bottom = layoutBlock(root, 0, 0, maxW, result);
        result.height = Math.max(result.height, bottom);
        return result;
    }

    function textLines(node, maxW, fontSize) {
        const text = node.text || '';
        if (!text) return [''];
        const lines = [];
        let cur = '';
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === '\n') { lines.push(cur); cur = ''; continue; }
            cur += ch;
            if (R.ctx.measureText(cur).width > maxW) {
                // 回退到最后一个空格
                const sp = cur.lastIndexOf(' ');
                if (sp > 0) { lines.push(cur.slice(0, sp)); cur = cur.slice(sp + 1); }
                else { lines.push(cur); cur = ''; }
            }
        }
        if (cur || lines.length === 0) lines.push(cur);
        return lines;
    }

    function fontSizeOf(node, def) {
        const fs = node.style['font-size'];
        if (!fs) return def;
        const n = parseFloat(fs);
        return isNaN(n) ? def : n;
    }

    function colorOf(node, def) {
        const c = node.style.color;
        if (!c) return def;
        if (c.indexOf('var(') === 0) {
            const t = R.Theme.get();
            const name = c.replace('var(', '').replace(')', '').trim();
            const map = { '--accent-warning': t.warning, '--accent-success': t.success, '--accent-info': t.info, '--accent-danger': t.danger, '--accent-purple': t.purple, '--accent-primary': t.accent, '--text-primary': t.textPrimary, '--text-secondary': t.textSecondary, '--text-muted': t.textMuted, '--text-faint': t.textFaint, '--quality-common': t.textSecondary, '--quality-rare': t.info, '--quality-epic': t.purple, '--accent-orange': t.orange, '--bg-card': t.bgCard, '--bg-secondary': t.bgSecondary, '--bg-primary': t.bgPrimary, '--border-primary': t.borderSoft, '--border-secondary': t.borderSoft, '--accent-success': t.success };
            return map[name] || def;
        }
        return c;
    }

    function bgColorOf(node) {
        const b = node.style.background || node.style['background-color'];
        if (!b) return null;
        if (b.indexOf('var(') === 0) {
            const t = R.Theme.get();
            const name = b.replace('var(', '').replace(')', '').trim();
            const map = { '--bg-card': t.bgCard, '--bg-secondary': t.bgSecondary, '--bg-primary': t.bgPrimary, '--accent-success': t.success, '--accent-warning': t.warning, '--accent-danger': t.danger, '--accent-purple': t.purple, '--accent-info': t.info, '--accent-primary': t.accent, '--text-faint': t.textFaint, '--accent-orange': t.orange, '--quality-rare': t.info };
            return map[name] || null;
        }
        if (b.indexOf('linear-gradient') === 0) return null;
        return b;
    }

    function paddingOf(node) {
        const p = node.style;
        function px(v, def) { if (!v) return def; const n = parseFloat(v); return isNaN(n) ? def : n; }
        return {
            top: px(p['padding-top'], px(p.padding, 0)),
            right: px(p['padding-right'], px(p.padding, 0)),
            bottom: px(p['padding-bottom'], px(p.padding, 0)),
            left: px(p['padding-left'], px(p.padding, 0))
        };
    }

    function marginTop(node) { const v = node.style['margin-top']; const n = parseFloat(v || '0'); return isNaN(n) ? 0 : n; }
    function marginBottom(node) { const v = node.style['margin-bottom']; const n = parseFloat(v || '0'); return isNaN(n) ? 0 : n; }

    function pushItem(node, x, y, w, h, result, extra) {
        if (node.tag === '#text' || node.tag === 'br' || node.tag === 'root') return;
        const item = { node: node, x: x, y: y, w: w, h: h };
        if (extra) Object.assign(item, extra);
        result.nodes.push(item);
    }

    function layoutBlock(node, x, y, w, result) {
        node.style = node.style || {};
        node.attrs = node.attrs || {};
        // display:none：不占空间、不绘制
        if (node.style.display === 'none' && node.tag !== 'root') {
            result.height = Math.max(result.height, y);
            return y;
        }
        const pad = paddingOf(node);
        let cursorY = y + pad.top + marginTop(node);
        const innerW = w - pad.left - pad.right;

        if (node.tag === 'br') { result.height = Math.max(result.height, y + 14); return y + 14; }
        if (node.tag === '#text') {
            const fs = fontSizeOf(node, 13);
            const lines = textLines(node, innerW, fs);
            const h = lines.length * (fs + 5);
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: innerW, h: h, lines: lines, fs: fs });
            return cursorY + h + pad.bottom + marginBottom(node);
        }

        // 计算子元素
        const display = node.style.display || '';
        const flex = display === 'flex' || display === 'inline-flex';
        const grid = display === 'grid';

        if (flex) {
            const gap = parseFloat(node.style.gap || '0') || 0;
            node.children.forEach(function (cc) { cc.style = cc.style || {}; cc.attrs = cc.attrs || {}; });
            const items = node.children.filter(function (c) { return !(c.tag === '#text' && !c.text.trim()); });
            const flexCount = items.filter(function (c) { return c.style.flex || c.style['flex:1'] || c.style.flex === '1'; }).length;
            const fixedTotal = items.reduce(function (sum, c) { const f = c.style.flex; if (f && f !== '1') return sum + parseFloat(f); return sum; }, 0);
            const autoW = (innerW - (items.length - 1) * gap - fixedTotal) / Math.max(1, flexCount || items.length);
            let cx = x + pad.left;
            let maxH = 0;
            items.forEach(function (child) {
                let cw = autoW;
                if (child.style.flex && child.style.flex !== '1') cw = parseFloat(child.style.flex) || autoW;
                if (child.style.width) { const n = parseFloat(child.style.width); if (!isNaN(n)) cw = n; }
                if (child.style['min-width']) { const n = parseFloat(child.style['min-width']); if (!isNaN(n)) cw = Math.max(cw, n); }
                const ch = layoutBlock(child, cx, cursorY, cw, result);
                maxH = Math.max(maxH, ch - cursorY);
                cx += cw + gap;
            });
            const h = maxH + pad.bottom + marginBottom(node);
            pushItem(node, x, y, w, h, result);
            return cursorY + h;
        }

        if (grid) {
            const colsRaw = node.style['grid-template-columns'] || '1fr 1fr';
            const colCount = Math.max(1, (colsRaw.match(/1fr/g) || []).length || 1);
            const gap = parseFloat(node.style.gap || '0') || 0;
            const colW = (innerW - (colCount - 1) * gap) / colCount;
            node.children.forEach(function (cc) { cc.style = cc.style || {}; cc.attrs = cc.attrs || {}; });
            const items = node.children.filter(function (c) { return !(c.tag === '#text' && !c.text.trim()); });
            let rowY = cursorY;
            let maxRowH = 0;
            items.forEach(function (child, i) {
                const col = i % colCount;
                if (col === 0 && i > 0) { rowY += maxRowH + gap; maxRowH = 0; }
                const ch = layoutBlock(child, x + pad.left + col * (colW + gap), rowY, colW, result);
                maxRowH = Math.max(maxRowH, ch - rowY);
            });
            const h = maxRowH + pad.bottom + marginBottom(node);
            pushItem(node, x, y, w, h, result);
            return rowY + h;
        }

        // 块级：纵向堆叠
        let by = cursorY;
        node.children.forEach(function (child) {
            by = layoutBlock(child, x + pad.left, by, innerW, result);
        });
        const bh = by + pad.bottom + marginBottom(node);
        pushItem(node, x, y, w, bh - y, result);
        return bh;
    }

    // 抽奖动画模拟：逻辑层 goldGacha 的 interval 依赖 DOM（无 document 时不推进），
    // 渲染层按时间推进进度条/状态文本，100% 后显示结果摘要
    function animateGacha(root) {
        if (!state.openedAt) state.openedAt = Date.now();
        const flat = [];
        (function walk(n) { flat.push(n); (n.children || []).forEach(walk); })(root);
        const byId = {};
        flat.forEach(function (n) { if (n.attrs && n.attrs.id) byId[n.attrs.id] = n; });
        const prog = byId.gachaProgress;
        if (!prog) return;
        const elapsed = Date.now() - state.openedAt;
        const dur = 1200; // 单抽动画时长（十连 2000，html 内无法区分，统一 1200 可接受）
        const p = Math.min(100, (elapsed / dur) * 100);
        prog.style.width = Math.floor(p) + '%';
        const pt = byId.gachaProgressText;
        if (pt && pt.children && pt.children[0] && pt.children[0].tag === '#text') pt.children[0].text = Math.floor(p) + '%';
        const st = byId.gachaStatus;
        if (st && st.children && st.children[0] && st.children[0].tag === '#text') {
            const statuses = ['正在提取基因片段...', '正在分析基因品质...'];
            st.children[0].text = statuses[Math.min(statuses.length - 1, Math.floor(p / (100 / statuses.length)))];
        }
        const sum = byId.gachaSummary;
        if (sum) {
            if (p >= 100) { sum.style.display = 'block'; state.gachaDone = true; }
            else if (!state.gachaDone) sum.style.display = 'none';
        }
        const dna = byId.gachaDna;
        if (dna && p >= 100) { /* 静止即可 */ }
    }

    // ---------------- 绘制 ----------------
    function drawNode(n, x, y, w, h) {
        const t = R.Theme.get();
        const node = n.node;
        if (node.tag === '#text') {
            const align = node.style['text-align'] || 'left';
            let ax = x;
            if (align === 'center') ax = x + w / 2;
            else if (align === 'right') ax = x + w;
            n.lines.forEach(function (ln, i) {
                R.drawText(ln, ax, y + i * (n.fs + 5), {
                    fontSize: n.fs,
                    color: colorOf(node, t.textPrimary),
                    align: align === 'center' ? 'center' : (align === 'right' ? 'right' : 'left'),
                    bold: node.style['font-weight'] === 'bold' || node.tag === 'strong' || node.tag === 'b' || node.tag === 'h2' || node.tag === 'h3'
                });
            });
            return;
        }
        if (node.tag === 'br') return;

        const pad = paddingOf(node);
        const bg = bgColorOf(node);
        const radius = parseFloat(node.style['border-radius'] || '0');
        const opacity = parseFloat(node.style.opacity || '1');
        if (bg && opacity > 0) {
            R.ctx.save();
            R.ctx.globalAlpha = opacity;
            R.drawRect(x, y, w, h, { fill: bg, radius: isNaN(radius) ? 0 : radius });
            R.ctx.restore();
        }
        // 边框
        const border = node.style.border;
        if (border && border.indexOf('none') < 0) {
            R.drawRect(x, y, w, h, { fill: null, radius: isNaN(radius) ? 0 : radius, stroke: t.borderSoft });
        }
        if (node.style['border-left']) {
            R.drawRect(x, y, 3, h, { fill: t.success, radius: 1.5 });
        }
        // 子节点绘制由 drawNodesRecursive 统一递归，避免双重绘制
    }

    let resultLayout = null;
    function findNode(layout, node) {
        if (!layout) return null;
        for (let i = 0; i < layout.nodes.length; i++) {
            if (layout.nodes[i].node === node) return layout.nodes[i];
        }
        return null;
    }

    // ---------------- 弹窗状态 ----------------
    const state = {
        visible: false,
        html: '',
        layout: null,
        title: '',
        width: 0,
        height: 0,
        x: 0, y: 0,
        buttons: [], // {x,y,w,h,onTap,disabled}
        openedAt: 0,
        gachaDone: false
    };

    function show(html) {
        state.visible = true;
        state.html = String(html || '');
        state.buttons = [];
        state.openedAt = 0;
        state.gachaDone = false;
        Input.unregisterAllButtons();
        // 延迟到下一帧绘制时布局（需要 ctx 测量）
    }

    function close() {
        state.visible = false;
        state.html = '';
        state.layout = null;
        state.buttons = [];
        Input.unregisterAllButtons();
    }

    function isVisible() { return state.visible; }

    // 每帧在弹窗容器内布局并绘制
    function drawModal() {
        if (!state.visible || !R.ctx) return;
        const t = R.Theme.get();
        const maxW = Math.min(R.SCREEN_W - 40, 360);

        // 注销上一帧弹窗按钮（防 _buttons 无限增长），重置按钮计数
        Input.unregisterByPrefix('popBtn_');
        state.buttons = [];

        // 布局（同一棵节点树，避免引用不一致）
        const root = parseHTML(state.html);
        animateGacha(root);
        const lay = layout(root, maxW);
        resultLayout = lay;
        const h = Math.min(lay.height, R.SCREEN_H - 120);
        const x = (R.SCREEN_W - maxW) / 2;
        const y = Math.max(40, (R.SCREEN_H - h) / 2 - 20);

        // 背景遮罩
        R.ctx.globalAlpha = 0.6;
        R.drawRect(0, 0, R.SCREEN_W, R.SCREEN_H, { fill: '#000000' });
        R.ctx.globalAlpha = 1;

        // 弹窗卡片
        R.drawRect(x - 10, y - 10, maxW + 20, h + 20, { fill: t.bgCard, radius: 14, stroke: t.borderSoft });

        // 内容（顶部裁剪）
        R.ctx.save();
        R.ctx.beginPath();
        R.ctx.rect(x, y, maxW, h);
        R.ctx.clip();
        drawNodesRecursive(root, lay, x, y);
        R.ctx.restore();
    }

    function drawNodesRecursive(root, lay, ox, oy) {
        root.children = root.children || [];
        root.children.forEach(function (child) {
            const item = findNode(lay, child);
            if (!item) return;
            drawNode(item, item.x + ox, item.y + oy, item.w, item.h);
            if (child.tag === 'button') { drawButtonNode(child, item, ox, oy); return; }
            drawNodesRecursive(child, lay, ox, oy);
        });
    }

    // 收集按钮所有后代文本（含子 span），按按钮宽换行
    function buttonLines(node, maxW, fs) {
        let text = '';
        (function walk(n) {
            (n.children || []).forEach(function (c) {
                if (c.tag === '#text') text += c.text;
                else if (c.tag === 'br') text += '\n';
                else walk(c);
            });
        })(node);
        return textLines({ text: text }, maxW, fs);
    }

    function drawButtonNode(node, item, ox, oy) {
        const t = R.Theme.get();
        const x = item.x + ox, y = item.y + oy, w = item.w, h = item.h;
        const bg = bgColorOf(node) || t.accent;
        const disabled = node.attrs.disabled === '' || node.attrs.disabled === 'disabled' || node.attrs.disabled === 'true';
        const radius = parseFloat(node.style['border-radius'] || '0');
        R.drawRect(x, y, w, h, { fill: disabled ? t.textFaint : bg, radius: isNaN(radius) ? 8 : radius });
        // 按钮文本居中（flex 布局内按钮宽度由布局决定）
        const fs = fontSizeOf(node, 13);
        const lines = buttonLines(node, w - 8, fs);
        lines.forEach(function (ln, i) {
            R.drawText(ln, x + w / 2, y + h / 2 - ((lines.length - 1) * (fs + 5)) / 2 + i * (fs + 5), {
                fontSize: fs, color: colorOf(node, '#ffffff'), align: 'center', bold: true
            });
        });
        // 注册点击
        const onclick = node.attrs.onclick || '';
        const cb = parseOnClick(onclick);
        Input.registerButton({
            id: 'popBtn_' + (state.buttons.length), x: x, y: y, w: w, h: h,
            disabled: disabled, onTap: function () { if (cb) cb(); }
        });
        state.buttons.push({ x: x, y: y, w: w, h: h, disabled: disabled });
    }

    // 解析 onclick="game.method('arg')" / game.method(1) / game.method()
    function parseOnClick(s) {
        const m = /game\s*\.\s*([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/.exec(s || '');
        if (!m) return null;
        const method = m[1];
        const argsRaw = m[2] ? m[2].split(',').map(function (a) { return a.trim(); }) : [];
        const gameObj = (typeof game !== 'undefined') ? game : null;
        if (!gameObj || typeof gameObj[method] !== 'function') return null;
        const args = argsRaw.map(function (a) {
            if (a === '') return undefined;
            if (a === 'true') return true;
            if (a === 'false') return false;
            if (/^-?\d+(\.\d+)?$/.test(a)) return parseFloat(a);
            const sm = /^'([^']*)'$/.exec(a) || /^"([^"]*)"$/.exec(a);
            if (sm) return sm[1];
            return a;
        });
        return function () {
            try { gameObj[method].apply(gameObj, args); } catch (e) { }
        };
    }

    // 弹窗层集成：ScreenManager.draw 末尾调用
    R.Popup = {
        show: show,
        close: close,
        isVisible: isVisible,
        drawModal: drawModal,
        _parse: parseHTML,   // 临时调试
        _layout: layout
    };

    // ============================================================
    //  Tooltip 悬浮提示（阶段 4）：读 game.tooltipData[key] 绘制
    // ============================================================
    const tooltipState = { key: null, data: null, x: 0, y: 0 };

    function showTooltip(dataKey) {
        const gameObj = (typeof game !== 'undefined') ? game : null;
        const data = gameObj && gameObj.tooltipData ? gameObj.tooltipData[dataKey] : null;
        if (!data) return;
        // 第二次点击同一 key：关闭
        if (tooltipState.key === dataKey) { hideTooltip(); return; }
        tooltipState.key = dataKey;
        tooltipState.data = data;
        tooltipState.x = R.SCREEN_W / 2;
        tooltipState.y = Math.max(90, R.SCREEN_H / 2 - 60);
    }

    function hideTooltip() {
        tooltipState.key = null;
        tooltipState.data = null;
    }

    function tooltipIsVisible() { return !!tooltipState.data; }

    function drawTooltip() {
        const data = tooltipState.data;
        if (!data || !R.ctx) return;
        const t = R.Theme.get();
        const maxW = Math.min(R.SCREEN_W - 40, 330);
        // 计算内容行
        const rows = [];
        if (data.title) rows.push({ text: String(data.title), fs: 14, color: t.warning, bold: true });
        if (data.sections) {
            data.sections.forEach(function (sec) {
                if (sec.label) rows.push({ text: String(sec.label), fs: 12, color: t.textSecondary, bold: true });
                if (sec.value) rows.push({ text: String(sec.value), fs: 12, color: t.textSecondary, bold: false });
            });
        }
        if (data.desc) rows.push({ text: String(data.desc), fs: 12, color: t.textMuted, bold: false });
        if (!rows.length) return;

        // 布局
        const lineH = 20;
        let totalH = 16;
        rows.forEach(function (r) {
            const lines = R.wrapText(r.text, maxW - 24, r.fs, r.bold);
            totalH += lines.length * lineH;
        });
        const x = (R.SCREEN_W - maxW) / 2;
        let y = tooltipState.y - totalH / 2;
        if (y < 60) y = 60;
        if (y + totalH > R.SCREEN_H - 20) y = R.SCREEN_H - totalH - 20;

        // 背景
        R.ctx.globalAlpha = 0.92;
        R.drawRect(x, y, maxW, totalH, { fill: t.bgCard, radius: 10, stroke: t.borderSoft });
        R.ctx.globalAlpha = 1;

        let iy = y + 10;
        rows.forEach(function (r) {
            const lines = R.wrapText(r.text, maxW - 24, r.fs, r.bold);
            lines.forEach(function (ln) {
                R.drawText(ln, x + 12, iy, { fontSize: r.fs, color: r.color, bold: r.bold });
                iy += lineH;
            });
        });
    }

    R.Tooltip = {
        show: showTooltip,
        hide: hideTooltip,
        isVisible: tooltipIsVisible,
        draw: drawTooltip
    };
})();
