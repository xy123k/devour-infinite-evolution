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

    // Fix13: hex 明暗调整（html.js 内部，复刻 canvas.js shade）
    function shadeHex(hex, ratio) {
        var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
        if (!m) return hex || '#000000';
        var r = parseInt(m[1].substring(0,2),16), g = parseInt(m[1].substring(2,4),16), b = parseInt(m[1].substring(4,6),16);
        var t = ratio < 0 ? 0 : 255, p = Math.abs(ratio);
        r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

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
            const attrRe = /([a-zA-Z0-9-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
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
        applyClassDefaults(root);
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

    // 弹窗内 class 默认样式（对齐 DOM 全局 CSS，仅未设置行内样式时生效；P0-3：技能卡 talent-card 为 flex，释放按钮靠右）
    function applyClassDefaults(node) {
        const cls = node.attrs && node.attrs.class;
        // .box 卡片（DOM 全局 CSS .box：bg-card 背景、1px 边框、radius10、pad14、margin10 0）
        if (cls && String(cls).indexOf('box') >= 0 && node.tag === 'div') {
            if (!node.style.background) node.style.background = 'var(--bg-card)';
            if (!node.style.border) node.style.border = '1px solid var(--border-primary)';
            if (!node.style['border-radius']) node.style['border-radius'] = '10px';
            if (!node.style.padding) node.style.padding = '14px';
            if (!node.style.margin) node.style.margin = '10px 0';
        }
        // h3 区块标题（DOM 全局 CSS h3：accent 青绿、左 3px 竖线、pad-left 14、600、16px、letter-spacing 2、mb 10）
        if (node.tag === 'h3') {
            if (!node.style.color) node.style.color = 'var(--accent-primary)';
            if (!node.style['border-left']) node.style['border-left'] = '3px solid var(--accent-primary)';
            if (!node.style['padding-left']) node.style['padding-left'] = '14px';
            if (!node.style['font-weight']) node.style['font-weight'] = '600';
            if (!node.style['margin-bottom']) node.style['margin-bottom'] = '10px';
        }
        if (cls && String(cls).indexOf('talent-card') >= 0) {
            if (!node.style.display) node.style.display = 'flex';
            if (!node.style.gap) node.style.gap = '12px';
            if (!node.style.padding) node.style.padding = '12px';
            if (!node.style['border-radius']) node.style['border-radius'] = '8px';
            if (!node.style['margin-bottom']) node.style['margin-bottom'] = '10px';
            if (!node.style.background) node.style.background = 'var(--bg-card)';
            if (!node.style.border) node.style.border = '1px solid #2a3a4a';
            const kids = (node.children || []).filter(function (cc) { return cc.tag !== '#text' || String(cc.text || '').trim(); });
            // .talent-card > div:first-child { flex:1; min-width:0 }——文本区占满剩余宽度，按钮贴右
            if (kids.length && kids[0].tag === 'div' && !kids[0].style.flex) kids[0].style.flex = '1';
        }
        (node.children || []).forEach(applyClassDefaults);
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
            try { cw = R.measureText(cur, fontSize); } catch (e) { try { R.ctx.font = fontSize + 'px sans-serif'; cw = R.ctx.measureText(cur).width; } catch (e2) { cw = cur.length * fontSize; } }
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

    // Fix18: 解析 padding 简写 + button 默认 12px 16px（DOM 全局 button{padding:12px 16px}）
    function paddingOf(node) {
        const p = node.style;
        const isBtn = node.tag === 'button';
        const defTop = isBtn ? 12 : 0, defSide = isBtn ? 16 : 0;
        function px(v, def) { if (!v) return def; const n = parseFloat(v); return isNaN(n) ? def : n; }
        // 解析 padding 简写
        var padShorthand = { t: NaN, r: NaN, b: NaN, l: NaN };
        if (p.padding) {
            var parts = String(p.padding).split(/\s+/).map(function (s) { return parseFloat(s); });
            if (parts.length === 1) { padShorthand = { t: parts[0], r: parts[0], b: parts[0], l: parts[0] }; }
            else if (parts.length === 2) { padShorthand = { t: parts[0], r: parts[1], b: parts[0], l: parts[1] }; }
            else if (parts.length === 3) { padShorthand = { t: parts[0], r: parts[1], b: parts[2], l: parts[1] }; }
            else if (parts.length === 4) { padShorthand = { t: parts[0], r: parts[1], b: parts[2], l: parts[3] }; }
        }
        return {
            top: px(p['padding-top'], isNaN(padShorthand.t) ? defTop : padShorthand.t),
            right: px(p['padding-right'], isNaN(padShorthand.r) ? defSide : padShorthand.r),
            bottom: px(p['padding-bottom'], isNaN(padShorthand.b) ? defTop : padShorthand.b),
            left: px(p['padding-left'], isNaN(padShorthand.l) ? defSide : padShorthand.l)
        };
    }

    // Fix16: 解析 margin 简写（margin:1px 2px / margin:1px 2px 3px / margin:1px 2px 3px 4px）
    function parseMarginShorthand(node) {
        var m = node.style && node.style.margin;
        if (!m) return { t: NaN, r: NaN, b: NaN, l: NaN };
        var parts = String(m).split(/\s+/).map(function (s) { return parseFloat(s); });
        if (parts.length === 1) return { t: parts[0], r: parts[0], b: parts[0], l: parts[0] };
        if (parts.length === 2) return { t: parts[0], r: parts[1], b: parts[0], l: parts[1] };
        if (parts.length === 3) return { t: parts[0], r: parts[1], b: parts[2], l: parts[1] };
        if (parts.length === 4) return { t: parts[0], r: parts[1], b: parts[2], l: parts[3] };
        return { t: NaN, r: NaN, b: NaN, l: NaN };
    }
    function marginTop(node) {
        var v = node.style['margin-top'];
        if (v) { var n = parseFloat(v); return isNaN(n) ? 0 : n; }
        var sh = parseMarginShorthand(node);
        return isNaN(sh.t) ? 0 : sh.t;
    }
    function marginBottom(node) {
        var v = node.style['margin-bottom'];
        if (v) { var n = parseFloat(v); return isNaN(n) ? 0 : n; }
        var sh = parseMarginShorthand(node);
        if (!isNaN(sh.b)) return sh.b;
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

    // 行内元素判定（模块级，供 naturalWidth/layoutBlock 共用）
    const INLINE_TAGS = { span: 1, button: 1, a: 1, label: 1, em: 1, strong: 1, b: 1, small: 1, i: 1 };
    function isInlineish(c) {
        if (!c) return false;
        if (c.tag === '#text' || c.tag === 'svgtext' || c.tag === 'svg') return true;
        if (!c.style) return false;
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

    // flex 布局辅助：无 flex 声明的子项按内容自然宽度（修复：图标/标签不再被平分整行而撑爆/截断）
    function naturalWidth(node, parentFs) {
        parentFs = parentFs || 13;
        if (!node) return 0;
        if (node.tag === '#text') {
            // 文本节点：按最大行宽测量（fontSizeOf 会继承父级字号）
            node.style = node.style || {};
            const fs = fontSizeOf(node, parentFs);
            let w = 0;
            let full = String(node.text || '').replace(/[ \t\r\n]+/g, ' ').trim();
            if (full) w = Math.max(w, textW(full, fs));
            return w;
        }
        if (node.tag === 'br') return 0;
        node.style = node.style || {};
        const pad = paddingOf(node);
        // DOM 全局 button{margin:4px}：未行内覆盖的边补 4px（影响行内流换行/间距）
        const btnGlob = node.tag === 'button' ? 4 : 0;
        const mlRaw = parseFloat(node.style['margin-left'] || '0');
        const mrRaw = parseFloat(node.style['margin-right'] || '0');
        const ml = (isNaN(mlRaw) ? 0 : mlRaw) + (node.style['margin-left'] ? 0 : btnGlob);
        const mr = (isNaN(mrRaw) ? 0 : mrRaw) + (node.style['margin-right'] ? 0 : btnGlob);
        function textW(t, fs) {
            try { return R.measureText(t, fs); } catch (e) { try { R.ctx.font = fs + 'px sans-serif'; return R.ctx.measureText(t).width; } catch (e2) { return t.length * fs; } }
        }
        // 按行内流逐段累加：同一行内 #text/svg/svgtext/行内容器宽度求和，
        // br 与块级子元素结算换行，取最大行宽（根治：<button>普通<span>(27)</span></button> 折行）
        let maxLine = 0, curLine = 0;
        (function walk(n, parentFs) {
            if (!n) return;
            n.style = n.style || {};
            const fs = fontSizeOf(n, parentFs);
            if (n.tag === '#text') {
                const t = n.text || '';
                const segs = t.split('\n');
                segs.forEach(function (s, i) {
                    if (i > 0) { maxLine = Math.max(maxLine, curLine); curLine = 0; }
                    if (s.trim()) curLine += textW(s, fs);
                });
                return;
            }
            if (n.tag === 'svgtext') {
                if (n.svg) curLine += svgSize(n.svg, fs).w + 5;
                curLine += textW(n.text || '', fs);
                return;
            }
            if (n.tag === 'svg') { curLine += svgSize(n, fs).w; return; }
            if (n.tag === 'br') { maxLine = Math.max(maxLine, curLine); curLine = 0; return; }
            // 行内容器：继续累加；flex(row) 容器：宽 = Σ子项自然宽 + Σgap（flex:1 项按内容宽参与，避免容器被低估导致子项 wrap 竖排）；块级：结算换行再递归
            if (isInlineish(n)) {
                (n.children || []).forEach(function (c) { walk(c, fs); });
            } else if (n.style && (n.style.display === 'flex' || n.style.display === 'inline-flex')) {
                const g = parseFloat(n.style.gap || '0') || 0;
                let sum = 0, cnt = 0;
                (n.children || []).forEach(function (c) {
                    if (c.tag === '#text' && !String(c.text || '').trim()) return;
                    sum += naturalWidth(c, fs) + (cnt > 0 ? g : 0);
                    cnt++;
                });
                maxLine = Math.max(maxLine, sum);
                curLine = 0;
            } else {
                maxLine = Math.max(maxLine, curLine);
                curLine = 0;
                (n.children || []).forEach(function (c) { walk(c, fs); });
                maxLine = Math.max(maxLine, curLine);
                curLine = 0;
            }
        })(node, parentFs);
        maxLine = Math.max(maxLine, curLine);
        return maxLine + pad.left + pad.right + ml + mr;
    }

    function layoutBlock(node, x, y, w, result, inherit) {
        inherit = inherit || { fs: 13, lh: 1.6, ptag: null, pcolor: null };
        node.style = node.style || {};
        node.attrs = node.attrs || {};
        // font-size / line-height 继承（DOM inline style 只写在容器上，文本节点需继承）
        const fsNow = (function () { const f = node.style['font-size']; if (f) { const n = parseFloat(f); if (!isNaN(n)) return n; } if (node.tag === 'h3') return 16; if (node.tag === 'h2') return 26; if (node.tag === 'button') return 15; return inherit.fs; })();
        const lhNow = (function () { const l = node.style['line-height']; if (l) { const n = parseFloat(l); if (!isNaN(n)) return n; } return inherit.lh; })();
        const childInherit = { fs: fsNow, lh: lhNow, ptag: node.tag, pcolor: node.style.color };
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
            // DOM 空白折叠：模板字面量产生的 \n/缩进空白折叠为单空格（根治：天赋名/说明因 \n+空格 高度膨胀、折行错位）
            node.text = String(node.text || '').replace(/[ \t\r\n]+/g, ' ').trim();
            const lines = textLines(node, innerW, fs);
            const h = lines.length * Math.round(fs * inherit.lh);
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: innerW, h: h, lines: lines, fs: fs, ptag: inherit.ptag, pcolor: inherit.pcolor });
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
            try { tw = R.measureText(textStr, fs); } catch (e) { try { R.ctx.font = fs + 'px sans-serif'; tw = R.ctx.measureText(textStr).width; } catch (e2) { tw = textStr.length * fs; } }
            const w = size.w + gap + tw;
            const lines = textLines({ text: textStr }, w - size.w - gap, fs);
            const th = lines.length * Math.round(fs * inherit.lh);
            const h = Math.max(size.h, th);
            result.nodes.push({ node: node, x: x + pad.left, y: cursorY, w: w, h: h, lines: lines, fs: fs, svgSize: size, svgGap: gap, ptag: inherit.ptag, pcolor: inherit.pcolor });
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
            const naturalTotal = naturals.reduce(function (sum, c) { return sum + naturalWidth(c, childInherit.fs); }, 0);
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
                else cw = naturalWidth(child, childInherit.fs);
                if (child.style.width) { const v = child.style.width; const n = parseFloat(v); if (!isNaN(n)) cw = (v.indexOf('%') >= 0) ? innerW * n / 100 : n; }
                if (child.style['min-width']) { const n = parseFloat(child.style['min-width']); if (!isNaN(n)) cw = Math.max(cw, n); }
                // P0-2/P0-3：按钮自然宽测量兜底（NaN/0 时给最小宽 44px），避免 flex 容器内按钮不可见
                if (cw == null || !isFinite(cw) || cw <= 0) cw = 44;
                if (cx == null) cx = x + pad.left;
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
                    rx = x + pad.left;
                    return;
                }
                let cw = naturalWidth(child, childInherit.fs);
                // 长 #text：折行于容器剩余宽内（根治：效果文本按自然宽排布溢出覆盖右列按钮/卡）
                if (child.tag === '#text' && cw > x + w - pad.right - rx) {
                    if (rx > x + pad.left) {
                        curRow = { items: [], rowW: 0, rowH: 0 };
                        rows.push(curRow);
                        rx = x + pad.left;
                    }
                    cw = Math.max(0, x + w - pad.right - rx);
                }
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
                if (row.block) {
                    ry = layoutBlock(row.block, x + pad.left, ry, innerW, result, childInherit);
                    // P0-3：混排行（块级+行内项，如技能卡文本+释放按钮）——块级排完后继续排同排行内项，避免按钮被丢弃
                    if (row.items && row.items.length) {
                        let rowBottom = ry;
                        row.items.forEach(function (it) {
                            const ch = layoutBlock(it.node, it.x, ry, it.w, result, childInherit);
                            rowBottom = Math.max(rowBottom, ry + it.h);
                        });
                        ry = rowBottom;
                    }
                    return;
                }
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
        // DOM 全局 button{min-height:44px;margin:4px;border-radius:8px;font-size:15px;padding:12px 16px}
        // 内联样式只覆盖 padding/font-size/background，min-height:44px 全局生效
        if (node.tag === 'button' && !node.style['min-height'] && !node.style.height) {
            if (bh - y < 44) bh = y + 44;
            var shT = parseMarginShorthand(node).t;
            var shB = parseMarginShorthand(node).b;
            if (!node.style['margin-top'] && isNaN(shT)) bh += 4;
            if (!node.style['margin-bottom'] && isNaN(shB)) bh += 4;
        }
        pushItem(node, x, y, w, bh - y, result);
        return bh;
    }

    // 抽奖动画模拟：逻辑层 goldGacha 的 interval 依赖 DOM（无 document 时不推进），
    // 渲染层按时间推进进度条/状态文本，100% 后显示结果摘要
    function animateGacha(root) {
        const flat = [];
        (function walk(n) { flat.push(n); (n.children || []).forEach(walk); })(root);
        const byId = {};
        flat.forEach(function (n) { if (n.attrs && n.attrs.id) byId[n.attrs.id] = n; });
        const prog = byId.gachaProgress;
        // 无 gacha 进度条：不进入动画态（否则 openedAt 置位 → drawModal 每帧重布局，大弹窗卡死）
        if (!prog) return;
        if (!state.openedAt) state.openedAt = Date.now();
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
                const ptag = n.ptag || '';
                const defCol = (ptag === 'h2' || ptag === 'h3') ? t.accent : t.textPrimary;
                R.drawText(ln, ax, y + i * Math.round(n.fs * 1.6), {
                    fontSize: n.fs,
                    color: n.pcolor ? colorOf({ style: { color: n.pcolor } }, defCol) : defCol,
                    align: align === 'center' ? 'center' : (align === 'right' ? 'right' : 'left'),
                    bold: node.style['font-weight'] === 'bold' || node.tag === 'strong' || node.tag === 'b' || ptag === 'h2' || ptag === 'h3',
                    letterSpacing: ptag === 'h2' ? 4 : (ptag === 'h3' ? 2 : 0),
                    glow: ptag === 'h2' ? 'rgba(0,229,176,0.35)' : null
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
            // DOM h3/区块标题左竖线：解析 border-left 行内颜色（accent/success/info/quality 等），未匹配默认 accent
            const bl = node.style['border-left'];
            let bc = t.accent;
            const blm = bl.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|var\([^)]+\))/);
            if (blm) {
                if (blm[1].indexOf('var(') === 0) {
                    const t2 = R.Theme.get();
                    const nm = blm[1].replace('var(', '').replace(')', '').trim();
                    const map = { '--accent-primary': t2.accent, '--accent-warning': t2.warning, '--accent-success': t2.success, '--accent-info': t2.info, '--accent-danger': t2.danger, '--accent-purple': t2.purple, '--accent-orange': t2.orange, '--text-primary': t2.textPrimary, '--text-secondary': t2.textSecondary, '--text-muted': t2.textMuted, '--text-faint': t2.textFaint, '--bg-card': t2.bgCard, '--bg-secondary': t2.bgSecondary, '--border-primary': t2.border, '--bg-hover': t2.bgHover };
                    bc = map[nm] || t.accent;
                } else {
                    bc = blm[1];
                }
            }
            R.drawRect(x, y, 3, h, { fill: bc, radius: 1.5 });
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
            const ptag2 = n.ptag || '';
            const defCol2 = (ptag2 === 'h2' || ptag2 === 'h3') ? t.accent : t.textPrimary;
            R.drawText(ln, tx, y + (h - n.lines.length * Math.round(fs * 1.6)) / 2 + i * Math.round(fs * 1.6), {
                fontSize: fs,
                color: n.pcolor ? colorOf({ style: { color: n.pcolor } }, defCol2) : defCol2,
                bold: node.style['font-weight'] === 'bold' || ptag2 === 'h2' || ptag2 === 'h3',
                letterSpacing: ptag2 === 'h2' ? 4 : (ptag2 === 'h3' ? 2 : 0),
                glow: ptag2 === 'h2' ? 'rgba(0,229,176,0.35)' : null
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
            radius: 8,
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
        const wasVisible = state.visible;
        state.visible = true;
        state.html = String(html || '');
        state.buttons = [];
        state.openedAt = 0;
        state.gachaDone = false;
        // P9-4：弹窗已可见时仅更新内容（如图鉴展开/收起卡片重渲染），保留当前滚动位置，
        // 避免"点卡片瞬间弹回顶端再由 scrollIntoView 滚下去"的回弹闪烁；仅首次打开才归零
        if (!wasVisible) {
            state.popScroll = 0;
            state.popScrollMax = 0;
        }
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
        Input.setPopupScroll(null);  // P9-9
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
        // P9-6：popScrollMax 需含 padT+padB，否则滚到底时内容底部差 padding 被裁
        state.popScrollMax = Math.max(0, lay.height + padT + padB - h);
        if (state.popScrollMax <= 0) state.popScroll = 0;
        else state.popScroll = Math.min(state.popScrollMax, Math.max(0, state.popScroll));
        Input.setPopupScroll({
            x: x, y: y, w: maxW, h: h,
            get: function () { return state.popScroll; },
            set: function (v) { state.popScroll = Math.min(state.popScrollMax, Math.max(0, v)); },
            max: function () { return state.popScrollMax; }
        });

        // 遮罩拦截（P1-2/P8-1）：注册为弹窗四周的 4 条边带（弹窗矩形区域不注册遮罩）。
        // 弹窗打开期间：点弹窗外部任意区域 → 落在边带遮罩上关闭弹窗；
        // 点弹窗内部（含内容空白区）→ 不命中遮罩 → 不关闭（可拖拽滚动/命中内容按钮）。
        {
            const mz = 4;
            const _mx = x, _my = y, _mw = maxW, _mh = h;
            const bands = [
                { x: 0, y: 0, w: R.SCREEN_W, h: Math.max(0, _my - mz) },
                { x: 0, y: _my + _mh + mz, w: R.SCREEN_W, h: Math.max(0, R.SCREEN_H - (_my + _mh + mz)) },
                { x: 0, y: Math.max(0, _my - mz), w: Math.max(0, _mx - mz), h: Math.min(R.SCREEN_H, _mh + mz * 2) },
                { x: _mx + _mw + mz, y: Math.max(0, _my - mz), w: Math.max(0, R.SCREEN_W - (_mx + _mw + mz)), h: Math.min(R.SCREEN_H, _mh + mz * 2) }
            ];
            bands.forEach(function (b, bi) {
                if (b.w <= 0 || b.h <= 0) return;
                Input.registerButton({
                    id: 'popMask_' + bi, x: b.x, y: b.y, w: b.w, h: b.h,
                    disabled: false, onTap: function () { blurInput(); closePopup(); }
                });
            });
        }

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
        // P9-2：滚动偏移只应用一次（oy 已含 -popScroll），不再画布 translate，否则视觉位移=2×popScroll，
        // 与按钮注册坐标（item.y+oy）错位 popScroll 像素，导致点击视觉位置不命中
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
        // tooltip 悬停区注册（onmouseover="game.showTooltip(event,'TEXT')" / title / data-talent-id）：
        // 用鼠标坐标命中（Input._hoverX/_hoverY），不注册按钮（避免拦截下层点击）
        state._hoverTips = {};
        lay.nodes.forEach(function (it, _tipIdx) {
            const node = it.node;
            if (!node) return;
            const attrs = node.attrs || {};
            let tipText = null;
            const ov = attrs.onmouseover;
            if (ov && typeof ov === 'string') {
                const mm = ov.match(/'([^']*)'/);
                if (mm && mm[1]) tipText = mm[1];
            }
            if (tipText == null && attrs.title) tipText = String(attrs.title);
            const tid = attrs['data-talent-id'];
            if (!tipText && !tid) return;
            const bx = it.x + x + padL, by = it.y + y + padT - state.popScroll - 4, bh = Math.max(20, it.h + 8);
            if (!insideClip(bx, by, it.w, bh)) return;
            const key = tid ? ('talent_' + tid) : ('tip_' + _tipIdx + '_' + tipText.slice(0, 14));
            // 锚点：下方空间不足时上翻（避免压住下方卡片/内容）
            let ax = bx + it.w / 2, ay = by + bh + 2;
            const cr = state.clipRect;
            if (cr && ay + 130 > cr.y + cr.h) ay = Math.max(cr.y + 8, by - 6);
            state._hoverTips[key] = { text: tipText, talentId: tid || null, x: bx, y: by, w: it.w, h: bh, ax: ax, ay: ay };
        });


        // 右上角关闭按钮 ×（P1-1）：点击关闭弹窗
        // P9-5：叉号收进弹窗内部右上角（原 cx=x+maxW-4/cy=y+4 浮在框外，太靠外）
        const cx = x + maxW - 20, cy = y + 20;
        R.ctx.strokeStyle = t.textMuted;
        R.ctx.lineWidth = 1.8;
        R.ctx.lineCap = 'round';
        R.ctx.beginPath();
        R.ctx.moveTo(cx - 5, cy - 5); R.ctx.lineTo(cx + 5, cy + 5);
        R.ctx.moveTo(cx + 5, cy - 5); R.ctx.lineTo(cx - 5, cy + 5);
        R.ctx.stroke();
        Input.registerButton({
            id: 'popBtn_close', x: cx - 22, y: cy - 22, w: 44, h: 44,  // 命中区 44×44（TapTap 移动端最小点击标准），视觉 × 仍为 10px
            disabled: false, onTap: function () { blurInput(); closePopup(); }
        });
        // P7-1：删除关闭叉 hover 提示（对齐用户要求：关闭按钮不显示 tooltip）
        // 桌面端 hover tooltip 触发（坐标命中 tooltip 悬停区；鼠标离开后隐藏）
        // P6-2: 点击触发的 tooltip（key 前缀 click_）不被 hover 检测覆盖/关闭（DOM 点击 tooltip 固定显示）
        const _clickTip = tooltipState.key && tooltipState.key.indexOf('click_') === 0;
        if (window.Input && typeof Input._hoverX === 'number' && !_clickTip) {
            const mx = Input._hoverX, my = Input._hoverY;
            let hit = null;
            for (const hk in state._hoverTips) {
                const r = state._hoverTips[hk];
                if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { hit = r; hit.key = hk; break; }
            }
            const curKey = hit ? hit.key : null;
            if (curKey !== state._lastHoverKey) {
                state._lastHoverKey = curKey;
                if (hit) {
                    if (hit.talentId) {
                        const d = buildTalentTooltip(hit.talentId);
                        if (d) { tooltipState.data = d; tooltipState.x = hit.ax; tooltipState.y = hit.ay; tooltipState.key = 'talent_' + hit.talentId; }
                    } else if (hit.text) {
                        tooltipState.data = { title: hit.text };
                        tooltipState.x = hit.ax; tooltipState.y = hit.ay;
                        tooltipState.key = 'hover_' + hit.text.slice(0, 16);
                    }
                } else {
                    hideTooltip();
                }
            }
        }

    }

    function drawNodesRecursive(root, lay, ox, oy) {
        root.children = root.children || [];
        root.children.forEach(function (child) {
            const item = findNode(lay, child);
            if (!item) return;
            const hasPtr = typeof window !== 'undefined' && window.Input && Input._hoverX != null && Input._hoverY != null;
            const isTalentCard = child.tag === 'div' && child.attrs && child.attrs.class && String(child.attrs.class).indexOf('talent-card') >= 0;
            let offY = 0;
            if (isTalentCard && hasPtr) {
                const hx = item.x + ox, hy = item.y + oy, hw = item.w, hh = item.h;
                if (Input._hoverX >= hx && Input._hoverX <= hx + hw && Input._hoverY >= hy && Input._hoverY <= hy + hh) offY = -1;
            }
            drawNode(item, item.x + ox, item.y + oy + offY, item.w, item.h);
            // P6-1: talent-card hover 反馈——背景提亮 ~10%、边框发光、卡片上移 1px（DOM transition 0.15s 等效即时绘制）
            if (offY !== 0) {
                const t2 = R.Theme.get();
                const rr = parseFloat(child.style['border-radius'] || '8') || 8;
                R.ctx.save();
                R.drawRect(item.x + ox, item.y + oy + offY, item.w, item.h, {
                    fill: 'rgba(255,255,255,0.07)',
                    stroke: t2.accent,
                    lineWidth: 1.4,
                    radius: rr
                });
                R.ctx.restore();
            }
            if (child.tag === 'button') { drawButtonNode(child, item, ox, oy + offY); return; }
            // 带 onclick 的非 button 节点（div/span 等）：只注册点击区域，不覆盖绘制
            if (child.attrs && child.attrs.onclick) { registerNodeTap(child, item, ox, oy + offY); }
            // data-talent-id 天赋名：点击弹完整 tooltip（对齐 DOM bindItemTooltips click；tooltip 内容 buildTalentTooltip）
            if (child.attrs && child.attrs['data-talent-id']) {
                const _tid = child.attrs['data-talent-id'];
                const _bx = item.x + ox, _by = item.y + oy + offY, _bw = item.w, _bh = item.h;
                Input.registerButton({
                    id: 'popBtn_' + (state.buttons.length),
                    x: _bx, y: _by, w: _bw, h: _bh,
                    disabled: false, onTap: (function (id2, bxx, byy, bww, bhh) {
                        return function () {
                            if (tooltipState.key === 'click_talent_' + id2) { hideTooltip(); return; }
                            const d2 = buildTalentTooltip(id2);
                            if (!d2) return;
                            tooltipState.data = d2;
                            const an2 = window.Input.getLastTapAnchor();
                            tooltipState.x = an2 ? an2.x : bxx + bww / 2;
                            tooltipState.y = an2 ? an2.y + 8 : byy + bhh + 8;
                            tooltipState.key = 'click_talent_' + id2;
                        };
                    })(_tid, _bx, _by, _bw, _bh)
                });
                state.buttons.push({ x: _bx, y: _by, w: _bw, h: _bh, disabled: false });
            }
            drawNodesRecursive(child, lay, ox, oy + offY);
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

    // 收集按钮内容片段（图标 svg + 文本，按 DOM 行内流顺序）
    function buttonContent(node) {
        const pieces = [];
        (function walk(n) {
            (n.children || []).forEach(function (c) {
                if (c.tag === '#text') {
                    if (String(c.text || '').trim()) pieces.push({ type: 'text', text: String(c.text) });
                } else if (c.tag === 'svgtext') {
                    if (c.svg) pieces.push({ type: 'icon', svg: c.svg });
                    if (c.text && String(c.text.text || '').trim()) pieces.push({ type: 'text', text: String(c.text.text) });
                } else if (c.tag === 'svg') {
                    pieces.push({ type: 'icon', svg: c });
                } else if (c.tag === 'br') {
                    pieces.push({ type: 'br' });
                } else if (c.tag !== 'input') {
                    walk(c);
                }
            });
        })(node);
        return pieces;
    }

    function btnTextW(t, fs) {
        try { return R.measureText(t, fs); } catch (e) { try { R.ctx.font = fs + 'px sans-serif'; return R.ctx.measureText(t).width; } catch (e2) { return String(t).length * fs; } }
    }

    function drawButtonNode(node, item, ox, oy) {
        const t = R.Theme.get();
        const x = item.x + ox, y = item.y + oy, w = item.w, h = item.h;
        // P0-2/P0-3：布局异常防御——无效/非正尺寸直接跳过，避免脏矩形或不可点按钮
        if (!isFinite(x) || !isFinite(y) || !isFinite(w) || !isFinite(h) || w <= 0 || h <= 0) return;
        const disabled = node.attrs.disabled === '' || node.attrs.disabled === 'disabled' || node.attrs.disabled === 'true';
        // P5-1: hover / pressed 检测（弹窗按钮；坐标命中 + Input.pressedId）
        const btnId = 'popBtn_' + (state.buttons.length);
        const hasPtr = typeof window !== 'undefined' && window.Input && Input._hoverX != null && Input._hoverY != null;
        const hovered = !disabled && hasPtr && Input._hoverX >= x && Input._hoverX <= x + w && Input._hoverY >= y && Input._hoverY <= y + h;
        const pressed = !disabled && hasPtr && Input.pressedId === btnId;
        // DOM button:hover translateY(-1px) / :active translateY(1px)
        const shiftY = pressed ? 1 : (hovered ? -1 : 0);
        const yy = y + shiftY;
        const rawBg = bgColorOf(node) || t.accent;
        const bg = pressed ? (R.shade ? R.shade(rawBg, -0.2) : rawBg)
            : (hovered ? (R.shade ? R.shade(rawBg, 0.14) : rawBg) : rawBg);
        const radiusRaw = parseFloat(node.style['border-radius'] || '0');
        const radius = isNaN(radiusRaw) ? 8 : radiusRaw;
        // Fix13: 语义色 → 主界面按钮视觉包络（对齐 canvas.js drawButton）
        // Fix20: data-noglow 标记的按钮（如关闭小按钮）纯平涂，无边/发光/渐变
        var plain = node.attrs && (node.attrs['data-noglow'] === '' || node.attrs['data-noglow'] === 'true');
        let borderColor = null, glow = null, grad = null;
        if (!disabled && !plain) {
            if (bg === t.accent) {
                grad = { from: t.accent, to: t.accentDark };
                borderColor = 'rgba(0,255,170,0.3)';
                glow = 'rgba(0,212,170,0.3)';
            } else if (bg === t.success) {
                borderColor = 'rgba(0,255,170,0.3)';
            } else if (bg === t.danger) {
                borderColor = 'rgba(255,82,82,0.4)';
                glow = 'rgba(255,82,82,0.3)';
            } else if (bg === t.warning) {
                grad = { from: t.warning, to: t.orange };
                borderColor = 'rgba(255,183,77,0.4)';
                glow = 'rgba(255,183,77,0.3)';
            } else if (bg === t.purple) {
                borderColor = 'rgba(171,71,188,0.4)';
            } else if (bg === t.info) {
                borderColor = 'rgba(66,165,245,0.4)';
            } else if (bg === t.orange) {
                borderColor = 'rgba(255,112,67,0.4)';
            } else {
                // Fix17: 次要按钮（bgCard/textFaint 等）——DOM 原版所有按钮统一青绿边+青绿发光
                borderColor = 'rgba(0,255,170,0.3)';
                glow = 'rgba(0,212,170,0.3)';
            }
        }
        // P5-1: 渐变跟随 hover 提亮 / pressed 变暗
        if (grad && R.shade) grad = hovered ? { from: R.shade(grad.from, 0.14), to: R.shade(grad.to, 0.14) } : (pressed ? { from: R.shade(grad.from, -0.2), to: R.shade(grad.to, -0.2) } : grad);
        R.ctx.save();
        // P5-1: 按下缩放 0.98（DOM button:active scale(.98)）
        if (pressed) {
            const scx = x + w / 2, scy = y + h / 2;
            R.ctx.translate(scx, scy);
            R.ctx.scale(0.98, 0.98);
            R.ctx.translate(-scx, -scy);
        }
        if (disabled) R.ctx.globalAlpha = 0.6;
        if (glow) {
            R.ctx.shadowColor = glow;
            // P5-1: hover 外发光增强（DOM hover box-shadow 0 4px 15px ≈ shadowBlur 15）
            R.ctx.shadowBlur = hovered ? 15 : 5;
            R.ctx.shadowOffsetY = 2;
        }
        R.drawRect(x, yy, w, h, {
            fill: grad ? null : (disabled ? t.bgHover : bg),
            gradient: grad,
            stroke: borderColor,
            lineWidth: 1,
            radius: radius
        });
        // 顶部内高光（主界面按钮同款 inset 0 1px 0 rgba(255,255,255,0.2)）
        if (!disabled && radius > 0) {
            R.ctx.save();
            R.ctx.globalAlpha = 0.2;
            R.ctx.fillStyle = '#ffffff';
            R.ctx.fillRect(x + 1, yy + 1, w - 2, 1);
            R.ctx.restore();
        }
        R.ctx.restore();
        // 按钮内容：收集图标 + 文本（DOM 行内流顺序），图标与文字同组水平居中垂直对齐
        const fs = fontSizeOf(node, 15);
        const btnColor = colorOf(node, '#ffffff');
        const pieces = buttonContent(node);
        let text = '';
        pieces.forEach(function (p) { if (p.type === 'br') text += '\n'; else if (p.type === 'text') text += p.text; });
        const lines = textLines({ text: text }, Math.max(8, w - 8), fs);
        const icons = [];
        let iconW = 0;
        pieces.forEach(function (p) { if (p.type === 'icon') { icons.push(p.svg); iconW += svgSize(p.svg, fs).w; } });
        const gap = (icons.length && lines[0]) ? 5 : 0;
        const firstW = lines[0] ? btnTextW(lines[0], fs) : 0;
        const contentW = iconW + gap + firstW;
        const textH = Math.round(fs * 1.6);
        let ix = x + (w - contentW) / 2;
        // 图标：垂直居中，颜色继承按钮文字色（根治：svg 画成空心圈/缺色）
        icons.forEach(function (s) {
            const size = svgSize(s, fs);
            s.style = s.style || {};
            if (!s.style.color) s.style.color = node.style.color || '#ffffff';
            drawSVG(s, ix, yy + h / 2 - size.h / 2, size.w, size.h);
            ix += size.w;
        });
        if (icons.length && lines.length) ix += 5;
        // 文本：首行接图标后，其余行按按钮中心居中
        // Fix13: 文字阴影（对齐主界面 button text-shadow 0 1px 2px rgba(0,0,0,0.3)）
        R.ctx.save();
        if (!disabled) {
            R.ctx.shadowColor = 'rgba(0,0,0,0.3)';
            R.ctx.shadowBlur = 2;
            R.ctx.shadowOffsetY = 1;
        }
        lines.forEach(function (ln, i) {
            if (!ln) return;
            const lx = (i === 0) ? ix + btnTextW(ln, fs) / 2 : x + w / 2;
            R.drawText(ln, lx, yy + h / 2 - ((lines.length - 1) * textH) / 2 + i * textH, {
                fontSize: fs, color: btnColor, align: 'center', bold: true
            });
        });
        R.ctx.restore();
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
            // P8-1: event 形参转 undefined（Canvas 无 DOM 事件对象），修复套装/组合/联动/碎片 tooltip 失效
            if (a === '' || a === 'event') return undefined;
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

    // P9-1：弹窗滚动到指定 id 元素可见（图鉴展开详情/长列表定位用）。
    // 布局基于当前缓存树（与屏幕绘制同一份），节点 y 为弹窗内容坐标（未减 popScroll）。
    // toggle 后 html 变化触发重布局是异步的（403KB 级 html 解析耗时），因此带重试：
    // 目标节点尚未出现在布局中（收起态 display:none 或布局未就绪）时轮询等待，最长 ~1.6s。
    function scrollIntoView(htmlId, tries) {
        tries = tries || 0;
        if (!state.visible) return;
        if (!_cacheRoot || !_cacheLayout) {
            // 弹窗刚打开/重渲染，drawModal 尚未完成首次 parse+layout：轮询重试
            if (tries < 20) {
                setTimeout(function () { scrollIntoView(htmlId, tries + 1); }, 80);
            }
            return;
        }
        let target = null;
        (function walk(n) {
            if (target) return;
            if (n.attrs && n.attrs.id === htmlId) { target = n; return; }
            (n.children || []).forEach(walk);
        })(_cacheRoot);
        if (!target) return;
        const item = findNode(_cacheLayout, target);
        if (!item || !item.h || item.h < 2) {
            if (tries < 20) {
                setTimeout(function () { scrollIntoView(htmlId, tries + 1); }, 80);
            }
            return;
        }
        const maxW = Math.min(R.SCREEN_W * 0.92, 500);
        const padT = 16, padB = 40;
        const h = Math.min(_cacheLayout.height + padT + padB, Math.round(R.SCREEN_H * 0.85));
        const viewH = h - padT - padB;
        const viewTop = state.popScroll;
        const nodeTop = item.y;
        const nodeBottom = item.y + item.h;
        let targetScroll = state.popScroll;
        if (nodeBottom > viewTop + viewH) {
            targetScroll = Math.max(viewTop, nodeBottom - viewH + 6);
        } else if (nodeTop < viewTop) {
            targetScroll = Math.max(0, nodeTop - 6);
        }
        targetScroll = Math.min(state.popScrollMax, Math.max(0, targetScroll));
        if (Math.abs(targetScroll - state.popScroll) > 1) state.popScroll = targetScroll;
    }

    // 弹窗层集成：ScreenManager.draw 末尾调用
    R.Popup = {
        show: show,
        close: close,
        isVisible: isVisible,
        drawModal: drawModal,
        scrollIntoView: scrollIntoView,
        getInputValue: getInputValue,
        _parse: parseHTML,   // 临时调试
        _layout: layout
    };

    // ============================================================
    //  Tooltip 悬浮提示（阶段 4）：读 game.tooltipData[key] 绘制
    // ============================================================
    const tooltipState = { key: null, data: null, x: 0, y: 0 };


    // 悬停天赋名时构造天赋详情 tooltip（对齐 DOM bindItemTooltips → showTalentTooltip）
    function buildTalentTooltip(tid) {
        const g = (typeof game !== 'undefined') ? game : null;
        if (!g || !g.data || !g.data.talents || !g.data.talents.talents) return null;
        let t = null;
        g.data.talents.talents.forEach(function (x) { if (x.id === tid) t = x; });
        if (!t) return null;
        const qn = ['', '普通', '稀有', '史诗', '传说', '神话'];
        const qc = ['', t.success, t.info, t.purple, t.warning, t.orange];
        const typeNames = {1: '防御系', 2: '控制/辅助系', 3: '攻击系', passive: '纯被动', passive_active: '被动+主动技能'};
        const sections = [];
        sections.push({ label: '品质', value: qn[t.quality] || '' });
        sections.push({ label: '类型', value: typeNames[t.type] || String(t.type) });
        const isUnlocked = g.permanent && g.permanent.unlockedTalents && g.permanent.unlockedTalents.indexOf(tid) >= 0;
        // 等级恒显（未解锁 0/x 级；已解锁实际等级）——P7-1 补全 tooltip 值
        {
            const lv = (isUnlocked && typeof g.getTalentLevel === 'function') ? g.getTalentLevel(tid) : 0;
            sections.push({ label: '等级', value: lv + '/' + (t.maxLevel || 5) + '级' + (isUnlocked && g.player && g.player.equippedTalents && g.player.equippedTalents.indexOf(tid) >= 0 ? ' [已装备]' : '') });
        }
        let eff = '';
        if (isUnlocked) { try { const e = g.getTalentEffect(tid); if (e) eff = e.passive || ''; } catch (e2) {} }
        if (!eff && t.effects && t.effects.length > 0) eff = t.effects[0].passive || '';
        sections.push({ label: '效果', value: eff || '暂无效果描述' });
        // 解锁条件（未解锁时，对齐 DOM showTalentTooltip）
        if (!isUnlocked) {
            const cost = t.unlockCost || { fragQuality: t.quality, fragCount: 10 };
            const talentTag = (t.tags && t.tags.length > 0) ? t.tags[0] : 1;
            const tagName = g.tagNames ? (g.tagNames[talentTag] || ('标签' + talentTag)) : ('标签' + talentTag);
            let ex = 0, un = 0;
            if (g.permanent && g.permanent.tagFragments && g.permanent.tagFragments[talentTag]) ex = g.permanent.tagFragments[talentTag][cost.fragQuality] || 0;
            if (g.permanent && g.permanent.universalFragments) un = g.permanent.universalFragments[cost.fragQuality] || 0;
            let ut = cost.fragCount + '个【' + tagName + '】' + qn[cost.fragQuality] + '碎片（专属' + ex + '，万能' + un + '）';
            if (cost.bossCore) ut += ' + 1个对应首领核心';
            sections.push({ label: '解锁条件', value: ut });
        }
        // 进化路线（对齐 DOM advanceTo）
        if (t.advanceTo) {
            let nt = null;
            g.data.talents.talents.forEach(function (x) { if (x.id === t.advanceTo) nt = x; });
            if (nt) sections.push({ label: '进化路线', value: '可进化为：' + nt.name + '（' + qn[nt.quality] + '）' });
        }
        // 融合配方（对齐 DOM isFusion/fusionRecipe）
        if (t.isFusion && t.fusionRecipe) {
            const names = t.fusionRecipe.map(function (id) { let x = null; g.data.talents.talents.forEach(function (y) { if (y.id === id) x = y; }); return x ? x.name : '未知天赋'; }).join(' + ');
            sections.push({ label: '融合配方', value: '融合配方：' + names + '（均需5级）' });
        }
        return { title: t.name, titleColor: qc[t.quality] || null, sections: sections };
    }

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
        // P1-F：tooltip 跟随触发元素（最近一次 onTap 的按钮中心），元素下方 +8px；无锚点回退屏幕居中
        const anchor = (typeof window !== 'undefined' && window.Input && window.Input.getLastTapAnchor) ? window.Input.getLastTapAnchor() : null;
        if (anchor && isFinite(anchor.x) && isFinite(anchor.y)) {
            tooltipState.x = anchor.x;
            tooltipState.y = anchor.y + 8;
        } else {
            tooltipState.x = R.SCREEN_W / 2;
            tooltipState.y = Math.max(90, R.SCREEN_H / 2 - 60);
        }
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
        const maxW = Math.min(R.SCREEN_W - 40, 360);
        // 计算内容行
        const rows = [];
        if (data.title) rows.push({ text: cleanTitleText(data.title), fs: 14, color: data.titleColor || t.warning, bold: true });
        if (data.sections) {
            data.sections.forEach(function (sec) {
                if (sec.label && sec.value) rows.push({ twoCol: true, label: String(sec.label), value: String(sec.value), fs: 13 });
                else if (sec.label) rows.push({ text: String(sec.label), fs: 13, color: t.textSecondary, bold: true });
                else if (sec.value) rows.push({ text: String(sec.value), fs: 13, color: t.textSecondary, bold: false });
            });
        }
        if (data.desc) rows.push({ text: String(data.desc), fs: 13, color: t.textMuted, bold: false });
        if (!rows.length) return;

        // 布局
        const lineH = 20;
        let totalH = 16;
        rows.forEach(function (r, ri) {
            if (r.twoCol) {
                const vlines = R.wrapText(r.value, maxW - 28, r.fs, false);
                totalH += lineH + vlines.length * lineH;
            } else {
                const lines = R.wrapText(r.text, maxW - 28, r.fs, r.bold);
                totalH += lines.length * lineH + (ri === 0 && r.bold ? 5 : 0);
            }
        });
        // P1-F：tooltip 定位跟随锚点（水平居中于触发元素，贴左右边缘 clamp；垂直在元素下方，底部贴边时上翻）
        let x = tooltipState.x - maxW / 2;
        if (x < 8) x = 8;
        if (x + maxW > R.SCREEN_W - 8) x = R.SCREEN_W - maxW - 8;
        let y = tooltipState.y;
        // P8-2：避开覆盖 canvas 的底部 DOM 导航层（约 55px）——tooltip 底部超出安全区下缘时上翻到触发元素上方，
        // 避免长 tooltip（如碎片各体系明细）后段被 DOM 导航遮挡（canvas z-index 0 < DOM 导航）
        const navSafeBottom = R.SCREEN_H - 62;
        if (y + totalH > navSafeBottom) {
            y = Math.max(8, tooltipState.y - totalH - 16);
        }
        if (y < 8) y = 8;

        // 背景（DOM .tooltip-box: rgba(20,20,40,.98) + 1px accent-warning 橙边 + 8px 圆角）
        R.ctx.globalAlpha = 0.98;
        R.drawRect(x, y, maxW, totalH, { fill: 'rgba(20,20,40,0.98)', radius: 8, stroke: t.warning });
        R.ctx.globalAlpha = 1;

        let iy = y + 12;
        rows.forEach(function (r, ri) {
            if (r.twoCol) {
                // 对齐 DOM 参考图：section 标签单独一行（橙色小字 bold），值在下一行（白色正文）
                R.drawText(r.label, x + 14, iy, { fontSize: r.fs, color: t.warning, bold: true });
                iy += lineH;
                const vlines = R.wrapText(r.value, maxW - 28, r.fs, false);
                vlines.forEach(function (ln, li) {
                    R.drawText(ln, x + 14, iy + li * lineH, { fontSize: r.fs, color: t.textPrimary, bold: false });
                });
                iy += vlines.length * lineH;
            } else {
                const lines = R.wrapText(r.text, maxW - 28, r.fs, r.bold);
                lines.forEach(function (ln) {
                    R.drawText(ln, x + 14, iy, { fontSize: r.fs, color: r.color, bold: r.bold });
                    iy += lineH;
                });
            }
            // DOM .tooltip-title border-bottom: 1px solid rgba(255,213,79,.3)（标题行下方分隔线）
            if (ri === 0 && r.bold && iy + 4 < y + totalH - 2) {
                R.ctx.save();
                R.ctx.globalAlpha = 0.3;
                R.ctx.fillStyle = '#ffd54f';
                R.ctx.fillRect(x + 14, iy + 1, maxW - 28, 1);
                R.ctx.restore();
                iy += 5;
            }
        });
    }

    R.Tooltip = {
        show: showTooltip,
        hide: hideTooltip,
        isVisible: tooltipIsVisible,
        draw: drawTooltip
    };
})();
