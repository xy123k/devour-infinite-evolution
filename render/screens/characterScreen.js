// ============================================================
//  render/screens/characterScreen.js — 阶段 3：角色界面 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  设计：5 个标签页（状态/装备/天赋/技能/背包），渲染器每帧
//        读 game 状态绘制；交互回调直调 game 原函数。
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

    const STAT_NAMES = { maxHp: '生命', defense: '防御', attack: '攻击', speed: '先手值', crit: '暴击率', agility: '敏捷', strength: '力量', vitality: '体质', perception: '感知', evolution: '进化', hit: '命中率', dodge: '闪避率', critDamage: '暴击伤害', energy: '能量', maxEnergy: '能量上限', energyRegen: '能量恢复', talentPower: '天赋强度', hpRegen: '生命恢复', dotDamage: '持续伤害', cooldownReduction: '冷却缩减', armorPenetration: '护甲穿透', critResistance: '暴击抗性', lifeSteal: '吸血', reflectDamage: '反伤', shield: '护盾', thorns: '荆棘', firstStrike: '先手攻击伤害', dotOnHit: '攻击附加中毒', dodgeBonus: '闪避加成', critChance: '暴击率', extraAttack: '额外攻击概率', cooldownReductionPct: '冷却缩减', healOnKill: '击杀回血', damageReduction: '伤害减免', poisonResist: '中毒抗性', burnResist: '燃烧抗性', frostResist: '冰冻抗性', crystalResist: '晶体抗性', paralysisResist: '麻痹抗性', witherResist: '枯萎抗性', doomResist: '凋零抗性' };
    const SLOT_NAMES = { core: '核心', predator: '捕食', sensor: '感知', motor: '运动', energy: '能量', evolution: '进化' };
    const SLOT_ORDER = ['core', 'predator', 'sensor', 'motor', 'energy', 'evolution'];
    const QUALITY_NAMES = ['', '普通', '稀有', '史诗', '传说', '神话'];

    let _scrollY = 0;

    function onShow() { _scrollY = 0; }

    // 标签按钮
    function drawTabs(y) {
        const game = g();
        const t = R.Theme.get();
        const tabs = [
            { k: 'status', label: '状态' }, { k: 'equipment', label: '装备' },
            { k: 'talents', label: '天赋' }, { k: 'skills', label: '技能' }, { k: 'inventory', label: '背包' }
        ];
        const x = PX + 12, w = MAX_W - 24;
        const tw = (w - 4 * 6) / 5;
        tabs.forEach(function (tab, i) {
            const selected = game.characterTab === tab.k;
            R.drawButton({
                id: 'charTab' + tab.k, x: x + i * (tw + 6), y: y, w: tw, h: 34,
                text: tab.label, fontSize: 13,
                bg: selected ? t.accent : t.bgCard,
                color: selected ? '#0a0e17' : t.textSecondary,
                border: selected ? null : t.borderSoft,
                onTap: (function (k) { return function () { try { game.setCharacterTab(k); } catch (e) {} }; })(tab.k)
            });
        });
    }

    // ============ 状态页 ============
    // P3-1：槽位扩充区块（对照 DOM 原版角色状态页）
    function renderSlotUpgrade(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const p = game.player;
        const equippedTalents = p.equippedTalents || [];
        let h = 40;

        // 被动槽
        const passiveSlots = game.getPassiveSlots ? game.getPassiveSlots() : 0;
        const passiveAuto = game.getPassiveSlotAutoProgress ? game.getPassiveSlotAutoProgress() : null;
        const passiveManual = game.getPassiveSlotManualProgress ? game.getPassiveSlotManualProgress() : null;
        let passiveLines = [];
        if (passiveAuto) {
            if (passiveAuto.isMaxAuto) passiveLines.push('自动扩充：已达上限（' + passiveAuto.autoSlots + '/' + passiveAuto.maxAutoSlots + '）');
            else passiveLines.push('自动扩充：已花天赋点' + passiveAuto.totalSpent + '/' + passiveAuto.nextAutoSlot + '（再花' + passiveAuto.remainingToNext + '点+1槽，上限' + passiveAuto.maxAutoSlots + '）');
        }
        if (passiveManual) {
            if (passiveManual.isMaxManual) passiveLines.push('手动扩充已达上限（' + passiveManual.manualSlots + '/' + passiveManual.maxManualSlots + '）');
            else passiveLines.push('手动扩充：消耗' + passiveManual.cost + '精粹（当前' + passiveManual.essence + '）');
        }
        h += 26 + passiveLines.length * 23 + 8;

        // 技能槽
        const activeSlots = game.getActiveSlots ? game.getActiveSlots() : 3;
        const activeAuto = game.getActiveSlotAutoProgress ? game.getActiveSlotAutoProgress() : null;
        const activeManual = game.getActiveSlotManualProgress ? game.getActiveSlotManualProgress() : null;
        let activeLines = [];
        if (activeAuto) {
            if (activeAuto.isMaxAuto) activeLines.push('自动扩充：已达上限（' + activeAuto.autoSlots + '/' + activeAuto.maxAutoSlots + '）');
            else activeLines.push('自动扩充：当前等级' + activeAuto.level + '/' + activeAuto.nextLevel + '（再升' + activeAuto.remainingToNext + '级+1槽，上限' + activeAuto.maxAutoSlots + '）');
        }
        activeLines.push('默认3个基础技能不占槽，始终可用');
        if (activeManual) {
            if (activeManual.isMaxManual) activeLines.push('手动扩充已达上限（' + activeManual.manualSlots + '/' + activeManual.maxManualSlots + '）');
            else activeLines.push('手动扩充：消耗' + activeManual.cost + '精粹（当前' + activeManual.essence + '）');
        }
        h += 26 + activeLines.length * 23 + 8;

        box(x, y, w, h, t.bgCard, 10);
        R.drawText('槽位扩充', x + 8, y + 22, { fontSize: 14, color: t.textPrimary, bold: true });
        let iy = y + 46;
        // 被动槽
        R.drawText('天赋槽（被动）：' + equippedTalents.length + '/' + passiveSlots, x + 8, iy, { fontSize: 12, color: t.success, bold: true });
        if (passiveAuto) R.drawText('初始4 + 自动' + passiveAuto.autoSlots + ' + 手动' + (passiveManual ? passiveManual.manualSlots : 0), x + w / 2, iy, { fontSize: 10, color: t.textFaint });
        iy += 23;
        passiveLines.forEach(function (ln) {
            R.drawText(ln, x + 16, iy, { fontSize: 11, color: ln.indexOf('上限') >= 0 ? t.textMuted : t.textSecondary });
            iy += 23;
        });
        // 手动扩充按钮
        if (passiveManual && !passiveManual.isMaxManual) {
            R.drawButton({
                id: 'charExpandPassive', x: x + 8, y: iy, w: w - 16, h: 30,
                text: '手动扩充天赋槽（消耗' + passiveManual.cost + '精粹）',
                fontSize: 11, bg: passiveManual.canAfford ? t.success : t.textFaint, color: '#ffffff',
                disabled: !passiveManual.canAfford,
                onTap: function () { try { game.expandPassiveSlot(); } catch (e) {} }
            });
            iy += 34;
        }
        iy += 6;
        // 技能槽
        R.drawText('技能槽（主动）：' + activeSlots + '/6（可扩充）', x + 8, iy, { fontSize: 12, color: t.info, bold: true });
        if (activeAuto) R.drawText('初始3 + 自动' + activeAuto.autoSlots + ' + 手动' + (activeManual ? activeManual.manualSlots : 0), x + w / 2, iy, { fontSize: 10, color: t.textFaint });
        iy += 23;
        activeLines.forEach(function (ln) {
            R.drawText(ln, x + 16, iy, { fontSize: 11, color: ln.indexOf('上限') >= 0 || ln.indexOf('默认') >= 0 ? t.textMuted : t.textSecondary });
            iy += 23;
        });
        if (activeManual && !activeManual.isMaxManual) {
            R.drawButton({
                id: 'charExpandActive', x: x + 8, y: iy, w: w - 16, h: 30,
                text: '手动扩充技能槽（消耗' + activeManual.cost + '精粹）',
                fontSize: 11, bg: activeManual.canAfford ? t.info : t.textFaint, color: '#ffffff',
                disabled: !activeManual.canAfford,
                onTap: function () { try { game.expandActiveSlot(); } catch (e) {} }
            });
            iy += 34;
        }
        iy += 18;
        R.drawText('槽位满足条件后自动扩充，无需手动操作', x + 8, iy, { fontSize: 11, color: t.textFaint });
        h += 20;
        return y + h + 10;
    }

    // P3-1：天赋套装区块（对照 DOM 原版角色状态页）
    function renderTalentSets(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        let progress = null;
        try { progress = game.getTalentSetProgress ? game.getTalentSetProgress() : null; } catch (e) {}
        const activeSets = (progress && progress.sets || []).filter(function (s) { return s.activeThresholds && s.activeThresholds.length > 0; });
        const activeCross = (progress && progress.crossSets || []).filter(function (c) { return c.active; });
        const activeCombos = (progress && progress.combos || []).filter(function (c) { return c.active; });
        const sections = activeSets.length + activeCross.length + activeCombos.length;
        const emptyH = sections === 0 ? 70 : activeSets.length * (40 + activeSets.reduce(function (a, s) { return a + (s.activeThresholds ? s.activeThresholds.length : 0) * 16; }, 0))
            + activeCross.length * (44 + 16 * 1)
            + activeCombos.length * (44 + 16 * 1) + 30;
        const h = Math.max(emptyH, 60);
        box(x, y, w, h, t.bgCard, 10);
        R.drawText('天赋套装', x + 8, y + 12, { fontSize: 14, color: t.textPrimary, bold: true });
        let iy = y + 36;
        if (sections === 0) {
            R.drawText('暂无激活的天赋套装', x + 8, iy, { fontSize: 12, color: t.textMuted, bold: true });
            R.drawText('装备同体系天赋可触发套装效果', x + 8, iy + 22, { fontSize: 11, color: t.textFaint });
        } else {
            activeSets.forEach(function (set) {
                R.drawText('✓ ' + set.name + '（' + set.count + '件）', x + 8, iy, { fontSize: 12, color: t.success, bold: true });
                iy += 18;
                (set.activeThresholds || []).forEach(function (th) {
                    R.drawText('    ' + th.count + '件：' + th.effect, x + 8, iy, { fontSize: 11, color: t.textSecondary });
                    iy += 16;
                });
                iy += 4;
            });
            activeCross.forEach(function (c) {
                const reqNames = (c.requires || []).map(function (tag) { return (game.tagNames && game.tagNames[tag]) || ('体系' + tag); }).join(' + ');
                R.drawText('🔀 跨体系：' + c.name + '（' + reqNames + '）', x + 8, iy, { fontSize: 12, color: t.purple, bold: true });
                iy += 18;
                R.drawText('    ' + c.effect, x + 8, iy, { fontSize: 11, color: t.textSecondary });
                iy += 20;
            });
            activeCombos.forEach(function (c) {
                const reqNames = (c.requires || []).map(function (tag) { return (game.tagNames && game.tagNames[tag]) || ('体系' + tag); }).join(' + ');
                R.drawText('🔗 联动：' + c.name + '（共生体+' + reqNames + '）', x + 8, iy, { fontSize: 12, color: t.warning, bold: true });
                iy += 18;
                R.drawText('    ' + c.effect, x + 8, iy, { fontSize: 11, color: t.textSecondary });
                iy += 20;
            });
        }
        return y + h + 10;
    }

    // ============ 状态页 ============
    function renderStatus(y) {
        const game = g();
        const t = R.Theme.get();
        const p = game.player;
        const x = PX + 12, w = MAX_W - 24;

        // 基本信息
        box(x, y, w, 96, t.bgCard, 10);
        let iy = y + 12;
        R.drawText('基本信息', x + 8, iy, { fontSize: 14, color: t.textPrimary, bold: true });
        iy += 24;
        const pairs = [
            ['等级', p.level || 1, t.textPrimary], ['经验', (p.exp || 0) + '/' + (p.expToNext || 20), t.textPrimary],
            ['生命', Math.floor(p.hp || 0) + '/' + Math.floor(p.maxHp || 0), t.success],
            ['能量', Math.floor(p.energy || 0) + '/' + Math.floor(p.maxEnergy || 0), t.info]
        ];
        pairs.forEach(function (pr, i) {
            const cx = x + 8 + (i % 2) * (w / 2 - 8);
            const cy = iy + Math.floor(i / 2) * 24;
            R.drawText(pr[0] + '：', cx, cy, { fontSize: 12, color: t.textMuted });
            R.drawText(String(pr[1]), cx + 48, cy, { fontSize: 12, color: pr[2], bold: true });
        });
        y += 104;

        // 槽位扩充（DOM 在基本信息后）
        y = renderSlotUpgrade(y);

        // 五维 + 永久成长
        box(x, y, w, 110, t.bgCard, 10);
        R.drawText('基础属性（基础 + 永久成长）', x + 8, y + 12, { fontSize: 14, color: t.textPrimary, bold: true });
        const b = game.permanent.bonusStats;
        const eu = game.permanent.essenceUpgrades || {};
        const permStats = {
            strength: b.strength + (eu.strength || 0) * 0.03 * 6,
            agility: b.agility + (eu.agility || 0) * 0.03 * 6,
            vitality: b.vitality + (eu.vitality || 0) * 0.03 * 6,
            perception: b.perception + (eu.perception || 0) * 0.03 * 6,
            evolution: b.evolution + (eu.evolution || 0) * 0.03 * 6
        };
        const stats = [
            { k: 'strength', label: '力量', color: t.warning }, { k: 'agility', label: '敏捷', color: t.success },
            { k: 'vitality', label: '体质', color: t.danger }, { k: 'perception', label: '感知', color: t.purple },
            { k: 'evolution', label: '进化', color: t.info }
        ];
        stats.forEach(function (st, i) {
            const cx = x + 8 + (i % 2) * (w / 2 - 8);
            const cy = y + 40 + Math.floor(i / 2) * 24;
            const perm = Math.floor(permStats[st.k] * 10) / 10;
            R.drawText(st.label + '：', cx, cy, { fontSize: 12, color: st.color, bold: true });
            R.drawText(String(p[st.k] || 0), cx + 48, cy, { fontSize: 12, color: t.textPrimary, bold: true });
            if (perm > 0) R.drawText('+' + perm + '永久', cx + 96, cy, { fontSize: 10, color: t.accent });
        });
        // 属性点
        if (p.statPoints > 0) {
            R.drawText('可用属性点：' + p.statPoints, x + 8, y + 92, { fontSize: 12, color: t.warning, bold: true });
        }
        y += 118;

        // 战斗属性（P3-1：补回"闪避率"）
        box(x, y, w, 120, t.bgCard, 10);
        R.drawText('战斗属性（基础 + 永久成长）', x + 8, y + 12, { fontSize: 14, color: t.textPrimary, bold: true });
        const bStats = [
            ['攻击', Math.floor(p.attack), t.orange], ['防御', Math.floor(p.defense * 10) / 10, t.info],
            ['暴击', p.crit + '%', t.warning], ['暴伤', p.critDamage + '%', t.danger],
            ['命中', p.hit + '%', t.success], ['闪避', (p.dodgeRate || 0) + '%', t.purple],
            ['先手', p.speed, t.info]
        ];
        bStats.forEach(function (bs, i) {
            const cx = x + 8 + (i % 2) * (w / 2 - 8);
            const cy = y + 40 + Math.floor(i / 2) * 24;
            R.drawText(bs[0] + '：', cx, cy, { fontSize: 12, color: t.textMuted });
            R.drawText(String(bs[1]), cx + 48, cy, { fontSize: 12, color: bs[2], bold: true });
        });
        y += 128;

        // P3-1：天赋套装区块
        y = renderTalentSets(y);

        // 状态效果
        const statusText = game.formatStatuses ? stripHtml(game.formatStatuses(p)) : '';
        if (statusText) {
            box(x, y, w, 60, t.bgCard, 10);
            R.drawText('当前状态', x + 8, y + 12, { fontSize: 14, color: t.textPrimary, bold: true });
            R.drawText(statusText, x + 8, y + 36, { fontSize: 12, color: t.purple, maxWidth: w - 16 });
            y += 68;
        }

        // 属性分配按钮
        if (p.statPoints > 0) {
            box(x, y, w, 80, t.bgSecondary, 8);
            R.drawText('属性分配（' + p.statPoints + '点可用）', x + 8, y + 10, { fontSize: 13, color: t.warning, bold: true });
            const btnW = (w - 30 - 4 * 6) / 5;
            stats.forEach(function (st, i) {
                R.drawButton({
                    id: 'charAlloc_' + st.k, x: x + 8 + i * (btnW + 6), y: y + 34, w: btnW, h: 32,
                    text: st.label + '+1', fontSize: 12, bg: st.color, color: '#ffffff',
                    onTap: (function (k) { return function () { try { game.allocateStat(k); } catch (e) {} }; })(st.k)
                });
            });
            y += 88;
        }
        return y;
    }

    // ============ 装备页（共生体） ============
    function renderEquipment(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const symbiontIds = game.permanent.symbionts || [];
        const equippedSym = game.permanent.equippedSymbionts || {};
        const allSym = game.data.symbionts ? (game.data.symbionts.symbionts || game.data.symbionts) : [];

        SLOT_ORDER.forEach(function (slot) {
            box(x, y, w, 46, t.bgCard, 8);
            const equippedId = equippedSym[slot];
            const equipped = equippedId ? allSym.find(function (s) { return s.id === equippedId; }) : null;
            R.drawText('◆ ' + (SLOT_NAMES[slot] || slot), x + 8, y + 12, { fontSize: 13, color: t.success, bold: true });
            R.drawText(equipped ? '已装备：' + equipped.name : '未装备', x + 8, y + 30, { fontSize: 11, color: equipped ? t.accent : t.textFaint });
            y += 52;

            const slotSym = allSym.filter(function (s) { return s.slot === slot && (symbiontIds.indexOf(s.id) >= 0 || equippedSym[slot] === s.id); });
            if (slotSym.length === 0) {
                R.drawText('该部位还没有共生体', x + 8, y + 12, { fontSize: 11, color: t.textFaint });
                y += 26;
            } else {
                slotSym.forEach(function (s) {
                    const owned = symbiontIds.indexOf(s.id) >= 0 || equippedSym[slot] === s.id;
                    const isEq = equippedSym[slot] === s.id;
                    const qColor = t.quality[QUALITY_NAMES[s.quality || 1].toLowerCase()] || t.textSecondary;
                    let statText = [];
                    const st = s.stats || {};
                    for (var k in st) { if (st[k]) statText.push((STAT_NAMES[k] || k) + '+' + st[k]); }
                    const lines = [];
                    lines.push(stripHtml(s.name || '共生体') + (isEq ? '  [已装备]' : (owned ? '  [点击装备]' : '  [未获得]')));
                    lines.push('『' + QUALITY_NAMES[s.quality || 1] + '品质』 ' + (s.special ? '特殊：' + (s.special) + (s.specialValue ? ' +' + s.specialValue : '') : '') + (statText.length ? ' | ' + statText.join('，') : ''));
                    if (s.desc) lines.push(stripHtml(s.desc));
                    const cardH = 24 + lines.length * 16 + 8;
                    box(x, y, w, cardH, t.bgSecondary, 8);
                    R.drawRect(x, y, 3, cardH, { fill: isEq ? t.success : (owned ? qColor : t.textFaint), radius: 1.5 });
                    let iy = y + 10;
                    lines.forEach(function (ln, i) {
                        R.drawText(ln, x + 10, iy, { fontSize: i === 0 ? 13 : 11, color: i === 0 ? (isEq ? t.success : t.textPrimary) : (i === 1 ? qColor : t.textFaint), bold: i === 0, maxWidth: w - 20 });
                        iy += 16;
                    });
                    if (owned) {
                        Input.registerButton({
                            id: 'sym_' + s.id, x: x, y: y, w: w, h: cardH,
                            onTap: (function (sid) { return function () { try { game.toggleSymbiontEquipById(sid); } catch (e) {} }; })(s.id)
                        });
                    }
                    y += cardH + 6;
                });
            }
        });
        return y;
    }

    // ============ 天赋页 ============
    function renderTalents(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const p = game.player;
        const equipped = p.equippedTalents || [];
        const all = game.data.talents ? game.data.talents.talents : [];
        const levels = game.permanent.talentLevels || {};

        box(x, y, w, 44, t.bgCard, 8);
        R.drawText('已装备天赋（' + equipped.length + '/' + (game.getPassiveSlots ? game.getPassiveSlots() : 0) + '）', x + 8, y + 13, { fontSize: 13, color: t.success, bold: true });
        R.drawText('天赋点：' + (game.permanent.talentPoints || 0), x + 8, y + 35, { fontSize: 11, color: t.warning });
        y += 52;

        if (equipped.length === 0) {
            R.drawText('尚未装备天赋', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 26;
        } else {
            equipped.forEach(function (tid) {
                const tl = all.find(function (x) { return x.id === tid; });
                if (!tl) return;
                const lv = levels[tid] || 1;
                const qColor = t.quality[QUALITY_NAMES[tl.quality || 1].toLowerCase()] || t.textSecondary;
                const effText = stripHtml(game.getTalentEffectText ? game.getTalentEffectText(tl) : (tl.description || tl.desc || ''));
                const lines = R.wrapText('[' + QUALITY_NAMES[tl.quality || 1] + '] ' + tl.name + '  Lv.' + lv + '  ' + effText, w - 24, 11, false).slice(0, 3);
                const cardH = 16 + lines.length * 15 + 8;
                box(x, y, w, cardH, t.bgSecondary, 8);
                R.drawRect(x, y, 3, cardH, { fill: qColor, radius: 1.5 });
                let iy = y + 10;
                lines.forEach(function (ln) {
                    R.drawText(ln, x + 10, iy, { fontSize: 11, color: t.textSecondary, maxWidth: w - 20 });
                    iy += 15;
                });
                y += cardH + 6;
            });
        }

        box(x, y, w, 44, t.bgCard, 8);
        R.drawText('💡 完整天赋管理与碎片合成', x + 8, y + 13, { fontSize: 12, color: t.info });
        R.drawText('请到底部导航「天赋」界面操作', x + 8, y + 35, { fontSize: 10, color: t.textFaint });
        y += 52;

        // 预构筑
        const sets = game.data.talentSets ? (game.data.talentSets.sets || game.data.talentSets) : [];
        if (sets.length) {
            R.drawText('— 天赋预构筑 —', x + 8, y + 6, { fontSize: 12, color: t.textMuted });
            y += 24;
            sets.forEach(function (set) {
                if (!set || !set.name) return;
                box(x, y, w, 34, t.bgCard, 6);
                R.drawText('📐 ' + set.name, x + 8, y + 12, { fontSize: 12, color: t.warning, bold: true });
                y += 40;
            });
        }
        return y;
    }

    // ============ 技能页 ============
    function renderSkills(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const p = game.player;
        const activeSkills = p.activeSkills || [];
        const allSkills = game.skillTable || {};

        box(x, y, w, 44, t.bgCard, 8);
        R.drawText('已选技能（' + activeSkills.length + '/' + (game.getActiveSlots ? game.getActiveSlots() : 3) + '）', x + 8, y + 12, { fontSize: 13, color: t.success, bold: true });
        y += 52;
        if (activeSkills.length === 0) {
            R.drawText('还没有选择技能', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 26;
        } else {
            activeSkills.forEach(function (sid) {
                const s = allSkills[sid];
                if (!s) return;
                box(x, y, w, 44, t.bgCard, 8);
                R.drawText('⚡ ' + s.name + (s.cost ? '（消耗' + s.cost + '能量）' : ''), x + 8, y + 12, { fontSize: 13, color: t.textPrimary, bold: true });
                if (s.desc) R.drawText(stripHtml(s.desc), x + 8, y + 30, { fontSize: 10, color: t.textFaint, maxWidth: w - 16 });
                y += 50;
            });
        }
        R.drawButton({
            id: 'charSkillLoadout', x: x, y: y, w: w, h: 40,
            text: '⚡ 选择/更换技能', fontSize: 14, bg: t.warning, color: '#ffffff',
            onTap: function () { try { game.openSkillLoadoutPanel(); } catch (e) {} }
        });
        y += 48;
        R.drawText('— 已学会技能 —', x + 8, y, { fontSize: 12, color: t.textMuted });
        y += 22;
        const defaults = ['skill_power_strike', 'skill_heal', 'skill_attack_buff'];
        const learned = Array.from(new Set(defaults.concat(activeSkills)));
        learned.forEach(function (sid) {
            const s = allSkills[sid];
            if (!s) return;
            const equipped = activeSkills.indexOf(sid) >= 0;
            R.drawText((equipped ? '✓ ' : '· ') + s.name, x + 8, y, { fontSize: 12, color: equipped ? t.success : t.textMuted });
            y += 20;
        });
        return y;
    }

    // ============ 背包页 ============
    function renderInventory(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const items = game.player.items || [];
        const consumables = game.data.shop ? (game.data.shop.consumables || []) : [];

        box(x, y, w, 40, t.bgCard, 8);
        R.drawText('背包物品（' + items.length + '）', x + 8, y + 12, { fontSize: 13, color: t.textPrimary, bold: true });
        y += 48;
        if (items.length === 0) {
            R.drawText('背包空空如也，去商店购买吧！', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 26;
        } else {
            const counts = {};
            items.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
            Object.keys(counts).forEach(function (id) {
                const item = consumables.find(function (c) { return c.id === id; });
                if (!item) return;
                const count = counts[id];
                const lines = [];
                lines.push('🎒 ' + item.name + '  ×' + count);
                if (item.description) lines.push(stripHtml(item.description));
                const cardH = 20 + lines.length * 16 + 6;
                box(x, y, w, cardH, t.bgSecondary, 8);
                let iy = y + 10;
                lines.forEach(function (ln, i) {
                    R.drawText(ln, x + 10, iy, { fontSize: i === 0 ? 13 : 10, color: i === 0 ? t.textPrimary : t.textFaint, bold: i === 0, maxWidth: w - 90 });
                    iy += 16;
                });
                R.drawButton({
                    id: 'useItem_' + item.id, x: x + w - 74, y: y + cardH / 2 - 14, w: 66, h: 28,
                    text: '使用', fontSize: 12, bg: t.success, color: '#ffffff',
                    onTap: (function (iid) { return function () { try { game.useInventoryItem(iid); } catch (e) {} }; })(item.id)
                });
                y += cardH + 6;
            });
        }

        // 共生体背包
        const symbionts = game.permanent.symbionts || [];
        const equippedSym = game.permanent.equippedSymbionts || {};
        box(x, y, w, 40, t.bgCard, 8);
        R.drawText('共生体背包（' + symbionts.length + '）', x + 8, y + 12, { fontSize: 13, color: t.textPrimary, bold: true });
        y += 48;
        if (symbionts.length === 0) {
            R.drawText('共生体背包为空，击败敌人有几率获得共生体', x + 8, y + 10, { fontSize: 12, color: t.textFaint });
            y += 26;
        } else {
            symbionts.forEach(function (symId) {
                const tpl = game.getSymbiontTemplate ? game.getSymbiontTemplate(symId) : null;
                if (!tpl) return;
                const isEq = Object.values(equippedSym).indexOf(symId) >= 0;
                const qColor = t.quality[QUALITY_NAMES[tpl.quality || 1].toLowerCase()] || t.textSecondary;
                let statsText = '';
                if (tpl.stats) {
                    for (var k in tpl.stats) { if (tpl.stats[k]) statsText += (STAT_NAMES[k] || k) + '+' + tpl.stats[k] + ' '; }
                }
                const lines = [];
                lines.push('🦠 ' + tpl.name + ' [' + QUALITY_NAMES[tpl.quality || 1] + '·' + (game.symbiontSlotNames ? game.symbiontSlotNames[tpl.slot] : SLOT_NAMES[tpl.slot] || tpl.slot) + ']');
                if (tpl.desc) lines.push(stripHtml(tpl.desc));
                if (statsText) lines.push(statsText);
                const cardH = 20 + lines.length * 15 + 6;
                box(x, y, w, cardH, t.bgSecondary, 8);
                R.drawRect(x, y, 3, cardH, { fill: qColor, radius: 1.5 });
                let iy = y + 10;
                lines.forEach(function (ln, i) {
                    R.drawText(ln, x + 10, iy, { fontSize: i === 0 ? 12 : 10, color: i === 0 ? qColor : t.textFaint, bold: i === 0, maxWidth: w - 110 });
                    iy += 15;
                });
                if (isEq) {
                    R.drawButton({ id: 'symEq_' + symId, x: x + w - 74, y: y + 10, w: 66, h: 28, text: '已装备', fontSize: 11, bg: t.success, color: '#ffffff', onTap: function () {} });
                }
                y += cardH + 6;
            });
        }
        return y;
    }

    // ============ 主渲染 ============
    function draw() {
        refreshLayout();
        const game = g();
        if (!game || !game.player) return;
        const t = R.Theme.get();
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);

        R.drawText('👤 人物状态', PX + MAX_W / 2, 22, { fontSize: 20, color: t.textPrimary, align: 'center', bold: true });
        drawTabs(64);

        let y = 180;
        switch (game.characterTab || 'status') {
            case 'status': y = renderStatus(y); break;
            case 'equipment': y = renderEquipment(y); break;
            case 'talents': y = renderTalents(y); break;
            case 'skills': y = renderSkills(y); break;
            case 'inventory': y = renderInventory(y); break;
        }
        y += 20;

        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, y - R.SCREEN_H + 160); }
            });
        }
        R.ctx.restore();
    }

    R.ScreenManager.register('characterScreen', {
        render: draw,
        onShow: onShow
    });
})();
