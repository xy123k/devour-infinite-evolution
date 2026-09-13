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
        R.drawRect(x, y, w, h, { fill: fill, radius: radius == null ? 10 : radius });
    }

    function stripHtml(s) {
        return String(s == null ? '' : s)
            .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }

    const CATS = ['heal', 'energy', 'buff', 'resource', 'special', 'permanent', 'daily', 'weekly'];
    const CAT_NAMES = { heal: '生命恢复', energy: '能量恢复', buff: '属性强化', resource: '资源包', special: '特殊道具', permanent: '永久强化', daily: '每日特惠', weekly: '每周特惠' };
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

    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.data || !game.data.shop) return;
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const shop = game.data.shop;
        const consumables = shop.consumables || [];
        const activeCat = game.shopCategory || 'all';

        R.drawText('🛒 基因共生体商人', PX + MAX_W / 2, 24, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        R.drawButton({ id: 'shopBack', x: PX + 12, y: 10, w: 74, h: 28, text: '← 返回', fontSize: 12, bg: t.bgCard, color: t.textSecondary, border: t.borderSoft, onTap: function () { try { game.merchantMode ? game.leaveMerchant() : game.goBack(); } catch (e) {} } });
        let y = 48;
        R.drawText(game.merchantMode ? '流浪商人特惠！所有商品8折优惠！' : '"欢迎，进化者。我这里有各种基因改造品，能让你在进化之路上走得更远。"', x + 8, y, { fontSize: 11, color: game.merchantMode ? t.success : t.textSecondary, maxWidth: w - 16 });
        y += 20;

        // 资源显示
        box(x, y, w, 32, t.bgSecondary, 8);
        R.drawText('🧬 基因精华：' + game.player.gold, x + 8, y + 10, { fontSize: 12, color: t.warning, bold: true });
        let fx = x + 150;
        for (let q = 1; q <= 4; q++) {
            R.drawText(CURR_NAMES['fragments_' + q].slice(0, 2) + '碎：' + (game.permanent.universalFragments[q] || 0), fx, y + 10, { fontSize: 10, color: t.textMuted });
            fx += 64;
            if (fx > x + w - 40) break;
        }
        y += 40;

        // 分类标签
        let cx = x + 8;
        const allBtn = { id: 'shopCat_all', text: '全部', w: 56 };
        R.drawButton({
            id: allBtn.id, x: cx, y: y, w: allBtn.w, h: 28,
            text: allBtn.text, fontSize: 11, bg: activeCat === 'all' ? t.warning : t.bgCard,
            color: activeCat === 'all' ? '#0a0e17' : t.textSecondary,
            onTap: function () { try { game.openShop('all'); } catch (e) {} }
        });
        cx += allBtn.w + 6;
        CATS.forEach(function (cat) {
            const count = cat === 'daily' ? (shop.dailyItems || []).length : (cat === 'weekly' ? (shop.weeklyItems || []).length : (cat === 'permanent' ? (shop.permanentItems || []).length : consumables.filter(function (i) { return i.category === cat; }).length));
            const label = CAT_NAMES[cat] + ' (' + count + ')';
            const bw = Math.min(104, (R.ctx.measureText ? R.ctx.measureText(label).width + 16 : label.length * 12));
            if (cx + bw > x + w - 8) { cx = x + 8; y += 34; }
            R.drawButton({
                id: 'shopCat_' + cat, x: cx, y: y, w: bw, h: 28,
                text: label, fontSize: 10, bg: activeCat === cat ? t.warning : t.bgCard,
                color: activeCat === cat ? '#0a0e17' : t.textSecondary,
                onTap: (function (c) { return function () { try { game.openShop(c); } catch (e) {} }; })(cat)
            });
            cx += bw + 6;
        });
        y += 36;

        // 商品列表
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
            R.drawText('该分类暂无商品', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 26;
        }
        filtered.forEach(function (item) {
            const price = item.price ? item.price.amount : 10;
            const currency = item.price ? item.price.currency : 'gold';
            const currName = CURR_NAMES[currency] || currency;
            const limit = item.limitPerRun || 99;
            const purchased = (game.shopPurchaseCount && game.shopPurchaseCount[item.id]) || 0;
            const remaining = limit - purchased;
            let canBuy = remaining > 0;
            if (currency === 'gold') canBuy = canBuy && game.player.gold >= price;
            else if (currency === 'essence') canBuy = canBuy && (game.permanent.essence || 0) >= price;
            else {
                const q = parseInt(currency.replace('fragments_', ''), 10);
                canBuy = canBuy && (game.permanent.universalFragments[q] || 0) >= price;
            }
            const lines = [];
            lines.push(item.name + (remaining <= 0 ? '（已售罄）' : ''));
            if (item.description) lines.push(stripHtml(item.description));
            const eff = effectText(item, game);
            if (eff) lines.push(eff);
            lines.push('价格：' + price + ' ' + currName + '（本局剩余 ' + remaining + '）');
            const cardH = 26 + lines.length * 16 + 8;
            box(x, y, w, cardH, canBuy ? t.bgSecondary : t.bgPrimary, 8);
            if (!canBuy) R.ctx.globalAlpha = 0.55;
            // P2-2：商品图标（与 DOM 原版一致：item.icon 或回退 'box'，28px）
            const ic = (item.icon && game.icons && game.icons[item.icon]) ? item.icon : 'box';
            R.drawIcon(ic, x + 10, y + 10, 26, canBuy ? t.accent : t.textMuted);
            let iy = y + 10;
            lines.forEach(function (ln, i) {
                R.drawText(ln, x + 44, iy, { fontSize: i === 0 ? 13 : 10, color: i === 0 ? t.textPrimary : (i === 1 ? t.textSecondary : (i === 2 ? t.accent : t.warning)), bold: i === 0, maxWidth: w - 130 });
                iy += 16;
            });
            R.ctx.globalAlpha = 1;
            R.drawButton({
                id: 'shopBuy_' + item.id, x: x + w - 84, y: y + cardH / 2 - 15, w: 74, h: 30,
                text: remaining > 0 ? '购买' : '已售罄', fontSize: 12,
                bg: canBuy ? t.success : t.textFaint, color: '#ffffff', disabled: !canBuy,
                onTap: (function (iid) { return function () { try { game.buyItem(iid); } catch (e) {} }; })(item.id)
            });
            y += cardH + 6;
        });
        y += 20;

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
