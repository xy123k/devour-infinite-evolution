// ============================================================
//  render/input.js — 阶段 0：输入系统
//  《吞噬·无限进化》Canvas 化输入层
//  依赖：render/canvas.js（Render.SCREEN_W/H）
//  事件源：tt.onTouchStart/Move/End 优先；浏览器 touch + mouse 降级
// ============================================================
(function () {
    'use strict';

    const Render = window.Render;
    const SCREEN_W = Render.SCREEN_W;
    const SCREEN_H = Render.SCREEN_H;

    // ============================================================
    //  按钮注册表
    // ============================================================
    const _buttons = new Map();     // id -> {x,y,w,h,onTap,disabled}
    const _buttonStack = [];        // 注册顺序（后注册的上层优先命中）
    const _buttonIndex = new Map(); // id -> 栈内位置

    // ============================================================
    //  列表注册表
    // ============================================================
    const _lists = new Map();       // id -> list state
    const _listStack = [];          // 注册顺序

    // ============================================================
    //  触摸状态
    // ============================================================
    let _active = false;
    let _startX = 0, _startY = 0;
    let _lastX = 0, _lastY = 0;
    let _pressedId = null;          // 按下的按钮 id
    let _lastTapAnchor = null;      // P1-F：最近一次点击的按钮锚点（tooltip 跟随定位用）
    let _hitListId = null;          // 按下点命中的列表 id
    let _dragging = false;          // 是否已进入列表拖拽模式
    let _moved = false;             // 本次手势是否发生过明显位移
    let _scrollVel = 0;             // 列表惯性速度
    let _rafId = null;
    let _rafFn = (typeof requestAnimationFrame === 'function') ? requestAnimationFrame
        : function (cb) { return setTimeout(function () { cb(Date.now()); }, 16); };
    let _cafFn = (typeof cancelAnimationFrame === 'function') ? cancelAnimationFrame
        : function (id) { clearTimeout(id); };

    // ============================================================
    //  注册 API
    // ============================================================
    function registerButton(opt) {
        const id = opt.id;
        if (!id) return;
        const existing = _buttons.get(id);
        if (existing) {
            // 更新位置与回调（对象复用，保持按压态引用稳定）
            existing.x = opt.x; existing.y = opt.y; existing.w = opt.w; existing.h = opt.h;
            existing.onTap = opt.onTap; existing.disabled = !!opt.disabled;
        } else {
            const btn = {
                id: id, x: opt.x, y: opt.y, w: opt.w, h: opt.h,
                onTap: opt.onTap, disabled: !!opt.disabled
            };
            _buttons.set(id, btn);
            _buttonStack.push(id);
            _buttonIndex.set(id, _buttonStack.length - 1);
        }
    }

    function unregisterButton(id) {
        const idx = _buttonIndex.get(id);
        if (idx != null) {
            _buttonStack.splice(idx, 1);
            _buttonIndex.delete(id);
            // 重建索引
            _buttonIndex.clear();
            _buttonStack.forEach(function (bid, i) { _buttonIndex.set(bid, i); });
        }
        _buttons.delete(id);
    }

    function unregisterAllButtons() {
        _buttons.clear();
        _buttonStack.length = 0;
        _buttonIndex.clear();
    }

    // 按 id 前缀批量注销（弹窗/浮层专用，避免每帧注册导致 _buttons 无限增长）
    function unregisterByPrefix(prefix) {
        const keys = [];
        _buttons.forEach(function (v, k) { if (k.indexOf(prefix) === 0) keys.push(k); });
        keys.forEach(function (k) { unregisterButton(k); });
    }

    function getButton(id) { return _buttons.get(id) || null; }
    function isPressed(id) { return _active && _pressedId === id; }

    function registerList(opt) {
        const id = opt.id;
        if (!id) return;
        let st = _lists.get(id);
        if (!st) {
            st = {
                id: id, x: opt.x, y: opt.y, w: opt.w, h: opt.h,
                itemH: opt.itemH, gap: opt.gap, items: opt.items,
                onTap: opt.onTap, offsetY: 0, maxOffset: 0
            };
            _lists.set(id, st);
            _listStack.push(id);
        } else {
            st.x = opt.x; st.y = opt.y; st.w = opt.w; st.h = opt.h;
            st.itemH = opt.itemH; st.gap = opt.gap; st.items = opt.items;
            st.onTap = opt.onTap;
        }
        // 重新计算 maxOffset
        const totalH = st.items.length * (st.itemH + st.gap) - st.gap;
        st.maxOffset = Math.max(0, totalH - st.h);
        st.offsetY = Math.min(st.maxOffset, Math.max(0, st.offsetY));
        return st;
    }

    function getListState(id) { return _lists.get(id) || null; }

    function setListOffset(id, offset) {
        const st = _lists.get(id);
        if (!st) return;
        st.offsetY = Math.min(st.maxOffset, Math.max(0, offset));
    }

    // ============================================================
    //  命中检测
    // ============================================================
    // P3-3：界面滚动偏移补偿 —— 渲染器以"未滚动坐标"注册按钮/列表
    //（draw 内 ctx.translate(0,-_scrollY)），点击坐标为屏幕坐标，
    // 命中时把滚动量加回，保证滚动后点击仍命中正确元素。
    let _scrollOffset = 0;
    function setScrollOffset(v) { _scrollOffset = v || 0; }
    function hy(y) { return y + (_scrollOffset || 0); }

    function hitButton(x, y) {
        const yy = hy(y);
        // 后注册的按钮优先（模拟 DOM 层叠）
        // P9-9：弹窗矩形内拦截——只命中 popBtn_/popMask_/popInput_ 前缀，防止穿透到底层主页按钮/tooltip
        const inPopup = !!(
            _popScroll && x >= _popScroll.x && x <= _popScroll.x + _popScroll.w
            && y >= _popScroll.y && y <= _popScroll.y + _popScroll.h
        );
        for (let i = _buttonStack.length - 1; i >= 0; i--) {
            const btn = _buttons.get(_buttonStack[i]);
            if (!btn || btn.disabled) continue;
            if (inPopup && btn.id && btn.id.indexOf('popBtn_') !== 0 && btn.id.indexOf('popMask_') !== 0 && btn.id.indexOf('popInput_') !== 0) continue;
            if (x >= btn.x && x <= btn.x + btn.w && yy >= btn.y && yy <= btn.y + btn.h) {
                return btn;
            }
        }
        return null;
    }

    function hitList(x, y) {
        const yy = hy(y);
        // 后注册的列表优先
        for (let i = _listStack.length - 1; i >= 0; i--) {
            const st = _lists.get(_listStack[i]);
            if (!st) continue;
            if (x >= st.x && x <= st.x + st.w && yy >= st.y && yy <= st.y + st.h) {
                return st;
            }
        }
        return null;
    }

    // 计算列表内点击的项 index
    function itemIndexAt(st, y) {
        const rel = y - st.y + st.offsetY;
        return Math.floor(rel / (st.itemH + st.gap));
    }

    // ============================================================
    //  页面级滚动（整页可滚动的 canvas 界面用，如主界面）
    // ============================================================
    let _pageScroll = null;   // { get(): 当前 offsetY, set(v), max(): 最大滚动 }
    let _pageMode = false;   // 本次手势是否处于页面滚动
    let _hoverId = null;     // P3-5：当前悬停按钮 id
    let _hoverX = null, _hoverY = null;   // 桌面端悬停坐标（tooltip hover 命中用）
    let _popScroll = null;   // P3-4/P3-8：弹窗内滚动 {x,y,w,h,get,set,max}（弹窗内容超界时）
    let _popMode = false;    // 本次手势是否处于弹窗内容滚动

    function setPageScroll(handler) {
        _pageScroll = handler || null;
    }

    // P3-4/P3-8：弹窗内滚动注册（弹窗可见时优先于页面滚动）
    function setPopupScroll(handler) {
        _popScroll = handler || null;
    }

    // ============================================================
    //  事件处理
    // ============================================================
    function onStart(x, y) {
        _active = true;
        _startX = _lastX = x;
        _startY = _lastY = y;
        _moved = false;
        _dragging = false;
        _pageMode = false;
        _popMode = false;
        _scrollVel = 0;
        stopInertia();

        // 先命中按钮（列表项按钮优先于列表滚动）
        const btn = hitButton(x, y);
        if (btn) {
            _pressedId = btn.id;
        } else {
            _pressedId = null;
            const st = hitList(x, y);
            _hitListId = st ? st.id : null;
            if (!_hitListId) {
                // 点击空白/非按钮区域：关闭 tooltip（P3-x）
                try {
                    if (window.Render && window.Render.Tooltip && window.Render.Tooltip.isVisible && window.Render.Tooltip.isVisible()) {
                        window.Render.Tooltip.hide();
                    }
                } catch (e) {}
                // P3-4/P3-8：弹窗内容超界时可拖拽滚动（弹窗可视区内、未命中内容按钮）
                if (_popScroll && _popScroll.max() > 0
                    && x >= _popScroll.x && x <= _popScroll.x + _popScroll.w
                    && y >= _popScroll.y && y <= _popScroll.y + _popScroll.h) {
                    _popMode = true;
                } else if (_pageScroll) {
                    _pageMode = true;
                }
            }
        }
    }

    function onMove(x, y) {
        if (!_active) return;
        const dx = x - _startX, dy = y - _startY;
        if (!_moved && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            _moved = true;
            // 位移超过阈值：取消按钮按压，若在列表内则进入拖拽
            const st = _hitListId ? _lists.get(_hitListId) : null;
            if (st) {
                _dragging = true;
                _pressedId = null;
                _pageMode = false;
            } else if (_pageMode) {
                _pressedId = null;
            }
        }
        if (_dragging && _hitListId) {
            const st = _lists.get(_hitListId);
            if (st) {
                const dy2 = y - _lastY;
                setListOffset(_hitListId, st.offsetY - dy2);
                // 记录速度（用于惯性）
                _scrollVel = -dy2;
            }
        } else if (_popMode && _popScroll) {
            const dy2 = y - _lastY;
            const cur = _popScroll.get() || 0;
            _popScroll.set(cur - dy2);
            _scrollVel = -dy2;
        } else if (_pageMode && _pageScroll) {
            const dy2 = y - _lastY;
            const cur = _pageScroll.get() || 0;
            _pageScroll.set(cur - dy2);
            _scrollVel = -dy2;
        }
        _lastX = x; _lastY = y;
    }

    function onEnd() {
        if (!_active) return;
        if (_dragging && _hitListId) {
            // 惯性滚动
            const st = _lists.get(_hitListId);
            if (st && Math.abs(_scrollVel) > 2) {
                startInertia(_hitListId);
            }
        } else if (_popMode && _popScroll) {
            // 弹窗惯性滚动
            if (Math.abs(_scrollVel) > 2) startPopInertia();
            else clampPop();
        } else if (_pageMode && _pageScroll) {
            // 页面惯性滚动
            if (Math.abs(_scrollVel) > 2) startPageInertia();
            else clampPage();
        } else if (!_moved) {
            // 未发生位移 → 点击
            if (_pressedId) {
                const btn = _buttons.get(_pressedId);
                if (btn && btn.onTap) {
                    // P1-F：记录最近一次点击按钮的锚点（中心 x、底边 y），供 tooltip 跟随触发元素定位
                    try { _lastTapAnchor = { x: btn.x + (btn.w || 0) / 2, y: btn.y + (btn.h || 0), w: btn.w || 0, h: btn.h || 0 }; } catch (e) {}
                    try { btn.onTap(); } catch (e) { if (typeof console !== 'undefined') console.error(e); }
                }
            } else if (_hitListId) {
                const st = _lists.get(_hitListId);
                if (st && st.onTap) {
                    const idx = itemIndexAt(st, hy(_startY));
                    const item = st.items[idx];
                    if (item && idx >= 0 && idx < st.items.length) {
                        try { st.onTap(item, idx); } catch (e) { if (typeof console !== 'undefined') console.error(e); }
                    }
                }
            }
        }
        _active = false;
        _pressedId = null;
        _hitListId = null;
        _dragging = false;
    }

    // ---- 惯性滚动 ----
    function startInertia(listId) {
        stopInertia();
        const st = _lists.get(listId);
        if (!st) return;
        let vel = _scrollVel;
        const step = function () {
            if (!st || Math.abs(vel) < 0.6) {
                // 边界吸附
                if (st) {
                    if (st.offsetY < 0) setListOffset(listId, 0);
                    else if (st.offsetY > st.maxOffset) setListOffset(listId, st.maxOffset);
                }
                _rafId = null;
                return;
            }
            vel *= 0.94;
            _scrollVel = vel;
            setListOffset(listId, st.offsetY - vel);
            _rafId = _rafFn(step);
        };
        _rafId = _rafFn(step);
    }

    function stopInertia() {
        if (_rafId != null) {
            _cafFn(_rafId);
            _rafId = null;
        }
    }

    // ---- 弹窗惯性滚动（P3-4/P3-8）----
    function clampPop() {
        if (!_popScroll) return;
        const cur = _popScroll.get() || 0;
        _popScroll.set(Math.min(_popScroll.max(), Math.max(0, cur)));
    }
    function startPopInertia() {
        stopInertia();
        if (!_popScroll) return;
        let vel = _scrollVel;
        const step = function () {
            if (Math.abs(vel) < 0.6) {
                clampPop();
                _rafId = null;
                return;
            }
            vel *= 0.94;
            _scrollVel = vel;
            const cur = _popScroll.get() || 0;
            _popScroll.set(Math.min(_popScroll.max(), Math.max(0, cur - vel)));
            _rafId = _rafFn(step);
        };
        _rafId = _rafFn(step);
    }

    // ---- 页面惯性滚动 ----
    function clampPage() {
        if (!_pageScroll) return;
        const cur = _pageScroll.get() || 0;
        const max = _pageScroll.max ? _pageScroll.max() : 0;
        _pageScroll.set(Math.min(max, Math.max(0, cur)));
    }
    function startPageInertia() {
        stopInertia();
        if (!_pageScroll) return;
        let vel = _scrollVel;
        const max = _pageScroll.max ? _pageScroll.max() : 0;
        const step = function () {
            if (Math.abs(vel) < 0.6) {
                clampPage();
                _rafId = null;
                return;
            }
            vel *= 0.94;
            _scrollVel = vel;
            const cur = _pageScroll.get() || 0;
            _pageScroll.set(Math.min(max, Math.max(0, cur - vel)));
            _rafId = _rafFn(step);
        };
        _rafId = _rafFn(step);
    }

    // ============================================================
    //  事件源绑定
    // ============================================================
    // P8-1：client 坐标 → Canvas 逻辑坐标换算。
    // canvas 逻辑尺寸 SCREEN_W/H 与 CSS 尺寸通常 1:1（fixed 铺满视口），
    // 但若容器/CSS 缩放或页面偏移导致不一致，直接拿 clientX/Y 命中会错位，
    // 这里按 getBoundingClientRect 比例换算；无 DOM（TapTap）时降级直传。
    function toLogic(cx, cy) {
        try {
            const cv = Render.canvas;
            if (cv && typeof cv.getBoundingClientRect === 'function') {
                const rect = cv.getBoundingClientRect();
                if (rect && rect.width > 0 && (Math.abs(rect.width - SCREEN_W) > 0.5 || Math.abs(rect.left) > 0.5 || Math.abs(rect.top) > 0.5)) {
                    return { x: (cx - rect.left) * SCREEN_W / rect.width, y: (cy - rect.top) * SCREEN_H / rect.height };
                }
            }
        } catch (e) {}
        return { x: cx, y: cy };
    }

    function getTouchPoint(e) {
        if (e.touches && e.touches.length > 0) return toLogic(e.touches[0].clientX, e.touches[0].clientY);
        if (e.changedTouches && e.changedTouches.length > 0) return toLogic(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        return null;
    }

    function bind() {
        const hasTT = typeof tt !== 'undefined';
        const canvas = Render.canvas;

        if (hasTT && typeof tt.onTouchStart === 'function') {
            // TapTap 容器：全局触摸事件
            tt.onTouchStart(function (e) {
                const p = getTouchPoint(e);
                if (p) onStart(p.x, p.y);
            });
            tt.onTouchMove(function (e) {
                const p = getTouchPoint(e);
                if (p) onMove(p.x, p.y);
            });
            tt.onTouchEnd(function (e) {
                onEnd();
            });
        } else if (typeof document !== 'undefined') {
            // 浏览器：touch 事件
            if ('ontouchstart' in window) {
                canvas.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    const p = getTouchPoint(e);
                    if (p) onStart(p.x, p.y);
                }, { passive: false });
                canvas.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                    const p = getTouchPoint(e);
                    if (p) onMove(p.x, p.y);
                }, { passive: false });
                canvas.addEventListener('touchend', function (e) {
                    e.preventDefault();
                    onEnd();
                }, { passive: false });
            }
            // 鼠标降级（桌面浏览器调试）
            canvas.addEventListener('mousedown', function (e) { const p2 = toLogic(e.clientX, e.clientY); onStart(p2.x, p2.y); });
            canvas.addEventListener('mousemove', function (e) {
                const p2 = toLogic(e.clientX, e.clientY);
                _hoverX = p2.x; _hoverY = p2.y;
                if (_active) { onMove(p2.x, p2.y); return; }
                // P3-5：悬停检测（桌面端 hover 反馈）
                const btn = hitButton(p2.x, p2.y);
                _hoverId = btn ? btn.id : null;
            });
            window.addEventListener('mouseup', function () { onEnd(); });
            // ESC 键关闭（P1-1）：优先关闭 tooltip → canvas 弹窗 → 模态框
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' || e.keyCode === 27) {
                    try {
                        const R2 = window.Render;
                        if (R2 && R2.Tooltip && R2.Tooltip.isVisible && R2.Tooltip.isVisible()) {
                            R2.Tooltip.hide();
                            return;
                        }
                        if (R2 && R2.Popup && R2.Popup.isVisible && R2.Popup.isVisible()) {
                            if (typeof game !== 'undefined' && game.closePop) game.closePop();
                            else if (R2.Popup.close) R2.Popup.close();
                            return;
                        }
                        if (R2 && typeof R2.closeModal === 'function') R2.closeModal();
                    } catch (e2) { if (typeof console !== 'undefined') console.error(e2); }
                }
            });
            // 滚轮滚动（桌面浏览器调试：弹窗内容优先，其次模拟页面滚动）
            canvas.addEventListener('wheel', function (e) {
                e.preventDefault();
                if (_popScroll && _popScroll.max() > 0) {
                    const cur = _popScroll.get() || 0;
                    _popScroll.set(Math.min(_popScroll.max(), Math.max(0, cur + e.deltaY)));
                    return;
                }
                if (_pageScroll) {
                    const cur = _pageScroll.get() || 0;
                    const max = _pageScroll.max ? _pageScroll.max() : 0;
                    _pageScroll.set(Math.min(max, Math.max(0, cur + e.deltaY)));
                }
            }, { passive: false });
        }
    }

    // ============================================================
    //  导出
    // ============================================================
    window.Input = {
        registerButton: registerButton,
        unregisterButton: unregisterButton,
        unregisterAllButtons: unregisterAllButtons,
        unregisterByPrefix: unregisterByPrefix,
        getButton: getButton,
        isPressed: isPressed,
        registerList: registerList,
        getListState: getListState,
        setListOffset: setListOffset,
        setPageScroll: setPageScroll,
        setPopupScroll: setPopupScroll,
        setScrollOffset: setScrollOffset,
        hitButton: hitButton,
        hitList: hitList,
        bind: bind,
        // P1-F：读取最近一次点击按钮的锚点（tooltip 跟随触发元素）
        getLastTapAnchor: function () { return _lastTapAnchor; },
        // 调试
        _buttons: _buttons,
        _lists: _lists,
        get pressedId() { return _pressedId; },
        get _hoverId() { return _hoverId; },
        get _hoverX() { return _hoverX; },
        get _hoverY() { return _hoverY; }
    };
})();
