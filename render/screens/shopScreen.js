// ============================================================
//  render/screens/shopScreen.js — 阶段 3：商店界面 Canvas 化
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
        const t = R.Theme.get();
        R.drawRect(x, y, w, h, { fill: fill, radius: radius == null ? 10 : radius, stroke: t.border, strokeWidth: 1 });
    }

    function stripHtml(s) {
        return String(s == null ? '' : s)
            .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }

    const CATS = ['heal', 'energy', 'buff', 'resource', 'special', 'permanent', 'daily', 'weekly'];
    const CAT_NAMES = { heal: '生命恢复', energy: '能量恢复', buff: '属性强化', resource: '资源包', special: '特殊道具', permanent: '永久强化', daily: '每日特惠', weekly: '每周特惠' };
    const CAT_ICONS = { heal: '💗', energy: '⚡', buff: '🛡', resource: '🎒', special: '⭐', permanent: '🔒', daily: '📅', weekly: '🏷' };
    const CURR_NAMES = { fragments_1: '普通碎片', fragments_2: '稀有碎片', fragments_3: '史诗碎片', fragments_4: '传说碎片', fragments_5: '神话碎片', gold: '基因精华', essence: '进化精粹' };

    let _scrollY = 0;
    function onShow() { _scrollY = 0; }

    function effectText(item, game) {
        const eff = item.effect;
        if (!eff || !eff.type) return '';
        const names = {
            heal_percent: '恢复生命', energy_percent: '恢复能量', max_energy: '能量上限',
            attack_boost: '攻击力', defense_boost: '防御力', speed_boost: '先手值',
            all_boost: '全属性', exp_boost: '经验获取', drop_boost: '掉落率',
            unlock_passive_slot: '天赋槽位', fragment_drop_bonus_percent: '碎片掉落',
            start_with_item: '开局道具', death_talent_bonus_percent: '死亡结算天赋点',
            move_speed_percent: '先手值（移速）', drop_quality_bonus: '掉落品质',
            gain_fragments: '获得碎片', gain_talent_points: '获得天赋点', revive: '复活',
            full_restore: '完全恢复'
        };
        const name = names[eff.type] || eff.type;
        if (typeof eff.value === 'number') {
            const pctLike = eff.type.includes('percent') || eff.type.includes('bonus') || eff.type.includes('rate') || eff.type === 'exp_boost' || eff.type === 'drop_boost';
            return name + (pctLike ? ' +' + eff.value + '%' : ' +' + eff.value);
        }
        if (eff.type === 'start_with_item') {
            const shop = game.data.shop || {};
            const si = (shop.consumables || []).find(function (c) { return c.id === eff.value; });
            return '每局开局获得：' + (si ? si.name : eff.value);
        }
        return name;
    }

    function textW(str, size) {
        if (!str) return 0;
        try {
            const f = R.ctx.font;
            R.ctx.font = (size || 12) + 'px sans-serif';
            const w = R.ctx.measureText(String(str)).width;
            R.ctx.font = f;
            return w;
        } catch (e) { return String(str).length * size; }
    }
    // 分类按钮固定宽度（DOM 实测：12px 字 + padding 6 12 + SVG 图标）
    const CAT_BW = { all: 64, heal: 100, energy: 101, buff: 100, resource: 90, special: 100, permanent: 100, daily: 95, weekly: 95 };

    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.data || !game.data.shop) return;
        const t = R.Theme.get();
        const x = PX + 10, w = MAX_W - 20;
        const shop = game.data.shop;
        const consumables = shop.consumables || [];
        const activeCat = game.shopCategory || 'all';

        // ===== 顶部 h2 标题（静态页标题：购物袋图标 + 商店）=====
        R.drawText('🛍 商店', PX + MAX_W / 2, 34, { fontSize: 20, color: t.accent, align: 'center', bold: true, letterSpacing: 4, glow: true });

        // ===== 商人标题行（h3 左 + 返回按钮右，垂直居中）=====
        R.drawText('❄', x + 2, 97, { fontSize: 16, color: t.warning });
        R.drawText('基因共生体商人', x + 26, 99, { fontSize: 16, color: t.warning, bold: true });
        R.drawButton({ id: 'shopBack', x: PX + MAX_W - 91, y: 77, w: 76, h: 43, text: '← 返回', fontSize: 13, bg: t.success, color: '#ffffff', bold: true, radius: 6, onTap: function () { try { game.merchantMode ? game.leaveMerchant() : game.goBack(); } catch (e) {} } });

        // ===== 欢迎语（12px 两行）=====
        if (game.merchantMode) {
            R.drawText('流浪商人特惠！所有商品8折优惠！', x, 152, { fontSize: 12, color: t.success, bold: true });
        } else {
            R.drawText('欢迎，进化者。我这里有各种基因改造品，', x, 152, { fontSize: 12, color: t.textSecondary });
            R.drawText('能让你在进化之路上走得更远。', x, 173, { fontSize: 12, color: t.textSecondary });
        }

        // ===== 资源行（DOM 渐变卡：linear-gradient(bg-card,bg-secondary)+1px边框）=====
        let ry = 216;
        box(x, 210, w, 52, t.bgCard, 8);
        let fx = x;
        const goldLabel = '基因精华：' + game.player.gold;
        R.drawText(goldLabel, fx, ry, { fontSize: 12, color: t.warning, bold: true });
        fx += textW(goldLabel, 12) + 10;
        for (let q = 1; q <= 4; q++) {
            const lab = CURR_NAMES['fragments_' + q] + '：' + (game.permanent.universalFragments[q] || 0);
            const qc = q === 1 ? t.quality.common : (q === 2 ? t.info : (q === 3 ? t.purple : t.warning));
            if (fx + textW(lab, 12) > x + w - 8) { ry += 19; fx = x; }
            R.drawText(lab, fx, ry, { fontSize: 12, color: qc });
            fx += textW(lab, 12) + 10;
        }

        // ===== 分类标签（flex-wrap：3 列，12px，行距 58）=====
        let cy = 269;
        let cx = x;
        let ci = 0;
        function catBtn(label, id, catKey) {
            const bw = CAT_BW[catKey] || (textW(label, 12) + 24);
            if (ci % 3 === 0) { if (ci > 0) cy += 58; cx = x + 7; }
            const active = activeCat === catKey;
            R.drawButton({
                id: id, x: cx, y: cy, w: bw, h: 42,
                text: label, fontSize: 12, bg: active ? t.warning : t.textFaint,
                color: active ? '#1a2332' : t.textSecondary, bold: !!active, radius: 6,
                onTap: (function (c) { return function () { try { game.openShop(c); } catch (e) {} }; })(catKey)
            });
            cx += bw + 21;
            ci++;
        }
        catBtn('全部', 'shopCat_all', 'all');
        CATS.forEach(function (cat) {
            const count = cat === 'daily' ? (shop.dailyItems || []).length : (cat === 'weekly' ? (shop.weeklyItems || []).length : (cat === 'permanent' ? (shop.permanentItems || []).length : consumables.filter(function (i) { return i.category === cat; }).length));
            catBtn((CAT_ICONS[cat] ? CAT_ICONS[cat] + ' ' : '') + CAT_NAMES[cat] + ' (' + count + ')', 'shopCat_' + cat, cat);
        });
        cy += 58;

        // ===== 商品列表（talent-card 布局）=====
        const dailyItems = shop.dailyItems || [];
        const weeklyItems = shop.weeklyItems || [];
        const permanentItems = shop.permanentItems || [];
        let filtered;
        if (activeCat === 'daily') filtered = dailyItems;
        else if (activeCat === 'weekly') filtered = weeklyItems;
        else if (activeCat === 'permanent') filtered = permanentItems;
        else if (activeCat === 'all') filtered = consumables.concat(permanentItems, dailyItems, weeklyItems);
        else filtered = consumables.filter(function (i) { return i.category === activeCat; });

        if (!filtered.length) {
            R.drawText('该分类暂无商品', x, cy + 10, { fontSize: 12, color: t.textFaint });
            cy += 26;
        }
        let py = 445;
        filtered.forEach(function (item) {
            box(x, py, w, 110, t.bgCard, 8);
            const price = item.price ? item.price.amount : 10;
            const currency = item.price ? item.price.currency : 'gold';
            const currName = CURR_NAMES[currency] || currency;
            const currColor = currency === 'gold' ? t.warning : (currency === 'essence' ? t.purple : (currency.indexOf('fragments_') === 0 ? (currency === 'fragments_1' ? t.quality.common : (currency === 'fragments_2' ? t.info : (currency === 'fragments_3' ? t.purple : (currency === 'fragments_4' ? t.warning : t.danger)))) : t.warning));
            const limit = item.limitPerRun || 99;
            const purchased = (game.shopPurchaseCount && game.shopPurchaseCount[item.id]) || 0;
            const remaining = limit - purchased;
            const displayPrice = game.merchantMode ? Math.floor(price * 0.8) : price;
            let canBuy = remaining > 0;
            if (currency === 'gold') canBuy = canBuy && game.player.gold >= displayPrice;
            else if (currency === 'essence') canBuy = canBuy && (game.permanent.essence || 0) >= displayPrice;
            else {
                const q = parseInt(currency.replace('fragments_', ''), 10);
                canBuy = canBuy && (game.permanent.universalFragments[q] || 0) >= displayPrice;
            }
            if (!canBuy) R.ctx.globalAlpha = 0.5;
            // 图标 28px（左）
            const ic = (item.icon && game.icons && game.icons[item.icon]) ? item.icon : 'box';
            R.drawIcon(ic, x + 10, py + 12, 28, t.textPrimary);
            // 名称（左）
            R.drawText(item.name, x + 48, py + 20, { fontSize: 13, color: t.textPrimary, bold: true, maxWidth: w - 120 });
            // 价格（右列）
            if (game.merchantMode && displayPrice !== price) {
                R.drawText(String(price), x + w - 16, py + 20, { fontSize: 12, color: t.textMuted, align: 'right' });
                R.drawText(String(displayPrice) + ' ' + currName, x + w - 16, py + 27, { fontSize: 14, color: t.success, align: 'right', bold: true });
            } else {
                R.drawText(String(displayPrice) + ' ' + currName, x + w - 16, py + 27, { fontSize: 14, color: currColor, align: 'right', bold: true });
            }
            // 描述（12px muted，最多两行）
            const desc = item.description ? stripHtml(item.description) : '';
            if (desc) R.drawText(desc, x + 48, py + 40, { fontSize: 12, color: t.textMuted, maxWidth: 220, maxLines: 2 });
            // 效果（12px accent bold）
            const eff = effectText(item, game);
            if (eff) R.drawText('⚡ ' + eff, x + 48, py + 64, { fontSize: 12, color: t.accent, bold: true });
            // 限购（11px）
            if (limit < 99) R.drawText('每局限购' + limit + '个，剩余' + remaining + '个', x + 48, py + 84, { fontSize: 11, color: remaining > 0 ? t.success : t.danger });
            // 购买按钮（右列）
            R.drawButton({
                id: 'shopBuy_' + item.id, x: x + w - 76, y: py + 50, w: 64, h: 32,
                text: remaining > 0 ? '购买' : '已售罄', fontSize: 13,
                bg: canBuy ? '#00b498' : t.textFaint, color: '#0a0e17', bold: true, radius: 6, disabled: !canBuy,
                onTap: (function (iid) { return function () { try { game.buyItem(iid); } catch (e) {} }; })(item.id)
            });
            R.ctx.globalAlpha = 1;
            py += 117;
        });
        py += 20;

        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, py - R.SCREEN_H + 160); }
            });
        }
    }
    function draw() {
        refreshLayout();
        const game = g();
        if (!game || !game.data || !game.data.shop) return;
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);
        render();
        R.ctx.restore();
    }

    R.ScreenManager.register('shopScreen', {
        render: draw,
        onShow: onShow
    });
})();
