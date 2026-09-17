// ============================================================
//  render/screens/mainScreen.js — 阶段 1：主界面 Canvas 渲染器
//  《吞噬·无限进化》主界面（顶栏/玩家卡/剧情/探索四态/功能宫格/轮回入口）
//  依赖：render/canvas.js、render/input.js、render/screen.js、game.js
//  状态源：game.player / game.permanent / game.currentFloor|Layer / game.getCurrentMap()
//          game._mainAreaState（'explore'|'enemy'|'merchant'|'event'|'bossRest'|'shop'）
//          game.pendingEnemy / game.currentMerchant / game._eventData / game._bossRestData
//          game._storyActive / game._storyLines / game._storyIdx
// ============================================================
(function () {
    'use strict';
    const R = window.Render;
    const Input = window.Input;

    let MAX_W = Math.min(R.SCREEN_W, 520);
    let PX = (R.SCREEN_W - MAX_W) / 2;
    function refreshLayout() {
        MAX_W = Math.min(R.SCREEN_W, 520);
        PX = (R.SCREEN_W - MAX_W) / 2;
    }   // 水平留白
    const BOTTOM_PAD = 150;                 // 底部导航栏预留

    let _scrollY = 0;
    let _contentH = 0;
    let _moreOpen = false;

    const g = function () { return (typeof game !== 'undefined') ? game : null; };

    // ============================================================
    //  布局辅助
    // ============================================================
    // DOM .box 背景 = linear-gradient(145deg, rgba(18,30,40,.85), rgba(12,22,30,.9))
    // 半透明叠加 bg-primary #0a0e17 后的近似不透明色：#111c26 → #0c151d
    const BOX_G_FROM = '#111c26';
    const BOX_G_TO = '#0c151d';
    function box(x, y, w, h, fill, radius) {
        const t = R.Theme.get();
        if (fill === t.bgCard) {
            R.drawRect(x, y, w, h, { gradient: { from: BOX_G_FROM, to: BOX_G_TO }, radius: radius == null ? 10 : radius, stroke: t.border, strokeWidth: 1 });
        } else {
            R.drawRect(x, y, w, h, { fill: fill, radius: radius == null ? 10 : radius, stroke: t.border, strokeWidth: 1 });
        }
    }

    // 返回下一 y
    function drawTopBar(y) {
        const game = g();
        const t = R.Theme.get();
        const p = game.player;
        const perm = game.permanent;
        const gold = p.gold || 0;
        const talentPoints = perm.talentPoints || 0;
        const passiveSlots = game.getPassiveSlots ? game.getPassiveSlots() : 0;
        const equippedCount = (p.equippedTalents || []).length;
        let totalUniversal = 0;
        if (perm.universalFragments) {
            for (let q = 1; q <= 5; q++) totalUniversal += perm.universalFragments[q] || 0;
        }
        const currentFloor = game.currentFloor || 1;
        const currentLayer = game.currentLayer || 1;

        const items = [
            { icon: 'gene', color: t.accent, value: gold, tip: 'geneEssence' },
            { icon: 'star', color: t.warning, value: talentPoints, tip: 'talentPoints' },
            { icon: 'shield', color: t.info, value: equippedCount + '/' + passiveSlots, tip: 'passiveSlots' },
            { icon: 'spark', color: t.purple, value: totalUniversal, tip: 'universalFragment' },
            { icon: 'map', color: t.success, value: currentFloor + '-' + currentLayer + '层', tip: 'currentFloor' }
        ];
        const itemW = MAX_W / items.length;
        const h = 51;   // DOM .top-resource-bar 实测高 51（padding 10 + 内容 + 边框）
        // DOM --gradient-top-bar：180° #1a2332 → rgba(10,14,23,.95)，用垂直渐变近似
        R.drawRect(PX, y, MAX_W, h, { gradient: { from: t.navGrad1, to: t.bgPrimary }, radius: 0 });
        R.drawRect(PX, y + h - 1, MAX_W, 1, { fill: t.borderSoft });
        items.forEach((it, i) => {
            const ix = PX + i * itemW;
            // SVG 图标（P2-2：与 DOM 原版一致，18px）
            R.drawIcon(it.icon, ix + itemW / 2 - 9, y + (h - 18) / 2, 18, it.color);
            // 数值统一 accent-warning（DOM .top-bar-value {color: var(--accent-warning)}）
            // P1-I：第 5 项（层）值右对齐贴右缘，避免「1-1层」被右缘裁切
            const valX = i === items.length - 1 ? ix + itemW - 6 : ix + itemW / 2 + 11;
            R.drawText(String(it.value), valX, y + h / 2 + 1, { fontSize: 14, color: t.warning, align: i === items.length - 1 ? 'right' : 'left', bold: true, baseline: 'middle' });
            // tooltip 点击
            if (game.showTooltip) {
                Input.registerButton({
                    id: 'topbar_' + it.tip + '_' + i,
                    x: ix, y: y, w: itemW, h: h,
                    onTap: (function (key, ev) { return function () { try { game.showTooltip(key); } catch (e) {} }; })(it.tip)
                });
            }
        });
        return h;
    }

    function drawTitle(y) {
        const t = R.Theme.get();
        // DOM h2：22px 居中（高 45，mb 20 与 floorInfo mt 折叠）
        R.drawText('吞噬·无限进化', PX + MAX_W / 2, y + 22, { fontSize: 20, color: t.textPrimary, align: 'center', bold: true, baseline: 'middle' });
        // DOM .floor-info：20px bold accent-warning，margin 12px 0
        const game = g();
        const currentMap = game.getCurrentMap ? game.getCurrentMap() : null;
        const mapName = currentMap ? currentMap.name : '未知区域';
        const layerText = (currentMap && currentMap.totalLayers === -1 ? ' 层（无限轮回）' : '/' + (currentMap ? currentMap.totalLayers : '?') + ' 层');
        R.drawText(mapName + ' · 第 ' + (game.currentLayer || 1) + layerText + '（全局第 ' + (game.currentFloor || 1) + ' 层）', PX + MAX_W / 2, y + 81, { fontSize: 20, color: t.warning, align: 'center', bold: true, baseline: 'middle' });
        // h2 45 + mb 20 + floorInfo 32 + mb 12（与下一 box 的间距）
        return 109;
    }

    function drawPlayerCard(y) {
        const game = g();
        const t = R.Theme.get();
        const p = game.player;
        const pad = 14;
        const w = MAX_W - pad * 2;
        const x = PX + pad;
        // DOM 玩家卡 box 实测高 205 = pad14 + h3(25+mb12) + playerInfo(139) + pad14
        const h3H = 25, h3Mb = 12, contentH = 139;
        const statAllocH = p.statPoints > 0 ? 96 : 0;
        const totalH = pad + h3H + h3Mb + contentH + statAllocH + pad + 1;   // +1 边框，实测 DOM=205

        box(PX, y, MAX_W, totalH, t.bgCard, 12);
        R.drawRect(PX, y, MAX_W, 1, { fill: t.borderSoft });
        // DOM .box 1px 全边框 var(--border-primary)
        R.drawRect(PX, y, MAX_W, totalH, { stroke: t.border, lineWidth: 1, radius: 12 });

        let yy = y + pad;
        // 玩家信息标题（DOM h3 16px bold，实测 glyph 顶 = box+pad）
        R.drawRect(x, yy - 4, 3, 18, { fill: t.accent, radius: 1.5 });
        R.drawText('玩家信息', x + 14, yy, { fontSize: 16, color: t.accent, bold: true });
        yy += h3H + h3Mb;
        // flex space-between 分布助手（DOM playerInfo 全部是 justify-content:space-between）
        function flexRow(x0, y0, w0, items, bind) {
            const widths = items.map(function (it) { return R.measureText(it.text, it.fontSize || 13, it.bold); });
            const total = widths.reduce(function (a, b) { return a + b; }, 0);
            const gap = items.length > 1 ? (w0 - total) / (items.length - 1) : 0;
            let cx = x0;
            items.forEach(function (it, i) {
                R.drawText(it.text, cx, y0, { fontSize: it.fontSize || 13, color: it.color, bold: it.bold, baseline: 'top' });
                if (bind) bind(it, cx, widths[i]);
                cx += widths[i] + gap;
            });
        }
        // 行0：HP / 攻击 / 防御（DOM：16px bold danger / 15px orange / 15px info）
        flexRow(x, yy, w, [
            { text: '❤ ' + p.hp + '/' + p.maxHp, fontSize: 16, color: t.danger, bold: true },
            { text: '⚔ ' + Math.floor(p.attack), fontSize: 15, color: t.orange },
            { text: '🛡 ' + Math.floor(p.defense), fontSize: 15, color: t.info }
        ], function (it, cx, cw) { if (it.text.indexOf('❤') === 0) bindStatTooltip('', 'hp', cx, yy, cw + 40, 26); });
        yy += 32;
        // 行1：暴击/基础命中/闪避/先手（DOM 13px text-muted，space-between）
        flexRow(x, yy, w, [
            { text: '暴击 ' + p.crit + '%', fontSize: 13, color: t.textMuted },
            { text: '基础命中 ' + p.hit + '%', fontSize: 13, color: t.textMuted },
            { text: '闪避 ' + (p.dodgeRate || 0) + '%（基础）', fontSize: 13, color: t.textMuted },
            { text: '先手 ' + p.speed, fontSize: 13, color: t.textMuted }
        ], function (it, cx, cw) {
            if (it.text.indexOf('暴击') === 0) bindStatTooltip('', 'crit', cx, yy, cw, 22);
            else if (it.text.indexOf('基础命中') === 0) bindStatTooltip('', 'hit', cx, yy, cw, 22);
            else if (it.text.indexOf('闪避') === 0) bindStatTooltip('', 'dodgeRate', cx, yy, cw, 22);
            else bindStatTooltip('', 'speed', cx, yy, cw, 22);
        });
        yy += 25;
        // 行2：暴伤 + 提示（DOM 12px，hint text-faint 右对齐）
        flexRow(x, yy, w, [
            { text: '暴伤 ' + p.critDamage + '%', fontSize: 13, color: t.textMuted },
            { text: '实际命中/闪避受双方敏捷影响', fontSize: 12, color: t.textFaint }
        ], function (it, cx, cw) { if (it.text.indexOf('暴伤') === 0) bindStatTooltip('', 'critDamage', cx, yy, cw, 20); });
        yy += 25;
        // 行3：等级/精华/天赋（DOM 13px text-faint）
        flexRow(x, yy, w, [
            { text: p.level + '级 (' + p.exp + '/' + p.expToNext + ')', fontSize: 13, color: t.textFaint },
            { text: '基因精华 ' + p.gold, fontSize: 13, color: t.textFaint },
            { text: '天赋 ' + (p.equippedTalents || []).length + '/' + (game.getPassiveSlots ? game.getPassiveSlots() : 3), fontSize: 13, color: t.textFaint }
        ], function (it, cx, cw) {
            if (it.text.indexOf('级 (') >= 0) bindStatTooltip('', 'level', cx, yy, cw, 21);
            else if (it.text.indexOf('基因精华') === 0) bindStatTooltip('', 'essence', cx, yy, cw, 21);
            else bindStatTooltip('', 'passiveSlots', cx, yy, cw, 21);
        });
        yy += 29;
        // 分割线（DOM border-top 位于 321）
        R.drawRect(x, yy, w, 1, { fill: t.border });
        yy += 7;
        // 行4：五维（DOM 13px text-secondary，space-between）
        flexRow(x, yy, w, [
            { text: '力 ' + p.strength, fontSize: 13, color: t.textSecondary },
            { text: '敏 ' + p.agility, fontSize: 13, color: t.textSecondary },
            { text: '体 ' + p.vitality, fontSize: 13, color: t.textSecondary },
            { text: '感 ' + p.perception, fontSize: 13, color: t.textSecondary },
            { text: '进 ' + p.evolution, fontSize: 13, color: t.textSecondary }
        ], function (it, cx, cw) {
            const map = { 力: 'strength', 敏: 'agility', 体: 'vitality', 感: 'perception', 进: 'evolution' };
            const k = map[it.text.charAt(0)];
            if (k) bindStatTooltip('', k, cx, yy, cw + 25, 29);
        });
        // 属性点分配
        if (p.statPoints > 0) {
            const stats = [
                { k: 'strength', name: '力' }, { k: 'agility', name: '敏' }, { k: 'vitality', name: '体' },
                { k: 'perception', name: '感' }, { k: 'evolution', name: '进' }
            ];
            const ay = y + pad + h3H + h3Mb + contentH + 4;
            box(x, ay, w, 72, t.bgSecondary, 8);
            R.drawText('可用属性点：' + p.statPoints + '（点击分配）', x + 10, ay + 8, { fontSize: 13, color: t.warning, bold: true });
            const btnW = (w - 20 - 8 * 4) / 5;
            stats.forEach((s, i) => {
                const by = ay + 32;
                R.drawButton({
                    id: 'statalloc_' + s.k,
                    x: x + 10 + i * (btnW + 8), y: by, w: btnW, h: 32,
                    text: s.name + '+1',
                    fontSize: 12, bg: t.success, color: '#ffffff',
                    onTap: (function (k) { return function () { try { game.allocateStat(k); } catch (e) {} }; })(s.k)
                });
            });
        }
        return totalH + 10;   // +10 = DOM .box margin-bottom
    }

    // 属性 tooltip（虚线文本点击显示）
    function bindStatTooltip(prefix, key, x, y, w, h) {
        const game = g();
        if (!game.showTooltip) return;
        Input.registerButton({
            id: 'stat_' + key,
            x: x, y: y, w: w, h: h,
            onTap: (function (k) { return function () { try { game.showTooltip(k); } catch (e) {} }; })(key)
        });
    }

    // ============================================================
    //  剧情 / 区域卡（探索四态）
    // ============================================================
    function drawStoryArea(y) {
        const game = g();
        const t = R.Theme.get();
        const state = game._mainAreaState || 'explore';
        const x = PX + 14, w = MAX_W - 28;

        // 探索已触发（遭遇/商人/事件/Boss）：优先显示对应区域（跳过未读完的剧情）
        if (state !== 'explore') {
            if (state === 'enemy' && game.pendingEnemy) {
                return drawEnemyCard(x, y, w);
            }
            if (state === 'merchant' || state === 'shop') {
                return drawMerchantCard(x, y, w, state === 'shop');
            }
            if (state === 'event' && game._eventData) {
                return drawEventCard(x, y, w);
            }
            if (state === 'bossRest') {
                return drawBossRestCard(x, y, w);
            }
        }
        // 剧情模式
        if (game._storyActive && game._storyLines) {
            return drawStoryCard(x, y, w);
        }
        return drawEnvironmentCard(x, y, w);
    }

    // 环境法则（DOM storyText：16px text-secondary，纯文本 + br 分行；box pad 14）
    function drawEnvironmentCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const currentMap = game.getCurrentMap ? game.getCurrentMap() : null;
        const envEff = game.getEnvironmentEffect ? game.getEnvironmentEffect() : null;

        let title = '探索', body = '继续探索，寻找更强的猎物...';
        if (currentMap && envEff) {
            const isBossFloor = currentMap.totalLayers === -1 ? ((game.currentLayer || 1) % 5 === 0) : ((game.currentLayer || 1) >= (currentMap.totalLayers || 3));
            title = '【' + currentMap.name + '】';
            body = '环境法则：' + envEff.name + '\n' + envEff.desc + (isBossFloor ? '\n⚠ 前方是首领层，做好准备！' : '');
        } else if (currentMap && currentMap.environmentLaw) {
            title = '【' + currentMap.name + '】';
            body = '环境法则：' + currentMap.environmentLaw.name + '\n' + currentMap.environmentLaw.effect;
        }
        // 16px lh1.6 对齐 DOM storyText（22.4 → 用 26 取整）
        const fs = 16, lh = 26;
        const lines = R.wrapText(title + '\n' + body, w - 28, fs, false);
        const h = 28 + lines.length * lh;   // 28 = box pad 14×2
        box(x - 14, y, w + 28, h, t.bgCard, 10);
        R.drawRect(x - 14, y, w + 28, h, { stroke: t.border, lineWidth: 1, radius: 10 });
        // 左侧彩色竖条（DOM 主屏环境卡没有，删除）
        R.drawText(title + '\n' + body, x, y + 20, { fontSize: fs, color: t.textSecondary, maxWidth: w - 28, lineHeight: lh });
        return h + 10;   // +10 = DOM .box margin-bottom
    }

    // 剧情卡（DOM 实测：外层 box 375-597 h222，绿色卡 storyText 400-572 h172）
    function drawStoryCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const totalLines = game._storyLines.length;
        const line = game._storyLines[game._storyIdx];
        const isLast = game._storyIdx >= totalLines - 1;
        const lineNum = (game._storyIdx || 0) + 1;

        const h = 222;
        // 外层 box（与其它卡片一致，pad14）
        box(PX, y, MAX_W, h, t.bgCard, 10);
        R.drawRect(PX, y, MAX_W, h, { stroke: t.border, lineWidth: 1, radius: 10 });
        // 内侧绿色渐变卡（storyText = y+25 起，h172）
        const gx = PX + 14, gy = y + 25, gw = MAX_W - 28;
        R.drawRect(gx, gy, gw, 172, { gradient: { from: 'rgba(0,60,50,0.6)', to: 'rgba(0,30,40,0.55)' }, radius: 10, stroke: t.border, strokeWidth: 1 });
        // 标题行：剧情 16px bold accent + x/y 12px faint 右对齐
        R.drawText('剧情', gx + 15, gy + 15, { fontSize: 16, color: t.accent, bold: true });
        R.drawText(lineNum + '/' + totalLines, gx + gw - 15, gy + 19, { fontSize: 12, color: t.textFaint, align: 'right' });
        // 内容 14px lh25（DOM 14px lh1.8 = 25.2）
        R.drawText(line, gx + 15, gy + 51, { fontSize: 14, color: t.textSecondary, maxWidth: gw - 30, lineHeight: 25 });
        // 按钮行（DOM y+138 起，按钮 36 高）
        R.drawButton({
            id: 'storyNext',
            x: gx + 15, y: gy + 113, w: 120, h: 36,
            text: isLast ? '完成' : '下一段',
            fontSize: 14, bg: t.accent, color: '#ffffff',
            onTap: function () { try { game._storyNext(); } catch (e) {} }
        });
        R.drawText('点击继续阅读，或直接探索跳过', gx + 145, gy + 126, { fontSize: 12, color: t.textFaint });
        return h + 10;   // +10 = DOM .box margin-bottom
    }

    // 遭遇敌人卡
    // 清理 HTML 标签（canvas 无法渲染 HTML）
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

    function drawEnemyCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const enemy = game.pendingEnemy;
        const narrative = stripHtml(game._enemyNarrative || '');

        // 叙事文本
        let h = 8;
        if (narrative) {
            const nlines = R.wrapText(narrative, w - 20, 13, false);
            h += nlines.length * 20 + 16;
        }
        // 敌人信息卡
        const typeLabel = enemy.type === 'boss' ? '【首领】' : (enemy.type === 'elite' ? '【精英】' : '【普通】');
        const typeColor = enemy.type === 'boss' ? t.danger : (enemy.type === 'elite' ? t.warning : t.success);
        const ehp = enemy.stats ? enemy.stats.hp : 0;
        const eatk = enemy.stats ? enemy.stats.atk : 0;
        const edef = enemy.stats ? enemy.stats.def : 0;
        const eagi = enemy.stats ? enemy.stats.agi : 0;
        const edesc = enemy.description || '';
        const dlines = R.wrapText(edesc, w - 24, 12, false);

        // 抗性行
        let resistLines = [];
        if (game.getDotResistance) {
            const dotLabels = [
                { type: 'bleed', name: '血' }, { type: 'poison', name: '毒' }, { type: 'burn', name: '火' },
                { type: 'freeze', name: '冰' }, { type: 'stun', name: '晕' }, { type: 'paralyze', name: '麻' },
                { type: 'slow', name: '缓' }, { type: 'wither', name: '凋' }
            ];
            resistLines = dotLabels.map(function (d) {
                const resist = game.getDotResistance(enemy, d.type);
                const pct = Math.floor(resist * 100);
                let c = t.success;
                if (resist >= 0.5) c = t.danger;
                else if (resist >= 0.3) c = t.warning;
                else if (resist <= 0) c = t.textFaint;
                return { name: d.name, pct: pct, color: c };
            });
        }

        const infoH = 90 + dlines.length * 18 + (resistLines.length ? 26 : 0);
        const totalH = h + infoH + 52;

        // 叙事区
        box(x - 14, y, w + 28, totalH, t.bgCard, 10);
        let yy = y + 8;
        if (narrative) {
            R.drawText(narrative, x, yy, { fontSize: 13, color: t.textSecondary, maxWidth: w - 20, lineHeight: 20 });
            yy += R.wrapText(narrative, w - 20, 13, false).length * 20 + 8;
        }
        // 敌人名
        R.drawText(typeLabel + ' ' + enemy.name, x, yy, { fontSize: 16, color: typeColor, bold: true });
        yy += 26;
        // 属性行
        R.drawText('❤ 生命 ' + ehp + '   ⚔ 攻击 ' + eatk + '   🛡 防御 ' + edef + '   ⚡ 先手 ' + eagi, x, yy, { fontSize: 13, color: t.textMuted });
        yy += 22;
        if (edesc) {
            R.drawText(edesc, x, yy, { fontSize: 12, color: t.textFaint, maxWidth: w - 24, lineHeight: 18 });
            yy += dlines.length * 18;
        }
        // 抗性
        if (resistLines.length) {
            R.drawRect(x, yy, w - 20, 1, { fill: t.border });
            yy += 6;
            R.drawText('持续伤害抗性：', x, yy, { fontSize: 11, color: t.textMuted });
            R.drawText(resistLines.map(function (r) { return r.name + (r.pct > 0 ? r.pct + '%' : '无'); }).join('  '), x, yy + 15, { fontSize: 11, color: t.textMuted, maxWidth: w - 24 });
            yy += 30;
        }
        // 按钮
        const btnY = y + totalH - 44;
        const btnW = (w - 10) / 2;
        R.drawButton({
            id: 'enterBattle', x: x, y: btnY, w: btnW, h: 38,
            text: '进入战斗', fontSize: 15, bg: t.danger, color: '#ffffff',
            onTap: function () { try { game.enterBattle(); } catch (e) {} }
        });
        R.drawButton({
            id: 'fleeBattle', x: x + btnW + 10, y: btnY, w: btnW, h: 38,
            text: '逃跑（-20%生命）', fontSize: 13, bg: t.bgHover, color: t.textSecondary,
            onTap: function () { try { game.fleeBattle(); } catch (e) {} }
        });
        return totalH;
    }

    // 商人卡
    function drawMerchantCard(x, y, w, isShopMode) {
        const game = g();
        const t = R.Theme.get();
        const m = game.currentMerchant || { name: '流浪商人', desc: '', items: '' };
        const descLines = R.wrapText(m.desc || '', w - 24, 13, false);
        const h = 40 + descLines.length * 22 + 60;
        box(x - 14, y, w + 28, h, t.bgCard, 10);
        R.drawRect(x - 14, y, 4, h, { fill: t.success, radius: 2 });
        R.drawText((isShopMode ? '流浪商人（购物中）' : '遇到' + m.name), x, y + 10, { fontSize: 15, color: t.success, bold: true });
        R.drawText('主营：' + m.items, x + w, y + 10, { fontSize: 11, color: t.success, align: 'right' });
        if (m.desc) R.drawText(m.desc, x, y + 34, { fontSize: 13, color: t.textSecondary, maxWidth: w - 24, lineHeight: 22 });
        // 精华与折扣
        R.drawText('基因精华：' + game.player.gold + '    全场8折', x, y + h - 66, { fontSize: 13, color: t.warning, bold: true });
        const btnY = y + h - 46;
        const btnW = (w - 10) / 2;
        R.drawButton({
            id: 'merchantEnter', x: x, y: btnY, w: btnW, h: 38,
            text: isShopMode ? '继续购物' : '进入商店（8折）', fontSize: 14, bg: t.success, color: '#ffffff',
            onTap: function () { try { game.enterMerchantShop(); } catch (e) {} }
        });
        R.drawButton({
            id: 'merchantLeave', x: x + btnW + 10, y: btnY, w: btnW, h: 38,
            text: '离开', fontSize: 14, bg: t.bgHover, color: t.textSecondary,
            onTap: function () { try { game.leaveMerchant(); } catch (e) {} }
        });
        return h;
    }

    // 事件卡
    function drawEventCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const ev = game._eventData;
        if (!ev) return drawEnvironmentCard(x, y, w);
        const descLines = R.wrapText(ev.desc || '', w - 24, 13, false);
        const opts = ev.options || [];
        const h = 42 + descLines.length * 22 + 10 + opts.length * 44;
        box(x - 14, y, w + 28, h, t.bgCard, 10);
        R.drawRect(x - 14, y, 4, h, { fill: t.warning, radius: 2 });
        R.drawText(ev.title || '随机事件', x, y + 10, { fontSize: 15, color: t.warning, bold: true });
        if (ev.desc) R.drawText(ev.desc, x, y + 34, { fontSize: 13, color: t.textSecondary, maxWidth: w - 24, lineHeight: 22 });
        let yy = y + 34 + descLines.length * 22 + 6;
        opts.forEach(function (opt, i) {
            R.drawButton({
                id: 'eventopt_' + i + '_' + (opt.key || ''),
                x: x, y: yy, w: w - 20, h: 36,
                text: opt.text, fontSize: 13,
                bg: opt.bg || t.bgHover, color: opt.color || t.textPrimary,
                disabled: !!opt.disabled, onTap: opt.onTap
            });
            yy += 40;
        });
        return h;
    }

    // Boss 休息卡
    function drawBossRestCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const data = game._bossRestData;
        if (!data || !data.options) return drawEnvironmentCard(x, y, w);
        const opts = data.options || [];
        const h = 56 + 10 + opts.length * 44;
        box(x - 14, y, w + 28, h, t.bgCard, 10);
        R.drawRect(x - 14, y, 4, h, { fill: t.danger, radius: 2 });
        R.drawText('首领层休整', x, y + 10, { fontSize: 15, color: t.danger, bold: true });
        R.drawText('前方是强大的首领，选择你的备战方式：', x, y + 34, { fontSize: 13, color: t.textMuted });
        let yy = y + 60;
        opts.forEach(function (opt, i) {
            R.drawButton({
                id: 'bossrest_' + i,
                x: x, y: yy, w: w - 20, h: 36,
                text: opt.text, fontSize: 13,
                bg: opt.bg || t.bgHover, color: opt.color || t.textPrimary,
                onTap: opt.onTap
            });
            yy += 40;
        });
        return h;
    }

    // ============================================================
    //  探索前进 / 功能宫格 / 更多功能 / 轮回入口
    // ============================================================
    function drawExploreBtn(y) {
        const t = R.Theme.get();
        const game = g();
        // DOM 探索 box：pad16 + 按钮 h58（margin4）+ pad16 = 实测 h100
        box(PX, y, MAX_W, 100, t.bgCard, 12);
        R.drawButton({
            id: 'exploreBtn', x: PX + 17, y: y + 21, w: MAX_W - 34, h: 58,
            text: '探索前进', icon: 'map', fontSize: 18, bg: t.success, color: '#ffffff',
            onTap: function () { try { game.goExplore(); } catch (e) {} }
        });
        return 110;
    }

    function drawFeatureGrid(y) {
        const t = R.Theme.get();
        const game = g();
        // DOM 宫格 box：实测 gap 16（672-722 / 738-788）
        const gap = 16;
        const w = (MAX_W - 28 - gap) / 2;
        const h = 50;
        const x0 = PX + 15;
        const feats = [
            { id: 'feat_talent', text: '天赋', icon: 'flask', onTap: function () { game.openInRunTalentPanel(); } },
            { id: 'feat_status', text: '状态', icon: 'barChart', onTap: function () { game.openStatus(); } },
            { id: 'feat_inv', text: '背包', icon: 'bag', onTap: function () { game.openInventory(); } },
            { id: 'feat_sym', text: '共生体', icon: 'target', onTap: function () { game.openSymbiontPanel(); } }
        ];
        box(PX, y, MAX_W, 154, t.bgCard, 12);
        feats.forEach(function (f, i) {
            const col = i % 2, row = Math.floor(i / 2);
            R.drawButton({
                id: f.id, x: x0 + col * (w + gap), y: y + 18 + row * (h + gap), w: w, h: h,
                text: f.text, icon: f.icon, fontSize: 15, bg: t.accent, color: '#ffffff',
                onTap: f.onTap
            });
        });
        return 164;
    }

    function drawMoreArea(y) {
        const t = R.Theme.get();
        const game = g();
        // DOM 实测：更多 box 817-1155（展开 h338 = 78 + 12 + 菜单248），按钮 h48 行距64
        const NAV_H = 76;
        const menuH = 248;
        const h = _moreOpen ? 338 : 78;
        box(PX, y, MAX_W, h, t.bgCard, 12);
        R.drawRect(PX, y, MAX_W, h, { stroke: t.border, lineWidth: 1, radius: 12 });
        R.drawButton({
            id: 'moreToggle', x: PX + 15, y: y + 15, w: MAX_W - 30, h: 48,
            text: '更多功能 ' + (_moreOpen ? '▲' : '▼'),
            icon: 'bolt', iconSize: 15, fontSize: 15, bg: t.border, color: t.textPrimary,
            onTap: (function (yy) {
                return function () {
                    _moreOpen = !_moreOpen;
                    try { if (game && game.hideTooltip) game.hideTooltip(); } catch (e) {}
                    if (_moreOpen) {
                        // 展开后菜单底（未滚动坐标）必须可见：增量滚动到菜单底不超出视口
                        const menuBottom = yy + 338;
                        const viewBottom = _scrollY + (R.SCREEN_H - NAV_H);
                        if (menuBottom > viewBottom) _scrollY += menuBottom - viewBottom;
                    }
                };
            })(y)
        });
        if (_moreOpen) {
            const gap = 8;
            const w = (MAX_W - 30 - gap) / 2;
            const items = [
                { id: 'more_guide', text: '效果图鉴', icon: 'book', onTap: function () { game.openStatusGuide(); } },
                { id: 'more_shop', text: '商店', icon: 'shop', onTap: function () { game.openShop(); } },
                { id: 'more_tcodex', text: '天赋图鉴', icon: 'list', onTap: function () { game.openTalentCodex(); } },
                { id: 'more_scodex', text: '共生体图鉴', icon: 'dna', onTap: function () { game.openSymbiontCodex(); } },
                { id: 'more_achv', text: '成就', icon: 'trophy', onTap: function () { game.openAchievementPanel(); } },
                { id: 'more_task', text: '任务', icon: 'clipboard', onTap: function () { game.openDailyTaskPanel(); } },
                { id: 'more_rank', text: '排行', icon: 'trendUp', onTap: function () { game.openLeaderboardPanel(); } },
                { id: 'more_set', text: '设置', icon: 'settings', onTap: function () { game.openSettings(); } }
            ];
            items.forEach(function (it, i) {
                const col = i % 2, row = Math.floor(i / 2);
                R.drawButton({
                    id: it.id, x: PX + 15 + col * (w + gap), y: y + 79 + row * 64, w: w, h: 48,
                    text: it.text, icon: it.icon, iconSize: 14, fontSize: 14, bg: t.accent, color: '#ffffff',
                    onTap: it.onTap
                });
            });
        }
        return h + 10;
    }

    function drawGrowth(y) {
        const t = R.Theme.get();
        const game = g();
        const blocked = (game.currentFloor || 1) > 1;
        // DOM 轮回 box：pad14 + 按钮44 + pad14 = 实测 h82
        let h = 82;
        if (blocked) h += 56;
        box(PX, y, MAX_W, h, t.bgCard, 12);
        // DOM growthBtn 为内容宽 + padding 32（12px 16px×2），居中；其余主屏按钮全宽
        const gText = '局外成长（轮回空间）';
        const gW = R.measureText(gText, 13, true) + 24;
        R.drawButton({
            id: 'growthBtn', x: PX + (MAX_W - gW) / 2, y: y + 19, w: gW, h: 44,
            text: gText, fontSize: 13,
            bg: blocked ? 'rgba(90,106,101,0.35)' : t.warning, color: blocked ? t.textMuted : '#1a1206',
            disabled: blocked,
            onTap: function () { try { game.openGrowth(); } catch (e) {} }
        });
        if (blocked) {
            R.drawButton({
                id: 'suicideBtn', x: PX + 15, y: y + 71, w: MAX_W - 30, h: 38,
                text: '结束轮回（自杀）', icon: 'shield', iconSize: 12, fontSize: 13, bg: t.danger, color: '#ffffff',
                onTap: function () { try { game.suicide(); } catch (e) {} }
            });
            R.drawText('轮回空间仅在死亡后可进入，当前探索进度将保留', PX + MAX_W / 2, y + 118, { fontSize: 12, color: t.textMuted, align: 'center' });
            h += 46;
        }
        return h;
    }

    // ============================================================
    //  渲染主函数
    // ============================================================
    function render() {
        refreshLayout();
        const game = g();
        if (!game || !game.player) return;
        R.clear();
        const ctx = R.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, R.SCREEN_W, R.SCREEN_H);
        ctx.clip();
        // P3-3：与其它界面统一 —— 内容用未滚动坐标绘制，滚动偏移交给 Input 命中补偿
        // DOM 顶栏 position:sticky 不随内容滚动 → 顶栏画在滚动位移之外
        let y = 0;
        y += drawTopBar(0);   // 顶栏高度计入内容流（DOM sticky 顶栏占位 51px），顶栏本身最后重绘
        ctx.translate(0, -_scrollY);
        Input.setScrollOffset(_scrollY);

        y += drawTitle(y);
        y += drawPlayerCard(y);
        y += drawStoryArea(y);
        y += drawExploreBtn(y);
        y += drawFeatureGrid(y);
        y += drawMoreArea(y);
        y += drawGrowth(y);
        y += BOTTOM_PAD;

        _contentH = y;
        ctx.restore();
        // DOM 顶栏 position:sticky —— 最后绘制，保证盖在滚动内容之上
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, R.SCREEN_W, 52);
        ctx.clip();
        drawTopBar(0);
        ctx.restore();
        // 滚动偏移保持到下一帧（与其它界面一致），点击命中时由 Input 补偿

        // 滚动范围
        const maxScroll = Math.max(0, _contentH - R.SCREEN_H);
        if (_scrollY > maxScroll) _scrollY = maxScroll;
        if (_scrollY < 0) _scrollY = 0;

        // 注册页面滚动
        Input.setPageScroll({
            get: function () { return _scrollY; },
            set: function (v) { _scrollY = Math.min(maxScroll, Math.max(0, v)); },
            max: function () { return maxScroll; }
        });
    }

    // ============================================================
    //  onShow：切换到主界面时的初始化
    // ============================================================
    function onShow() {
        _scrollY = 0;
        _moreOpen = false;
        // 同步 game 侧状态标记
        const game = g();
        if (game) game._canvasMain = true;
    }

    R.ScreenManager.register('mainScreen', { render: render, onShow: onShow });
})();
