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
            bg: selected ? opt.t.success : opt.t.accentDark,
            color: '#e8f0f0',
            border: opt.t.borderAccent,
            onTap: opt.onTap
        });
    }

    // 小节标题
    function sectionTitle(y, text) {
        const t = R.Theme.get();
        R.drawText(text, PX + 14, y, { fontSize: 15, color: t.accent, bold: true });
        return y + 26;
    }

    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.settings) return;
        const t = R.Theme.get();
        const s = game.settings;
        const x = PX + 14, w = MAX_W - 28;

        // 标题（DOM 实测：h2 居中基线 52，20px，无返回按钮）
        R.drawText('⚙ 游戏设置', PX + MAX_W / 2 - 8, 52, { fontSize: 20, color: t.textPrimary, align: 'center', bold: true });
        // DOM 设置页实测：玩法区 box y103 h326；内容绝对坐标对齐 DOM
        let y = 103;

        // ---- 游戏玩法 ----（DOM 实测：h3@126；事件label@196 按钮行1@221 h44；速度label@311 按钮行2@336 h54；autoSkip@426 开关@416）
        y = sectionTitle(y, '游戏玩法');
        box(x, y, w, 326, t.bgCard, 10);
        let iy = y;
        R.drawText('事件结果显示', x + 8, 163, { fontSize: 14, color: t.textMuted });
        const hw = (w - 8 - 8 - 16) / 2;
        toggleBtn({ id: 'setEventDetail', t: t, x: x + 8, y: 172, w: hw, h: 36, text: '显示具体数值', selected: s.eventDetail, onTap: function () { try { game.toggleEventDetail(true); } catch (e) {} } });
        toggleBtn({ id: 'setEventHide', t: t, x: x + 16 + hw, y: 172, w: hw, h: 36, text: '隐藏数值（模糊描述）', selected: !s.eventDetail, onTap: function () { try { game.toggleEventDetail(false); } catch (e) {} } });
        R.drawText('战斗速度', x + 8, 254, { fontSize: 14, color: t.textMuted });
        const sw = (w - 16 - 32) / 3;
        const speeds = [
            { k: 'slow', label: '慢速 0.5x速度' }, { k: 'normal', label: '正常 1.0x速度' }, { k: 'fast', label: '快速 2.0x速度' }
        ];
        speeds.forEach(function (sp, i) {
            toggleBtn({ id: 'setSpeed_' + sp.k, t: t, x: x + 8 + i * (sw + 16), y: 265, w: sw, h: 42, text: sp.label, fontSize: 12, selected: s.battleSpeed === sp.k, onTap: (function (k) { return function () { try { game.setBattleSpeed(k); } catch (e) {} }; })(sp.k) });
        });
        R.drawText('自动跳过战斗动画', x + 8, 355, { fontSize: 14, color: t.textMuted });
        toggleBtn({ id: 'setAutoSkip', t: t, x: x + w - 60 - 17, y: 346, w: 60, h: 32, text: s.autoSkip ? '开启' : '关闭', selected: s.autoSkip, onTap: function () { try { game.toggleAutoSkip(); } catch (e) {} } });
        y += 326 + 16;

