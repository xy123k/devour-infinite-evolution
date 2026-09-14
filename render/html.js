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
    // 支持标签：div/span/button/h2/h3/p/br/strong/b + svg（path/line/polyline/polygon/circle/rect）
    // 忽略：script/style
    function parseHTML(html) {
        html = String(html || '').replace(/<script[\s\S]*?<\/script>/gi, '');
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
            if (m[4] !== '/' && tag !== 'br' && tag !== 'img' && tag !== 'input' && tag !== 'path' && tag !== 'line' && tag !== 'circle' && tag !== 'rect' && tag !== 'polyline' && tag !== 'polygon') {
                stack.push(node);
            }
        }
        if (lastIndex < html.length) {
            const text = html.slice(lastIndex).replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            if (text.trim()) root.children.push({ tag: '#text', text: text });
        }
        mergeInlineSvg(root);
        inheritFont(root, null);
        return root;
    }

    // svg 的 1em 基准与 svgtext 文本字号：继承父节点 font-size（如 div font-size:60px 内的图标应为 60px）
    function inheritFont(node, parentFs) {
        const fsStyle = node.style && node.style['font-size'];
        const ownFs = fsStyle ? parseFloat(fsStyle) : parentFs;
        (node.children || []).forEach(function (c) {
            if (c.tag === 'svg' || c.tag === 'svgtext') {
                if (!c.style['font-size'] && ownFs) c.style['font-size'] = ownFs + 'px';
                if (c.tag === 'svgtext' && c.svg && !c.svg.style['font-size'] && ownFs) c.svg.style['font-size'] = ownFs + 'px';
            }
            inheritFont(c, ownFs);
        });
    }

    // svg 与紧随的文本合并为 svgtext（图标+文字同行，避免图标单独占行）
    function mergeInlineSvg(node) {
        const ch = node.children || [];
        const out = [];
        for (let i = 0; i < ch.length; i++) {
            const c = ch[i];
            if (c.tag === 'svg' && i + 1 < ch.length && ch[i + 1].tag === '#text' && ch[i + 1].text.trim()) {
                out.push({ tag: 'svgtext', svg: c, text: ch[i + 1], style: c.style, attrs: c.attrs, children: [] });
                i++;
            } else {
                out.push(c);
            }
            if (c.children && c.children.length) mergeInlineSvg(c);
        }
        node.children = out;
    }

    // svg 尺寸：style width/height（px 或 em），缺省 1em
    function svgSize(node, fs) {
        function px(v, d) { if (!v) return d; if (v.indexOf('%') >= 0) return d; const n = parseFloat(v); if (isNaN(n)) return d; if (v.indexOf('em') >= 0) return n * fs; return n; }
        const style = node.style || {};
        const w = px(style.width, fs) || fs;
        const h = px(style.height, fs) || fs;
        return { w: w, h: h };
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
        const text = String(node && node.text != null ? node.text : '');
        if (!text) return [''];
        const lines = [];
        let cur = '';
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === '\n') { lines.push(cur); cur = ''; continue; }
            cur += ch;
            let cw = 0;
            try { cw = R.measureText(cur, fontSize).width; } catch (e) { try { R.ctx.font = fontSize + 'px sans-serif'; cw = R.ctx.measureText(cur).width; } catch (e2) { cw = cur.length * fontSize; } }
            if (cw > maxW) {
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
    function marginBottom(node) {
        const v = node.style['margin-bottom'];
        if (v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
        // DOM 全局默认：h3 {margin-bottom:10px} / h2 {margin:16px 0}
        if (node.tag === 'h3') return 10;
        if (node.tag === 'h2') return 16;
        return 0;
    }

    function pushItem(node, x, y, w, h, result, extra) {
        if (node.tag === '#text' || node.tag === 'br' || node.tag === 'root') return;
        const item = { node: node, x: x, y: y, w: w, h: h };
        if (extra) Object.assign(item, extra);
        result.nodes.push(item);
    }

    // flex 布局辅助：无 flex 声明的子项按内容自然宽度（修复：图标/标签不再被平分整行而撑爆/截断）
    function naturalWidth(node) {
        const pad = paddingOf(node);
        // DOM 全局 button{margin:4px}：未行内覆盖的边补 4px（影响行内流换行/间距）
        const btnGlob = node.tag === 'button' ? 4 : 0;
        const mlRaw = parseFloat(node.style['margin-left'] || '0');
        const mrRaw = parseFloat(node.style['margin-right'] || '0');
        const ml = (isNaN(mlRaw) ? 0 : mlRaw) + (node.style['margin-left'] ? 0 : btnGlob);
        const mr = (isNaN(mrRaw) ? 0 : mrRaw) + (node.style['margin-right'] ? 0 : btnGlob);
        function textW(t, fs) {
            try { return R.measureText(t, fs).width; } catch (e) { try { R.ctx.font = fs + 'px sans-serif'; return R.ctx.measureText(t).width; } catch (e2) { return t.length * fs; } }
        }
        let tw = 0;
        (function walk(n, parentFs) {
            if (!n) return;
            n.style = n.style || {};
            const fs = fontSizeOf(n, parentFs);
            if (n.tag === '#text') {
                const t = n.text || '';
                if (t.trim()) tw = Math.max(tw, textW(t, fs));
                return;
            }
            if (n.tag === 'svgtext') {
                const t = n.text || '';
                if (n.svg) { const size = svgSize(n.svg, fs); tw = Math.max(tw, size.w + 5 + textW(t, fs)); }
                else tw = Math.max(tw, textW(t, fs));
                return;
            }
            if (n.tag === 'svg') {
                tw = Math.max(tw, svgSize(n, fs).w);
                return;
            }
            (n.children || []).forEach(function (c) { walk(c, fs); });
        })(node, fontSizeOf(node, 13));
        return tw + pad.left + pad.right + ml + mr;
    }

    function layoutBlock(node, x, y, w, result, inherit) {
        inherit = inherit || { fs: 13, lh: 1.6 };
        node.style = node.style || {};
        node.attrs = node.attrs || {};
        // font-size / line-height 继承（DOM inline style 只写在容器上，文本节点需继承）
        const fsNow = (function () { const f = node.style['font-size']; if (f) { const n = parseFloat(f); if (!isNaN(n)) return n; } if (node.tag === 'h3') return 17; if (node.tag === 'h2') return 22; if (node.tag === 'button') return 13; return inherit.fs; })();
        const lhNow = (function () { const l = node.style['line-height']; if (l) { const n = parseFloat(l); if (!isNaN(n)) return n; } return inherit.lh; })();
        const childInherit = { fs: fsNow, lh: lhNow };
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
            const fs = inherit.fs;
            const lines = textLines(node, innerW, fs);
            const h = lines.length * Math.round(fs * inherit.lh);
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: innerW, h: h, lines: lines, fs: fs });
            return cursorY + h + pad.bottom + marginBottom(node);
        }

        // svg+文本同行（标题/物品行图标）
        if (node.tag === 'svgtext') {
            const fs = inherit.fs;
            const size = svgSize(node.svg, fs);
            const gap = 5;
            // 自然宽（svg + 文本），不撑满整行（否则行内流中独占一行导致换行）
            const textStr = (node.text && node.text.text != null) ? String(node.text.text) : String(node.text || '');
            let tw = 0;
            try { tw = R.measureText(textStr, fs).width; } catch (e) { try { R.ctx.font = fs + 'px sans-serif'; tw = R.ctx.measureText(textStr).width; } catch (e2) { tw = textStr.length * fs; } }
            const w = size.w + gap + tw;
            const lines = textLines({ text: textStr }, w - size.w - gap, fs);
            const th = lines.length * Math.round(fs * inherit.lh);
            const h = Math.max(size.h, th);
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: w, h: h, lines: lines, fs: fs, svgSize: size, svgGap: gap });
            return cursorY + h + pad.bottom + marginBottom(node);
        }

        // 独立 svg（flex/span 容器内图标）
        if (node.tag === 'svg') {
            const fs = fontSizeOf(node, 13);
            const size = svgSize(node, fs);
            // 自然宽（图标原始尺寸），不撑满整行（否则行内流中独占一行导致换行）
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: size.w, h: size.h, svgSize: size });
            return cursorY + size.h + pad.bottom + marginBottom(node);
        }

        // 文本输入框（P1-3）
        if (node.tag === 'input') {
            const fs = parseFloat(node.style['font-size']) || 12;
            const ih = Math.max(30, fs + 20);
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: innerW, h: ih });
            return cursorY + ih + pad.bottom + marginBottom(node);
        }

        // 计算子元素
        const display = node.style.display || '';
        const flex = display === 'flex' || display === 'inline-flex';
        const grid = display === 'grid';

        if (flex) {
            const gap = parseFloat(node.style.gap || '0') || 0;
            node.children.forEach(function (cc) { cc.style = cc.style || {}; cc.attrs = cc.attrs || {}; });
            const items = node.children.filter(function (c) { return !(c.tag === '#text' && !c.text.trim()); });
            // 仅显式 flex:1 的子项平分剩余空间；数值 flex 按比例；无 flex 按内容自然宽度（修复：图标/标签不再撑满整行）
            const flexOnes = items.filter(function (c) { return c.style.flex === '1' || c.style['flex:1']; });
            const flexNums = items.filter(function (c) { return c.style.flex && c.style.flex !== '1'; });
            const naturals = items.filter(function (c) { return !c.style.flex; });
            const fixedTotal = flexNums.reduce(function (sum, c) { return sum + (parseFloat(c.style.flex) || 0); }, 0);
            const naturalTotal = naturals.reduce(function (sum, c) { return sum + naturalWidth(c); }, 0);
            const gapTotal = (items.length - 1) * gap;
            const remain = Math.max(0, innerW - naturalTotal - fixedTotal - gapTotal);
            const flexW = remain / Math.max(1, flexOnes.length);
            let cx = x + pad.left;
            let rowY = cursorY;
            let maxH = 0;
            items.forEach(function (child) {
                let cw;
                if (child.style.flex === '1' || child.style['flex:1']) cw = flexW;
                else if (child.style.flex) cw = parseFloat(child.style.flex) || flexW;
                else cw = naturalWidth(child);
                if (child.style.width) { const v = child.style.width; const n = parseFloat(v); if (!isNaN(n)) cw = (v.indexOf('%') >= 0) ? innerW * n / 100 : n; }
                if (child.style['min-width']) { const n = parseFloat(child.style['min-width']); if (!isNaN(n)) cw = Math.max(cw, n); }
                // flex-wrap：放不下则换行（行首不强制换行，超宽内容允许溢出）
                if (cx + cw > x + w - pad.right && cx > x + pad.left) {
                    rowY += maxH + gap;
                    maxH = 0;
                    cx = x + pad.left;
                }
                const ch = layoutBlock(child, cx, rowY, cw, result, childInherit);
                maxH = Math.max(maxH, ch - rowY);
                cx += cw + gap;
            });
            const h = (rowY - cursorY) + maxH + pad.bottom + marginBottom(node);
            pushItem(node, x, y, w, h, result);
            return rowY + maxH + pad.bottom + marginBottom(node);
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
                const ch = layoutBlock(child, x + pad.left + col * (colW + gap), rowY, colW, result, childInherit);
                maxRowH = Math.max(maxRowH, ch - rowY);
            });
            const h = maxRowH + pad.bottom + marginBottom(node);
            pushItem(node, x, y, w, h, result);
            return rowY + h;
        }

        // 块级：纵向堆叠；子元素含行内元素（span/button/inline-block）时横向流式排列（修复：碎片行竖排拆开）
        const INLINE_TAGS = { span: 1, button: 1, a: 1, label: 1, em: 1, strong: 1, b: 1, small: 1, i: 1 };
        function isInlineish(c) {
            if (!c || !c.style) return false;
            const d = c.style.display;
            if (d === 'inline' || d === 'inline-block' || d === 'inline-flex') return true;
            if (INLINE_TAGS[c.tag]) {
                if (d === 'block') return false;
                const w = c.style.width;
                if (w && (w === '100%' || (w.indexOf('%') === 0))) return false;
                return true;
            }
            return false;
        }
        const kids = node.children.filter(function (c) { return !(c.tag === '#text' && !String(c.text || '').trim()); });
        let by = cursorY;
        const hasInlineKids = kids.some(isInlineish);
        if (hasInlineKids) {
            // 行内流：按自然宽横排、超出换行；容器 text-align 决定行对齐
            const scratch = { width: 0, height: 0, nodes: [] };
            const rows = []; // {items:[{node,x,w}], rowW, rowH}
            let curRow = { items: [], rowW: 0, rowH: 0 };
            rows.push(curRow);
            let rx = x + pad.left;
            let ry = cursorY;
            kids.forEach(function (child) {
                if (!isInlineish(child)) {
                    // 混入块级：新起一行，块级纵向布局
                    curRow = { items: [], rowW: 0, rowH: 0 };
                    rows.push(curRow);
                    curRow.block = child;
                    return;
                }
                const cw = naturalWidth(child);
                if (rx + cw > x + w - pad.right && rx > x + pad.left) {
                    curRow = { items: [], rowW: 0, rowH: 0 };
                    rows.push(curRow);
                    rx = x + pad.left;
                }
                // 测量高度（scratch 丢弃，避免重复注册节点）
                const ch = layoutBlock(child, 0, 0, cw, scratch, childInherit);
                curRow.items.push({ node: child, x: rx, w: cw, h: ch });
                curRow.rowW = Math.max(curRow.rowW, rx - x - pad.left + cw);
                curRow.rowH = Math.max(curRow.rowH, ch);
                rx += cw;
            });
            // 逐行对齐 + 真实布局
            const ta = node.style['text-align'];
            rows.forEach(function (row) {
                if (row.block) { ry = layoutBlock(row.block, x + pad.left, ry, innerW, result, childInherit); return; }
                if (!row.items.length) return;
                let shift = 0;
                if (ta === 'right') shift = Math.max(0, innerW - row.rowW);
                else if (ta === 'center') shift = Math.max(0, (innerW - row.rowW) / 2);
                let rowBottom = ry;
                row.items.forEach(function (it) {
                    const bx = it.x + shift;
                    const ch = layoutBlock(it.node, bx, ry, it.w, result, childInherit);
                    rowBottom = Math.max(rowBottom, ry + it.h);
                });
                ry = rowBottom;
            });
            by = ry;
        } else {
            node.children.forEach(function (child) {
                by = layoutBlock(child, x + pad.left, by, innerW, result, childInherit);
            });
        }
        let bh = by + pad.bottom + marginBottom(node);
        // DOM 全局 button{min-height:44px;margin:4px}：按钮无行内 min-height 时按 44+上下 margin 布局
        if (node.tag === 'button' && !node.style['min-height']) {
            if (bh - y < 44) bh = y + 44;
            if (!node.style['margin-top']) bh += 4;
            if (!node.style['margin-bottom']) bh += 4;
        }
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
        if (node.tag === 'svgtext') { drawSVGText(n, x, y, w, h); return; }
        if (node.tag === 'svg') { drawSVG(node, x, y, (n.svgSize ? n.svgSize.w : w), (n.svgSize ? n.svgSize.h : h)); return; }
        if (node.tag === 'input') { drawInputBox(n, x, y, w, h); return; }
        if (node.tag === '#text') {
            const align = node.style['text-align'] || 'left';
            let ax = x;
            if (align === 'center') ax = x + w / 2;
            else if (align === 'right') ax = x + w;
            n.lines.forEach(function (ln, i) {
                R.drawText(ln, ax, y + i * Math.round(n.fs * 1.6), {
                    fontSize: n.fs,
                    color: colorOf(node, node.tag === 'h2' ? t.accent : t.textPrimary),
                    align: align === 'center' ? 'center' : (align === 'right' ? 'right' : 'left'),
                    bold: node.style['font-weight'] === 'bold' || node.tag === 'strong' || node.tag === 'b' || node.tag === 'h2' || node.tag === 'h3',
                    letterSpacing: node.tag === 'h2' ? 4 : 0,
                    glow: node.tag === 'h2' ? 'rgba(0,229,176,0.35)' : null
                });
            });
            return;
        }
        if (node.tag === 'br') return;

        const pad = paddingOf(node);
        const bg = bgColorOf(node);
        const radius = parseFloat(node.style['border-radius'] || '0');
        const opacity = parseFloat(node.style.opacity || '1');
        // button 背景由 drawButtonNode 全权处理（含 disabled 覆盖），此处跳过避免半透明叠底
        if (bg && opacity > 0 && node.tag !== 'button') {
            R.ctx.save();
            R.ctx.globalAlpha = opacity;
            R.drawRect(x, y, w, h, { fill: bg, radius: isNaN(radius) ? 0 : radius });
            R.ctx.restore();
        }
        // 边框（解析颜色/宽度：border:2px solid var(--accent-primary) 等）
        const border = node.style.border;
        if (border && border.indexOf('none') < 0) {
            let bc = null, bw = 1;
            const bm = border.match(/(\d+)px/); if (bm) bw = parseFloat(bm[1]);
            const cm = border.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|var\([^)]+\))/);
            if (cm) {
                if (cm[1].indexOf('var(') === 0) {
                    const t2 = R.Theme.get();
                    const nm = cm[1].replace('var(', '').replace(')', '').trim();
                    const map = { '--accent-primary': t2.accent, '--accent-warning': t2.warning, '--accent-success': t2.success, '--accent-info': t2.info, '--accent-danger': t2.danger, '--accent-purple': t2.purple, '--accent-orange': t2.orange, '--text-primary': t2.textPrimary, '--text-secondary': t2.textSecondary, '--text-muted': t2.textMuted, '--text-faint': t2.textFaint, '--bg-card': t2.bgCard, '--bg-secondary': t2.bgSecondary, '--border-primary': t2.border, '--bg-hover': t2.bgHover };
                    bc = map[nm] || null;
                } else {
                    bc = cm[1];
                }
            }
            R.drawRect(x, y, w, h, { fill: null, radius: isNaN(radius) ? 0 : radius, stroke: bc || t.borderSoft, strokeWidth: bw });
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

    // ---------------- SVG 图标渲染（lucide 线性图标子集） ----------------
    // svg 与紧随文本同行绘制（图标 + 文字）
    function drawSVGText(n, x, y, w, h) {
        const t = R.Theme.get();
        const node = n.node;
        const size = n.svgSize;
        const fs = n.fs;
        drawSVG(node.svg, x, y + (h - size.h) / 2, size.w, size.h);
        const tx = x + size.w + n.svgGap;
        n.lines.forEach(function (ln, i) {
            R.drawText(ln, tx, y + (h - n.lines.length * Math.round(fs * 1.6)) / 2 + i * Math.round(fs * 1.6), {
                fontSize: fs,
                color: colorOf(node, node.tag === 'h2' ? t.accent : t.textPrimary),
                bold: node.style['font-weight'] === 'bold' || node.tag === 'h2' || node.tag === 'h3',
                letterSpacing: node.tag === 'h2' ? 4 : 0,
                glow: node.tag === 'h2' ? 'rgba(0,229,176,0.35)' : null
            });
        });
    }

    function svgColorVal(v, node, def) {
        if (v == null || v === 'none') return null;
        if (v === 'currentColor') { const c = node.style && node.style.color; return c ? colorOf(node, def) : def; }
        if (v.indexOf('var(') === 0) return colorOf({ style: { color: v } }, def);
        return v;
    }

    function roundedRectPath(x, y, w, h, r) {
        const ctx = R.ctx;
        r = Math.min(r, w / 2, h / 2);
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function drawShape(shape, stroke, fill) {
        const a = shape.attrs || {};
        const ctx = R.ctx;
        function f(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
        ctx.beginPath();
        if (shape.tag === 'line') {
            ctx.moveTo(f(a.x1), f(a.y1)); ctx.lineTo(f(a.x2), f(a.y2));
        } else if (shape.tag === 'polyline' || shape.tag === 'polygon') {
            const pts = (String(a.points || '').trim().match(/[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g) || []).map(parseFloat);
            for (let i = 0; i + 1 < pts.length; i += 2) {
                if (i === 0) ctx.moveTo(pts[i], pts[i + 1]); else ctx.lineTo(pts[i], pts[i + 1]);
            }
            if (shape.tag === 'polygon') ctx.closePath();
        } else if (shape.tag === 'circle') {
            ctx.arc(f(a.cx), f(a.cy), f(a.r), 0, Math.PI * 2);
        } else if (shape.tag === 'rect') {
            const rx = f(a.rx) || 0, ry = f(a.ry) || 0;
            const x = f(a.x), y = f(a.y), w = f(a.width), h = f(a.height);
            const rr = rx || ry;
            if (rr) { if (ctx.roundRect) ctx.roundRect(x, y, w, h, rr); else roundedRectPath(x, y, w, h, rr); }
            else ctx.rect(x, y, w, h);
        } else if (shape.tag === 'path') {
            tracePath(ctx, String(a.d || ''));
        }
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
    }

    // SVG path d 命令解析：M/L/H/V/C/S/Q/T/A/Z（含相对坐标与椭圆弧）
    function tracePath(ctx, d) {
        const cmds = d.match(/[a-zA-Z][^a-zA-Z]*/g) || [];
        let cx = 0, cy = 0, sx = 0, sy = 0, lastC = null, lastQ = null;
        cmds.forEach(function (raw) {
            const c = raw[0];
            const args = (raw.slice(1).trim().match(/[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g) || []).map(parseFloat);
            const rel = c === c.toLowerCase();
            const U = c.toUpperCase();
            let i = 0;
            while (i < args.length) {
                switch (U) {
                    case 'M': {
                        let x = args[i], y = args[i + 1];
                        if (rel) { x += cx; y += cy; }
                        ctx.moveTo(x, y); cx = x; cy = y; sx = x; sy = y; lastC = null; lastQ = null; i += 2; break;
                    }
                    case 'L': {
                        let x = args[i], y = args[i + 1];
                        if (rel) { x += cx; y += cy; }
                        ctx.lineTo(x, y); cx = x; cy = y; lastC = null; lastQ = null; i += 2; break;
                    }
                    case 'H': {
                        const x = rel ? cx + args[i] : args[i];
                        ctx.lineTo(x, cy); cx = x; lastC = null; lastQ = null; i += 1; break;
                    }
                    case 'V': {
                        const y = rel ? cy + args[i] : args[i];
                        ctx.lineTo(cx, y); cy = y; lastC = null; lastQ = null; i += 1; break;
                    }
                    case 'C': {
                        const x1 = args[i], y1 = args[i + 1], x2 = args[i + 2], y2 = args[i + 3], x3 = args[i + 4], y3 = args[i + 5];
                        ctx.bezierCurveTo(rel ? x1 + cx : x1, rel ? y1 + cy : y1, rel ? x2 + cx : x2, rel ? y2 + cy : y2, rel ? x3 + cx : x3, rel ? y3 + cy : y3);
                        lastC = [rel ? x2 + cx : x2, rel ? y2 + cy : y2];
                        cx = rel ? x3 + cx : x3; cy = rel ? y3 + cy : y3; lastQ = null; i += 6; break;
                    }
                    case 'S': {
                        const x2 = args[i], y2 = args[i + 1], x3 = args[i + 2], y3 = args[i + 3];
                        const x1 = lastC ? 2 * cx - lastC[0] : cx, y1 = lastC ? 2 * cy - lastC[1] : cy;
                        ctx.bezierCurveTo(x1, y1, rel ? x2 + cx : x2, rel ? y2 + cy : y2, rel ? x3 + cx : x3, rel ? y3 + cy : y3);
                        lastC = [rel ? x2 + cx : x2, rel ? y2 + cy : y2];
                        cx = rel ? x3 + cx : x3; cy = rel ? y3 + cy : y3; lastQ = null; i += 4; break;
                    }
                    case 'Q': {
                        const x1 = args[i], y1 = args[i + 1], x2 = args[i + 2], y2 = args[i + 3];
                        ctx.quadraticCurveTo(rel ? x1 + cx : x1, rel ? y1 + cy : y1, rel ? x2 + cx : x2, rel ? y2 + cy : y2);
                        lastQ = [rel ? x1 + cx : x1, rel ? y1 + cy : y1];
                        cx = rel ? x2 + cx : x2; cy = rel ? y2 + cy : y2; lastC = null; i += 4; break;
                    }
                    case 'T': {
                        const x2 = args[i], y2 = args[i + 1];
                        const x1 = lastQ ? 2 * cx - lastQ[0] : cx, y1 = lastQ ? 2 * cy - lastQ[1] : cy;
                        ctx.quadraticCurveTo(x1, y1, rel ? x2 + cx : x2, rel ? y2 + cy : y2);
                        lastQ = [x1, y1];
                        cx = rel ? x2 + cx : x2; cy = rel ? y2 + cy : y2; lastC = null; i += 2; break;
                    }
                    case 'A': {
                        const rx = args[i], ry = args[i + 1], rot = args[i + 2], la = args[i + 3], sw = args[i + 4], x2 = args[i + 5], y2 = args[i + 6];
                        const tx = rel ? x2 + cx : x2, ty = rel ? y2 + cy : y2;
                        svgArc(ctx, cx, cy, rx, ry, rot, !!la, !!sw, tx, ty);
                        cx = tx; cy = ty; lastC = null; lastQ = null; i += 7; break;
                    }
                    case 'Z': {
                        ctx.closePath(); cx = sx; cy = sy; lastC = null; lastQ = null; i = args.length; break;
                    }
                    default: i = args.length;
                }
            }
        });
    }

    // SVG 椭圆弧（rx/ry/rot/large/sweep → canvas arc）
    function svgArc(ctx, x1, y1, rx, ry, rotDeg, large, sweep, x2, y2) {
        rx = Math.abs(rx); ry = Math.abs(ry);
        if (rx === 0 || ry === 0) { ctx.lineTo(x2, y2); return; }
        if (x1 === x2 && y1 === y2) return;
        const phi = (rotDeg || 0) * Math.PI / 180;
        const cp = Math.cos(phi), sp = Math.sin(phi);
        const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
        const x1p = cp * dx + sp * dy;
        const y1p = -sp * dx + cp * dy;
        const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
        if (lam > 1) { const s = Math.sqrt(lam); rx *= s; ry *= s; }
        const sign = (large === sweep) ? -1 : 1;
        const num = Math.max(0, rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p);
        const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
        const coef = den ? sign * Math.sqrt(num / den) : 0;
        const cxp = coef * (rx * y1p) / ry;
        const cyp = coef * -(ry * x1p) / rx;
        const cxx = cp * cxp - sp * cyp + (x1 + x2) / 2;
        const cyy = sp * cxp + cp * cyp + (y1 + y2) / 2;
        let th1 = Math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx);
        let dth = Math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx) - th1;
        if (!sweep && dth > 0) dth -= 2 * Math.PI;
        if (sweep && dth < 0) dth += 2 * Math.PI;
        if (large && Math.abs(dth) < Math.PI) dth += (dth >= 0 ? 2 * Math.PI : -2 * Math.PI);
        if (!large && Math.abs(dth) > Math.PI) dth -= (dth >= 0 ? 2 * Math.PI : -2 * Math.PI);
        ctx.save();
        ctx.translate(cxx, cyy);
        ctx.rotate(phi);
        ctx.scale(rx, ry);
        ctx.arc(0, 0, 1, th1, th1 + dth, !sweep);
        ctx.restore();
    }

    function drawSVG(node, x, y, w, h) {
        const a = node.attrs || {};
        const vb = String(a.viewbox || '0 0 24 24').trim().split(/[\s,]+/).filter(Boolean).map(parseFloat);
        const vbW = vb[2] || 24, vbH = vb[3] || 24;
        const ctx = R.ctx;
        const scale = Math.min(w / vbW, h / vbH);
        const ox = x + (w - vbW * scale) / 2;
        const oy = y + (h - vbH * scale) / 2;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.scale(scale, scale);
        const defColor = (node.style && node.style.color) ? colorOf(node, '#ffffff') : '#ffffff';
        ctx.lineCap = a['stroke-linecap'] || 'round';
        ctx.lineJoin = a['stroke-linejoin'] || 'round';
        ctx.lineWidth = parseFloat(a['stroke-width'] || '2') || 2;
        // svg 级 stroke/fill 下发给无显式属性的子形状（lucide 图标惯用写法）
        const inheritStroke = a.stroke != null ? a.stroke : null;
        const inheritFill = a.fill != null ? a.fill : null;
        (node.children || []).forEach(function (shape) {
            const sa = shape.attrs || {};
            const strokeAttr = sa.stroke != null ? sa.stroke : inheritStroke;
            const fillAttr = sa.fill != null ? sa.fill : inheritFill;
            let stroke = svgColorVal(strokeAttr, node, defColor);
            let fill = svgColorVal(fillAttr, node, null);
            if (stroke == null && fill == null) stroke = defColor;
            drawShape(shape, stroke, fill);
        });
        ctx.restore();
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
        gachaDone: false,
        popScroll: 0,      // P3-8：弹窗内容滚动偏移
        popScrollMax: 0
    };

    // ---------------- 文本输入状态（P1-3：Canvas 输入框） ----------------
    // 浏览器用隐藏 <input> 作为 IME 输入通道（Canvas 无原生输入法），
    // 渲染仍全部在 Canvas 完成；无 DOM 容器（TapTap）时仅绘制输入框并直接提交回调。
    const inputState = {
        activeId: null,      // 当前聚焦的 input id（弹窗内 attrs.id）
        node: null,          // 对应 parse 节点
        text: '',            // 当前输入文本
        seq: 0,              // 输入框按钮 id 自增
        el: null,            // 隐藏 input 元素（浏览器）
        values: {}           // id -> 最近输入文本（blur 后仍保留，供提交读取）
    };

    // 读取弹窗内输入框当前值（Canvas 模式替代 __gid('xxx').value —— P1-3）
    function getInputValue(id) {
        if (inputState.values && Object.prototype.hasOwnProperty.call(inputState.values, id)) {
            return inputState.values[id];
        }
        return '';
    }

    function ensureHiddenInput() {
        if (typeof document === 'undefined') return null;
        if (inputState.el && inputState.el.parentNode) return inputState.el;
        const el = document.createElement('input');
        el.type = 'text';
        el.style.position = 'fixed';
        el.style.left = '-9999px';
        el.style.top = '0';
        el.style.width = '2px';
        el.style.height = '2px';
        el.style.opacity = '0';
        el.style.border = 'none';
        el.style.outline = 'none';
        el.style.background = 'transparent';
        el.style.zIndex = '-1';
        el.setAttribute('autocomplete', 'off');
        el.setAttribute('autocorrect', 'off');
        el.setAttribute('autocapitalize', 'off');
        el.addEventListener('input', function () {
            inputState.text = el.value;
            if (el._inputId) inputState.values[el._inputId] = el.value;
            if (inputState.node) applyInputAttr(inputState.node.attrs.oninput || inputState.node.attrs.onchange || '', el.value);
        });
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); el.blur(); }
            e.stopPropagation();
        });
        el.addEventListener('blur', function () {
            if (inputState.activeId) { inputState.activeId = null; inputState.node = null; }
        });
        if (document.body) document.body.appendChild(el);
        inputState.el = el;
        return el;
    }

    function focusInput(id, node) {
        inputState.activeId = id;
        inputState.node = node;
        const cur = String(node.attrs.value || '');
        inputState.text = cur;
        if (id) inputState.values[id] = cur;
        const el = ensureHiddenInput();
        if (el) {
            el._inputId = id;
            el.value = cur;
            el.focus();
            try { el.select(); } catch (e) {}
        }
        applyInputAttr(node.attrs.oninput || node.attrs.onchange || '', cur);
    }

    function blurInput() {
        if (inputState.el && typeof inputState.el.blur === 'function') {
            try { inputState.el.blur(); } catch (e) {}
        }
        inputState.activeId = null;
        inputState.node = null;
        inputState.text = '';
    }

    // 执行 input 属性回调：支持 game.xxx.yyy = this.value 与 game.fn(this.value)
    function applyInputAttr(expr, value) {
        if (!expr) return;
        const clean = String(expr).replace(/\s+/g, '');
        const assign = /^game(\.[A-Za-z_$][\w$]*)+=this\.value$/.exec(clean);
        if (assign) {
            const parts = clean.replace(/^game\./, '').split('=')[0].split('.');
            let obj = (typeof game !== 'undefined') ? game : null;
            if (!obj) return;
            for (let i = 0; i < parts.length - 1; i++) {
                if (obj && obj[parts[i]] != null) obj = obj[parts[i]]; else return;
            }
            obj[parts[parts.length - 1]] = String(value);
            return;
        }
        const withVal = String(expr).replace(/this\.value/g, JSON.stringify(String(value)));
        const fn = parseOnClick(withVal);
        if (fn) fn();
    }

    // 绘制 Canvas 输入框（聚焦态/占位符/光标闪烁）
    function drawInputBox(n, x, y, w, h) {
        const t = R.Theme.get();
        const node = n.node;
        const id = node.attrs.id || '';
        const isActive = inputState.activeId === id;
        R.drawRect(x, y, w, h, {
            fill: t.bgSecondary,
            radius: 4,
            stroke: isActive ? t.accent : t.border,
            lineWidth: isActive ? 1.5 : 1
        });
        let text = String(node.attrs.value || '');
        if (isActive && inputState.text != null) text = inputState.text;
        const fs = 12;
        if (text) {
            const tw = R.measureText(text, fs, false);
            const clipW = Math.max(0, w - 20);
            let show = text;
            while (R.measureText(show, fs, false) > clipW && show.length > 1) show = show.slice(1);
            R.drawText(show, x + 8, y + h / 2, { fontSize: fs, color: t.textPrimary, baseline: 'middle', maxWidth: clipW });
            if (isActive && Math.floor(Date.now() / 500) % 2 === 0) {
                const cx = x + 8 + R.measureText(show, fs, false) + 1;
                R.drawRect(cx, y + h / 2 - 8, 1.5, 16, { fill: t.accent });
            }
        } else {
            R.drawText(node.attrs.placeholder || '', x + 8, y + h / 2, { fontSize: fs, color: t.textFaint, baseline: 'middle', maxWidth: Math.max(0, w - 20) });
        }
        // 点击聚焦（id 固定：drawModal 每帧注销重注册，引用必须稳定，否则 mouseup 取不到 onTap）
        Input.registerButton({
            id: 'popInput_' + (id || ('x' + (inputState.seq++))),
            x: x, y: y, w: w, h: h,
            onTap: (function (iid, nd) { return function () { focusInput(iid, nd); }; })(id, node)
        });
    }

    // P1-2：弹窗打开期间禁用 DOM 底栏交互（DOM 底栏在 canvas 之上，点击会穿透触发底层导航）
    function setNavInteractive(on) {
        try {
            if (typeof document === 'undefined') return;
            const nav = document.getElementById('bottomNav');
            if (nav) nav.style.pointerEvents = on ? '' : 'none';
        } catch (e) {}
    }

    function show(html) {
        state.visible = true;
        state.html = String(html || '');
        state.buttons = [];
        state.openedAt = 0;
        state.gachaDone = false;
        state.popScroll = 0;
        state.popScrollMax = 0;
        setNavInteractive(false);
        // 弹窗遮罩压暗 DOM 底部导航（DOM 版 #overlay z99 > bottomNav z50；Canvas 遮罩画在 canvas 内盖不住 DOM 导航）
        try { const nav = document.getElementById('bottomNav'); if (nav) nav.style.filter = 'brightness(0.25)'; } catch (e) {}
        Input.unregisterAllButtons();
        // 打开弹窗时强制关闭 tooltip，避免叠层残留（P3-x）
        try { hideTooltip(); } catch (e) {}
        // 延迟到下一帧绘制时布局（需要 ctx 测量）
    }

    function close() {
        state.visible = false;
        state.html = '';
        state.layout = null;
        state.buttons = [];
        state.popScroll = 0;
        state.popScrollMax = 0;
        blurInput();
        try { const nav = document.getElementById('bottomNav'); if (nav) nav.style.filter = ''; } catch (e) {}
        setNavInteractive(true);
        Input.unregisterAllButtons();
    }

    function isVisible() { return state.visible; }

    let _cacheHtml = null, _cacheRoot = null, _cacheLayout = null;

    function closePopup() {
        const g = (typeof game !== 'undefined') ? game : null;
        if (g && typeof g.closePop === 'function') { try { g.closePop(); } catch (e) { close(); } }
        else close();
    }

    // 每帧在弹窗容器内布局并绘制
    function drawModal() {
        if (!state.visible || !R.ctx) return;
        const t = R.Theme.get();
        const maxW = Math.min(R.SCREEN_W * 0.92, 500);
        // DOM #popBox padding：16px 16px 40px（内容区 = 卡片内缩进）
        const padT = 16, padB = 40, padL = 16;

        // 弹窗按钮以屏幕坐标注册（界面层滚动偏移不适用于弹窗，P3-3 需清 0）
        Input.setScrollOffset(0);

        // 注销上一帧弹窗按钮（防 _buttons 无限增长），重置按钮计数
        Input.unregisterByPrefix('popBtn_');
        Input.unregisterByPrefix('popMask_');
        Input.unregisterByPrefix('popInput_');
        state.buttons = [];

        // 布局（同一棵节点树，避免引用不一致）
        // 性能：html 未变时复用 parse 树与布局；仅抽奖动画期间每帧重布局（进度条宽度变化）
        const animating = !!(state.openedAt && !state.gachaDone);
        let root, lay;
        if (state.html === _cacheHtml && _cacheRoot) {
            root = _cacheRoot;
            if (animating) {
                animateGacha(root);
                lay = layout(root, maxW - padL * 2);
                _cacheLayout = lay;
            } else {
                lay = _cacheLayout;
            }
        } else {
            root = parseHTML(state.html);
            animateGacha(root);
            lay = layout(root, maxW - padL * 2);
            _cacheHtml = state.html;
            _cacheRoot = root;
            _cacheLayout = lay;
        }
        resultLayout = lay;
        // DOM #popBox：position:fixed;top:50%;transform:translate(-50%,-50%) + padding:16px 16px 40px；无 +10 偏移
        const h = Math.min(lay.height + padT + padB, Math.round(R.SCREEN_H * 0.85));
        const x = (R.SCREEN_W - maxW) / 2;
        const y = (R.SCREEN_H - h) / 2;
        // 弹窗可视区（P1-2/P3-8）：超出此区的按钮不注册，防止误命中底层
        state.clipRect = { x: x, y: y, w: maxW, h: h };

        // P3-8：内容超界时弹窗内滚动（含列表底部元素）
        state.popScrollMax = Math.max(0, lay.height - h);
        if (state.popScrollMax <= 0) state.popScroll = 0;
        else state.popScroll = Math.min(state.popScrollMax, Math.max(0, state.popScroll));
        Input.setPopupScroll({
            x: x, y: y, w: maxW, h: h,
            get: function () { return state.popScroll; },
            set: function (v) { state.popScroll = Math.min(state.popScrollMax, Math.max(0, v)); },
            max: function () { return state.popScrollMax; }
        });

        // 遮罩拦截（P1-2）：全屏按钮先注册（栈底），内容按钮后注册优先命中；
        // 弹窗打开期间任何未命中内容按钮的点击都落在遮罩上（关闭弹窗），不穿透到底层。
        Input.registerButton({
            id: 'popMask_0', x: 0, y: 0, w: R.SCREEN_W, h: R.SCREEN_H,
            disabled: false, onTap: function () { blurInput(); closePopup(); }
        });

        // 背景遮罩（DOM #overlay = rgba(0,0,0,0.78)）
        R.ctx.globalAlpha = 0.78;
        R.drawRect(0, 0, R.SCREEN_W, R.SCREEN_H, { fill: '#000000' });
        R.ctx.globalAlpha = 1;

        // 弹窗卡片（DOM #popBox：border-radius 12 + box-shadow 0 0 30px rgba(0,0,0,.5)；卡片=内容区无外扩）
        R.ctx.save();
        R.ctx.shadowColor = 'rgba(0,0,0,0.5)';
        R.ctx.shadowBlur = 15;
        R.drawRect(x, y, maxW, h, {
            gradient: { from: '#111c26', to: '#0c151d' },
            radius: 12, stroke: t.borderSoft
        });
        R.ctx.restore();

        // 内容（DOM popBox padding 16/16/40 内裁剪 + P3-8 弹窗内滚动偏移）
        R.ctx.save();
        R.ctx.beginPath();
        R.ctx.rect(x + padL, y + padT, maxW - padL * 2, h - padT - padB);
        R.ctx.clip();
        R.ctx.translate(0, -state.popScroll);
        drawNodesRecursive(root, lay, x + padL, y + padT - state.popScroll);
        R.ctx.restore();

        // 技能名 tooltip 注册（data-skill-id，对齐 DOM 原版 showSkillTooltip）
        // 文字基线在 it.y，向上扩 12px 使整行文字都可点（修复点击区偏下 miss）
        lay.nodes.forEach(function (it) {
            const sid = it.node && it.node.attrs && it.node.attrs['data-skill-id'];
            if (!sid) return;
            const bx = it.x + x, by = it.y + (y - state.popScroll) - 12, bh = Math.max(22, it.h + 12);
            if (!insideClip(bx, by, it.w, bh)) return;
            Input.registerButton({
                id: 'popSkill_' + sid, x: bx, y: by, w: it.w, h: bh,
                disabled: false, onTap: (function (id) { return function () { try { if (typeof game !== 'undefined') game.showSkillTooltip(id); } catch (e) {} }; })(sid)
            });
        });

        // 右上角关闭按钮 ×（P1-1）：点击关闭弹窗
        const cx = x + maxW + 10 - 14, cy = y - 10 + 14;
        R.ctx.strokeStyle = t.textMuted;
        R.ctx.lineWidth = 1.8;
        R.ctx.lineCap = 'round';
        R.ctx.beginPath();
        R.ctx.moveTo(cx - 5, cy - 5); R.ctx.lineTo(cx + 5, cy + 5);
        R.ctx.moveTo(cx + 5, cy - 5); R.ctx.lineTo(cx - 5, cy + 5);
        R.ctx.stroke();
        Input.registerButton({
            id: 'popBtn_close', x: cx - 12, y: cy - 12, w: 24, h: 24,
            disabled: false, onTap: function () { blurInput(); closePopup(); }
        });
    }

    function drawNodesRecursive(root, lay, ox, oy) {
        root.children = root.children || [];
        root.children.forEach(function (child) {
            const item = findNode(lay, child);
            if (!item) return;
            drawNode(item, item.x + ox, item.y + oy, item.w, item.h);
            if (child.tag === 'button') { drawButtonNode(child, item, ox, oy); return; }
            // 带 onclick 的非 button 节点（div/span 等）：只注册点击区域，不覆盖绘制
            if (child.attrs && child.attrs.onclick) { registerNodeTap(child, item, ox, oy); }
            drawNodesRecursive(child, lay, ox, oy);
        });
    }

    // 注册按钮前的可视区裁剪检查（P3-8/P1-2）：中心点超出弹窗可视区的按钮不注册，
    // 避免被高度裁剪的底部内容按钮拦截遮罩点击
    function insideClip(x, y, w, h) {
        const cr = state.clipRect;
        if (!cr) return true;
        const cxx = x + w / 2, cyy = y + h / 2;
        return cxx >= cr.x && cxx <= cr.x + cr.w && cyy >= cr.y && cyy <= cr.y + cr.h;
    }

    // 为带 onclick 的非 button 节点注册点击区域（如 killDrop 物品行/遮罩）
    function registerNodeTap(node, item, ox, oy) {
        const onclick = node.attrs.onclick || '';
        const cb = parseOnClick(onclick);
        if (!cb) return;
        const bx = item.x + ox, by = item.y + oy, bw = item.w, bh = item.h;
        if (!insideClip(bx, by, bw, bh)) return;
        Input.registerButton({
            id: 'popBtn_' + (state.buttons.length),
            x: bx, y: by, w: bw, h: bh,
            disabled: false, onTap: function () { if (cb) cb(); }
        });
        state.buttons.push({ x: bx, y: by, w: bw, h: bh, disabled: false });
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
        // DOM button:disabled {background:var(--bg-hover);opacity:0.6}
        if (disabled) R.ctx.save(), R.ctx.globalAlpha = 0.6;
        R.drawRect(x, y, w, h, { fill: disabled ? t.bgHover : bg, radius: isNaN(radius) ? 8 : radius });
        // 按钮文本居中（flex 布局内按钮宽度由布局决定）
        const fs = fontSizeOf(node, 15);
        const lines = buttonLines(node, w - 8, fs);
        lines.forEach(function (ln, i) {
            R.drawText(ln, x + w / 2, y + h / 2 - ((lines.length - 1) * Math.round(fs * 1.6)) / 2 + i * Math.round(fs * 1.6), {
                fontSize: fs, color: colorOf(node, '#ffffff'), align: 'center', bold: true
            });
        });
        if (disabled) R.ctx.restore();
        // 注册点击
        const onclick = node.attrs.onclick || '';
        const cb = parseOnClick(onclick);
        if (!insideClip(x, y, w, h)) return;
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
        getInputValue: getInputValue,
        _parse: parseHTML,   // 临时调试
        _layout: layout
    };

    // ============================================================
    //  Tooltip 悬浮提示（阶段 4）：读 game.tooltipData[key] 绘制
    // ============================================================
    const tooltipState = { key: null, data: null, x: 0, y: 0 };

    function showTooltip(dataKeyOrObj) {
        const gameObj = (typeof game !== 'undefined') ? game : null;
        const data = (typeof dataKeyOrObj === 'string')
            ? (gameObj && gameObj.tooltipData ? gameObj.tooltipData[dataKeyOrObj] : null)
            : dataKeyOrObj;
        if (!data) return;
        // 第二次点击同一 key：关闭
        if (typeof dataKeyOrObj === 'string' && tooltipState.key === dataKeyOrObj) { hideTooltip(); return; }
        tooltipState.key = typeof dataKeyOrObj === 'string' ? dataKeyOrObj : ('_obj_' + String(data.title || '').slice(0, 20));
        tooltipState.data = data;
        tooltipState.x = R.SCREEN_W / 2;
        tooltipState.y = Math.max(90, R.SCREEN_H / 2 - 60);
    }

    function hideTooltip() {
        tooltipState.key = null;
        tooltipState.data = null;
    }

    function tooltipIsVisible() { return !!tooltipState.data; }

    // 纯文本化标题（P2-2）：剥离 <svg> 源码与内联标签，避免玩家可见内部字段
    function cleanTitleText(s) {
        return String(s)
            .replace(/<svg[\s\S]*?<\/svg>/gi, '')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/[\uFEFF\u200B]/g, '')
            .trim();
    }

    function drawTooltip() {
        const data = tooltipState.data;
        if (!data || !R.ctx) return;
        const t = R.Theme.get();
        const maxW = Math.min(R.SCREEN_W - 40, 330);
        // 计算内容行
        const rows = [];
        if (data.title) rows.push({ text: cleanTitleText(data.title), fs: 14, color: t.warning, bold: true });
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
