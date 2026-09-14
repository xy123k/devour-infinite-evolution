// ============================================================
//  render/screens/tutorialOverlay.js — 阶段 4：新手引导 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  数据：game.tutorialSteps / game.currentTutorialStep（逻辑层不动）
//  视觉对齐：DOM 原版 index.html#tutorialOverlay（全屏 rgba(0,0,0,0.85) 遮罩
//  + 居中卡片 max-width:450px / width:90% / 2px 金色描边 / 圆角12 / padding25
//  + 标题20px金色加粗居中 + 进度点10px间距8 + 内容14px行高1.8(min-height:120px)
//  + tip 信息底色块 + 按钮组[跳过引导(下划线文本链接)][上一步][下一步/开始游戏(金色加粗)]）
// ============================================================
(function () {
    'use strict';

    const R = window.Render;
    const Input = window.Input;
    const g = function () { return (typeof game !== 'undefined') ? game : null; };

    const state = { visible: false, hint: '' };

    function show() { state.visible = true; state.hint = ''; }
    function hide() { state.visible = false; state.hint = ''; }
    function isVisible() { return state.visible; }

    function stripHtml(s) {
        return String(s == null ? '' : s)
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }

    function draw() {
        const game = g();
        if (!game || !state.visible) return;
        const t = R.Theme.get();
        const step = game.tutorialSteps[game.currentTutorialStep];
        if (!step) return;
        const ctx = R.ctx;

        // ---- 全屏遮罩（DOM: rgba(0,0,0,0.85)）----
        R.drawRect(0, 0, R.SCREEN_W, R.SCREEN_H, { fill: 'rgba(0,0,0,0.85)' });

        // ---- 卡片尺寸（DOM: width:90%, max-width:450px, padding:25px）----
        const pad = 25;
        const boxW = Math.min(450, R.SCREEN_W * 0.9);
        const innerW = boxW - pad * 2;
        const centerX = R.SCREEN_W / 2;

        // 标题（DOM: 20px 金色加粗居中, margin-bottom:15px）
        const title = stripHtml(step.title);
        const titleH = 30;

        // 内容（DOM: 14px, line-height:1.8, min-height:120px, margin-bottom:20px）
        const content = stripHtml(step.content);
        const fs = 14;
        const lineH = Math.round(fs * 1.8); // 25
        const cLines = R.wrapText(content, innerW, fs, false);
        const contentH = Math.max(cLines.length * lineH, 120);

        // tip（DOM: .tip 信息底色块 13px）
        const tipText = step.tip ? '💡 ' + step.tip : '';
        const tipLines = tipText ? R.wrapText(tipText, innerW - 16, 13, false) : [];
        const tipH = tipLines.length ? tipLines.length * 20 + 16 : 0;

        // 按钮行（DOM: gap:10, padding:10px 20px → 高约 42px）
        const btnH = 42;

        // 纵向尺寸汇总（DOM 顺序: title(30+15) → dots(10+15) → content → tip → buttons(20+42) + pad*2）
        const boxH = pad + titleH + 15 + 10 + 15 + contentH + (tipH ? tipH + 10 : 0) + 20 + btnH + pad;
        const boxX = centerX - boxW / 2;
        const boxY = Math.max(10, (R.SCREEN_H - boxH) / 2);

        // 卡片（DOM: 渐变背景 bg-card→bg-secondary, 2px 金色描边, 圆角12, 金色光晕）
        const grad = R.linearGrad(boxX, boxY, boxW, boxH, t.bgCard, t.bgSecondary, true);
        ctx.save();
        ctx.shadowColor = 'rgba(255,213,79,0.3)';
        ctx.shadowBlur = 40;
        R.drawRect(boxX, boxY, boxW, boxH, { fill: grad, radius: 12, stroke: t.warning, lineWidth: 2 });
        ctx.restore();

        // 标题
        R.drawText(title, centerX, boxY + pad, { fontSize: 20, color: t.warning, align: 'center', bold: true });

        // 进度点（DOM: 10px 圆, gap 8px, 居中, active 金色 scale1.3）
        const total = game.tutorialSteps.length;
        const dotD = 10;
        const dotGap = 8;
        const dotY = boxY + pad + titleH + 15;
        const dotX0 = centerX - ((total - 1) * (dotD + dotGap)) / 2;
        for (let i = 0; i < total; i++) {
            const active = i === game.currentTutorialStep;
            const d = active ? 13 : dotD;
            ctx.beginPath();
            ctx.arc(dotX0 + i * (dotD + dotGap) + dotD / 2, dotY + dotD / 2, d / 2, 0, Math.PI * 2);
            ctx.fillStyle = active ? t.warning : t.textSecondary;
            ctx.fill();
        }

        // 内容
        const contentY = dotY + dotD + 15;
        if (cLines.length) {
            R.drawText(content, boxX + pad, contentY, {
                fontSize: fs, color: t.textSecondary, maxWidth: innerW, lineHeight: lineH
            });
        }

        // tip 底块（DOM: rgba(144,202,249,0.1), 圆角4, padding8）
        let tipY = contentY + contentH + 10;
        if (tipLines.length) {
            R.drawRect(boxX + pad, tipY, innerW, tipH, { fill: 'rgba(144,202,249,0.1)', radius: 4 });
            let ty = tipY + 8;
            tipLines.forEach(function (ln) {
                R.drawText(ln, boxX + pad + 8, ty, { fontSize: 13, color: t.info, lineHeight: 20 });
                ty += 20;
            });
            tipY = tipY + tipH + 10;
        }

        // ---- 按钮行（DOM: [跳过引导 文本链接] [上一步(step>0)] [下一步/开始游戏 金色]）----
        const by = tipY + 20;
        const nextText = game.currentTutorialStep === total - 1 ? '开始游戏' : '下一步';
        const first = game.currentTutorialStep === 0;

        // 计算按钮宽（文本宽度 + DOM padding 20px×2）
        const skipW = R.measureText('跳过引导', 14, true) + 40;
        const prevW = R.measureText('上一步', 14, true) + 40;
        const nextW = R.measureText(nextText, 14, true) + 40;
        const gap = 10;
        // 居中排列：[跳过引导] gap [上一步(step>0)?] gap [下一步/开始游戏]
        const btnTotal = skipW + gap + (first ? 0 : prevW + gap) + nextW;
        const bx = centerX - btnTotal / 2;

        // 跳过引导：透明文本链接（DOM: 下划线 text-muted）
        R.drawButton({
            id: 'tutSkip', x: bx, y: by, w: skipW, h: btnH,
            text: '跳过引导', fontSize: 14, bg: 'rgba(0,0,0,0)', color: t.textMuted,
            onTap: function () { try { game.skipTutorial(); } catch (e) {} }
        });
        // 下划线
        ctx.strokeStyle = t.textMuted;
        ctx.lineWidth = 1;
        const skipTxtW = R.measureText ? R.measureText('跳过引导', 14, false) : 60;
        ctx.beginPath();
        ctx.moveTo(bx + (skipW - skipTxtW) / 2, by + btnH - 8);
        ctx.lineTo(bx + (skipW + skipTxtW) / 2, by + btnH - 8);
        ctx.stroke();

        let px = bx + skipW + gap;
        if (!first) {
            // 上一步（DOM: bg text-muted, color text-primary）
            R.drawButton({
                id: 'tutPrev', x: px, y: by, w: prevW, h: btnH,
                text: '上一步', fontSize: 14, bg: t.textMuted, color: t.textPrimary,
                onTap: function () { try { game.prevTutorial(); } catch (e) {} }
            });
            px += prevW + gap;
        }
        // 下一步 / 开始游戏（DOM: bg 金色加粗, color bg-card）
        R.drawButton({
            id: 'tutNext', x: px, y: by, w: nextW, h: btnH,
            text: nextText, fontSize: 14, bg: t.warning, color: t.bgCard, bold: true,
            onTap: function () { try { game.nextTutorial(); } catch (e) {} }
        });
    }

    R.Tutorial = {
        show: show,
        hide: hide,
        isVisible: isVisible,
        draw: draw
    };
})();
