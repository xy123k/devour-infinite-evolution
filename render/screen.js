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
        const actives = document.querySelectorAll('.screen.active');
        for (let i = 0; i < actives.length; i++) actives[i].classList.remove('active');
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.classList.remove('active');
        const popBox = document.getElementById('popBox');
        if (popBox) popBox.style.display = 'none';
    }

    // 底部导航状态（DOM 底栏在迁移完成前继续使用）
    const NAV_SCREENS = ['mainScreen', 'battleScreen', 'settingsScreen', 'talentScreen', 'inventoryScreen', 'shopScreen', 'characterScreen'];
    function updateBottomNav(screenId) {
        if (typeof document === 'undefined') return;
        const bottomNav = document.getElementById('bottomNav');
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
            // 清空按钮/列表注册，防止上个界面的残留
            if (window.Input && window.Input.unregisterAllButtons) window.Input.unregisterAllButtons();
            current = screenId;
            currentMode = 'canvas';
            const r = screens[screenId];
            try {
                if (r && r.onShow) r.onShow();
            } catch (e) { if (typeof console !== 'undefined') console.error('onShow error', screenId, e); }
        } else if (window.game && typeof window.game.showScreenDOM === 'function') {
            // ---- DOM 模式回退 ----
            currentMode = 'dom';
            current = null;
            window.game.showScreenDOM(screenId);
        } else {
            currentMode = 'dom';
            current = null;
        }
        updateBottomNav(screenId);
    }

    // 单帧绘制：清屏 + 当前 canvas 屏 + 模态框 + toast
    function draw() {
        Render.clear();
        if (currentMode === 'canvas' && current && screens[current]) {
            const r = screens[current];
            if (r && r.render) r.render();
        }
        if (Render.drawModalLayer) Render.drawModalLayer();
        Render.drawToasts();
    }

    // 主循环（持续重绘：支持按压态/飘字/滚动动画）
    function startLoop() {
        const loop = function () {
            try { draw(); } catch (e) { if (typeof console !== 'undefined') console.error('render loop error', e); }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
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
