// ============================================================
//  Node 无 DOM 冒烟测试 —— 模拟 TapTap 容器（无 document）
//  验证：加载 render + data + game 全套后，启动路径不抛 ReferenceError/TypeError，
//        主界面/探索/战斗/弹窗等核心路径在无 DOM 环境可运行。
//  node render/nodom_smoke.js
// ============================================================
const fs = require('fs');
const vm = require('vm');
const path = 'D:/桌面/吞噬·无限进化/';

// ---------- 容器 mock（无 document！） ----------
const canvasMock = {
    width: 375, height: 667,
    style: {},
    getContext: function () { return ctx; },
    toDataURL: function () { return ''; },
    addEventListener: function () {}, removeEventListener: function () {}
};
const ctx = new Proxy({}, {
    get(t, k) {
        if (k === 'measureText') return function () { return { width: 10 }; };
        if (k === 'createLinearGradient' || k === 'createRadialGradient') return function () { return { addColorStop: function () {} }; };
        if (k === 'canvas') return canvasMock;
        if (typeof k === 'string' && t[k] !== undefined) return t[k];
        return function () {};
    },
    set(t, k, v) { t[k] = v; return true; }
});
global.tt = {
    createCanvas: function () { return canvasMock; },
    getSystemInfoSync: function () { return { windowWidth: 375, windowHeight: 667, pixelRatio: 1 }; },
    setStorageSync: function () {}, getStorageSync: function () { return null; }, removeStorageSync: function () {},
    onShow: function () {}, onHide: function () {},
    getLaunchOptionsSync: function () { return {}; },
    vibrateShort: function () {}, showToast: function () {}, showModal: function () {},
    createRewardedVideoAd: function () {
        return {
            load: function () { return Promise.resolve(); },
            show: function () { return Promise.resolve(); },
            onClose: function () {}, offClose: function () {},
            onError: function () {}, offError: function () {}
        };
    }
};
global.window = global;
global.innerWidth = 375; global.innerHeight = 667; global.devicePixelRatio = 1;
global.requestAnimationFrame = function (cb) { return setTimeout(cb, 16); };
global.cancelAnimationFrame = function (id) { clearTimeout(id); };
global.setInterval = setInterval; global.clearInterval = clearInterval;
global.setTimeout = setTimeout; global.clearTimeout = clearTimeout;
global.Date = Date; global.Math = Math; global.JSON = JSON;
global.Promise = Promise; global.Proxy = Proxy;
// navigator / location 最小 mock
global.navigator = { userAgent: 'nodom-test' };
global.location = { href: 'game://nodom', protocol: 'game:' };

let loadErrors = [];
const files = [
    'render/canvas.js', 'render/input.js', 'render/screen.js', 'render/html.js',
    'render/screens/mainScreen.js', 'render/screens/battleScreen.js',
    'render/screens/settingsScreen.js', 'render/screens/characterScreen.js',
    'render/screens/talentScreen.js', 'render/screens/inventoryScreen.js',
    'render/screens/shopScreen.js', 'render/screens/growthScreen.js',
    'render/screens/deathScreen.js', 'render/screens/tutorialOverlay.js',
    'data.js', 'game.js'
];
console.log('== 无 DOM 环境加载 ' + files.length + ' 个文件 ==');
files.forEach(function (f) {
    try {
        const code = fs.readFileSync(path + f, 'utf8');
        vm.runInThisContext(code, { filename: f });
        console.log('  OK  ' + f);
    } catch (e) {
        loadErrors.push(f + ': ' + e.message);
        console.error('  FAIL ' + f + ' :: ' + e.message);
    }
});
if (loadErrors.length) { console.error('加载失败:', loadErrors); process.exit(1); }

console.log('== 等待启动（loadAllJson + 500ms + startTutorial）==');
setTimeout(function () {
    const r = vm.runInThisContext('(function(){ var o={}; o.gameDefined = typeof game !== "undefined"; o.render = (typeof Render!=="undefined"); o.screen = (typeof Render!=="undefined" && Render.ScreenManager) ? Render.ScreenManager.current : null; o.playerHp = (typeof game!=="undefined" && game.player) ? game.player.hp : null; o.tutorialVisible = (typeof Render!=="undefined" && Render.Tutorial) ? Render.Tutorial.isVisible() : null; o.screenMode = (typeof Render!=="undefined" && Render.ScreenManager) ? Render.ScreenManager.mode : null; return o; })()');
    console.log('启动状态:', JSON.stringify(r));
    if (!r.gameDefined) { console.error('game 未定义'); process.exit(1); }

    // 主界面渲染一帧
    vm.runInThisContext('if (Render.ScreenManager.draw) Render.ScreenManager.draw();');

    // 探索
    console.log('== 探索前进 ==');
    vm.runInThisContext('game.goExplore();');
    setTimeout(function () {
        const r2 = vm.runInThisContext('(function(){ var o={}; o.state = game._mainAreaState || null; o.inBattle = !!game.inBattle; return o; })()');
        console.log('探索后:', JSON.stringify(r2));

        // 进入战斗（若遇敌）
        vm.runInThisContext('game.enterBattle();');
        setTimeout(function () {
            const r3 = vm.runInThisContext('(function(){ var o={}; o.inBattle = !!game.inBattle; o.enemy = game.currentEnemy ? game.currentEnemy.name : null; o.screen = Render.ScreenManager.current; return o; })()');
            console.log('战斗:', JSON.stringify(r3));
            // 普攻
            vm.runInThisContext('game.playerAttack();');
            setTimeout(function () {
                const r4 = vm.runInThisContext('(function(){ var o={}; o.enemyHp = game.currentEnemy ? game.currentEnemy.hp : null; o.playerHp = game.player.hp; o.screen = Render.ScreenManager.current; return o; })()');
                console.log('普攻后:', JSON.stringify(r4));
                // 弹窗
                vm.runInThisContext('game.showGameAlert("测试", "无DOM弹窗");');
                const r5 = vm.runInThisContext('(function(){ return { popup: Render.Popup.isVisible() }; })()');
                console.log('弹窗:', JSON.stringify(r5));
                vm.runInThisContext('Render.Popup.drawModal();');
                // 死亡结算
                vm.runInThisContext('game.deathSettlement();');
                const r6 = vm.runInThisContext('(function(){ return { screen: Render.ScreenManager.current, ui: !!game._deathUI }; })()');
                console.log('死亡结算:', JSON.stringify(r6));
                vm.runInThisContext('Render.ScreenManager.draw();');
                console.log('== 无 DOM 冒烟测试全部通过 ==');
                process.exit(0);
            }, 400);
        }, 400);
    }, 400);
}, 2000);
