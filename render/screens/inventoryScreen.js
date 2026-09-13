// ============================================================
//  render/screens/inventoryScreen.js — 阶段 3：背包界面 Canvas 化
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

    const QNAMES = ['', '普通', '稀有', '史诗', '传说', '神话'];
    const SLOT_NAMES = { core: '核心', predator: '捕食', sensor: '感知', motor: '运动', energy: '能量', evolution: '进化' };
    const STAT_NAMES = { maxHp: '生命', defense: '防御', attack: '攻击', speed: '先手值', crit: '暴击率', agility: '敏捷', strength: '力量', vitality: '体质', perception: '感知', evolution: '进化', hit: '命中率', dodge: '闪避率', critDamage: '暴击伤害', energy: '能量', maxEnergy: '能量上限', energyRegen: '能量恢复', talentPower: '天赋强度', hpRegen: '生命恢复', dotDamage: '持续伤害', cooldownReduction: '冷却缩减', armorPenetration: '护甲穿透', critResistance: '暴击抗性', lifeSteal: '吸血', reflectDamage: '反伤', shield: '护盾', thorns: '荆棘' };

    let _scrollY = 0;
    function onShow() { _scrollY = 0; }

    function effectDesc(item) {
        const eff = item.effect || {};
        switch (eff.type) {
            case 'heal_percent': return '恢复' + eff.value + '%最大生命';
            case 'energy_percent': return '恢复' + eff.value + '%最大能量';
            case 'full_restore': return '生命和能量完全恢复';
            case 'attack_boost': return '本局攻击力+' + eff.value + '%';
            case 'defense_boost': return '本局防御力+' + eff.value + '%';
            case 'speed_boost': return '本局先手值+' + eff.value;
            case 'all_boost': return '本局全属性+' + eff.value + '%';
            case 'gain_fragments': return '获得' + eff.value + '个碎片';
            case 'exp_boost': return '本局经验+' + eff.value + '%';
            case 'drop_boost': return '本局掉落+' + eff.value + '%';
            case 'gain_talent_points': return '获得' + eff.value + '天赋点';
            case 'revive': return '死亡复活（' + eff.value + '%生命）';
            default: return '特殊效果';
        }
    }

    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.player) return;
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const items = game.player.items || [];
        const consumables = game.data.shop ? (game.data.shop.consumables || []) : [];

        R.drawText('🎒 背包', PX + MAX_W / 2, 24, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        R.drawButton({ id: 'invBack', x: PX + 12, y: 10, w: 74, h: 28, text: '← 返回', fontSize: 12, bg: t.bgCard, color: t.textSecondary, border: t.borderSoft, onTap: function () { try { game.goBack(); } catch (e) {} } });
        let y = 52;

        // 消耗品
        box(x, y, w, 36, t.bgCard, 8);
        R.drawText('消耗品（' + items.length + '）', x + 8, y + 11, { fontSize: 13, color: t.success, bold: true });
        y += 44;
        if (items.length === 0) {
            R.drawText('背包空空如也，去商店购买吧！', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 28;
        } else {
            const counts = {};
            items.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
            Object.keys(counts).forEach(function (id) {
                const item = consumables.find(function (c) { return c.id === id; });
                if (!item) return;
                const count = counts[id];
                const lines = [];
                lines.push('🧪 ' + item.name + '  ×' + count);
                lines.push(effectDesc(item));
                if (item.description) lines.push(stripHtml(item.description));
                const cardH = 24 + lines.length * 16 + 6;
                box(x, y, w, cardH, t.bgSecondary, 8);
                let iy = y + 10;
                lines.forEach(function (ln, i) {
                    R.drawText(ln, x + 10, iy, { fontSize: i === 0 ? 13 : 10, color: i === 0 ? t.textPrimary : (i === 1 ? t.info : t.textFaint), bold: i === 0, maxWidth: w - 100 });
                    iy += 16;
                });
                R.drawButton({
                    id: 'invUse_' + item.id, x: x + w - 82, y: y + cardH / 2 - 15, w: 72, h: 30,
                    text: '使用', fontSize: 12, bg: t.success, color: '#ffffff',
                    onTap: (function (iid) { return function () { try { game.useInventoryItem(iid); } catch (e) {} }; })(item.id)
                });
                y += cardH + 6;
            });
        }
        y += 8;

        // 共生体背包
        const symbionts = game.permanent.symbionts || [];
        const equippedSym = game.permanent.equippedSymbionts || {};
        box(x, y, w, 36, t.bgCard, 8);
        R.drawText('共生体背包（' + symbionts.length + '）', x + 8, y + 11, { fontSize: 13, color: t.purple, bold: true });
        y += 44;
        if (symbionts.length === 0) {
            R.drawText('共生体背包为空，击败敌人有几率获得共生体', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 28;
        } else {
            symbionts.forEach(function (symId) {
                const tpl = game.getSymbiontTemplate ? game.getSymbiontTemplate(symId) : null;
                if (!tpl) return;
                const isEq = Object.values(equippedSym).indexOf(symId) >= 0;
                const qColor = game.symbiontQualityColors ? (game.symbiontQualityColors[tpl.quality] || t.textSecondary) : t.textSecondary;
                let statsText = '';
                if (tpl.stats) {
                    for (var k in tpl.stats) { if (tpl.stats[k]) statsText += (STAT_NAMES[k] || k) + '+' + tpl.stats[k] + ' '; }
                }
                const lines = [];
                lines.push('🦠 ' + tpl.name + ' [' + QNAMES[tpl.quality || 1] + '·' + (game.symbiontSlotNames ? game.symbiontSlotNames[tpl.slot] : SLOT_NAMES[tpl.slot] || tpl.slot) + ']' + (isEq ? '（已装备）' : ''));
                if (tpl.desc) lines.push(stripHtml(tpl.desc));
                if (statsText) lines.push(statsText);
                const cardH = 24 + lines.length * 16 + 6;
                box(x, y, w, cardH, t.bgSecondary, 8);
                R.drawRect(x, y, 3, cardH, { fill: qColor, radius: 1.5 });
                let iy = y + 10;
                lines.forEach(function (ln, i) {
                    R.drawText(ln, x + 10, iy, { fontSize: i === 0 ? 12 : 10, color: i === 0 ? qColor : t.textFaint, bold: i === 0, maxWidth: w - 20 });
                    iy += 16;
                });
                y += cardH + 6;
            });
        }
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
        if (!game || !game.player) return;
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);
        render();
        R.ctx.restore();
    }

    R.ScreenManager.register('inventoryScreen', {
        render: draw,
        onShow: onShow
    });
})();
