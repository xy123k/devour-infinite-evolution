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
    function box(x, y, w, h, fill, radius) {
        R.drawRect(x, y, w, h, { fill: fill, radius: radius == null ? 10 : radius });
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
        const h = 46;
        box(PX, y, MAX_W, h, t.bgCard, 0);
        R.drawRect(PX, y + h - 1, MAX_W, 1, { fill: t.borderSoft });
        items.forEach((it, i) => {
            const ix = PX + i * itemW;
            // SVG 图标（P2-2：与 DOM 原版一致）
            R.drawIcon(it.icon, ix + itemW / 2 - 8, y + 7, 15, it.color);
            R.drawText(String(it.value), ix + itemW / 2, y + 30, { fontSize: 12, color: t.textPrimary, align: 'center', bold: true });
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
        R.drawText('吞噬·无限进化', PX + MAX_W / 2, y + 4, { fontSize: 18, color: t.textPrimary, align: 'center', bold: true });
        // 地图信息
        const game = g();
        const currentMap = game.getCurrentMap ? game.getCurrentMap() : null;
        const mapName = currentMap ? currentMap.name : '未知区域';
        const layerText = (currentMap && currentMap.totalLayers === -1 ? '层（无限轮回）' : '/' + (currentMap ? currentMap.totalLayers : '?') + ' 层');
        R.drawText(mapName + ' · 第 ' + (game.currentLayer || 1) + layerText + '（全局第 ' + (game.currentFloor || 1) + ' 层）', PX + MAX_W / 2, y + 30, {
            fontSize: 12, color: t.textMuted, align: 'center'
        });
        return 48;
    }

    function drawPlayerCard(y) {
        const game = g();
        const t = R.Theme.get();
        const p = game.player;
        const pad = 14;
        const w = MAX_W - pad * 2;
        const x = PX + pad;
        const h0 = 150;
        const statAllocH = p.statPoints > 0 ? 96 : 0;
        const totalH = h0 + statAllocH + 22;

        box(PX, y, MAX_W, totalH, t.bgCard, 12);
        R.drawRect(PX, y, MAX_W, 1, { fill: t.borderSoft });

        let yy = y + 12;
        // 玩家信息标题（DOM 原版 h3 对齐）
        R.drawText('玩家信息', x, yy, { fontSize: 14, color: t.textPrimary, bold: true });
        yy += 22;
        // 行1：HP / 攻击 / 防御
        R.drawText('❤ ' + p.hp + '/' + p.maxHp, x, yy, { fontSize: 16, color: t.danger, bold: true });
        R.drawText('⚔ ' + Math.floor(p.attack), x + w / 2, yy, { fontSize: 15, color: t.orange, bold: true });
        R.drawText('🛡 ' + Math.floor(p.defense), x + w, yy, { fontSize: 15, color: t.info, align: 'right', bold: true });
        // 注册 tooltip
        bindStatTooltip('❤', 'hp', x, yy, w / 2, 20);
        yy += 24;
        // 行2：暴击/命中/闪避/先手（DOM 原版：基础命中/闪避（基础））
        R.drawText('暴击 ' + p.crit + '%', x, yy, { fontSize: 13, color: t.textMuted });
        R.drawText('基础命中 ' + p.hit + '%', x + w * 0.36, yy, { fontSize: 13, color: t.textMuted });
        R.drawText('闪避 ' + (p.dodgeRate || 0) + '%（基础）', x + w * 0.58, yy, { fontSize: 13, color: t.textMuted });
        R.drawText('先手 ' + p.speed, x + w, yy, { fontSize: 13, color: t.textMuted, align: 'right' });
        bindStatTooltip('', 'crit', x, yy, w * 0.36, 20);
        bindStatTooltip('', 'hit', x + w * 0.36, yy, w * 0.22, 20);
        bindStatTooltip('', 'dodgeRate', x + w * 0.58, yy, w * 0.24, 20);
        bindStatTooltip('', 'speed', x + w * 0.82, yy, w * 0.18, 20);
        yy += 22;
        // 行3：暴伤 + 提示
        R.drawText('暴伤 ' + p.critDamage + '%', x, yy, { fontSize: 12, color: t.textMuted });
        R.drawText('实际命中/闪避受双方敏捷影响', x + w, yy, { fontSize: 11, color: t.textFaint, align: 'right' });
        bindStatTooltip('', 'critDamage', x, yy, w * 0.38, 20);
        yy += 20;
        // 行4：等级/精华/天赋
        R.drawText(p.level + '级 (' + p.exp + '/' + p.expToNext + ')', x, yy, { fontSize: 13, color: t.textFaint });
        R.drawText('基因精华 ' + p.gold, x + w / 2, yy, { fontSize: 13, color: t.textFaint });
        R.drawText('天赋 ' + (p.equippedTalents || []).length + '/' + (game.getPassiveSlots ? game.getPassiveSlots() : 0), x + w, yy, { fontSize: 13, color: t.textFaint, align: 'right' });
        bindStatTooltip('', 'level', x, yy, w * 0.3, 20);
        bindStatTooltip('', 'essence', x + w * 0.3, yy, w * 0.3, 20);
        bindStatTooltip('', 'passiveSlots', x + w * 0.6, yy, w * 0.4, 20);
        yy += 22;
        // 分割线
        R.drawRect(x, yy, w, 1, { fill: t.borderPrimary });
        yy += 8;
        // 行5：五维
        const stats = [
            { k: 'strength', name: '力' }, { k: 'agility', name: '敏' }, { k: 'vitality', name: '体' },
            { k: 'perception', name: '感' }, { k: 'evolution', name: '进' }
        ];
        stats.forEach((s, i) => {
            const sx = x + i * (w / 5);
            R.drawText(s.name + ' ' + p[s.k], sx + (w / 5) / 2, yy, { fontSize: 13, color: t.textSecondary, align: 'center' });
            bindStatTooltip('', s.k, sx, yy, w / 5, 20);
        });
        yy += 20;

        // 属性点分配
        if (p.statPoints > 0) {
            yy += 4;
            box(x, yy, w, 72, t.bgSecondary, 8);
            R.drawText('可用属性点：' + p.statPoints + '（点击分配）', x + 10, yy + 8, { fontSize: 13, color: t.warning, bold: true });
            const btnW = (w - 20 - 8 * 4) / 5;
            stats.forEach((s, i) => {
                const by = yy + 32;
                R.drawButton({
                    id: 'statalloc_' + s.k,
                    x: x + 10 + i * (btnW + 8), y: by, w: btnW, h: 32,
                    text: s.name + '+1',
                    fontSize: 12, bg: t.success, color: '#ffffff',
                    onTap: (function (k) { return function () { try { game.allocateStat(k); } catch (e) {} }; })(s.k)
                });
            });
            yy += 80;
        }
        return totalH;
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

    // 环境法则
    function drawEnvironmentCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const currentMap = game.getCurrentMap ? game.getCurrentMap() : null;
        const envEff = game.getEnvironmentEffect ? game.getEnvironmentEffect() : null;

        let title = '探索', body = '继续探索，寻找更强的猎物...', color = t.accent;
        if (currentMap && envEff) {
            const isBossFloor = currentMap.totalLayers === -1 ? ((game.currentLayer || 1) % 5 === 0) : ((game.currentLayer || 1) >= (currentMap.totalLayers || 3));
            title = '【' + currentMap.name + '】';
            body = '环境法则：' + envEff.name + '\n' + envEff.desc + (isBossFloor ? '\n⚠ 前方是首领层，做好准备！' : '');
            color = isBossFloor ? t.danger : t.accent;
        } else if (currentMap && currentMap.environmentLaw) {
            title = '【' + currentMap.name + '】';
            body = '环境法则：' + currentMap.environmentLaw.name + '\n' + currentMap.environmentLaw.effect;
        }
        const lines = R.wrapText(body, w - 24, 13, false);
        const h = 40 + lines.length * 20 + 12;
        box(x - 14, y, w + 28, h, t.bgCard, 10);
        R.drawRect(x - 14, y, 4, h, { fill: color, radius: 2 });
        R.drawText(title, x, y + 10, { fontSize: 14, color: color, bold: true });
        R.drawText(body, x, y + 34, { fontSize: 13, color: t.textSecondary, maxWidth: w - 24, lineHeight: 20 });
        return h;
    }

    // 剧情卡
    function drawStoryCard(x, y, w) {
        const game = g();
        const t = R.Theme.get();
        const totalLines = game._storyLines.length;
        const line = game._storyLines[game._storyIdx];
        const isLast = game._storyIdx >= totalLines - 1;
        const lineNum = (game._storyIdx || 0) + 1;

        const lines = R.wrapText(line, w - 24, 14, false);
        const h = 50 + lines.length * 24 + 52;
        box(x - 14, y, w + 28, h, 'rgba(0,60,50,0.55)', 10);
        R.drawRect(x - 14, y, 4, h, { fill: t.accent, radius: 2 });
        R.drawText('剧情', x, y + 10, { fontSize: 15, color: t.accent, bold: true });
        R.drawText(lineNum + '/' + totalLines, x + w, y + 10, { fontSize: 12, color: t.textFaint, align: 'right' });
        R.drawText(line, x, y + 36, { fontSize: 14, color: t.textSecondary, maxWidth: w - 24, lineHeight: 24 });
        // 下一段按钮
        R.drawButton({
            id: 'storyNext',
            x: x, y: y + h - 46, w: 120, h: 36,
            text: isLast ? '完成' : '下一段',
            fontSize: 14, bg: t.accent, color: '#0a0e17',
            onTap: function () { try { game._storyNext(); } catch (e) {} }
        });
        R.drawText('点击继续阅读，或直接探索跳过', x + 130, y + h - 28, { fontSize: 11, color: t.textFaint });
        return h;
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
            R.drawRect(x, yy, w - 20, 1, { fill: t.borderPrimary });
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
        R.drawButton({
            id: 'exploreBtn', x: PX + 14, y: y, w: MAX_W - 28, h: 54,
            text: '探索前进', icon: 'map', fontSize: 18, bg: t.success, color: '#ffffff',
            onTap: function () { try { game.goExplore(); } catch (e) {} }
        });
        return 66;
    }

    function drawFeatureGrid(y) {
        const t = R.Theme.get();
        const game = g();
        const gap = 10;
        const w = (MAX_W - 28 - gap) / 2;
        const h = 50;
        const x0 = PX + 14;
        const feats = [
            { id: 'feat_talent', text: '天赋', icon: 'seedling', onTap: function () { game.openInRunTalentPanel(); } },
            { id: 'feat_status', text: '状态', icon: 'user', onTap: function () { game.openStatus(); } },
            { id: 'feat_inv', text: '背包', icon: 'bag', onTap: function () { game.openInventory(); } },
            { id: 'feat_sym', text: '共生体', icon: 'target', onTap: function () { game.openSymbiontPanel(); } }
        ];
        box(PX, y, MAX_W, h * 2 + gap + 20, t.bgCard, 12);
        feats.forEach(function (f, i) {
            const col = i % 2, row = Math.floor(i / 2);
            R.drawButton({
                id: f.id, x: x0 + col * (w + gap), y: y + 10 + row * (h + gap), w: w, h: h,
                text: f.text, icon: f.icon, fontSize: 15, bg: t.bgHover, color: t.textPrimary, border: t.borderSoft,
                onTap: f.onTap
            });
        });
        return h * 2 + gap + 20;
    }

    function drawMoreArea(y) {
        const t = R.Theme.get();
        const game = g();
        const h = 48;
        box(PX, y, MAX_W, h, t.bgCard, 12);
        // P2-3：展开菜单时若底部超出底栏遮挡区（排行/设置不可见），自动滚动到可见
        const NAV_H = 76; // 底部导航高度（含安全区）
        R.drawButton({
            id: 'moreToggle', x: PX, y: y, w: MAX_W, h: h,
            text: '更多功能 ' + (_moreOpen ? '▲' : '▼'),
            icon: 'bolt', iconSize: 15, fontSize: 15, bg: t.borderPrimary, color: t.textPrimary,
            onTap: (function (yy) {
                return function () {
                    _moreOpen = !_moreOpen;
                    // 展开菜单时关闭 tooltip，避免遮挡菜单项（P3-x）
                    try { if (game && game.hideTooltip) game.hideTooltip(); } catch (e) {}
                    if (_moreOpen) {
                        const areaH = 4 * (44 + 8) + 10;
                        const menuBottom = yy + h + areaH - _scrollY; // 菜单底部（屏幕坐标，yy 为未滚动坐标）
                        const need = menuBottom - (R.SCREEN_H - NAV_H);
                        if (need > _scrollY) _scrollY = need;
                    }
                };
            })(y)
        });
        let ret = h;
        if (_moreOpen) {
            const gap = 8;
            const w = (MAX_W - 28 - gap) / 2;
            const bh = 44;
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
            const rows = 4;
            const areaH = rows * (bh + gap) + 10;
            box(PX, y + h, MAX_W, areaH, t.bgCard, 12);
            items.forEach(function (it, i) {
                const col = i % 2, row = Math.floor(i / 2);
                R.drawButton({
                    id: it.id, x: PX + 14 + col * (w + gap), y: y + h + 8 + row * (bh + gap), w: w, h: bh,
                    text: it.text, icon: it.icon, iconSize: 14, fontSize: 14, bg: t.bgHover, color: t.textPrimary,
                    onTap: it.onTap
                });
            });
            ret += areaH;
        }
        return ret;
    }

    function drawGrowth(y) {
        const t = R.Theme.get();
        const game = g();
        const blocked = (game.currentFloor || 1) > 1;
        let h = 64;
        if (blocked) h += 56;
        box(PX, y, MAX_W, h, t.bgCard, 12);
        R.drawButton({
            id: 'growthBtn', x: PX + 14, y: y + 10, w: MAX_W - 28, h: 42,
            text: '局外成长（轮回空间）', fontSize: 15,
            bg: blocked ? 'rgba(90,106,101,0.35)' : t.warning, color: blocked ? t.textMuted : '#1a1206',
            disabled: blocked,
            onTap: function () { try { game.openGrowth(); } catch (e) {} }
        });
        if (blocked) {
            R.drawButton({
                id: 'suicideBtn', x: PX + 14, y: y + 58, w: MAX_W - 28, h: 38,
                text: '结束轮回（自杀）', icon: 'shield', iconSize: 14, fontSize: 14, bg: t.danger, color: '#ffffff',
                onTap: function () { try { game.suicide(); } catch (e) {} }
            });
            R.drawText('轮回空间仅在死亡后可进入，当前探索进度将保留', PX + MAX_W / 2, y + 104, { fontSize: 11, color: t.textMuted, align: 'center' });
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
        ctx.translate(0, -_scrollY);
        Input.setScrollOffset(_scrollY);

        let y = 0;
        y += drawTopBar(y);
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
