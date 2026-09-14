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

        R.drawText('🎒 背包', PX + MAX_W / 2, 22, { fontSize: 20, color: t.textPrimary, align: 'center', bold: true });
        R.drawButton({ id: 'invClose', x: x + w - 66, y: 8, w: 58, h: 30, text: '× 关闭', fontSize: 12, bg: t.bgCard, color: t.textSecondary, border: t.borderSoft, onTap: function () { try { game.closePop(); game.goBack(); } catch (e) {} } });
        let y = 52;
        if (game.inBattle) { y = 174; } else { y = 166; }

        // 战斗中提示条（DOM：inBattle 时显示 y174 h30 间距29）
        if (game.inBattle) {
            box(x, y, w, 30, t.bgCard, 8);
            R.drawText('战斗中 - 使用物品后请返回战斗', x + 8, y + 10, { fontSize: 12, color: t.warning });
            R.drawButton({ id: 'invBackBattle', x: x + w - 92, y: y + 1, w: 84, h: 28, text: '返回战斗', fontSize: 12, bg: t.success, color: '#ffffff', onTap: function () { try { game.closePop(); game.showScreen('battleScreen'); } catch (e) {} } });
            y += 29;
        }

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

        // 共生体（简要显示，详细管理在共生体面板）DOM grid 勾选
        const symbionts = game.permanent.symbionts || [];
        const equippedSym = game.permanent.equippedSymbionts || {};
        box(x, y, w, 36, t.bgCard, 8);
        R.drawText('共生体（' + symbionts.length + '）', x + 8, y + 11, { fontSize: 13, color: t.purple, bold: true });
        y += 44;
        if (symbionts.length === 0) {
            R.drawText('共生体背包为空，击败敌人有几率获得共生体', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 28;
        } else {
            const colW = (w - 6) / 2;
            symbionts.forEach(function (symId, idx) {
                const tpl = game.getSymbiontTemplate ? game.getSymbiontTemplate(symId) : null;
                if (!tpl) return;
                const isEq = Object.values(equippedSym).indexOf(symId) >= 0;
                const col = idx % 2, row = Math.floor(idx / 2);
                const cx = x + col * (colW + 6);
                const cy = y + row * 36;
                box(cx, cy, colW, 30, t.bgCard, 6);
                R.drawText(isEq ? '✔' : '□', cx + 10, cy + 9, { fontSize: 13, color: isEq ? t.success : t.textMuted });
                R.drawText(tpl.name || '共生体', cx + 30, cy + 10, { fontSize: 12, color: t.textMuted, maxWidth: colW - 40 });
            });
            y += Math.ceil(symbionts.length / 2) * 36 + 8;
            R.drawButton({ id: 'invManageSym', x: x, y: y, w: w, h: 30, text: '管理共生体', fontSize: 13, bg: t.bgCard, color: t.textPrimary, border: t.borderSoft, onTap: function () { try { game.openSymbiontPanel(); } catch (e) {} } });
            y += 38;
        }
        y += 20;

        // 首领核心（Boss核心 名称和数量）
        const bossCores = game.permanent.bossCores || {};
        const coreCount = Object.keys(bossCores).reduce(function (a, b) { return a + (bossCores[b] || 0); }, 0);
        if (coreCount > 0) {
            box(x, y, w, 36, t.bgCard, 8);
            R.drawText('首领核心（' + coreCount + '）', x + 8, y + 11, { fontSize: 13, color: t.danger, bold: true });
            y += 44;
            R.drawText('用于解锁神话天赋和高级合成', x + 8, y, { fontSize: 12, color: t.textSecondary });
            y += 22;
            const coreColW = (w - 6) / 2;
            let idx2 = 0;
            for (var bid in bossCores) {
                const cnt = bossCores[bid];
                if (cnt <= 0) continue;
                const col = idx2 % 2, row = Math.floor(idx2 / 2);
                const cx = x + col * (coreColW + 6);
                const cy = y + row * 70;
                box(cx, cy, coreColW, 64, t.bgCard, 6);
                R.drawRect(cx, cy, 3, 64, { fill: t.danger, radius: 1.5 });
                R.drawText((game.getBossCoreName ? game.getBossCoreName(bid) : bid) + ' ×' + cnt, cx + 8, cy + 8, { fontSize: 12, color: t.textPrimary, bold: true, maxWidth: coreColW - 16 });
                const bossData = (game.data && game.data.enemies) ? ((game.data.enemies.enemies || game.data.enemies) || []).find(function (e) { return e.id === bid; }) : null;
                if (bossData && bossData.description) {
                    R.drawText(stripHtml(bossData.description), cx + 8, cy + 30, { fontSize: 10, color: t.textFaint, maxWidth: coreColW - 16, maxLines: 3, lineHeight: 14 });
                }
                idx2++;
            }
            y += Math.ceil(idx2 / 2) * 70 + 6;
        }
        y += 8;

        // 基因碎片管理（按品质+体系分类）
        box(x, y, w, 36, t.bgCard, 8);
        R.drawText('基因碎片管理', x + 8, y + 11, { fontSize: 13, color: t.purple, bold: true });
        y += 44;
        {
            const uf = game.permanent.universalFragments || {};
            const tf = game.permanent.tagFragments || {};
            const tagNames = game.tagNames || {};
            for (let q = 1; q <= 5; q++) {
                let exclusiveTotal = 0;
                const universalCount = uf[q] || 0;
                const tagDetails = [];
                for (var tag in tf) {
                    const cnt = (tf[tag] || {})[q] || 0;
                    if (cnt > 0) {
                        exclusiveTotal += cnt;
                        tagDetails.push({ tag: parseInt(tag), name: tagNames[tag] || ('标签' + tag), count: cnt });
                    }
                }
                const total = exclusiveTotal + universalCount;
                if (total === 0) continue;
                const qColor = [0, t.textPrimary, t.info, t.purple, t.warning, t.danger][q] || t.textSecondary;
                box(x, y, w, 44, 'rgba(0,0,0,0.2)', 6);
                R.drawText((['', '普通', '稀有', '史诗', '传说', '神话'][q] || '') + '碎片', x + 8, y + 8, { fontSize: 13, color: qColor, bold: true });
                R.drawText('总数：' + total, x + w - 8, y + 8, { fontSize: 14, color: qColor, bold: true, align: 'right' });
                let fy = y + 26;
                if (tagDetails.length > 0) {
                    R.drawText('专属碎片（' + exclusiveTotal + '个）：', x + 8, fy, { fontSize: 11, color: t.textMuted });
                    fy += 16;
                    let cx2 = x + 8;
                    tagDetails.forEach(function (td) {
                        const lbl = td.name + ' ×' + td.count;
                        const wd = Math.min(R.measureText ? R.measureText(lbl, 10) : (lbl.length * 10), 120);
                        R.drawRect(cx2, fy, wd + 12, 16, { fill: 'rgba(0,229,176,0.1)', radius: 3 });
                        R.drawText(lbl, cx2 + 6, fy + 3, { fontSize: 10, color: t.success });
                        cx2 += wd + 16;
                    });
                    fy += 20;
                }
                if (universalCount > 0) {
                    R.drawText('通用碎片：' + universalCount, x + 8, fy, { fontSize: 11, color: t.textMuted });
                    fy += 16;
                }
                y += (tagDetails.length > 0 ? 46 : 30) + (universalCount > 0 ? 16 : 0) + 6;
            }
        }

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
