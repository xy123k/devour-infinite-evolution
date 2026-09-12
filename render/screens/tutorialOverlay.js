// ============================================================
//  render/screens/tutorialOverlay.js — 阶段 4：新手引导 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  数据：game.tutorialSteps / game.currentTutorialStep（逻辑层不动）
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

        // 半透明蒙层
        R.ctx.globalAlpha = 0.7;
        R.drawRect(0, 0, R.SCREEN_W, R.SCREEN_H, { fill: '#000000' });
        R.ctx.globalAlpha = 1;

        const maxW = Math.min(R.SCREEN_W - 40, 380);
        const x = (R.SCREEN_W - maxW) / 2;

        // 标题
        R.drawText('🔮 ' + step.title, R.SCREEN_W / 2, 90, { fontSize: 19, color: t.warning, align: 'center', bold: true });

        // 内容卡
        const content = stripHtml(step.content);
        const cLines = R.wrapText(content, maxW - 24, 13, false);
        const cardH = Math.min(30 + cLines.length * 21 + (step.tip ? 34 : 0), R.SCREEN_H - 280);
        const cy = 120;
        R.drawRect(x, cy, maxW, cardH, { fill: t.bgCard, radius: 12, stroke: t.borderSoft });
        R.ctx.save();
        R.ctx.beginPath();
        R.ctx.rect(x, cy, maxW, cardH);
        R.ctx.clip();
        let iy = cy + 16;
        cLines.forEach(function (ln) {
            R.drawText(ln, x + 12, iy, { fontSize: 13, color: t.textPrimary, lineHeight: 21 });
            iy += 21;
        });
        R.ctx.restore();

        // tip
        if (step.tip) {
            R.drawRect(x + 10, cy + cardH - 30, maxW - 20, 24, { fill: t.bgSecondary, radius: 6 });
            R.drawText('💡 ' + step.tip, x + 16, cy + cardH - 21, { fontSize: 11, color: t.textMuted });
        }

        // 进度点
        const total = game.tutorialSteps.length;
        const dotGap = 14;
        const dotX0 = R.SCREEN_W / 2 - ((total - 1) * dotGap) / 2;
        for (let i = 0; i < total; i++) {
            const active = i === game.currentTutorialStep;
            R.ctx.beginPath();
            R.ctx.arc(dotX0 + i * dotGap, cy + cardH + 24, active ? 5 : 4, 0, Math.PI * 2);
            R.ctx.fillStyle = active ? t.warning : t.textFaint;
            R.ctx.fill();
        }

        // 按钮行
        const by = cy + cardH + 44;
        const btnW = (maxW - 24 - 20) / 3;
        const first = game.currentTutorialStep === 0;
        const last = game.currentTutorialStep === total - 1;
        // 上一步
        if (!first) {
            R.drawButton({
                id: 'tutPrev', x: x + 4, y: by, w: btnW, h: 42,
                text: '◀ 上一步', fontSize: 13, bg: t.bgSecondary, color: t.textPrimary,
                onTap: function () { try { game.prevTutorial(); } catch (e) {} }
            });
        } else {
            R.drawButton({
                id: 'tutSkipL', x: x + 4, y: by, w: btnW, h: 42,
                text: '跳过', fontSize: 13, bg: t.bgSecondary, color: t.textMuted,
                onTap: function () { try { game.skipTutorial(); } catch (e) {} }
            });
        }
        // 跳过（中）
        if (!first) {
            R.drawButton({
                id: 'tutSkip', x: x + 14 + btnW, y: by, w: btnW, h: 42,
                text: '跳过', fontSize: 13, bg: t.bgSecondary, color: t.textMuted,
                onTap: function () { try { game.skipTutorial(); } catch (e) {} }
            });
        } else {
            R.drawButton({
                id: 'tutNext0', x: x + 14 + btnW, y: by, w: btnW, h: 42,
                text: '下一步', fontSize: 13, bg: t.success, color: '#ffffff',
                onTap: function () { try { game.nextTutorial(); } catch (e) {} }
            });
        }
        // 下一步 / 开始游戏
        R.drawButton({
            id: 'tutNext', x: x + 24 + btnW * 2, y: by, w: btnW, h: 42,
            text: last ? '▶ 开始游戏' : '下一步', fontSize: 13,
            bg: last ? t.warning : t.success, color: last ? '#0a0e17' : '#ffffff',
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
