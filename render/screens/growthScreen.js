// ============================================================
//  render/screens/growthScreen.js — 阶段 3：轮回空间（基因记忆库）Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  布局坐标基准：DOM index.html growthScreen（makePage 档实测）
//    box1 前世记忆 y=91 h366；box2 进化残留 y=467；box3 基因碎片 y=1737；box4 天赋图鉴 y=2104
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
        // DOM .box 背景为 linear-gradient(145deg, rgba(18,30,40,.85), rgba(12,22,30,.9))
        // 用 canvas 对角渐变近似（135deg），底色先垫深色再叠渐变避免半透明露出 canvas 底
        const g = { from: 'rgba(18,30,40,0.85)', to: 'rgba(12,22,30,0.9)' };
        R.drawRect(x, y, w, h, { fill: 'rgba(10,14,23,1)', radius: radius == null ? 10 : radius, gradient: g });
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

        R.drawText('基因记忆库', PX + MAX_W / 2, 22, { fontSize: 20, color: t.accent, align: 'center', bold: true });
        const rows = [
            ['力量加成', '+' + b.strength + '（每点+2攻击）'], ['敏捷加成', '+' + b.agility + '（每点+1先手）'],
            ['体质加成', '+' + b.vitality + '（每点+8生命+0.4防御）'], ['感知加成', '+' + b.perception + '（每点+0.8暴击+0.2命中）'],
            ['进化加成', '+' + b.evolution + '（每点天赋效果+1%）']
        ];

        // ===== box1 前世记忆（DOM y91 h366）=====
        let y = 91;
        box(x, y, w, 366, t.bgCard, 10);
        R.drawText('前世记忆', x + 8, y + 15, { fontSize: 17, color: t.textPrimary, bold: true });
        try {
            window.Input.registerButton({ id: 'growFreePoints', x: x + MAX_W / 2 - 80, y: y + 2, w: 160, h: 32, onTap: function () { try { game.showTooltip('freePoints'); } catch (e) {} } });
        } catch (e) {}
        let ry = y + 51;
        rows.forEach(function (r) {
            // DOM .stat-row 透明背景 + border-bottom:1px solid var(--border-primary)
            R.drawRect(x, ry, w, 1, { fill: 'rgba(0,220,150,0.12)' });
            R.drawText(r[0], x + 8, ry + 8, { fontSize: 12, color: t.textMuted });
            R.drawText(r[1], x + 150, ry + 8, { fontSize: 12, color: t.textPrimary, maxWidth: w - 160 });
            try {
                window.Input.registerButton({ id: 'growPerm_' + r[0], x: x, y: ry, w: w, h: 31, onTap: function () { try { game.showTooltip('permanentStats'); } catch (e) {} } });
            } catch (e) {}
            ry += 30;
        });
        // 可用前世记忆（DOM y306）
        let ay = y + 215;
        R.drawText('可用前世记忆：' + (game.permanent.freePoints || 0), x + 8, ay, { fontSize: 12, color: t.warning, bold: true });
        try {
            window.Input.registerButton({ id: 'growFreePoints2', x: x, y: ay - 12, w: w, h: 22, onTap: function () { try { game.showTooltip('freePoints'); } catch (e) {} } });
        } catch (e) {}
        // 分配按钮（DOM y342 4个一行 h44 + 进化+1 换行 y394）
        const stats5 = [
            { k: 'strength', label: '力量+1' }, { k: 'agility', label: '敏捷+1' }, { k: 'vitality', label: '体质+1' },
            { k: 'perception', label: '感知+1' }, { k: 'evolution', label: '进化+1' }
        ];
        const by = y + 251;
        // DOM 实测：按钮 auto 宽 70.4px、列间距 78（70.4+8）、font-size 13px 白字
        const aw = 70;
        stats5.forEach(function (st, i) {
            R.drawButton({
                id: 'growAlloc_' + st.k, x: x + 8 + (i % 4) * 78, y: by + (i >= 4 ? 52 : 0), w: aw, h: 44,
                text: st.label, fontSize: 13, bg: t.accent, color: '#ffffff',
                onTap: (function (k) { return function () { try { game.allocatePermanentPoint(k); } catch (e) {} }; })(st.k)
            });
        });

        // ===== box2 进化残留强化（DOM y467）=====
        y = 467;
        box(x, y, w, 720, t.bgCard, 10);
        R.drawText('◆ 进化残留强化', x + 8, y + 15, { fontSize: 17, color: t.textPrimary, bold: true });
        try {
            window.Input.registerButton({ id: 'growEssence', x: x + MAX_W / 2 - 80, y: y + 2, w: 160, h: 32, onTap: function () { try { game.showTooltip('essence'); } catch (e) {} } });
        } catch (e) {}
        R.drawText('进化残留通过死亡结算（剩余基因精华30%转化）获得，用于局外百分比永久强化', x + 8, y + 51, { fontSize: 12, color: t.textMuted, maxWidth: w - 16 });
        R.drawText('进化精粹：' + (game.permanent.essence || 0), x + 8, y + 98, { fontSize: 16, color: t.purple, bold: true });
        R.drawText('死亡时剩余基因精华30%转化（需击杀≥5敌人）', x + 128, y + 98, { fontSize: 12, color: t.textMuted, maxWidth: w - 136 });
        // 重置残留强化（DOM 右侧）
        R.drawButton({
            id: 'growResetEssTop', x: x + w - 27 - 84, y: y + 127, w: 84, h: 44,
            text: '重置残留强化', fontSize: 11, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.resetEssenceUpgrades(); } catch (e) {} }
        });
        // 看广告（DOM y635 h44）
        const avail2 = game.checkAdAvailable ? game.checkAdAvailable('essence_daily') : null;
        const claimTxt = '📺 看广告领取进化精粹（今日剩余' + (avail2 ? avail2.remaining : 0) + '次）';
        let claimW = w;
        try {
            R.ctx.save(); R.ctx.font = '12px sans-serif';
            claimW = Math.min(w, Math.ceil(R.ctx.measureText(claimTxt).width) + 24);
            R.ctx.restore();
        } catch (e) {}
        R.drawButton({
            id: 'growClaimEss', x: x + 12, y: y + 158, w: claimW, h: 44,
            text: claimTxt, fontSize: 12,
            bg: avail2 && avail2.available ? t.warning : t.textFaint, color: '#ffffff',
            disabled: !(avail2 && avail2.available),
            onTap: function () { try { game.claimEssenceDaily(); } catch (e) {} }
        });
        if (avail2 && avail2.available) {
            R.drawText('每次 ', x + claimW + 16, y + 158, { fontSize: 12, color: t.textMuted });
            R.drawText('+30', x + claimW + 48, y + 158, { fontSize: 12, color: t.warning, bold: true });
        }

        // 残留升级卡片（DOM：卡片 y+234 起，2列3行，行距145，卡高73，升级按钮在卡底）
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
                const cy = y + 224 + Math.floor(idx / 2) * 145;
                box(cx, cy, cardW, 138, t.bgSecondary, 8);
                R.drawText(cfg.name, cx + 8, cy + 12, { fontSize: 13, color: t.textPrimary, bold: true });
                R.drawText(cfg.desc || '', cx + 8, cy + 30, { fontSize: 11, color: t.textMuted });
                R.drawText(lv + '/' + cfg.maxLevel + '级（+' + bonusPercent + '%）', cx + 8, cy + 48, { fontSize: 12, color: t.success });
                if (lv < cfg.maxLevel) {
                    R.drawButton({
                        id: 'growEss_' + stat, x: cx + 8, y: cy + 82, w: cardW - 16, h: 44,
                        text: '升级（' + cost + '残留）', fontSize: 11, bg: canUpgrade ? undefined : t.textFaint, color: '#ffffff',
                        disabled: !canUpgrade,
                        onTap: (function (st) { return function () { try { game.upgradeEssence(st); } catch (e) {} }; })(stat)
                    });
                } else {
                    R.drawText('已满级', cx + 8, cy + 86, { fontSize: 11, color: t.warning });
                }
            });
            y += 234 + Math.ceil(cfgKeys.length / 2) * 145;
        }

        // ===== box3 基因碎片 =====
        y = 1737;
        box(x, y, w, 357, t.bgCard, 10);
        R.drawText('基因碎片', x + 8, y + 15, { fontSize: 17, color: t.textPrimary, bold: true });
        let fx = x + 8;
        let fy = y + 51;
        for (let q = 1; q <= 5; q++) {
            const label = QNAMES[q] + '：' + (game.permanent.universalFragments[q] || 0);
            R.drawText(label, fx, fy, { fontSize: 12, color: t.quality ? (t.quality[QNAMES[q].toLowerCase()] || t.textSecondary) : t.textSecondary });
            try {
                window.Input.registerButton({
                    id: 'growFrag_' + q, x: fx, y: fy - 12, w: (R.ctx && R.ctx.measureText) ? R.ctx.measureText(label).width + 8 : 64, h: 18,
                    onTap: function () { try { game.showTooltip('universalFragments'); } catch (e) {} }
                });
            } catch (e) {}
            fx += R.ctx.measureText ? R.ctx.measureText(label).width + 14 : 80;
        }
        fy += 26;
        let sx = x + 8;
        for (let q = 1; q <= 4; q++) {
            const rate = game.fragmentSynthRates ? game.fragmentSynthRates[q] : 5;
            const have = game.permanent.universalFragments[q] || 0;
            const canSynth = have >= rate;
            R.drawButton({
                id: 'growSynth_' + q, x: sx, y: fy, w: 80, h: 44,
                text: rate + QNAMES[q] + '→1' + QNAMES[q + 1], fontSize: 11,
                bg: canSynth ? t.accent : t.textFaint, color: canSynth ? '#0a0e17' : '#ffffff',
                disabled: !canSynth,
                onTap: (function (q2) { return function () { try { game.synthesizeFragments(q2); } catch (e) {} }; })(q)
            });
            sx += 88;
            if (sx > x + w - 80) { sx = x + 8; fy += 52; }
        }
        fy += 60;
        R.drawButton({
            id: 'growFragMgr', x: x, y: fy, w: w, h: 44,
            text: '🧩 碎片管理（标签专属碎片合成/兑换）', fontSize: 12, bg: t.info, color: '#ffffff',
            onTap: function () { try { game.openFragmentManager(); } catch (e) {} }
        });
        fy += 56;
        R.drawText('天赋进化：有进化路线的天赋可在图鉴中点击"进化"按钮，消耗1个该天赋+高阶碎片进化成指定高阶天赋', x + 8, fy, { fontSize: 10, color: t.warning, maxWidth: w - 16 });
        fy += 24;

        // 进化抉择
        if (game.storyData && game.storyData.evolutionChoices) {
            box(x, fy, w, 34, t.bgCard, 8);
            R.drawRect(x, fy, 3, 34, { fill: t.purple, radius: 1.5 });
            R.drawText('进化抉择', x + 10, fy + 11, { fontSize: 13, color: t.purple, bold: true });
            fy += 40;
            game.storyData.evolutionChoices.forEach(function (ec) {
                if (!ec || !ec.chapter) return;
                const choice = game.getEvolutionChoice ? game.getEvolutionChoice(ec.chapter) : null;
                box(x, fy, w, 40, t.bgSecondary, 6);
                R.drawText('第' + ec.chapter + '章·' + (ec.title || ''), x + 8, fy + 11, { fontSize: 11, color: t.textPrimary, bold: true });
                if (choice) {
                    const opt = (ec.options || []).find(function (o) { return o.id === choice; });
                    R.drawText('已选择：' + (opt ? opt.name : choice), x + 8, fy + 27, { fontSize: 10, color: t.success });
                    const switchCost = ec.chapter * 5;
                    R.drawButton({
                        id: 'growEvo_' + ec.chapter, x: x + w - 104, y: fy + 5, w: 96, h: 22,
                        text: '切换（' + switchCost + '残留）', fontSize: 9,
                        bg: (game.permanent.essence || 0) >= switchCost ? t.warning : t.textFaint, color: '#0a0e17',
                        disabled: (game.permanent.essence || 0) < switchCost,
                        onTap: (function (ch) { return function () { try { game.showEvolutionSwitchPanel(ch); } catch (e) {} }; })(ec.chapter)
                    });
                } else {
                    R.drawText('未选择（击败第' + ec.chapter + '章首领后可选择）', x + 8, fy + 27, { fontSize: 10, color: t.textFaint });
                }
                fy += 44;
            });
        }

        // ===== box4 天赋图鉴（局外）=====
        fy += 8;
        box(x, fy, w, 147, t.bgCard, 10);
        R.drawText('天赋图鉴（局外）', x + 8, fy + 15, { fontSize: 17, color: t.textPrimary, bold: true });
        R.drawText('按品质和体系标签筛选，解锁/升级/进化天赋', x + 8, fy + 47, { fontSize: 12, color: t.textMuted });
        R.drawButton({
            id: 'growTalentPanel', x: x, y: fy + 80, w: w, h: 44,
            text: '📖 打开天赋图鉴（带筛选）', fontSize: 13, bg: t.purple, color: '#ffffff',
            onTap: function () { try { game.openTalentPanel(); } catch (e) {} }
        });
        fy += 160;

        // 重置功能
        R.drawText('— 重置功能（方便体验不同流派）—', x + 8, fy, { fontSize: 11, color: t.textFaint, align: 'center' });
        fy += 20;
        R.drawButton({
            id: 'growResetStats', x: x, y: fy, w: w, h: 44,
            text: '重置前世记忆（返还记忆点）', fontSize: 12, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.resetPermanentStats(); } catch (e) {} }
        });
        fy += 52;
        R.drawButton({
            id: 'growResetTalents', x: x, y: fy, w: w, h: 44,
            text: '重置已解锁天赋（全额返还碎片）', fontSize: 12, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.resetUnlockedTalents(); } catch (e) {} }
        });
        fy += 60;

        // 开启新的轮回
        R.drawButton({
            id: 'growNewRun', x: x, y: fy, w: w, h: 46,
            text: '▶ 开启新的轮回', fontSize: 16, bg: t.success, color: '#ffffff',
            onTap: function () { try { game.startNewRun(); } catch (e) {} }
        });
        fy += 60;

        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, fy - R.SCREEN_H + 160); }
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