// ---- 音频 ----
        y = 458;
        y = sectionTitle(y, '音频设置');
        box(x, y, w, 90, t.bgCard, 10);
        R.drawText('音效', x + 8, 500, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setSfx', t: t, x: x + w - 70, y: 491, w: 62, h: 32, text: (s.sfx !== false) ? '开启' : '关闭', selected: s.sfx !== false, onTap: function () { try { game.toggleSfx(); } catch (e) {} } });
        R.drawText('背景音乐功能即将上线', x + 8, 544, { fontSize: 11, color: t.textFaint });
        y += 100;

        // ---- 显示设置 ----（DOM 实测：h3@742 box@768；伤害label@812 开关@792；简化label@872 开关@852；主题label@932 按钮@948）
        y = 640;
        y = sectionTitle(y, '显示设置');
        box(x, y, w, 210, t.bgCard, 10);
        iy = 660;
        R.drawText('显示伤害数字', x + 8, 681, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setDamageNums', t: t, x: x + w - 70, y: 672, w: 62, h: 32, text: (s.damageNumbers !== false) ? '开启' : '关闭', selected: s.damageNumbers !== false, onTap: function () { try { game.toggleDamageNumbers(); } catch (e) {} } });
        iy += 40;
        R.drawText('简化战斗日志', x + 8, 726, { fontSize: 13, color: t.textMuted });
        toggleBtn({ id: 'setSimpleLog', t: t, x: x + w - 70, y: 726, w: 62, h: 32, text: s.simpleLog ? '开启' : '关闭', selected: s.simpleLog, onTap: function () { try { game.toggleSimpleLog(); } catch (e) {} } });
        iy += 40;
        R.drawRect(x + 8, 766, w - 16, 1, { fill: t.borderSoft });
        iy += 12;
        R.drawText('界面主题', x + 8, 786, { fontSize: 13, color: t.textMuted });
        iy += 28;
        const tw = (w - 30 - 16) / 3;
        const themes = [
            { k: 'dark', label: '🌙 深色' }, { k: 'warm', label: '📖 复古' }, { k: 'light', label: '☀ 清爽' }
        ];
        themes.forEach(function (th, i) {
            toggleBtn({ id: 'setTheme_' + th.k, t: t, x: x + 8 + i * (tw + 8), y: 802, w: tw, h: 44, text: th.label, fontSize: 12, selected: (game._canvasTheme || 'dark') === th.k, onTap: (function (k) { return function () { try { game.setTheme(k); } catch (e) {} }; })(th.k) });
        });
        R.drawText('切换即时生效，主题选择会自动保存', x + 8, 852, { fontSize: 11, color: t.textFaint });
        y += 232;

        // ---- 数据管理 ----（DOM 实测：标题@934 box@960 行1@994 h44 行2@1074 说明@1144）
        y = 934;
        y = sectionTitle(y, '数据管理');
        box(x, y, w, 190, t.bgCard, 10);
        const bw = (w - 30 - 12) / 2;
        const btns = [
            { id: 'setRedeem', text: '兑换码', bg: t.purple, onTap: function () { try { game.openRedeemPanel(); } catch (e) {} } },
            { id: 'setExport', text: '导出存档', bg: t.info, onTap: function () { try { game.exportSave(); } catch (e) {} } },
            { id: 'setImport', text: '导入存档', bg: t.success, onTap: function () { try { game.importSave(); } catch (e) {} } },
            { id: 'setClear', text: '清除存档', bg: t.danger, onTap: function () { try { game.clearSave(); } catch (e) {} } }
        ];
        btns.forEach(function (b, i) {
            const bx = x + 8 + (i % 2) * (bw + 8);
            const by = (i < 2 ? 994 : 1074);
            R.drawButton({ id: b.id, x: bx, y: by, w: bw, h: 44, text: b.text, fontSize: 13, bg: b.bg, color: '#ffffff', onTap: b.onTap });
        });
        R.drawText('导出存档会复制存档代码到剪贴板，导入存档需要粘贴存档代码', x + 8, 1144, { fontSize: 10, color: t.textFaint, maxWidth: w - 16 });
        y += 200;

        // ---- 关于游戏 ----（DOM 实测：标题@1214 box@1240 内容@1256 每行30）
        y = 1214;
        y = sectionTitle(y, '关于游戏');
        box(x, y, w, 150, t.bgCard, 10);
        iy = y + 16;
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
            iy += 30;
        });
        y += 160;

        // 页面滚动
        if (Input && Input.setPageScroll) {
            Input.setPageScroll({
                get: function () { return _scrollY; },
                set: function (v) { _scrollY = v; },
                max: function () { return Math.max(0, y - R.SCREEN_H + 350); }
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
