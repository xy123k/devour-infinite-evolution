// ============================================================
//  render/screens/talentScreen.js — 阶段 3：天赋界面 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  设计：3 个标签（解锁/装备/预构筑）+ 资源区 + 已装备管理；
//        操作回调直调 game 原函数（DOM 详情弹窗由阶段 4 迁移）。
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
    const SYSTEM_NAMES = { 1: '血肉', 2: '机械', 3: '异能', 4: '精神', 5: '基因', 6: '共生', 7: '虚空', 8: '进化' };

    let _scrollY = 0;
    function onShow() { _scrollY = 0; }

    function drawTabs(y) {
        const game = g();
        const t = R.Theme.get();
        const tabs = [
            { k: 'unlock', label: '天赋解锁', ico: '🔓 ' }, { k: 'equip', label: '装备管理', ico: '⚡ ' }, { k: 'preset', label: '预构筑', ico: '✏️ ' }
        ];
        const x = PX + 12, w = MAX_W - 24;
        const tw = (w - 2 * 6) / 3;
        tabs.forEach(function (tab, i) {
            const selected = (game.talentPanelTab || 'unlock') === tab.k;
            R.drawButton({
                id: 'talentTab' + tab.k, x: x + i * (tw + 6), y: y, w: tw, h: 55,
                text: (tab.ico || '') + tab.label, fontSize: 14,
                bg: selected ? t.accent : t.bgCard,
                color: selected ? '#0a0e17' : t.textMuted,
                border: selected ? null : t.borderSoft,
                onTap: (function (k) { return function () { try { game.setTalentPanelTab(k); } catch (e) {} }; })(tab.k)
            });
        });
    }

    // 资源区
    function drawResources(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const equipped = game.player.equippedTalents || [];
        const passiveSlots = game.getPassiveSlots ? game.getPassiveSlots() : 0;
        const pa = game.getPassiveSlotAutoProgress ? game.getPassiveSlotAutoProgress() : { autoSlots: 0, maxAutoSlots: 2, totalSpent: 0, nextAutoSlot: 0, remainingToNext: 0, isMaxAuto: false };
        const pm = game.getPassiveSlotManualProgress ? game.getPassiveSlotManualProgress() : { manualSlots: 0, maxManualSlots: 1, cost: 0, essence: 0, canAfford: false, isMaxManual: false };
        const as = game.getActiveSlots ? game.getActiveSlots() : 3;
        const aa = game.getActiveSlotAutoProgress ? game.getActiveSlotAutoProgress() : { autoSlots: 0, maxAutoSlots: 2, level: 1, nextLevel: 25, remainingToNext: 24, isMaxAuto: false };
        const am = game.getActiveSlotManualProgress ? game.getActiveSlotManualProgress() : { manualSlots: 0, maxManualSlots: 1, cost: 0, essence: 0, canAfford: false, isMaxManual: false };
        // 资源区（DOM：bg-card y215-238 h23，☆天赋点）
        R.drawRect(x, y, w, 23, { fill: t.bgCard, radius: 8 });
        R.drawText('☆ 天赋点：' + (game.permanent.talentPoints || 0), x + 14, y + 17, { fontSize: 13, color: t.warning, bold: true });
        // 天赋槽（被动）扩充区（DOM：bg-secondary y239-368 h129, border-left 3px success）
        const y2 = y + 24;
        R.drawRect(x, y2, w, 129, { fill: t.bgSecondary, radius: 8 });
        R.drawRect(x, y2, 3, 129, { fill: t.success, radius: 1.5 });
        R.drawText('🛡\uFE0E', x + 8, y2 + 23, { fontSize: 13, color: t.success });
        R.drawText('天赋槽（被动）：' + equipped.length + '/' + passiveSlots, x + 21, y2 + 23, { fontSize: 13, color: t.success, bold: true });
        R.drawText('初始4 + 自动' + pa.autoSlots + ' + 手动' + pm.manualSlots, x + w - 6, y2 + 23, { fontSize: 11, color: t.textFaint, align: 'right' });
        if (pa.isMaxAuto) {
            R.drawText('自动扩充：已达上限（' + pa.autoSlots + '/' + pa.maxAutoSlots + '）', x + 8, y2 + 46, { fontSize: 11, color: t.success });
        } else {
            R.drawText('自动扩充：已花天赋点' + pa.totalSpent + ' / ' + pa.nextAutoSlot + '（再花' + pa.remainingToNext + '点+1槽，上限' + pa.maxAutoSlots + '）', x + 8, y2 + 46, { fontSize: 11, color: t.textMuted, maxWidth: w - 22 });
        }
        if (pm.isMaxManual) {
            R.drawRect(x, y2 + 66, w, 44, { fill: t.bgPrimary, radius: 4 });
            R.drawText('手动扩充已达上限（' + pm.manualSlots + '/' + pm.maxManualSlots + '）', x + w / 2, y2 + 88, { fontSize: 12, color: t.textFaint, align: 'center' });
        } else {
            R.drawButton({
                id: 'expandPassiveSlot', x: x, y: y2 + 66, w: w, h: 44,
                text: '＋ 手动扩充（消耗' + pm.cost + '精粹，当前' + pm.essence + '）', fontSize: 12,
                bg: pm.canAfford ? t.success : t.textFaint, color: '#ffffff', bold: true,
                onTap: function () { try { game.expandPassiveSlot(); game.openTalentPanel(); } catch (e) {} }
            });
        }
        // 技能槽（主动）区（DOM：bg-secondary y410-515 h105, border-left 3px info）
        const y3 = y2 + 129 + 42;
        R.drawRect(x, y3, w, 105, { fill: t.bgSecondary, radius: 8 });
        R.drawRect(x, y3, 3, 105, { fill: t.info, radius: 1.5 });
        R.drawText('⚡\uFE0E', x + 8, y3 - 5, { fontSize: 13, color: t.info });
        R.drawText('技能槽（主动）：' + as + '/6（可扩充）', x + 21, y3 - 5, { fontSize: 13, color: t.info, bold: true });
        R.drawText('初始3 + 自动' + aa.autoSlots + ' + 手动' + am.manualSlots, x + w - 6, y3 - 5, { fontSize: 11, color: t.textFaint, align: 'right' });
        if (aa.isMaxAuto) {
            R.drawText('自动扩充：已达上限（' + aa.autoSlots + '/' + aa.maxAutoSlots + '）', x + 8, y3 + 20, { fontSize: 11, color: t.success });
        } else {
            R.drawText('自动扩充：当前等级' + aa.level + ' / ' + aa.nextLevel + '（再升' + aa.remainingToNext + '级+1槽，上限' + aa.maxAutoSlots + '）', x + 8, y3 + 20, { fontSize: 11, color: t.textMuted, maxWidth: w - 22 });
        }
        R.drawText('默认3个基础技能不占槽，始终可用', x + 8, y3 + 25, { fontSize: 11, color: t.warning });
        if (am.isMaxManual) {
            R.drawRect(x, y3 + 46, w, 40, { fill: t.bgPrimary, radius: 4 });
            R.drawText('手动扩充已达上限（' + am.manualSlots + '/' + am.maxManualSlots + '）', x + w / 2, y3 + 62, { fontSize: 12, color: t.textFaint, align: 'center' });
        } else {
            R.drawButton({
                id: 'expandActiveSlot', x: x, y: y3 + 46, w: w, h: 40,
                text: '＋ 手动扩充（消耗' + am.cost + '精粹，当前' + am.essence + '）', fontSize: 12,
                bg: am.canAfford ? t.info : t.textFaint, color: '#ffffff', bold: true,
                onTap: function () { try { game.expandActiveSlot(); game.openTalentPanel(); } catch (e) {} }
            });
        }
        return y3 + 105 + 10;
    }

    // 已装备快速管理（DOM：bg-secondary y525-608 h83, border-left 3px success）
    function drawEquipped(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const equipped = game.player.equippedTalents || [];
        const all = game.data.talents ? game.data.talents.talents : [];
        const passiveSlots = game.getPassiveSlots ? game.getPassiveSlots() : 0;
        R.drawRect(x, y, w, 93, { fill: t.bgSecondary, radius: 8 });
        R.drawRect(x, y, 3, 93, { fill: t.success, radius: 1.5 });
        R.drawText('已装备天赋（' + equipped.length + '/' + passiveSlots + '）', x + 14, y + 28, { fontSize: 13, color: t.success, bold: true });
        R.drawText('点击天赋卡片上的"装备/卸下"按钮可快速更换', x + w - 14, y + 28, { fontSize: 11, color: t.textFaint, align: 'right', maxWidth: w - 230 });
        if (equipped.length === 0) {
            R.drawText('还没有装备任何天赋，在下方列表中点击"装备"按钮即可', x + w / 2, y + 62, { fontSize: 12, color: t.textFaint, align: 'center' });
        } else {
            let cx = x + 2, cy = y + 52;
            equipped.forEach(function (tid) {
                const tpl = all.find(function (tt) { return tt.id === tid; });
                if (!tpl) return;
                const lv = game.getTalentLevel ? game.getTalentLevel(tid) : 1;
                const qc = game.qualityColors ? (game.qualityColors[tpl.quality] || t.textSecondary) : t.textSecondary;
                const name = tpl.name || '';
                const nameW = R.ctx.measureText ? R.ctx.measureText(name).width : name.length * 12;
                const lvW = R.ctx.measureText ? R.ctx.measureText(lv + '级').width : 24;
                const chipW = nameW + lvW + 10 + 6 + 40 + 20;
                R.drawRect(cx, cy, chipW, 31, { fill: t.bgPrimary, radius: 6, border: qc, borderW: 1 });
                R.drawText(name, cx + 10, cy + 20, { fontSize: 12, color: qc, bold: true });
                R.drawText(lv + '级', cx + 10 + nameW + 6, cy + 20, { fontSize: 10, color: t.warning });
                R.drawButton({ id: 'eqTalent_' + tid, x: cx + chipW - 46, y: cy + 7, w: 40, h: 21, text: '卸下', fontSize: 10, bg: t.danger, color: '#ffffff', onTap: (function (ttid) { return function () { try { game.unequipTalentAndRefresh(ttid); } catch (e) {} }; })(tid) });
                cx += chipW + 8;
                if (cx > x + w - 60) { cx = x + 14; cy += 40; }
            });
        }
        return y + 93 + 12;
    }

    // 天赋卡
    function drawTalentCard(game, tl, th, y, mode) {
        const unlocked = (game.permanent.unlockedTalents || []).indexOf(tl.id) >= 0;
        const equipped = (game.player.equippedTalents || []).indexOf(tl.id) >= 0;
        const lv = game.getTalentLevel ? game.getTalentLevel(tl.id) : 1;
        const maxLv = tl.maxLevel || 5;
        const qc = game.qualityColors ? (game.qualityColors[tl.quality] || th.textSecondary) : th.textSecondary;
        let effText = '';
        if (unlocked) {
            const eff = game.getTalentEffect ? game.getTalentEffect(tl.id) : null;
            effText = eff ? eff.passive : '';
        } else if (tl.effects && tl.effects.length > 0) {
            effText = tl.effects[0].passive || '';
        }
        effText = stripHtml(effText);

        const x = PX + 12, w = MAX_W - 24;
        const title = '[' + QNAMES[tl.quality || 1] + '] ' + tl.name + (unlocked ? ('  ' + lv + '/' + maxLv + '级') : '') + (equipped ? '  [已装备]' : '');
        const lines = R.wrapText(effText || '（无效果描述）', w - 24, 11, false).slice(0, 2);
        const cardH = 58 + lines.length * 14;
        box(x, y, w, cardH, th.bgSecondary, 8);
        R.drawRect(x, y, 3, cardH, { fill: qc, radius: 1.5 });
        R.drawText(title, x + 10, y + 12, { fontSize: 13, color: th.textPrimary, bold: true, maxWidth: w - 120 });
        let iy = y + 32;
        lines.forEach(function (ln) {
            R.drawText(ln, x + 10, iy, { fontSize: 11, color: th.textFaint, maxWidth: w - 24 });
            iy += 14;
        });
        // 操作按钮
        let btnText = '', btnBg = null, disabled = false, onTap = null;
        if (mode === 'unlock') {
            if (!unlocked) {
                const cost = tl.unlockCost || { fragQuality: tl.quality, fragCount: 10 };
                const tag = (tl.tags && tl.tags.length > 0) ? tl.tags[0] : 1;
                const frag = game.getTagFragmentCount ? game.getTagFragmentCount(tag, cost.fragQuality) : 0;
                btnText = '解锁（' + cost.fragCount + '碎片）';
                btnBg = th.purple;
                disabled = frag < cost.fragCount;
                onTap = function () { try { game.unlockTalentAndRefresh(tl.id); } catch (e) {} };
            } else if (lv < maxLv) {
                const levelCosts = tl.levelCost || [2, 4, 7, 11, 16];
                const pointCost = levelCosts[lv - 1] || 2;
                btnText = '升级至' + (lv + 1) + '级（' + pointCost + '点+' + pointCost + '碎片）';
                btnBg = th.success;
                const tag = (tl.tags && tl.tags.length > 0) ? tl.tags[0] : 1;
                const frag = game.getTagFragmentCount ? game.getTagFragmentCount(tag, tl.quality) : 0;
                disabled = (game.permanent.talentPoints || 0) < pointCost || frag < pointCost;
                onTap = function () { try { game.upgradeTalentAndRefresh(tl.id); } catch (e) {} };
            } else {
                btnText = '已满级';
                disabled = true;
            }
        } else if (mode === 'equip') {
            if (equipped) {
                btnText = '卸下';
                btnBg = th.danger;
                onTap = function () { try { game.unequipTalentAndRefresh(tl.id); } catch (e) {} };
            } else if (unlocked) {
                btnText = '装备';
                btnBg = th.success;
                onTap = function () { try { game.equipTalentAndRefresh(tl.id); } catch (e) {} };
            } else {
                btnText = '未解锁';
                disabled = true;
            }
        }
        if (btnText) {
            R.drawButton({
                id: 'talentOp_' + tl.id + '_' + mode, x: x + w - 118, y: y + cardH / 2 - 15, w: 108, h: 30,
                text: btnText, fontSize: 11, bg: disabled ? th.textFaint : btnBg, color: '#ffffff',
                disabled: disabled, onTap: onTap
            });
        }
        return cardH + 6;
    }

    // 天赋列表
    function renderList(y, mode) {
        const game = g();
        const t = R.Theme.get();
        const all = game.data.talents ? game.data.talents.talents : [];
        if (!all.length) { R.drawText('暂无天赋数据', PX + 14, y + 10, { fontSize: 12, color: t.textFaint }); return y + 26; }
        const sorted = all.slice().sort(function (a, b) { return (a.quality || 1) - (b.quality || 1); });
        sorted.forEach(function (tt) {
            y += drawTalentCard(game, tt, t, y, mode);
        });
        return y;
    }

    // 预构筑
    function renderPreset(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const all = (game.data && game.data.talents && game.data.talents.talents) || [];
        const presets = game.permanent.presetTalents || [];
        // 标题行 + 新建按钮（DOM renderPresetList：预构筑 / ＋ 新建预构筑）
        R.drawText('预构筑', x, y, { fontSize: 14, color: t.warning, bold: true });
        R.drawButton({
            id: 'talentNewPreset', x: x + w - 110, y: y - 4, w: 110, h: 30,
            text: '＋ 新建预构筑', fontSize: 13, bg: t.success, color: '#ffffff',
            onTap: function () { try { game.startPresetEdit(-1); } catch (e) {} }
        });
        y += 36;
        // 说明框（DOM：轮回开始时将自动装备【默认】预构筑的天赋...）
        const hint = '轮回开始时将自动装备【默认】预构筑的天赋（未标记默认则用第一套）。预构筑数量不限，可自由命名。';
        R.drawRect(x, y, w, 36, { fill: t.bgSecondary, radius: 6 });
        R.drawText(hint, x + 8, y + 9, { fontSize: 11, color: t.textMuted, maxWidth: w - 16, lineHeight: 16 });
        y += 44;
        if (!presets.length) {
            R.drawText('还没有预构筑', x + w / 2, y + 30, { fontSize: 13, color: t.textFaint, align: 'center' });
            R.drawText('点击右上角「新建预构筑」开始规划你的开局天赋', x + w / 2, y + 54, { fontSize: 12, color: t.textFaint, align: 'center' });
            y += 80;
        } else {
            presets.forEach(function (pr, i) {
                if (!pr) return;
                const names = (pr.talents || []).map(function (id) {
                    const tt = all.find(function (x2) { return x2.id === id; });
                    return tt ? tt.name : '未知天赋';
                });
                const isDefault = !!pr.isDefault;
                const cardH = 34 + (names.length ? 30 : 6);
                box(x, y, w, cardH, t.bgCard, 8);
                R.drawRect(x, y, w, cardH, { stroke: isDefault ? t.warning : t.border, lineWidth: 1, radius: 8 });
                // 名称行
                R.drawText((isDefault ? '★ ' : '') + (pr.name || '未命名') + ' (' + (pr.talents || []).length + '个天赋)',
                    x + 8, y + 8, { fontSize: 14, color: isDefault ? t.warning : t.textPrimary, bold: true, maxWidth: w - 220 });
                // 操作按钮（设为默认 / 编辑 / 删除）
                let bx = x + w - 8;
                const mkBtn = function (label, color, bg, onTap, bw) {
                    bx -= bw;
                    R.drawButton({
                        id: 'presetAct_' + i + '_' + label, x: bx, y: y + 6, w: bw, h: 24,
                        text: label, fontSize: 11, bg: bg, color: color,
                        onTap: onTap
                    });
                };
                mkBtn('删除', '#ffffff', t.danger, function () { try { game.deletePreset(i); } catch (e) {} }, 44);
                mkBtn('编辑', t.textPrimary, t.bgSecondary, function () { try { game.startPresetEdit(i); } catch (e) {} }, 44);
                if (!isDefault) mkBtn('设为默认', t.textPrimary, t.bgSecondary, function () { try { game.setDefaultPreset(i); } catch (e) {} }, 64);
                else R.drawText('默认', x + w - 68, y + 11, { fontSize: 11, color: t.warning });
                // 天赋标签（DOM flex-wrap chips）
                if (names.length) {
                    let cx = x + 8, cy = y + 30;
                    names.forEach(function (nm) {
                        const cw = R.measureText(nm, 10, false) + 12;
                        if (cx + cw > x + w - 8) { cx = x + 8; cy += 18; }
                        R.drawRect(cx, cy, cw, 16, { fill: t.bgSecondary, radius: 3 });
                        R.drawText(nm, cx + 6, cy + 1, { fontSize: 10, color: t.textSecondary, maxWidth: cw - 4 });
                        cx += cw + 4;
                    });
                }
                y += cardH + 8;
            });
        }
        return y;
    }

    // 预构筑编辑器（Canvas：以弹窗承载 game.renderPresetEditor() 的 HTML，
    // 复用 html.js 的 DOM input 桥接 / flex 布局 / 滚动 / onclick 委托）
    function openPresetEditorOnce() {
        const game = g();
        if (!game) return;
        const editing = (game.presetEditing !== null && game.presetEditing !== undefined);
        if (editing && !window.__presetEditorOpen) {
            try {
                if (typeof R.Popup !== 'undefined' && R.Popup.show) {
                    R.Popup.show(game.renderPresetEditor());
                    window.__presetEditorOpen = true;
                }
            } catch (e) { if (typeof console !== 'undefined') console.error('preset editor open error', e); }
        }
        if (window.__presetEditorOpen && !editing) {
            if (typeof R.Popup !== 'undefined' && R.Popup.isVisible && R.Popup.isVisible()) {
                try { R.Popup.close(); } catch (e) {}
            }
            window.__presetEditorOpen = false;
        }
    }

    function draw() {
        refreshLayout();
        const game = g();
        if (!game || !game.player) return;
        const t = R.Theme.get();
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);

        // DOM 静态骨架：h2 标题（居中 22px, 屏幕 y29-59）
        R.drawText('✳', PX + MAX_W / 2 - 110, 32, { fontSize: 22, color: t.accent });
        R.drawText('天赋系统', PX + MAX_W / 2 - 88, 32, { fontSize: 22, color: t.accent });
        // DOM openTalentPanel header：h3 标题（左）+ ← 返回（右，accent-success 绿钮, 屏幕 y106-137 x284-380）
        R.drawText('🧬 天赋系统', PX + 30, 105, { fontSize: 17, color: t.textPrimary, bold: true });
        R.drawButton({ id: 'talentBack', x: PX + MAX_W - 96, y: 80, w: 96, h: 45, text: '← 返回', fontSize: 13, bg: t.success, color: '#ffffff', onTap: function () { try { game.merchantMode ? game.leaveMerchant() : game.goBack(); } catch (e) {} } });
        drawTabs(141);
        let y = drawResources(215);
        y = drawEquipped(y);
        y = drawFragments(y);
        const tab = game.talentPanelTab || 'unlock';
        if (tab === 'unlock') y = renderList(y, 'unlock');
        else if (tab === 'equip') y = renderList(y, 'equip');
        else y = renderPreset(y);
        y += 20;
        // 预构筑编辑器（弹窗承载）
        openPresetEditorOnce();

        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, y - R.SCREEN_H + 160); }
            });
        }
        R.ctx.restore();
    }

    // 当前碎片区（DOM：y636 起，透明底）
    function drawFragments(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        R.drawText('🔷 当前碎片（点击品质查看体系详情）', x, y + 4, { fontSize: 11, color: t.textMuted });
        let exclusive = {};
        if (game.permanent && game.permanent.tagFragments) {
            for (let tag in game.permanent.tagFragments) {
                for (let q = 1; q <= 5; q++) {
                    exclusive[q] = (exclusive[q] || 0) + (game.permanent.tagFragments[tag][q] || 0);
                }
            }
        }
        let cx = x;
        for (let q = 1; q <= 5; q++) {
            const qc = game.qualityColors ? (game.qualityColors[q] || t.textSecondary) : t.textSecondary;
            const qn = game.qualityNames ? game.qualityNames[q] : ('Q' + q);
            const txt = qn + '：' + (exclusive[q] || 0);
            R.drawText(txt, cx, y + 62, { fontSize: 12, color: qc });
            cx += (R.ctx.measureText ? R.ctx.measureText(txt).width : txt.length * 12) + 12;
        }
        R.drawText('万能碎片：', x, y + 88, { fontSize: 11, color: t.info });
        cx = x + (R.ctx.measureText ? R.ctx.measureText('万能碎片：').width : 60);
        const uni = (game.permanent && game.permanent.universalFragments) || {};
        for (let q = 1; q <= 5; q++) {
            const qc = game.qualityColors ? (game.qualityColors[q] || t.textSecondary) : t.textSecondary;
            const qn = game.qualityNames ? game.qualityNames[q] : ('Q' + q);
            const txt = qn + '：' + (uni[q] || 0);
            R.drawText(txt, cx, y + 88, { fontSize: 11, color: qc });
            cx += (R.ctx.measureText ? R.ctx.measureText(txt).width : txt.length * 12) + 8;
        }
        R.drawText('鼠标悬浮在品质上查看各体系专属碎片数量；专属碎片只能用于对应体系', x - 2, y + 114, { fontSize: 11, color: t.textFaint });
        return y + 114;
    }

    R.ScreenManager.register('talentScreen', {
        render: draw,
        onShow: onShow
    });
})();
