// ============================================================
//  render/screens/deathScreen.js — 阶段 4：死亡结算界面 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  数据：game._deathUI（deathSettlement 计算，含统计/转化/广告状态）
// ============================================================
(function () {
    'use strict';

    const R = window.Render;
    const Input = window.Input;
    const g = function () { return (typeof game !== 'undefined') ? game : null; };
    const MAX_W = Math.min(R.SCREEN_W, 520);
    const PX = (R.SCREEN_W - MAX_W) / 2;

    function box(x, y, w, h, fill, radius) {
        R.drawRect(x, y, w, h, { fill: fill, radius: radius == null ? 10 : radius });
    }

    function stripHtml(s) {
        return String(s == null ? '' : s)
            .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }

    const QNAMES = ['', '普通', '稀有', '史诗', '传说', '神话'];
    let _scrollY = 0;
    function onShow() { _scrollY = 0; }

    function draw() {
        const game = g();
        if (!game || !game._deathUI) return;
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const ui = game._deathUI;
        const p = ui.p;
        const ratePct = Math.round(ui.rate * 100);

        R.ctx.save();
        R.ctx.translate(0, -_scrollY);

        R.drawText('☠ 你死了', PX + MAX_W / 2, 30, { fontSize: 22, color: t.danger, align: 'center', bold: true });
        let y = 52;

        // 轮回叙事（首次死亡）
        if (game.permanent.firstDeathShown && game.permanent.achievementStats.deaths === 1 && game.firstDeathNarrative) {
            const narrative = stripHtml(game.firstDeathNarrative).replace(/\n/g, ' ');
            box(x, y, w, 46, t.bgSecondary, 8);
            R.drawRect(x, y, 3, 46, { fill: t.purple, radius: 1.5 });
            R.drawText(narrative, x + 10, y + 12, { fontSize: 11, color: t.purple, maxWidth: w - 20 });
            y += 54;
        }

        // 本次轮回成绩
        box(x, y, w, 36, t.bgCard, 8);
        R.drawText('本次轮回成绩', x + 8, y + 11, { fontSize: 13, color: t.textPrimary, bold: true });
        y += 44;
        const stats = [
            ['轮回难度/奖励加成', '难度 ×' + game.getReincarnationDifficulty().toFixed(2) + ' · 奖励 ×' + game.getGrowthMult().toFixed(2)],
            ['到达层数', '第 ' + game.currentFloor + ' 层'],
            ['最终等级', p.level + ' 级'],
            ['剩余基因精华', p.gold + (ui.canConvertEssence ? ('（' + ratePct + '%转化为' + ui.goldToEssence + '进化精粹）') : '（击杀不足5个，无法转化）')],
            ['剩余属性点', String(p.statPoints)],
            ['最终五维', '力' + p.strength + ' 敏' + p.agility + ' 体' + p.vitality + ' 感' + p.perception + ' 进' + p.evolution],
            ['局内五维获得', '力+' + p.runStrGained + ' 敏+' + p.runAgiGained + ' 体+' + p.runVitGained + ' 感+' + p.runPerGained + ' 进+' + p.runEvoGained]
        ];
        stats.forEach(function (st) {
            box(x, y, w, 26, t.bgSecondary, 6);
            R.drawText(st[0], x + 8, y + 8, { fontSize: 12, color: t.textMuted });
            R.drawText(st[1], x + w - 10, y + 8, { fontSize: 12, color: t.textPrimary, align: 'right', maxWidth: w - 130 });
            y += 30;
        });
        y += 6;

        // 死亡转化
        box(x, y, w, 36, t.bgCard, 8);
        R.drawText('死亡转化', x + 8, y + 11, { fontSize: 13, color: t.warning, bold: true });
        y += 44;
        const convs = [
            ['获得自由属性点', '+ ' + ui.totalFree],
            ['获得天赋点', '+ ' + ui.talentPointReward],
            ['已分配五维' + ui.allocatedGained + '点+未分配属性点' + ui.unspentPoints + '点=' + ui.totalGained + '点×55%=' + Math.floor(ui.totalGained * 0.55) + '点', ''],
            ['层数保底', '第' + game.currentFloor + '层×0.5=' + ui.floorBonus + '点'],
            ['基因精华转化', ui.canConvertEssence ? ('剩余' + p.gold + '×' + ratePct + '%=' + ui.goldToEssence + '精粹') : '击杀不足5个（当前' + ui.killsThisRun + '），无法转化'],
            ['所有碎片', '100%保留至局外']
        ];
        convs.forEach(function (cv) {
            if (!cv[0]) return;
            box(x, y, w, 26, t.bgSecondary, 6);
            R.drawText(cv[0], x + 8, y + 8, { fontSize: 11, color: t.textMuted, maxWidth: w - 16 });
            if (cv[1]) R.drawText(cv[1], x + w - 10, y + 8, { fontSize: 11, color: t.textPrimary, align: 'right' });
            y += 30;
        });
        y += 6;

        // 广告按钮
        const revAvail = game.checkAdAvailable('death_revive');
        const convAvail = game.checkAdAvailable('death_convert');
        // 复活
        if (revAvail.available) {
            R.drawButton({
                id: 'deathReviveAd', x: x, y: y, w: w, h: 44,
                text: '📺 看广告复活（30%生命，每局限1次）', fontSize: 14, bg: t.success, color: '#ffffff',
                onTap: function () { try { game.reviveViaAd(); } catch (e) {} }
            });
        } else {
            R.drawButton({
                id: 'deathReviveAd', x: x, y: y, w: w, h: 44,
                text: '复活广告已使用', fontSize: 14, bg: t.textFaint, color: t.textSecondary, disabled: true
            });
        }
        y += 52;
        // 转化翻倍
        if (!ui.canConvertEssence) {
            R.drawButton({
                id: 'deathConvAd', x: x, y: y, w: w, h: 44,
                text: '转化率翻倍（击杀不足5个不可转化）', fontSize: 13, bg: t.textFaint, color: t.textSecondary, disabled: true
            });
        } else if (convAvail.available) {
            R.drawButton({
                id: 'deathConvAd', x: x, y: y, w: w, h: 44,
                text: '📺 看广告转化率翻倍（' + ratePct + '%→60%，每局限1次）', fontSize: 13, bg: t.warning, color: '#0a0e17',
                onTap: function () { try { game.convertEssenceViaAd(); } catch (e) {} }
            });
        } else {
            R.drawButton({
                id: 'deathConvAd', x: x, y: y, w: w, h: 44,
                text: '转化翻倍广告已使用', fontSize: 13, bg: t.textFaint, color: t.textSecondary, disabled: true
            });
        }
        y += 56;

        // 再努力一点提示
        R.drawText('⇦ 再努力一点', x + 8, y, { fontSize: 11, color: t.textFaint });
        y += 18;
        R.drawText('·再推1层→自由属性点再多+1', x + 8, y, { fontSize: 11, color: t.textMuted });
        y += 30;

        // 进入基因记忆库
        R.drawButton({
            id: 'deathToGrowth', x: x, y: y, w: w, h: 46,
            text: '▶ 进入基因记忆库', fontSize: 16, bg: t.warning, color: '#0a0e17',
            onTap: function () { try { game.goToGrowth(); } catch (e) {} }
        });
        y += 60;

        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, y - R.SCREEN_H + 160); }
            });
        }
        R.ctx.restore();
    }

    R.ScreenManager.register('deathScreen', {
        render: draw,
        onShow: onShow
    });
})();
