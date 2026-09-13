// ============================================================
//  render/screens/battleScreen.js — 阶段 2：战斗界面 Canvas 化
//  《吞噬·无限进化》
//  依赖：render/canvas.js、render/input.js、render/screen.js
//  设计：渲染器每帧读取 game 战斗状态（inBattle/battleEnding/
//        playerTurn/currentEnemy/battleLog/player），纯表现层。
//        伤害飘字：监测 HP 变化生成，1.2s 上浮淡出（原 DOM
//        damageFloatContainer 逻辑本就空置，此为渲染层补齐）。
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
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
    }

    function logColor(cls) {
        const t = R.Theme.get();
        if (cls === 'log-damage') return t.danger;
        if (cls === 'log-heal') return t.success;
        if (cls === 'log-victory') return t.warning;
        if (cls === 'log-info') return t.textMuted;
        return t.textSecondary;
    }

    // ============================================================
    //  伤害飘字（渲染层表现）
    // ============================================================
    let _floats = [];
    let _lastEnemyHp = null;
    let _lastPlayerHp = null;

    function trackFloats() {
        const game = g();
        if (!game || !game.player) return;
        const t = R.Theme.get();
        const now = Date.now();
        const e = game.currentEnemy;
        if (e && e.stats) {
            if (_lastEnemyHp == null) _lastEnemyHp = e.stats.hp;
            else if (e.stats.hp !== _lastEnemyHp) {
                const d = e.stats.hp - _lastEnemyHp;
                if (d !== 0) {
                    _floats.push({ x: PX + MAX_W - 24, y: 112, text: (d > 0 ? '+' : '') + d, color: d > 0 ? t.success : t.danger, t0: now });
                }
                _lastEnemyHp = e.stats.hp;
            }
        }
        const p = game.player;
        if (p) {
            if (_lastPlayerHp == null) _lastPlayerHp = p.hp;
            else if (p.hp !== _lastPlayerHp) {
                const d = p.hp - _lastPlayerHp;
                if (d !== 0) {
                    _floats.push({ x: PX + MAX_W - 24, y: 396, text: (d > 0 ? '+' : '') + d, color: d > 0 ? t.success : t.danger, t0: now });
                }
                _lastPlayerHp = p.hp;
            }
        }
        _floats = _floats.filter(function (f) { return now - f.t0 < 1200; });
    }

    function drawFloats() {
        const now = Date.now();
        _floats.forEach(function (f) {
            const age = (now - f.t0) / 1200;
            if (age >= 1) return;
            R.ctx.globalAlpha = 1 - age;
            R.drawText(f.text, f.x, f.y - 34 * age, { fontSize: 18, color: f.color, align: 'right', bold: true });
            R.ctx.globalAlpha = 1;
        });
    }

    // ============================================================
    //  顶部资源栏（HP / 能量 / 楼层）
    // ============================================================
    function drawTopBar() {
        const game = g();
        const t = R.Theme.get();
        const p = game.player;
        const h = 46;
        const items = [
            { icon: '❤', value: p.hp + '/' + p.maxHp, color: t.danger },
            { icon: '⚡', value: p.energy + '/' + p.maxEnergy, color: t.info },
            { icon: '🗺', value: (game.currentFloor || 1) + '-' + (game.currentLayer || 1) + '层', color: t.warning }
        ];
        box(PX, 0, MAX_W, h, t.bgCard, 0);
        R.drawRect(PX, h - 1, MAX_W, 1, { fill: t.borderSoft });
        const itemW = MAX_W / items.length;
        items.forEach(function (it, i) {
            const ix = PX + i * itemW;
            R.drawText(it.icon, ix + itemW / 2, 14, { fontSize: 15, color: it.color, align: 'center', bold: true });
            R.drawText(String(it.value), ix + itemW / 2, 31, { fontSize: 12, color: t.textPrimary, align: 'center', bold: true });
        });
    }

    // ============================================================
    //  战斗者卡（敌人 / 玩家）
    // ============================================================
    function drawCombatantCard(x, y, w, side) {
        const game = g();
        const t = R.Theme.get();
        const unit = side === 'enemy' ? game.currentEnemy : game.player;
        if (!unit) return y;
        const hp = side === 'enemy' ? unit.stats.hp : unit.hp;
        const maxHp = side === 'enemy' ? unit.stats.maxHp : unit.maxHp;
        const nameColor = side === 'enemy'
            ? (unit.type === 'boss' ? t.danger : (unit.type === 'elite' ? t.warning : t.success))
            : t.info;
        const name = side === 'enemy'
            ? (unit.name + (unit.type === 'boss' ? '（首领）' : (unit.type === 'elite' ? '（精英）' : '')))
            : '玩家';
        const cardH = 96;

        box(x - 12, y, w + 24, cardH, t.bgCard, 10);
        R.drawRect(x - 12, y, 4, cardH, { fill: nameColor, radius: 2 });
        R.drawText(name, x, y + 10, { fontSize: 15, color: nameColor, bold: true });

        // HP 条
        R.drawBar(x, y + 30, w, 18, maxHp > 0 ? hp / maxHp : 0, {
            bg: t.bgSecondary,
            fg: side === 'enemy' ? t.danger : t.success,
            text: hp + '/' + maxHp,
            textColor: '#ffffff',
            fontSize: 11,
            border: t.borderSoft
        });

        // 属性行
        let line1 = '', line2 = '';
        if (side === 'enemy') {
            const eCrit = 5 + (unit.stats.per || 5) * 0.8;
            const eHit = 85 + (unit.stats.per || 5) / 5;
            line1 = '攻击：' + unit.stats.atk + ' | 防御：' + unit.stats.def + ' | 先手：' + (unit.stats.agi || 5);
            line2 = '暴击：' + eCrit.toFixed(0) + '% | 命中：' + eHit.toFixed(0) + '%';
        } else {
            line1 = '攻击：' + Math.floor(unit.attack) + ' | 防御：' + Math.floor(unit.defense) + ' | 暴击：' + unit.crit + '%';
            line2 = '命中：' + unit.hit + '% | 先手：' + unit.speed + ' | 能量：' + unit.energy + '/' + unit.maxEnergy;
        }
        R.drawText(line1, x, y + 56, { fontSize: 11, color: t.textMuted, maxWidth: w });
        R.drawText(line2, x, y + 72, { fontSize: 11, color: t.textMuted, maxWidth: w });

        // 状态
        const statusText = game.formatStatuses ? stripHtml(game.formatStatuses(unit)) : '';
        if (statusText && !game.battleEnding) {
            R.drawText(statusText, x, y + 88, { fontSize: 11, color: t.purple, maxWidth: w });
        }
        return y + cardH + 8;
    }

    // ============================================================
    //  战斗日志（最新 N 条，自动跟随）
    // ============================================================
    function drawBattleLog(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const LOG_H = 132;
        box(x - 12, y, w + 24, LOG_H, t.bgSecondary, 8);
        R.drawText('战斗日志', x, y + 10, { fontSize: 12, color: t.textMuted, bold: true });
        const logs = game.battleLog || [];
        const maxRows = Math.floor((LOG_H - 26) / 13);
        let yy = y + 26;
        let drawn = 0;
        for (let i = logs.length - 1; i >= 0 && drawn < maxRows; i--) {
            const l = logs[i];
            const text = stripHtml(l.text);
            const lines = R.wrapText(text, w - 20, 11, false);
            const slice = lines.slice(0, 2);
            for (let j = 0; j < slice.length && drawn < maxRows; j++) {
                R.drawText(slice[j], x + 4, yy, { fontSize: 11, color: logColor(l.className), maxWidth: w - 20 });
                yy += 13;
                drawn++;
            }
        }
        return y + LOG_H + 8;
    }

    // ============================================================
    //  行动按钮（普攻/技能/物品/逃跑 + 快速狩猎）
    // ============================================================
    function drawActionButtons() {
        const game = g();
        const t = R.Theme.get();
        const inBattle = game.inBattle && !game.battleEnding;
        const canAct = inBattle && game.playerTurn;
        const x = PX + 12, w = MAX_W - 24;
        const btnW = (w - 24) / 4;
        const y = R.SCREEN_H - 148;

        // 快速狩猎（攻击力 > 敌人最大生命 ×1.5 且非首领）
        const e = game.currentEnemy;
        const showQuick = inBattle && e && e.type !== 'boss' && game.player.attack > e.stats.maxHp * 1.5;
        if (showQuick) {
            R.drawButton({
                id: 'quickHunt', x: x, y: y - 52, w: w, h: 40,
                text: '⚡ 快速狩猎（一击必杀，获得70%碎片）', fontSize: 13, bg: t.success, color: '#ffffff',
                onTap: function () { try { game.quickHunt(); } catch (err) {} }
            });
        }

        const actions = [
            { id: 'btnAttack', text: '普攻', bg: t.danger, onTap: function () { try { game.playerAttack(); } catch (err) {} } },
            { id: 'btnSkill', text: '技能', bg: t.info, onTap: function () { try { game.openSkillPanel(); } catch (err) {} } },
            { id: 'btnItem', text: '物品', bg: t.warning, onTap: function () { try { game.useItem(); } catch (err) {} } },
            { id: 'btnFlee', text: '逃跑', bg: t.bgHover, onTap: function () { try { game.tryEscape(); } catch (err) {} } }
        ];
        actions.forEach(function (a, i) {
            R.drawButton({
                id: a.id, x: x + i * (btnW + 8), y: y, w: btnW, h: 44,
                text: a.text, fontSize: 14, bg: a.bg, color: '#ffffff', disabled: !canAct,
                onTap: a.onTap
            });
        });
    }

    // ============================================================
    //  主渲染
    // ============================================================
    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.player) return;
        const t = R.Theme.get();
        const x = PX + 12, w = MAX_W - 24;

        drawTopBar();
        trackFloats();

        // 标题 + 楼层
        let y = 52;
        R.drawText('战斗', PX + MAX_W / 2, y, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        y += 24;
        const map = game.getCurrentMap ? game.getCurrentMap() : null;
        const envEff = game.getEnvironmentEffect ? game.getEnvironmentEffect() : null;
        const envName = envEff ? ' | 环境：' + envEff.name : '';
        R.drawText((map ? map.name : '') + ' · 第 ' + (game.currentLayer || 1) + ' 层' + envName, PX + MAX_W / 2, y, { fontSize: 12, color: t.textMuted, align: 'center' });
        y += 24;

        // 敌人卡
        if (game.currentEnemy) {
            y = drawCombatantCard(x, y, w, 'enemy');
        } else {
            // 无敌人（异常态）：显示提示
            box(x - 12, y, w + 24, 80, t.bgCard, 10);
            R.drawText('战斗中…', x, y + 20, { fontSize: 14, color: t.textMuted });
            y += 88;
        }

        // 日志
        y = drawBattleLog(x, y, w);

        // 玩家卡
        y = drawCombatantCard(x, y, w, 'player');

        // 战斗结束横幅（胜利/失败后、掉落弹窗出现前）
        if (game.battleEnding && !game.inBattle) {
            const label = game.lastBattleWon ? '战斗胜利！' : '战斗结束';
            R.drawText(label, PX + MAX_W / 2, Math.min(y + 14, R.SCREEN_H - 220), { fontSize: 16, color: t.warning, align: 'center', bold: true });
        }

        drawActionButtons();
        drawFloats();
    }

    function onShow() {
        const game = g();
        _floats = [];
        _lastEnemyHp = null;
        _lastPlayerHp = null;
        if (game && game.currentEnemy && game.currentEnemy.stats) _lastEnemyHp = game.currentEnemy.stats.hp;
        if (game && game.player) _lastPlayerHp = game.player.hp;
    }

    R.ScreenManager.register('battleScreen', {
        render: render,
        onShow: onShow
    });
})();
