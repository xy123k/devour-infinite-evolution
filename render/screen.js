// ============================================================
//  render/screen.js — 阶段 0：Canvas 屏幕管理器
//  《吞噬·无限进化》界面切换（canvas 版 showScreen）
//  依赖：render/canvas.js、render/input.js
//  设计：混合模式——已 Canvas 化的界面走 canvas 绘制；
//        未迁移的界面回退 game.showScreenDOM（DOM 模式）。
//        迁移是渐进的，任何阶段浏览器里都完整可玩。
// ============================================================
(function () {
    'use strict';

    const Render = window.Render;
    const screens = {};          // screenId -> { render(), onShow() }
    let current = null;          // 当前 canvas 界面 id
    let currentMode = 'dom';     // 'canvas' | 'dom'

    // 隐藏所有 DOM 屏（迁移后由 canvas 接管显示）
    function hideDomScreens() {
        if (typeof document === 'undefined') return;
        const actives = window.__qsa('.screen.active');
        for (let i = 0; i < actives.length; i++) actives[i].classList.remove('active');
        const overlay = window.__gid('overlay');
        if (overlay) overlay.classList.remove('active');
        const popBox = window.__gid('popBox');
        if (popBox) popBox.style.display = 'none';
    }

    // 底部导航状态（对齐 DOM showScreen：main/battle/settings/talent/inventory/shop/character 显示，其余隐藏）
    const NAV_SCREENS = ['mainScreen', 'battleScreen', 'settingsScreen', 'talentScreen', 'inventoryScreen', 'shopScreen', 'characterScreen'];
    function updateBottomNav(screenId) {
        if (typeof document === 'undefined') return;
        const bottomNav = window.__gid('bottomNav');
        if (!bottomNav) return;
        const btns = bottomNav.querySelectorAll('button');
        for (let i = 0; i < btns.length; i++) btns[i].classList.remove('active');
        const navBtn = bottomNav.querySelector('[data-screen="' + screenId + '"]');
        if (navBtn) navBtn.classList.add('active');
        bottomNav.style.display = NAV_SCREENS.indexOf(screenId) >= 0 ? 'flex' : 'none';
    }

    // 注册 canvas 界面渲染器
    // renderer: { render(), onShow() }
    function register(screenId, renderer) {
        screens[screenId] = renderer;
    }

    function showScreen(screenId) {
        if (screens[screenId]) {
            // ---- canvas 模式 ----
            hideDomScreens();
            // 切换界面时关闭 tooltip，防止残留叠层（P3-x）
            try { if (window.Render && window.Render.Tooltip) window.Render.Tooltip.hide(); } catch (e) {}
            // 清空按钮/列表注册，防止上个界面的残留
            if (window.Input && window.Input.unregisterAllButtons) window.Input.unregisterAllButtons();
            // 清空页面滚动与滚动补偿（各界面每帧自行注册）
            if (window.Input && window.Input.setScrollOffset) window.Input.setScrollOffset(0);
            if (window.Input && window.Input.setPageScroll) window.Input.setPageScroll(null);
            current = screenId;
            currentMode = 'canvas';
            const r = screens[screenId];
            try {
                if (r && r.onShow) r.onShow();
            } catch (e) { if (typeof console !== 'undefined') console.error('onShow error', screenId, e); }
        } else if (typeof game !== 'undefined' && typeof game.showScreenDOM === 'function') {
            // ---- DOM 模式回退 ----
            currentMode = 'dom';
            current = null;
            game.showScreenDOM(screenId);
        } else {
            currentMode = 'dom';
            current = null;
        }
        updateBottomNav(screenId);
    }

    // 单帧绘制：清屏 + 当前 canvas 屏 + 模态框 + 弹窗层 + tooltip + toast
    function draw() {
        // P0-4 v7: draw-alive tick (device js_log verifies the render loop runs on MIUI/Redmi)
        try {
            window._drawTick = (window._drawTick || 0) + 1;
            if (window._drawTick % 120 === 0) { console.log('[Render] draw alive, screen=' + (current || 'none')); }
            // 性能优化：前 5 帧确认游戏循环正常后，停止启动呼吸动画的全画布重绘
            if (window._drawTick === 5 && Render.stopBreath) { try { Render.stopBreath(); } catch (_e) {} }
        } catch (_e) {}
        Render.clear();
        if (currentMode === 'canvas' && current && screens[current]) {
            const r = screens[current];
            if (r && r.render) r.render();
        }
        // 阶段 4：通用弹窗层（showPopup/showGameAlert/Confirm 的 canvas 渲染）
        if (window.Render.Popup && window.Render.Popup.isVisible && window.Render.Popup.isVisible()) {
            window.Render.Popup.drawModal();
        }
        if (Render.drawModalLayer) Render.drawModalLayer();
        // 阶段 4：新手引导覆盖层
        if (window.Render.Tutorial && window.Render.Tutorial.isVisible && window.Render.Tutorial.isVisible()) {
            window.Render.Tutorial.draw();
        }
        // 阶段 4：tooltip 悬浮提示
        if (window.Render.Tooltip && window.Render.Tooltip.draw && window.Render.Tooltip.isVisible && window.Render.Tooltip.isVisible()) {
            window.Render.Tooltip.draw();
        }
        Render.drawToasts();
    }

    // 主循环（持续重绘：支持按压态/飘字/滚动动画）
    // P0-2：帧率自适应——目标 60fps，低性能（软件渲染/低端机）自动降级 30/20fps，
    // 避免全屏重绘阻塞主线程；恢复流畅后自动回升。降级同时通知 Render 降低特效复杂度。
    function startLoop() {
        let last = 0;
        let frameCount = 0;
        let skipEvery = 1;              // 每 N 个 rAF 帧绘制 1 次（1=60fps, 2=30fps, 3=20fps）
        const frameTimes = [];          // 最近 30 帧耗时（ms）
        const FRAME_WINDOW = 30;
        const LOOP_MAX = 0;             // 无帧数上限
        let _lastLoopAt = Date.now();   // P0-4 v8: defined before loop() to avoid let-TDZ if RAF fires synchronously

        function loop(ts) {
            try { _lastLoopAt = Date.now(); } catch (_e) {}
            if (last) {
                const dt = ts - last;
                frameTimes.push(dt);
                if (frameTimes.length > FRAME_WINDOW) frameTimes.shift();
                let sum = 0;
                for (let i = 0; i < frameTimes.length; i++) sum += frameTimes[i];
                const avg = sum / frameTimes.length;
                // 自适应：平均耗时持续偏高 → 降帧；明显流畅 → 回升
                if (avg > 70) skipEvery = 3;          // <~14fps 时再降
                else if (avg > 42) skipEvery = 2;     // ~24fps 以下 → 30fps
                else if (avg < 20 && skipEvery > 1) skipEvery = 1;  // 60fps 稳定 → 恢复
                if (Render && Render.setQuality) {
                    Render.setQuality(skipEvery > 1 ? 'low' : 'high');
                }
            }
            last = ts;
            frameCount++;
            if (frameCount % skipEvery === 0) {
                try { draw(); } catch (e) { if (typeof console !== 'undefined') console.error('render loop error', e); }
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
        // P0-4 v7: RAF fallback — on some devices (MIUI WebView) requestAnimationFrame may never
        // fire; if no new frame within 120ms, drive the loop via setInterval as a backup.
        const _loopGuard = setInterval(function () {
            try {
                if (Date.now() - _lastLoopAt > 120) {
                    _lastLoopAt = Date.now();
                    loop(performance && performance.now ? performance.now() : Date.now());
                }
            } catch (_e) {}
        }, 100);
        try { console.log('[Render] startLoop with RAF fallback'); } catch (_e) {}
    }

    // ---- 与 game.js 的桥接：DOM 弹窗在 canvas 模式下的兼容 ----
    // 说明：canvas 界面中，game.showPopup/showGameAlert 等 DOM 弹窗仍可弹出
    // （DOM 弹窗 z-index 高于 canvas），待阶段 4 迁移为 canvas 弹窗。

    window.Render.ScreenManager = {
        screens: screens,
        register: register,
        showScreen: showScreen,
        draw: draw,
        startLoop: startLoop,
        get current() { return current; },
        get mode() { return currentMode; },
        get isCanvasMode() { return currentMode === 'canvas'; }
    };
})();
