// ============================================================
//  render/screens/growthScreen.js — 阶段 3：轮回空间（基因记忆库）Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
// ============================================================
(function () {
    'use strict';

    const R = window.Render;
    const Input = window.Input;
    const g = function () { return (typeof game !== 'undefined') ? game : null; };
    let MAX_W = Math.min(R.SCREEN_W, 520);
    let PX = (R.SCREEN_W - MAX_W) / 2;
    function refreshLayout() {
        MAX_W = Math.min(R.SCREEN_W, 520);
        PX = (R.SCREEN_W - MAX_W) / 2;
    }

    function box(x, y, w, h, fill, radius) {
        R.drawRect(x, y, w, h, { fill: fill, radius: radius == null ? 10 : radius });
    }

    const QNAMES = ['', '普通', '稀有', '史诗', '传说', '神话'];
    let _scrollY = 0;
    function onShow() { _scrollY = 0; }

    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.permanent) return;
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const b = game.permanent.bonusStats;

        R.drawText('🧠 基因记忆库', PX + MAX_W / 2, 24, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        R.drawButton({ id: 'growBack', x: PX + 12, y: 10, w: 74, h: 28, text: '← 返回', fontSize: 12, bg: t.bgCard, color: t.textSecondary, border: t.borderSoft, onTap: function () { try { game.goBack(); } catch (e) {} } });
        let y = 52;

        // 前世记忆
        box(x, y, w, 40, t.bgCard, 10);
        R.drawText('前世记忆', x + 8, y + 13, { fontSize: 14, color: t.textPrimary, bold: true });
        R.drawText('可用前世记忆：' + (game.permanent.freePoints || 0), x + MAX_W / 2, y + 13, { fontSize: 12, color: t.warning, bold: true, align: 'center' });
        // 前世记忆 tooltip（DOM 原版 freePoints）
        try {
            window.Input.registerButton({ id: 'growFreePoints', x: x + MAX_W / 2 - 80, y: y + 2, w: 160, h: 32, onTap: function () { try { game.showTooltip('freePoints'); } catch (e) {} } });
        } catch (e) {}
        y += 46;
        const rows = [
            ['力量加成', '+' + b.strength + '（每点+2攻击）'], ['敏捷加成', '+' + b.agility + '（每点+1先手）'],
            ['体质加成', '+' + b.vitality + '（每点+8生命+0.4防御）'], ['感知加成', '+' + b.perception + '（每点+0.8暴击+0.2命中）'],
            ['进化加成', '+' + b.evolution + '（每点天赋效果+1%）']
        ];
        rows.forEach(function (r) {
            box(x, y, w, 26, t.bgSecondary, 6);
            R.drawText(r[0], x + 8, y + 8, { fontSize: 12, color: t.textMuted });
            R.drawText(r[1], x + 150, y + 8, { fontSize: 12, color: t.textPrimary, maxWidth: w - 160 });
            // 永久属性行 tooltip（DOM 原版 permanentStats）
            try {
                window.Input.registerButton({ id: 'growPerm_' + r[0], x: x, y: y, w: w, h: 26, onTap: function () { try { game.showTooltip('permanentStats'); } catch (e) {} } });
            } catch (e) {}
            y += 30;
        });
        // 分配按钮
        const stats5 = [
            { k: 'strength', label: '力量+1' }, { k: 'agility', label: '敏捷+1' }, { k: 'vitality', label: '体质+1' },
            { k: 'perception', label: '感知+1' }, { k: 'evolution', label: '进化+1' }
        ];
        const bw = (w - 24 - 4 * 6) / 5;
        stats5.forEach(function (st, i) {
            R.drawButton({
                id: 'growAlloc_' + st.k, x: x + 8 + i * (bw + 6), y: y, w: bw, h: 30,
                text: st.label, fontSize: 10, bg: t.warning, color: '#0a0e17',
                onTap: (function (k) { return function () { try { game.allocatePermanentPoint(k); } catch (e) {} }; })(st.k)
            });
        });
        y += 38;
        y += 12;

        // 进化残留强化
        box(x, y, w, 40, t.bgCard, 10);
        R.drawText('进化残留强化', x + 8, y + 13, { fontSize: 14, color: t.textPrimary, bold: true });
        R.drawText('💜 进化精粹：' + (game.permanent.essence || 0), x + MAX_W / 2, y + 13, { fontSize: 12, color: t.purple, bold: true, align: 'center' });
        // 进化精粹 tooltip（DOM 原版 essence）
        try {
            window.Input.registerButton({ id: 'growEssence', x: x + MAX_W / 2 - 80, y: y + 2, w: 160, h: 32, onTap: function () { try { game.showTooltip('essence'); } catch (e) {} } });
        } catch (e) {}
        y += 44;
        R.drawText('死亡时剩余基因精华30%转化（需击杀≥5敌人）', x + 8, y, { fontSize: 10, color: t.textFaint });
        y += 18;
        // 每日广告领取
        const avail = game.checkAdAvailable ? game.checkAdAvailable('essence_daily') : null;
        R.drawButton({
            id: 'growClaimEss', x: x, y: y, w: w, h: 30,
            text: '📺 看广告领取进化精粹（今日剩余' + (avail ? avail.remaining : 0) + '次）', fontSize: 11,
            bg: avail && avail.available ? t.warning : t.textFaint, color: '#0a0e17',
            disabled: !(avail && avail.available),
            onTap: function () { try { game.claimEssenceDaily(); } catch (e) {} }
        });
        y += 38;
        // 残留升级卡片
        if (game.essenceUpgradeConfig) {
            const cfgKeys = Object.keys(game.essenceUpgradeConfig);
            cfgKeys.forEach(function (stat, idx) {
                const cfg = game.essenceUpgradeConfig[stat];
                const lv = (game.permanent.essenceUpgrades && game.permanent.essenceUpgrades[stat]) || 0;
                const cost = game.getEssenceUpgradeCost ? game.getEssenceUpgradeCost(stat, lv) : 1;
                const canUpgrade = lv < cfg.maxLevel && (game.permanent.essence || 0) >= cost;
                const bonusPercent = Math.floor(lv * cfg.bonusPerLevel * 100);
                const cardW = (w - 12 - 8) / 2;
                const cx = x + (idx % 2) * (cardW + 8);
                const cy = y + Math.floor(idx / 2) * 84;
                box(cx, cy, cardW, 78, t.bgSecondary, 8);
                R.drawText(cfg.name, cx + 8, cy + 12, { fontSize: 12, color: t.textPrimary, bold: true });
                R.drawText(lv + '/' + cfg.maxLevel + '级（+' + bonusPercent + '%）', cx + 8, cy + 30, { fontSize: 10, color: t.success });
                if (lv < cfg.maxLevel) {
                    R.drawButton({
                        id: 'growEss_' + stat, x: cx + 6, y: cy + 46, w: cardW - 12, h: 24,
                        text: '升级（' + cost + '残留）', fontSize: 10, bg: canUpgrade ? t.purple : t.textFaint, color: '#ffffff',
                        disabled: !canUpgrade,
                        onTap: (function (st) { return function () { try { game.upgradeEssence(st); } catch (e) {} }; })(stat)
                    });
                } else {
                    R.drawText('已满级', cx + 8, cy + 58, { fontSize: 10, color: t.warning });
                }
            });
            y += Math.ceil(cfgKeys.length / 2) * 84 + 6;
        }
        R.drawButton({
            id: 'growResetEss', x: x, y: y, w: w, h: 28,
            text: '重置残留强化', fontSize: 11, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.resetEssenceUpgrades(); } catch (e) {} }
        });
        y += 38;

        // 基因碎片
        box(x, y, w, 36, t.bgCard, 10);
        R.drawText('基因碎片', x + 8, y + 11, { fontSize: 14, color: t.textPrimary, bold: true });
        y += 42;
        let fx = x + 8;
        for (let q = 1; q <= 5; q++) {
            const label = QNAMES[q] + '：' + (game.permanent.universalFragments[q] || 0);
            R.drawText(label, fx, y, { fontSize: 12, color: t.quality ? (t.quality[QNAMES[q].toLowerCase()] || t.textSecondary) : t.textSecondary });
            // 碎片 tooltip（DOM 原版 universalFragments）
            try {
                window.Input.registerButton({
                    id: 'growFrag_' + q, x: fx, y: y - 12, w: (R.ctx && R.ctx.measureText) ? R.ctx.measureText(label).width + 8 : 64, h: 18,
                    onTap: function () { try { game.showTooltip('universalFragments'); } catch (e) {} }
                });
            } catch (e) {}
            fx += R.ctx.measureText ? R.ctx.measureText(label).width + 14 : 80;
        }
        y += 22;
        // 合成按钮
        let sx = x + 8;
        for (let q = 1; q <= 4; q++) {
            const rate = game.fragmentSynthRates ? game.fragmentSynthRates[q] : 5;
            const have = game.permanent.universalFragments[q] || 0;
            const canSynth = have >= rate;
            R.drawButton({
                id: 'growSynth_' + q, x: sx, y: y, w: 110, h: 24,
                text: rate + QNAMES[q] + '→1' + QNAMES[q + 1], fontSize: 10,
                bg: canSynth ? t.accent : t.textFaint, color: canSynth ? '#0a0e17' : '#ffffff',
                disabled: !canSynth,
                onTap: (function (q2) { return function () { try { game.synthesizeFragments(q2); } catch (e) {} }; })(q)
            });
            sx += 118;
            if (sx > x + w - 110) { sx = x + 8; y += 30; }
        }
        y += 36;
        R.drawButton({
            id: 'growFragMgr', x: x, y: y, w: w, h: 28,
            text: '🧩 碎片管理（标签专属碎片合成/兑换）', fontSize: 11, bg: t.info, color: '#ffffff',
            onTap: function () { try { game.openFragmentManager(); } catch (e) {} }
        });
        y += 34;
        // 天赋进化说明（DOM 原版 fragmentsDisplay 尾部提示）
        R.drawText('天赋进化：有进化路线的天赋可在图鉴中点击"进化"按钮，消耗1个该天赋+高阶碎片进化成指定高阶天赋', x + 8, y, { fontSize: 10, color: t.warning, maxWidth: w - 16 });
        y += 24;

        // 进化抉择
        if (game.storyData && game.storyData.evolutionChoices) {
            box(x, y, w, 34, t.bgCard, 8);
            R.drawRect(x, y, 3, 34, { fill: t.purple, radius: 1.5 });
            R.drawText('进化抉择', x + 10, y + 11, { fontSize: 13, color: t.purple, bold: true });
            y += 40;
            game.storyData.evolutionChoices.forEach(function (ec) {
                if (!ec || !ec.chapter) return;
                const choice = game.getEvolutionChoice ? game.getEvolutionChoice(ec.chapter) : null;
                box(x, y, w, 40, t.bgSecondary, 6);
                R.drawText('第' + ec.chapter + '章·' + (ec.title || ''), x + 8, y + 11, { fontSize: 11, color: t.textPrimary, bold: true });
                if (choice) {
                    const opt = (ec.options || []).find(function (o) { return o.id === choice; });
                    R.drawText('已选择：' + (opt ? opt.name : choice), x + 8, y + 27, { fontSize: 10, color: t.success });
                    const switchCost = ec.chapter * 5;
                    R.drawButton({
                        id: 'growEvo_' + ec.chapter, x: x + w - 104, y: y + 5, w: 96, h: 22,
                        text: '切换（' + switchCost + '残留）', fontSize: 9,
                        bg: (game.permanent.essence || 0) >= switchCost ? t.warning : t.textFaint, color: '#0a0e17',
                        disabled: (game.permanent.essence || 0) < switchCost,
                        onTap: (function (ch) { return function () { try { game.showEvolutionSwitchPanel(ch); } catch (e) {} }; })(ec.chapter)
                    });
                } else {
                    R.drawText('未选择（击败第' + ec.chapter + '章首领后可选择）', x + 8, y + 27, { fontSize: 10, color: t.textFaint });
                }
                y += 44;
            });
        }

        // 天赋图鉴
        y += 8;
        R.drawButton({
            id: 'growTalentPanel', x: x, y: y, w: w, h: 38,
            text: '📖 打开天赋图鉴（带筛选）', fontSize: 13, bg: t.purple, color: '#ffffff',
            onTap: function () { try { game.openTalentPanel(); } catch (e) {} }
        });
        y += 48;

        // 重置功能
        R.drawText('— 重置功能（方便体验不同流派）—', x + 8, y, { fontSize: 11, color: t.textFaint, align: 'center' });
        y += 20;
        R.drawButton({
            id: 'growResetStats', x: x, y: y, w: w, h: 32,
            text: '重置前世记忆（返还记忆点）', fontSize: 11, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.resetPermanentStats(); } catch (e) {} }
        });
        y += 38;
        R.drawButton({
            id: 'growResetTalents', x: x, y: y, w: w, h: 32,
            text: '重置已解锁天赋（全额返还碎片）', fontSize: 11, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.resetUnlockedTalents(); } catch (e) {} }
        });
        y += 44;

        // 开启新的轮回
        R.drawButton({
            id: 'growNewRun', x: x, y: y, w: w, h: 46,
            text: '▶ 开启新的轮回', fontSize: 16, bg: t.success, color: '#ffffff',
            onTap: function () { try { game.startNewRun(); } catch (e) {} }
        });
        y += 60;

        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, y - R.SCREEN_H + 160); }
            });
        }
    }

    function draw() {
        refreshLayout();
        const game = g();
        if (!game || !game.permanent) return;
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);
        render();
        R.ctx.restore();
    }

    R.ScreenManager.register('growthScreen', {
        render: draw,
        onShow: onShow
    });
})();
