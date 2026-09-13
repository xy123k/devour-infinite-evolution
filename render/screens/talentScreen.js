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
            { k: 'unlock', label: '天赋解锁' }, { k: 'equip', label: '装备管理' }, { k: 'preset', label: '预构筑' }
        ];
        const x = PX + 12, w = MAX_W - 24;
        const tw = (w - 2 * 6) / 3;
        tabs.forEach(function (tab, i) {
            const selected = (game.talentPanelTab || 'unlock') === tab.k;
            R.drawButton({
                id: 'talentTab' + tab.k, x: x + i * (tw + 6), y: y, w: tw, h: 34,
                text: tab.label, fontSize: 13,
                bg: selected ? t.accent : t.bgCard,
                color: selected ? '#0a0e17' : t.textSecondary,
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
        box(x, y, w, 40, t.bgCard, 8);
        R.drawText('⭐ 天赋点：' + (game.permanent.talentPoints || 0), x + 8, y + 12, { fontSize: 12, color: t.warning, bold: true });
        R.drawText('🔮 天赋槽：' + equipped.length + '/' + (game.getPassiveSlots ? game.getPassiveSlots() : 0), x + 8, y + 28, { fontSize: 11, color: t.success });
        R.drawText('⚡ 技能槽：' + (game.getActiveSlots ? game.getActiveSlots() : 3) + '/6', x + MAX_W / 2, y + 28, { fontSize: 11, color: t.info, align: 'center' });
        y += 46;
        // 碎片管理按钮
        R.drawButton({
            id: 'talentFragmentMgr', x: x, y: y, w: w, h: 32,
            text: '🧩 碎片管理（标签专属碎片合成/兑换）', fontSize: 12, bg: t.info, color: '#ffffff',
            onTap: function () { try { game.openFragmentManager(); } catch (e) {} }
        });
        return y + 40;
    }

    // 已装备快速管理
    function drawEquipped(y) {
        const game = g();
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;
        const equipped = game.player.equippedTalents || [];
        const all = game.data.talents ? game.data.talents.talents : [];
        box(x, y, w, 34, t.bgSecondary, 8);
        R.drawRect(x, y, 3, 34, { fill: t.success, radius: 1.5 });
        R.drawText('已装备天赋（' + equipped.length + '）', x + 10, y + 12, { fontSize: 12, color: t.success, bold: true });
        y += 40;
        if (equipped.length === 0) {
            R.drawText('还没有装备任何天赋，在下方列表中点击"装备"按钮即可', x + 8, y + 8, { fontSize: 11, color: t.textFaint });
            y += 22;
        } else {
            let cx = x + 8;
            equipped.forEach(function (tid) {
                const tpl = all.find(function (tt) { return tt.id === tid; });
                if (!tpl) return;
                const lv = game.getTalentLevel ? game.getTalentLevel(tid) : 1;
                const label = tpl.name + ' ' + lv + '级 ✕';
                const labelW = Math.min(150, R.ctx.measureText ? R.ctx.measureText(label).width + 18 : label.length * 13);
                R.drawButton({
                    id: 'eqTalent_' + tid, x: cx, y: y, w: labelW, h: 26,
                    text: label, fontSize: 11, bg: t.bgCard, color: t.textPrimary,
                    border: t.borderSoft,
                    onTap: (function (ttid) { return function () { try { game.unequipTalentAndRefresh(ttid); } catch (e) {} }; })(tid)
                });
                cx += labelW + 6;
                if (cx > x + w - 80) { cx = x + 8; y += 32; }
            });
            y += 34;
        }
        return y;
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
        const presets = game.permanent.presetDrafts || [];
        if (!presets.length) {
            box(x, y, w, 44, t.bgCard, 8);
            R.drawText('暂无预构筑方案', x + 8, y + 16, { fontSize: 12, color: t.textFaint });
            y += 52;
        } else {
            presets.forEach(function (pr) {
                box(x, y, w, 46, t.bgCard, 8);
                R.drawText('📐 ' + (pr.name || '未命名方案'), x + 8, y + 12, { fontSize: 13, color: t.warning, bold: true });
                R.drawText((pr.talents ? pr.talents.length : 0) + '个天赋', x + 8, y + 30, { fontSize: 11, color: t.textMuted });
                y += 54;
            });
        }
        R.drawButton({
            id: 'talentNewPreset', x: x, y: y, w: w, h: 38,
            text: '＋ 新建预构筑方案', fontSize: 13, bg: t.accent, color: '#0a0e17',
            onTap: function () { try { game.openPresetBuilder(); } catch (e) {} }
        });
        return y + 46;
    }

    function draw() {
        refreshLayout();
        const game = g();
        if (!game || !game.player) return;
        const t = R.Theme.get();
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);

        R.drawText('🧬 天赋系统', PX + MAX_W / 2, 24, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        R.drawButton({ id: 'talentBack', x: PX + 12, y: 10, w: 74, h: 28, text: '← 返回', fontSize: 12, bg: t.bgCard, color: t.textSecondary, border: t.borderSoft, onTap: function () { try { game.merchantMode ? game.leaveMerchant() : game.goBack(); } catch (e) {} } });
        drawTabs(52);
        let y = 96;
        y = drawResources(y);
        y = drawEquipped(y);
        const tab = game.talentPanelTab || 'unlock';
        if (tab === 'unlock') y = renderList(y, 'unlock');
        else if (tab === 'equip') y = renderList(y, 'equip');
        else y = renderPreset(y);
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

    R.ScreenManager.register('talentScreen', {
        render: draw,
        onShow: onShow
    });
})();
