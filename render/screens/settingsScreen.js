// ============================================================
//  render/screens/settingsScreen.js — 阶段 3：设置界面 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  设计：渲染器每帧读 game.settings 绘制按钮与高亮；
//        点击回调直调 game.toggleXxx/setXxx（原逻辑不变）。
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

    // 两态按钮（选中高亮）
    function toggleBtn(opt) {
        const selected = !!opt.selected;
        R.drawButton({
            id: opt.id, x: opt.x, y: opt.y, w: opt.w, h: opt.h,
            text: opt.text, fontSize: opt.fontSize || 13,
            bg: selected ? opt.t.success : opt.t.bgHover,
            color: selected ? '#0a0e17' : opt.t.textSecondary,
            border: selected ? null : opt.t.borderSoft,
            onTap: opt.onTap
        });
    }

    // 小节标题
    function sectionTitle(y, text) {
        const t = R.Theme.get();
        R.drawText(text, PX + 14, y, { fontSize: 15, color: t.textPrimary, bold: true });
        return y + 26;
    }

    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.settings) return;
        const t = R.Theme.get();
        const s = game.settings;
        const x = PX + 14, w = MAX_W - 28;

        // 标题
        R.drawText('⚙ 游戏设置', PX + MAX_W / 2, 24, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        R.drawButton({ id: 'setBack', x: PX + 12, y: 10, w: 74, h: 28, text: '← 返回', fontSize: 12, bg: t.bgCard, color: t.textSecondary, border: t.borderSoft, onTap: function () { try { game.goBack(); } catch (e) {} } });
        let y = 52;

        // ---- 游戏玩法 ----
        y = sectionTitle(y, '游戏玩法');
        box(x, y, w, 150, t.bgCard, 10);
        let iy = y + 10;
        R.drawText('事件结果显示', x + 8, iy + 8, { fontSize: 13, color: t.textMuted });
        iy += 26;
        const hw = (w - 30) / 2;
        toggleBtn({ id: 'setEventDetail', t: t, x: x + 8, y: iy, w: hw, h: 34, text: '显示具体数值', selected: s.eventDetail, onTap: function () { try { game.toggleEventDetail(true); } catch (e) {} } });
        toggleBtn({ id: 'setEventHide', t: t, x: x + 16 + hw, y: iy, w: hw, h: 34, text: '隐藏数值', selected: !s.eventDetail, onTap: function () { try { game.toggleEventDetail(false); } catch (e) {} } });
        iy += 44;
        R.drawText('战斗速度', x + 8, iy + 8, { fontSize: 13, color: t.textMuted });
        iy += 26;
        const sw = (w - 30 - 16) / 3;
        const speeds = [
            { k: 'slow', label: '慢速 0.5x' }, { k: 'normal', label: '正常 1.0x' }, { k: 'fast', label: '快速 2.0x' }
        ];
        speeds.forEach(function (sp, i) {
            toggleBtn({ id: 'setSpeed_' + sp.k, t: t, x: x + 8 + i * (sw + 8), y: iy, w: sw, h: 34, text: sp.label, fontSize: 12, selected: s.battleSpeed === sp.k, onTap: (function (k) { return function () { try { game.setBattleSpeed(k); } catch (e) {} }; })(sp.k) });
        });
        iy += 44;
        R.drawText('自动跳过战斗动画', x + 8, iy + 8, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setAutoSkip', t: t, x: x + w - 70, y: iy, w: 62, h: 30, text: s.autoSkip ? '开启' : '关闭', selected: s.autoSkip, onTap: function () { try { game.toggleAutoSkip(); } catch (e) {} } });
        y += 150 + 10;

        // ---- 音频 ----
        y = sectionTitle(y, '音频设置');
        box(x, y, w, 78, t.bgCard, 10);
        R.drawText('音效', x + 8, y + 22, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setSfx', t: t, x: x + w - 70, y: y + 12, w: 62, h: 30, text: s.sfx ? '开启' : '关闭', selected: s.sfx, onTap: function () { try { game.toggleSfx(); } catch (e) {} } });
        R.drawText('背景音乐功能即将上线', x + 8, y + 62, { fontSize: 11, color: t.textFaint });
        y += 88;

        // ---- 显示设置 ----
        y = sectionTitle(y, '显示设置');
        box(x, y, w, 188, t.bgCard, 10);
        iy = y + 12;
        R.drawText('显示伤害数字', x + 8, iy + 8, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setDamageNums', t: t, x: x + w - 70, y: iy, w: 62, h: 30, text: s.damageNumbers ? '开启' : '关闭', selected: s.damageNumbers, onTap: function () { try { game.toggleDamageNumbers(); } catch (e) {} } });
        iy += 40;
        R.drawText('简化战斗日志', x + 8, iy + 8, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setSimpleLog', t: t, x: x + w - 70, y: iy, w: 62, h: 30, text: s.simpleLog ? '开启' : '关闭', selected: s.simpleLog, onTap: function () { try { game.toggleSimpleLog(); } catch (e) {} } });
        iy += 40;
        R.drawRect(x + 8, iy, w - 16, 1, { fill: t.borderSoft });
        iy += 12;
        R.drawText('界面主题', x + 8, iy + 8, { fontSize: 13, color: t.textMuted });
        iy += 28;
        const tw = (w - 30 - 16) / 3;
        const themes = [
            { k: 'dark', label: '🌙 深色' }, { k: 'warm', label: '📖 复古' }, { k: 'light', label: '☀ 清爽' }
        ];
        themes.forEach(function (th, i) {
            toggleBtn({ id: 'setTheme_' + th.k, t: t, x: x + 8 + i * (tw + 8), y: iy, w: tw, h: 34, text: th.label, fontSize: 12, selected: (game._canvasTheme || 'dark') === th.k, onTap: (function (k) { return function () { try { game.setTheme(k); } catch (e) {} }; })(th.k) });
        });
        R.drawText('切换即时生效，主题选择会自动保存', x + 8, iy + 46, { fontSize: 11, color: t.textFaint });
        y += 198;

        // ---- 数据管理 ----
        y = sectionTitle(y, '数据管理');
        box(x, y, w, 110, t.bgCard, 10);
        const bw = (w - 30 - 12) / 2;
        const btns = [
            { id: 'setRedeem', text: '兑换码', bg: t.purple, onTap: function () { try { game.openRedeemPanel(); } catch (e) {} } },
            { id: 'setExport', text: '导出存档', bg: t.info, onTap: function () { try { game.exportSave(); } catch (e) {} } },
            { id: 'setImport', text: '导入存档', bg: t.success, onTap: function () { try { game.importSave(); } catch (e) {} } },
            { id: 'setClear', text: '清除存档', bg: t.danger, onTap: function () { try { game.clearSave(); } catch (e) {} } }
        ];
        btns.forEach(function (b, i) {
            const bx = x + 8 + (i % 2) * (bw + 8);
            const by = y + 12 + Math.floor(i / 2) * 44;
            R.drawButton({ id: b.id, x: bx, y: by, w: bw, h: 36, text: b.text, fontSize: 13, bg: b.bg, color: '#ffffff', onTap: b.onTap });
        });
        R.drawText('导出存档会复制存档代码到剪贴板，导入存档需要粘贴存档代码', x + 8, y + 98, { fontSize: 10, color: t.textFaint, maxWidth: w - 16 });
        y += 120;

        // ---- 关于游戏 ----
        y = sectionTitle(y, '关于游戏');
        box(x, y, w, 130, t.bgCard, 10);
        iy = y + 12;
        const abouts = [
            ['游戏名称：', '无限吞噬进化'],
            ['游戏类型：', '单机文字冒险RPG'],
            ['核心玩法：', '吞噬→获取基因→解锁天赋→无限变强→轮回再战'],
            ['版本号：', 'v0.4.0'],
            ['目标平台：', 'TapTap']
        ];
        abouts.forEach(function (a) {
            R.drawText(a[0], x + 8, iy, { fontSize: 12, color: t.accent, bold: true });
            R.drawText(a[1], x + 96, iy, { fontSize: 12, color: t.textSecondary, maxWidth: w - 110 });
            iy += 22;
        });
        y += 140;

        // 页面滚动
        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, y - R.SCREEN_H + 160); }
            });
        }
    }

    let _scrollY = 0;
    function onShow() { _scrollY = 0; }

    function draw() {
        refreshLayout();
        const game = g();
        if (!game || !game.settings) return;
        R.ctx.save();
        R.ctx.translate(0, -_scrollY);
        if (window.Input && Input.setScrollOffset) Input.setScrollOffset(_scrollY);
        render();
        R.ctx.restore();
    }

    R.ScreenManager.register('settingsScreen', {
        render: draw,
        onShow: onShow
    });
})();
