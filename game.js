// ============================================================
//  吞噬无限进化 - 五维属性系统
//  力量/敏捷/体质/感知/进化 → 衍生战斗属性
// ============================================================

const game = {
    // ========== 广告管理模块（TapTap小游戏） ==========
    adManager: {
        config: {
            rewardedVideoAdUnitId: 'YOUR_REWARDED_VIDEO_AD_UNIT_ID',
            interstitialAdUnitId: 'YOUR_INTERSTITIAL_AD_UNIT_ID',
        },
        _rewardedVideoAd: null,
        _interstitialAd: null,
        _pendingCallback: null,
        _pendingType: null,

        init() {
            if (typeof tt !== 'undefined' && tt.createRewardedVideoAd) {
                console.log('[AdManager] TapTap环境，初始化广告SDK');
                this._rewardedVideoAd = tt.createRewardedVideoAd({
                    adUnitId: this.config.rewardedVideoAdUnitId
                });
                this._rewardedVideoAd.onClose((res) => {
                    if (res && res.isEnded) {
                        this._grantReward();
                    } else {
                        if (typeof game !== 'undefined') game.appendBattleLog('广告未完整观看，无法获得奖励', 'log-info');
                    }
                    this._clearPending();
                });
                this._rewardedVideoAd.onError((err) => {
                    console.error('[AdManager] 广告错误:', err);
                    if (typeof game !== 'undefined') game.appendBattleLog('广告加载失败，请稍后重试', 'log-info');
                    this._clearPending();
                });
                if (tt.createInterstitialAd) {
                    this._interstitialAd = tt.createInterstitialAd({
                        adUnitId: this.config.interstitialAdUnitId
                    });
                }
            } else {
                console.log('[AdManager] 非TapTap环境，使用模拟广告');
            }
        },

        showRewardedVideo(adType, callback) {
            this._pendingCallback = callback;
            this._pendingType = adType;
            if (this._rewardedVideoAd) {
                this._rewardedVideoAd.show().catch(() => {
                    this._rewardedVideoAd.load().then(() => {
                        this._rewardedVideoAd.show();
                    }).catch((err) => {
                        console.error('[AdManager] 广告加载失败:', err);
                        this._clearPending();
                    });
                });
            } else {
                console.log(`[AdManager] 模拟广告: ${adType}`);
                setTimeout(() => {
                    this._grantReward();
                    this._clearPending();
                }, 1500);
            }
        },

        showInterstitial() {
            if (this._interstitialAd) {
                this._interstitialAd.show().catch((err) => {
                    console.error('[AdManager] 插屏广告错误:', err);
                });
            }
        },

        _grantReward() {
            const callback = this._pendingCallback;
            console.log(`[AdManager] 发放广告奖励: ${this._pendingType}`);
            if (callback) callback(true);
        },

        _clearPending() {
            this._pendingCallback = null;
            this._pendingType = null;
        },
    },

    // 广告场景定义
    adScenes: {
        fragment_upgrade: { name: '基因升阶', description: '观看广告，碎片必升阶并指定标签' },
        boss_core_double: { name: '核心翻倍', description: '观看广告，本次Boss核心掉落×2' },
        essence_daily: { name: '精华领取', description: '观看广告，领取神话精华（每日3次）', dailyLimit: 3 },
        death_revive: { name: '死亡复活', description: '观看广告，以30%生命复活（每局限1次）', runLimit: 1 },
    },

    // ========== 剧情系统 ==========
    storyData: {
        opening: [
            "冰冷的培养皿中，你睁开了眼。",
            "你是编号X-001的实验体，被注入了传说中的'无限吞噬基因'。",
            "警报声突然响起，设备故障，培养皿的玻璃碎裂。",
            "你顺着排水管道逃入了城市的下水道，原始的吞噬本能开始觉醒。",
            "活下去，吞噬一切，重走那条属于你的进化之路。"
        ],
        eraStories: {
            modern: { name: "现代世界", text: ["你从下水道爬出，进入了人类的城市。", "钢铁与混凝土的丛林中，无数现代生物在活动。", "吞噬它们，获取它们的基因，让自己变得更强。"] },
            ice_age: { name: "冰河世纪", text: ["基因深处的记忆被唤醒，你穿越到了两万年前的冰河世纪。", "无尽的冰雪覆盖了大地，猛犸象、剑齿虎在雪原上漫步。", "适应严寒，吞噬巨兽，在冰河时代留下你的传说。"] },
            dragon_age: { name: "巨龙时代", text: ["炽热的龙息照亮了天空，你来到了巨龙统治的时代。", "山脉中盘踞着远古巨龙，火山深处沉睡着炎魔。", "挑战巨龙，吞噬它们的力量，成为新的霸主。"] },
            insect_age: { name: "巨虫时代", text: ["潮湿的空气中弥漫着信息素，你进入了巨虫横行的时代。", "三米长的蜈蚣、车轮大的蜘蛛、成群的食肉蚂蚁...", "在虫群的包围中生存，吞噬虫后的基因，成为虫群之主。"] },
            life_landing: { name: "生命登陆", text: ["你回到了生命刚刚登陆的时代，浅海中孕育着最初的脊椎动物。", "总鳍鱼正在尝试用鳍行走，两栖动物在泥沼中挣扎。", "见证生命的奇迹，吞噬那些勇敢的先驱者，推动进化的车轮。"] },
            primordial_ocean: { name: "原始海洋", text: ["温暖的原始海洋中，生命刚刚诞生。", "单细胞生物在汤池中漂浮，多细胞生物在尝试聚合。", "回到起点，吞噬那些最原始的生命，找回你失落的记忆。"] },
            legend_realm: { name: "传说领域", text: ["你突破了现实的边界，进入了传说中的领域。", "圣剑之主、神魔之主、圣殿之主...这些只存在于传说中的存在正在等待你。", "击败传说，吞噬神格，让自己也成为传说。"] },
            mythic_sky: { name: "神话苍穹", text: ["你登上了神话的苍穹，众神在云端俯视着你。", "天门守护者、众神之主、创世神...这些神话中的至高存在正在审视你。", "挑战众神，吞噬神性，达到进化的顶点。"] },
            chaos_reincarnation: { name: "混沌轮回", text: ["你来到了一切的终点与起点——混沌轮回。", "混沌之主、轮回之主、虚空之主...这些超越时空的存在正在沉睡。", "这是你最后的试炼，吞噬混沌，超越轮回，成为真正的无限。"] }
        },
        // 7个章节的过渡事件（进入新章节第一张地图时触发，含微增益）
        chapterTransitions: [
            {
                chapter: 1,
                name: '起源之汤',
                startMapIndex: 0,
                text: [
                    '温暖的原始汤中，你第一次睁开了"眼"——那还不是真正的眼睛，只是一团对光线敏感的蛋白质。',
                    '周围是无尽的有机物，你感到一种原始的饥饿在体内涌动。',
                    '吞噬吧，这是进化的第一步。'
                ],
                buff: { type: 'maxHp', value: 10, desc: '最大生命+10（章节加成）' }
            },
            {
                chapter: 2,
                name: '登陆之时',
                startMapIndex: 5,
                text: [
                    '潮水退去，你第一次感受到了空气——那是一种陌生而又充满机遇的介质。',
                    '你的鳍开始变形，逐渐能够支撑你在陆地上爬行。',
                    '陆地，是进化的下一个战场。'
                ],
                buff: { type: 'attack', value: 2, desc: '攻击力+2（章节加成）' }
            },
            {
                chapter: 3,
                name: '冰河纪元',
                startMapIndex: 8,
                text: [
                    '气温骤降，冰雪覆盖了大地。你感到体内的血液开始凝固。',
                    '为了生存，你的体型开始变大——更大的体型意味着更小的表面积与体积比，更容易保持体温。',
                    '冰河时代，是体型的竞赛。'
                ],
                buff: { type: 'defense', value: 2, desc: '防御力+2（章节加成）' }
            },
            {
                chapter: 4,
                name: '巨龙时代',
                startMapIndex: 11,
                text: [
                    '炽热的龙息照亮了天空，你来到了巨龙统治的时代。',
                    '山脉中盘踞着远古巨龙，火山深处沉睡着炎魔。',
                    '你的鳞片开始硬化，你感到体内有一股火焰在燃烧。',
                    '挑战巨龙，吞噬它们的力量，成为新的霸主。'
                ],
                buff: { type: 'maxHp', value: 20, desc: '最大生命+20（章节加成）' }
            },
            {
                chapter: 5,
                name: '族群觉醒',
                startMapIndex: 14,
                text: [
                    '潮湿的空气中弥漫着信息素，你进入了巨虫横行的时代。',
                    '三米长的蜈蚣、车轮大的蜘蛛、成群的食肉蚂蚁...',
                    '你开始理解"族群"的意义——单独的个体很脆弱，但团结的族群可以战胜一切。',
                    '在虫群的包围中生存，吞噬虫后的基因，成为虫群之主。'
                ],
                buff: { type: 'speed', value: 2, desc: '先手值+2（章节加成）' }
            },
            {
                chapter: 6,
                name: '封神之路',
                startMapIndex: 16,
                text: [
                    '你突破了现实的边界，进入了传说中的领域。',
                    '圣剑之主、神魔之主、圣殿之主...这些只存在于传说中的存在正在等待你。',
                    '你感到体内的基因正在发生质变——你不再是普通的生物，你正在走向神的领域。',
                    '击败传说，吞噬神格，让自己也成为传说。'
                ],
                buff: { type: 'crit', value: 5, desc: '暴击率+5%（章节加成）' }
            },
            {
                chapter: 7,
                name: '超越存在',
                startMapIndex: 22,
                text: [
                    '你来到了一切的终点与起点——混沌轮回。',
                    '混沌之主、轮回之主、虚空之主...这些超越时空的存在正在沉睡。',
                    '你感到自己的存在开始变得模糊——你不再是一个个体，而是一种可能性。',
                    '这是你最后的试炼，吞噬混沌，超越轮回，成为真正的无限。'
                ],
                buff: { type: 'all', value: 5, desc: '全属性+5%（章节加成）' }
            }
        ],
        // 进化抉择数据（7个章节，每章二选一）
        evolutionChoices: [
            {
                chapter: 1,
                title: '第一章·起源之汤 - 进化抉择',
                description: '你吞噬了起源之汤的顶点生物，基因开始发生根本性的变化。你要选择怎样的进化方向？',
                options: [
                    { id: 'cell_division', name: '细胞分裂', desc: '最大生命+15%，每回合回复2%最大生命', buff: { maxHp: 15, hpRegen: 2 } },
                    { id: 'devour_enhance', name: '吞噬强化', desc: '攻击力+10%，吞噬敌人获得的碎片+10%', buff: { attack: 10, fragmentBonus: 10 } }
                ]
            },
            {
                chapter: 2,
                title: '第二章·登陆之时 - 进化抉择',
                description: '你离开了海洋，踏上了陆地。你的身体需要适应全新的环境。',
                options: [
                    { id: 'skin_harden', name: '表皮硬化', desc: '防御力+15%，受到的物理伤害-5%', buff: { defense: 15, physicalResist: 5 } },
                    { id: 'swift_nerve', name: '敏捷神经', desc: '速度+15%，先手值+5，闪避率+5%', buff: { speed: 15, firstStrike: 5, dodge: 5 } }
                ]
            },
            {
                chapter: 3,
                title: '第三章·冰河纪元 - 进化抉择',
                description: '极端的寒冷考验着你的生存能力。你要如何应对冰河时代？',
                options: [
                    { id: 'cold_resist', name: '耐寒基因', desc: '受到的所有伤害-10%，每回合回复1%最大生命', buff: { allResist: 10, hpRegen: 1 } },
                    { id: 'hot_blood', name: '热血沸腾', desc: '暴击率+10%，暴击伤害+15%，但受到的伤害+5%', buff: { crit: 10, critDamage: 15, damageTaken: 5 } }
                ]
            },
            {
                chapter: 4,
                title: '第四章·巨龙时代 - 进化抉择',
                description: '巨型生物统治了这个时代。你要选择巨龙之躯还是疾风之翼？',
                options: [
                    { id: 'dragon_body', name: '巨龙之躯', desc: '最大生命+30%，防御力+10%，但速度-10%', buff: { maxHp: 30, defense: 10, speed: -10 } },
                    { id: 'wind_wing', name: '疾风之翼', desc: '速度+20%，闪避率+10%，先手值+10，但最大生命-10%', buff: { speed: 20, dodge: 10, firstStrike: 10, maxHp: -10 } }
                ]
            },
            {
                chapter: 5,
                title: '第五章·族群觉醒 - 进化抉择',
                description: '社会性生物开始崛起。你要选择毒腺进化还是利刃强化？',
                options: [
                    { id: 'poison_gland', name: '毒腺进化', desc: '中毒伤害+30%，中毒持续时间+1回合，敌人命中率-5%', buff: { poisonDamage: 30, poisonDuration: 1, enemyHit: -5 } },
                    { id: 'blade_enhance', name: '利刃强化', desc: '暴击伤害+30%，无视防御+10%，但命中率-5%', buff: { critDamage: 30, armorPenetration: 10, hit: -5 } }
                ]
            },
            {
                chapter: 6,
                title: '第六章·封神之路 - 进化抉择',
                description: '你触及了神的领域。你要窃取神力还是自身成神？',
                options: [
                    { id: 'steal_power', name: '窃取神力', desc: '技能冷却-20%，技能消耗-10%，但普攻伤害-10%', buff: { cooldown: -20, skillCost: -10, normalDamage: -10 } },
                    { id: 'become_god', name: '自身成神', desc: '普攻伤害+25%，暴击率+10%，但技能伤害-10%', buff: { normalDamage: 25, crit: 10, skillDamage: -10 } }
                ]
            },
            {
                chapter: 7,
                title: '第七章·超越存在 - 最终抉择',
                description: '你站在了存在的顶点。这是你最终的选择，它将决定你的结局。',
                options: [
                    { id: 'become_void', name: '成为虚无', desc: '结局A：吞噬一切，成为新的虚无。游戏通关，解锁"虚无之主"称号。', buff: { ending: 'void' } },
                    { id: 'eternal_cycle', name: '永恒轮回', desc: '结局B：选择无限循环，解锁新游戏+模式，每次轮回永久属性+3%。', buff: { ending: 'eternal', perRunBonus: 3 } }
                ]
            }
        ],
        // 获取当前章节
        getCurrentChapter(mapIndex) {
            let currentChapter = 1;
            for (const transition of this.chapterTransitions) {
                if (mapIndex >= transition.startMapIndex) {
                    currentChapter = transition.chapter;
                }
            }
            return currentChapter;
        },
        // 获取章节过渡事件
        getChapterTransition(mapIndex) {
            for (const transition of this.chapterTransitions) {
                if (mapIndex === transition.startMapIndex) {
                    return transition;
                }
            }
            return null;
        },
        getEraByMapIndex(index) {
            if (index <= 8) return 'modern';
            if (index <= 11) return 'ice_age';
            if (index <= 14) return 'dragon_age';
            if (index <= 17) return 'insect_age';
            if (index <= 20) return 'life_landing';
            if (index <= 23) return 'primordial_ocean';
            if (index <= 26) return 'legend_realm';
            if (index <= 29) return 'mythic_sky';
            return 'chaos_reincarnation';
        }
    },

    showStory(storyLines, callback) {
        if (!storyLines || storyLines.length === 0) {
            if (callback) callback();
            return;
        }
        // 如果不在主界面，先切换到主界面
        if (document.getElementById('mainScreen').classList.contains('active')) {
            // 已经在主界面
        } else {
            this.showScreen('mainScreen');
        }
        
        let currentLine = 0;
        const self = this;
        const totalLines = storyLines.length;
        
        const showNextLine = () => {
            if (currentLine >= totalLines) {
                // 剧情阅读完成，恢复显示环境法则
                self.showRandomStory();
                if (callback) callback();
                return;
            }
            const line = storyLines[currentLine];
            const isLast = currentLine >= totalLines - 1;
            const lineNum = currentLine + 1;
            
            // 在主界面的storyText元素中显示剧情
            const storyText = document.getElementById('storyText');
            if (storyText) {
                let html = '<div style="padding:15px;background:linear-gradient(135deg,rgba(0,60,50,0.6),rgba(0,30,40,0.6));border-left:4px solid var(--accent-primary);border-radius:8px;margin:10px 0">';
                html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">';
                html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;color:var(--accent-primary)"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
                html += '<span style="color:var(--accent-primary);font-weight:bold;font-size:16px">剧情</span>';
                html += '<span style="color:var(--text-faint);font-size:12px;margin-left:auto">' + lineNum + '/' + totalLines + '</span>';
                html += '</div>';
                html += '<div style="color:var(--text-secondary);font-size:14px;line-height:1.8;margin-bottom:12px;white-space:pre-line">' + line + '</div>';
                html += '<div style="display:flex;gap:10px;align-items:center">';
                html += '<button onclick="game._storyNext()" style="padding:8px 16px;background:var(--accent-primary);color:var(--bg-card);border:none;border-radius:6px;font-size:13px;font-weight:bold;cursor:pointer;min-height:36px">' + (isLast ? '完成' : '下一段') + '</button>';
                html += '<span style="color:var(--text-faint);font-size:12px">点击继续阅读，或直接探索跳过</span>';
                html += '</div>';
                html += '</div>';
                storyText.innerHTML = html;
            }
            
            // 保存回调
            self._storyCallback = () => {
                currentLine++;
                showNextLine();
            };
            self._storyFinalCallback = callback;
        };
        showNextLine();
    },
    
    // 剧情下一步
    _storyNext() {
        if (this._storyCallback) {
            this._storyCallback();
        }
    },

    // ========== 局内状态 ==========
    player: {
        // 五维基础属性
        strength: 6,      // 力量 → 攻击力
        agility: 6,       // 敏捷 → 先手/闪避
        vitality: 6,      // 体质 → 生命/防御
        perception: 6,    // 感知 → 暴击/命中
        evolution: 6,     // 进化 → 天赋强度/能量获取

        // 衍生属性（由calcDerivedStats计算）
        maxHp: 100, hp: 100,
        attack: 10, defense: 2,
        crit: 5, critDamage: 150,
        hit: 85, speed: 5,
        energy: 100, maxEnergy: 100,

        // 其他
        gold: 0, exp: 0, level: 1, expToNext: 20,
        statPoints: 0,    // 可分配属性点
        // 局内五维获得记录（用于死亡转化）
        runStrGained: 0, runAgiGained: 0, runVitGained: 0,
        runPerGained: 0, runEvoGained: 0,
        equippedTalents: [],
        activeSkills: [],  // 已装备的主动技能ID列表（最多6个）
        skillCooldowns: {}  // 技能冷却追踪 {skillId: 剩余回合数}
    },
    currentFloor: 1,
    currentMap: null,
    inBattle: false,
    currentEnemy: null,
    battleLog: [],
    playerTurn: true,
    settings: { eventDetail: true, battleSpeed: 'normal' },

    // ========== 局外永久数据 ==========
    permanent: {
        freePoints: 0,
        fragments: {1:0, 2:0, 3:0, 4:0, 5:0},
        unlockedTalents: [],
        talentLevels: {},  // {talentId: level}，未解锁的天赋等级为0
        talentPoints: 0,   // 天赋点，用于升级天赋
        bossCores: {},     // {bossId: count} Boss核心
        essence: 0,        // 进化精粹，用于局外强化和槽位解锁
        essenceUpgrades: {strength:0, agility:0, vitality:0, perception:0, evolution:0, hp:0},  // 进化精粹强化等级
        passiveSlots: 4,   // 被动槽数量
        activeSlots: 3,    // 主动槽数量
        symbionts: [],     // 共生体背包
        equippedSymbionts: {},  // 已装备共生体 {slot: symbiontId}
        // 永久五维加成
        bonusStats: {strength:0, agility:0, vitality:0, perception:0, evolution:0}
    },

    // ========== JSON数据 ==========
    data: {enemies:null, maps:null, narratives:null, shop:null, talents:null},

    qualityNames: ["", "普通", "稀有", "史诗", "传说", "神话"],
    qualityColors: ["", "var(--text-primary)", "var(--accent-info)", "var(--accent-purple)", "var(--accent-warning)", "var(--accent-danger)"],

    // 基因精华获取倍率：前3层+40%，4-6层+20%，7层后正常
    getGoldMultiplier() {
        const floor = this.currentFloor || 1;
        if (floor <= 3) return 1.4;
        if (floor <= 6) return 1.2;
        return 1.0;
    },

    // 天赋体系标签名称
    tagNames: {
        1: "物理系", 2: "血系", 3: "毒系", 4: "雷系", 5: "缚系",
        6: "火系", 7: "冰系", 8: "体魄系", 9: "甲壳系", 10: "再生系",
        11: "拟态系", 12: "反伤系", 13: "骨骼系", 14: "翼系", 15: "速系",
        17: "影系", 18: "水系", 20: "热感系", 21: "感知系", 22: "声系",
        23: "灵能系", 24: "进化系", 25: "神系", 26: "终极系", 27: "巨兽系", 28: "群体系"
    },
    // 天赋筛选状态
    talentFilter: { quality: 0, tag: 0, showOnlyUnlockable: false },
    talentSearchKeyword: '',

    // 五维中文名和说明
    statInfo: {
        strength:   {name:"力量", desc:"每点+2攻击力"},
        agility:    {name:"敏捷", desc:"每点+1先手，影响闪避"},
        vitality:   {name:"体质", desc:"每点+8生命，+0.4防御"},
        perception: {name:"感知", desc:"每点+0.8暴击，+0.2命中"},
        evolution:  {name:"进化", desc:"每点天赋效果+1%"}
    },

    // ============================================================
    //  初始化
    // ============================================================
    // SVG图标库 - 统一风格，单色可换色（currentColor）
    // ============================================================
    icons: {
        gene: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 4c4 0 4 16 8 16s4-16 8-16\"/><path d=\"M4 20c4 0 4-16 8-16s4 16 8 16\"/><line x1=\"7\" y1=\"8\" x2=\"17\" y2=\"8\"/><line x1=\"7\" y1=\"16\" x2=\"17\" y2=\"16\"/></svg>',
        star: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg>',
        spark: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24\"/></svg>',
        heart: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg>',
        bolt: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg>',
        shield: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>',
        droplet: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"/></svg>',
        sword: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>',
        run: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"13\" cy=\"4\" r=\"2\"/><path d=\"M4 22l4-7 4 2 3-5 3 3\"/><path d=\"M10 11l3-3 3 1\"/></svg>',
        bag: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"/><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg>',
        target: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg>',
        eye: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>',
        home: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>',
        user: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>',
        settings: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>',
        shop: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"9\" cy=\"21\" r=\"1\"/><circle cx=\"20\" cy=\"21\" r=\"1\"/><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"/></svg>',
        trophy: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/></svg>',
        clipboard: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"/><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\" ry=\"1\"/></svg>',
        calendar: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>',
        search: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>',
        plus: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>',
        minus: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>',
        check: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg>',
        x: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>',
        arrowLeft: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>',
        arrowRight: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/><polyline points=\"12 5 19 12 12 19\"/></svg>',
        chevronDown: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"/></svg>',
        chevronUp: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"18 15 12 9 6 15\"/></svg>',
        info: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/></svg>',
        warning: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>',
        skull: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2 6v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3c1-1.5 2-3.5 2-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1\"/><circle cx=\"15\" cy=\"12\" r=\"1\"/><path d=\"M9 18v2M15 18v2M12 18v2\"/></svg>',
        map: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/></svg>',
        book: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg>',
        gift: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 12 20 22 4 22 4 12\"/><rect x=\"2\" y=\"7\" width=\"20\" height=\"5\"/><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"7\"/><path d=\"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z\"/><path d=\"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z\"/></svg>',
        coin: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v12M9 9h4.5a2 2 0 0 1 0 4H9\"/></svg>',
        gem: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3L8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg>',
        flask: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2\"/><path d=\"M8.5 2h7\"/><path d=\"M7 16h10\"/></svg>',
        dna: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 4c4 0 4 16 8 16s4-16 8-16\"/><path d=\"M4 20c4 0 4-16 8-16s4 16 8 16\"/><line x1=\"7\" y1=\"8\" x2=\"17\" y2=\"8\"/><line x1=\"7\" y1=\"16\" x2=\"17\" y2=\"16\"/></svg>',
        bug: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"8\" y=\"6\" width=\"8\" height=\"14\" rx=\"4\"/><path d=\"M12 6V2\"/><path d=\"M9 2l3 4 3-4\"/><path d=\"M8 10H4\"/><path d=\"M8 14H4\"/><path d=\"M8 18H4\"/><path d=\"M16 10h4\"/><path d=\"M16 14h4\"/><path d=\"M16 18h4\"/></svg>',
        leaf: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z\"/><path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\"/></svg>',
        flame: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg>',
        snowflake: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"/><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><path d=\"M20 16l-4-4 4-4\"/><path d=\"M4 8l4 4-4 4\"/><path d=\"M16 4l-4 4-4-4\"/><path d=\"M8 20l4-4 4 4\"/></svg>',
        wind: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2\"/></svg>',
        poison: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"/><path d=\"M9 13h6M10 16h4\"/></svg>',
        lock: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>',
        unlock: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"/></svg>',
        refresh: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"23 4 23 10 17 10\"/><polyline points=\"1 20 1 14 7 14\"/><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"/></svg>',
        download: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>',
        upload: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"/></svg>',
        trash: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"3 6 5 6 21 6\"/><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/></svg>',
        edit: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>',
        save: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"/><polyline points=\"17 21 17 13 7 13 7 21\"/><polyline points=\"7 3 7 8 15 8\"/></svg>',
        play: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"5 3 19 12 5 21 5 3\"/></svg>',
        pause: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>',
        stop: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\"/></svg>',
        skip: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"5 4 15 12 5 21 5 4\"/><line x1=\"19\" y1=\"5\" x2=\"19\" y2=\"19\"/></svg>',
        volume: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"/></svg>',
        mute: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"/><line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"/></svg>',
        bell: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9\"/><path d=\"M13.73 21a2 2 0 0 1-3.46 0\"/></svg>',
        message: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>',
        clock: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>',
        timer: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"13\" r=\"8\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"9\" y1=\"2\" x2=\"15\" y2=\"2\"/><line x1=\"12\" y1=\"13\" x2=\"15\" y2=\"15\"/></svg>',
        layers: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 2 7 12 12 22 7 12 2\"/><polyline points=\"2 17 12 22 22 17\"/><polyline points=\"2 12 12 17 22 12\"/></svg>',
        grid: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/></svg>',
        list: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"/><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"/><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"/><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"/><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"/><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"/></svg>',
        filter: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/></svg>',
        sort: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h18M3 12h12M3 18h6\"/><path d=\"M17 8l4 4-4 4\"/></svg>',
        more: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"19\" cy=\"12\" r=\"1\"/><circle cx=\"5\" cy=\"12\" r=\"1\"/></svg>',
        menu: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"/><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"/><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"/></svg>',
        external: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/><polyline points=\"15 3 21 3 21 9\"/><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"/></svg>',
        link: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>',
        copy: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>',
        share: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"/><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"/></svg>',
        heartFilled: '<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg>',
        starFilled: '<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg>',
        seedling: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 20h10\"/><path d=\"M10 20c5.5-2.5.8-6.4 3-10\"/><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\"/><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\"/></svg>',
        heartGreen: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-success)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg>',
        battery: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"7\" width=\"18\" height=\"10\" rx=\"2\" ry=\"2\"/><line x1=\"22\" y1=\"11\" x2=\"22\" y2=\"13\"/><line x1=\"6\" y1=\"10\" x2=\"6\" y2=\"14\"/><line x1=\"10\" y1=\"10\" x2=\"10\" y2=\"14\"/></svg>',
        box: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/></svg>',
        meat: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a10 10 0 0 1 0 20\"/><circle cx=\"8\" cy=\"10\" r=\"2\"/><circle cx=\"16\" cy=\"14\" r=\"2\"/></svg>',
        upgrade: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 19V5\"/><polyline points=\"5 12 12 5 19 12\"/></svg>',
        daily: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/><path d=\"M9 16l2 2 4-4\"/></svg>',
        weekly: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/><path d=\"M8 14h2v4H8z\"/><path d=\"M14 14h2v4h-2z\"/></svg>',
        trendUp: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/></svg>',
    },
    
    // 获取SVG图标
    getIcon(name, size = 16) {
        const icon = this.icons[name];
        if (!icon) return '';
        return '<span class="game-icon" style="width:' + size + 'px;height:' + size + 'px;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle">' + icon + '</span>';
    },

    // ============================================================
    init() {
        this.loadPermanent();
        this.loadAllJson();
        // 初始化主题
        this.initTheme();
        
        // 全局覆盖原生alert/confirm为游戏内弹窗（防止阻塞浏览器）
        const self = this;
        window.alert = function(msg) {
            self.showGameAlert('提示', String(msg));
        };
        window.confirm = function(msg) {
            console.warn('原生confirm已被覆盖，请使用game.showGameConfirm()');
            self.showGameAlert('确认', String(msg));
            return true;
        };
        
        // 初始化广告SDK（TapTap小游戏）
        if (this.adManager && this.adManager.init) {
            this.adManager.init();
        }
    },

    loadPermanent() {
        try {
            const saved = localStorage.getItem('tunshi_save_v2');
            if (saved) {
                this.permanent = JSON.parse(saved);
                // 标签exclusive碎片：fragments[tag][quality]
                if (!this.permanent.tagFragments) this.permanent.tagFragments = {};
                // universal碎片：universalFragments[quality]
                if (!this.permanent.universalFragments) this.permanent.universalFragments = {1:0,2:0,3:0,4:0,5:0};
                // 兼容旧数据：把旧的通用碎片转换为universal碎片
                if (this.permanent.fragments && Array.isArray(this.permanent.fragments)) {
                    for (let q=1; q<=5; q++) {
                        if (this.permanent.universalFragments[q]) {
                            this.permanent.universalFragments[q] = (this.permanent.universalFragments[q] || 0) + this.permanent.universalFragments[q];
                        }
                    }
                    delete this.permanent.fragments;
                }
                if (this.permanent.fragments && typeof this.permanent.fragments === 'object' && !this.permanent.tagFragments._migrated) {
                    // 旧格式fragments是{1:count,2:count,...}，转换为universal碎片
                    let hasOld = false;
                    for (let q=1; q<=5; q++) {
                        if (this.permanent.universalFragments[q] && typeof this.permanent.universalFragments[q] === 'number') {
                            this.permanent.universalFragments[q] = (this.permanent.universalFragments[q] || 0) + this.permanent.universalFragments[q];
                            hasOld = true;
                        }
                    }
                    if (hasOld) {
                        this.permanent.tagFragments._migrated = true;
                        delete this.permanent.fragments;
                    }
                }
                if (!this.permanent.unlockedTalents) this.permanent.unlockedTalents = [];
                if (!this.permanent.bonusStats) this.permanent.bonusStats = {strength:0,agility:0,vitality:0,perception:0,evolution:0};
                if (!this.permanent.symbionts) this.permanent.symbionts = [];
                if (!this.permanent.equippedSymbionts) this.permanent.equippedSymbionts = {};
            }
        } catch(e) { console.warn("存档读取失败", e); }
    },

    // ========== 标签碎片辅助函数 ==========
    // 获取某标签某品质的碎片数量（exclusive+universal）
    getTagFragmentCount(tag, quality) {
        if (!this.permanent.tagFragments) this.permanent.tagFragments = {};
        if (!this.permanent.tagFragments[tag]) this.permanent.tagFragments[tag] = {1:0,2:0,3:0,4:0,5:0};
        const exclusive = this.permanent.tagFragments[tag][quality] || 0;
        const universal = this.permanent.universalFragments ? (this.permanent.universalFragments[quality] || 0) : 0;
        return exclusive + universal;
    },
    // 添加标签exclusive碎片
    addTagFragment(tag, quality, count) {
        if (!this.permanent.tagFragments) this.permanent.tagFragments = {};
        if (!this.permanent.tagFragments[tag]) this.permanent.tagFragments[tag] = {1:0,2:0,3:0,4:0,5:0};
        this.permanent.tagFragments[tag][quality] = (this.permanent.tagFragments[tag][quality] || 0) + count;
    },
    // 消耗碎片（优先exclusive，再universal），返回是否成功
    consumeFragments(tag, quality, count) {
        const total = this.getTagFragmentCount(tag, quality);
        if (total < count) return false;
        if (!this.permanent.tagFragments) this.permanent.tagFragments = {};
        if (!this.permanent.tagFragments[tag]) this.permanent.tagFragments[tag] = {1:0,2:0,3:0,4:0,5:0};
        let remaining = count;
        // 先消耗exclusive
        const exclusive = this.permanent.tagFragments[tag][quality] || 0;
        const consumeExclusive = Math.min(exclusive, remaining);
        this.permanent.tagFragments[tag][quality] -= consumeExclusive;
        remaining -= consumeExclusive;
        // 再消耗universal
        if (remaining > 0 && this.permanent.universalFragments) {
            this.permanent.universalFragments[quality] = (this.permanent.universalFragments[quality] || 0) - remaining;
        }
        return true;
    },

    // 初始化主题
    initTheme() {
        try {
            const savedTheme = localStorage.getItem('tunshi_theme') || 'dark';
            this.applyTheme(savedTheme);
            // 延迟更新按钮高亮状态（确保DOM已加载）
            setTimeout(() => this.updateThemeButtons(), 100);
        } catch(e) { console.warn('初始化主题失败', e); }
    },

    // 应用主题
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
    },

    // 切换主题（三个主题循环）
    toggleTheme() {
        const themes = ['dark', 'warm', 'light'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const newIndex = (currentIndex + 1) % themes.length;
        const newTheme = themes[newIndex];
        this.applyTheme(newTheme);
        try {
            localStorage.setItem('tunshi_theme', newTheme);
        } catch(e) { console.warn('保存主题失败', e); }
        const themeNames = {dark: '深色（生物实验室）', warm: '复古标本册', light: '现代清爽'};
        this.showGameAlert('主题切换', `已切换到${themeNames[newTheme]}主题`);
    },

    // 设置主题（支持三个主题：dark/warm/light）
    setTheme(theme) {
        if (theme !== 'dark' && theme !== 'warm' && theme !== 'light') return;
        this.applyTheme(theme);
        try {
            localStorage.setItem('tunshi_theme', theme);
        } catch(e) { console.warn('保存主题失败', e); }
        // 更新主题切换按钮的高亮状态
        this.updateThemeButtons();
    },
    
    // 更新主题切换按钮的高亮状态
    updateThemeButtons() {
        const buttons = {
            dark: document.getElementById('btnThemeDark'),
            warm: document.getElementById('btnThemeWarm'),
            light: document.getElementById('btnThemeLight')
        };
        for (const key in buttons) {
            const btn = buttons[key];
            if (!btn) continue;
            if (key === this.currentTheme) {
                btn.style.color = 'var(--accent-primary)';
                btn.style.borderColor = 'var(--accent-primary)';
                btn.style.background = 'var(--bg-secondary)';
            } else {
                btn.style.color = 'var(--text-secondary)';
                btn.style.borderColor = 'var(--text-secondary)';
                btn.style.background = 'var(--bg-secondary)';
            }
        }
    },

    // 获得物品提醒（装备/技能）
    showItemObtainedPopup(itemType, itemData, onEquip) {
        const typeNames = {symbiont: '共生体', skill: '技能', talent: '天赋'};
        const qualityColors = ['', 'var(--quality-common)', 'var(--quality-rare)', 'var(--quality-epic)', 'var(--accent-orange)', 'var(--accent-danger)'];
        const qualityNames = ['', '普通', '稀有', '史诗', '传说', '神话'];
        
        let html = '<div style="text-align:center;padding:10px">';
        html += '<div style="font-size:18px;color:var(--accent-warning);margin-bottom:10px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M5.8 11.3L2 22l10.7-3.8\"/><path d=\"M4 3h.01\"/><path d=\"M22 8h.01\"/><path d=\"M15 2h.01\"/><path d=\"M22 20h.01\"/><path d=\"m18 13 4-4-4-4-4 4z\"/><path d=\"m2 17 4-4 4 4-4 4z\"/></svg> 获得新' + (typeNames[itemType] || '物品') + '！</div>';
        html += '<div style="background:var(--bg-card);padding:15px;border-radius:10px;border:2px solid ' + qualityColors[itemData.quality || 1] + ';margin-bottom:15px;text-align:left">';
        html += '<div style="font-size:16px;font-weight:bold;color:var(--text-primary);margin-bottom:5px">' + (itemData.name || '未知') + '</div>';
        html += '<div style="font-size:12px;color:' + qualityColors[itemData.quality || 1] + ';margin-bottom:8px">' + qualityNames[itemData.quality || 1] + '品质</div>';
        
        // 显示属性
        if (itemData.stats) {
            const statNames = {maxHp:'生命', defense:'防御', attack:'攻击', speed:'先手值', crit:'暴击率', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', hit:'命中率', dodge:'闪避率', critDamage:'暴击伤害', energy:'能量', maxEnergy:'能量上限', energyRegen:'能量恢复', talentPower:'天赋强度', firstStrike:'先手值'};
            let statText = [];
            for (let k in itemData.stats) {
                if (itemData.stats[k]) statText.push((statNames[k] || k) + '+' + itemData.stats[k]);
            }
            if (statText.length > 0) {
                html += '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">' + statText.join('，') + '</div>';
            }
        }
        
        // 显示特殊效果
        if (itemData.special) {
            const specialNames = {
                hpRegen:'每回合回血', healOnKill:'击杀回血', damageReduction:'伤害减免', 
                dotOnHit:'攻击附加中毒', critDamage:'暴击伤害', lifeSteal:'吸血', 
                firstStrike:'先手攻击伤害', dodgeBonus:'闪避加成', critChance:'暴击率',
                extraAttack:'额外攻击概率', cooldownReduction:'冷却缩减', energyOnHit:'攻击回能',
                damagePct:'伤害加成', expBonus:'经验加成', allStatPct:'全属性加成',
                talentPower:'天赋强度', energyRegen:'能量恢复', dodge:'闪避率', hit:'命中率',
                crit:'暴击率', attack:'攻击力', defense:'防御力', maxHp:'最大生命',
                maxEnergy:'能量上限', speed:'先手值', agility:'敏捷', strength:'力量',
                vitality:'体质', perception:'感知', evolution:'进化', dotDamage:'Dot伤害',
                armorPenetration:'护甲穿透', critResistance:'暴击抗性', reflectDamage:'反伤',
                shield:'护盾', bleedOnHit:'攻击附加流血', poisonOnHit:'攻击附加中毒',
                burnOnHit:'攻击附加灼烧', freezeOnHit:'攻击附加冰冻', stunOnHit:'攻击附加眩晕',
                paralyzeOnHit:'攻击附加麻痹', slowOnHit:'攻击附加减速', hpOnKill:'击杀回血',
                energyOnKill:'击杀回能', talentPointsOnKill:'击杀获得天赋点', fragmentsOnKill:'击杀获得碎片',
                goldBonus:'金币加成', essenceBonus:'进化精粹加成', fragmentBonus:'碎片加成',
                talentPointBonus:'天赋点加成', allStats:'全属性', allResist:'全抗性',
                physicalResist:'物理抗性', fireResist:'火焰抗性', iceResist:'冰霜抗性',
                poisonResist:'毒素抗性', lightningResist:'雷电抗性', physicalPenetration:'物理穿透',
                firePenetration:'火焰穿透', icePenetration:'冰霜穿透', poisonPenetration:'毒素穿透',
                lightningPenetration:'雷电穿透'
            };
            const specialName = specialNames[itemData.special] || itemData.special;
            html += '<div style="font-size:12px;color:var(--accent-warning);margin-bottom:8px">特殊：' + specialName + (itemData.specialValue ? ' +' + itemData.specialValue : '') + '</div>';
        }
        
        // 显示描述
        if (itemData.desc) {
            html += '<div style="font-size:12px;color:var(--text-muted);font-style:italic">' + itemData.desc + '</div>';
        }
        
        html += '</div>';
        
        // 按钮
        html += '<div style="display:flex;gap:10px">';
        html += '<button onclick="game._itemObtainedEquip()" style="flex:1;padding:12px;background:var(--accent-success);color:white;border-radius:8px;font-size:14px;font-weight:bold">立即装备</button>';
        html += '<button onclick="game._itemObtainedSkip()" style="flex:1;padding:12px;background:var(--text-faint);color:white;border-radius:8px;font-size:14px">暂不装备</button>';
        html += '</div>';
        html += '</div>';
        
        this._itemObtainedCallback = onEquip;
        this.showPopup(html);
    },
    
    // 立即装备回调
    _itemObtainedEquip() {
        this.closePop();
        if (this._itemObtainedCallback) {
            this._itemObtainedCallback();
            this._itemObtainedCallback = null;
        }
    },
    
    // 暂不装备
    _itemObtainedSkip() {
        this.closePop();
        this._itemObtainedCallback = null;
    },

    // 游戏内提示弹窗（替换原生alert）
    showGameAlert(title, message, callback) {
        let html = '<div style="text-align:center;padding:10px;min-width:280px">';
        html += '<div style="font-size:18px;color:var(--accent-warning);margin-bottom:12px;font-weight:bold">' + title + '</div>';
        html += '<div style="font-size:14px;color:var(--text-secondary);line-height:1.8;margin-bottom:20px;white-space:pre-line">' + message + '</div>';
        html += '<button onclick="game._gameAlertCallback()" style="width:100%;padding:12px;background:var(--accent-success);color:white;border-radius:8px;font-size:14px;font-weight:bold">确定</button>';
        html += '</div>';
        this._gameAlertCallback = () => {
            this.closePop();
            if (callback) callback();
        };
        this.showPopup(html);
    },

    // 游戏内确认弹窗（替换原生confirm）
    showGameConfirm(title, message, onConfirm, onCancel) {
        let html = '<div style="text-align:center;padding:10px;min-width:280px">';
        html += '<div style="font-size:18px;color:var(--accent-warning);margin-bottom:12px;font-weight:bold">' + title + '</div>';
        html += '<div style="font-size:14px;color:var(--text-secondary);line-height:1.8;margin-bottom:20px;white-space:pre-line">' + message + '</div>';
        html += '<div style="display:flex;gap:10px">';
        html += '<button onclick="game._gameConfirmCancel()" style="flex:1;padding:12px;background:var(--text-faint);color:white;border-radius:8px;font-size:14px">取消</button>';
        html += '<button onclick="game._gameConfirmOk()" style="flex:1;padding:12px;background:var(--accent-danger);color:white;border-radius:8px;font-size:14px;font-weight:bold">确定</button>';
        html += '</div></div>';
        this._gameConfirmOk = () => {
            this.closePop();
            if (onConfirm) onConfirm();
        };
        this._gameConfirmCancel = () => {
            this.closePop();
            if (onCancel) onCancel();
        };
        this.showPopup(html);
    },

    savePermanent() {
        localStorage.setItem('tunshi_save_v2', JSON.stringify(this.permanent));
    },

    // ========== 成就系统 ==========
    achievements: [
        {id: 'first_battle', name: '初出茅庐', desc: '完成第一次战斗', category: '战斗', reward: {talentPoints: 2}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>'},
        {id: 'first_kill', name: '首杀', desc: '击杀第一个敌人', category: '战斗', reward: {fragments: {1: 5}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg>'},
        {id: 'first_death', name: '初次死亡', desc: '第一次死亡', category: '特殊', reward: {talentPoints: 3}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg>'},
        {id: 'first_reincarnation', name: '轮回者', desc: '完成第一次轮回', category: '特殊', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"/><path d=\"M8 16H3v5\"/></svg>'},
        {id: 'first_talent', name: '天赋初醒', desc: '解锁第一个天赋', category: '成长', reward: {talentPoints: 2}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg>'},
        {id: 'talent_10', name: '天赋大师', desc: '解锁10个天赋', category: '成长', reward: {talentPoints: 10, fragments: {2: 10}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg>'},
        {id: 'first_evolve', name: '进化之路', desc: '完成第一次天赋进化', category: '成长', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg>'},
        {id: 'first_fusion', name: '融合大师', desc: '完成第一次天赋融合', category: '成长', reward: {talentPoints: 8, fragments: {3: 5}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg>'},
        {id: 'fragments_50', name: '收藏家', desc: '累计获得50个碎片', category: '收集', reward: {talentPoints: 3}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg>'},
        {id: 'fragments_200', name: '大收藏家', desc: '累计获得200个碎片', category: '收集', reward: {talentPoints: 8, fragments: {2: 15}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z\"/><path d=\"M5 20h14\"/></svg>'},
        {id: 'maps_3', name: '探索者', desc: '探索3张不同的地图', category: '探索', reward: {talentPoints: 3}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/></svg>'},
        {id: 'maps_all', name: '大探索家', desc: '探索所有可玩地图', category: '探索', reward: {talentPoints: 15, fragments: {4: 3}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"/></svg>'},
        {id: 'first_boss', name: 'Boss猎人', desc: '击杀第一个Boss', category: '战斗', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2c-3 0-5 2-5 5 0 2 1 3 2 4l-2 3 3 1 1 3 3-2 3 2 1-3 3-1-2-3c1-1 2-2 2-4 0-3-2-5-5-5z\"/><circle cx=\"9\" cy=\"8\" r=\"0.5\"/><circle cx=\"15\" cy=\"8\" r=\"0.5\"/></svg>'},
        {id: 'boss_5', name: 'Boss终结者', desc: '累计击杀5个Boss', category: '战斗', reward: {talentPoints: 12, fragments: {3: 8}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>'},
        {id: 'battles_50', name: '战斗专家', desc: '完成50场战斗', category: '战斗', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>'},
        {id: 'battles_200', name: '战斗大师', desc: '完成200场战斗', category: '战斗', reward: {talentPoints: 12, fragments: {2: 20}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/></svg>'},
        {id: 'level_10', name: '等级提升', desc: '达到10级', category: '成长', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/></svg>'},
        {id: 'level_30', name: '等级大师', desc: '达到30级', category: '成长', reward: {talentPoints: 10, fragments: {3: 5}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg>'},
        {id: 'first_symbiont', name: '共生体初体验', desc: '装备第一个基因共生体', category: '成长', reward: {talentPoints: 3}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>'},
        {id: 'gold_500', name: '精华收藏家', desc: '累计拥有500基因精华', category: '收集', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v12\"/><path d=\"M15 9.5a3 3 0 0 0-3-1.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3 1.34 3 3-1.34 3-3 3a3 3 0 0 1-3-1.5\"/></svg>'}
    ],

    initAchievementStats() {
        if (!this.permanent.achievementStats) {
            this.permanent.achievementStats = {
                battlesCompleted: 0, enemiesKilled: 0, bossesKilled: 0,
                deaths: 0, reincarnations: 0, totalFragments: 0,
                maxLevel: 0, maxGold: 0, mapsExplored: [],
                talentsUnlocked: 0, evolutionsCompleted: 0,
                fusionsCompleted: 0, symbiontsEquipped: 0
            };
        }
        if (!this.permanent.unlockedAchievements) this.permanent.unlockedAchievements = [];
    },

    checkAchievements() {
        if (!this.permanent.achievementStats) this.initAchievementStats();
        const stats = this.permanent.achievementStats;
        const unlocked = this.permanent.unlockedAchievements;
        let newlyUnlocked = [];

        this.achievements.forEach(ach => {
            if (unlocked.includes(ach.id)) return;
            let met = false;
            switch(ach.id) {
                case 'first_battle': met = stats.battlesCompleted >= 1; break;
                case 'first_kill': met = stats.enemiesKilled >= 1; break;
                case 'first_death': met = stats.deaths >= 1; break;
                case 'first_reincarnation': met = stats.reincarnations >= 1; break;
                case 'first_talent': met = stats.talentsUnlocked >= 1; break;
                case 'talent_10': met = stats.talentsUnlocked >= 10; break;
                case 'first_evolve': met = stats.evolutionsCompleted >= 1; break;
                case 'first_fusion': met = stats.fusionsCompleted >= 1; break;
                case 'fragments_50': met = stats.totalFragments >= 50; break;
                case 'fragments_200': met = stats.totalFragments >= 200; break;
                case 'maps_3': met = stats.mapsExplored.length >= 3; break;
                case 'maps_all': met = stats.mapsExplored.length >= this.getPlayableMaps().length; break;
                case 'first_boss': met = stats.bossesKilled >= 1; break;
                case 'boss_5': met = stats.bossesKilled >= 5; break;
                case 'battles_50': met = stats.battlesCompleted >= 50; break;
                case 'battles_200': met = stats.battlesCompleted >= 200; break;
                case 'level_10': met = stats.maxLevel >= 10; break;
                case 'level_30': met = stats.maxLevel >= 30; break;
                case 'first_symbiont': met = stats.symbiontsEquipped >= 1; break;
                case 'gold_500': met = stats.maxGold >= 500; break;
            }
            if (met) {
                unlocked.push(ach.id);
                newlyUnlocked.push(ach);
                if (ach.reward) {
                    if (ach.reward.talentPoints) this.permanent.talentPoints = (this.permanent.talentPoints || 0) + ach.reward.talentPoints;
                    if (ach.reward.fragments) {
                        for (const q in ach.reward.fragments) {
                            this.permanent.universalFragments[q] = (this.permanent.universalFragments[q] || 0) + ach.reward.fragments[q];
                        }
                    }
                }
            }
        });

        if (newlyUnlocked.length > 0) {
            this.savePermanent();
            let msg = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/></svg> 成就解锁！\n';
            newlyUnlocked.forEach(ach => {
                msg += `\n${ach.icon} 【${ach.name}】${ach.desc}`;
                if (ach.reward) {
                    if (ach.reward.talentPoints) msg += `\n   奖励：${ach.reward.talentPoints}天赋点`;
                    if (ach.reward.fragments) {
                        for (const q in ach.reward.fragments) {
                            const qn = {1:'普通',2:'稀有',3:'史诗',4:'传说'};
                            msg += `\n   奖励：${ach.reward.fragments[q]}个${qn[q]}碎片`;
                        }
                    }
                }
            });
            setTimeout(() => {
                // 若击杀奖励弹窗仍在显示，等它关闭后再展示成就，避免顶掉击杀奖励
                const showWhenReady = () => {
                    if (document.getElementById('killDropPopup')) {
                        setTimeout(showWhenReady, 300);
                    } else {
                        this.showGameAlert('成就解锁', msg);
                    }
                };
                showWhenReady();
            }, 500);
        }
        return newlyUnlocked;
    },

    openAchievementPanel() {
        if (!this.permanent.achievementStats) this.initAchievementStats();
        const stats = this.permanent.achievementStats;
        const unlocked = this.permanent.unlockedAchievements || [];
        const categories = ['战斗', '成长', '收集', '探索', '特殊'];

        let html = '<h3>成就系统</h3>';
        html += `<p style="color:var(--text-muted);font-size:13px;margin-bottom:10px">已解锁 ${unlocked.length}/${this.achievements.length} 个成就</p>`;
        html += '<div style="margin-bottom:15px;padding:10px;background:var(--bg-card);border-radius:6px;font-size:12px;color:var(--text-secondary)">';
        html += `战斗：${stats.battlesCompleted}场 | 击杀：${stats.enemiesKilled} | Boss：${stats.bossesKilled} | 死亡：${stats.deaths}<br>`;
        html += `碎片：${stats.totalFragments} | 天赋：${stats.talentsUnlocked} | 进化：${stats.evolutionsCompleted} | 融合：${stats.fusionsCompleted}<br>`;
        html += `最高等级：${stats.maxLevel} | 地图：${stats.mapsExplored.length}/${this.getPlayableMaps().length} | 最高基因精华：${stats.maxGold}`;
        html += '</div>';

        html += '<div class="scroll-area" style="padding-bottom:50px">';
        categories.forEach(cat => {
            const catAch = this.achievements.filter(a => a.category === cat);
            if (catAch.length === 0) return;
            html += `<div style="color:var(--accent-warning);font-size:14px;margin:10px 0 6px">${cat}</div>`;
            catAch.forEach(ach => {
                const isUnlocked = unlocked.includes(ach.id);
                html += '<div class="talent-card" style="' + (isUnlocked ? '' : 'opacity:0.5') + '">';
                html += '<div style="display:flex;align-items:center;gap:10px">';
                html += `<span style="font-size:24px">${ach.icon}</span>`;
                html += '<div>';
                html += `<div class="talent-name" style="color:${isUnlocked ? 'var(--accent-warning)' : 'var(--text-muted)'}">${ach.name} ${isUnlocked ? '<span style="color:var(--accent-success);font-size:11px">[已解锁]</span>' : '<span style="color:var(--text-muted);font-size:11px">[未解锁]</span>'}</div>`;
                html += `<div class="talent-desc">${ach.desc}</div>`;
                if (ach.reward) {
                    let rt = '奖励：';
                    if (ach.reward.talentPoints) rt += `${ach.reward.talentPoints}天赋点 `;
                    if (ach.reward.fragments) {
                        for (const q in ach.reward.fragments) {
                            const qn = {1:'普通',2:'稀有',3:'史诗',4:'传说'};
                            rt += `${ach.reward.fragments[q]}${qn[q]}碎片 `;
                        }
                    }
                    html += `<div style="font-size:11px;color:var(--accent-success);margin-top:2px">${rt}</div>`;
                }
                html += '</div></div></div>';
            });
        });
        html += '</div>';
        html += '<button onclick="game.closePop()" style="margin-top:10px">关闭</button>';
        this.showPopup(html);
    },

    // ========== 日常任务系统 ==========
    dailyTasks: [
        {id: 'daily_battle', name: '战斗狂人', desc: '完成5场战斗', target: 5, type: 'battles', reward: {talentPoints: 3}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>'},
        {id: 'daily_kill', name: '猎杀专家', desc: '击杀10个敌人', target: 10, type: 'kills', reward: {fragments: {1: 8}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg>'},
        {id: 'daily_talent', name: '天赋探索者', desc: '解锁1个天赋', target: 1, type: 'talents', reward: {talentPoints: 2}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg>'},
        {id: 'daily_map', name: '地图探索者', desc: '探索2张不同地图', target: 2, type: 'maps', reward: {fragments: {2: 5}}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/></svg>'},
        {id: 'daily_reincarnate', name: '轮回者', desc: '完成1次轮回', target: 1, type: 'reincarnations', reward: {talentPoints: 5}, icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"/><path d=\"M8 16H3v5\"/></svg>'}
    ],

    // 获取今天的日期字符串
    getTodayString() {
        const d = new Date();
        return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    },

    // 初始化日常任务（检查是否需要刷新）
    initDailyTasks() {
        const today = this.getTodayString();
        if (!this.permanent.dailyTasks || this.permanent.dailyTasks.date !== today) {
            // 新的一天，刷新任务
            this.permanent.dailyTasks = {
                date: today,
                progress: {},
                claimed: {}
            };
            this.dailyTasks.forEach(t => {
                this.permanent.dailyTasks.progress[t.id] = 0;
                this.permanent.dailyTasks.claimed[t.id] = false;
            });
            this.savePermanent();
        }
    },

    // 更新日常任务进度
    updateDailyTask(type, amount = 1) {
        if (!this.permanent.dailyTasks) this.initDailyTasks();
        let updated = false;
        this.dailyTasks.forEach(t => {
            if (t.type === type && !this.permanent.dailyTasks.claimed[t.id]) {
                const oldProgress = this.permanent.dailyTasks.progress[t.id] || 0;
                this.permanent.dailyTasks.progress[t.id] = Math.min(t.target, oldProgress + amount);
                if (this.permanent.dailyTasks.progress[t.id] > oldProgress) updated = true;
            }
        });
        if (updated) this.savePermanent();
        return updated;
    },

    // 领取日常任务奖励
    claimDailyTask(taskId) {
        if (!this.permanent.dailyTasks) this.initDailyTasks();
        const task = this.dailyTasks.find(t => t.id === taskId);
        if (!task) return;
        if (this.permanent.dailyTasks.claimed[taskId]) { this.showGameAlert('提示', '已领取'); return; }
        if ((this.permanent.dailyTasks.progress[taskId] || 0) < task.target) { this.showGameAlert('提示', '任务未完成'); return; }

        this.permanent.dailyTasks.claimed[taskId] = true;
        let rewardMsg = `领取【${task.name}】奖励！\n`;
        if (task.reward.talentPoints) {
            this.permanent.talentPoints = (this.permanent.talentPoints || 0) + task.reward.talentPoints;
            rewardMsg += `获得${task.reward.talentPoints}天赋点\n`;
        }
        if (task.reward.fragments) {
            for (const q in task.reward.fragments) {
                this.permanent.universalFragments[q] = (this.permanent.universalFragments[q] || 0) + task.reward.fragments[q];
                const qn = {1:'普通',2:'稀有',3:'史诗',4:'传说'};
                rewardMsg += `获得${task.reward.fragments[q]}个${qn[q]}碎片\n`;
            }
        }
        this.savePermanent();
        const self = this;
        this.showGameAlert('<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M5.8 11.3L2 22l10.7-3.8\"/><path d=\"M4 3h.01\"/><path d=\"M22 8h.01\"/><path d=\"M15 2h.01\"/><path d=\"M22 20h.01\"/><path d=\"m18 13 4-4-4-4-4 4z\"/><path d=\"m2 17 4-4 4 4-4 4z\"/></svg> 奖励领取成功', rewardMsg, () => {
            self.openDailyTaskPanel();
        });
    },

    // 打开日常任务面板
    openDailyTaskPanel() {
        if (!this.permanent.dailyTasks) this.initDailyTasks();
        const today = this.getTodayString();

        let html = '<h3>日常任务</h3>';
        html += `<p style="color:var(--text-muted);font-size:13px;margin-bottom:10px">每日刷新（${today}），完成任务获得奖励</p>`;

        let completedCount = 0;
        let claimedCount = 0;

        html += '<div class="scroll-area" style="padding-bottom:50px">';
        this.dailyTasks.forEach(t => {
            const progress = this.permanent.dailyTasks.progress[t.id] || 0;
            const claimed = this.permanent.dailyTasks.claimed[t.id] || false;
            const completed = progress >= t.target;
            if (completed) completedCount++;
            if (claimed) claimedCount++;

            const progressPct = Math.min(100, Math.floor(progress / t.target * 100));

            html += '<div class="talent-card">';
            html += '<div style="flex:1">';
            html += `<div class="talent-name">${t.icon} ${t.name} ${claimed ? '<span style="color:var(--accent-success);font-size:11px">[已领取]</span>' : completed ? '<span style="color:var(--accent-warning);font-size:11px">[可领取]</span>' : ''}</div>`;
            html += `<div class="talent-desc">${t.desc}</div>`;
            // 进度条
            html += `<div style="margin-top:6px;height:8px;background:var(--text-faint);border-radius:4px;overflow:hidden">`;
            html += `<div style="height:100%;width:${progressPct}%;background:${completed ? 'var(--accent-success)' : 'var(--accent-info)'};transition:width 0.3s"></div>`;
            html += `</div>`;
            html += `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">进度：${progress}/${t.target}</div>`;
            // 奖励
            if (t.reward) {
                let rt = '奖励：';
                if (t.reward.talentPoints) rt += `${t.reward.talentPoints}天赋点 `;
                if (t.reward.fragments) {
                    for (const q in t.reward.fragments) {
                        const qn = {1:'普通',2:'稀有',3:'史诗',4:'传说'};
                        rt += `${t.reward.fragments[q]}${qn[q]}碎片 `;
                    }
                }
                html += `<div style="font-size:11px;color:var(--accent-warning);margin-top:2px">${rt}</div>`;
            }
            html += '</div>';
            html += '<div style="margin-left:10px">';
            if (claimed) {
                html += '<span style="color:var(--accent-success);font-size:12px">已领取</span>';
            } else if (completed) {
                html += `<button onclick="game.claimDailyTask('${t.id}')" style="font-size:12px;background:var(--accent-warning);color:white">领取</button>`;
            } else {
                html += '<span style="color:var(--text-muted);font-size:12px">进行中</span>';
            }
            html += '</div></div>';
        });
        html += '</div>';

        html += `<div style="margin-top:10px;text-align:center;color:var(--text-muted);font-size:12px">已完成 ${completedCount}/${this.dailyTasks.length}，已领取 ${claimedCount}/${this.dailyTasks.length}</div>`;
        html += '<button onclick="game.closePop()" style="margin-top:10px">关闭</button>';
        this.showPopup(html);
    },

    // ========== 排行榜系统 ==========
    leaderboardTypes: [
        {id: 'floor', name: '最高层数', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"m8 3 4 8 5-5 5 15H2L8 3z\"/></svg>', desc: '单次轮回到达的最高层数'},
        {id: 'level', name: '最高等级', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/></svg>', desc: '单次轮回达到的最高等级'},
        {id: 'kills', name: '最多击杀', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg>', desc: '单次轮回击杀敌人数量'}
    ],

    // 初始化个人纪录
    initLeaderboard() {
        if (!this.permanent.leaderboard) {
            this.permanent.leaderboard = {
                floor: [], level: [], kills: [],
                damage: [],  // 单局最高伤害
                essence: 0,  // 总进化精粹
                bestFloor: 0,  // 历史最高层
                bestDamage: 0,  // 历史最高伤害
                bestKills: 0  // 历史最多击杀
            };
            this.savePermanent();
        }
        // 兼容旧数据：添加新字段
        if (!this.permanent.leaderboard.damage) this.permanent.leaderboard.damage = [];
        if (this.permanent.leaderboard.essence === undefined) this.permanent.leaderboard.essence = 0;
        if (this.permanent.leaderboard.bestFloor === undefined) this.permanent.leaderboard.bestFloor = 0;
        if (this.permanent.leaderboard.bestDamage === undefined) this.permanent.leaderboard.bestDamage = 0;
        if (this.permanent.leaderboard.bestKills === undefined) this.permanent.leaderboard.bestKills = 0;
    },

    // 吞噬累计配置（达到档位解锁永久加成）
    devourBonusConfig: [
        { tag: 3, name: '毒系', threshold: 15, bonus: 'poisonResist', bonusValue: 10, desc: '永久毒抗+10%' },
        { tag: 6, name: '火系', threshold: 15, bonus: 'fireResist', bonusValue: 10, desc: '永久火抗+10%' },
        { tag: 2, name: '血系', threshold: 15, bonus: 'bleedResist', bonusValue: 10, desc: '永久流血抗+10%' },
        { tag: 7, name: '冰系', threshold: 15, bonus: 'iceResist', bonusValue: 10, desc: '永久冰抗+10%' },
        { tag: 4, name: '雷系', threshold: 15, bonus: 'thunderResist', bonusValue: 10, desc: '永久雷抗+10%' },
        { tag: 'boss', name: 'Boss', threshold: 5, bonus: 'bossDamage', bonusValue: 5, desc: '永久Boss伤害+5%' },
        { tag: 'total', name: '总击杀', threshold: 100, bonus: 'allDamage', bonusValue: 3, desc: '永久全伤害+3%' }
    ],

    // 记录吞噬（击杀敌人时调用）
    recordDevour(enemy) {
        if (!this.permanent.devourStats) this.permanent.devourStats = {byTag:{}, totalKills:0, bossKills:0, unlockedBonuses:[]};
        const ds = this.permanent.devourStats;
        
        ds.totalKills++;
        
        // 按体系标签累计
        if (enemy.tags && enemy.tags.length > 0) {
            enemy.tags.forEach(tag => {
                if (!ds.byTag[tag]) ds.byTag[tag] = 0;
                ds.byTag[tag]++;
            });
        }
        
        // Boss击杀累计
        if (enemy.type === 'boss') {
            ds.bossKills++;
        }
        
        // 检查是否解锁新的永久加成
        this.checkDevourBonuses();
        
        this.savePermanent();
    },

    // 检查吞噬累计是否解锁新的永久加成
    checkDevourBonuses() {
        const ds = this.permanent.devourStats;
        if (!ds) return;
        
        this.devourBonusConfig.forEach(config => {
            // 检查是否已解锁
            if (ds.unlockedBonuses.includes(config.bonus)) return;
            
            // 检查是否达到阈值
            let currentCount = 0;
            if (config.tag === 'total') {
                currentCount = ds.totalKills || 0;
            } else if (config.tag === 'boss') {
                currentCount = ds.bossKills || 0;
            } else {
                currentCount = ds.byTag[config.tag] || 0;
            }
            
            if (currentCount >= config.threshold) {
                ds.unlockedBonuses.push(config.bonus);
                // 显示解锁提示
                setTimeout(() => {
                    this.showGameAlert('<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M5.8 11.3L2 22l10.7-3.8\"/><path d=\"M4 3h.01\"/><path d=\"M22 8h.01\"/><path d=\"M15 2h.01\"/><path d=\"M22 20h.01\"/><path d=\"m18 13 4-4-4-4-4 4z\"/><path d=\"m2 17 4-4 4 4-4 4z\"/></svg> 吞噬成就解锁！', `累计吞噬${config.name}生物 ${currentCount} 只，解锁永久加成：${config.desc}`);
                }, 500);
            }
        });
    },

    // 图鉴收集奖励配置（集齐某体系全部天赋解锁永久加成）
    codexBonusConfig: [
        { tag: 3, name: '毒系', bonus: 'poisonDamage', bonusValue: 10, desc: '永久毒系伤害+10%' },
        { tag: 6, name: '火系', bonus: 'fireDamage', bonusValue: 10, desc: '永久火系伤害+10%' },
        { tag: 2, name: '血系', bonus: 'bleedDamage', bonusValue: 10, desc: '永久流血伤害+10%' },
        { tag: 7, name: '冰系', bonus: 'iceDamage', bonusValue: 10, desc: '永久冰系伤害+10%' },
        { tag: 4, name: '雷系', bonus: 'thunderDamage', bonusValue: 10, desc: '永久雷系伤害+10%' },
        { tag: 1, name: '物理系', bonus: 'physicalDamage', bonusValue: 5, desc: '永久物理伤害+5%' },
        { tag: 15, name: '速系', bonus: 'speedBonus', bonusValue: 5, desc: '永久先手值+5' },
        { tag: 10, name: '再生系', bonus: 'regenBonus', bonusValue: 10, desc: '永久生命回复+10%' }
    ],

    // 获取图鉴收集进度（按体系）
    getCodexProgress() {
        const allTalents = this.data.talents.talents;
        const unlocked = this.permanent.unlockedTalents || [];
        const progress = {};
        
        // 按体系统计
        for (const tag in this.tagNames) {
            const tagTalents = allTalents.filter(t => t.tags && t.tags.includes(parseInt(tag)));
            const tagUnlocked = tagTalents.filter(t => unlocked.includes(t.id));
            progress[tag] = {
                total: tagTalents.length,
                unlocked: tagUnlocked.length,
                complete: tagTalents.length > 0 && tagUnlocked.length === tagTalents.length
            };
        }
        
        // 总体进度
        const totalTalents = allTalents.length;
        const totalUnlocked = unlocked.length;
        progress.total = {
            total: totalTalents,
            unlocked: totalUnlocked,
            complete: totalUnlocked === totalTalents
        };
        
        return progress;
    },

    // 检查图鉴收集是否解锁新的永久加成
    checkCodexBonuses() {
        const progress = this.getCodexProgress();
        if (!this.permanent.codexBonuses) this.permanent.codexBonuses = [];
        
        this.codexBonusConfig.forEach(config => {
            // 检查是否已解锁
            if (this.permanent.codexBonuses.includes(config.bonus)) return;
            
            // 检查该体系是否全部收集
            const tagProgress = progress[config.tag];
            if (tagProgress && tagProgress.complete) {
                this.permanent.codexBonuses.push(config.bonus);
                // 显示解锁提示
                setTimeout(() => {
                    this.showGameAlert('<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M5.8 11.3L2 22l10.7-3.8\"/><path d=\"M4 3h.01\"/><path d=\"M22 8h.01\"/><path d=\"M15 2h.01\"/><path d=\"M22 20h.01\"/><path d=\"m18 13 4-4-4-4-4 4z\"/><path d=\"m2 17 4-4 4 4-4 4z\"/></svg> 图鉴收集完成！', `已集齐${config.name}全部天赋，解锁永久加成：${config.desc}`);
                }, 500);
            }
        });
        
        this.savePermanent();
    },

    // 获取图鉴收集的永久加成总值
    getCodexBonus(bonusType) {
        if (!this.permanent.codexBonuses) return 0;
        
        let total = 0;
        this.codexBonusConfig.forEach(config => {
            if (config.bonus === bonusType && this.permanent.codexBonuses.includes(config.bonus)) {
                total += config.bonusValue;
            }
        });
        return total;
    },

    // 获取吞噬累计的永久加成总值
    getDevourBonus(bonusType) {
        const ds = this.permanent.devourStats;
        if (!ds || !ds.unlockedBonuses) return 0;
        
        let total = 0;
        this.devourBonusConfig.forEach(config => {
            if (config.bonus === bonusType && ds.unlockedBonuses.includes(config.bonus)) {
                total += config.bonusValue;
            }
        });
        return total;
    },

    // 记录成绩到个人纪录
    recordScore(type, value, extraInfo = '') {
        if (!this.permanent.leaderboard) this.initLeaderboard();
        const entry = {
            value: value,
            date: new Date().toLocaleDateString('zh-CN'),
            extra: extraInfo,
            timestamp: Date.now()
        };
        const list = this.permanent.leaderboard[type] || [];
        list.push(entry);
        // 按value降序排序，只保留前10
        list.sort((a, b) => b.value - a.value);
        this.permanent.leaderboard[type] = list.slice(0, 10);
        
        // 同时更新最高纪录字段
        if (type === 'floor' && value > (this.permanent.leaderboard.bestFloor || 0)) {
            this.permanent.leaderboard.bestFloor = value;
        }
        if (type === 'kills' && value > (this.permanent.leaderboard.bestKills || 0)) {
            this.permanent.leaderboard.bestKills = value;
        }
        if (type === 'damage' && value > (this.permanent.leaderboard.bestDamage || 0)) {
            this.permanent.leaderboard.bestDamage = value;
        }
        
        this.savePermanent();

        // 检查是否是新纪录
        if (list.length > 0 && list[0].timestamp === entry.timestamp) {
            return true; // 新纪录
        }
        return false;
    },

    // 打开个人纪录面板
    openLeaderboardPanel() {
        if (!this.permanent.leaderboard) this.initLeaderboard();

        let html = '<h3><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/></svg> 个人纪录</h3>';
        html += '<p style="color:var(--text-muted);font-size:13px;margin-bottom:10px">记录你每次轮回的最佳成绩，只与自己比，不断突破！</p>';
        
        // 最高纪录概览
        const lb = this.permanent.leaderboard;
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px">';
        html += `<div style="padding:10px;background:rgba(255,213,79,0.1);border:1px solid rgba(255,213,79,0.3);border-radius:6px;text-align:center">`;
        html += `<div style="color:var(--accent-warning);font-size:20px;font-weight:bold">${lb.bestFloor || 0}</div>`;
        html += `<div style="color:var(--text-muted);font-size:11px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"m8 3 4 8 5-5 5 15H2L8 3z\"/></svg> 历史最高层</div>`;
        html += `</div>`;
        html += `<div style="padding:10px;background:rgba(255,82,82,0.1);border:1px solid rgba(255,82,82,0.3);border-radius:6px;text-align:center">`;
        html += `<div style="color:var(--accent-danger);font-size:20px;font-weight:bold">${lb.bestDamage || 0}</div>`;
        html += `<div style="color:var(--text-muted);font-size:11px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg> 单局最高伤害</div>`;
        html += `</div>`;
        html += `<div style="padding:10px;background:rgba(129,199,132,0.1);border:1px solid rgba(129,199,132,0.3);border-radius:6px;text-align:center">`;
        html += `<div style="color:var(--accent-success);font-size:20px;font-weight:bold">${lb.bestKills || 0}</div>`;
        html += `<div style="color:var(--text-muted);font-size:11px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg> 单局最多击杀</div>`;
        html += `</div>`;
        html += `<div style="padding:10px;background:rgba(186,104,200,0.1);border:1px solid rgba(186,104,200,0.3);border-radius:6px;text-align:center">`;
        html += `<div style="color:var(--accent-purple);font-size:20px;font-weight:bold">${this.permanent.essence || 0}</div>`;
        html += `<div style="color:var(--text-muted);font-size:11px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 累计进化精粹</div>`;
        html += `</div>`;
        html += '</div>';

        // Tab切换
        html += '<div style="display:flex;gap:5px;margin-bottom:15px">';
        this.leaderboardTypes.forEach((t, idx) => {
            const active = idx === 0 ? 'background:var(--accent-info)' : 'background:var(--text-faint)';
            html += `<button onclick="game.switchLeaderboardTab('${t.id}')" id="lb_tab_${t.id}" style="flex:1;padding:8px;border:none;border-radius:4px;cursor:pointer;color:white;${active}">${t.icon} ${t.name}</button>`;
        });
        html += '</div>';

        // 排行榜内容区域
        html += '<div id="leaderboard_content">';
        html += this.renderLeaderboardList('floor');
        html += '</div>';

        html += '<button onclick="game.closePop()" style="margin-top:10px">关闭</button>';
        this.showPopup(html);
    },

    // 渲染排行榜列表
    renderLeaderboardList(type) {
        const list = this.permanent.leaderboard[type] || [];
        const typeInfo = this.leaderboardTypes.find(t => t.id === type);
        let html = `<div style="color:var(--text-secondary);font-size:12px;margin-bottom:10px">${typeInfo ? typeInfo.desc : ''}</div>`;

        if (list.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:30px">暂无记录，开始你的第一次轮回吧！</div>';
            return html;
        }

        const medals = ['<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-legendary)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"15\" r=\"6\"/><path d=\"M8.5 10.5 7 2h10l-1.5 8.5\"/><path d=\"M7 2h3\"/><path d=\"M17 2h-3\"/></svg>', '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-common)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"15\" r=\"6\"/><path d=\"M8.5 10.5 7 2h10l-1.5 8.5\"/><path d=\"M7 2h3\"/><path d=\"M17 2h-3\"/></svg>', '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-orange)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"15\" r=\"6\"/><path d=\"M8.5 10.5 7 2h10l-1.5 8.5\"/><path d=\"M7 2h3\"/><path d=\"M17 2h-3\"/></svg>'];
        list.forEach((entry, idx) => {
            const medal = medals[idx] || `<span style="color:var(--text-muted)">${idx+1}</span>`;
            const isNew = entry.timestamp && (Date.now() - entry.timestamp < 60000);
            html += '<div class="talent-card" style="' + (idx < 3 ? 'border-left:3px solid var(--accent-warning)' : '') + '">';
            html += `<div style="width:40px;text-align:center;font-size:20px">${medal}</div>`;
            html += '<div style="flex:1">';
            html += `<div style="font-size:16px;font-weight:bold;color:${idx < 3 ? 'var(--accent-warning)' : 'var(--text-primary)'}">${entry.value} ${typeInfo ? typeInfo.name.replace('最高','').replace('最多','') : ''}</div>`;
            html += `<div style="font-size:11px;color:var(--text-muted)">${entry.date}${entry.extra ? ' | ' + entry.extra : ''}${isNew ? ' <span style="color:var(--accent-warning)">[新纪录]</span>' : ''}</div>`;
            html += '</div></div>';
        });

        return html;
    },

    // 切换排行榜Tab
    switchLeaderboardTab(type) {
        // 更新Tab样式
        this.leaderboardTypes.forEach(t => {
            const btn = document.getElementById('lb_tab_' + t.id);
            if (btn) {
                btn.style.background = t.id === type ? 'var(--accent-info)' : 'var(--text-faint)';
            }
        });
        // 更新内容
        const content = document.getElementById('leaderboard_content');
        if (content) {
            content.innerHTML = this.renderLeaderboardList(type);
        }
    },

    // ============================================================
    //  JSON加载
    // ============================================================
    async loadAllJson() {
        try {
            const ts = Date.now();
            const res = await Promise.all([
                fetch('./enemies.json?t=' + ts).then(r => r.json()),
                fetch('./maps.json?t=' + ts).then(r => r.json()),
                fetch('./narratives.json?t=' + ts).then(r => r.json()),
                fetch('./shop.json?t=' + ts).then(r => r.json()),
                fetch('./talents_skills.json?t=' + ts).then(r => r.json()),
                fetch('./symbionts.json?t=' + ts).then(r => r.json())
            ]);
            this.data.enemies = res[0];
            this.data.maps = res[1];
            this.data.narratives = res[2];
            this.data.shop = res[3];
            this.data.talents = res[4];
            this.data.symbionts = res[5];
            console.log("所有JSON加载完成");
            this.initDailyTasks();
            this.initLeaderboard();
            this.startNewRun();
        } catch (e) {
            this.showGameAlert("加载失败", "配置文件加载失败：" + e.message);
            console.error(e);
        }
    },

    // ============================================================
    //  界面切换
    // ============================================================
    showScreen(screenId) {
        // 关闭击杀奖励弹窗（如果存在）
        const killDropPopup = document.getElementById('killDropPopup');
        if (killDropPopup) killDropPopup.remove();
        const dropTooltip = document.getElementById('dropTooltip');
        if (dropTooltip) dropTooltip.remove();
        // 关闭所有tooltip（防止切换界面后tooltip残留）
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) tooltipBox.classList.remove('show');
        this.currentTooltipKey = null;
        // 关闭天赋详情tooltip
        const talentTooltip = document.getElementById('talentTooltip');
        if (talentTooltip) talentTooltip.remove();
        
        // 记录切换前的页面ID（用于判断是否需要自动渲染）
        const prevActive = document.querySelector('.screen.active');
        const prevId = prevActive ? prevActive.id : null;
        
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(screenId);
        if (target) target.classList.add('active');
        window.scrollTo(0, 0);
        
        // 底部导航栏切换
        const bottomNav = document.getElementById('bottomNav');
        if (bottomNav) {
            bottomNav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            const navBtn = bottomNav.querySelector('[data-screen="' + screenId + '"]');
            if (navBtn) navBtn.classList.add('active');
            // 主界面、战斗界面、设置、天赋、背包、商店页面显示底部导航，其他特殊界面隐藏
            if (screenId === 'mainScreen' || screenId === 'battleScreen' || screenId === 'settingsScreen' || screenId === 'talentScreen' || screenId === 'inventoryScreen' || screenId === 'shopScreen' || screenId === 'characterScreen') {
                bottomNav.style.display = 'flex';
            } else {
                bottomNav.style.display = 'none';
            }
        }
        
        // 自动渲染特定页面的内容（避免无限循环：只有从其他页面切换过来时才自动渲染）
        const self = this;
        if (screenId !== prevId) {
            if (screenId === 'talentScreen') {
                setTimeout(() => { if (self.openTalentPanel) self.openTalentPanel(); }, 50);
            } else if (screenId === 'characterScreen') {
                setTimeout(() => { if (self.renderCharacterPanel) self.renderCharacterPanel(); }, 50);
            }
        }
    },

    // 要返回的页面（从角色界面打开其他面板时设置）
    returnToScreen: null,

    // 根据当前状态返回上一个页面（战斗中返回战斗页面，否则返回主页面或指定页面）
    goBack() {
        // 先关闭所有弹窗
        this.closePop();
        // 关闭击杀奖励弹窗（如果存在）
        const killDropPopup = document.getElementById('killDropPopup');
        if (killDropPopup) killDropPopup.remove();
        const dropTooltip = document.getElementById('dropTooltip');
        if (dropTooltip) dropTooltip.remove();
        // 关闭所有tooltip
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) tooltipBox.classList.remove('show');
        this.currentTooltipKey = null;
        
        if (this.inBattle) {
            this.showScreen('battleScreen');
        } else if (this.returnToScreen) {
            const target = this.returnToScreen;
            this.returnToScreen = null;
            this.showScreen(target);
            if (target === 'characterScreen') this.renderCharacterPanel();
        } else {
            this.showScreen('mainScreen');
            this.refreshMainUI();
        }
    },

    // ============================================================
    //  开始新轮回
    // ============================================================
    startNewRun() {
        const b = this.permanent.bonusStats;
        // 显示开场剧情（每次开始新轮回都显示，第一次完整版，后续简化版）
        const isFirstRun = !this.permanent.achievementStats || this.permanent.achievementStats.battlesCompleted === 0;
        if (this.storyData && this.storyData.opening) {
            const openingLines = isFirstRun ? this.storyData.opening : this.storyData.opening.slice(-2); // 后续轮回只显示最后两段
            setTimeout(() => {
                this.showStory(openingLines);
            }, 300);
        }
        // 成就统计：轮回次数（不是第一次开始）
        if (this.permanent.achievementStats && this.permanent.achievementStats.battlesCompleted > 0) {
            this.permanent.achievementStats.reincarnations++;
            this.checkAchievements();
            // 日常任务：轮回
            this.updateDailyTask('reincarnations');
        }
        // 永恒轮回加成（新游戏+模式，每次轮回永久属性+3%）
        const eternalBonus = this.permanent.eternalBonus || {};
        const eternalStrMult = 1 + (eternalBonus.strength || 0) / 100;
        const eternalAgiMult = 1 + (eternalBonus.agility || 0) / 100;
        const eternalVitMult = 1 + (eternalBonus.vitality || 0) / 100;
        const eternalPerMult = 1 + (eternalBonus.perception || 0) / 100;
        const eternalEvoMult = 1 + (eternalBonus.evolution || 0) / 100;
        
        this.player = {
            strength: Math.floor((6 + b.strength) * eternalStrMult),
            agility: Math.floor((6 + b.agility) * eternalAgiMult),
            vitality: Math.floor((6 + b.vitality) * eternalVitMult),
            perception: Math.floor((6 + b.perception) * eternalPerMult),
            evolution: 6 + b.evolution,
            maxHp:100, hp:100, attack:10, defense:2,
            crit:5, critDamage:150, hit:85, speed:5,
            energy:100, maxEnergy:100,
            gold: 50, exp:0, level:1, expToNext:20,  // 每局初始50基因精华，不再永久继承
            statPoints:0,
            runStrGained:0, runAgiGained:0, runVitGained:0,
            runPerGained:0, runEvoGained:0,
            equippedTalents:[],
            shield: 0,
            lethalSaveUses: 0,
            extraTurnUses: 0,
            lowHpInvincibleUses: 0,
            killStackCount: 0,
            baseAttack: 0,
            tempLifeSteal: 0,
            causalDamage: 0,
            bossSkillUses: 0,
            stolenBossSkill: null,
            stealth: false,
            stealthTurns: 0
        };
        this.currentFloor = 1;
        this.currentMapIndex = 0;
        this.currentLayer = 1;
        this.inBattle = false;
        this.inEndlessMode = false;  // 无尽深层模式
        this.endlessFloor = 0;  // 无尽深层层数
        this.currentEnemy = null;
        this.battleLog = [];

        if (this.data.maps && this.data.maps.maps.length > 0) {
            this.currentMap = this.data.maps.maps[Math.floor(Math.random()*this.data.maps.maps.length)];
        }

        this.calcDerivedStats();
        this.player.hp = this.player.maxHp;
        
        // 新轮回开局"成长总览"（非第一次轮回时显示）
        const reincarnationCount = this.permanent.achievementStats ? (this.permanent.achievementStats.reincarnations || 0) : 0;
        if (reincarnationCount > 0) {
            setTimeout(() => {
                this.showReincarnationOverview();
            }, 500);
        }
        this.showScreen('mainScreen');
        this.refreshMainUI();
        this.showRandomStory();
        // 新手引导检查
        if (!this.permanent.tutorialCompleted) {
            setTimeout(() => this.startTutorial(), 500);
        }
    },

    // 显示轮回成长总览
    showReincarnationOverview() {
        const b = this.permanent.bonusStats;
        const upgrades = this.permanent.essenceUpgrades || {};
        
        // 计算当前永久属性加成（包括进化精粹强化）
        const currentPermanent = {
            strength: b.strength + (upgrades.strength || 0) * 0.03 * 6,
            agility: b.agility + (upgrades.agility || 0) * 0.03 * 6,
            vitality: b.vitality + (upgrades.vitality || 0) * 0.03 * 6,
            perception: b.perception + (upgrades.perception || 0) * 0.03 * 6,
            evolution: b.evolution + (upgrades.evolution || 0) * 0.03 * 6,
            hp: (upgrades.hp || 0) * 0.02 * 100
        };
        
        // 获取上一轮回的永久属性（如果没有记录，使用当前值）
        const lastPermanent = this.permanent.lastRunPermanent || currentPermanent;
        
        // 计算成长差值
        const growthDiff = {
            strength: Math.floor((currentPermanent.strength - lastPermanent.strength) * 10) / 10,
            agility: Math.floor((currentPermanent.agility - lastPermanent.agility) * 10) / 10,
            vitality: Math.floor((currentPermanent.vitality - lastPermanent.vitality) * 10) / 10,
            perception: Math.floor((currentPermanent.perception - lastPermanent.perception) * 10) / 10,
            evolution: Math.floor((currentPermanent.evolution - lastPermanent.evolution) * 10) / 10,
            hp: Math.floor(currentPermanent.hp - lastPermanent.hp)
        };
        
        // 计算衍生属性成长
        const attackGrowth = Math.floor(growthDiff.strength * 2);
        const defenseGrowth = Math.floor(growthDiff.vitality * 0.4 * 10) / 10;
        const hpGrowth = growthDiff.hp + Math.floor(growthDiff.vitality * 8);
        const speedGrowth = Math.floor(growthDiff.agility);
        const critGrowth = Math.floor(growthDiff.perception * 0.8 * 10) / 10;
        
        // 获取个人纪录
        const bestFloor = this.permanent.leaderboard ? (this.permanent.leaderboard.bestFloor || 0) : 0;
        const bestDamage = this.permanent.leaderboard ? (this.permanent.leaderboard.bestDamage || 0) : 0;
        
        // 构建成长总览HTML
        let html = '<div style="text-align:center;margin-bottom:16px">';
        html += `<h2 style="color:var(--accent-primary);margin:0 0 8px 0;display:flex;align-items:center;justify-content:center;gap:8px"><span style="width:22px;height:22px;display:inline-flex"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><polyline points=\"23 4 23 10 17 10\"/><polyline points=\"1 20 1 14 7 14\"/><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"/></svg></span>第 ${(this.permanent.achievementStats.reincarnations || 0) + 1} 次轮回 · 启动</h2>`;
        // 根据轮回次数显示不同的开场文本
        const reincarnationCount = this.permanent.achievementStats ? (this.permanent.achievementStats.reincarnations || 0) : 0;
        let openingText = this.reincarnationOpenings[0].text;
        for (const opening of this.reincarnationOpenings) {
            if (reincarnationCount >= opening.min && reincarnationCount <= opening.max) {
                openingText = opening.text;
                break;
            }
        }
        html += `<p style="color:var(--text-secondary);font-size:13px;margin:0 0 8px 0;font-style:italic;line-height:1.6">${openingText}</p>`;
        html += '<p style="color:var(--text-muted);font-size:13px;margin:0">相比上一轮回，你带着这些永久成长进入：</p>';
        html += '</div>';
        
        html += '<div style="background:var(--bg-secondary);border-radius:8px;padding:12px;margin-bottom:12px">';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">';
        
        const growthItems = [
            {icon: '<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg></span>', label: '攻击力', value: attackGrowth > 0 ? `+${attackGrowth}` : '0', color: 'var(--accent-danger)'},
            {icon: '<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg></span>', label: '生命值', value: hpGrowth > 0 ? `+${hpGrowth}` : '0', color: 'var(--accent-success)'},
            {icon: '<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg></span>', label: '防御力', value: defenseGrowth > 0 ? `+${defenseGrowth}` : '0', color: 'var(--accent-info)'},
            {icon: '<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg></span>', label: '先手值', value: speedGrowth > 0 ? `+${speedGrowth}` : '0', color: 'var(--accent-purple)'},
            {icon: '<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg></span>', label: '暴击率', value: critGrowth > 0 ? `+${critGrowth}%` : '0', color: 'var(--accent-warning)'},
            {icon: '<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M10 2v7.31\"/><path d=\"M14 9.3V1.99\"/><path d=\"M8.5 2h7\"/><path d=\"M14 9.3a6.5 6.5 0 1 1-4 0\"/></svg></span>', label: '进化', value: growthDiff.evolution > 0 ? `+${growthDiff.evolution}` : '0', color: 'var(--accent-info)'}
        ];
        
        growthItems.forEach(item => {
            const hasGrowth = item.value !== '0' && item.value !== '+0';
            html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0">`;
            html += `<span style="color:var(--text-secondary)">${item.icon} ${item.label}</span>`;
            html += `<span style="color:${hasGrowth ? item.color : 'var(--text-faint)'};font-weight:bold">${item.value}</span>`;
            html += `</div>`;
        });
        
        html += '</div></div>';
        
        // 五维属性成长详情
        html += '<div style="background:var(--bg-card);border-radius:8px;padding:10px;margin-bottom:12px">';
        html += '<p style="color:var(--text-muted);font-size:11px;margin:0 0 6px 0">五维永久属性成长：</p>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:6px;font-size:11px">';
        const statGrowth = [
            {label: '力量', value: growthDiff.strength, color: 'var(--accent-warning)'},
            {label: '敏捷', value: growthDiff.agility, color: 'var(--accent-success)'},
            {label: '体质', value: growthDiff.vitality, color: 'var(--accent-danger)'},
            {label: '感知', value: growthDiff.perception, color: 'var(--accent-purple)'},
            {label: '进化', value: growthDiff.evolution, color: 'var(--accent-info)'}
        ];
        statGrowth.forEach(s => {
            const hasGrowth = s.value > 0;
            html += `<span style="color:${hasGrowth ? s.color : 'var(--text-faint)'}">${s.label}${hasGrowth ? '+' + s.value : ''}</span>`;
        });
        html += '</div></div>';
        
        // 个人纪录和目标
        html += '<div style="background:rgba(0,212,170,0.1);border:1px solid rgba(0,212,170,0.3);border-radius:8px;padding:10px;margin-bottom:16px">';
        html += `<p style="color:var(--accent-primary);font-size:13px;margin:0 0 4px 0;display:flex;align-items:center;gap:6px"><span style="width:16px;height:16px;display:inline-flex"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/></svg></span>当前最高纪录：第 ${bestFloor} 层</p>`;
        if (bestDamage > 0) {
            html += `<p style="color:var(--text-muted);font-size:11px;margin:0">单局最高伤害：${bestDamage}</p>`;
        }
        html += `<p style="color:var(--accent-warning);font-size:12px;margin:6px 0 0 0;display:flex;align-items:center;gap:6px"><span style="width:14px;height:14px;display:inline-flex"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg></span>本轮回目标：第 ${bestFloor + 1} 层</p>`;
        html += '</div>';
        
        html += '<button onclick="game.closePop()" style="width:100%;padding:12px;font-size:15px;font-weight:bold;background:var(--accent-primary);color:var(--text-primary);border:none;border-radius:6px;cursor:pointer">开始轮回</button>';
        
        // 记录当前永久属性，供下一轮回比较
        this.permanent.lastRunPermanent = {...currentPermanent};
        this.savePermanent();
        
        this.showPopup(html);
    },

    // ============================================================
    //  核心：五维 → 衍生属性计算
    // ============================================================
    calcDerivedStats() {
        const p = this.player;
        const talent = this.getEquippedTalentBonus();
        this.talentBonus = talent;
        const sym = this.getEquippedSymbiontBonus();
        this.symbiontBonus = sym;
        const evoMult = 1 + p.evolution * 0.01;
        // 进化精粹强化百分比加成
        const eu = this.permanent.essenceUpgrades || {};
        const strMult = 1 + (eu.strength || 0) * 0.03;
        const agiMult = 1 + (eu.agility || 0) * 0.03;
        const vitMult = 1 + (eu.vitality || 0) * 0.03;
        const perMult = 1 + (eu.perception || 0) * 0.03;
        const evoStatMult = 1 + (eu.evolution || 0) * 0.03;
        const hpMult = 1 + (eu.hp || 0) * 0.02;
        // 五维基础属性天赋加成+共生体加成+进化精粹强化
        const _s = Math.floor(p.strength * strMult) + (talent.strength || 0) + (sym.strength || 0);
        const _a = Math.floor(p.agility * agiMult) + (talent.agility || 0) + (sym.agility || 0);
        const _v = Math.floor(p.vitality * vitMult) + (talent.vitality || 0);
        const _per = Math.floor(p.perception * perMult) + (talent.perception || 0) + (sym.perception || 0);
        const _e = Math.floor(p.evolution * evoStatMult) + (talent.evolution || 0) + (sym.evolution || 0);

        p.maxHp = Math.floor((60 + _v * 8 + (talent.maxHp || 0) * evoMult + (sym.maxHp || 0)) * hpMult);
        p.attack = Math.floor(_s * 2 + (talent.attack || 0) * evoMult + (sym.attack || 0));
        p.defense = +(_v * 0.4 + (talent.defense || 0) * evoMult + (sym.defense || 0)).toFixed(1);
        p.crit = Math.floor(5 + _per * 0.8 + (talent.crit || 0) + (sym.crit || 0));
        p.critDamage = Math.floor(150 + Math.max(0, p.crit - 100) / 2 + (talent.critDamage || 0) + (sym.critDamagePct || 0));
        p.hit = Math.floor(85 + _per / 5 + (talent.hit || 0) + (sym.hit || 0));
        p.speed = _a * 1 + (talent.speed || 0) + (sym.speed || 0);
        // 玩家基础闪避率（对同敏捷敌人，实际受攻击者敏捷影响）
        const talentDodge = (talent.dodgeBonus || 0) + (sym.dodgeBonus || 0);
        p.dodgeRate = Math.min(60, talentDodge);  // 基础闪避（天赋/共生体），敏捷差在战斗中计算
        p.maxEnergy = 100 + _e * 5 + (talent.maxEnergy || 0) + (sym.maxEnergy || 0);
        p.energyRegen = 10 + _e * 0.5 + (sym.energyRegen || 0);
        // 进化属性额外效果
        p.dotDamageBonus = _e * 0.5;  // Dot伤害加成（每点进化+0.5%）
        p.skillCooldownReduction = Math.min(30, _e * 0.2);  // 技能冷却缩减（每点进化+0.2%，上限30%）
        p.talentPowerBonus = _e * 1;  // 天赋强度加成（每点进化+1%）
        
        // ============================================================
        // 进化抉择加成应用
        // ============================================================
        const evoBuffs = this.evolutionChoiceBuffs || {};
        
        // 最大生命百分比加成
        if (evoBuffs.maxHp) {
            p.maxHp = Math.floor(p.maxHp * (1 + evoBuffs.maxHp / 100));
        }
        // 攻击力百分比加成
        if (evoBuffs.attack) {
            p.attack = Math.floor(p.attack * (1 + evoBuffs.attack / 100));
        }
        // 防御力百分比加成
        if (evoBuffs.defense) {
            p.defense = +(p.defense * (1 + evoBuffs.defense / 100)).toFixed(1);
        }
        // 速度百分比加成
        if (evoBuffs.speed) {
            p.speed = Math.floor(p.speed * (1 + evoBuffs.speed / 100));
        }
        // 暴击率加成
        if (evoBuffs.crit) {
            p.crit += evoBuffs.crit;
        }
        // 暴击伤害加成
        if (evoBuffs.critDamage) {
            p.critDamage += evoBuffs.critDamage;
        }
        // 命中率加成/减益
        if (evoBuffs.hit) {
            p.hit += evoBuffs.hit;
        }
        // 闪避率加成
        if (evoBuffs.dodge) {
            p.dodgeRate = Math.min(60, p.dodgeRate + evoBuffs.dodge);
        }
        // 先手值加成
        if (evoBuffs.firstStrike) {
            p.speed += evoBuffs.firstStrike;
        }
        // 每回合回复生命百分比（存储在player上，战斗中使用）
        if (evoBuffs.hpRegen) {
            p.evoHpRegenPct = evoBuffs.hpRegen;
        }
        // 所有伤害减免
        if (evoBuffs.allResist) {
            p.evoAllResist = evoBuffs.allResist;
        }
        // 物理伤害减免
        if (evoBuffs.physicalResist) {
            p.evoPhysicalResist = evoBuffs.physicalResist;
        }
        // 中毒伤害加成
        if (evoBuffs.poisonDamage) {
            p.evoPoisonDamageBonus = evoBuffs.poisonDamage;
        }
        // 中毒持续时间加成
        if (evoBuffs.poisonDuration) {
            p.evoPoisonDurationBonus = evoBuffs.poisonDuration;
        }
        // 敌人命中率减益
        if (evoBuffs.enemyHit) {
            p.evoEnemyHitDebuff = evoBuffs.enemyHit;
        }
        // 无视防御加成
        if (evoBuffs.armorPenetration) {
            p.evoArmorPenetration = evoBuffs.armorPenetration;
        }
        // 技能冷却加成（负值表示减少）
        if (evoBuffs.cooldown) {
            p.skillCooldownReduction = Math.min(50, p.skillCooldownReduction + Math.abs(evoBuffs.cooldown));
        }
        // 技能消耗加成/减益
        if (evoBuffs.skillCost) {
            p.evoSkillCostMod = evoBuffs.skillCost;
        }
        // 普攻伤害加成
        if (evoBuffs.normalDamage) {
            p.evoNormalDamageBonus = evoBuffs.normalDamage;
        }
        // 技能伤害加成/减益
        if (evoBuffs.skillDamage) {
            p.evoSkillDamageMod = evoBuffs.skillDamage;
        }
        // 受到伤害加成（正值表示增加受到的伤害）
        if (evoBuffs.damageTaken) {
            p.evoDamageTakenMod = evoBuffs.damageTaken;
        }
        // 碎片获得加成
        if (evoBuffs.fragmentBonus) {
            p.evoFragmentBonus = evoBuffs.fragmentBonus;
        }
    },

    // ============================================================
    //  主界面刷新
    // ============================================================
    
    // 更新顶部资源栏
    updateTopBar() {
        const topBar = document.getElementById('topResourceBar');
        if (!topBar) return;
        const gold = this.player.gold || 0;
        const talentPoints = this.permanent.talentPoints || 0;
        const passiveSlots = this.getPassiveSlots();
        const equippedCount = (this.player.equippedTalents || []).length;
        const currentFloor = this.currentFloor || 1;
        const currentLayer = this.currentLayer || 1;
        // 计算万能碎片总数
        let totalUniversal = 0;
        if (this.permanent.universalFragments) {
            for (let q=1; q<=5; q++) {
                totalUniversal += this.permanent.universalFragments[q] || 0;
            }
        }
        const self = this;
        topBar.innerHTML = `
            <div class="top-bar-item" data-tooltip="geneEssence">
                <span class="top-bar-icon" style="color:var(--accent-primary)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 4c4 0 4 16 8 16s4-16 8-16\"/><path d=\"M4 20c4 0 4-16 8-16s4 16 8 16\"/><line x1=\"7\" y1=\"8\" x2=\"17\" y2=\"8\"/><line x1=\"7\" y1=\"16\" x2=\"17\" y2=\"16\"/></svg></span>
                <span class="top-bar-value">${gold}</span>
            </div>
            <div class="top-bar-item" data-tooltip="talentPoints">
                <span class="top-bar-icon" style="color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg></span>
                <span class="top-bar-value">${talentPoints}</span>
            </div>
            <div class="top-bar-item" data-tooltip="passiveSlots">
                <span class="top-bar-icon" style="color:var(--accent-info)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg></span>
                <span class="top-bar-value">${equippedCount}/${passiveSlots}</span>
            </div>
            <div class="top-bar-item" data-tooltip="universalFragment">
                <span class="top-bar-icon" style="color:var(--accent-purple)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24\"/></svg></span>
                <span class="top-bar-value">${totalUniversal}</span>
            </div>
            <div class="top-bar-item" data-tooltip="currentFloor">
                <span class="top-bar-icon" style="color:var(--accent-success)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/></svg></span>
                <span class="top-bar-value">${currentFloor}-${currentLayer}层</span>
            </div>
        `;
        // 绑定tooltip事件
        topBar.querySelectorAll('.top-bar-item').forEach(item => {
            const key = item.getAttribute('data-tooltip');
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                self.showTooltip(key, e);
            });
            item.addEventListener('mouseenter', function(e) {
                self.showTooltip(key, e);
            });
            item.addEventListener('mouseleave', function() {
                self.hideTooltip();
            });
        });
    },
    
    refreshMainUI() {
        const currentMap = this.getCurrentMap();
        const mapName = currentMap ? currentMap.name : '未知区域';
        document.getElementById('floorInfo').innerText = `${mapName} · 第 ${this.currentLayer}/${currentMap ? currentMap.totalLayers : '?'} 层（全局第 ${this.currentFloor} 层）`;
        // 隐藏遭遇确认区域
        const enc = document.getElementById('encounterArea');
        if (enc) enc.style.display = 'none';
        const evt = document.getElementById('eventArea');
        if (evt) evt.style.display = 'none';
        const rest = document.getElementById('bossRestArea');
        if (rest) rest.style.display = 'none';
        this.pendingEnemy = null;
        const p = this.player;
        const info = document.getElementById('playerInfo');
        // 更新顶部资源栏
        this.updateTopBar();

        // 局内封锁轮回空间，显示自杀按钮
        const growthBtn = document.getElementById('growthBtn');
        const suicideBtn = document.getElementById('suicideBtn');
        const growthHint = document.getElementById('growthHint');
        if (this.currentFloor > 1) {
            if (growthBtn) { growthBtn.disabled = true; growthBtn.style.opacity = '0.5'; }
            if (suicideBtn) suicideBtn.style.display = 'block';
            if (growthHint) growthHint.style.display = 'block';
        } else {
            if (growthBtn) { growthBtn.disabled = false; growthBtn.style.opacity = '1'; }
            if (suicideBtn) suicideBtn.style.display = 'none';
            if (growthHint) growthHint.style.display = 'none';
        }

        // 精简布局：关键属性大字 + 多列紧凑
        let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span style="color:var(--accent-danger);font-size:16px;font-weight:bold;display:inline-flex;align-items:center;gap:4px"><span style="width:16px;height:16px;display:inline-flex"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg></span>${p.hp}/${p.maxHp}</span>
            <span style="color:var(--accent-orange);font-size:15px;display:inline-flex;align-items:center;gap:4px"><span style="width:15px;height:15px;display:inline-flex"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg></span>${Math.floor(p.attack)}</span>
            <span style="color:var(--accent-info);font-size:15px;display:inline-flex;align-items:center;gap:4px"><span style="width:15px;height:15px;display:inline-flex"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:100%;height:100%\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg></span>${Math.floor(p.defense)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text-muted);margin-bottom:4px">
            <span>暴击 ${p.crit}%</span>
            <span>基础命中 ${p.hit}%</span>
            <span>闪避 ${p.dodgeRate || 0}%</span>
            <span>先手 ${p.speed}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:4px">
            <span>暴伤 ${p.critDamage}%</span>
            <span style="color:var(--text-faint)">实际命中/闪避受双方敏捷影响</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text-faint);margin-bottom:8px">
            <span>Lv.${p.level} (${p.exp}/${p.expToNext})</span>
            <span>基因精华 ${p.gold}</span>
            <span>天赋 ${p.equippedTalents.length}/${this.getPassiveSlots()}</span>
        </div>
        <div style="border-top:1px solid var(--border-primary);padding-top:6px;display:flex;justify-content:space-between;font-size:13px;color:var(--text-secondary)">
            <span>力 ${p.strength}</span>
            <span>敏 ${p.agility}</span>
            <span>体 ${p.vitality}</span>
            <span>感 ${p.perception}</span>
            <span>进 ${p.evolution}</span>
        </div>`;

        info.innerHTML = html;
        
        // 给玩家信息中的属性添加tooltip事件绑定
        const self = this;
        const attrTooltipMap = {
            '等级': 'level', '生命': 'hp', '攻击': 'attack', '防御': 'defense',
            '暴击': 'crit', '基础命中': 'hit', '闪避': 'dodgeRate', '先手': 'speed', '暴伤': 'critDamage',
            '力': 'strength', '敏': 'agility', '体': 'vitality',
            '感': 'perception', '进': 'evolution'
        };
        // 给所有span添加点击事件（通过文本匹配）
        info.querySelectorAll('span').forEach(span => {
            const text = span.textContent.trim();
            // 检查是否包含属性关键词
            for (const keyword in attrTooltipMap) {
                if (text.indexOf(keyword) >= 0) {
                    const tooltipKey = attrTooltipMap[keyword];
                    span.style.cursor = 'pointer';
                    span.style.borderBottom = '1px dashed rgba(255,255,255,0.3)';
                    span.addEventListener('click', function(e) {
                        e.stopPropagation();
                        self.showTooltip(tooltipKey, e);
                    });
                    span.addEventListener('mouseenter', function(e) {
                        self.showTooltip(tooltipKey, e);
                    });
                    span.addEventListener('mouseleave', function() {
                        self.hideTooltip();
                    });
                    break;
                }
            }
        });

        // 属性点分配面板
        const allocDiv = document.getElementById('statAlloc');
        if (p.statPoints > 0) {
            allocDiv.style.display = 'block';
            const stats = ['strength','agility','vitality','perception','evolution'];
            let allocHtml = `<div class="stat-alloc">
                <div style="color:var(--accent-warning);margin-bottom:6px">可用属性点：${p.statPoints}（点击分配）</div>`;
            stats.forEach(s => {
                const si = this.statInfo[s];
                allocHtml += `<button onclick="game.allocateStat('${s}')" class="btn-success">${si.name}+1</button>`;
            });
            allocHtml += `</div>`;
            allocDiv.innerHTML = allocHtml;
        } else {
            allocDiv.style.display = 'none';
        }
    },

    // 分配属性点
    allocateStat(stat) {
        const p = this.player;
        if (p.statPoints <= 0) return;
        p.statPoints--;
        p[stat]++;
        // 记录局内获得（字段名是缩写：Str/Agi/Vit/Per/Evo）
        const gainedMap = {strength:'runStrGained', agility:'runAgiGained', vitality:'runVitGained', perception:'runPerGained', evolution:'runEvoGained'};
        const gainedKey = gainedMap[stat];
        if (gainedKey && p.hasOwnProperty(gainedKey)) p[gainedKey]++;
        // 生命满时重新计算，保持当前血量比例
        const hpRatio = p.hp / p.maxHp;
        this.calcDerivedStats();
        p.hp = Math.floor(p.maxHp * Math.min(1, hpRatio + 0.1)); // 分配属性稍微回点血
        this.refreshMainUI();
    },

    showRandomStory() {
        // 显示当前地图的环境法则作为主界面氛围文本（使用实际生效的效果描述）
        const currentMap = this.getCurrentMap();
        const envEff = this.getEnvironmentEffect();
        if (currentMap && envEff) {
            const isBossFloor = this.currentLayer >= (currentMap.totalLayers || 3);
            const bossHint = isBossFloor ? "<br><br><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-danger)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg> <span style=\"color:var(--accent-danger)\">前方是Boss层，做好准备！</span>" : "";
            document.getElementById('storyText').innerHTML = `【${currentMap.name}】<br>环境法则：${envEff.name}<br>${envEff.desc}${bossHint}`;
            return;
        }
        if (currentMap && currentMap.environmentLaw) {
            const law = currentMap.environmentLaw;
            document.getElementById('storyText').innerHTML = `【${currentMap.name}】<br>环境法则：${law.name}<br>${law.effect}`;
            return;
        }
        document.getElementById('storyText').innerHTML = "继续探索，寻找更强的猎物...";
    },

    // ============================================================
    //  环境法则系统
    // ============================================================
    // 每张地图的环境法则实际效果（有游戏性的属性倾向）
    environmentEffects: {
        primordial_soup: {
            name: "丰饶原液",
            desc: "治疗效果+30%，每回合回复3%最大生命",
            healMod: 1.3,
            perTurnHealPct: 0.03
        },
        tidal_flat: {
            name: "潮汐周期",
            desc: "所有单位速度+15%，先手优势",
            speedMod: 1.15
        },
        coral_rubble: {
            name: "珊瑚迷踪",
            desc: "受到伤害-15%，命中率-10%",
            damageTakenMod: 0.85,
            hitMod: -10
        },
        temperate_forest_floor: {
            name: "落叶庇护",
            desc: "防御+20%，血量低于50%时每回合回复5%",
            defMod: 1.2,
            lowHpHealPct: 0.05,
            lowHpThreshold: 0.5
        },
        rainforest_floor: {
            name: "密林瘴气",
            desc: "攻击+10%，每回合受到2点伤害",
            atkMod: 1.1,
            perTurnDamage: 2
        },
        east_african_savanna: {
            name: "稀树烈日",
            desc: "攻击+15%，治疗效果-30%",
            atkMod: 1.15,
            healMod: 0.7
        }
    },

    // 获取当前地图的环境法则效果
    getEnvironmentEffect() {
        const map = this.getCurrentMap();
        if (!map) return null;
        return this.environmentEffects[map.id] || null;
    },

    // 战斗开始时应用环境法则属性加成
    applyEnvironmentStats(unit) {
        const eff = this.getEnvironmentEffect();
        if (!eff) return;
        if (eff.atkMod) unit.attack = Math.floor(unit.attack * eff.atkMod);
        if (eff.defMod) unit.defense = Math.floor(unit.defense * eff.defMod);
        if (eff.speedMod) unit.speed = Math.floor(unit.speed * eff.speedMod);
        if (eff.hitMod) unit.hit = Math.max(10, Math.min(100, unit.hit + eff.hitMod));
    },

    // 每回合结算环境法则效果（回复/伤害）
    tickEnvironmentEffect(unit) {
        const eff = this.getEnvironmentEffect();
        if (!eff) return;
        // 每回合回复
        if (eff.perTurnHealPct) {
            const heal = Math.floor(unit.maxHp * eff.perTurnHealPct);
            unit.hp = Math.min(unit.maxHp, unit.hp + heal);
        }
        // 低血量回复
        if (eff.lowHpHealPct && unit.hp / unit.maxHp < eff.lowHpThreshold) {
            const heal = Math.floor(unit.maxHp * eff.lowHpHealPct);
            unit.hp = Math.min(unit.maxHp, unit.hp + heal);
        }
        // 每回合伤害
        if (eff.perTurnDamage) {
            unit.hp = Math.max(1, unit.hp - eff.perTurnDamage);
        }
    },

    // ============================================================
    //  地图系统
    // ============================================================
    // 获取有敌人数据的地图列表（当前只有6张地图有敌人，后续扩展）
    getPlayableMaps() {
        const maps = this.data.maps ? this.data.maps.maps : [];
        const enemies = this.data.enemies ? this.data.enemies.enemies : [];
        const mapIdsWithEnemies = [...new Set(enemies.map(e => e.mapId))];
        return maps.filter(m => mapIdsWithEnemies.includes(m.id));
    },

    // 获取当前地图对象
    getCurrentMap() {
        const playable = this.getPlayableMaps();
        if (playable.length === 0) return null;
        return playable[this.currentMapIndex % playable.length];
    },

    // 切换到下一张地图
    advanceToNextMap() {
        const playable = this.getPlayableMaps();
        if (playable.length === 0) return;
        
        // 检查是否通关所有地图，根据最终抉择显示结局
        if (this.currentMapIndex >= playable.length - 1) {
            this.handleFinalEvolutionChoice();
            return;
        }
        
        const oldEra = this.storyData.getEraByMapIndex(this.currentMapIndex);
        const oldChapter = this.storyData.getCurrentChapter(this.currentMapIndex);
        this.currentMapIndex = (this.currentMapIndex + 1) % playable.length;
        this.currentLayer = 1;
        const nextMap = playable[this.currentMapIndex];
        const newEra = this.storyData.getEraByMapIndex(this.currentMapIndex);
        const newChapter = this.storyData.getCurrentChapter(this.currentMapIndex);
        this.appendBattleLog(`进入新地图：${nextMap.name}！`, 'log-info');
        
        // 如果进入新章节，显示章节过渡事件并应用微增益
        const chapterTransition = this.storyData.getChapterTransition(this.currentMapIndex);
        if (chapterTransition && newChapter !== oldChapter) {
            // 应用章节微增益
            this.applyChapterBuff(chapterTransition.buff);
            // 设置待显示的章节过渡事件（等击杀掉落弹窗关闭后再显示）
            this._pendingChapterTransition = chapterTransition;
        }
        // 如果进入新时代（且不是新章节），显示时代开场剧情
        else if (newEra !== oldEra && this.storyData.eraStories[newEra]) {
            const eraStory = this.storyData.eraStories[newEra];
            setTimeout(() => {
                this.showStory(eraStory.text);
            }, 500);
        }
    },
    
    // 应用章节微增益
    applyChapterBuff(buff) {
        if (!buff) return;
        const p = this.player;
        switch (buff.type) {
            case 'maxHp':
                p.maxHp += buff.value;
                p.hp = Math.min(p.hp + buff.value, p.maxHp);
                break;
            case 'attack':
                p.attack += buff.value;
                break;
            case 'defense':
                p.defense += buff.value;
                break;
            case 'speed':
                p.speed += buff.value;
                break;
            case 'crit':
                p.crit += buff.value;
                break;
            case 'all':
                p.attack = Math.floor(p.attack * (1 + buff.value / 100));
                p.defense = Math.floor(p.defense * (1 + buff.value / 100));
                p.maxHp = Math.floor(p.maxHp * (1 + buff.value / 100));
                p.hp = Math.min(p.hp, p.maxHp);
                p.speed = Math.floor(p.speed * (1 + buff.value / 100));
                break;
        }
        this.calcDerivedStats();
    },
    
    // 进化抉择状态
    evolutionChoicesMade: {},
    
    // 检查是否已经做过某章的进化抉择
    hasMadeEvolutionChoice(chapter) {
        return this.evolutionChoicesMade && this.evolutionChoicesMade[chapter] !== undefined;
    },
    
    // 获取某章的进化抉择选择
    getEvolutionChoice(chapter) {
        return this.evolutionChoicesMade ? this.evolutionChoicesMade[chapter] : null;
    },
    
    // 做出进化抉择
    makeEvolutionChoice(chapter, optionId) {
        if (!this.evolutionChoicesMade) this.evolutionChoicesMade = {};
        this.evolutionChoicesMade[chapter] = optionId;
        
        const choiceData = this.storyData.evolutionChoices.find(c => c.chapter === chapter);
        if (choiceData) {
            const option = choiceData.options.find(o => o.id === optionId);
            if (option && option.buff) {
                this.applyEvolutionChoiceBuff(option.buff);
            }
        }
        
        console.log(`[进化抉择] 第${chapter}章选择了: ${optionId}`);
    },
    
    // 应用进化抉择加成（简化版，先记录）
    applyEvolutionChoiceBuff(buff) {
        if (!this.evolutionChoiceBuffs) this.evolutionChoiceBuffs = {};
        Object.assign(this.evolutionChoiceBuffs, buff);
        console.log(`[进化抉择加成] 已应用:`, buff);
    },
    
    // 显示进化抉择弹窗
    showEvolutionChoice(chapter) {
        const choiceData = this.storyData.evolutionChoices.find(c => c.chapter === chapter);
        if (!choiceData) return;
        if (this.hasMadeEvolutionChoice(chapter)) return;
        
        let html = '<div style="text-align:center;margin-bottom:15px">';
        html += `<h3 style="color:var(--accent-warning);margin:0 0 10px 0">${choiceData.title}</h3>`;
        html += `<p style="color:var(--text-secondary);font-size:13px;line-height:1.6">${choiceData.description}</p>`;
        html += '</div>';
        
        html += '<div style="display:flex;gap:10px;margin-top:15px">';
        choiceData.options.forEach((option, index) => {
            const borderColor = index === 0 ? 'var(--accent-info)' : 'var(--accent-success)';
            html += `<div onclick="game.selectEvolutionChoice(${chapter}, '${option.id}')" style="flex:1;padding:15px;border:2px solid ${borderColor};border-radius:8px;cursor:pointer;background:var(--bg-card)" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='var(--bg-card)'">`;
            html += `<h4 style="color:${borderColor};margin:0 0 8px 0;font-size:15px">${option.name}</h4>`;
            html += `<p style="color:var(--text-secondary);font-size:12px;line-height:1.5;margin:0">${option.desc}</p>`;
            html += '</div>';
        });
        html += '</div>';
        
        this.showCustomPopup('进化抉择', html, null, true);
    },
    
    // 选择进化抉择
    selectEvolutionChoice(chapter, optionId) {
        this.makeEvolutionChoice(chapter, optionId);
        this.closePop();
        
        const choiceData = this.storyData.evolutionChoices.find(c => c.chapter === chapter);
        const option = choiceData.options.find(o => o.id === optionId);
        this.showGameAlert('进化抉择已确定', `你选择了【${option.name}】\n${option.desc}\n\n这个抉择将影响你后续的进化方向。`);
    },
    
    // 获取进化抉择加成的中文名称
    getEvolutionBuffName(key) {
        const names = {
            maxHp: '最大生命',
            attack: '攻击力',
            defense: '防御力',
            speed: '速度',
            crit: '暴击率',
            critDamage: '暴击伤害',
            hit: '命中率',
            dodge: '闪避率',
            firstStrike: '先手值',
            hpRegen: '每回合回血',
            allResist: '所有伤害减免',
            physicalResist: '物理伤害减免',
            poisonDamage: '中毒伤害',
            poisonDuration: '中毒持续',
            enemyHit: '敌人命中',
            armorPenetration: '无视防御',
            cooldown: '技能冷却',
            skillCost: '技能消耗',
            normalDamage: '普攻伤害',
            skillDamage: '技能伤害',
            damageTaken: '受到伤害',
            fragmentBonus: '碎片获得',
            ending: '结局类型',
            perRunBonus: '每轮回加成'
        };
        return names[key] || key;
    },
    
    // 显示进化抉择切换面板
    showEvolutionSwitchPanel(chapter) {
        const chapterData = this.storyData.evolutionChoices.find(ec => ec.chapter === chapter);
        if (!chapterData) return;
        
        const currentChoice = this.getEvolutionChoice(chapter);
        const switchCost = chapter * 5;
        
        let html = '<div style="max-width:500px">';
        html += `<h3 style="color:var(--accent-purple);margin-bottom:10px">第${chapter}章·${chapterData.title} - 切换进化方向</h3>`;
        html += `<p style="color:var(--text-muted);font-size:12px;margin-bottom:15px">切换需要消耗 ${switchCost} 进化残留，当前拥有：${this.permanent.essence || 0}</p>`;
        
        chapterData.options.forEach(option => {
            const isSelected = currentChoice === option.id;
            const canSwitch = !isSelected && (this.permanent.essence || 0) >= switchCost;
            
            html += '<div style="padding:10px;margin-bottom:8px;background:var(--bg-secondary);border-radius:6px;border:1px solid ' + (isSelected ? 'var(--accent-success)' : 'var(--border-primary)') + '">';
            html += `<div style="color:var(--text-primary);font-weight:bold;font-size:14px;margin-bottom:4px">${option.name} ${isSelected ? '<span style="color:var(--accent-success);font-size:11px">（当前选择）</span>' : ''}</div>`;
            html += `<div style="color:var(--text-muted);font-size:12px;margin-bottom:6px">${option.desc}</div>`;
            
            // 显示加成效果
            if (option.buff) {
                const buffTexts = [];
                for (const [key, value] of Object.entries(option.buff)) {
                    const buffName = this.getEvolutionBuffName(key);
                    if (buffName && key !== 'ending' && key !== 'perRunBonus') {
                        const sign = value > 0 ? '+' : '';
                        const isPercent = ['crit', 'critDamage', 'hit', 'dodge', 'hpRegen', 'allResist', 'physicalResist', 'poisonDamage', 'poisonDuration', 'enemyHit', 'armorPenetration', 'cooldown', 'skillCost', 'normalDamage', 'skillDamage', 'damageTaken', 'fragmentBonus', 'maxHp', 'attack', 'defense', 'speed'].includes(key);
                        buffTexts.push(`${buffName}${sign}${value}${isPercent ? '%' : ''}`);
                    }
                }
                if (buffTexts.length > 0) {
                    html += `<div style="color:var(--accent-success);font-size:11px;margin-bottom:6px">${buffTexts.join('，')}</div>`;
                }
            }
            
            if (!isSelected) {
                html += `<button onclick="game.switchEvolutionChoice(${chapter}, '${option.id}')" ${canSwitch?'':'disabled'} style="font-size:12px;padding:4px 10px;background:var(--accent-warning)">切换为此方向（${switchCost}残留）</button>`;
            }
            html += '</div>';
        });
        
        html += '<button onclick="game.closePop()" style="width:100%;margin-top:10px;padding:8px;background:var(--bg-secondary)">取消</button>';
        html += '</div>';
        
        this.showPop('进化抉择切换', html);
    },
    
    // 切换进化抉择方向
    switchEvolutionChoice(chapter, optionId) {
        const switchCost = chapter * 5;
        if ((this.permanent.essence || 0) < switchCost) {
            this.showGameAlert('进化残留不足', `切换需要 ${switchCost} 进化残留，当前只有 ${this.permanent.essence || 0}`);
            return;
        }
        
        this.permanent.essence -= switchCost;
        this.evolutionChoicesMade[chapter] = optionId;
        
        // 重新应用所有进化抉择加成
        this.evolutionChoiceBuffs = {};
        for (const ch in this.evolutionChoicesMade) {
            const choiceId = this.evolutionChoicesMade[ch];
            const chapterData = this.storyData.evolutionChoices.find(ec => ec.chapter === parseInt(ch));
            if (chapterData) {
                const option = chapterData.options.find(o => o.id === choiceId);
                if (option && option.buff) {
                    Object.assign(this.evolutionChoiceBuffs, option.buff);
                }
            }
        }
        
        this.savePermanent();
        this.calcDerivedStats();
        this.closePop();
        this.refreshGrowthUI();
        
        const optionName = this.storyData.evolutionChoices.find(ec => ec.chapter === chapter)?.options.find(o => o.id === optionId)?.name || optionId;
        this.showGameAlert('切换成功', `已切换为「${optionName}」，消耗 ${switchCost} 进化残留`);
    },
    
    // 处理最终进化抉择（通关所有地图时）
    handleFinalEvolutionChoice() {
        const finalChoice = this.getEvolutionChoice(7);
        
        if (!finalChoice) {
            // 还没有做最终抉择，先触发最终抉择弹窗
            this.showEvolutionChoice(7);
            // 延迟检查，等玩家做出选择后再处理
            setTimeout(() => {
                const choice = this.getEvolutionChoice(7);
                if (choice) {
                    this.processFinalEnding(choice);
                }
            }, 1000);
            return;
        }
        
        this.processFinalEnding(finalChoice);
    },
    
    // 处理最终结局
    processFinalEnding(choiceId) {
        if (choiceId === 'become_void') {
            this.showEndingA();
        } else if (choiceId === 'eternal_reincarnation') {
            this.showEndingB();
        } else {
            // 默认进入无尽深层
            this.enterEndlessMode();
        }
    },
    
    // 结局A：成为虚无（游戏通关，解锁"虚无之主"称号）
    showEndingA() {
        // 解锁"虚无之主"称号
        if (!this.permanent.titles) this.permanent.titles = [];
        if (!this.permanent.titles.includes('虚无之主')) {
            this.permanent.titles.push('虚无之主');
        }
        this.permanent.hasBeatenGame = true;
        this.savePermanent();
        
        let html = '<div style="text-align:center;padding:20px">';
        html += '<h2 style="color:var(--accent-purple);margin-bottom:15px">结局A：成为虚无</h2>';
        html += '<div style="color:var(--text-secondary);font-size:14px;line-height:1.8;margin-bottom:20px;text-align:left">';
        html += '<p>你吞噬了一切，最终连自己也吞噬了。</p>';
        html += '<p>你成为了虚无，超越了存在与不存在的界限。</p>';
        html += '<p>在无尽的虚空中，你见证着无数宇宙的诞生与毁灭。</p>';
        html += '<p>你不再是生命，而是生命本身的背景。</p>';
        html += '</div>';
        html += '<div style="color:var(--accent-success);font-size:16px;font-weight:bold;margin-bottom:15px">恭喜通关！</div>';
        html += '<div style="color:var(--accent-warning);font-size:14px;margin-bottom:20px">已解锁称号：「虚无之主」</div>';
        html += '<div style="display:flex;gap:10px;justify-content:center">';
        html += '<button onclick="game.startNewGamePlus()" style="padding:10px 20px;background:var(--accent-purple)">开始新游戏+</button>';
        html += '<button onclick="game.closePop();game.showScreen(\'mainScreen\')" style="padding:10px 20px;background:var(--bg-secondary)">返回主界面</button>';
        html += '</div>';
        html += '</div>';
        
        this.showPop('游戏通关', html, null, true);
    },
    
    // 结局B：永恒轮回（解锁新游戏+模式，每次轮回永久属性+3%）
    showEndingB() {
        // 解锁新游戏+模式
        this.permanent.newGamePlusUnlocked = true;
        this.permanent.eternalReincarnation = true;
        this.savePermanent();
        
        let html = '<div style="text-align:center;padding:20px">';
        html += '<h2 style="color:var(--accent-warning);margin-bottom:15px">结局B：永恒轮回</h2>';
        html += '<div style="color:var(--text-secondary);font-size:14px;line-height:1.8;margin-bottom:20px;text-align:left">';
        html += '<p>你选择了永恒轮回，在无尽的循环中不断变强。</p>';
        html += '<p>每一次轮回，你都带着前世的记忆重新开始。</p>';
        html += '<p>死亡不是终点，而是新的起点。</p>';
        html += '<p>在永恒的轮回中，你终将超越一切。</p>';
        html += '</div>';
        html += '<div style="color:var(--accent-success);font-size:16px;font-weight:bold;margin-bottom:15px">新游戏+模式已解锁！</div>';
        html += '<div style="color:var(--accent-warning);font-size:14px;margin-bottom:20px">每次轮回永久属性+3%（永恒轮回加成）</div>';
        html += '<div style="display:flex;gap:10px;justify-content:center">';
        html += '<button onclick="game.startNewGamePlus()" style="padding:10px 20px;background:var(--accent-warning)">开始新游戏+</button>';
        html += '<button onclick="game.closePop();game.showScreen(\'mainScreen\')" style="padding:10px 20px;background:var(--bg-secondary)">返回主界面</button>';
        html += '</div>';
        html += '</div>';
        
        this.showPop('游戏通关', html, null, true);
    },
    
    // 开始新游戏+模式
    startNewGamePlus() {
        this.closePop();
        // 应用永恒轮回加成（如果解锁了）
        if (this.permanent.eternalReincarnation) {
            if (!this.permanent.eternalBonusCount) this.permanent.eternalBonusCount = 0;
            this.permanent.eternalBonusCount++;
            // 每次轮回永久属性+3%
            const bonusPercent = this.permanent.eternalBonusCount * 3;
            if (!this.permanent.eternalBonus) this.permanent.eternalBonus = {};
            this.permanent.eternalBonus.strength = bonusPercent;
            this.permanent.eternalBonus.agility = bonusPercent;
            this.permanent.eternalBonus.vitality = bonusPercent;
            this.permanent.eternalBonus.perception = bonusPercent;
            this.permanent.eternalBonus.evolution = bonusPercent;
            this.savePermanent();
        }
        // 开始新轮回
        this.startNewRun();
        this.showGameAlert('新游戏+', `新游戏+模式已开始！\n\n${this.permanent.eternalReincarnation ? '永恒轮回加成：永久属性+' + (this.permanent.eternalBonusCount * 3) + '%\n' : ''}祝你在新的轮回中更加强大！`);
    },
    
    // 进入无尽深层模式
    enterEndlessMode() {
        this.inEndlessMode = true;
        this.endlessFloor = 1;
        this.appendBattleLog('<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3a9 9 0 0 1 9 9\"/><path d=\"M12 21a9 9 0 0 1-9-9\"/><path d=\"M4.93 4.93a9 9 0 0 1 12.73 0\"/><path d=\"M6.34 17.66a9 9 0 0 1-1.41-1.41\"/></svg> 你已通关所有地图，进入无尽深层！', 'log-victory');
        
        // 显示无尽深层提示
        setTimeout(() => {
            this.showGameAlert('<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3a9 9 0 0 1 9 9\"/><path d=\"M12 21a9 9 0 0 1-9-9\"/><path d=\"M4.93 4.93a9 9 0 0 1 12.73 0\"/><path d=\"M6.34 17.66a9 9 0 0 1-1.41-1.41\"/></svg> 无尽深层', '恭喜你通关了所有地图！\n\n现在进入无尽深层模式：\n• 无限层数，敌人越来越强\n• 每5层一个Boss\n• 第100层遭遇终极Boss\n• 这是轮回成长数值的终极考验！\n\n你能推到第几层？');
        }, 500);
        
        this.refreshUI();
    },
    
    // 获取无尽深层的敌人（属性递增）
    getEndlessEnemy(floor) {
        const allEnemies = this.data.enemies.enemies;
        const bosses = allEnemies.filter(e => e.type === 'boss');
        const normals = allEnemies.filter(e => e.type === 'normal');
        const elites = allEnemies.filter(e => e.type === 'elite');
        
        // 每5层一个Boss
        const isBossFloor = floor % 5 === 0;
        // 第100层是终极Boss
        const isFinalBoss = floor >= 100;
        
        let baseEnemy;
        if (isFinalBoss) {
            // 终极Boss：使用最强的Boss
            baseEnemy = bosses[bosses.length - 1];
        } else if (isBossFloor) {
            baseEnemy = bosses[Math.floor(Math.random() * bosses.length)];
        } else if (floor % 3 === 0 && elites.length > 0) {
            baseEnemy = elites[Math.floor(Math.random() * elites.length)];
        } else {
            baseEnemy = normals[Math.floor(Math.random() * normals.length)];
        }
        
        // 属性递增：每层+5%
        const multiplier = 1 + floor * 0.05;
        const enemy = JSON.parse(JSON.stringify(baseEnemy));
        enemy.stats.hp = Math.floor(enemy.stats.hp * multiplier);
        enemy.stats.atk = Math.floor(enemy.stats.atk * multiplier);
        enemy.stats.def = Math.floor(enemy.stats.def * multiplier);
        
        // 无尽深层敌人名称前缀
        if (isFinalBoss) {
            enemy.name = `<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z\"/><path d=\"M5 20h14\"/></svg> 终极Boss·${enemy.name}`;
        } else if (isBossFloor) {
            enemy.name = `<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3a9 9 0 0 1 9 9\"/><path d=\"M12 21a9 9 0 0 1-9-9\"/><path d=\"M4.93 4.93a9 9 0 0 1 12.73 0\"/><path d=\"M6.34 17.66a9 9 0 0 1-1.41-1.41\"/></svg> 无尽Boss·${enemy.name}`;
        } else {
            enemy.name = `<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 3a9 9 0 0 1 9 9\"/><path d=\"M12 21a9 9 0 0 1-9-9\"/><path d=\"M4.93 4.93a9 9 0 0 1 12.73 0\"/><path d=\"M6.34 17.66a9 9 0 0 1-1.41-1.41\"/></svg> 深层${floor}层·${enemy.name}`;
        }
        
        return enemy;
    },

    // ============================================================
    //  探索
    // ============================================================
    goExplore() {
        if (this.inBattle) return;
        const currentMap = this.getCurrentMap();
        // 成就统计：探索新地图
        if (currentMap && this.permanent.achievementStats) {
            if (!this.permanent.achievementStats.mapsExplored.includes(currentMap.id)) {
                this.permanent.achievementStats.mapsExplored.push(currentMap.id);
                this.checkAchievements();
                // 日常任务：探索地图
                this.updateDailyTask('maps');
            }
        }
        // 当前地图最后一层是Boss层，必定遭遇Boss
        const isBossFloor = currentMap ? (this.currentLayer >= currentMap.totalLayers) : (this.currentFloor % 5 === 0);

        // 非Boss层重置Boss休整标志位
        if (!isBossFloor) this.bossRestShown = false;

        // Boss层必定战斗；普通层随机事件/商人/抽奖，带软保底
        if (!isBossFloor) {
            // 软保底：自上次特殊事件以来的探索次数
            if (this.exploreSinceSpecial === undefined) this.exploreSinceSpecial = 0;
            const specialCount = this.exploreSinceSpecial;
            // 基础概率：商人10% + 抽奖10% = 20%，每探索一次+5%，最多8次必出
            const merchantChance = Math.min(0.1 + specialCount * 0.025, 0.5);
            const gachaChance = Math.min(0.1 + specialCount * 0.025, 0.5);
            const eventChance = 0.3;

            const eventRoll = Math.random();
            if (eventRoll < eventChance && currentMap && currentMap.events && currentMap.events.length > 0) {
                this.triggerRandomEvent(currentMap);
                this.exploreSinceSpecial++;
                return;
            } else if (eventRoll < eventChance + merchantChance) {
                this.showMerchantEvent();
                this.exploreSinceSpecial = 5; // 商人冷却期：接下来5次探索不会触发商人/抽奖
                return;
            } else if (eventRoll < eventChance + merchantChance + gachaChance) {
                this.showGachaEvent();
                this.exploreSinceSpecial = 3; // 抽奖冷却期：接下来3次探索不会触发商人/抽奖
                return;
            }
            this.exploreSinceSpecial++;
        }

        // Boss层先显示休整选项（只触发一次）
        if (isBossFloor && currentMap && currentMap.bossRestOptions && currentMap.bossRestOptions.length > 0 && !this.bossRestShown) {
            this.bossRestShown = true;
            this.showBossRest(currentMap);
            return;
        }

        const enemy = this.getRandomEnemy(isBossFloor);
        if (!enemy) { this.showGameAlert("提示", "没有找到敌人数据"); return; }

        // 暂存待战敌人
        this.pendingEnemy = enemy;

        // 在主界面显示该敌人对应的前置文本
        const narrative = this.getEnemyNarrative(enemy);
        document.getElementById('storyText').innerHTML = narrative.replace(/\n/g, '<br>');

        // 显示敌人信息
        const typeLabel = enemy.type === 'boss' ? '【BOSS】' : (enemy.type === 'elite' ? '【精英】' : '【普通】');
        const typeColor = enemy.type === 'boss' ? 'var(--accent-danger)' : (enemy.type === 'elite' ? 'var(--accent-warning)' : 'var(--accent-success)');
        const ehp = enemy.stats ? enemy.stats.hp : 0;
        const eatk = enemy.stats ? enemy.stats.atk : 0;
        const edef = enemy.stats ? enemy.stats.def : 0;
        const eagi = enemy.stats ? enemy.stats.agi : 0;
        const edesc = enemy.description || '';
        // Dot抗性标签显示
        const dotLabels = [
            {type:'poison', name:'毒', icon:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M4 17c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z\"/><path d=\"M8 14V4\"/><path d=\"M8 4c0-1 1-2 2-2s2 1 2 2\"/><circle cx=\"9\" cy=\"3\" r=\"0.5\"/></svg>'},
            {type:'burn', name:'火', icon:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg>'},
            {type:'bleed', name:'血', icon:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"/></svg>'},
            {type:'wither', name:'凋零', icon:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg>'}
        ];
        let resistHtml = '<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border-primary)">';
        resistHtml += '<span style="color:var(--text-muted);font-size:11px">Dot抗性：</span>';
        dotLabels.forEach(d => {
            const resist = this.getDotResistance(enemy, d.type);
            const resistPct = Math.floor(resist * 100);
            let color = 'var(--accent-success)'; // 低抗性绿色
            if (resist >= 0.5) color = 'var(--accent-danger)'; // 高抗性红色
            else if (resist >= 0.3) color = 'var(--accent-warning)'; // 中抗性橙色
            else if (resist <= 0) color = 'var(--text-faint)'; // 无抗性灰色
            resistHtml += `<span style="color:${color};font-size:11px;margin-left:8px" title="${d.name}抗性${resistPct}%">${d.icon}${resistPct > 0 ? resistPct + '%' : '无'}</span>`;
        });
        resistHtml += '</div>';
        
        document.getElementById('encounterEnemyInfo').innerHTML =
            `<div style="color:${typeColor};font-size:16px;font-weight:bold;margin-bottom:6px">${typeLabel} ${enemy.name}</div>` +
            `<div style="color:var(--text-muted);font-size:13px;margin-bottom:6px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg> 生命：${ehp} | <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg> 攻击：${eatk} | <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg> 防御：${edef} | <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 先手：${eagi}</div>` +
            `<div style="color:var(--text-faint);font-size:12px;line-height:1.5">${edesc}</div>` +
            resistHtml;

        // 显示遭遇确认区域，玩家手动选择进入战斗
        document.getElementById('encounterArea').style.display = 'block';
        const eb = document.getElementById('exploreBtn');
        if (eb) eb.disabled = true;
    },

    // 流浪商人事件
    showMerchantEvent() {
        const merchantData = [
            {name: '基因游商', desc: '一个背着巨大基因囊的游商，他的货物看起来都是新鲜采集的。"嘿，进化者！我这里有刚从深渊带回来的好东西，今天8折，只限今天！"', items: '生命恢复、能量恢复类商品较多'},
            {name: '深渊收集者', desc: '一个浑身散发着阴冷气息的收集者，他的货物都用奇怪的容器装着。"我从最深的深渊带来了这些...你不会想知道它们是怎么来的。8折，要看看吗？"', items: '属性强化、特殊道具类商品较多'},
            {name: '进化黑市商人', desc: '一个藏在阴影中的黑市商人，他的价格总是很诱人。"嘘...小声点，这些都是从实验室偷出来的正品。给你8折，别告诉别人。"', items: '资源包、特殊道具类商品较多'},
            {name: '远古基因贩子', desc: '一个看起来很古老的贩子，他的货物都散发着远古的气息。"这些基因片段来自远古时代...它们蕴含着强大的力量。今天8折，你值得拥有。"', items: '属性强化、能量恢复类商品较多'},
            {name: '变异体商人', desc: '一个本身就是变异体的商人，他的身体上长着各种奇怪的器官。"嘿嘿...我这里的东西都是我自己身体里长出来的，绝对新鲜。8折，要不要试试？"', items: '生命恢复、资源包类商品较多'},
        ];
        const m = merchantData[Math.floor(Math.random() * merchantData.length)];
        this.currentMerchant = m;

        let html = `<h3 style="color:var(--accent-success)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M2 12c0-4 4-6 10-6s10 2 10 6v2c0 4-4 6-10 6s-10-2-10-6z\"/><circle cx=\"8\" cy=\"12\" r=\"1.5\"/><circle cx=\"16\" cy=\"12\" r=\"1.5\"/><path d=\"M10 16c.5.5 1.5.5 2 0s1.5-.5 2 0\"/></svg> 遇到${m.name}</h3>`;
        html += `<div style="margin-bottom:12px;padding:12px;background:var(--bg-secondary);border-radius:8px;border-left:3px solid var(--accent-success)">`;
        html += `<p style="color:var(--text-muted);font-size:13px;line-height:1.8;margin-bottom:8px">${m.desc}</p>`;
        html += `<p style="color:var(--accent-success);font-size:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/></svg> 主营：${m.items}</p>`;
        html += `</div>`;

        html += `<div style="margin-bottom:12px;padding:8px;background:var(--bg-card);border-radius:6px;font-size:13px">`;
        html += `<span style="color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因精华：${this.player.gold}</span>`;
        html += `<span style="color:var(--accent-success);margin-left:15px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v12\"/><path d=\"M15 9.5a3 3 0 0 0-3-1.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3 1.34 3 3-1.34 3-3 3a3 3 0 0 1-3-1.5\"/></svg> 全场8折</span>`;
        html += `</div>`;

        html += `<div style="display:flex;gap:10px;margin-bottom:12px">`;
        html += `<button onclick="game.enterMerchantShop()" style="flex:1;padding:12px;font-size:14px;border-radius:8px;font-weight:bold;background:var(--accent-success);color:white"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"9\" cy=\"21\" r=\"1\"/><circle cx=\"20\" cy=\"21\" r=\"1\"/><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"/></svg> 进入商店（8折）</button>`;
        html += `<button onclick="game.leaveMerchant()" style="flex:1;padding:12px;font-size:14px;border-radius:8px;background:var(--text-faint);color:var(--text-secondary)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0\"/><path d=\"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2\"/><path d=\"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8\"/><path d=\"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\"/></svg> 离开</button>`;
        html += `</div>`;

        this.showPopup(html);
    },

    // 进入商人商店
    enterMerchantShop() {
        this.merchantMode = true;
        this.closePop();
        // 显示主界面商人模式区域
        const merchantArea = document.getElementById('merchantArea');
        if (merchantArea) {
            document.getElementById('merchantDesc').innerText = this.currentMerchant ? this.currentMerchant.desc : '';
            merchantArea.style.display = 'block';
        }
        // 隐藏其他区域
        const encounterArea = document.getElementById('encounterArea');
        if (encounterArea) encounterArea.style.display = 'none';
        const eventArea = document.getElementById('eventArea');
        if (eventArea) eventArea.style.display = 'none';
        // 打开商店
        setTimeout(() => this.openShop('all'), 100);
    },

    // 离开商人，回到主界面（不立即探索，让玩家手动点击探索前进）
    leaveMerchant() {
        this.merchantMode = false;
        this.currentMerchant = null;
        this.closePop();
        const merchantArea = document.getElementById('merchantArea');
        if (merchantArea) merchantArea.style.display = 'none';
        // 设置标志，防止立即又触发商人事件（软保底保护）
        this.exploreSinceSpecial = 3;
        // 回到主界面，显示环境法则，让玩家手动点击探索前进
        this.showScreen('mainScreen');
        this.showRandomStory();
        this.refreshMainUI();
    },

    // 基因转盘抽奖事件
    showGachaEvent() {
        const gachaCost = 30; // 抽奖消耗基因精华
        const canAfford = this.player.gold >= gachaCost;

        let html = `<h3 style="color:var(--accent-purple)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/></svg> 发现基因提取装置</h3>`;
        html += `<p style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;line-height:1.6">"一台古老的基因提取装置还在运转...消耗${gachaCost}基因精华启动它，可能获得有用的东西。"</p>`;

        html += `<div style="margin-bottom:12px;padding:8px;background:var(--bg-card);border-radius:6px;font-size:13px">`;
        html += `<span style="color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因精华：${this.player.gold}</span>`;
        html += `</div>`;

        // 奖品说明（低阶，不超前）
        html += `<div style="margin-bottom:12px;padding:10px;background:var(--bg-secondary);border-radius:6px;font-size:12px;color:var(--text-secondary)">`;
        html += `<div style="color:var(--text-primary);margin-bottom:5px;font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> 可能获得</div>`;
        html += `<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg> 普通万能碎片×2~5：50%</div>`;
        html += `<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-rare)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg> 稀有万能碎片×1~3：30%</div>`;
        html += `<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10 2v7.31\"/><path d=\"M14 9.3V1.99\"/><path d=\"M8.5 2h7\"/><path d=\"M14 9.3a6.5 6.5 0 1 1-4 0\"/></svg> 随机消耗品×1：15%</div>`;
        html += `<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因精华×20~50：5%</div>`;
        html += `<div style="color:var(--accent-warning);margin-top:5px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 仅低阶奖励，史诗及以上需通过战斗获取</div>`;
        html += `</div>`;

        html += `<div style="display:flex;gap:10px;margin-bottom:12px">`;
        html += `<button onclick="game.playGachaEvent()" ${canAfford?'':'disabled'} style="flex:1;padding:12px;font-size:14px;border-radius:8px;font-weight:bold;background:${canAfford?'var(--accent-purple)':'var(--text-faint)'};color:${canAfford?'white':'var(--text-muted)'}"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/></svg> 启动装置（${gachaCost}精华）</button>`;
        html += `<button onclick="game.leaveMerchant()" style="flex:1;padding:12px;font-size:14px;border-radius:8px;background:var(--text-faint);color:var(--text-secondary)">离开商人</button>`;
        html += `</div>`;

        this.showPopup(html);
    },

    // 执行抽奖事件
    playGachaEvent() {
        const gachaCost = 30;
        if (this.player.gold < gachaCost) { this.showGameAlert('提示', '基因精华不足！'); return; }
        this.player.gold -= gachaCost;
        // 基因精华现为局内货币，不再永久累积

        // 抽奖
        const roll = Math.random() * 100;
        let resultText = '';
        let resultIcon = '';

        if (roll < 50) {
            // 普通万能碎片×2~5
            const count = 2 + Math.floor(Math.random() * 4);
            this.permanent.universalFragments[1] = (this.permanent.universalFragments[1] || 0) + count;
            resultText = `获得 ${count} 个普通万能碎片！`;
            resultIcon = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>';
        } else if (roll < 80) {
            // 稀有万能碎片×1~3
            const count = 1 + Math.floor(Math.random() * 3);
            this.permanent.universalFragments[2] = (this.permanent.universalFragments[2] || 0) + count;
            resultText = `获得 ${count} 个稀有万能碎片！`;
            resultIcon = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-rare)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>';
        } else if (roll < 95) {
            // 随机消耗品
            const consumables = this.data.shop ? (this.data.shop.consumables || this.data.shop.items || []) : [];
            if (consumables.length > 0) {
                const item = consumables[Math.floor(Math.random() * consumables.length)];
                if (!this.player.items) this.player.items = [];
                this.player.items.push(item.id);
                resultText = `获得消耗品：${item.name}！`;
                resultIcon = item.icon || '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10 2v7.31\"/><path d=\"M14 9.3V1.99\"/><path d=\"M8.5 2h7\"/><path d=\"M14 9.3a6.5 6.5 0 1 1-4 0\"/></svg>';
            } else {
                const count = 3;
                this.permanent.universalFragments[1] = (this.permanent.universalFragments[1] || 0) + count;
                resultText = `获得 ${count} 个普通万能碎片！`;
                resultIcon = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>';
            }
        } else {
            // 基因精华×20~50
            const bonus = 20 + Math.floor(Math.random() * 31);
            this.player.gold += bonus;
            resultText = `装置返还了 ${bonus} 基因精华！`;
            resultIcon = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg>';
        }

        this.savePermanent();

        // 显示结果
        let html = `<h3 style="color:var(--accent-purple)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/></svg> 提取结果</h3>`;
        html += `<div style="text-align:center;margin:30px 0">`;
        html += `<div style="font-size:60px;margin-bottom:15px">${resultIcon}</div>`;
        html += `<div style="font-size:18px;color:var(--text-primary);font-weight:bold">${resultText}</div>`;
        html += `</div>`;
        html += `<div style="color:var(--accent-warning);text-align:center;margin-bottom:15px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 剩余基因精华：${this.player.gold}</div>`;
        html += `<button onclick="game.closePop()" style="width:100%;padding:12px;border-radius:8px;font-size:14px;font-weight:bold;background:var(--accent-success);color:white">继续探索</button>`;

        this.showPopup(html);
        this.refreshMainUI();
    },

    // 触发随机事件
    triggerRandomEvent(map) {
        const events = map.events.filter(e => !e.isChain); // 暂时只触发非链式事件
        if (events.length === 0) return;
        const event = events[Math.floor(Math.random() * events.length)];
        this.currentEvent = event;

        document.getElementById('eventTitle').innerText = event.name || '随机事件';
        document.getElementById('eventDesc').innerText = event.description || '';

        let optionsHtml = '';
        event.options.forEach((opt, idx) => {
            optionsHtml += `<button onclick="game.chooseEventOption(${idx})" style="display:block;width:100%;margin:6px 0;text-align:left;padding:10px">${opt.text}</button>`;
        });
        document.getElementById('eventOptions').innerHTML = optionsHtml;
        document.getElementById('eventArea').style.display = 'block';
        document.getElementById('encounterArea').style.display = 'none';
    },

    // 选择事件选项
    chooseEventOption(idx) {
        const event = this.currentEvent;
        if (!event || !event.options[idx]) return;
        const opt = event.options[idx];
        const results = [];

        // 新结构：effects数组
        if (opt.effects && Array.isArray(opt.effects)) {
            opt.effects.forEach(eff => {
                const r = this.applyEventEffect(eff);
                if (r) results.push(r);
            });
        }
        // 旧结构：effect字符串
        else if (opt.effect) {
            const effects = opt.effect.split(',');
            effects.forEach(effStr => {
                const r = this.applyLegacyEventEffect(effStr.trim());
                if (r) results.push(r);
            });
        }

        // 显示结果：优先用effects生成的结果，其次用result文本
        let resultText;
        if (this.settings.eventDetail) {
            resultText = results.length > 0 ? results.join('，') : (opt.result || '什么也没发生。');
        } else {
            // 隐藏数值模式：使用模糊描述
            const allEffects = opt.effects || (opt.effect ? opt.effect.split(',') : []);
            resultText = this.getFuzzyEventResult(allEffects);
            if (resultText === '什么也没发生。' && opt.result) resultText = opt.result;
        }
        document.getElementById('eventDesc').innerText = resultText;
        document.getElementById('eventOptions').innerHTML = `<button onclick="game.closeEvent()" style="margin-top:10px">继续探索</button>`;
    },

    // 应用事件效果
    applyEventEffect(eff) {
        if (!eff || !eff.type) return '';
        const p = this.player;
        switch(eff.type) {
            case 'heal':
                const healAmt = Math.min(p.maxHp - p.hp, eff.value || 0);
                p.hp = Math.min(p.maxHp, p.hp + (eff.value || 0));
                return healAmt > 0 ? `恢复${healAmt}点生命` : '';
            case 'damage':
                p.hp = Math.max(1, p.hp - (eff.value || 0));
                return `受到${eff.value}点伤害`;
            case 'gain_exp':
                p.exp += eff.value || 0;
                while (p.exp >= p.expToNext) {
                    p.exp -= p.expToNext;
                    p.level++;
                    p.expToNext = Math.floor(p.expToNext * 1.3);
                    p.statPoints += 3;
                    // 成就统计：最高等级
                    if (!this.permanent.achievementStats) this.initAchievementStats();
                    if (p.level > this.permanent.achievementStats.maxLevel) {
                        this.permanent.achievementStats.maxLevel = p.level;
                        this.checkAchievements();
                    }
                }
                return `获得${eff.value}点经验`;
            case 'gain_stat':
                p[eff.stat] = (p[eff.stat] || 0) + (eff.value || 0);
                const statNames = {maxHp:'生命', defense:'防御', attack:'攻击', speed:'先手值', crit:'暴击率', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', hit:'命中率', dodge:'闪避率', critDamage:'暴击伤害', energy:'能量', maxEnergy:'能量上限', energyRegen:'能量恢复', talentPower:'天赋强度', firstStrike:'先手值', hp:'生命', hpRegen:'生命恢复', dotDamage:'Dot伤害', cooldownReduction:'冷却缩减', armorPenetration:'护甲穿透', critResistance:'暴击抗性', lifeSteal:'吸血', reflectDamage:'反伤', shield:'护盾', thorns:'荆棘'};
                return `${statNames[eff.stat] || eff.stat}+${eff.value}`;
            case 'gain_fragment':
                const qNames = {1:'普通',2:'稀有',3:'史诗',4:'传说',5:'神话'};
                if (eff.tag && eff.tag > 0) {
                    // 标签专属碎片
                    this.addTagFragment(eff.tag, eff.quality, eff.count || 0);
                    const tagName = this.tagNames[eff.tag] || ('标签' + eff.tag);
                    return `获得${eff.count}个【${tagName}】${qNames[eff.quality] || ''}碎片`;
                } else {
                    // 万能碎片
                    this.permanent.universalFragments[eff.quality] = (this.permanent.universalFragments[eff.quality] || 0) + (eff.count || 0);
                    return `获得${eff.count}个${qNames[eff.quality] || ''}万能碎片`;
                }
            case 'gain_energy':
                const energyAmt = Math.min(p.maxEnergy - p.energy, eff.value || 0);
                p.energy = Math.min(p.maxEnergy, p.energy + (eff.value || 0));
                return energyAmt > 0 ? `获得${energyAmt}点能量` : '';
            case 'spawn_elite':
                return '惊动了精英敌人！';
            case 'nothing':
            default:
                return '';
        }
    },

    // 处理旧结构的effect字符串
    applyLegacyEventEffect(effStr) {
        const p = this.player;
        switch(effStr) {
            case 'gain_energy_small':
                p.energy = Math.min(p.maxEnergy, p.energy + 20);
                return '获得20点能量';
            case 'gain_energy_medium':
                p.energy = Math.min(p.maxEnergy, p.energy + 40);
                return '获得40点能量';
            case 'damage_small':
                p.hp = Math.max(1, p.hp - 5);
                return '受到5点伤害';
            case 'damage_medium':
                p.hp = Math.max(1, p.hp - 10);
                return '受到10点伤害';
            case 'gain_gene_small':
                this.permanent.universalFragments[1] = (this.permanent.universalFragments[1] || 0) + 2;
                return '获得2个普通碎片';
            case 'gain_gene_medium':
                this.permanent.universalFragments[2] = (this.permanent.universalFragments[2] || 0) + 1;
                return '获得1个稀有碎片';
            case 'heal_small':
                const hs = Math.min(p.maxHp - p.hp, 15);
                p.hp = Math.min(p.maxHp, p.hp + 15);
                return hs > 0 ? `恢复${hs}点生命` : '';
            case 'heal_medium':
                const hm = Math.min(p.maxHp - p.hp, 30);
                p.hp = Math.min(p.maxHp, p.hp + 30);
                return hm > 0 ? `恢复${hm}点生命` : '';
            case 'gain_exp_small':
                p.exp += 10;
                while (p.exp >= p.expToNext) {
                    p.exp -= p.expToNext;
                    p.level++;
                    p.expToNext = Math.floor(p.expToNext * 1.3);
                    p.statPoints += 3;
                }
                return '获得10点经验';
            default:
                return '';
        }
    },

    // 关闭事件区域
    closeEvent() {
        document.getElementById('eventArea').style.display = 'none';
        this.currentEvent = null;
        const eb = document.getElementById('exploreBtn');
        if (eb) eb.disabled = false;
        this.refreshMainUI();
        this.showRandomStory();
    },


    // 根据战斗速度设置获取调整后的延迟
    getBattleDelay(baseDelay) {
        const speed = this.settings ? this.settings.battleSpeed : 'normal';
        const multipliers = { slow: 1.5, normal: 1.0, fast: 0.5 };
        const mult = multipliers[speed] || 1.0;
        return Math.floor(baseDelay * mult);
    },

    // ========== 共生体系统 ==========
    symbiontSlotNames: {core:'核心', predator:'猎食器官', sensor:'感知器官', motor:'运动器官', energy:'能量器官', evolution:'进化腺体'},
    symbiontQualityNames: {1:'普通',2:'稀有',3:'史诗',4:'传说',5:'神话'},
    symbiontQualityColors: {1:'var(--quality-common)',2:'var(--accent-info)',3:'var(--accent-purple)',4:'var(--accent-warning)',5:'var(--accent-danger)'},

    // 获取共生体模板
    getSymbiontTemplate(symId) {
        const all = this.data.symbionts ? this.data.symbionts.symbionts : [];
        return all.find(s => s.id === symId);
    },

    // 敌人掉落共生体
    rollSymbiontDrop(enemyType) {
        const all = this.data.symbionts ? this.data.symbionts.symbionts : [];
        if (all.length === 0) return null;
        let roll = Math.random();
        let quality = 1;
        if (enemyType === 'boss') {
            if (roll < 0.2) quality = 4;
            else if (roll < 0.7) quality = 3;
            else quality = 2;
        } else if (enemyType === 'elite') {
            if (roll < 0.1) quality = 3;
            else if (roll < 0.4) quality = 2;
            else return null;
        } else {
            if (roll < 0.1) quality = 2;
            else if (roll < 0.25) quality = 1;
            else return null;
        }
        const pool = all.filter(s => s.quality === quality);
        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    },

    // 装备共生体（如果该部位已有共生体，显示替换确认界面）
    equipSymbiont(symId) {
        const tpl = this.getSymbiontTemplate(symId);
        if (!tpl) return {success: false, msg: '共生体不存在'};
        // 检查背包中是否有
        const idx = this.permanent.symbionts.indexOf(symId);
        if (idx < 0) return {success: false, msg: '背包中没有此共生体'};
        // 如果该部位已有装备，显示替换确认界面
        const oldId = this.permanent.equippedSymbionts[tpl.slot];
        if (oldId && oldId !== symId) {
            this.showSymbiontReplaceConfirm(symId, oldId);
            return {success: false, msg: '需要确认替换'};
        }
        // 装备
        this.permanent.symbionts.splice(idx, 1);
        this.permanent.equippedSymbionts[tpl.slot] = symId;
        // 成就统计：共生体
        if (!this.permanent.achievementStats) this.initAchievementStats();
        if (this.permanent.achievementStats.symbiontsEquipped === 0) {
            this.permanent.achievementStats.symbiontsEquipped = 1;
            this.checkAchievements();
        }
        this.savePermanent();
        this.calcDerivedStats();
        return {success: true, msg: '装备成功：' + tpl.name};
    },

    // 卸下共生体
    unequipSymbiont(slot) {
        const symId = this.permanent.equippedSymbionts[slot];
        if (!symId) return {success: false, msg: '该部位未装备'};
        delete this.permanent.equippedSymbionts[slot];
        this.permanent.symbionts.push(symId);
        this.savePermanent();
        this.calcDerivedStats();
        return {success: true, msg: '已卸下'};
    },

    // 获取已装备共生体的属性加成
    getEquippedSymbiontBonus() {
        const bonus = {
            maxHp:0, attack:0, defense:0, crit:0, hit:0, speed:0,
            maxEnergy:0, energyRegen:0, evolution:0, talentPower:0,
            perception:0, agility:0,
            hpRegen:0, healOnKillPct:0, damageReductionPct:0,
            dotOnHit:[], critDamagePct:0, lifeStealPct:0,
            firstStrikeDamagePct:0, dodgeBonus:0, critChanceBonus:0,
            extraAttackChance:0, cooldownReductionPct:0, energyOnHit:0,
            damagePct:0, expBonusPct:0, allStatPct:0
        };
        for (const slot in this.permanent.equippedSymbionts) {
            const symId = this.permanent.equippedSymbionts[slot];
            const tpl = this.getSymbiontTemplate(symId);
            if (!tpl || !tpl.stats) continue;
            // 基础属性
            for (const stat in tpl.stats) {
                if (bonus[stat] !== undefined) {
                    bonus[stat] += tpl.stats[stat];
                }
            }
            // 特殊效果
            if (tpl.special) {
                switch(tpl.special) {
                    case 'hpRegen': bonus.hpRegen += tpl.specialValue || 0; break;
                    case 'healOnKill': bonus.healOnKillPct += tpl.specialValue || 0; break;
                    case 'damageReduction': bonus.damageReductionPct += tpl.specialValue || 0; break;
                    case 'dotOnHit': bonus.dotOnHit.push({type:'poison', stacks: tpl.specialValue || 2}); break;
                    case 'critDamage': bonus.critDamagePct += tpl.specialValue || 0; break;
                    case 'lifeSteal': bonus.lifeStealPct += tpl.specialValue || 0; break;
                    case 'firstStrike': bonus.firstStrikeDamagePct += tpl.specialValue || 0; break;
                    case 'dodgeBonus': bonus.dodgeBonus += tpl.specialValue || 0; break;
                    case 'critChance': bonus.critChanceBonus += tpl.specialValue || 0; break;
                    case 'extraAttack': bonus.extraAttackChance += tpl.specialValue || 0; break;
                    case 'cooldownReduction': bonus.cooldownReductionPct += tpl.specialValue || 0; break;
                    case 'energyOnHit': bonus.energyOnHit += tpl.specialValue || 0; break;
                    case 'damagePct': bonus.damagePct += tpl.specialValue || 0; break;
                    case 'expBonus': bonus.expBonusPct += tpl.specialValue || 0; break;
                    case 'allStatPct': bonus.allStatPct += tpl.specialValue || 0; break;
                    case 'talentPower': bonus.talentPower += tpl.specialValue || 0; break;
                    case 'energyRegen': bonus.energyRegen += tpl.specialValue || 0; break;
                }
            }
        }
        return bonus;
    },

    // 打开共生体面板
    openSymbiontPanel() {
        const equipped = this.permanent.equippedSymbionts;
        const bag = this.permanent.symbionts;
        let html = '<h3>基因共生体</h3>';
        html += '<p style="color:var(--text-muted);font-size:13px;margin-bottom:10px">装备共生体获得属性加成和特殊效果，6个部位各装备1个</p>';
        
        // 已装备部位
        html += '<div style="margin-bottom:15px">';
        html += '<div style="color:var(--accent-warning);margin-bottom:8px">已装备</div>';
        for (const slot in this.symbiontSlotNames) {
            const symId = equipped[slot];
            const tpl = symId ? this.getSymbiontTemplate(symId) : null;
            if (tpl) {
                const color = this.symbiontQualityColors[tpl.quality] || 'var(--text-primary)';
                html += '<div class="talent-card" style="margin-bottom:6px">';
                html += '<div><div class="talent-name" style="color:' + color + '">' + tpl.name + ' <span style="font-size:11px;color:var(--text-muted)">[' + this.symbiontSlotNames[slot] + ']</span></div>';
                // 显示具体数值
                let statsText = '';
                if (tpl.stats) {
                    const statNames = {maxHp:'生命', defense:'防御', attack:'攻击', speed:'先手值', crit:'暴击率', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', hit:'命中率', dodge:'闪避率', critDamage:'暴击伤害', energy:'能量', maxEnergy:'能量上限', energyRegen:'能量恢复', talentPower:'天赋强度', firstStrike:'先手值', hp:'生命', hpRegen:'生命恢复', dotDamage:'Dot伤害', cooldownReduction:'冷却缩减', armorPenetration:'护甲穿透', critResistance:'暴击抗性', lifeSteal:'吸血', reflectDamage:'反伤', shield:'护盾', thorns:'荆棘'};
                    for (const key in tpl.stats) {
                        if (tpl.stats[key]) {
                            statsText += (statNames[key] || key) + '+' + tpl.stats[key] + ' ';
                        }
                    }
                }
                if (tpl.special) {
                    const specialNames = {
                        hpRegen:'每回合回血', healOnKill:'击杀回血', damageReduction:'减伤', 
                        lifeSteal:'吸血', critDamage:'暴伤', dodge:'闪避', dodgeBonus:'闪避加成',
                        firstStrike:'先手', hit:'命中', energyRegen:'能量回复',
                        maxHp:'生命', attack:'攻击', defense:'防御', crit:'暴击',
                        speed:'速度', agility:'敏捷', strength:'力量', perception:'感知',
                        evolution:'进化', maxEnergy:'能量', dotDamage:'Dot伤害',
                        cooldownReduction:'冷却缩减', talentPower:'天赋强度',
                        dotOnHit:'攻击附加中毒', critChance:'暴击率', extraAttack:'额外行动概率',
                        energyOnHit:'攻击回能', damagePct:'伤害加成', expBonus:'经验加成',
                        allStatPct:'全属性加成', extraAttackChance:'额外攻击概率',
                        reflectDamage:'反伤', reflectPct:'反伤百分比', armorPenetration:'护甲穿透',
                        critResistance:'暴击抗性', shield:'护盾', thorns:'荆棘',
                        hpOnHit:'攻击回血', hpOnKill:'击杀回血', energyOnKill:'击杀回能',
                        talentPointsOnKill:'击杀获得天赋点', fragmentsOnKill:'击杀获得碎片',
                        goldBonus:'金币加成', essenceBonus:'进化精粹加成', fragmentBonus:'碎片加成',
                        talentPointBonus:'天赋点加成', allStats:'全属性', allResist:'全抗性',
                        physicalResist:'物理抗性', fireResist:'火焰抗性', iceResist:'冰霜抗性',
                        poisonResist:'毒素抗性', lightningResist:'雷电抗性', shadowResist:'暗影抗性',
                        holyResist:'神圣抗性', arcaneResist:'奥术抗性',
                        physicalPenetration:'物理穿透', firePenetration:'火焰穿透', icePenetration:'冰霜穿透',
                        poisonPenetration:'毒素穿透', lightningPenetration:'雷电穿透', shadowPenetration:'暗影穿透',
                        holyPenetration:'神圣穿透', arcanePenetration:'奥术穿透',
                        bleedOnHit:'攻击附带流血', poisonOnHit:'攻击附带中毒', burnOnHit:'攻击附带灼烧',
                        freezeOnHit:'攻击附带冰冻', stunOnHit:'攻击附带眩晕', paralyzeOnHit:'攻击附带麻痹',
                        slowOnHit:'攻击附带减速', healMod:'治疗效果', damageMod:'伤害加成',
                        damageTakenMod:'受到伤害', hitMod:'命中加成', speedMod:'速度加成',
                        perTurnHealPct:'每回合回血百分比', healOnKillPct:'击杀回血百分比',
                        vitality:'体质', first_strike:'先手值', talent_power:'天赋强度',
                        energy_regen:'能量恢复', hp_regen:'生命恢复', life_steal:'吸血',
                        reflect_damage:'反伤', crit_damage:'暴击伤害', armor_penetration:'护甲穿透',
                        dot_damage:'Dot伤害', cooldown_reduction:'冷却缩减'
                    };
                    statsText += (specialNames[tpl.special] || tpl.special) + (tpl.specialValue ? '+' + tpl.specialValue : '') + ' ';
                }
                html += '<div class="talent-desc">' + tpl.desc + '</div>';
                if (statsText) html += '<div style="color:var(--accent-primary);font-size:12px;margin-top:2px">' + statsText.trim() + '</div></div>';
                html += '<button onclick="game.unequipSymbiontAndRefresh(\'' + slot + '\')" style="font-size:12px;background:var(--accent-danger)">卸下</button>';
                html += '</div>';
            } else {
                html += '<div class="talent-card" style="margin-bottom:6px;opacity:0.5">';
                html += '<div><div class="talent-name" style="color:var(--text-muted)">' + this.symbiontSlotNames[slot] + '（空）</div>';
                html += '<div class="talent-desc">未装备共生体</div></div></div>';
            }
        }
        html += '</div>';
        
        // 背包
        html += '<div style="margin-bottom:15px">';
        html += '<div style="color:var(--accent-success);margin-bottom:8px">背包（' + bag.length + '个）</div>';
        if (bag.length === 0) {
            html += '<p style="color:var(--text-muted);text-align:center;padding:10px">背包为空，击败敌人有几率获得共生体</p>';
        } else {
            html += '<div class="scroll-area" style="padding-bottom:50px">';
            bag.forEach(symId => {
                const tpl = this.getSymbiontTemplate(symId);
                if (!tpl) return;
                const color = this.symbiontQualityColors[tpl.quality] || 'var(--text-primary)';
                const isEquipped = Object.values(equipped).includes(symId);
                html += '<div class="talent-card" style="margin-bottom:6px">';
                html += '<div><div class="talent-name" style="color:' + color + '">' + tpl.name + ' <span style="font-size:11px;color:var(--text-muted)">[' + this.symbiontQualityNames[tpl.quality] + '·' + this.symbiontSlotNames[tpl.slot] + ']</span></div>';
                html += '<div class="talent-desc">' + tpl.desc + '</div>';
                let bagStatsText = '';
                if (tpl.stats) {
                    const bagStatNames = {
                        maxHp:'生命', hp:'生命', attack:'攻击', defense:'防御', crit:'暴击', 
                        speed:'先手', firstStrike:'先手', agility:'敏捷', strength:'力量', 
                        vitality:'体质', perception:'感知', evolution:'进化', hit:'命中',
                        dodge:'闪避', critDamage:'暴伤', energy:'能量', maxEnergy:'能量上限'
                    };
                    for (const key in tpl.stats) {
                        if (tpl.stats[key]) bagStatsText += (bagStatNames[key] || key) + '+' + tpl.stats[key] + ' ';
                    }
                }
                if (tpl.special) {
                    const bagSpecialNames = {
                        hpRegen:'每回合回血', healOnKill:'击杀回血', damageReduction:'减伤', 
                        lifeSteal:'吸血', critDamage:'暴伤', dodge:'闪避', dodgeBonus:'闪避加成',
                        firstStrike:'先手', hit:'命中', energyRegen:'能量回复',
                        maxHp:'生命', attack:'攻击', defense:'防御', crit:'暴击',
                        speed:'速度', agility:'敏捷', strength:'力量', perception:'感知',
                        evolution:'进化', maxEnergy:'能量', dotDamage:'Dot伤害',
                        cooldownReduction:'冷却缩减', talentPower:'天赋强度',
                        dotOnHit:'攻击附加中毒', critChance:'暴击率', extraAttack:'额外行动概率',
                        energyOnHit:'攻击回能', damagePct:'伤害加成', expBonus:'经验加成',
                        allStatPct:'全属性加成', extraAttackChance:'额外攻击概率',
                        reflectDamage:'反伤', reflectPct:'反伤百分比', armorPenetration:'护甲穿透',
                        critResistance:'暴击抗性', shield:'护盾', thorns:'荆棘',
                        hpOnHit:'攻击回血', hpOnKill:'击杀回血', energyOnKill:'击杀回能',
                        talentPointsOnKill:'击杀获得天赋点', fragmentsOnKill:'击杀获得碎片',
                        goldBonus:'金币加成', essenceBonus:'进化精粹加成', fragmentBonus:'碎片加成',
                        talentPointBonus:'天赋点加成', allStats:'全属性', allResist:'全抗性',
                        physicalResist:'物理抗性', fireResist:'火焰抗性', iceResist:'冰霜抗性',
                        poisonResist:'毒素抗性', lightningResist:'雷电抗性', shadowResist:'暗影抗性',
                        holyResist:'神圣抗性', arcaneResist:'奥术抗性',
                        physicalPenetration:'物理穿透', firePenetration:'火焰穿透', icePenetration:'冰霜穿透',
                        poisonPenetration:'毒素穿透', lightningPenetration:'雷电穿透', shadowPenetration:'暗影穿透',
                        holyPenetration:'神圣穿透', arcanePenetration:'奥术穿透',
                        bleedOnHit:'攻击附带流血', poisonOnHit:'攻击附带中毒', burnOnHit:'攻击附带灼烧',
                        freezeOnHit:'攻击附带冰冻', stunOnHit:'攻击附带眩晕', paralyzeOnHit:'攻击附带麻痹',
                        slowOnHit:'攻击附带减速', healMod:'治疗效果', damageMod:'伤害加成',
                        damageTakenMod:'受到伤害', hitMod:'命中加成', speedMod:'速度加成',
                        perTurnHealPct:'每回合回血百分比', healOnKillPct:'击杀回血百分比',
                        vitality:'体质', first_strike:'先手值', talent_power:'天赋强度',
                        energy_regen:'能量恢复', hp_regen:'生命恢复', life_steal:'吸血',
                        reflect_damage:'反伤', crit_damage:'暴击伤害', armor_penetration:'护甲穿透',
                        dot_damage:'Dot伤害', cooldown_reduction:'冷却缩减'
                    };
                    bagStatsText += (bagSpecialNames[tpl.special] || tpl.special) + (tpl.specialValue ? '+' + tpl.specialValue : '') + ' ';
                }
                if (bagStatsText) html += '<div style="color:var(--accent-primary);font-size:12px;margin-top:2px">' + bagStatsText.trim() + '</div>';
                html += '</div>';
                if (!isEquipped) {
                    html += '<button onclick="game.equipSymbiontAndRefresh(\'' + symId + '\')" style="font-size:12px">装备</button>';
                } else {
                    html += '<span style="font-size:11px;color:var(--accent-success)">已装备</span>';
                }
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        html += '<button onclick="game.closePop()" style="margin-top:10px">关闭</button>';
        this.showPopup(html);
    },

    equipSymbiontAndRefresh(symId) {
        const r = this.equipSymbiont(symId);
        // 如果需要确认替换，不重新打开面板，让玩家在替换确认界面中操作
        if (r.msg === '需要确认替换') {
            this.refreshMainUI();
            return;
        }
        if (r.success) this.appendBattleLog(r.msg);
        else if (r.msg) this.showGameAlert("提示", r.msg);
        const self = this;
        setTimeout(function() {
            self.openSymbiontPanel();
            self.refreshMainUI();
        }, 20);
    },

    unequipSymbiontAndRefresh(slot) {
        const r = this.unequipSymbiont(slot);
        if (r.success) this.appendBattleLog(r.msg);
        else if (r.msg) this.showGameAlert("提示", r.msg);
        const self = this;
        setTimeout(function() {
            self.openSymbiontPanel();
            self.refreshMainUI();
        }, 20);
    },
    // 加载设置
    loadSettings() {
        try {
            const saved = localStorage.getItem('tunshi_settings');
            if (saved) {
                this.settings = JSON.parse(saved);
            } else {
                this.settings = { eventDetail: true, battleSpeed: 'normal' };
            }
        } catch(e) {
            this.settings = { eventDetail: true, battleSpeed: 'normal' };
        }
        this.updateSettingsUI();
    },

    // 保存设置
    saveSettings() {
        try {
            localStorage.setItem('tunshi_settings', JSON.stringify(this.settings));
        } catch(e) {}
    },

    // 打开设置面板
    // 打开独立设置页面
    openSettingsPage() {
        this.updateBottomNav('settings');
        this.showScreen('settingsScreen');
        this.updateSettingsUI();
    },

    openSettings() {
        this.openSettingsPage();
    },

    // 关闭设置面板
    closeSettings() {
        document.getElementById('settingsPanel').style.display = 'none';
    },

    // 切换事件结果显示方式
    toggleEventDetail(show) {
        this.settings.eventDetail = show;
        this.saveSettings();
        this.updateSettingsUI();
    },

    // 设置战斗速度
    setBattleSpeed(speed) {
        this.settings.battleSpeed = speed;
        this.saveSettings();
        this.updateSettingsUI();
    },

    // 更新设置UI
    updateSettingsUI() {
        const btnDetail = document.getElementById('btnEventDetail');
        const btnHide = document.getElementById('btnEventHide');
        if (btnDetail && btnHide) {
            if (this.settings.eventDetail) {
                btnDetail.style.background = 'var(--accent-success)';
                btnDetail.style.color = 'var(--text-primary)';
                btnHide.style.background = '';
                btnHide.style.color = '';
            } else {
                btnHide.style.background = 'var(--accent-success)';
                btnHide.style.color = 'var(--text-primary)';
                btnDetail.style.background = '';
                btnDetail.style.color = '';
            }
        }
        // 战斗速度高亮
        const speedBtns = document.querySelectorAll('[id^=btnSpeed]');
        speedBtns.forEach(btn => {
            btn.style.background = '';
            btn.style.color = '';
        });
        const speedMap = { slow: 'btnSpeedSlow', normal: 'btnSpeedNormal', fast: 'btnSpeedFast' };
        const activeBtn = document.getElementById(speedMap[this.settings.battleSpeed]);
        if (activeBtn) {
            activeBtn.style.background = 'var(--accent-success)';
            activeBtn.style.color = 'var(--text-primary)';
        }
        
        // 主题按钮高亮
        const btnThemeDark = document.getElementById('btnThemeDark');
        const btnThemeLight = document.getElementById('btnThemeLight');
        if (btnThemeDark && btnThemeLight) {
            if (this.currentTheme === 'dark') {
                btnThemeDark.style.border = '2px solid var(--accent-primary)';
                btnThemeDark.style.boxShadow = '0 0 10px rgba(0,212,170,0.5)';
                btnThemeLight.style.border = '2px solid var(--text-secondary)';
                btnThemeLight.style.boxShadow = 'none';
            } else {
                btnThemeLight.style.border = '2px solid var(--accent-primary-dark)';
                btnThemeLight.style.boxShadow = '0 0 10px rgba(0,137,123,0.5)';
                btnThemeDark.style.border = '2px solid var(--text-faint)';
                btnThemeDark.style.boxShadow = 'none';
            }
        }
        // 更新新设置选项的显示
        this.updateToggleButton('btnAutoSkip', this.settings.autoSkip || false);
        this.updateToggleButton('btnSfx', this.settings.sfx !== false);
        this.updateToggleButton('btnDamageNumbers', this.settings.damageNumbers !== false);
        this.updateToggleButton('btnSimpleLog', this.settings.simpleLog || false);
    },

    // 更新开关按钮显示
    updateToggleButton(btnId, isOn) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        if (isOn) {
            btn.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-primary-dark))';
            btn.style.color = 'var(--text-primary)';
            btn.innerText = '开启';
        } else {
            btn.style.background = 'var(--text-faint)';
            btn.style.color = 'var(--text-secondary)';
            btn.innerText = '关闭';
        }
    },

    // 切换自动跳过战斗动画
    toggleAutoSkip() {
        this.settings.autoSkip = !this.settings.autoSkip;
        this.saveSettings();
        this.updateSettingsUI();
    },

    // 切换音效
    toggleSfx() {
        this.settings.sfx = this.settings.sfx === false ? true : false;
        this.saveSettings();
        this.updateSettingsUI();
    },

    // 切换伤害数字显示
    toggleDamageNumbers() {
        this.settings.damageNumbers = this.settings.damageNumbers === false ? true : false;
        this.saveSettings();
        this.updateSettingsUI();
    },

    // 切换简化战斗日志
    toggleSimpleLog() {
        this.settings.simpleLog = !this.settings.simpleLog;
        this.saveSettings();
        this.updateSettingsUI();
    },

    // 导出存档
    exportSave() {
        const saveData = {
            permanent: this.permanent,
            settings: this.settings
        };
        const saveStr = btoa(unescape(encodeURIComponent(JSON.stringify(saveData))));
        // 复制到剪贴板
        if (navigator.clipboard) {
            navigator.clipboard.writeText(saveStr).then(() => {
                this.showGameAlert('成功', '存档已复制到剪贴板！');
            }).catch(() => {
                prompt('复制以下存档代码：', saveStr);
            });
        } else {
            prompt('复制以下存档代码：', saveStr);
        }
    },

    // 导入存档
    importSave() {
        const saveStr = prompt('请粘贴存档代码：');
        if (!saveStr) return;
        try {
            const saveData = JSON.parse(decodeURIComponent(escape(atob(saveStr.trim()))));
            if (saveData.permanent) {
                this.permanent = saveData.permanent;
                this.savePermanent();
            }
            if (saveData.settings) {
                this.settings = saveData.settings;
                this.saveSettings();
            }
            this.showGameAlert('导入成功', '存档导入成功！页面将刷新。', () => {
                location.reload();
            });
        } catch (e) {
            this.showGameAlert('错误', '存档代码无效，请检查后重试！');
        }
    },

    // 清除存档
    clearSave() {
        const self = this;
        this.showGameConfirm('警告', '确定要清除所有存档吗？此操作不可恢复！', function() {
            self.showGameConfirm('最终确认', '所有游戏进度、天赋、碎片都将被清除，确定吗？', function() {
                localStorage.removeItem('tunshi_save_v2');
                localStorage.removeItem('tunshi_settings');
                self.showGameAlert('提示', '存档已清除！页面将刷新。');
                setTimeout(function() { location.reload(); }, 1500);
            });
        });
    },

    // 获取事件结果的模糊描述
    getFuzzyEventResult(effects) {
        const fuzzy = [];
        effects.forEach(eff => {
            if (!eff) return;
            const type = eff.type || eff;
            switch(type) {
                case 'heal': fuzzy.push('你感到生命力在恢复'); break;
                case 'damage': fuzzy.push('你受到了一些伤害'); break;
                case 'gain_exp': fuzzy.push('你获得了一些经验'); break;
                case 'gain_stat': fuzzy.push('你感到属性有所提升'); break;
                case 'gain_fragment': fuzzy.push('你获得了一些基因碎片'); break;
                case 'gain_energy': fuzzy.push('你感到能量在充盈'); break;
                case 'gain_energy_small':
                case 'gain_energy_medium': fuzzy.push('你感到能量在充盈'); break;
                case 'damage_small':
                case 'damage_medium': fuzzy.push('你受到了一些伤害'); break;
                case 'gain_gene_small':
                case 'gain_gene_medium': fuzzy.push('你获得了一些基因碎片'); break;
                case 'spawn_elite': fuzzy.push('你惊动了强大的敌人！'); break;
                case 'nothing': break;
                default: fuzzy.push('发生了一些事情'); break;
            }
        });
        return fuzzy.length > 0 ? fuzzy.join('，') : '什么也没发生。';
    },

    // 显示Boss层休整选项
    showBossRest(map) {
        const options = map.bossRestOptions;
        let optionsHtml = '';
        options.forEach((opt, idx) => {
            optionsHtml += `<button onclick="game.chooseBossRest(${idx})" style="display:block;width:100%;margin:8px 0;text-align:left;padding:12px;font-size:14px">${opt.text}</button>`;
        });
        document.getElementById('bossRestOptions').innerHTML = optionsHtml;
        document.getElementById('bossRestArea').style.display = 'block';
        document.getElementById('encounterArea').style.display = 'none';
        document.getElementById('eventArea').style.display = 'none';
    },

    // 选择Boss休整选项
    chooseBossRest(idx) {
        const map = this.getCurrentMap();
        if (!map || !map.bossRestOptions[idx]) return;
        const opt = map.bossRestOptions[idx];
        const effect = opt.effect || 'none';

        // 应用休整效果
        if (effect === 'heal_50') {
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + Math.floor(this.player.maxHp * 0.5));
            this.appendBattleLog('休整恢复了50%生命。');
        } else if (effect === 'reselect_skills') {
            // 显示当前可用技能列表
            const skills = this.getAvailableSkills();
            let skillHtml = '<h3>当前可用技能</h3>';
            skills.forEach(s => {
                skillHtml += '<div style="padding:8px;margin:4px 0;background:var(--bg-secondary);border-radius:6px">';
                skillHtml += '<b>' + s.name + '</b> | 消耗' + s.cost + '能量' + (s.cooldown > 0 ? ' | 冷却' + s.cooldown + '回合' : '');
                skillHtml += '<br><span style="color:var(--text-secondary);font-size:12px">' + s.desc + '</span></div>';
            });
            skillHtml += '<p style="color:var(--text-muted);font-size:12px;margin-top:10px">技能通过装备天赋解锁，当前共' + skills.length + '个技能</p>';
            skillHtml += '<button onclick="game.closePop();game.chooseBossRest(' + idx + ');" style="margin-top:10px">确认并迎战Boss</button>';
            this.showPopup(skillHtml);
            return;
        }

        document.getElementById('bossRestArea').style.display = 'none';
        this.refreshMainUI();

        // 直接进入Boss战
        const enemy = this.getRandomEnemy(true);
        if (!enemy) { this.showGameAlert('提示', '没有找到Boss数据'); return; }
        this.pendingEnemy = enemy;
        const narrative = this.getEnemyNarrative(enemy);
        document.getElementById('storyText').innerHTML = narrative.replace(/\n/g, '<br>');
        
        // 更新敌人信息（修复Boss战前显示错误敌人的问题）
        const typeLabel = '【BOSS】';
        const typeColor = 'var(--accent-danger)';
        const ehp = enemy.stats ? enemy.stats.hp : 0;
        const eatk = enemy.stats ? enemy.stats.atk : 0;
        const edef = enemy.stats ? enemy.stats.def : 0;
        const eagi = enemy.stats ? enemy.stats.agi : 0;
        const edesc = enemy.description || '';
        document.getElementById('encounterEnemyInfo').innerHTML =
            '<div style="color:' + typeColor + ';font-size:16px;font-weight:bold;margin-bottom:6px">' + typeLabel + ' ' + enemy.name + '</div>' +
            '<div style="color:var(--text-muted);font-size:13px;margin-bottom:6px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg> 生命：' + ehp + ' | <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg> 攻击：' + eatk + ' | <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg> 防御：' + edef + ' | <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 先手：' + eagi + '</div>' +
            '<div style="color:var(--text-faint);font-size:12px;line-height:1.5">' + edesc + '</div>';
        
        document.getElementById('encounterArea').style.display = 'block';
    },

    // 玩家确认进入战斗
    enterBattle() {
        if (!this.pendingEnemy) return;
        document.getElementById('encounterArea').style.display = 'none';
        this.startBattle(this.pendingEnemy);
        this.pendingEnemy = null;
        const eb = document.getElementById('exploreBtn');
        if (eb) eb.disabled = false;
    },

    // 逃跑：损失20%生命，重新探索
    fleeBattle() {
        this.pendingEnemy = null;
        document.getElementById('encounterArea').style.display = 'none';
        const p = this.player;
        const damage = Math.floor(p.maxHp * 0.2);
        p.hp = Math.max(1, p.hp - damage);
        const eb = document.getElementById('exploreBtn');
        if (eb) eb.disabled = false;
        this.showRandomStory();
        this.refreshMainUI();
        if (p.hp <= 0) {
            this.deathSettlement();
        }
    },

    // 获取敌人对应的前置文本（包含名字、类型、关键属性、描述）
    getEnemyNarrative(enemy) {
        const typeLabel = enemy.type === 'boss' ? '【BOSS】' : (enemy.type === 'elite' ? '【精英】' : '【普通】');
        const typeColor = enemy.type === 'boss' ? 'var(--accent-danger)' : (enemy.type === 'elite' ? 'var(--accent-warning)' : 'var(--accent-success)');
        const hp = enemy.stats ? enemy.stats.hp : 0;
        const atk = enemy.stats ? enemy.stats.atk : 0;
        const desc = enemy.description || '';
        return `【遭遇】${typeLabel} ${enemy.name}\n<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg> 生命：${hp}  <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg> 攻击：${atk}\n${desc}`;
    },

    getRandomEnemy(isBoss) {
        const enemies = this.data.enemies.enemies;
        if (!enemies || enemies.length === 0) return null;
        const currentMap = this.getCurrentMap();
        let pool = enemies;
        // 按当前地图过滤敌人
        if (currentMap) {
            const mapPool = enemies.filter(e => e.mapId === currentMap.id);
            if (mapPool.length > 0) pool = mapPool;
        }
        // 按Boss/普通过滤
        if (isBoss) {
            const bossPool = pool.filter(e => e.type === 'boss');
            if (bossPool.length > 0) pool = bossPool;
        } else {
            const normalPool = pool.filter(e => e.type !== 'boss');
            if (normalPool.length > 0) pool = normalPool;
        }
        const base = pool[Math.floor(Math.random()*pool.length)];
        // 层数系数基于当前地图内的层数
        const fm = 1 + (this.currentLayer - 1) * 0.12;
        return {
            ...base,
            stats: {
                hp: Math.floor(base.stats.hp * fm),
                maxHp: Math.floor(base.stats.hp * fm),
                atk: Math.floor(base.stats.atk * fm),
                def: Math.floor(base.stats.def * fm),
                agi: base.stats.agi,
                per: base.stats.per
            }
        };
    },

    // ============================================================
    //  战斗系统（完整公式）
    // ============================================================
    startBattle(enemy) {
        this.inBattle = true;
        this.battleEnding = false;
        this.currentEnemy = enemy;
        this.battleLog = [];
        // 清空战斗日志DOM元素
        const logDiv = document.getElementById('battleLog');
        if (logDiv) logDiv.innerHTML = '';
        this.clearStatuses(this.player);
        this.clearStatuses(enemy);
        this.player.skillCooldowns = {};
        // 初始化敌人AI状态
        enemy.charging = false;
        enemy.defending = false;
        enemy.enraged = false;

        // 应用环境法则属性加成
        const envEff = this.getEnvironmentEffect();
        if (envEff) {
            // 玩家
            this.applyEnvironmentStats(this.player);
            // 敌人（属性在stats中）
            if (envEff.atkMod) enemy.stats.atk = Math.floor(enemy.stats.atk * envEff.atkMod);
            if (envEff.defMod) enemy.stats.def = Math.floor(enemy.stats.def * envEff.defMod);
            if (envEff.speedMod) enemy.stats.agi = Math.floor(enemy.stats.agi * envEff.speedMod);
        }

        // 先手判定：比较先手值，相等随机
        const enemySpeed = enemy.stats.agi || 5;
        if (this.player.speed >= enemySpeed) {
            this.playerTurn = true;
        } else {
            this.playerTurn = false;
        }

        this.showScreen('battleScreen');
        const map = this.getCurrentMap();
        const envName = envEff ? ` | 环境：${envEff.name}` : '';
        document.getElementById('battleFloorInfo').innerText = `${map ? map.name : ''} · 第 ${this.currentLayer} 层${envName}`;
        if (envEff) this.appendBattleLog(`【环境法则】${envEff.name}：${envEff.desc}`, 'log-info');
        this.appendBattleLog(`遭遇了 ${enemy.name}！`, 'log-info');
        if (enemy.description) this.appendBattleLog(enemy.description, 'log-info');
        // 显示双方实际命中率（考虑敏捷差和闪避）
        const playerHitResult = this.calcHit(this.player, enemy, true);
        const enemyHitResult = this.calcHit(enemy, this.player, false);
        this.appendBattleLog(`你的命中率：${Math.floor(playerHitResult.finalHit)}%（敌人闪避${Math.floor(playerHitResult.dodgeRate)}%）`, 'log-info');
        this.appendBattleLog(`敌人命中率：${Math.floor(enemyHitResult.finalHit)}%（你的闪避${Math.floor(enemyHitResult.dodgeRate)}%）`, 'log-info');
        this.appendBattleLog(`先手判定：${this.playerTurn ? '你' : enemy.name}先手`, 'log-info');

        // 天赋：战斗开始效果
        const startBonus = this.getEquippedTalentBonus();
        if (startBonus.startStealth) {
            this.addStatus(this.player, {id: 'stealth', name: '隐身', type: 'buff', subtype: 'stealth', duration: 2, source: 'talent'});
            this.appendBattleLog('你进入隐身状态！(2回合内敌人命中率降低)', 'log-info');
        }
        if (startBonus.startCharm) {
            this.addStatus(enemy, {id: 'charm', name: '魅惑', type: 'control', subtype: 'charm', duration: 1, source: 'talent'});
            this.appendBattleLog(enemy.name + '被魅惑！(1回合无法行动)', 'log-info');
        }
        if (startBonus.startShield > 0) {
            this.addStatus(this.player, {id: 'shield', name: '护盾', type: 'buff', subtype: 'shield', duration: 3, value: startBonus.startShield, source: 'talent'});
            this.appendBattleLog('你获得' + startBonus.startShield + '点护盾！', 'log-info');
        }

        this.refreshBattleUI();
        // 快速狩猎：玩家攻击力 > 敌人最大生命 × 1.5 时显示
        const quickBtn = document.getElementById('quickHuntBtn');
        if (quickBtn) {
            if (this.player.attack > enemy.stats.maxHp * 1.5 && enemy.type !== 'boss') {
                quickBtn.style.display = 'block';
            } else {
                quickBtn.style.display = 'none';
            }
        }
        if (!this.playerTurn) {
            document.querySelectorAll('#battleActions button').forEach(b => b.disabled = true);
            setTimeout(() => this.enemyTurn(), this.getBattleDelay(500));
        }
    },

    refreshBattleUI() {
        const e = this.currentEnemy;
        const p = this.player;
        document.getElementById('enemyName').innerText = e.name + (e.type === 'boss' ? ' (BOSS)' : '');
        document.getElementById('enemyHpFill').style.width = Math.max(0, e.stats.hp/e.stats.maxHp*100) + '%';
        // HP条数值显示
        const enemyHpBar = document.querySelector('.enemy-hp');
        if (enemyHpBar) enemyHpBar.setAttribute('data-hp', e.stats.hp + '/' + e.stats.maxHp);
        const playerHpBar = document.querySelector('#battleScreen .hp-bar:not(.enemy-hp)');
        if (playerHpBar) playerHpBar.setAttribute('data-hp', p.hp + '/' + p.maxHp);
        // 战斗界面顶部资源栏更新
        const battleTopHp = document.getElementById('battleTopHp');
        const battleTopEnergy = document.getElementById('battleTopEnergy');
        const battleTopFloor = document.getElementById('battleTopFloor');
        if (battleTopHp) battleTopHp.textContent = p.hp + '/' + p.maxHp;
        if (battleTopEnergy) battleTopEnergy.textContent = p.energy + '/' + p.maxEnergy;
        if (battleTopFloor) battleTopFloor.textContent = (this.currentFloor || 1) + '-' + (this.currentLayer || 1) + '层';
        const eCrit = 5 + (e.stats.per || 5) * 0.8;
        const eHit = 85 + (e.stats.per || 5) / 5;
        const eStatus = this.formatStatuses(e);
        document.getElementById('enemyStats').innerHTML =
            `生命：${e.stats.hp}/${e.stats.maxHp} | 攻击：${e.stats.atk} | 防御：${e.stats.def} | 先手：${e.stats.agi||5} | 暴击：${eCrit.toFixed(0)}% | 命中：${eHit.toFixed(0)}%${eStatus?'<br>'+eStatus:''}`;

        document.getElementById('playerHpFill').style.width = Math.max(0, p.hp/p.maxHp*100) + '%';
        const pStatus = this.formatStatuses(p);
        // 给状态效果标签添加tooltip事件绑定
        const self = this;
        setTimeout(function() {
            document.querySelectorAll('#battleScreen .status-tag').forEach(tag => {
                const key = tag.getAttribute('data-tooltip');
                if (key) {
                    tag.addEventListener('click', function(e) {
                        e.stopPropagation();
                        self.showTooltip(key, e);
                    });
                    tag.addEventListener('mouseenter', function(e) {
                        self.showTooltip(key, e);
                    });
                    tag.addEventListener('mouseleave', function() {
                        self.hideTooltip();
                    });
                }
            });
        }, 50);
        document.getElementById('battlePlayerStats').innerHTML =
            `生命：${p.hp}/${p.maxHp} | 攻击：${p.attack} | 防御：${p.defense} | 暴击：${p.crit}% | 命中：${p.hit}% | 先手：${p.speed} | 能量：${p.energy}/${p.maxEnergy}${pStatus?'<br>'+pStatus:''}`;
    },

    appendBattleLog(text, className='') {
        this.battleLog.push({text, className});
        const logDiv = document.getElementById('battleLog');
        const p = document.createElement('p');
        p.className = className;
        p.innerHTML = text;
        logDiv.appendChild(p);
        logDiv.scrollTop = logDiv.scrollHeight;
    },

    // 玩家普攻
    playerAttack() {
        if (this.battleEnding) return;
        if (!this.playerTurn || !this.inBattle) return;
        const ctrl = this.isControlled(this.player, false);
        if (ctrl.controlled) {
            this.appendBattleLog(`你被${ctrl.reason}，无法行动！`, 'log-info');
            this.endPlayerTurn();
            return;
        }
        this.performAttack(this.player, this.currentEnemy, true);
        if (this.checkBattleEnd()) return;
        this.endPlayerTurn();
    },

    // 执行一次攻击（通用，含命中/暴击/伤害公式）
    performAttack(attacker, defender, isPlayer) {
        const atkName = isPlayer ? "你" : (attacker.name || "敌人");
        const defName = isPlayer ? defender.name : "你";

        // 1. 命中判定
        let hitResult = this.calcHit(attacker, defender, isPlayer);
        // 进化抉择：敌人命中率减益（玩家受到攻击时）
        if (!isPlayer && this.player.evoEnemyHitDebuff) {
            // 重新计算命中率，减去敌人命中率减益
            const enemyHit = Math.max(0, (hitResult.hitRate || 85) + this.player.evoEnemyHitDebuff);
            if (Math.random() * 100 > enemyHit) {
                hitResult = {hit: false, hitRate: enemyHit};
            }
        }
        // 攻击时概率无视闪避（玩家攻击时）
        if (!hitResult.hit && isPlayer) {
            const atkBonus = this.getEquippedTalentBonus();
            if (atkBonus.attackIgnoreDodgeChance > 0 && Math.random() < atkBonus.attackIgnoreDodgeChance) {
                hitResult = {hit: true, hitRate: 100};
                this.appendBattleLog('【红外锁定】攻击无视闪避，必定命中！', 'log-info');
            }
        }
        if (!hitResult.hit) {
            this.appendBattleLog(`${atkName}的攻击被${defName}闪避了！`, 'log-info');
            // 闪避反击（玩家闪避敌人攻击）
            if (!isPlayer) {
                const defBonus = this.getEquippedTalentBonus();
                if (defBonus.dodgeCounterChance > 0 && Math.random() < defBonus.dodgeCounterChance) {
                    if (attacker.stats && attacker.stats.hp > 0) {
                        this.appendBattleLog('闪避触发反击！', 'log-info');
                        const counterDmg = Math.floor(this.player.attack * (defBonus.dodgeCounterMult || 0.5));
                        attacker.stats.hp = Math.max(0, attacker.stats.hp - counterDmg);
                        this.appendBattleLog('反击造成 ' + counterDmg + ' 点伤害！', 'log-damage');
                    }
                }
            }
            return;
        }

        // 2. 暴击判定
        let critResult = this.calcCrit(attacker);
        // 暴击抗性（玩家受到攻击时降低被暴击概率）
        if (!isPlayer && critResult.crit) {
            const defBonus = this.getEquippedTalentBonus();
            if (defBonus.critResistance > 0 && Math.random() * 100 < defBonus.critResistance) {
                critResult = {crit: false};
                this.appendBattleLog('【硬化骨骼】暴击抗性生效，抵消了暴击！', 'log-info');
            }
        }
        const critMult = critResult.crit ? (attacker.critDamage || 150) / 100 : 1;

        // 3. 伤害计算：攻击 × (1-减伤率) × 暴击倍率 × 随机浮动
        const baseAtk = isPlayer ? attacker.attack : (attacker.stats ? attacker.stats.atk : 10);
        let baseDef = isPlayer ? (defender.stats ? defender.stats.def : 2) : defender.defense;
        // 进化抉择：无视防御加成（玩家攻击时）
        if (isPlayer && this.player.evoArmorPenetration) {
            const penPct = this.player.evoArmorPenetration / 100;
            baseDef = Math.max(0, baseDef * (1 - penPct));
        }
        const reduction = baseDef / (baseDef + 100);
        const variance = 0.9 + Math.random() * 0.2;
        let damage = Math.floor(baseAtk * (1 - reduction) * critMult * variance);
        // 进化抉择：普攻伤害加成（玩家普通攻击时）
        if (isPlayer && this.player.evoNormalDamageBonus) {
            damage = Math.floor(damage * (1 + this.player.evoNormalDamageBonus / 100));
        }
        // 天赋：造成伤害加成
        const atkTalent = isPlayer ? (this.talentBonus || {}) : {};
        if (atkTalent.damagePct) damage = Math.floor(damage * (1 + atkTalent.damagePct));
        
        // 因果之链：附加上次记录的伤害
        if (isPlayer && this.player.causalDamage && this.player.causalDamage > 0) {
            const causalPct = atkTalent.causalChainPct || 0.35;
            const causalDmg = Math.floor(this.player.causalDamage * causalPct);
            damage += causalDmg;
            this.appendBattleLog('【因果之链】附加记录的伤害 ' + causalDmg + ' 点！', 'log-damage');
            this.player.causalDamage = 0;
        }
        // 天赋：对低血量目标增伤
        if (atkTalent.lowHpDamagePct && defender.stats && defender.stats.hp / defender.stats.maxHp < 0.5) {
            damage = Math.floor(damage * (1 + atkTalent.lowHpDamagePct));
        }
        // 天赋：先手攻击额外伤害
        if (atkTalent.firstStrikeDamagePct && this.isFirstStrike) {
            damage = Math.floor(damage * (1 + atkTalent.firstStrikeDamagePct));
        }
        // 天赋：受到伤害减免
        const defTalent = !isPlayer ? (this.talentBonus || {}) : {};
        if (defTalent.damageReductionPct) damage = Math.floor(damage * (1 - defTalent.damageReductionPct));
        // 进化抉择：受到伤害减免（玩家受到攻击时）
        if (!isPlayer && this.player.evoAllResist) {
            damage = Math.floor(damage * (1 - this.player.evoAllResist / 100));
        }
        // 进化抉择：物理伤害减免（玩家受到攻击时）
        if (!isPlayer && this.player.evoPhysicalResist) {
            damage = Math.floor(damage * (1 - this.player.evoPhysicalResist / 100));
        }
        // 进化抉择：受到伤害加成（玩家受到攻击时，负面效果）
        if (!isPlayer && this.player.evoDamageTakenMod) {
            damage = Math.floor(damage * (1 + this.player.evoDamageTakenMod / 100));
        }
        // 敌人防御姿态：伤害减半
        if (isPlayer && defender.defending) {
            damage = Math.floor(damage * 0.5);
            this.appendBattleLog(`${defender.name}的防御姿态抵消了部分伤害！`, 'log-info');
        }
        // 能量满时下次攻击伤害倍率（灵能爆发）
        if (isPlayer && this.player.energy >= this.player.maxEnergy) {
            const atkBonus = this.getEquippedTalentBonus();
            if (atkBonus.energyFullDamageMult > 1.0) {
                damage = Math.floor(damage * atkBonus.energyFullDamageMult);
                this.appendBattleLog('【灵能爆发】能量满，伤害提升至' + Math.floor(atkBonus.energyFullDamageMult * 100) + '%！', 'log-damage');
            }
        }
        // 攻击时概率造成额外伤害（鹰眼、弱点洞察）
        if (isPlayer) {
            const atkBonus = this.getEquippedTalentBonus();
            if (atkBonus.attackProcDamageChance > 0 && Math.random() < atkBonus.attackProcDamageChance) {
                const extraDmg = Math.floor(damage * (atkBonus.attackProcDamageMult - 1));
                if (extraDmg > 0) {
                    damage += extraDmg;
                    this.appendBattleLog('【弱点洞察】触发额外伤害，追加' + extraDmg + '点！', 'log-damage');
                }
            }
        }
        // 受到暴击伤害减伤（硬化骨骼）
        if (!isPlayer && critResult.crit) {
            const defBonus = this.getEquippedTalentBonus();
            if (defBonus.critDamageReduction > 0) {
                damage = Math.floor(damage * (1 - defBonus.critDamageReduction));
                this.appendBattleLog('【硬化骨骼】暴击伤害减免' + Math.floor(defBonus.critDamageReduction * 100) + '%！', 'log-info');
            }
        }
        damage = Math.max(1, damage);

        // 4. 扣血
        if (isPlayer) {
            defender.stats.hp -= damage;
        } else {
            // 玩家受到伤害：检查致命伤害保留
            const defBonus = this.getEquippedTalentBonus();
            let actualDamage = damage;
            // 护盾吸收
            if (defender.shield && defender.shield > 0) {
                const shieldAbsorb = Math.min(defender.shield, damage);
                defender.shield -= shieldAbsorb;
                actualDamage = damage - shieldAbsorb;
                if (shieldAbsorb > 0) {
                    this.appendBattleLog('护盾吸收 ' + shieldAbsorb + ' 点伤害！', 'log-info');
                }
            }
            // 致命伤害保留1点
            if (defender.hp - actualDamage <= 0 && defBonus.lethalSaveChance > 0) {
                const usesKey = 'lethalSaveUses';
                defender[usesKey] = defender[usesKey] || 0;
                if (defender[usesKey] < (defBonus.lethalSaveMaxUses || 1)) {
                    defender[usesKey]++;
                    actualDamage = defender.hp - 1;
                    this.appendBattleLog('【不灭之躯】致命伤害被化解，保留1点生命！', 'log-heal');
                }
            }
            
            // 因果之链：记录受到的伤害
            if (!isPlayer && defBonus && defBonus.causalChain) {
                defender.causalDamage = (defender.causalDamage || 0) + actualDamage;
                const maxRecord = defBonus.causalMaxRecord || 200;
                if (defender.causalDamage > maxRecord) defender.causalDamage = maxRecord;
            }
            
            // 受到攻击时概率获得护盾（灵能护盾）
            if (defBonus.shieldOnHitChance > 0 && Math.random() < defBonus.shieldOnHitChance) {
                const shieldAmount = Math.floor(defender.maxHp * defBonus.shieldOnHitPct);
                defender.shield = (defender.shield || 0) + shieldAmount;
                this.appendBattleLog('【灵能护盾】触发护盾，吸收' + shieldAmount + '点伤害！', 'log-heal');
            }
            // 受到近战攻击时概率反伤（骨刺反击）
            if (defBonus.meleeReflectChance > 0 && Math.random() < defBonus.meleeReflectChance) {
                const reflectDmg = Math.floor(actualDamage * defBonus.meleeReflectPct);
                if (reflectDmg > 0 && attacker.stats) {
                    attacker.stats.hp = Math.max(0, attacker.stats.hp - reflectDmg);
                    this.appendBattleLog('【骨刺反击】反弹' + reflectDmg + '点伤害！', 'log-damage');
                }
            }
            // 低血量无敌（天赋效果）
            if (defender.hp - actualDamage > 0 && defender.hp / defender.maxHp < 0.3 && defBonus.lowHpInvincibleChance > 0) {
                defender.lowHpInvincibleUses = defender.lowHpInvincibleUses || 0;
                if (defender.lowHpInvincibleUses < (defBonus.lowHpInvincibleMaxUses || 2) && Math.random() < defBonus.lowHpInvincibleChance) {
                    defender.lowHpInvincibleUses++;
                    actualDamage = 0;
                    this.appendBattleLog('【生命之源】低血量触发无敌，免疫本次伤害！', 'log-heal');
                }
            }
            
            defender.hp -= actualDamage;
        }

        // 5. 日志
        const critText = critResult.crit ? "【暴击！】" : "";
        this.appendBattleLog(`${atkName}发动攻击${critText}，对${defName}造成 ${damage} 点伤害！`, 'log-damage');
        // 标记玩家本回合受到暴击（用于骨骼再生）
        if (!isPlayer && critResult.crit) {
            this.player.tookCritThisTurn = true;
        }

        // 能量回复
        if (isPlayer) {
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + 15);
        }

        // 6. 攻击触发效果（天赋）
        if (isPlayer) {
            // 暗影捕食者：攻击后减少隐身回合
            if (this.player.stealth && this.player.stealthTurns > 0) {
                this.player.stealthTurns--;
                if (this.player.stealthTurns <= 0) {
                    this.player.stealth = false;
                    this.appendBattleLog('隐身状态结束！', 'log-info');
                }
            }
            this.applyTalentOnHitEffects(defender, damage);
            // 暴击追加攻击
            const atkBonus = this.getEquippedTalentBonus();
            if (critResult.crit && atkBonus.critExtraAttackChance > 0 && Math.random() < atkBonus.critExtraAttackChance) {
                if (defender.stats && defender.stats.hp > 0) {
                    this.appendBattleLog('暴击触发追加攻击！', 'log-info');
                    const extraDmg = Math.floor(damage * (atkBonus.critExtraAttackMult || 0.5));
                    defender.stats.hp = Math.max(0, defender.stats.hp - extraDmg);
                    this.appendBattleLog('追加攻击造成 ' + extraDmg + ' 点伤害！', 'log-damage');
                }
            }
        } else {
            this.applyTalentOnHitTakenEffects(attacker, damage);
        }
    },

    // 玩家攻击命中时的天赋触发效果
    applyTalentOnHitEffects(defender, damage) {
        const bonus = this.getEquippedTalentBonus();
        const isBoss = defender.type === 'boss';
        // 奇美拉之魂：随机附加多种Dot
        if (bonus.chimeraSoul) {
            const chimeraChance = bonus.chimeraChance || 0.25;
            // 流血
            if (Math.random() < chimeraChance) {
                this.addStatus(defender, {id: 'bleed', name: '流血', type: 'dot', subtype: 'bleed', stacks: 2, duration: 4, source: 'player'});
                this.appendBattleLog(defender.name + '陷入流血！', 'log-info');
            }
            // 中毒
            if (Math.random() < chimeraChance) {
                this.addStatus(defender, {id: 'poison', name: '中毒', type: 'dot', subtype: 'poison', stacks: 2, duration: 3, source: 'player'});
                this.appendBattleLog(defender.name + '获得中毒效果！', 'log-info');
            }
            // 灼烧
            if (Math.random() < chimeraChance) {
                this.addStatus(defender, {id: 'burn', name: '灼烧', type: 'dot', subtype: 'burn', stacks: 1, duration: 5, source: 'player'});
                this.appendBattleLog(defender.name + '陷入灼烧！', 'log-info');
            }
        }
        
        // 攻击附加Dot（中毒/灼烧）
        bonus.dotOnHit.forEach(dot => {
            const dotName = this.dotTypes[dot.type] ? this.dotTypes[dot.type].name : dot.type;
            this.addStatus(defender, {id: dot.type, name: dotName, type: 'dot', subtype: dot.type, stacks: dot.stacks, duration: 3, source: 'player'});
            this.appendBattleLog(defender.name + '获得' + dotName + '效果！', 'log-info');
        });
        // 攻击附加Dot（流血）
        bonus.bleedOnHit.forEach(dot => {
            this.addStatus(defender, {id: 'bleed', name: '流血', type: 'dot', subtype: 'bleed', stacks: dot.stacks, duration: 4, source: 'player'});
            this.appendBattleLog(defender.name + '陷入流血！', 'log-info');
        });
        // 攻击附加Dot（凋零）
        bonus.witherOnHit.forEach(dot => {
            this.addStatus(defender, {id: 'wither', name: '凋零', type: 'dot', subtype: 'wither', stacks: dot.stacks, duration: 3, source: 'player'});
            this.appendBattleLog(defender.name + '陷入凋零！', 'log-info');
        });
        // 攻击附加控制（旧格式）
        bonus.controlOnHit.forEach(ctrl => {
            if (Math.random() * 100 < ctrl.chance) {
                const ctrlName = this.controlTypes[ctrl.type] ? this.controlTypes[ctrl.type].name : ctrl.type;
                let dur = ctrl.duration;
                if (isBoss && this.controlTypes[ctrl.type]?.skipAction) dur = Math.max(0, dur - 1);
                if (dur > 0) {
                    this.addStatus(defender, {id: ctrl.type, name: ctrlName, type: 'control', subtype: ctrl.type, duration: dur, source: 'player'});
                    this.appendBattleLog(defender.name + '被' + ctrlName + '！', 'log-info');
                }
            }
        });
        // 攻击概率眩晕
        if (bonus.stunChance > 0 && Math.random() < bonus.stunChance) {
            let dur = isBoss ? 0 : 1;
            if (dur > 0) {
                this.addStatus(defender, {id: 'stun', name: '束缚', type: 'control', subtype: 'stun', duration: dur, source: 'player'});
                this.appendBattleLog(defender.name + '被束缚！', 'log-info');
            }
        }
        // 攻击概率麻痹
        if (bonus.paralyzeChance > 0 && Math.random() < bonus.paralyzeChance) {
            let dur = 2;
            if (isBoss) dur = Math.max(0, dur - 1);
            if (dur > 0) {
                this.addStatus(defender, {id: 'paralyze', name: '麻痹', type: 'control', subtype: 'paralyze', duration: dur, source: 'player'});
                this.appendBattleLog(defender.name + '被麻痹！', 'log-info');
            }
        }
        // 攻击概率冻结
        if (bonus.freezeChance > 0 && Math.random() < bonus.freezeChance) {
            let dur = isBoss ? 0 : 1;
            if (dur > 0) {
                this.addStatus(defender, {id: 'freeze', name: '冻结', type: 'control', subtype: 'freeze', duration: dur, source: 'player'});
                this.appendBattleLog(defender.name + '被冻结！', 'log-info');
            }
        }
        // 攻击概率束缚
        if (bonus.bindChance > 0 && Math.random() < bonus.bindChance) {
            let dur = isBoss ? 0 : 1;
            if (dur > 0) {
                this.addStatus(defender, {id: 'stun', name: '束缚', type: 'control', subtype: 'stun', duration: dur, source: 'player'});
                this.appendBattleLog(defender.name + '被束缚！', 'log-info');
            }
        }
        // 攻击概率沉默
        if (bonus.silenceChance > 0 && Math.random() < bonus.silenceChance) {
            let dur = isBoss ? 1 : 2;
            this.addStatus(defender, {id: 'silence', name: '沉默', type: 'control', subtype: 'silence', duration: dur, source: 'player'});
            this.appendBattleLog(defender.name + '被沉默！', 'log-info');
        }
        // 攻击吸血
        const totalLifeSteal = (bonus.lifeStealPct || 0) + (bonus.lifeStealBonusPct || 0);
        if (totalLifeSteal > 0) {
            const heal = Math.floor(damage * totalLifeSteal / 100);
            if (heal > 0) {
                const actualHeal = Math.min(heal, this.player.maxHp - this.player.hp);
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
                // 吸血转护盾
                if (bonus.lifeStealToShieldPct > 0 && actualHeal < heal) {
                    const overflow = heal - actualHeal;
                    const shield = Math.floor(overflow * bonus.lifeStealToShieldPct);
                    if (shield > 0) {
                        this.player.shield = (this.player.shield || 0) + shield;
                        this.appendBattleLog('吸血溢出转化为 ' + shield + ' 点护盾！', 'log-heal');
                    }
                }
                this.appendBattleLog('吸血恢复 ' + actualHeal + ' 点生命！', 'log-heal');
            }
        }
        // 攻击回能（共生体效果）
        const symBonus = this.getEquippedSymbiontBonus();
        if (symBonus.energyOnHit > 0) {
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + symBonus.energyOnHit);
        }
        // 命中时概率降低敌人防御（全视之眼）
        if (bonus.hitDefenseReductionChance > 0 && Math.random() < bonus.hitDefenseReductionChance) {
            const defReduction = bonus.hitDefenseReductionPct || 15;
            const duration = bonus.hitDefenseReductionDuration || 3;
            if (!defender.defenseReduced) defender.defenseReduced = 0;
            defender.defenseReduced = Math.min(50, defender.defenseReduced + defReduction);
            this.appendBattleLog('【全视之眼】命中弱点，' + defender.name + '防御降低' + defReduction + '%（' + duration + '回合）！', 'log-info');
            // 设置定时器恢复防御
            setTimeout(() => {
                if (defender.defenseReduced) {
                    defender.defenseReduced = Math.max(0, defender.defenseReduced - defReduction);
                }
            }, duration * 1000);
        }
    },

    // 玩家受击时的天赋触发效果（反弹）
    applyTalentOnHitTakenEffects(attacker, damage) {
        const bonus = this.getEquippedTalentBonus();
        if (bonus.reflectPct > 0 && attacker.stats) {
            const reflectDmg = Math.floor(damage * bonus.reflectPct / 100);
            if (reflectDmg > 0) {
                attacker.stats.hp = Math.max(0, attacker.stats.hp - reflectDmg);
                this.appendBattleLog('反弹 ' + reflectDmg + ' 点伤害给' + attacker.name + '！', 'log-damage');
            }
        }
        if (bonus.reflectFlat > 0 && attacker.stats) {
            attacker.stats.hp = Math.max(0, attacker.stats.hp - bonus.reflectFlat);
            this.appendBattleLog('反弹 ' + bonus.reflectFlat + ' 点伤害给' + attacker.name + '！', 'log-damage');
        }
    },

    // 命中判定
    calcHit(attacker, defender, isPlayer) {
        // 攻击者命中值
        const atkHit = isPlayer ? attacker.hit : (85 + (attacker.stats ? attacker.stats.per : 5)/5);
        // 防御者闪避率（敏捷差值）
        let atkAgi = isPlayer ? attacker.speed : (attacker.stats ? attacker.stats.agi : 5);
        let defAgi = isPlayer ? (defender.stats ? defender.stats.agi : 5) : defender.speed;
        // 应用减速/麻痹效果（降低敏捷，从而降低闪避率）
        const getControlSpeedMod = (unit) => {
            let mod = 1;
            const statuses = unit.statuses || [];
            for (const s of statuses) {
                if (s.type !== 'control') continue;
                const ct = this.controlTypes[s.subtype];
                if (ct && ct.speedMod) mod *= (1 + ct.speedMod);
            }
            return mod;
        };
        atkAgi = Math.floor(atkAgi * getControlSpeedMod(attacker));
        defAgi = Math.floor(defAgi * getControlSpeedMod(defender));
        let dodgeRate = 0;
        if (defAgi > atkAgi) {
            dodgeRate = Math.min(60, 60 * (1 - Math.exp(-0.05 * (defAgi - atkAgi))));
        }
        // 天赋闪避加成
        if (isPlayer) {
            dodgeRate += (this.talentBonus || {}).dodgeBonus || 0;
            dodgeRate = Math.min(80, dodgeRate);
        }
        // 最终命中率
        const finalHit = Math.max(10, Math.min(100, atkHit - dodgeRate));
        return { hit: Math.random() * 100 < finalHit, dodgeRate, finalHit };
    },

    // 暴击判定
    calcCrit(attacker) {
        const critRate = attacker.crit || (5 + (attacker.stats ? attacker.stats.per : 5) * 0.8);
        return { crit: Math.random() * 100 < Math.min(100, critRate) };
    },

    // ========== 状态效果系统（Dot/控制/Buff/Debuff） ==========
    dotTypes: {
        poison: {name:"中毒", type:"attack_mult", value:0.2, decay:-1, effect:"目标攻击力-15%，防御力-10%"},
        bleed:  {name:"流血", type:"bleed_mix", base:5, hpPercent:0.01, decay:1, effect:"层数每回合+1，受物理攻击额外受伤，生命回复-50%"},
        burn:   {name:"灼烧", type:"execute", base:8, decay:-1, effect:"目标血量越低伤害越高，受到伤害+15%"},
        wither: {name:"凋零", type:"hp_percent", value:0.02, decay:-1, bossResist:0.5, effect:"目标全属性-10%"}
    },
    // Dot抗性配置（按敌人体系标签）
    dotResistanceByTag: {
        3: {poison:0.25, burn:0, bleed:0, wither:0},        // 毒系
        6: {poison:0, burn:0.25, bleed:0, wither:0},        // 火系
        2: {poison:0, burn:0, bleed:0.25, wither:0},        // 血系
        9: {poison:0.1, burn:0.1, bleed:0.15, wither:0.05},  // 甲壳系
        13: {poison:0.1, burn:0.1, bleed:0.15, wither:0.05}, // 骨骼系
        10: {poison:0, burn:0.15, bleed:0, wither:0.2},     // 再生系
        23: {poison:0.15, burn:0.15, bleed:0.15, wither:0.25}, // 灵能系
        25: {poison:0.15, burn:0.15, bleed:0.15, wither:0.25}, // 神系
        26: {poison:0.15, burn:0.15, bleed:0.15, wither:0.25}, // 终极系
    },
    // 地图Dot抗性倾向
    dotResistanceByMap: {
        // 冰河世纪：火抗-15%，血抗+15%
        ice_age: {burn:-0.15, bleed:0.15},
        // 巨龙时代：火抗+25%，毒抗+15%
        dragon_age: {burn:0.25, poison:0.15},
        // 巨虫时代：毒抗+25%，血抗-15%
        insect_age: {poison:0.25, bleed:-0.15},
        // 原始海洋：毒抗+15%，凋零抗+15%
        primordial_ocean: {poison:0.15, wither:0.15},
        // 传说/神话：全抗+10%
        mythic: {poison:0.1, burn:0.1, bleed:0.1, wither:0.1},
    },
    // 获取敌人对某Dot的抗性
    getDotResistance(enemy, dotType) {
        if (!enemy) return 0;
        let resist = 0;
        // 按体系标签计算
        const tags = enemy.tags || [];
        for (const tag of tags) {
            const tagResist = this.dotResistanceByTag[tag];
            if (tagResist && tagResist[dotType] !== undefined) {
                resist = Math.max(resist, tagResist[dotType]); // 取最高抗性
            }
        }
        // Boss额外全Dot抗性+15%，凋零额外+5%
        if (enemy.type === 'boss') {
            resist += 0.15;
            if (dotType === 'wither') resist += 0.05;
        }
        // 精英额外+5%
        if (enemy.type === 'elite') {
            resist += 0.05;
        }
        // 地图抗性倾向
        const map = this.getCurrentMap();
        if (map && map.id) {
            const mapId = map.id.toString();
            for (const key in this.dotResistanceByMap) {
                if (mapId.includes(key) || mapId.includes(key.replace('_age','')) || mapId.includes(key.replace('_',''))) {
                    const mapResist = this.dotResistanceByMap[key];
                    if (mapResist && mapResist[dotType] !== undefined) {
                        resist += mapResist[dotType];
                    }
                    break;
                }
            }
        }
        // 抗性上限70%
        return Math.min(0.7, Math.max(0, resist));
    },
    // 获取玩家对某Dot的穿透
    getDotPenetration(dotType) {
        const bonus = this.talentBonus || {};
        const penMap = {
            poison: bonus.poisonPenetration || 0,
            burn: bonus.burnPenetration || 0,
            bleed: bonus.bleedPenetration || 0,
            wither: bonus.witherPenetration || 0,
        };
        // 全Dot穿透
        const allPen = bonus.allDotPenetration || 0;
        return (penMap[dotType] || 0) + allPen;
    },
    controlTypes: {
        stun:     {name:"束缚", skipAction:true, maxDuration:2},
        paralyze: {name:"麻痹", skipChance:0.5, speedMod:-0.5, desc:"50%无法行动+敏捷-50%（降低闪避），Boss概率-20%"},
        freeze:   {name:"冻结", skipAction:true, maxDuration:1, afterEffect:"slow", desc:"无法行动1回合+解冻后减速，Boss持续-1回合"},
        slow:     {name:"减速", speedMod:-0.5, maxDuration:3, desc:"敏捷-50%（降低闪避和先手），对Boss全额生效"},
        silence:  {name:"沉默", blockSkills:true, maxDuration:2, desc:"无法使用技能，Boss持续-1回合"}
    },
    getStatuses(unit) { if(!unit.statuses) unit.statuses=[]; return unit.statuses; },
    addStatus(unit, s) {
        const list = this.getStatuses(unit);
        // 进化抉择：中毒持续时间加成（玩家施加的中毒效果）
        if(s.subtype === 'poison' && unit !== this.player && this.player.evoPoisonDurationBonus) {
            s.duration = (s.duration || 3) + this.player.evoPoisonDurationBonus;
        }
        const ex = list.find(x => x.id === s.id);
        if (ex) { ex.stacks = Math.min(s.maxStacks||99, ex.stacks+(s.stacks||1)); ex.duration = Math.max(ex.duration, s.duration); }
        else list.push({id:s.id,name:s.name,type:s.type,subtype:s.subtype||s.id,stacks:s.stacks||1,maxStacks:s.maxStacks||99,duration:s.duration||3,value:s.value||0,source:s.source||"unknown",tags:s.tags||[]});
    },
    removeStatus(unit, id) { const l=this.getStatuses(unit); const i=l.findIndex(s=>s.id===id); if(i>=0) l.splice(i,1); },
    hasStatus(unit, id) { return this.getStatuses(unit).some(s=>s.id===id); },
    clearStatuses(unit) { if(unit) unit.statuses=[]; },
    isControlled(unit, isBoss) {
        for (const s of this.getStatuses(unit)) {
            if (s.type!=='control') continue;
            const ct = this.controlTypes[s.subtype]; if(!ct) continue;
            let dur=s.duration, chance=ct.skipChance||1;
            if(isBoss){ if(ct.skipAction) dur=Math.max(0,dur-1); if(ct.skipChance) chance=Math.max(0,chance-0.2); }
            if(dur<=0) continue;
            if(ct.skipAction) return {controlled:true,status:s,reason:ct.name};
            if(ct.skipChance && Math.random()<chance) return {controlled:true,status:s,reason:ct.name};
        }
        return {controlled:false};
    },
    isSilenced(unit, isBoss) {
        const s = this.getStatuses(unit).find(x=>x.subtype==='silence');
        return !!(s && !(isBoss && s.duration<=0));
    },
    tickStatuses(unit, isPlayer, isBoss) {
        const list = this.getStatuses(unit);
        const uname = isPlayer ? "你" : (this.currentEnemy?.name||"敌人");
        const unitMaxHp = isPlayer ? unit.maxHp : (unit.stats?.maxHp || unit.stats?.hp || 100);
        const unitCurrentHp = isPlayer ? unit.hp : (unit.stats?.hp || 100);
        
        list.forEach(s => {
            if(s.type!=='dot') return;
            const dt = this.dotTypes[s.subtype]; if(!dt) return;
            let dmg = 0;
            
            // 根据不同Dot类型计算伤害
            if(dt.type === "attack_mult") {
                // 中毒：攻击者攻击力 × 0.2 × 层数
                const src = s.source==='player' ? this.player : this.currentEnemy;
                const atk = src ? (src.attack || src.stats?.atk || 10) : 10;
                dmg = Math.floor(atk * dt.value * s.stacks);
            }
            else if(dt.type === "bleed_mix") {
                // 流血：5 × 层数 + 目标最大生命 × 0.01 × 层数
                dmg = Math.floor(dt.base * s.stacks + unitMaxHp * dt.hpPercent * s.stacks);
            }
            else if(dt.type === "execute") {
                // 灼烧：8 × 层数 × (1 + 目标已损失生命百分比)
                const lostHpPercent = Math.max(0, (unitMaxHp - unitCurrentHp) / unitMaxHp);
                dmg = Math.floor(dt.base * s.stacks * (1 + lostHpPercent));
            }
            else if(dt.type === "hp_percent") {
                // 凋零：目标最大生命 × 0.02 × 层数
                dmg = Math.floor(unitMaxHp * dt.value * s.stacks);
                if(isBoss && dt.bossResist) dmg = Math.floor(dmg * (1 - dt.bossResist));
            }
            
            // 应用Dot抗性和穿透（仅对敌人受到的Dot生效）
            if(dmg > 0 && !isPlayer && this.currentEnemy) {
                const resist = this.getDotResistance(this.currentEnemy, s.subtype);
                const penetration = this.getDotPenetration(s.subtype);
                const effectiveResist = Math.max(0, resist - penetration);
                if(effectiveResist > 0) {
                    dmg = Math.floor(dmg * (1 - effectiveResist));
                }
                // 进化抉择：中毒伤害加成（玩家造成的中毒伤害）
                if(s.subtype === 'poison' && this.player.evoPoisonDamageBonus) {
                    dmg = Math.floor(dmg * (1 + this.player.evoPoisonDamageBonus / 100));
                }
            }
            
            if(dmg > 0) {
                // 玩家受到Dot伤害时的特殊处理
                if(isPlayer) {
                    const defBonus = this.getEquippedTalentBonus();
                    let actualDmg = dmg;
                    // 灼烧抗性（热能吸收）
                    if(s.subtype === 'burn' && defBonus.burnResistancePct > 0) {
                        actualDmg = Math.floor(actualDmg * (1 - defBonus.burnResistancePct));
                        this.appendBattleLog('【热能吸收】灼烧抗性减免' + Math.floor(defBonus.burnResistancePct * 100) + '%伤害！', 'log-info');
                    }
                    // 受到火焰伤害转化为生命（热能吸收）
                    if(s.subtype === 'burn' && defBonus.fireDamageLifeStealPct > 0) {
                        const heal = Math.floor(actualDmg * defBonus.fireDamageLifeStealPct);
                        if(heal > 0) {
                            unit.hp = Math.min(unit.maxHp, unit.hp + heal);
                            this.appendBattleLog('【热能吸收】火焰伤害转化为' + heal + '点生命！', 'log-heal');
                        }
                    }
                    unit.hp -= actualDmg;
                } else {
                    unit.stats.hp -= dmg;
                }
                this.appendBattleLog(`${uname}受到${dt.name}伤害 ${dmg} 点！(层数:${s.stacks})`,'log-damage');
            }
        });
        
        // 处理Dot层数衰减/递增和持续时间
        for(let i = list.length - 1; i >= 0; i--) {
            const s = list[i];
            if(s.type === 'dot') {
                const dt = this.dotTypes[s.subtype];
                if(dt && dt.decay) {
                    // 衰减/递增层数
                    s.stacks = Math.max(0, s.stacks + dt.decay);
                    if(s.stacks <= 0) {
                        // 层数为0时移除状态
                        list.splice(i, 1);
                        continue;
                    }
                }
            }
            // 持续时间递减
            s.duration--;
            if(s.duration <= 0) {
                if(s.subtype === 'freeze') {
                    this.addStatus(unit, {id:"slow", name:"减速", type:"control", subtype:"slow", stacks:1, duration:2, source:s.source});
                }
                list.splice(i, 1);
            }
        }
    },
    formatStatuses(unit) {
        const list = this.getStatuses(unit); if(list.length===0) return '';
        const self = this;
        // 状态效果tooltip映射
        const statusTooltipMap = {
            '中毒': 'poison', '灼烧': 'burn', '流血': 'bleed', '凋零': 'wither',
            '束缚': 'stun', '麻痹': 'stun', '冻结': 'stun',
            '减速': 'slow', '沉默': 'silence'
        };
        return list.map(s=>{
            let className = 'status-tag ';
            if (s.type === 'dot') {
                if (s.name.indexOf('中毒') >= 0) className += 'status-poison';
                else if (s.name.indexOf('灼烧') >= 0) className += 'status-burn';
                else if (s.name.indexOf('流血') >= 0) className += 'status-bleed';
                else if (s.name.indexOf('凋零') >= 0) className += 'status-wither';
                else className += 'status-poison';
            } else if (s.type === 'control') {
                className += 'status-control';
            } else if (s.type === 'buff') {
                className += 'status-buff';
            } else {
                className += 'status-debuff';
            }
            const tooltipKey = statusTooltipMap[s.name] || (s.type === 'buff' ? 'buff' : 'debuff');
            return '<span class="' + className + '" data-tooltip="' + tooltipKey + '">' + s.name + '×' + s.stacks + '(' + s.duration + ')</span>';
        }).join(' ');
    },

    // ========== 主动技能系统 ==========
    skillTable: {
        skill_power_strike: {name:"强力一击",desc:"造成150%攻击力伤害",cost:25,cooldown:0,effects:[{type:"damage",multiplier:1.5}]},
        skill_poison_strike: {name:"毒击",desc:"100%伤害+3层中毒(3回合)",cost:30,cooldown:1,effects:[{type:"damage",multiplier:1.0},{type:"dot",dotType:"poison",stacks:3,duration:3}]},
        skill_bleed_slash: {name:"撕裂斩",desc:"80%伤害+5层流血(4回合)",cost:25,cooldown:1,effects:[{type:"damage",multiplier:0.8},{type:"dot",dotType:"bleed",stacks:5,duration:4}]},
        skill_burn_blast: {name:"灼热烈焰",desc:"120%伤害+3层灼烧(3回合)",cost:35,cooldown:2,effects:[{type:"damage",multiplier:1.2},{type:"dot",dotType:"burn",stacks:3,duration:3}]},
        skill_wither_touch: {name:"凋零之触",desc:"60%伤害+2层凋零(3回合)",cost:40,cooldown:2,effects:[{type:"damage",multiplier:0.6},{type:"dot",dotType:"wither",stacks:2,duration:3}]},
        skill_stun_smash: {name:"重击",desc:"130%伤害+30%束缚1回合",cost:30,cooldown:2,effects:[{type:"damage",multiplier:1.3},{type:"control",controlType:"stun",duration:1,chance:0.3}]},
        skill_paralyze_bolt: {name:"麻痹电击",desc:"90%伤害+麻痹2回合",cost:30,cooldown:3,effects:[{type:"damage",multiplier:0.9},{type:"control",controlType:"paralyze",duration:2,chance:1.0}]},
        skill_freeze_wave: {name:"冰霜冲击",desc:"110%伤害+50%冻结1回合",cost:35,cooldown:2,effects:[{type:"damage",multiplier:1.1},{type:"control",controlType:"freeze",duration:1,chance:0.5}]},
        skill_heal: {name:"自愈",desc:"恢复30%最大生命",cost:35,cooldown:3,target:"self",effects:[{type:"heal",percent:0.3}]},
        skill_attack_buff: {name:"狂暴",desc:"攻击+30%持续3回合",cost:25,cooldown:3,target:"self",effects:[{type:"buff",stat:"attack",value:30,duration:3}]},
        skill_defense_buff: {name:"铁壁",desc:"防御+50%持续3回合",cost:25,cooldown:3,target:"self",effects:[{type:"buff",stat:"defense",value:50,duration:3}]},
        
        // ========== 毒系技能 ==========
        skill_poison_explosion: {name:"毒爆",desc:"立即结算目标所有Dot伤害×1.5，眩晕1回合，清除所有Dot",cost:35,cooldown:3,effects:[{type:"dot_explosion",multiplier:1.5},{type:"control",controlType:"stun",duration:1,chance:1.0}]},
        skill_poison_burst: {name:"剧毒爆发",desc:"目标中毒层数翻倍，造成当前层数×10直接伤害",cost:50,cooldown:5,effects:[{type:"dot_double",dotType:"poison"},{type:"dot_damage",dotType:"poison",multiplier:10}]},
        skill_poison_spray: {name:"剧毒喷涌",desc:"150%伤害+5层中毒，中毒层数越高伤害越高",cost:40,cooldown:3,effects:[{type:"damage",multiplier:1.5},{type:"dot",dotType:"poison",stacks:5,duration:3},{type:"dot_bonus_damage",dotType:"poison",multiplier:0.1}]},
        skill_plague_spread: {name:"瘟疫扩散",desc:"目标中毒层数+3，立即造成中毒层数×8伤害",cost:40,cooldown:4,effects:[{type:"dot",dotType:"poison",stacks:3,duration:5},{type:"dot_damage",dotType:"poison",multiplier:8}]},
        
        // ========== 火系技能 ==========
        skill_flame_storm: {name:"烈焰风暴",desc:"180%伤害+4层灼烧，目标血量越低伤害越高",cost:40,cooldown:3,effects:[{type:"damage",multiplier:1.8},{type:"dot",dotType:"burn",stacks:4,duration:3},{type:"execute_bonus",multiplier:0.5}]},
        skill_burn_deflagration: {name:"爆燃",desc:"立即结算所有灼烧伤害×1.5，目标受到伤害+30%（3回合）",cost:45,cooldown:4,effects:[{type:"dot_explosion",dotType:"burn",multiplier:1.5},{type:"debuff",stat:"damageTaken",value:30,duration:3}]},
        skill_hellfire: {name:"地狱火",desc:"220%伤害+6层灼烧，灼烧目标额外受到30%伤害",cost:55,cooldown:5,effects:[{type:"damage",multiplier:2.2},{type:"dot",dotType:"burn",stacks:6,duration:4},{type:"dot_bonus_damage",dotType:"burn",multiplier:0.3}]},
        skill_meteor: {name:"陨石坠落",desc:"300%伤害+8层灼烧，眩晕1回合",cost:80,cooldown:7,effects:[{type:"damage",multiplier:3.0},{type:"dot",dotType:"burn",stacks:8,duration:5},{type:"control",controlType:"stun",duration:1,chance:1.0}]},
        
        // ========== 流血系技能 ==========
        skill_blood_blade: {name:"血刃",desc:"120%伤害+4层流血，流血层数越高伤害越高（每层+5%）",cost:30,cooldown:2,effects:[{type:"damage",multiplier:1.2},{type:"dot",dotType:"bleed",stacks:4,duration:5},{type:"dot_bonus_damage",dotType:"bleed",multiplier:0.05}]},
        skill_bleed_out: {name:"放血",desc:"目标流血层数+5，立即造成当前流血层数×6伤害",cost:35,cooldown:3,effects:[{type:"dot",dotType:"bleed",stacks:5,duration:6},{type:"dot_damage",dotType:"bleed",multiplier:6}]},
        skill_blood_storm: {name:"血色怒放",desc:"150%伤害+8层流血，立即结算50%流血伤害",cost:50,cooldown:5,effects:[{type:"damage",multiplier:1.5},{type:"dot",dotType:"bleed",stacks:8,duration:6},{type:"dot_explosion",dotType:"bleed",multiplier:0.5}]},
        skill_exsanguinate: {name:"竭血",desc:"目标流血层数翻倍，生命上限-15%（战斗结束恢复），流血期间无法回血",cost:60,cooldown:6,effects:[{type:"dot_double",dotType:"bleed"},{type:"debuff",stat:"maxHp",value:15,duration:99},{type:"debuff",stat:"healBlocked",value:100,duration:99}]},
        
        // ========== 凋零系技能 ==========
        skill_death_gaze: {name:"死亡凝视",desc:"目标+4层凋零，全属性额外-8%（持续到战斗结束）",cost:45,cooldown:3,effects:[{type:"dot",dotType:"wither",stacks:4,duration:4},{type:"debuff",stat:"allStats",value:8,duration:99}]},
        skill_decay: {name:"腐朽",desc:"目标凋零层数翻倍",cost:50,cooldown:4,effects:[{type:"dot_double",dotType:"wither"}]},
        skill_death_grip: {name:"死亡之握",desc:"目标+6层凋零，立即造成当前凋零层数×15直接伤害",cost:60,cooldown:5,effects:[{type:"dot",dotType:"wither",stacks:6,duration:5},{type:"dot_damage",dotType:"wither",multiplier:15}]},
        skill_doom: {name:"末日审判",desc:"目标+8层凋零，全属性-20%（5回合），Boss抗性降低20%",cost:80,cooldown:8,effects:[{type:"dot",dotType:"wither",stacks:8,duration:6},{type:"debuff",stat:"allStats",value:20,duration:5},{type:"debuff",stat:"bossResist",value:20,duration:5}]}
    },
    // Boss吞噬记忆（击败Boss后显示的短文本）
    bossDevourMemories: {
        // 第一章：起源之汤
        '蕨类沼泽巨兽': '你吞噬了沼泽巨兽的核心，感受到了原始生命的蓬勃欲望——那是一种跨越亿万年的饥饿。',
        // 第二章：登陆之时
        '巨型昆虫之王': '数以万计的复眼记忆涌入你的意识——你第一次理解了"视野"这个词的真正含义。',
        // 第三章：冰河纪元
        '永冻冰原猛犸': '你吞噬了猛犸的心脏，感受到了冰河时代的漫长寒冷——那是一种跨越万年的孤独。',
        '冰川裂缝冰龙': '冰晶在你的血液中凝结，又在本能的驱使下重新融化——你获得了对寒冷的记忆。',
        // 第四章：巨龙时代
        '龙巢深渊巨龙': '龙的记忆是火焰与毁灭。你感受到了那种俯瞰众生的傲慢，以及深入骨髓的贪婪。',
        '火山熔岩炎魔': '岩浆在你的血管中流淌，你第一次理解了"燃烧"不是毁灭，而是一种生命形态。',
        '龙脊山脉古龙': '古老的龙鳞记忆告诉你：真正的强大不是力量，而是活得足够久。',
        // 第五章：族群觉醒
        '虫巢深渊女王': '数以万计的幼虫记忆涌入你的意识——你第一次理解了"族群"这个词。',
        '蛛网迷宫蛛后': '蛛丝的震动传递着整个网络的信息。你获得了对"连接"的全新理解。',
        // 第六章：封神之路
        '众神战场战神': '战神的记忆是无尽的战斗与荣耀。你感受到了那种为战而生的纯粹意志。',
        '传说圣殿守护者': '圣殿的记忆是秩序与规则。你理解了"神"不过是更强大的规则制定者。',
        '神魔战场堕落天使': '堕落的记忆是自由与背叛。你感受到了那种打破一切束缚的渴望。',
        '圣剑遗迹剑灵': '剑的记忆是斩杀与守护。你获得了对"武器"的全新理解——它不过是手臂的延伸。',
        '神界天门守门人': '天门的记忆是界限与超越。你第一次感受到了"神"与"凡人"之间那道无形的墙。',
        // 第七章：超越存在
        '创世神殿创世神': '你吞噬了创世的余烬，世界在你眼中重新变成了一片原始汤。',
        '混沌深渊混沌之主': '混沌的记忆是无序与可能。你理解了"存在"不过是混沌的一种暂时形态。',
        '轮回之门轮回守护者': '轮回的记忆是重复与超越。你看到了无数个自己在无数个轮回中挣扎。',
        '无限虚空虚空之王': '你吞噬了虚无本身。现在，你就是虚无。',
        // 默认Boss吞噬记忆
        'default': '你吞噬了这个强大生物的核心，它的记忆与力量正在你的体内重构。'
    },
    
    // 多周目开场文本（按轮回次数变化）
    reincarnationOpenings: [
        {min: 1, max: 2, text: '你在原始汤中苏醒，周围是温暖的有机物和陌生的微光。'},
        {min: 3, max: 4, text: '你已经在这个循环里挣扎了三次。原始汤的味道，你开始觉得熟悉了。'},
        {min: 5, max: 9, text: '第五次了。你甚至能预判到第一个猎物会从哪个方向游过来。'},
        {min: 10, max: 19, text: '十次轮回。你不再是那个懵懂的细胞了——你是一条带着记忆的基因链。'},
        {min: 20, max: 999, text: '又一次。你已经记不清这是第几次了，但基因记得。'}
    ],
    
    // 第一次死亡的轮回叙事文本
    firstDeathNarrative: '你的身体崩溃了。\n但基因记住了一切。\n在虚无中，你重新开始——这一次，你比上次多知道了一点。',

    talentSkillMap: {
        tal_poison_gland:"skill_poison_strike", tal_bleed:"skill_bleed_slash",
        tal_fire_breath:"skill_burn_blast", tal_wither:"skill_wither_touch",
        tal_stun:"skill_stun_smash", tal_paralyze:"skill_paralyze_bolt",
        tal_freeze:"skill_freeze_wave", tal_heal:"skill_heal",
        tal_rage:"skill_attack_buff", tal_iron_wall:"skill_defense_buff",
        // 物理伤害型 → 强力一击
        tal_claw:"skill_power_strike", tal_bite:"skill_power_strike",
        tal_deadly_fang:"skill_power_strike", tal_bone_crusher:"skill_power_strike",
        tal_tyrant_fang:"skill_power_strike", tal_god_devouring_fang:"skill_power_strike",
        tal_energy_drain:"skill_power_strike", tal_sky_dominator:"skill_power_strike",
        tal_high_altitude_predator:"skill_power_strike", tal_primal_devour:"skill_power_strike",
        tal_ocean_sovereign:"skill_power_strike",
        // 雷电型 → 麻痹电击
        tal_electric:"skill_paralyze_bolt", tal_thunder_power:"skill_paralyze_bolt",
        tal_storm_lord:"skill_paralyze_bolt", tal_paralyze_stinger:"skill_paralyze_bolt",
        // 束缚型 → 重击
        tal_tangle_tentacle:"skill_stun_smash", tal_predator_web:"skill_stun_smash",
        tal_world_entangle:"skill_stun_smash",
        // 毒素型 → 毒击
        tal_neurotoxin:"skill_poison_strike", tal_myriad_poisons:"skill_poison_strike",
        tal_neurotoxin_king:"skill_poison_strike", tal_plague_cloud:"skill_poison_strike",
        tal_corrosive_slime:"skill_poison_strike", tal_dissolving_fluid:"skill_poison_strike",
        // 火焰型 → 灼热烈焰
        tal_fire_breath_2:"skill_burn_blast", tal_nirvana_flame:"skill_burn_blast",
        // 冰霜型 → 冰霜冲击
        tal_frost_armor:"skill_freeze_wave",
        // 流血型 → 撕裂斩
        tal_bloodlust:"skill_bleed_slash", tal_blood_feast:"skill_bleed_slash",
        tal_blood_frenzy:"skill_bleed_slash",
        // 生存型 → 自愈
        tal_deep_sea_behemoth:"skill_heal"
    },
    getAvailableSkills() {
        const skills = [];
        const seen = new Set();
        const defaultSkills = ['skill_power_strike', 'skill_heal', 'skill_attack_buff'];
        defaultSkills.forEach(sid => {
            if (this.skillTable[sid] && !seen.has(sid)) {
                skills.push({...this.skillTable[sid], id:sid});
                seen.add(sid);
            }
        });
        (this.player.activeSkills || []).forEach(sid => {
            if (this.skillTable[sid] && !seen.has(sid)) {
                skills.push({...this.skillTable[sid], id:sid});
                seen.add(sid);
            }
        });
        return skills;
    },

    getSkillPool() {
        const skills = [];
        const seen = new Set();
        this.player.equippedTalents.forEach(tid => {
            const sid = this.talentSkillMap[tid];
            if (sid && this.skillTable[sid] && !seen.has(sid)) {
                skills.push({...this.skillTable[sid], id:sid});
                seen.add(sid);
            }
        });
        return skills;
    },

    equipActiveSkill(sid) {
        if (!this.player.activeSkills) this.player.activeSkills = [];
        if (this.player.activeSkills.includes(sid)) return {success: false, msg: "已装备"};
        const maxSlots = this.getActiveSlots();
        if (this.player.activeSkills.length >= maxSlots) {
            return {success: false, msg: "主动槽已满（" + maxSlots + "个）"};
        }
        this.player.activeSkills.push(sid);
        return {success: true, msg: "装备成功"};
    },

    unequipActiveSkill(sid) {
        if (!this.player.activeSkills) this.player.activeSkills = [];
        const idx = this.player.activeSkills.indexOf(sid);
        if (idx < 0) return {success: false, msg: "未装备"};
        this.player.activeSkills.splice(idx, 1);
        return {success: true, msg: "已卸下"};
    },

    showSkillSelect() {
        const pool = this.getSkillPool();
        const equipped = this.player.activeSkills || [];
        const maxSlots = this.getActiveSlots();
        let html = '<h3>主动技能选带</h3>';
        html += '<p style="color:var(--text-muted);font-size:13px">默认技能：强力一击、自愈、狂暴（不占槽位）</p>';
        html += '<p style="color:var(--accent-info);font-size:14px">主动槽：' + equipped.length + '/' + maxSlots + '</p>';
        if (pool.length === 0) {
            html += '<p style="color:var(--text-muted)">装备天赋后可解锁更多主动技能</p>';
        } else {
            pool.forEach(s => {
                const isEq = equipped.includes(s.id);
                html += '<div class="talent-card">';
                html += '<div><div class="talent-name">' + s.name + '</div>';
                html += '<div class="talent-desc">' + s.desc + ' | 消耗' + s.cost + '能量';
                if (s.cooldown > 0) html += ' | 冷却' + s.cooldown + '回合';
                html += '</div></div>';
                if (isEq) {
                    html += '<button onclick="game.unequipActiveSkillAndRefresh(\'' + s.id + '\')" style="font-size:12px;background:var(--accent-danger)">卸下</button>';
                } else {
                    const canEq = equipped.length < maxSlots;
                    html += '<button onclick="game.equipActiveSkillAndRefresh(\'' + s.id + '\')" ' + (canEq?'':'disabled') + ' style="font-size:12px">装备</button>';
                }
                html += '</div>';
            });
        }
        html += '<button onclick="game.closePop()" style="margin-top:10px">关闭</button>';
        this.showPopup(html);
    },

    equipActiveSkillAndRefresh(sid) {
        const r = this.equipActiveSkill(sid);
        if (!r.success && r.msg) this.showGameAlert("提示", r.msg);
        this.showSkillSelect();
    },
    unequipActiveSkillAndRefresh(sid) {
        this.unequipActiveSkill(sid);
        this.showSkillSelect();
    },
    executeSkillEffects(skill, caster, target, isPlayerCaster) {
        const cName = isPlayerCaster ? "你" : (this.currentEnemy?.name || "敌人");
        const tName = isPlayerCaster ? (this.currentEnemy?.name || "敌人") : "你";
        const isTargetBoss = isPlayerCaster && this.currentEnemy?.type === 'boss';
        skill.effects.forEach(effect => {
            switch(effect.type) {
                case "damage": {
                    const hit = this.calcHit(caster, target, isPlayerCaster);
                    if (!hit.hit) { this.appendBattleLog(`${cName}的【${skill.name}】被${tName}闪避！`,'log-info'); return; }
                    const crit = this.calcCrit(caster);
                    const critMult = crit.crit ? (caster.critDamage||150)/100 : 1;
                    const atk = isPlayerCaster ? caster.attack : (caster.stats?.atk||10);
                    let def = isPlayerCaster ? (target.stats?.def||2) : target.defense;
                    // 进化抉择：无视防御加成（玩家技能攻击时）
                    if (isPlayerCaster && this.player.evoArmorPenetration) {
                        const penPct = this.player.evoArmorPenetration / 100;
                        def = Math.max(0, def * (1 - penPct));
                    }
                    let dmg = Math.max(1, Math.floor(atk * (effect.multiplier||1) * (1-def/(def+100)) * critMult * (0.9+Math.random()*0.2)));
                    // 进化抉择：技能伤害加成/减益（玩家技能攻击时）
                    if (isPlayerCaster && this.player.evoSkillDamageMod) {
                        dmg = Math.max(1, Math.floor(dmg * (1 + this.player.evoSkillDamageMod / 100)));
                    }
                    if (isPlayerCaster) target.stats.hp -= dmg; else target.hp -= dmg;
                    this.appendBattleLog(`${cName}释放【${skill.name}】${crit.crit?'【暴击！】':''}，对${tName}造成 ${dmg} 点伤害！`,'log-damage');
                    break;
                }
                case "heal": {
                    const maxHp = isPlayerCaster ? caster.maxHp : (caster.stats?.maxHp||100);
                    const heal = Math.floor(maxHp * (effect.percent||0.2));
                    if (isPlayerCaster) caster.hp = Math.min(caster.maxHp, caster.hp+heal);
                    else caster.stats.hp = Math.min(caster.stats.maxHp, caster.stats.hp+heal);
                    this.appendBattleLog(`${cName}使用【${skill.name}】，恢复 ${heal} 点生命！`,'log-heal');
                    break;
                }
                case "dot": {
                    const dt = this.dotTypes[effect.dotType];
                    if (!dt || Math.random() >= (effect.chance||1)) return;
                    this.addStatus(target, {id:effect.dotType,name:dt.name,type:"dot",subtype:effect.dotType,stacks:effect.stacks||1,maxStacks:10,duration:effect.duration||3,source:isPlayerCaster?"player":"enemy"});
                    this.appendBattleLog(`${tName}陷入${dt.name}！(${effect.stacks||1}层)`,'log-info');
                    break;
                }
                case "control": {
                    const ct = this.controlTypes[effect.controlType];
                    if (!ct || Math.random() >= (effect.chance||1)) return;
                    let dur = effect.duration||1;
                    if (isTargetBoss && ct.skipAction) dur = Math.max(0, dur-1);
                    if (dur <= 0) return;
                    this.addStatus(target, {id:effect.controlType,name:ct.name,type:"control",subtype:effect.controlType,stacks:1,duration:dur,source:isPlayerCaster?"player":"enemy"});
                    this.appendBattleLog(`${tName}被${ct.name}！(${dur}回合)`,'log-info');
                    break;
                }
                case "buff":
                case "debuff": {
                    const unit = effect.type==="buff"?caster:target;
                    const uname = effect.type==="buff"?cName:tName;
                    this.addStatus(unit, {id:effect.stat+"_"+effect.type,name:(effect.type==="buff"?"增益":"减益")+effect.stat,type:effect.type,subtype:effect.stat,stacks:1,duration:effect.duration||3,value:effect.value||10,source:isPlayerCaster?"player":"enemy"});
                    this.appendBattleLog(`${uname}的${effect.stat}${effect.type==="buff"?"提升":"降低"}${effect.value}%！(${effect.duration}回合)`,'log-info');
                    break;
                }
                case "dot_explosion": {
                    // Dot爆发：立即结算目标所有Dot伤害（或指定Dot类型）
                    const targetStatuses = this.getStatuses(target);
                    let totalDmg = 0;
                    const dotTypes = effect.dotType ? [effect.dotType] : ['poison','burn','bleed','wither'];
                    for(let i = targetStatuses.length - 1; i >= 0; i--) {
                        const s = targetStatuses[i];
                        if(s.type !== 'dot' || !dotTypes.includes(s.subtype)) continue;
                        // 计算该Dot的单回合伤害
                        const dt = this.dotTypes[s.subtype];
                        if(!dt) continue;
                        const tMaxHp = isPlayerCaster ? (target.stats?.maxHp || target.stats?.hp || 100) : target.maxHp;
                        const tCurHp = isPlayerCaster ? (target.stats?.hp || 100) : target.hp;
                        let dmg = 0;
                        if(dt.type === "attack_mult") {
                            const src = s.source==='player' ? this.player : this.currentEnemy;
                            const atk = src ? (src.attack || src.stats?.atk || 10) : 10;
                            dmg = Math.floor(atk * dt.value * s.stacks);
                        } else if(dt.type === "bleed_mix") {
                            dmg = Math.floor(dt.base * s.stacks + tMaxHp * dt.hpPercent * s.stacks);
                        } else if(dt.type === "execute") {
                            const lostHpPercent = Math.max(0, (tMaxHp - tCurHp) / tMaxHp);
                            dmg = Math.floor(dt.base * s.stacks * (1 + lostHpPercent));
                        } else if(dt.type === "hp_percent") {
                            dmg = Math.floor(tMaxHp * dt.value * s.stacks);
                            if(isTargetBoss && dt.bossResist) dmg = Math.floor(dmg * (1 - dt.bossResist));
                        }
                        totalDmg += dmg;
                        // 移除该Dot状态
                        targetStatuses.splice(i, 1);
                    }
                    totalDmg = Math.floor(totalDmg * (effect.multiplier || 1));
                    if(totalDmg > 0) {
                        if(isPlayerCaster) target.stats.hp -= totalDmg;
                        else target.hp -= totalDmg;
                        this.appendBattleLog(`${cName}的【${skill.name}】触发Dot爆发，对${tName}造成 ${totalDmg} 点伤害！`,'log-damage');
                    }
                    break;
                }
                case "dot_double": {
                    // Dot层数翻倍
                    const targetStatuses = this.getStatuses(target);
                    targetStatuses.forEach(s => {
                        if(s.type === 'dot' && (!effect.dotType || s.subtype === effect.dotType)) {
                            s.stacks = s.stacks * 2;
                            const dt = this.dotTypes[s.subtype];
                            this.appendBattleLog(`${tName}的${dt?.name || s.name}层数翻倍！当前${s.stacks}层`,'log-info');
                        }
                    });
                    break;
                }
                case "dot_damage": {
                    // 基于Dot层数的直接伤害
                    const targetStatuses = this.getStatuses(target);
                    let totalStacks = 0;
                    const dotTypes = effect.dotType ? [effect.dotType] : ['poison','burn','bleed','wither'];
                    targetStatuses.forEach(s => {
                        if(s.type === 'dot' && dotTypes.includes(s.subtype)) {
                            totalStacks += s.stacks;
                        }
                    });
                    if(totalStacks > 0) {
                        const dmg = Math.floor(totalStacks * (effect.multiplier || 10));
                        if(isPlayerCaster) target.stats.hp -= dmg;
                        else target.hp -= dmg;
                        this.appendBattleLog(`${cName}的【${skill.name}】基于${totalStacks}层Dot造成 ${dmg} 点伤害！`,'log-damage');
                    }
                    break;
                }
            }
        });
    },

    // 技能面板
    openSkillPanel() {
        if (!this.playerTurn || !this.inBattle) return;
        if (this.isSilenced(this.player, false)) {
            this.appendBattleLog("你被沉默，无法使用技能！", 'log-info');
            return;
        }
        const skills = this.getAvailableSkills();
        let html = `<h3>选择技能</h3>`;
        skills.forEach((skill, idx) => {
            const cd = this.player.skillCooldowns[skill.id] || 0;
            const canUse = this.player.energy >= skill.cost && cd === 0;
            const cdText = cd > 0 ? ` <span style="color:var(--accent-warning)">冷却中(${cd}回合)</span>` : (skill.cooldown > 0 ? ` <span style="color:var(--text-faint)">冷却${skill.cooldown}回合</span>` : '');
            html += `<div class="talent-card">
                <div><div class="talent-name" data-skill-id="${skill.id}">${skill.name}${cdText}</div>
                <div class="talent-desc">${skill.desc} | 消耗${skill.cost}能量（每回合恢复${Math.floor(this.player.energyRegen||0)}点）</div></div>
                <button onclick="game.useSkill(${idx})" ${canUse?'':'disabled'}>释放</button>
            </div>`;
        });
        html += `<button onclick="game.closePop()" style="margin-top:10px">取消</button>`;
        this.showPopup(html);
    },

    useSkill(idx) {
        if (this.battleEnding) return;
        const skills = this.getAvailableSkills();
        const skill = skills[idx];
        if (!skill || this.player.energy < skill.cost) return;
        if (this.isSilenced(this.player, false)) { this.appendBattleLog("你被沉默，无法使用技能！",'log-info'); return; }
        this.closePop();
        this.player.energy -= skill.cost;
        // 设置技能冷却
        if (skill.cooldown > 0) this.player.skillCooldowns[skill.id] = skill.cooldown;

        const target = skill.target === "self" ? this.player : this.currentEnemy;
        this.executeSkillEffects(skill, this.player, target, true);

        this.refreshBattleUI();
        if (this.checkBattleEnd()) return;
        this.endPlayerTurn();
    },

    useItem() { this.openInventory(); },

    tryEscape() {
        if (this.battleEnding) return;
        if (!this.playerTurn || !this.inBattle) return;
        if (this.currentEnemy.type === 'boss') {
            this.appendBattleLog("Boss战无法逃跑！", 'log-info');
            return;
        }
        if (Math.random() < 0.5) {
            const escapeDamage = Math.floor(this.player.maxHp * 0.2);
            this.player.hp = Math.max(1, this.player.hp - escapeDamage);
            this.appendBattleLog(`你成功逃离了战斗！损失${escapeDamage}点生命（20%最大生命）`, 'log-info');
            this.inBattle = false;
            setTimeout(() => { this.showScreen('mainScreen'); this.refreshMainUI(); }, this.getBattleDelay(1000));
        } else {
            this.appendBattleLog("逃跑失败！", 'log-info');
            this.endPlayerTurn();
        }
    },

    // 快速狩猎：一击必杀，获得70%碎片
    quickHunt() {
        if (!this.inBattle) return;
        const e = this.currentEnemy;
        this.appendBattleLog(`你发动快速狩猎，一击秒杀了 ${e.name}！`, 'log-victory');
        // 成就统计：快速狩猎也算战斗胜利
        if (!this.permanent.achievementStats) this.initAchievementStats();
        this.permanent.achievementStats.battlesCompleted++;
        this.permanent.achievementStats.enemiesKilled++;
        if (e.type === 'boss') this.permanent.achievementStats.bossesKilled++;
        this.checkAchievements();
        // 吞噬累计：记录击杀的敌人体系
        this.recordDevour(e);

        // 获得70%碎片（敌人标签exclusive）
        const fragQuality = e.type === 'boss' ? 3 : (Math.random() < 0.2 ? 2 : 1);
        const fragCount = Math.max(1, Math.floor((e.type === 'boss' ? 3 : 1) * 0.7));
        const enemyTags = e.tags || [1];
        const dropTag = enemyTags[Math.floor(Math.random() * enemyTags.length)];
        this.addTagFragment(dropTag, fragQuality, fragCount);
        const tagName = this.tagNames[dropTag] || ('标签'+dropTag);
        // 成就统计：累计碎片
        this.permanent.achievementStats.totalFragments += fragCount;
        this.savePermanent();
        this.appendBattleLog(`获得 ${fragCount} 个【${tagName}】${this.qualityNames[fragQuality]}碎片（快速狩猎70%）！`, 'log-heal');

        // 基因精华经验减半（快速狩猎），前期额外加成
        const goldMultiplier = e.type === 'boss' ? 5 : (e.type === 'elite' ? 2 : 1);
        const stageMultiplier = this.getGoldMultiplier();
        const goldReward = Math.floor((5 + this.currentFloor*2) * 0.5 * goldMultiplier * stageMultiplier);
        const expReward = Math.floor((10 + this.currentFloor*3) * 0.5);
        // Boss掉落Boss核心
        if (e.type === 'boss' && e.id) {
            this.permanent.bossCores[e.id] = (this.permanent.bossCores[e.id] || 0) + 1;
        }
        this.player.gold += goldReward;
        this.player.exp += expReward;
        // 基因精华现为局内货币，不再永久累积
        this.appendBattleLog(`获得 ${goldReward} 基因精华，${expReward} 经验（快速狩猎50%）！`, 'log-heal');

        while (this.player.exp >= this.player.expToNext) this.levelUp();

        // 战斗之间保留生命，回复20%最大生命
        const healAmount = Math.floor(this.player.maxHp * 0.2);
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);

        this.clearStatuses(this.player);
        this.clearStatuses(this.currentEnemy);
        this.inBattle = false;
        this.currentFloor++;
        
        // 构建快速狩猎掉落物品列表
        const quickDrops = [];
        quickDrops.push({
            icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg>',
            name: `${tagName}${this.qualityNames[fragQuality]}碎片`,
            count: fragCount,
            quality: fragQuality,
            desc: `专属碎片（快速狩猎70%），可用于解锁/升级${tagName}体系天赋`,
            detail: `品质：${this.qualityNames[fragQuality]}\n体系：${tagName}\n数量：${fragCount}（快速狩猎70%）`
        });
        quickDrops.push({
            icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg>',
            name: '基因精华',
            count: goldReward,
            quality: 1,
            desc: '局内货币（快速狩猎50%）',
            detail: `数量：${goldReward}（快速狩猎50%）`
        });
        quickDrops.push({
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            name: '经验值',
            count: expReward,
            quality: 1,
            desc: '提升等级（快速狩猎50%）',
            detail: `数量：${expReward}（快速狩猎50%）`
        });
        if (e.type === 'boss' && e.id) {
            quickDrops.push({
                icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg>',
                name: `${e.name}核心`,
                quality: 4,
                desc: 'Boss核心，可用于解锁神话天赋',
                detail: `来源：${e.name}\n用途：神话天赋解锁`
            });
        }
        
        // 如果是Boss，显示吞噬记忆
        if (e.type === 'boss') {
            const memory = this.bossDevourMemories[e.name] || this.bossDevourMemories['default'];
            this.appendBattleLog(`<span style="color:var(--accent-purple);font-style:italic">${memory}</span>`, 'log-info');
            
            // 检查是否是章末Boss，如果是且未做过抉择，则触发进化抉择
            const currentChapter = this.storyData.getCurrentChapter(this.currentMapIndex);
            const chapterTransition = this.storyData.getChapterTransition(this.currentMapIndex);
            // 如果当前地图是章节的最后一张地图（即下一张地图是新章节的开始），则视为章末Boss
            const nextMapIndex = (this.currentMapIndex + 1) % (this.data.maps.maps.filter(m => m.enemies && m.enemies.length > 0).length);
            const nextChapter = this.storyData.getCurrentChapter(nextMapIndex);
            const isChapterEndBoss = (nextChapter > currentChapter);
            
            if (isChapterEndBoss && !this.hasMadeEvolutionChoice(currentChapter)) {
                console.log(`[进化抉择] 击败章末Boss，触发第${currentChapter}章进化抉择`);
                // 延迟触发，等掉落弹窗关闭后显示
                this._pendingEvolutionChoice = currentChapter;
            }
        }
        
        // 显示掉落弹窗，关闭后跳转回主界面
        this.showKillDropPopup(quickDrops, () => {
            this.showScreen('mainScreen');
            this.refreshMainUI();
            this.showRandomStory();
            // 检查是否有待触发的进化抉择
            if (this._pendingEvolutionChoice) {
                const chapter = this._pendingEvolutionChoice;
                this._pendingEvolutionChoice = null;
                setTimeout(() => {
                    this.showEvolutionChoice(chapter);
                }, 500);
            }
        });
    },

    endPlayerTurn() {
        this.playerTurn = false;
        // 技能冷却-1
        for (const sid in this.player.skillCooldowns) {
            this.player.skillCooldowns[sid]--;
            if (this.player.skillCooldowns[sid] <= 0) delete this.player.skillCooldowns[sid];
        }
        document.querySelectorAll('#battleActions button').forEach(b => b.disabled = true);
        setTimeout(() => this.enemyTurn(), this.getBattleDelay(400));
    },

    // ========== 敌人AI系统 ==========
    enemySkillTable: {
        enemy_poison_bite: {name:"毒咬", desc:"80%伤害+2层中毒", multiplier:0.8, effects:[{type:"dot",dotType:"poison",stacks:2,duration:3}]},
        enemy_stun_slam: {name:"重击", desc:"120%伤害+25%束缚", multiplier:1.2, effects:[{type:"control",controlType:"stun",duration:1,chance:0.25}]},
        enemy_heavy: {name:"重击", desc:"150%伤害", multiplier:1.5, effects:[]},
        enemy_heal: {name:"自愈", desc:"恢复20%生命", multiplier:0, effects:[{type:"heal",percent:0.2}], target:"self"},
        enemy_bleed_claw: {name:"撕裂爪", desc:"70%伤害+3层流血", multiplier:0.7, effects:[{type:"dot",dotType:"bleed",stacks:3,duration:4}]}
    },

    // 获取敌人AI模式
    getEnemyAIPattern(enemy) {
        if (enemy.type === 'boss') return {normal:0.4, skill:0.35, charge:0.15, defend:0.1};
        if (enemy.type === 'elite') return {normal:0.55, skill:0.25, charge:0.15, defend:0.05};
        return {normal:0.8, skill:0.05, charge:0.1, defend:0.05};
    },

    // Boss独特机制（根据标签自动赋予，数值根据地图时代动态调整）
    executeBossUniqueMechanic(enemy, phase) {
        const eName = enemy.name;
        const tags = enemy.tags || [];
        const p = this.player;

        // 根据地图时代计算机制强度系数（早期地图低，后期地图高）
        const mapIndex = this.currentMapIndex || 0;
        // 0-5张地图：0.6倍，6-12张：0.8倍，13-19张：1.0倍，20-25张：1.2倍
        const eraMultiplier = mapIndex < 6 ? 0.6 : mapIndex < 13 ? 0.8 : mapIndex < 20 ? 1.0 : 1.2;
        // 阶段系数：第二阶段1.0倍，第三阶段1.3倍
        const phaseMultiplier = phase >= 3 ? 1.3 : 1.0;
        const dmgMultiplier = eraMultiplier * phaseMultiplier;

        // 根据Boss标签执行独特机制（触发概率统一20%）
        for (const tag of tags) {
            switch(tag) {
                case 3: // 毒系Boss：毒爆
                    if (Math.random() < 0.2) {
                        const poisonStacks = (p.statuses || []).filter(s => s.subtype === 'poison').reduce((sum, s) => sum + (s.stacks || 0), 0);
                        if (poisonStacks > 0) {
                            // 每层1.5%最大生命，最多5层计算（防止叠太多层秒杀）
                            const calcStacks = Math.min(poisonStacks, 5);
                            const dmg = Math.floor(p.maxHp * 0.015 * calcStacks * dmgMultiplier);
                            p.hp = Math.max(1, p.hp - dmg);
                            p.statuses = (p.statuses || []).filter(s => s.subtype !== 'poison');
                            this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg> ${eName}触发【毒爆】！你体内的毒素爆发，受到${dmg}点伤害！`, 'log-damage');
                            return;
                        }
                    }
                    break;
                case 6: // 火系Boss：爆燃
                    if (Math.random() < 0.2) {
                        const burnStacks = (p.statuses || []).filter(s => s.subtype === 'burn').reduce((sum, s) => sum + (s.stacks || 0), 0);
                        if (burnStacks > 0) {
                            const calcStacks = Math.min(burnStacks, 5);
                            const dmg = Math.floor(p.maxHp * 0.02 * calcStacks * dmgMultiplier);
                            p.hp = Math.max(1, p.hp - dmg);
                            p.statuses = (p.statuses || []).filter(s => s.subtype !== 'burn');
                            this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg> ${eName}触发【爆燃】！你身上的火焰剧烈燃烧，受到${dmg}点伤害！`, 'log-damage');
                            return;
                        }
                    }
                    break;
                case 2: // 血系Boss：血怒吸血
                    if (Math.random() < 0.2) {
                        const healAmt = Math.floor(enemy.stats.maxHp * 0.05 * dmgMultiplier);
                        enemy.stats.hp = Math.min(enemy.stats.maxHp, enemy.stats.hp + healAmt);
                        const dmg = Math.floor(p.maxHp * 0.03 * dmgMultiplier);
                        p.hp = Math.max(1, p.hp - dmg);
                        this.appendBattleLog(`🩸 ${eName}触发【血怒】！吸取你${dmg}点生命，恢复${healAmt}点生命！`, 'log-damage');
                        return;
                    }
                    break;
                case 7: // 冰系Boss：深度冻结
                    if (Math.random() < 0.15) {
                        this.addStatus(p, {id:"freeze", name:"冻结", type:"control", subtype:"freeze", stacks:1, duration:1, source:'enemy'});
                        this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"/><path d=\"m20 16-4-4 4-4\"/><path d=\"m4 8 4 4-4 4\"/><path d=\"m16 4-4 4-4-4\"/><path d=\"m8 20 4-4 4 4\"/></svg> ${eName}触发【深度冻结】！你被冻结，下回合无法行动！`, 'log-damage');
                        return;
                    }
                    break;
                case 4: // 雷系Boss：连锁闪电
                    if (Math.random() < 0.2) {
                        const dmg = Math.floor(enemy.stats.atk * 1.2 * dmgMultiplier);
                        p.hp = Math.max(1, p.hp - dmg);
                        this.addStatus(p, {id:"paralyze", name:"麻痹", type:"control", subtype:"paralyze", stacks:1, duration:2, source:'enemy'});
                        this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> ${eName}触发【连锁闪电】！你受到${dmg}点伤害并被麻痹！`, 'log-damage');
                        return;
                    }
                    break;
                case 9: // 甲壳系Boss：破甲重击
                case 13: // 骨骼系Boss：破甲重击
                    if (Math.random() < 0.2) {
                        const dmg = Math.floor(enemy.stats.atk * 1.5 * dmgMultiplier);
                        p.hp = Math.max(1, p.hp - dmg);
                        this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2l2 4 4-2-1 5 5 1-4 3 2 5-5-2-2 4-2-4-5 2 2-5-4-3 5-1-1-5 4 2z\"/></svg> ${eName}触发【破甲重击】！无视你的防御，造成${dmg}点伤害！`, 'log-damage');
                        return;
                    }
                    break;
                case 10: // 再生系Boss：超速再生
                    if (Math.random() < 0.25) {
                        const healAmt = Math.floor(enemy.stats.maxHp * 0.08 * dmgMultiplier);
                        enemy.stats.hp = Math.min(enemy.stats.maxHp, enemy.stats.hp + healAmt);
                        this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-success)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg> ${eName}触发【超速再生】！恢复${healAmt}点生命！`, 'log-info');
                        return;
                    }
                    break;
                case 27: // 巨兽系Boss：大地践踏
                    if (Math.random() < 0.2) {
                        const dmg = Math.floor(enemy.stats.atk * 1.5 * dmgMultiplier);
                        p.hp = Math.max(1, p.hp - dmg);
                        this.addStatus(p, {id:"slow", name:"减速", type:"control", subtype:"slow", stacks:1, duration:2, source:'enemy'});
                        this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3c-3 0-5 2-5 5v3l-2 2v4h2v3h2v-3h6v3h2v-3h2v-4l-2-2V8c0-3-2-5-5-5z\"/><path d=\"M7 10c1 1 2 1.5 3 1.5s2-.5 3-1.5\"/></svg> ${eName}触发【大地践踏】！你受到${dmg}点伤害并被减速！`, 'log-damage');
                        return;
                    }
                    break;
                case 23: // 灵能系Boss：精神冲击
                case 25: // 神系Boss：精神冲击
                case 26: // 终极系Boss：精神冲击
                    if (Math.random() < 0.15) {
                        const dmg = Math.floor(enemy.stats.atk * 1.1 * dmgMultiplier);
                        p.hp = Math.max(1, p.hp - dmg);
                        this.addStatus(p, {id:"silence", name:"沉默", type:"control", subtype:"silence", stacks:1, duration:2, source:'enemy'});
                        this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z\"/><path d=\"M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z\"/></svg> ${eName}触发【精神冲击】！你受到${dmg}点伤害并被沉默！`, 'log-damage');
                        return;
                    }
                    break;
            }
        }
        // 无标签或未触发独特机制时，默认小幅提升攻击（第三阶段）
        if (phase >= 3 && Math.random() < 0.15) {
            enemy.stats.atk = Math.floor(enemy.stats.atk * 1.05);
            this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 7l4 4 4-4\"/><path d=\"M16 16c-.5-1-1.5-2-4-2s-3.5 1-4 2\"/></svg> ${eName}的力量进一步提升！`, 'log-damage');
        }
    },

    // 敌人AI决策并执行
    executeEnemyAI(enemy) {
        const eName = enemy.name;

        // Boss三阶段切换
        if (enemy.type === 'boss') {
            const hpRatio = enemy.stats.hp / enemy.stats.maxHp;
            if (!enemy.phase) enemy.phase = 1;
            if (enemy.phase === 1 && hpRatio <= 0.5) {
                enemy.phase = 2;
                enemy.stats.atk = Math.floor(enemy.stats.atk * 1.3);
                this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg> ${eName}进入第二阶段！攻击力大幅提升！`, 'log-damage');
            } else if (enemy.phase === 2 && hpRatio <= 0.2) {
                enemy.phase = 3;
                enemy.stats.atk = Math.floor(enemy.stats.atk * 1.5);
                this.appendBattleLog(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg> ${eName}进入最终阶段！狂怒！`, 'log-damage');
                // Boss最终阶段独特机制
                this.executeBossUniqueMechanic(enemy, 3);
            }
            // Boss每回合独特机制（非阶段转换时，概率20%）
            if (enemy.phase >= 2 && Math.random() < 0.2) {
                this.executeBossUniqueMechanic(enemy, enemy.phase);
            }
        }

        const pattern = this.getEnemyAIPattern(enemy);

        // 检查上回合是否在蓄力
        if (enemy.charging) {
            enemy.charging = false;
            // 蓄力攻击：双倍伤害
            const atk = enemy.stats.atk;
            enemy.stats.atk = Math.floor(atk * 2);
            this.appendBattleLog(`${eName}释放蓄力攻击！`, 'log-damage');
            this.performAttack(enemy, this.player, false);
            enemy.stats.atk = atk;
            return;
        }

        // 检查是否在防御
        if (enemy.defending) {
            enemy.defending = false;
            this.appendBattleLog(`${eName}解除防御姿态。`, 'log-info');
        }

        // 半血以下检查狂暴
        const hpRatio = enemy.stats.hp / enemy.stats.maxHp;
        if (hpRatio < 0.3 && !enemy.enraged && (enemy.type === 'elite' || enemy.type === 'boss')) {
            enemy.enraged = true;
            enemy.stats.atk = Math.floor(enemy.stats.atk * 1.5);
            this.appendBattleLog(`${eName}进入狂暴状态！攻击力大幅提升！`, 'log-damage');
        }

        // 随机选择行为
        const roll = Math.random();
        let cumulative = 0;

        // 普攻
        cumulative += pattern.normal;
        if (roll < cumulative) {
            this.performAttack(enemy, this.player, false);
            return;
        }

        // 技能
        cumulative += pattern.skill;
        if (roll < cumulative) {
            const skillKeys = Object.keys(this.enemySkillTable);
            // Boss/精英可以用治疗，普通怪不用
            const available = enemy.type === 'normal'
                ? skillKeys.filter(k => k !== 'enemy_heal')
                : skillKeys;
            const skillKey = available[Math.floor(Math.random() * available.length)];
            const skill = this.enemySkillTable[skillKey];
            const target = skill.target === 'self' ? enemy : this.player;

            this.appendBattleLog(`${eName}使用【${skill.name}】！`, 'log-info');

            // 伤害部分
            if (skill.multiplier > 0) {
                const hit = this.calcHit(enemy, this.player, false);
                if (hit.hit) {
                    const def = this.player.defense;
                    const dmg = Math.max(1, Math.floor(enemy.stats.atk * skill.multiplier * (1 - def/(def+100)) * (0.9+Math.random()*0.2)));
                    this.player.hp -= dmg;
                    this.appendBattleLog(`对你造成 ${dmg} 点伤害！`, 'log-damage');
                } else {
                    this.appendBattleLog(`你闪避了${eName}的${skill.name}！`, 'log-info');
                }
            }

            // 效果部分（Dot/控制/治疗）
            skill.effects.forEach(effect => {
                if (effect.type === 'dot') {
                    const dt = this.dotTypes[effect.dotType];
                    this.addStatus(target, {id:effect.dotType,name:dt.name,type:"dot",subtype:effect.dotType,stacks:effect.stacks||1,duration:effect.duration||3,source:"enemy"});
                    this.appendBattleLog(`你陷入${dt.name}！(${effect.stacks||1}层)`, 'log-info');
                } else if (effect.type === 'control') {
                    const ct = this.controlTypes[effect.controlType];
                    if (Math.random() < (effect.chance||1)) {
                        this.addStatus(target, {id:effect.controlType,name:ct.name,type:"control",subtype:effect.controlType,stacks:1,duration:effect.duration||1,source:"enemy"});
                        this.appendBattleLog(`你被${ct.name}！(${effect.duration}回合)`, 'log-info');
                    }
                } else if (effect.type === 'heal') {
                    const heal = Math.floor(enemy.stats.maxHp * (effect.percent||0.2));
                    enemy.stats.hp = Math.min(enemy.stats.maxHp, enemy.stats.hp + heal);
                    this.appendBattleLog(`${eName}恢复了 ${heal} 点生命！`, 'log-heal');
                }
            });
            return;
        }

        // 蓄力
        cumulative += pattern.charge;
        if (roll < cumulative) {
            enemy.charging = true;
            this.appendBattleLog(`${eName}正在蓄力，下回合将发动强力攻击！`, 'log-info');
            return;
        }

        // 防御
        enemy.defending = true;
        this.appendBattleLog(`${eName}进入防御姿态，受到伤害减半！`, 'log-info');
    },

    enemyTurn() {
        if (!this.inBattle) return;
        const isBoss = this.currentEnemy.type === 'boss';
        // 敌人回合开始：结算环境法则效果
        this.tickEnvironmentEffect(this.currentEnemy);
        const ctrl = this.isControlled(this.currentEnemy, isBoss);
        if (ctrl.controlled) {
            this.appendBattleLog(`${this.currentEnemy.name}被${ctrl.reason}，无法行动！`, 'log-info');
        } else {
            this.executeEnemyAI(this.currentEnemy);
        }
        if (this.checkBattleEnd()) return;
        // 敌人回合结束：结算敌人Dot
        this.tickStatuses(this.currentEnemy, false, isBoss);
        if (this.checkBattleEnd()) return;
        // 玩家回合开始：结算玩家Dot + 环境法则效果 + 天赋每回合回复 + 能量回复
        this.tickStatuses(this.player, true, false);
        this.tickEnvironmentEffect(this.player);
        // 天赋每回合回复生命
        const regenBonus = this.getEquippedTalentBonus();
        if (regenBonus.hpRegen > 0) {
            let regenAmount = regenBonus.hpRegen;
            // 受到暴击伤害后恢复量翻倍（骨骼再生）
            if (regenBonus.critHealDouble && this.player.tookCritThisTurn) {
                regenAmount = regenAmount * 2;
                this.appendBattleLog('【骨骼再生】受到暴击后恢复量翻倍！', 'log-heal');
            }
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + regenAmount);
        }
        // 每回合回复最大生命百分比（骨骼再生等）
        if (regenBonus.hpRegenPct > 0) {
            let regenPctAmount = Math.floor(this.player.maxHp * regenBonus.hpRegenPct);
            // 受到暴击伤害后恢复量翻倍（骨骼再生）
            if (regenBonus.critHealDouble && this.player.tookCritThisTurn) {
                regenPctAmount = regenPctAmount * 2;
                this.appendBattleLog('【骨骼再生】受到暴击后恢复量翻倍！', 'log-heal');
            }
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + regenPctAmount);
        }
        // 重置本回合暴击标记
        this.player.tookCritThisTurn = false;
        this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + (this.player.energyRegen || 10));
        if (this.checkBattleEnd()) return;
        this.refreshBattleUI();
        this.playerTurn = true;
        document.querySelectorAll('#battleActions button').forEach(b => b.disabled = false);
    },

    checkBattleEnd() {
        if (this.currentEnemy.stats.hp <= 0) { this.victory(); return true; }
        if (this.player.hp <= 0) { this.defeat(); return true; }
        return false;
    },

    victory() {
        if (this.battleEnding) return;
        this.battleEnding = true;
        const e = this.currentEnemy;
        // 先更新敌人血条为0，让玩家看到击杀效果
        this.refreshBattleUI();
        this.appendBattleLog(`你击败了 ${e.name}！`, 'log-victory');
        
        // Boss吞噬记忆显示
        if (e.type === 'boss') {
            const memory = this.bossDevourMemories[e.name] || this.bossDevourMemories['default'];
            this.appendBattleLog(`<span style="color:var(--accent-purple);font-style:italic">${memory}</span>`, 'log-info');
            
            // 检查是否是章末Boss，如果是且未做过抉择，则触发进化抉择
            const currentChapter = this.storyData.getCurrentChapter(this.currentMapIndex);
            const chapterTransition = this.storyData.getChapterTransition(this.currentMapIndex);
            // 如果当前地图是章节的最后一张地图（即下一张地图是新章节的开始），则视为章末Boss
            const playableMaps = this.data.maps.maps.filter(m => m.enemies && m.enemies.length > 0);
            const nextMapIndex = (this.currentMapIndex + 1) % playableMaps.length;
            const nextChapter = this.storyData.getCurrentChapter(nextMapIndex);
            const isChapterEndBoss = (nextChapter > currentChapter);
            
            if (isChapterEndBoss && !this.hasMadeEvolutionChoice(currentChapter)) {
                console.log(`[进化抉择] 击败章末Boss，触发第${currentChapter}章进化抉择`);
                // 延迟触发，等掉落弹窗关闭后显示
                this._pendingEvolutionChoice = currentChapter;
            }
        }
        
        // 成就统计：战斗胜利
        if (!this.permanent.achievementStats) this.initAchievementStats();
        this.permanent.achievementStats.battlesCompleted++;
        this.permanent.achievementStats.enemiesKilled++;
        if (e.type === 'boss') this.permanent.achievementStats.bossesKilled++;
        this.checkAchievements();
        // 吞噬累计：记录击杀的敌人体系
        this.recordDevour(e);
        // 日常任务：战斗和击杀
        this.updateDailyTask('battles');
        this.updateDailyTask('kills');
        // 击杀回血天赋
        const killBonus = this.getEquippedTalentBonus();
        if (killBonus.healOnKillPct > 0) {
            const killHeal = Math.floor(this.player.maxHp * killBonus.healOnKillPct / 100);
            if (killHeal > 0) {
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + killHeal);
                this.appendBattleLog('击杀回血 ' + killHeal + ' 点生命！', 'log-heal');
            }
        }
        // 击杀回能天赋
        if (killBonus.energyOnKill > 0) {
            this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + killBonus.energyOnKill);
            this.appendBattleLog('击杀回能 ' + killBonus.energyOnKill + ' 点！', 'log-heal');
        }

        // 延迟400ms，让玩家看到敌人空血条的击杀状态，再结算奖励
        setTimeout(() => {
            // 基因精华奖励：普通×1，精英×2，Boss×5，前期额外加成
            const goldMultiplier = e.type === 'boss' ? 5 : (e.type === 'elite' ? 2 : 1);
            const stageMultiplier = this.getGoldMultiplier();
            const goldReward = Math.floor((5 + this.currentFloor*2 + Math.random()*5) * goldMultiplier * stageMultiplier);
            const expReward = Math.floor(10 + this.currentFloor*3);
            this.player.gold += goldReward;
            this.player.exp += expReward;
            // 基因精华现为局内货币，不再永久累积（死亡时30%转化为进化精粹）
            // 成就统计：最高基因精华
            if (this.player.gold > this.permanent.achievementStats.maxGold) {
                this.permanent.achievementStats.maxGold = this.player.gold;
            }
            this.appendBattleLog(`获得 ${goldReward} 基因精华，${expReward} 经验！`, 'log-heal');

            const fragQuality = e.type === 'boss' ? 3 : (Math.random() < 0.2 ? 2 : 1);
            const fragCount = e.type === 'boss' ? 3 : 1;
            // 掉落敌人标签的exclusive碎片（敌人有多个标签时随机选一个）
            const enemyTags = e.tags || [1];
            const dropTag = enemyTags[Math.floor(Math.random() * enemyTags.length)];
            this.addTagFragment(dropTag, fragQuality, fragCount);
            const tagName = this.tagNames[dropTag] || ('标签'+dropTag);
            // 成就统计：累计碎片
            this.permanent.achievementStats.totalFragments += fragCount;
            // 共生体掉落
            const symDrop = this.rollSymbiontDrop(e.type);
            if (symDrop) {
                this.permanent.symbionts.push(symDrop.id);
                this.appendBattleLog(`获得共生体：${symDrop.name}！`, 'log-heal');
                // 延迟显示获得提醒（等战斗结束后）
                this._pendingSymbiontDrop = symDrop;
            }
            this.savePermanent();
            this.appendBattleLog(`获得 ${fragCount} 个【${tagName}】${this.qualityNames[fragQuality]}碎片！`, 'log-heal');

            while (this.player.exp >= this.player.expToNext) this.levelUp();

            // 战斗之间保留生命，回复20%最大生命（不回满）
            const healAmount = Math.floor(this.player.maxHp * 0.2);
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
            this.appendBattleLog(`战斗结束，恢复 ${healAmount} 点生命（当前 ${this.player.hp}/${this.player.maxHp}）`, 'log-heal');

            this.clearStatuses(this.player);
            this.clearStatuses(this.currentEnemy);
            // 重新计算玩家属性，清除环境法则的临时加成
            this.calcDerivedStats();
            this.inBattle = false;
            this.currentLayer++;
            this.currentFloor++;
            // 判断是否打完当前地图，打完则切换到下一张
            const currentMap = this.getCurrentMap();
            if (currentMap && this.currentLayer > currentMap.totalLayers) {
                this.advanceToNextMap();
            }
            
            // 构建掉落物品列表
            const killDrops = [];
            killDrops.push({
                icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg>',
                name: `${tagName}${this.qualityNames[fragQuality]}碎片`,
                count: fragCount,
                quality: fragQuality,
                desc: `专属碎片，可用于解锁/升级${tagName}体系天赋`,
                detail: `品质：${this.qualityNames[fragQuality]}\n体系：${tagName}\n数量：${fragCount}`
            });
            killDrops.push({
                icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg>',
                name: '基因精华',
                count: goldReward,
                quality: 1,
                desc: '局内货币，可用于商店购买物品',
                detail: `数量：${goldReward}\n用途：商店购买、事件消耗`
            });
            killDrops.push({
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
                name: '经验值',
                count: expReward,
                quality: 1,
                desc: '提升等级，获得属性点',
                detail: `数量：${expReward}\n当前等级：${this.player.level}`
            });
            if (symDrop) {
                killDrops.push({
                    icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg>',
                    name: symDrop.name,
                    quality: symDrop.quality,
                    desc: symDrop.desc || '共生体，可装备提供属性加成',
                    detail: `品质：${this.symbiontQualityNames[symDrop.quality] || symDrop.quality}\n部位：${this.symbiontSlotNames[symDrop.slot] || symDrop.slot}`
                });
            }
            if (e.type === 'boss' && e.id) {
                killDrops.push({
                    icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg>',
                    name: `${e.name}核心`,
                    quality: 4,
                    desc: 'Boss核心，可用于解锁神话天赋',
                    detail: `来源：${e.name}\n用途：神话天赋解锁`
                });
            }
            
            // 显示掉落弹窗，关闭后跳转回主界面
            this.showKillDropPopup(killDrops, () => {
                // 显示共生体获得提醒（如果有）- 移到击杀掉落弹窗关闭后再显示
                if (this._pendingSymbiontDrop) {
                    const sym = this._pendingSymbiontDrop;
                    this._pendingSymbiontDrop = null;
                    const self = this;
                    setTimeout(() => {
                        self.showItemObtainedPopup('symbiont', sym, () => {
                            const result = self.equipSymbiont(sym.id);
                            if (result.success) {
                                self.refreshMainUI();
                            }
                            // 如果需要确认替换（result.success为false且msg为'需要确认替换'），不关闭弹窗，让玩家在替换确认界面中操作
                        });
                    }, 500);
                }

                // 重置战斗状态
                this.battleEnding = false;
                this.inBattle = false;
                this.playerTurn = true;
                // 重置按钮状态
                const battleButtons = document.querySelectorAll('#battleActions button');
                battleButtons.forEach(b => b.disabled = false);
                this.showScreen('mainScreen');
                this.refreshMainUI();
                this.showRandomStory();
                // 检查是否有待显示的章节过渡事件
                if (this._pendingChapterTransition) {
                    const transition = this._pendingChapterTransition;
                    this._pendingChapterTransition = null;
                    setTimeout(() => {
                        this.showStory(transition.text, () => {
                            this.showGameAlert('章节加成', `进入【${transition.name}】！
${transition.buff.desc}`);
                        });
                    }, 500);
                }
                // 检查是否有待触发的进化抉择
                else if (this._pendingEvolutionChoice) {
                    const chapter = this._pendingEvolutionChoice;
                    this._pendingEvolutionChoice = null;
                    setTimeout(() => {
                        this.showEvolutionChoice(chapter);
                    }, 500);
                }
            });
        }, 400);
    },

    levelUp() {
        this.player.exp -= this.player.expToNext;
        this.player.level++;
        this.player.expToNext = Math.floor(this.player.expToNext * 1.3);
        // 升级获得3个属性点，自由分配
        this.player.statPoints += 3;
        this.appendBattleLog(`升级！当前等级 ${this.player.level}，获得3个属性点`, 'log-heal');
        // 升级回复50%最大生命（不回满）
        this.calcDerivedStats();
        const levelHeal = Math.floor(this.player.maxHp * 0.5);
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + levelHeal);
        this.appendBattleLog(`升级恢复 ${levelHeal} 点生命！`, 'log-heal');
    },

    // 显示击杀掉落弹窗
    showKillDropPopup(drops, callback) {
        // 先移除已存在的弹窗，避免重复渲染
        const oldPopup = document.getElementById('killDropPopup');
        if (oldPopup) oldPopup.remove();
        const oldTip = document.getElementById('dropTooltip');
        if (oldTip) oldTip.remove();
        
        // 先关闭其他弹窗，避免叠加
        this.closePop();
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel) settingsPanel.style.display = 'none';
        
        let html = '<div id="killDropOverlay" onclick="game.closeKillDropPopup()" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-tap-highlight-color:transparent">';
        html += '<div onclick="event.stopPropagation()" style="background:linear-gradient(135deg,var(--bg-card),var(--bg-secondary));border:2px solid var(--accent-primary);border-radius:16px;padding:20px;max-width:400px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 0 40px rgba(0,212,170,0.3);-webkit-overflow-scrolling:touch">';
        html += '<h3 style="color:var(--accent-primary);text-align:center;margin-bottom:15px;font-size:18px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M5.8 11.3L2 22l10.7-3.8\"/><path d=\"M4 3h.01\"/><path d=\"M22 8h.01\"/><path d=\"M15 2h.01\"/><path d=\"M22 20h.01\"/><path d=\"m18 13 4-4-4-4-4 4z\"/><path d=\"m2 17 4-4 4 4-4 4z\"/></svg> 击杀奖励</h3>';
        html += '<div style="margin-bottom:15px">';
        
        drops.forEach((drop, idx) => {
            const icon = drop.icon || '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/></svg>';
            const name = drop.name || '未知物品';
            const count = drop.count ? `×${drop.count}` : '';
            const quality = drop.quality ? this.qualityColors[drop.quality] : 'var(--text-primary)';
            const desc = drop.desc || '';
            html += `<div class="kill-drop-item" data-index="${idx}" onclick="game.showDropTooltip(event, ${idx})" style="display:flex;align-items:center;padding:10px 12px;background:rgba(0,40,30,0.5);border-radius:8px;margin-bottom:8px;border:1px solid rgba(0,229,176,0.15);cursor:pointer;transition:all 0.2s">
                <span style="font-size:24px;margin-right:12px">${icon}</span>
                <div style="flex:1">
                    <div style="color:${quality};font-weight:bold;font-size:14px">${name}${count}</div>
                    ${desc ? `<div style="color:var(--text-muted);font-size:11px;margin-top:2px">${desc}</div>` : ''}
                </div>
                <span style="color:var(--text-faint);font-size:18px">›</span>
            </div>`;
        });
        
        html += '</div>';
        html += '<button onclick="game.closeKillDropPopup()" style="width:100%;padding:14px;margin-top:12px;background:var(--accent-primary);color:var(--bg-card);border:none;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;min-height:48px;-webkit-tap-highlight-color:transparent">确认领取</button>';
        html += '<div style="text-align:center;color:var(--text-faint);font-size:11px;margin-top:8px">点击任意处或按钮关闭</div>';
        html += '</div></div>';
        
        // 存储掉落物品信息，供tooltip使用
        this._currentKillDrops = drops;
        this._killDropCallback = callback;
        
        const popupDiv = document.createElement('div');
        popupDiv.id = 'killDropPopup';
        popupDiv.innerHTML = html;
        document.body.appendChild(popupDiv);
    },
    
    // 显示掉落物品tooltip
    showDropTooltip(event, idx) {
        event.stopPropagation();
        const drop = this._currentKillDrops[idx];
        if (!drop) return;
        
        // 移除已存在的tooltip
        const oldTip = document.getElementById('dropTooltip');
        if (oldTip) oldTip.remove();
        
        const tip = document.createElement('div');
        tip.id = 'dropTooltip';
        tip.style.cssText = `position:fixed;left:${event.clientX + 15}px;top:${event.clientY + 15}px;background:rgba(0,20,15,0.98);border:1px solid rgba(0,229,176,0.4);border-radius:8px;padding:12px 15px;max-width:280px;z-index:10001;font-size:12px;color:var(--text-secondary);line-height:1.6;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,0.5)`;
        
        let tipHtml = `<div style="color:${this.qualityColors[drop.quality] || 'var(--text-primary)'};font-weight:bold;font-size:14px;margin-bottom:6px">${drop.icon || ''} ${drop.name || '未知物品'}</div>`;
        if (drop.desc) tipHtml += `<div style="color:var(--text-muted);margin-bottom:6px">${drop.desc}</div>`;
        if (drop.detail) tipHtml += `<div style="color:var(--text-secondary);margin-top:6px;padding-top:6px;border-top:1px solid var(--text-faint)">${drop.detail}</div>`;
        tip.innerHTML = tipHtml;
        document.body.appendChild(tip);
        
        // 3秒后自动消失
        setTimeout(() => { if (tip.parentNode) tip.remove(); }, 3000);
    },
    
    // 关闭击杀掉落弹窗
    closeKillDropPopup() {
        const popup = document.getElementById('killDropPopup');
        if (popup) popup.remove();
        const tip = document.getElementById('dropTooltip');
        if (tip) tip.remove();
        
        // 执行回调
        if (this._killDropCallback) {
            const cb = this._killDropCallback;
            this._killDropCallback = null;
            this._currentKillDrops = null;
            // 确保回调在DOM更新后执行
            setTimeout(() => cb(), 50);
        }
    },

    defeat() {
        if (this.battleEnding) return;
        this.battleEnding = true;
        this.appendBattleLog("你被击败了……", 'log-damage');
        this.clearStatuses(this.player);
        this.clearStatuses(this.currentEnemy);
        this.inBattle = false;
        setTimeout(() => this.deathSettlement(), 800);
    },

    // ============================================================
    //  死亡结算
    // ============================================================
    deathSettlement() {
        // 成就统计：死亡
        if (!this.permanent.achievementStats) this.initAchievementStats();
        this.permanent.achievementStats.deaths++;
        
        // 第一次死亡时显示轮回叙事文本（存储到permanent中，在死亡结算页显示）
        if (this.permanent.achievementStats.deaths === 1) {
            this.permanent.firstDeathShown = true;
        }
        this.checkAchievements();
        const p = this.player;
        // 局内五维获得 = 已分配的 + 未分配的属性点（1点=1五维）
        const allocatedGained = p.runStrGained + p.runAgiGained + p.runVitGained + p.runPerGained + p.runEvoGained;
        const unspentPoints = p.statPoints;
        const totalGained = allocatedGained + unspentPoints;
        // 层数保底：每到达1层+0.5自由点（向上取整），确保每局至少1点
        const floorBonus = Math.ceil(this.currentFloor * 0.5);
        // 局内五维获得按50%转化为自由属性点 + 层数保底
        const totalFree = Math.floor(totalGained * 0.55) + floorBonus;

        // 天赋转化碎片
        let fragReturned = {1:0,2:0,3:0,4:0,5:0};
        const all = this.data.talents.talents;
        p.equippedTalents.forEach(tid => {
            const t = all.find(x => x.id === tid);
            if (t) fragReturned[t.quality] += 1;
        });

        // 天赋点奖励：层数×0.3（向上取整）+ 等级奖励
        const talentPointReward = Math.ceil(this.currentFloor * 0.35) + Math.floor(p.level / 5);
        this.permanent.talentPoints = (this.permanent.talentPoints || 0) + talentPointReward;
        this.permanent.freePoints += totalFree;

        // 排行榜：记录本次轮回成绩
        if (!this.permanent.leaderboard) this.initLeaderboard();
        const mapName = this.getCurrentMap() ? this.getCurrentMap().name : '未知地图';
        const floorRecord = this.recordScore('floor', this.currentFloor, `到达${mapName}`);
        const levelRecord = this.recordScore('level', p.level, `到达${this.currentFloor}层`);
        const killRecord = this.recordScore('kills', this.permanent.achievementStats ? this.permanent.achievementStats.enemiesKilled : 0, `到达${this.currentFloor}层`);
        let newRecordMsg = '';
        if (floorRecord) newRecordMsg += '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"m8 3 4 8 5-5 5 15H2L8 3z\"/></svg> 最高层数新纪录！\n';
        if (levelRecord) newRecordMsg += '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/></svg> 最高等级新纪录！\n';
        if (killRecord) newRecordMsg += '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg> 最多击杀新纪录！\n';
        if (newRecordMsg) {
            setTimeout(() => this.showGameAlert('恭喜！', '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M5.8 11.3L2 22l10.7-3.8\"/><path d=\"M4 3h.01\"/><path d=\"M22 8h.01\"/><path d=\"M15 2h.01\"/><path d=\"M22 20h.01\"/><path d=\"m18 13 4-4-4-4-4 4z\"/><path d=\"m2 17 4-4 4 4-4 4z\"/></svg> 恭喜！\n\n' + newRecordMsg), 1000);
        }
        for (let q=1; q<=5; q++) this.permanent.universalFragments[q] += fragReturned[q];
        // 剩余基因精华30%转化为进化精粹（需击杀至少5个敌人）
        const killsThisRun = this.permanent.achievementStats ? (this.permanent.achievementStats.battlesCompleted || 0) : 0;
        const canConvertEssence = killsThisRun >= 5;
        const goldToEssence = canConvertEssence ? Math.floor(p.gold * 0.3) : 0;
        if (goldToEssence > 0) {
            this.permanent.essence = (this.permanent.essence || 0) + goldToEssence;
        }
        this.savePermanent();

        // 第一次死亡时显示轮回叙事文本
        let deathNarrativeHtml = '';
        if (this.permanent.firstDeathShown && this.permanent.achievementStats.deaths === 1) {
            deathNarrativeHtml = `<div style="background:var(--bg-secondary);border-radius:8px;padding:16px;margin-bottom:16px;text-align:center;border-left:3px solid var(--accent-purple)">
                <p style="color:var(--accent-purple);font-size:15px;line-height:1.8;font-style:italic;margin:0">${this.firstDeathNarrative.replace(/\n/g, '<br>')}</p>
            </div>`;
        }
        
        document.getElementById('deathStats').innerHTML = deathNarrativeHtml + `
            <div class="stat-row"><span class="stat-label">到达层数</span><span>第 ${this.currentFloor} 层</span></div>
            <div class="stat-row"><span class="stat-label">最终等级</span><span>${p.level} 级</span></div>
            <div class="stat-row"><span class="stat-label">剩余基因精华</span><span>${p.gold}${canConvertEssence ? `（30%转化为${goldToEssence}进化精粹）` : `（击杀不足5个，无法转化）`}</span></div>
            <div class="stat-row"><span class="stat-label">剩余属性点</span><span>${p.statPoints}</span></div>
            <div class="stat-row"><span class="stat-label">最终五维</span><span>力${p.strength} 敏${p.agility} 体${p.vitality} 感${p.perception} 进${p.evolution}</span></div>
            <div class="stat-row"><span class="stat-label">局内五维获得</span><span>力+${p.runStrGained} 敏+${p.runAgiGained} 体+${p.runVitGained} 感+${p.runPerGained} 进+${p.runEvoGained}</span></div>
        `;

        let conv = `<div class="reward-box"><p style="color:var(--accent-warning);font-size:18px">获得自由属性点：+${totalFree}</p>`;
        conv += `<p style="color:var(--accent-success);font-size:16px">获得天赋点：+${talentPointReward}</p>`;
        conv += `<p style="font-size:13px;color:var(--text-secondary)">已分配五维${allocatedGained}点 + 未分配属性点${unspentPoints}点 = ${totalGained}点 × 50% = ${Math.floor(totalGained*0.5)}点</p>`;
        conv += `<p style="font-size:13px;color:var(--text-secondary)">层数保底：第${this.currentFloor}层 × 0.5 = ${floorBonus}点</p></div>`;

        let fragText = [];
        for (let q=1; q<=5; q++) if (fragReturned[q]>0) fragText.push(`${this.qualityNames[q]}碎片+${fragReturned[q]}`);
        if (fragText.length > 0) conv += `<div class="reward-box"><p style="color:var(--accent-success)">天赋转化：${fragText.join('，')}</p></div>`;
        if (goldToEssence > 0) {
            conv += `<div class="reward-box"><p style="color:var(--accent-purple)">基因精华转化：${p.gold} × 30% = ${goldToEssence} 进化精粹</p></div>`;
        } else if (!canConvertEssence && p.gold > 0) {
            conv += `<div class="reward-box"><p style="color:var(--text-muted)">基因精华转化：击杀不足5个（当前${killsThisRun}个），无法转化</p></div>`;
        }
        conv += `<p style="color:var(--text-secondary);font-size:13px;margin-top:10px">所有碎片100%保留至局外</p>`;
        
        // ============================================================
        // "再努力一点"转化预览钩子
        // ============================================================
        conv += '<div style="margin-top:14px;padding:12px;background:rgba(255,152,0,0.08);border:1px solid rgba(255,152,0,0.3);border-radius:8px">';
        conv += '<p style="color:var(--accent-warning);font-size:14px;font-weight:bold;margin:0 0 8px 0"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 再努力一点</p>';
        
        const previewHints = [];
        
        // 1. 再推几层可以多获得多少进化精粹
        if (p.gold > 0 && canConvertEssence) {
            const nextFloorEssence = Math.floor((p.gold + 20) * 0.3);  // 假设再推一层多20基因精华
            const extraEssence = nextFloorEssence - goldToEssence;
            if (extraEssence > 0) {
                previewHints.push(`再推1层 → 进化精粹再多约 +${extraEssence}`);
            }
        }
        
        // 2. 距离下一层数保底还差多少
        const nextFloorBonus = Math.ceil((this.currentFloor + 1) * 0.5) - floorBonus;
        if (nextFloorBonus > 0) {
            previewHints.push(`再推1层 → 自由属性点再多 +${nextFloorBonus}`);
        }
        
        // 3. 距离最高纪录还差多少
        const bestFloor = this.permanent.leaderboard ? (this.permanent.leaderboard.bestFloor || 0) : 0;
        if (bestFloor > 0 && this.currentFloor < bestFloor) {
            const floorToRecord = bestFloor - this.currentFloor;
            previewHints.push(`距离最高纪录第${bestFloor}层还差 ${floorToRecord} 层`);
        } else if (this.currentFloor >= bestFloor && bestFloor > 0) {
            previewHints.push(`<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 9H4.5a2.5 2.5 0 0 1 0-5H6\"/><path d=\"M18 9h1.5a2.5 2.5 0 0 0 0-5H18\"/><path d=\"M4 22h16\"/><path d=\"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22\"/><path d=\"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22\"/><path d=\"M18 2H6v7a6 6 0 0 0 12 0V2Z\"/></svg> 已突破最高纪录第${bestFloor}层！`);
        }
        
        // 4. 击杀数距离下一个成就
        const kills = this.permanent.achievementStats ? (this.permanent.achievementStats.enemiesKilled || 0) : 0;
        const killMilestones = [10, 50, 100, 500, 1000];
        for (const milestone of killMilestones) {
            if (kills < milestone) {
                previewHints.push(`累计击杀 ${kills}/${milestone} → 再击杀 ${milestone - kills} 只解锁成就`);
                break;
            }
        }
        
        // 5. 天赋点距离下一个天赋解锁
        const talentPoints = this.permanent.talentPoints || 0;
        if (talentPoints < 5) {
            previewHints.push(`天赋点 ${talentPoints}/5 → 再获得 ${5 - talentPoints} 点可解锁新天赋`);
        }
        
        // 显示前3条提示
        const displayHints = previewHints.slice(0, 3);
        if (displayHints.length > 0) {
            displayHints.forEach(hint => {
                conv += `<p style="color:var(--accent-warning);font-size:12px;margin:4px 0">• ${hint}</p>`;
            });
        } else {
            conv += '<p style="color:var(--text-muted);font-size:12px;margin:4px 0">继续探索，发现更多成长机会！</p>';
        }
        
        conv += '</div>';

        document.getElementById('deathConversion').innerHTML = conv;
        this.showScreen('deathScreen');
    },

    goToGrowth() { this.openGrowth(); },

    // 自杀：主动结束轮回，进入死亡结算
    suicide() {
        if (this.currentFloor <= 1) return;
        const self = this;
        this.showGameConfirm('<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>️ 结束轮回', '确定要结束当前轮回吗？\n将进入死亡结算，所有进度转化为局外成长。', () => {
            self.player.hp = 0;
            self.defeat();
        });
    },

    // ============================================================
    //  局外成长
    // ============================================================
    openGrowth() {
        this.showScreen('growthScreen');
        this.refreshGrowthUI();
    },

    refreshGrowthUI() {
        const b = this.permanent.bonusStats;
        document.getElementById('permanentStats').innerHTML = `
            <div class="stat-row" data-tooltip="permanentStats" style="cursor:pointer"><span class="stat-label">力量加成</span><span>+${b.strength}（每点+2攻击）</span></div>
            <div class="stat-row" data-tooltip="permanentStats" style="cursor:pointer"><span class="stat-label">敏捷加成</span><span>+${b.agility}（每点+1先手）</span></div>
            <div class="stat-row" data-tooltip="permanentStats" style="cursor:pointer"><span class="stat-label">体质加成</span><span>+${b.vitality}（每点+8生命+0.4防御）</span></div>
            <div class="stat-row" data-tooltip="permanentStats" style="cursor:pointer"><span class="stat-label">感知加成</span><span>+${b.perception}（每点+0.8暴击+0.2命中）</span></div>
            <div class="stat-row" data-tooltip="permanentStats" style="cursor:pointer"><span class="stat-label">进化加成</span><span>+${b.evolution}（每点天赋效果+1%）</span></div>
        `;
        // 绑定永久属性tooltip
        const selfGrowth = this;
        document.querySelectorAll('#permanentStats [data-tooltip]').forEach(item => {
            const key = item.getAttribute('data-tooltip');
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                selfGrowth.showTooltip(key, e);
            });
            item.addEventListener('mouseenter', function(e) {
                selfGrowth.showTooltip(key, e);
            });
            item.addEventListener('mouseleave', function() {
                selfGrowth.hideTooltip();
            });
        });
        const freePointsDisplay = document.getElementById('freePointsDisplay');
        freePointsDisplay.innerText = this.permanent.freePoints;
        freePointsDisplay.parentElement.setAttribute('data-tooltip', 'freePoints');
        freePointsDisplay.parentElement.style.cursor = 'pointer';
        freePointsDisplay.parentElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showTooltip('freePoints', e);
        });
        freePointsDisplay.parentElement.addEventListener('mouseenter', (e) => {
            this.showTooltip('freePoints', e);
        });
        freePointsDisplay.parentElement.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });

        // 进化精粹显示和强化
        if (!this.permanent.essenceUpgrades) this.permanent.essenceUpgrades = {};
        let eh = `<div style="margin-bottom:10px;padding:8px;background:var(--bg-card);border-radius:6px">`;
        eh += `<span data-tooltip="essence" style="color:var(--accent-purple);font-weight:bold;font-size:16px;cursor:pointer"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 进化残留：${this.permanent.essence || 0}</span>`;
        eh += `<span style="color:var(--text-muted);font-size:12px;margin-left:10px">死亡时剩余基因精华30%转化（需击杀≥5敌人）</span>`;
        eh += `<button onclick="game.resetEssenceUpgrades()" style="float:right;font-size:11px;padding:3px 8px;background:var(--accent-danger)">重置残留强化</button>`;
        eh += `</div>`;
        eh += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
        for (const stat in this.essenceUpgradeConfig) {
            const cfg = this.essenceUpgradeConfig[stat];
            const lv = this.permanent.essenceUpgrades[stat] || 0;
            const cost = this.getEssenceUpgradeCost(stat, lv);
            const canUpgrade = lv < cfg.maxLevel && (this.permanent.essence || 0) >= cost;
            const bonusPercent = Math.floor(lv * cfg.bonusPerLevel * 100);
            eh += `<div style="padding:8px;background:var(--bg-secondary);border-radius:6px">`;
            eh += `<div style="color:var(--text-primary);font-size:13px;font-weight:bold;margin-bottom:2px">${cfg.name}</div>`;
            eh += `<div style="color:var(--text-muted);font-size:11px;margin-bottom:4px">${cfg.desc}</div>`;
            eh += `<div style="color:var(--accent-success);font-size:12px;margin-bottom:6px">Lv.${lv}/${cfg.maxLevel}（+${bonusPercent}%）</div>`;
            if (lv < cfg.maxLevel) {
                eh += `<button onclick="game.upgradeEssence('${stat}')" ${canUpgrade?'':'disabled'} style="font-size:11px;padding:4px 8px;width:100%">升级（${cost}残留）</button>`;
            } else {
                eh += `<span style="color:var(--accent-warning);font-size:11px">已满级</span>`;
            }
            eh += `</div>`;
        }
        eh += `</div>`;
        const essenceDisplay = document.getElementById('essenceDisplay');
        if (essenceDisplay) essenceDisplay.innerHTML = eh;

        let fh = '';
        for (let q=1; q<=5; q++) {
            fh += `<span data-tooltip="universalFragments" style="display:inline-block;margin-right:15px;color:${this.qualityColors[q]};cursor:pointer">${this.qualityNames[q]}：${this.permanent.universalFragments[q]}</span>`;
        }
        // 碎片合成按钮
        fh += '<div style="margin-top:8px">';
        for (let q=1; q<=4; q++) {
            const rate = this.fragmentSynthRates[q];
            const have = this.permanent.universalFragments[q] || 0;
            const canSynth = have >= rate;
            fh += `<button onclick="game.synthesizeFragments(${q})" ${canSynth?'':'disabled'} style="font-size:11px;margin-right:8px;padding:4px 8px">${rate}${this.qualityNames[q]}→1${this.qualityNames[q+1]}</button>`;
        }
        fh += '</div>';
        // 碎片管理按钮
        fh += '<div style="margin-top:8px">';
        fh += '<button onclick="game.openFragmentManager()" style="font-size:12px;background:var(--quality-rare);color:white;padding:6px 12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z\"/></svg> 碎片管理（标签专属碎片合成/兑换）</button>';
        fh += '</div>';
        // 天赋进化说明
        fh += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border-primary)">';
        fh += '<span style="color:var(--accent-warning);font-size:12px">天赋进化：有进化路线的天赋可在下方列表中点击"进化"按钮，消耗1个该天赋+高阶碎片进化成指定高阶天赋</span>';
        fh += '</div>';
        document.getElementById('fragmentsDisplay').innerHTML = fh;
        
        // ============================================================
        // 进化抉择区域
        // ============================================================
        let evoHtml = '<div style="margin-top:15px;padding:10px;background:var(--bg-card);border-radius:8px;border:1px solid var(--accent-purple)">';
        evoHtml += '<div style="color:var(--accent-purple);font-weight:bold;font-size:15px;margin-bottom:8px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> 进化抉择</div>';
        evoHtml += '<div style="color:var(--text-muted);font-size:12px;margin-bottom:8px">击败章末Boss后可选择进化方向，在基因记忆库中可消耗进化残留切换方向</div>';
        
        // 显示7个章节的进化抉择
        for (let ch = 1; ch <= 7; ch++) {
            const choice = this.getEvolutionChoice(ch);
            const chapterData = this.storyData.evolutionChoices.find(ec => ec.chapter === ch);
            if (!chapterData) continue;
            
            evoHtml += '<div style="margin-bottom:8px;padding:6px;background:var(--bg-secondary);border-radius:4px">';
            evoHtml += `<span style="color:var(--text-primary);font-size:12px;font-weight:bold">第${ch}章·${chapterData.title}</span>`;
            
            if (choice) {
                const optionData = chapterData.options.find(o => o.id === choice);
                if (optionData) {
                    evoHtml += `<div style="color:var(--accent-success);font-size:11px;margin-top:2px">已选择：${optionData.name}</div>`;
                    // 显示加成效果
                    if (optionData.buffs) {
                        const buffTexts = [];
                        for (const [key, value] of Object.entries(optionData.buffs)) {
                            const buffName = this.getEvolutionBuffName(key);
                            if (buffName) {
                                const sign = value > 0 ? '+' : '';
                                buffTexts.push(`${buffName}${sign}${value}${key.includes('Pct') || key.includes('Percent') || key === 'crit' || key === 'critDamage' || key === 'hit' || key === 'dodge' || key === 'hpRegen' || key === 'allResist' || key === 'physicalResist' || key === 'poisonDamage' || key === 'poisonDuration' || key === 'enemyHit' || key === 'armorPenetration' || key === 'cooldown' || key === 'skillCost' || key === 'normalDamage' || key === 'skillDamage' || key === 'damageTaken' || key === 'fragmentBonus' ? '%' : ''}`);
                            }
                        }
                        if (buffTexts.length > 0) {
                            evoHtml += `<div style="color:var(--text-muted);font-size:10px;margin-top:2px">${buffTexts.join('，')}</div>`;
                        }
                    }
                    // 切换按钮（消耗进化残留）
                    const switchCost = ch * 5;
                    const canSwitch = (this.permanent.essence || 0) >= switchCost;
                    evoHtml += `<button onclick="game.showEvolutionSwitchPanel(${ch})" ${canSwitch?'':'disabled'} style="font-size:10px;padding:2px 6px;margin-top:4px;background:var(--accent-warning)">切换方向（${switchCost}残留）</button>`;
                }
            } else {
                evoHtml += `<div style="color:var(--text-muted);font-size:11px;margin-top:2px">未选择（击败第${ch}章Boss后可选择）</div>`;
            }
            evoHtml += '</div>';
        }
        
        evoHtml += '</div>';
        
        // 添加到进化残留显示区域后面
        if (essenceDisplay) {
            essenceDisplay.innerHTML += evoHtml;
        }
        
        // 绑定进化残留和万能碎片的tooltip
        const growthSelf = this;
        document.querySelectorAll('#essenceDisplay [data-tooltip], #fragmentsDisplay [data-tooltip]').forEach(item => {
            const key = item.getAttribute('data-tooltip');
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                growthSelf.showTooltip(key, e);
            });
            item.addEventListener('mouseenter', function(e) {
                growthSelf.showTooltip(key, e);
            });
            item.addEventListener('mouseleave', function() {
                growthSelf.hideTooltip();
            });
        });
        this.renderTalentUnlockList();
    },

    allocatePermanentPoint(stat) {
        if (this.permanent.freePoints <= 0) return;
        this.permanent.freePoints--;
        this.permanent.bonusStats[stat]++;
        this.savePermanent();
        this.refreshGrowthUI();
    },

    // 重置永久属性，返还所有自由点
    resetPermanentStats() {
        const b = this.permanent.bonusStats;
        const total = b.strength + b.agility + b.vitality + b.perception + b.evolution;
        if (total === 0) { this.showGameAlert("提示", "没有可重置的永久属性"); return; }
        const self = this;
        this.showGameConfirm("确认重置", `确定重置所有永久属性？将返还 ${total} 点自由属性点。`, function() {
            self.permanent.freePoints += total;
            self.permanent.bonusStats = {strength:0, agility:0, vitality:0, perception:0, evolution:0};
            self.savePermanent();
            self.refreshGrowthUI();
            self.showGameAlert("重置成功", `已重置永久属性，返还 ${total} 点自由属性点！`);
        });
    },

    // 重置已解锁天赋，全额返还碎片
    resetUnlockedTalents() {
        const unlocked = this.permanent.unlockedTalents;
        if (unlocked.length === 0) { this.showGameAlert("提示", "没有已解锁的天赋"); return; }
        const self = this;
        this.showGameConfirm("确认重置", `确定重置所有已解锁天赋？将全额返还碎片（共${unlocked.length}个天赋）。`, function() {
            let totalRefund = 0;
            const all = self.data.talents.talents;
            unlocked.forEach(tid => {
                const t = all.find(x => x.id === tid);
                if (t) {
                    const cost = self.getTalentUnlockCost(t.quality);
                    const refund = cost;
                    self.permanent.universalFragments[t.quality] += refund;
                    totalRefund += refund;
                }
            });
            self.permanent.unlockedTalents = [];
            self.savePermanent();
            self.refreshGrowthUI();
            self.showGameAlert("重置成功", `已重置 ${unlocked.length} 个天赋，全额返还 ${totalRefund} 个碎片！`);
        });
    },

    renderTalentUnlockList() {        const all = this.data.talents.talents;        if (!all) return;        const listEl = document.getElementById('talentUnlockList');        if (!listEl) return;        const unlocked = this.permanent.unlockedTalents;        const equipped = this.player.equippedTalents;        const passiveSlots = this.getPassiveSlots();        let html = '';        html += `<div style="margin-bottom:10px;padding:8px;background:var(--bg-card);border-radius:6px">            <span style="color:var(--accent-warning)">天赋点：${this.permanent.talentPoints || 0}</span>            <span style="margin-left:20px;color:var(--accent-success)">被动槽：${equipped.length}/${passiveSlots}</span>            <span style="margin-left:20px;color:var(--accent-info)">主动槽：${this.getActiveSlots()}</span>        </div>`;        const sorted = [...all].sort((a,b)=>a.quality-b.quality);        sorted.forEach(t => {            const isUnlocked = unlocked.includes(t.id);            const isEquipped = equipped.includes(t.id);            const lv = this.getTalentLevel(t.id);            const maxLv = t.maxLevel || 5;            const cost = t.unlockCost || {fragQuality: t.quality, fragCount: 10};            const canAfford = (this.permanent.universalFragments[cost.fragQuality] || 0) >= cost.fragCount;            let effectText = '';            if (isUnlocked) {                const eff = this.getTalentEffect(t.id);                effectText = eff ? eff.passive : '';            } else if (t.effects && t.effects.length > 0) {                effectText = t.effects[0].passive || '';            }            let upgradeBtn = '';            if (isUnlocked && lv < maxLv) {                const levelCosts = t.levelCost || [2,3,5,8,12];                const pointCost = levelCosts[lv-1] || 2;                const fragCost = pointCost;                const canUpgrade = (this.permanent.talentPoints || 0) >= pointCost && (this.permanent.universalFragments[t.quality] || 0) >= fragCost;                const nextEff = this.getTalentNextEffect(t.id);                upgradeBtn = `<button onclick="game.upgradeTalentAndRefresh('${t.id}')" ${canUpgrade?'':'disabled'} style="font-size:11px;margin-top:4px" title="${nextEff ? nextEff.passive : ''}">升级Lv.${lv+1}(${pointCost}点+${fragCost}碎片)</button>`;            } else if (isUnlocked && lv >= maxLv) {                upgradeBtn = '<span style="color:var(--accent-warning);font-size:11px">已满级</span>';            }            let actionBtn = '';
            if (!isUnlocked) {
                const talentTag = (t.tags && t.tags.length > 0) ? t.tags[0] : 1;
                const tagFragCount = this.getTagFragmentCount(talentTag, cost.fragQuality);
                const tagName = this.tagNames[talentTag] || ('标签'+talentTag);
                actionBtn = `<button onclick="game.unlockTalentAndRefresh('${t.id}')" ${canAfford?'':'disabled'} style="font-size:12px">解锁(${cost.fragCount}【${tagName}】${this.qualityNames[cost.fragQuality]}碎片，拥有${tagFragCount})</button>`;
            } else {
                let evolveBtn = '';
                if (t.advanceTo) {
                    const target = all.find(x => x.id === t.advanceTo);
                    if (target && !unlocked.includes(target.id)) {
                        const fragCost = this.talentEvolveCost[t.quality] || 10;
                        const targetTag = (target.tags && target.tags.length > 0) ? target.tags[0] : 1;
                        const canEvolve = this.getTagFragmentCount(targetTag, target.quality) >= fragCost;
                        const targetTagName = this.tagNames[targetTag] || ('标签'+targetTag);
                        evolveBtn = `<button onclick="game.evolveTalent('${t.id}')" ${canEvolve?'':'disabled'} style="font-size:11px;background:var(--accent-purple);color:white" title="进化为【${target.name}】，消耗${fragCost}个【${targetTagName}】${this.qualityNames[target.quality]}碎片">进化→${target.name}</button>`;
                    }
                }
                if (isEquipped) {
                    actionBtn = `${evolveBtn}<button onclick="game.unequipTalentAndRefresh('${t.id}')" style="font-size:12px;background:var(--accent-danger);margin-left:4px">卸下</button>`;
                } else {
                    const canEquip = equipped.length < passiveSlots;
                    actionBtn = `${evolveBtn}<button onclick="game.equipTalentAndRefresh('${t.id}')" ${canEquip?'':'disabled'} style="font-size:12px;margin-left:4px">装备</button>`;
                }
            }            html += `<div class="talent-card" style="${isEquipped?'border-color:var(--accent-success)':''}">                <div>                    <div class="talent-name quality-${t.quality}" data-talent-id="${t.id}">${t.name}                        <span style="font-size:12px;color:var(--text-muted)">[${this.qualityNames[t.quality]}]</span>                        ${isUnlocked ? `<span style="font-size:12px;color:var(--accent-warning)">Lv.${lv}/${maxLv}</span>` : ''}                        ${isEquipped ? '<span style="font-size:11px;color:var(--accent-success)">[已装备]</span>' : ''}                    </div>                    <div class="talent-desc">${effectText}</div>                    ${upgradeBtn}                </div>                <div>${actionBtn}</div>            </div>`;        });        if (listEl) listEl.innerHTML = html;    },    unlockTalentAndRefresh(tid) {        const r = this.unlockTalent(tid);        if (r.success) this.appendBattleLog(r.msg);        else if (r.msg) this.showGameAlert("提示", r.msg);        this.refreshGrowthUI();    },    upgradeTalentAndRefresh(tid) {        const r = this.upgradeTalent(tid);        if (r.success) this.appendBattleLog(r.msg);        else if (r.msg) this.showGameAlert("提示", r.msg);        this.refreshGrowthUI();    },    equipTalentAndRefresh(tid) {        const r = this.equipTalent(tid);        if (r.success) this.appendBattleLog(r.msg);        else if (r.msg) this.showGameAlert("提示", r.msg);        this.refreshGrowthUI();    },    unequipTalentAndRefresh(tid) {        const r = this.unequipTalent(tid);        if (r.success) this.appendBattleLog(r.msg);        else if (r.msg) this.showGameAlert("提示", r.msg);        this.refreshGrowthUI();    },
    getTalentUnlockCost(quality) {
        return {1:5, 2:10, 3:20, 4:40, 5:80}[quality] || 10;
    },

    // 碎片合成比例：低品质→高品质
    fragmentSynthRates: {1:8, 2:6, 3:5, 4:4},  // 8白→1蓝, 6蓝→1紫, 5紫→1橙, 4橙→1虹

    // 合成碎片
    synthesizeFragments(fromQuality) {
        if (fromQuality >= 5) { this.showGameAlert("提示", "神话碎片无法再合成"); return; }
        const rate = this.fragmentSynthRates[fromQuality];
        if (!rate) { this.showGameAlert("提示", "无法合成该品质碎片"); return; }
        const have = this.permanent.universalFragments[fromQuality] || 0;
        if (have < rate) { this.showGameAlert("提示", `碎片不足，需要${rate}个${this.qualityNames[fromQuality]}碎片，当前只有${have}个`); return; }
        const toQuality = fromQuality + 1;
        const count = Math.floor(have / rate);
        this.permanent.universalFragments[fromQuality] -= count * rate;
        this.permanent.universalFragments[toQuality] += count;
        this.savePermanent();
        this.refreshGrowthUI();
        this.showGameAlert("合成成功", `合成成功！消耗${count * rate}个${this.qualityNames[fromQuality]}碎片，获得${count}个${this.qualityNames[toQuality]}碎片！`);
    },

    // 合成标签专属碎片（同标签内低品质→高品质）
    synthesizeTagFragments(tag, fromQuality) {
        if (fromQuality >= 5) { this.showGameAlert("提示", "神话碎片无法再合成"); return; }
        const rate = this.fragmentSynthRates[fromQuality];
        if (!rate) { this.showGameAlert("提示", "无法合成该品质碎片"); return; }
        const have = this.permanent.tagFragments[tag] ? (this.permanent.tagFragments[tag][fromQuality] || 0) : 0;
        if (have < rate) { this.showGameAlert("提示", `碎片不足，需要${rate}个${this.qualityNames[fromQuality]}碎片，当前只有${have}个`); return; }
        const toQuality = fromQuality + 1;
        const count = Math.floor(have / rate);
        if (!this.permanent.tagFragments[tag]) this.permanent.tagFragments[tag] = {};
        this.permanent.tagFragments[tag][fromQuality] -= count * rate;
        this.permanent.tagFragments[tag][toQuality] = (this.permanent.tagFragments[tag][toQuality] || 0) + count;
        this.savePermanent();
        this.refreshGrowthUI();
        const tagName = this.tagNames[tag] || ('标签'+tag);
        this.showGameAlert("合成成功", `合成成功！消耗${count * rate}个【${tagName}】${this.qualityNames[fromQuality]}碎片，获得${count}个【${tagName}】${this.qualityNames[toQuality]}碎片！`);
    },

    // 万能碎片兑换比例：标签专属→万能
    universalExchangeRate: {1:10, 2:8, 3:6, 4:4, 5:2},  // 10普通专属→1万能普通，8稀有专属→1万能稀有...

    // 兑换万能碎片（标签专属碎片→万能碎片）
    exchangeToUniversal(tag, quality) {
        const rate = this.universalExchangeRate[quality];
        if (!rate) { this.showGameAlert("提示", "无法兑换该品质碎片"); return; }
        const have = this.permanent.tagFragments[tag] ? (this.permanent.tagFragments[tag][quality] || 0) : 0;
        if (have < rate) { this.showGameAlert("提示", `碎片不足，需要${rate}个专属碎片，当前只有${have}个`); return; }
        const count = Math.floor(have / rate);
        this.permanent.tagFragments[tag][quality] -= count * rate;
        this.permanent.universalFragments[quality] = (this.permanent.universalFragments[quality] || 0) + count;
        this.savePermanent();
        this.refreshGrowthUI();
        const tagName = this.tagNames[tag] || ('标签'+tag);
        this.showGameAlert('兑换成功', `兑换成功！消耗${count * rate}个【${tagName}】${this.qualityNames[quality]}碎片，获得${count}个万能${this.qualityNames[quality]}碎片！`);
    },

    // 碎片管理面板：显示所有标签专属碎片，提供合成和兑换
    openFragmentManager() {
        let html = `<h3><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z\"/></svg> 碎片管理</h3>`;
        html += `<p style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">标签专属碎片只能用于升级对应体系的天赋；可在同标签内合成升级，或兑换为万能碎片</p>`;

        // 万能碎片汇总
        html += `<div style="margin-bottom:12px;padding:8px;background:var(--bg-card);border-radius:6px">`;
        html += `<span style="color:var(--accent-warning);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 万能碎片：</span>`;
        for (let q=1; q<=5; q++) {
            html += `<span style="display:inline-block;margin-right:10px;color:${this.qualityColors[q]}">${this.qualityNames[q]}：${this.permanent.universalFragments ? (this.permanent.universalFragments[q] || 0) : 0}</span>`;
        }
        html += `</div>`;

        // 万能碎片合成
        html += `<div style="margin-bottom:12px">`;
        html += `<span style="color:var(--text-secondary);font-size:12px">万能碎片合成：</span>`;
        for (let q=1; q<=4; q++) {
            const rate = this.fragmentSynthRates[q];
            const have = this.permanent.universalFragments ? (this.permanent.universalFragments[q] || 0) : 0;
            const canSynth = have >= rate;
            html += `<button onclick="game.synthesizeFragments(${q});game.openFragmentManager()" ${canSynth?'':'disabled'} style="font-size:11px;margin-right:6px;padding:3px 6px">${rate}${this.qualityNames[q]}→1${this.qualityNames[q+1]}</button>`;
        }
        html += `</div>`;

        // 按标签显示专属碎片
        html += `<div class="scroll-area" style="max-height:calc(100vh - 280px);padding-bottom:40px">`;
        const tagIds = Object.keys(this.tagNames).map(Number).sort((a,b)=>a-b);
        tagIds.forEach(tagId => {
            const tagName = this.tagNames[tagId];
            const tagFrags = this.permanent.tagFragments ? (this.permanent.tagFragments[tagId] || {}) : {};
            const total = Object.values(tagFrags).reduce((a,b)=>a+b, 0);
            if (total === 0) return; // 跳过没有碎片的标签

            html += `<div style="margin-bottom:10px;padding:8px;background:var(--bg-secondary);border-radius:6px">`;
            html += `<div style="margin-bottom:6px"><span style="color:var(--accent-info);font-weight:bold">【${tagName}】</span> <span style="color:var(--text-muted);font-size:11px">共${total}个</span></div>`;

            // 各品质碎片数量
            html += `<div style="margin-bottom:6px;font-size:12px">`;
            for (let q=1; q<=5; q++) {
                const count = tagFrags[q] || 0;
                if (count > 0) {
                    html += `<span style="display:inline-block;margin-right:10px;color:${this.qualityColors[q]}">${this.qualityNames[q]}：${count}</span>`;
                }
            }
            html += `</div>`;

            // 合成按钮（同标签内）
            html += `<div style="margin-bottom:4px">`;
            html += `<span style="color:var(--text-muted);font-size:11px">合成：</span>`;
            for (let q=1; q<=4; q++) {
                const rate = this.fragmentSynthRates[q];
                const have = tagFrags[q] || 0;
                const canSynth = have >= rate;
                html += `<button onclick="game.synthesizeTagFragments(${tagId},${q});game.openFragmentManager()" ${canSynth?'':'disabled'} style="font-size:10px;margin-right:4px;padding:2px 5px">${rate}${this.qualityNames[q]}→1${this.qualityNames[q+1]}</button>`;
            }
            html += `</div>`;

            // 兑换万能碎片按钮
            html += `<div>`;
            html += `<span style="color:var(--text-muted);font-size:11px">兑换万能：</span>`;
            for (let q=1; q<=5; q++) {
                const rate = this.universalExchangeRate[q];
                const have = tagFrags[q] || 0;
                const canExchange = have >= rate;
                html += `<button onclick="game.exchangeToUniversal(${tagId},${q});game.openFragmentManager()" ${canExchange?'':'disabled'} style="font-size:10px;margin-right:4px;padding:2px 5px;background:var(--accent-orange)">${rate}→1万能${this.qualityNames[q]}</button>`;
            }
            html += `</div>`;

            html += `</div>`;
        });
        html += `</div>`;

        html += `<div style="margin-top:12px;text-align:right"><button onclick="game.closePop()" style="font-size:13px;padding:8px 20px">关闭</button></div>`;

        this.showPopup(html);
    },

    // 天赋进化消耗：1个低品质天赋 + 目标品质碎片
    talentEvolveCost: {
        1: 5,   // 普通→稀有：5稀有碎片
        2: 10,  // 稀有→史诗：10史诗碎片
        3: 15,  // 史诗→传说：15传说碎片
        4: 20,  // 传说→神话：20神话碎片
    },

    // 天赋进化：消耗1个低品质天赋+目标品质碎片，进化成指定的高阶天赋
    evolveTalent(talentId) {
        const t = this.data.talents.talents.find(x => x.id === talentId);
        if (!t) { this.showGameAlert("提示", "天赋不存在"); return; }
        if (!t.advanceTo) { this.showGameAlert("提示", "该天赋没有进化路线"); return; }
        if (!this.isTalentUnlocked(talentId)) { this.showGameAlert("提示", "该天赋尚未解锁"); return; }

        const target = this.data.talents.talents.find(x => x.id === t.advanceTo);
        if (!target) { this.showGameAlert("提示", "进化目标不存在"); return; }
        if (this.isTalentUnlocked(target.id)) { this.showGameAlert("提示", "进化目标已解锁，无需重复进化"); return; }

        const fromQuality = t.quality;
        const toQuality = target.quality;
        const fragCost = this.talentEvolveCost[fromQuality] || 10;
        const targetTag = (target.tags && target.tags.length > 0) ? target.tags[0] : 1;
        const haveFrags = this.getTagFragmentCount(targetTag, toQuality);
        const targetTagName = this.tagNames[targetTag] || ('标签'+targetTag);

        if (haveFrags < fragCost) {
            this.showGameAlert("提示", `需要${fragCost}个【${targetTagName}】${this.qualityNames[toQuality]}碎片，当前只有${haveFrags}个`);
            return;
        }

        // 确认
        const self = this;
        this.showGameConfirm("确认进化", `确定进化？\n【${t.name}】→【${target.name}】\n消耗：1个${t.name} + ${fragCost}个${this.qualityNames[toQuality]}碎片\n已投入天赋点全额返还`, function() {
            // 计算已投入的天赋点，全额返还
            let refundPoints = 0;
            const lv = self.getTalentLevel(talentId);
            const costs = [2, 3, 5, 8, 12];
            for (let i = 0; i < lv - 1; i++) refundPoints += costs[i] || 2;

            // 从已解锁列表移除
            const idx = self.permanent.unlockedTalents.indexOf(talentId);
            if (idx >= 0) self.permanent.unlockedTalents.splice(idx, 1);
            // 从已装备列表移除
            const eqIdx = self.player.equippedTalents.indexOf(talentId);
            if (eqIdx >= 0) self.player.equippedTalents.splice(eqIdx, 1);
            // 移除等级记录
            delete self.permanent.talentLevels[talentId];

            // 扣除碎片（目标天赋标签专属+万能）
            self.consumeFragments(targetTag, toQuality, fragCost);
            // 返还天赋点
            self.permanent.talentPoints = (self.permanent.talentPoints || 0) + refundPoints;

            // 解锁目标天赋
            self.permanent.unlockedTalents.push(target.id);
            self.permanent.talentLevels[target.id] = 1;
            // 检查图鉴收集是否解锁新的永久加成
            self.checkCodexBonuses();

            // 成就统计：进化
            if (!self.permanent.achievementStats) self.initAchievementStats();
            self.permanent.achievementStats.evolutionsCompleted++;
            self.checkAchievements();
            self.savePermanent();
            self.calcDerivedStats();
            self.refreshGrowthUI();

            let msg = `进化成功！【${t.name}】→【${target.name}】`;
            if (refundPoints > 0) msg += `\n返还${refundPoints}天赋点（全额）。`;
            self.showGameAlert("提示", msg);
        });
    },

    // 获取所有融合配方
    getFusionRecipes() {
        const all = this.data.talents.talents;
        return all.filter(t => t.isFusion && t.fusionRecipe);
    },

    // 检查融合配方是否可融合（两个材料都已解锁且Lv.5，目标未解锁）
    canFuse(recipe) {
        if (!recipe || !recipe.fusionRecipe || recipe.fusionRecipe.length < 2) return false;
        const [id1, id2] = recipe.fusionRecipe;
        const t1 = this.data.talents.talents.find(x => x.id === id1);
        const t2 = this.data.talents.talents.find(x => x.id === id2);
        if (!t1 || !t2) return false;
        // 两个材料都必须已解锁且Lv.5
        if (!this.isTalentUnlocked(id1) || this.getTalentLevel(id1) < 5) return false;
        if (!this.isTalentUnlocked(id2) || this.getTalentLevel(id2) < 5) return false;
        // 目标不能已解锁
        if (this.isTalentUnlocked(recipe.id)) return false;
        return true;
    },

    // 天赋融合：消耗两个Lv.5史诗天赋，获得融合天赋
    fuseTalents(recipeId) {
        const recipe = this.data.talents.talents.find(t => t.id === recipeId);
        if (!recipe || !recipe.fusionRecipe) { this.showGameAlert("提示", "融合配方不存在"); return; }
        if (!this.canFuse(recipe)) { this.showGameAlert("提示", "材料不足：需要两个Lv.5的史诗天赋，且目标未解锁"); return; }

        const [id1, id2] = recipe.fusionRecipe;
        const t1 = this.data.talents.talents.find(x => x.id === id1);
        const t2 = this.data.talents.talents.find(x => x.id === id2);

        const self = this;
        this.showGameConfirm("确认融合", `确定融合？\n【${t1.name}】+【${t2.name}】→【${recipe.name}】\n两个材料天赋将被消耗，已投入天赋点全额返还`, function() {
            // 计算并返还天赋点（全额）
            let refundPoints = 0;
            const costs = [2, 3, 5, 8, 12];
            [id1, id2].forEach(tid => {
                const lv = self.getTalentLevel(tid);
                for (let i = 0; i < lv - 1; i++) refundPoints += costs[i] || 2;
                // 从已解锁列表移除
                const idx = self.permanent.unlockedTalents.indexOf(tid);
                if (idx >= 0) self.permanent.unlockedTalents.splice(idx, 1);
                // 从已装备列表移除
                const eqIdx = self.player.equippedTalents.indexOf(tid);
                if (eqIdx >= 0) self.player.equippedTalents.splice(eqIdx, 1);
                // 移除等级记录
                delete self.permanent.talentLevels[tid];
            });

            // 返还天赋点
            self.permanent.talentPoints = (self.permanent.talentPoints || 0) + refundPoints;

            // 解锁融合天赋
            self.permanent.unlockedTalents.push(recipe.id);
            self.permanent.talentLevels[recipe.id] = 1;
            // 检查图鉴收集是否解锁新的永久加成
            self.checkCodexBonuses();

            // 成就统计：融合
            if (!self.permanent.achievementStats) self.initAchievementStats();
            self.permanent.achievementStats.fusionsCompleted++;
            self.checkAchievements();
            self.savePermanent();
            self.calcDerivedStats();
            self.refreshGrowthUI();

            let msg = `融合成功！【${t1.name}】+【${t2.name}】→【${recipe.name}】！`;
            if (refundPoints > 0) msg += `\n返还${refundPoints}天赋点（全额）。`;
            self.showGameAlert("提示", msg);
        });
    },

    // 打开融合面板
    openFusionPanel() {
        const recipes = this.getFusionRecipes();
        let html = '<h3>天赋融合</h3>';
        html += '<p style="color:var(--text-muted);font-size:13px;margin-bottom:10px">消耗两个Lv.5的史诗天赋，融合成更强大的传说天赋。材料天赋将被消耗，已投入天赋点全额返还。</p>';
        html += '<div class="scroll-area" style="padding-bottom:50px">';

        recipes.forEach(r => {
            const [id1, id2] = r.fusionRecipe;
            const t1 = this.data.talents.talents.find(x => x.id === id1);
            const t2 = this.data.talents.talents.find(x => x.id === id2);
            const canFuse = this.canFuse(r);
            const isUnlocked = this.isTalentUnlocked(r.id);
            const lv1 = this.getTalentLevel(id1);
            const lv2 = this.getTalentLevel(id2);
            const unlocked1 = this.isTalentUnlocked(id1);
            const unlocked2 = this.isTalentUnlocked(id2);

            const effectText = r.effects && r.effects.length > 0 ? r.effects[r.effects.length - 1].passive : '';

            html += '<div class="talent-card" style="margin-bottom:10px">';
            html += '<div>';
            html += `<div class="talent-name quality-${r.quality}">${r.name} <span style="font-size:11px;color:var(--accent-purple)">[融合天赋]</span>${isUnlocked ? '<span style="font-size:11px;color:var(--accent-success)">[已解锁]</span>' : ''}</div>`;
            html += `<div class="talent-desc" style="margin-bottom:6px">${r.description || ''}</div>`;
            html += `<div style="font-size:12px;color:var(--text-secondary)">满级效果：${effectText}</div>`;
            html += '<div style="margin-top:6px;font-size:12px">';
            html += `<span style="color:${unlocked1 && lv1 >= 5 ? 'var(--accent-success)' : 'var(--accent-danger)'}">${t1 ? t1.name : '?'} ${unlocked1 ? 'Lv.' + lv1 : '(未解锁)'}</span>`;
            html += ' <span style="color:var(--text-muted)">+</span> ';
            html += `<span style="color:${unlocked2 && lv2 >= 5 ? 'var(--accent-success)' : 'var(--accent-danger)'}">${t2 ? t2.name : '?'} ${unlocked2 ? 'Lv.' + lv2 : '(未解锁)'}</span>`;
            html += '</div>';
            html += '</div>';
            html += '<div>';
            if (isUnlocked) {
                html += '<span style="color:var(--accent-success);font-size:12px">已解锁</span>';
            } else {
                html += `<button onclick="game.fuseTalents('${r.id}')" ${canFuse ? '' : 'disabled'} style="font-size:12px;background:var(--accent-purple);color:white">融合</button>`;
            }
            html += '</div>';
            html += '</div>';
        });

        html += '</div>';
        html += '<div style="margin-top:10px;display:flex;gap:10px">';
        html += '<button onclick="game.openTalentPanel()" style="flex:1">返回天赋列表</button>';
        html += '<button onclick="game.closePop()" style="flex:1">关闭</button>';
        html += '</div>';
        this.showPopup(html);
    },

    unlockTalent(talentId) {
        const all = this.data.talents.talents;
        const t = all.find(x => x.id === talentId);
        if (!t) return {success: false, msg: '天赋不存在'};
        if (this.permanent.unlockedTalents.includes(talentId)) return {success: false, msg: '天赋已解锁'};
        
        // 使用天赋自身定义的解锁成本，如果没有则使用默认成本
        const cost = t.unlockCost || {fragQuality: t.quality, fragCount: this.getTalentUnlockCost(t.quality)};
        // 确保所有值都是数字类型，避免字符串导致的bug
        const fragQuality = parseInt(cost.fragQuality) || parseInt(t.quality) || 1;
        const fragCount = parseInt(cost.fragCount) || this.getTalentUnlockCost(fragQuality);
        const talentTag = (t.tags && t.tags.length > 0) ? parseInt(t.tags[0]) : 1;
        
        // 检查Boss核心
        if (cost.bossCore && (!this.permanent.bossCores || (this.permanent.bossCores[cost.bossCore] || 0) < 1)) {
            return {success: false, msg: '需要对应Boss核心才能解锁'};
        }
        
        // 检查碎片（专属+万能）
        const totalFrags = this.getTagFragmentCount(talentTag, fragQuality);
        if (totalFrags < fragCount) {
            const exclusive = this.permanent.tagFragments && this.permanent.tagFragments[talentTag] ? (this.permanent.tagFragments[talentTag][fragQuality] || 0) : 0;
            const universal = this.permanent.universalFragments ? (this.permanent.universalFragments[fragQuality] || 0) : 0;
            const tagName = this.tagNames[talentTag] || ('标签'+talentTag);
            return {success: false, msg: `碎片不足！\n需要：${fragCount}个【${tagName}】${this.qualityNames[fragQuality]}碎片\n当前：${totalFrags}个（${tagName}专属${exclusive} + 万能${universal}）\n\n<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 专属碎片只能用于对应体系，万能碎片可用于任意体系`};
        }
        
        // 消耗碎片
        if (!this.consumeFragments(talentTag, fragQuality, fragCount)) {
            return {success: false, msg: '碎片消耗失败'};
        }
        
        // 消耗Boss核心
        if (cost.bossCore && this.permanent.bossCores) {
            this.permanent.bossCores[cost.bossCore] = (this.permanent.bossCores[cost.bossCore] || 0) - 1;
        }
        
        this.permanent.unlockedTalents.push(talentId);
        if (!this.permanent.talentLevels) this.permanent.talentLevels = {};
        // 检查图鉴收集是否解锁新的永久加成
        this.checkCodexBonuses();
        this.permanent.talentLevels[talentId] = 1;
        this.savePermanent();
        this.refreshGrowthUI();
        return {success: true, msg: `解锁天赋：${t.name}！`};
    },

    // ============================================================
    //  天赋系统
    // ============================================================
    // 局内天赋面板（简化版，只显示解锁/升级/装备）
    updateBottomNav(screenName) {
        const bottomNav = document.getElementById('bottomNav');
        if (bottomNav) {
            bottomNav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            const navBtn = bottomNav.querySelector('[data-screen="' + screenName + '"]');
            if (navBtn) navBtn.classList.add('active');
        }
    },
    
    // 玩家详细属性展开/收起
    togglePlayerDetail() {
        const detail = document.getElementById('playerDetailInfo');
        const arrow = document.getElementById('playerDetailArrow');
        if (detail && arrow) {
            if (detail.style.display === 'none') {
                detail.style.display = 'block';
                arrow.textContent = '▲';
            } else {
                detail.style.display = 'none';
                arrow.textContent = '▼';
            }
        }
    },
    
    // ============================================================
    //  Tooltip 悬浮提示框系统
    // ============================================================
    
    // Tooltip数据定义
    tooltipData: {
        // 顶部资源栏
        geneEssence: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因精华',
            sections: [
                { label: '类型', value: '局内货币' },
                { label: '获取方式', value: '击杀敌人、随机事件、商人出售' },
                { label: '用途', value: '商店购买、随机事件消费' },
                { label: '说明', value: '基因精华是局内货币，每局初始50，死亡后剩余30%转化为进化精粹。' }
            ]
        },
        talentPoints: {
            title: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 天赋点',
            sections: [
                { label: '类型', value: '永久资源' },
                { label: '获取方式', value: '死亡结算、成就奖励、任务奖励' },
                { label: '用途', value: '天赋升级' },
                { label: '说明', value: '天赋点用于升级已解锁的天赋，提升天赋效果。' }
            ]
        },
        passiveSlots: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 被动槽位',
            sections: [
                { label: '类型', value: '装备限制' },
                { label: '说明', value: '当前装备的天赋数量 / 最大被动槽位数。可以通过商店购买额外被动槽位。' }
            ]
        },
        universalFragment: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 万能碎片',
            sections: [
                { label: '类型', value: '通用资源' },
                { label: '获取方式', value: '随机事件、碎片合成、商人购买' },
                { label: '用途', value: '替代任意体系的专属碎片用于天赋解锁和升级' },
                { label: '说明', value: '万能碎片总数（所有品质合计）。专属碎片只能用于对应体系，万能碎片可用于任意体系。' }
            ]
        },
        normalFragment: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 基因碎片',
            sections: [
                { label: '类型', value: '普通品质碎片（白色）' },
                { label: '获取方式', value: '战斗掉落、随机事件、任务奖励' },
                { label: '用途', value: '解锁普通天赋、合成稀有碎片（8个普通→1个稀有）' },
                { label: '说明', value: '最基础的碎片，普通敌人必掉。积累足够后可解锁普通天赋或合成更高品质碎片。' }
            ]
        },
        currentFloor: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"/><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"/></svg>️ 当前层数',
            sections: [
                { label: '格式', value: '地图序号-层序号' },
                { label: '说明', value: '例如3-2表示第3张地图的第2层' },
                { label: '地图结构', value: '每张地图共5层，第5层为Boss层' },
                { label: '进度', value: '通关当前地图后进入下一张地图，时代递进' }
            ]
        },
        // 轮回空间相关
        permanentStats: {
            title: '前世记忆（永久属性加成）',
            sections: [
                { label: '类型', value: '局外永久成长' },
                { label: '获取方式', value: '死亡结算（局内获得的五维属性55%转化）' },
                { label: '用途', value: '每局开始时自动附加到基础属性上' },
                { label: '说明', value: '前世记忆是轮回成长的核心，每局死亡后局内获得的五维属性会按55%转化为永久加成，下一局自动生效。' }
            ]
        },
        freePoints: {
            title: '可用前世记忆（自由属性点）',
            sections: [
                { label: '类型', value: '可分配永久资源' },
                { label: '获取方式', value: '死亡结算、成就奖励、任务奖励' },
                { label: '用途', value: '手动分配到力量/敏捷/体质/感知/进化五个属性' },
                { label: '说明', value: '自由属性点可以手动分配，比自动转化的属性更加灵活。重置前世记忆会全额返还所有自由点。' }
            ]
        },
        essence: {
            title: '进化残留（进化精粹）',
            sections: [
                { label: '类型', value: '局外百分比强化资源' },
                { label: '获取方式', value: '死亡结算（剩余基因精华30%转化，需击杀≥5敌人）' },
                { label: '用途', value: '强化力量/敏捷/体质/感知/进化/生命六个属性的百分比加成' },
                { label: '说明', value: '进化残留是高阶局外成长资源，提供百分比加成，越到后期越强。重置残留强化会全额返还所有进化残留。' }
            ]
        },
        universalFragments: {
            title: '万能碎片（按品质）',
            sections: [
                { label: '类型', value: '通用天赋解锁资源' },
                { label: '获取方式', value: '随机事件、碎片合成、商人购买、成就奖励' },
                { label: '用途', value: '替代任意体系的专属碎片用于天赋解锁和升级' },
                { label: '说明', value: '万能碎片可以替代对应品质的任意体系专属碎片。专属碎片只能用于对应体系，万能碎片可用于任意体系。8个低品质万能碎片可合成1个高品质万能碎片。' }
            ]
        },
        // 玩家属性
        level: {
            title: '等级',
            sections: [
                { label: '效果', value: '每级+5最大生命，+2攻击，+1防御' },
                { label: '升级方式', value: '击杀敌人获得经验，经验满后自动升级' },
                { label: '说明', value: '等级提升会增强基础属性，是局内成长的基础。' }
            ]
        },
        hp: {
            title: '生命值',
            sections: [
                { label: '效果', value: '生命值归零时角色死亡' },
                { label: '计算方式', value: '最大生命 = 基础生命 + 体质×8 + 天赋加成 + 等级加成' },
                { label: '战斗后恢复', value: '每场战斗结束后恢复25%最大生命（不回满）' },
                { label: '说明', value: '生命值是生存的基础，体质属性主要影响最大生命。' }
            ]
        },
        attack: {
            title: '攻击力',
            sections: [
                { label: '效果', value: '决定普攻和技能的基础伤害' },
                { label: '计算方式', value: '攻击 = 基础攻击 + 力量×2 + 天赋加成 + 等级加成' },
                { label: '伤害公式', value: '最终伤害 = 攻击 × (100/(100+敌方防御)) × 暴击倍率' },
                { label: '说明', value: '攻击力是输出的核心属性，力量属性主要影响攻击力。' }
            ]
        },
        defense: {
            title: '防御力',
            sections: [
                { label: '效果', value: '减少受到的物理伤害' },
                { label: '计算方式', value: '防御 = 基础防御 + 体质×0.8 + 天赋加成' },
                { label: '减伤公式', value: '减伤率 = 防御 / (防御 + 100)' },
                { label: '说明', value: '防御力越高，受到的物理伤害越低。体质属性同时影响防御和生命。' }
            ]
        },
        crit: {
            title: '暴击率',
            sections: [
                { label: '效果', value: '攻击时有概率造成暴击伤害' },
                { label: '计算方式', value: '暴击 = 基础暴击(5%) + 感知×0.8 + 天赋加成' },
                { label: '上限', value: '100%' },
                { label: '暴击伤害', value: '基础150%，暴击值超过100后每点+0.5%暴击伤害' },
                { label: '说明', value: '感知属性主要影响暴击率和命中率。' }
            ]
        },
        hit: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg> 基础命中率',
            sections: [
                { label: '效果', value: '攻击命中敌人的基础概率' },
                { label: '计算公式', value: '基础命中 = 85 + 感知/5 + 天赋加成' },
                { label: '实际命中', value: '实际命中率 = 基础命中 - 敌人闪避率' },
                { label: '下限', value: '10%（最低不会低于10%）' },
                { label: '上限', value: '100%' },
                { label: '说明', value: '这是基础命中率，实际命中率还会受敌人闪避率影响。敌人敏捷高于你时会获得闪避率。战斗开始时会显示双方实际命中率。' }
            ]
        },
        dodgeRate: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2\"/><path d=\"M9.6 4.6A2 2 0 1 1 11 8H2\"/><path d=\"M12.6 19.4A2 2 0 1 0 14 16H2\"/></svg> 闪避率',
            sections: [
                { label: '效果', value: '躲避敌人攻击的概率' },
                { label: '计算公式', value: '闪避 = 60×(1-e^(-0.05×(你的敏捷-敌人敏捷))) + 天赋加成' },
                { label: '触发条件', value: '只有当你的敏捷 > 敌人敏捷时才有基础闪避' },
                { label: '上限', value: '基础60%，含天赋加成最高80%' },
                { label: '说明', value: '堆敏捷不仅提升先手，还能在敏捷超过敌人时获得闪避率。闪避成功时有几率触发闪避反击（需天赋支持）。' }
            ]
        },
        critDamage: {
            title: '暴击伤害',
            sections: [
                { label: '效果', value: '暴击时造成的伤害倍率' },
                { label: '基础值', value: '150%（暴击造成1.5倍伤害）' },
                { label: '提升方式', value: '暴击值超过100后，每点+0.5%暴击伤害' },
                { label: '计算公式', value: '暴击伤害 = 150% + (暴击值 - 100) / 2 %' },
                { label: '说明', value: '暴击伤害决定暴击时的输出能力。暴击值堆到100%后，继续提升会增加暴击伤害。' }
            ]
        },
        speed: {
            title: '先手值',
            sections: [
                { label: '效果', value: '决定战斗中谁先行动，同时影响闪避率' },
                { label: '计算方式', value: '先手 = 基础先手 + 敏捷×1 + 天赋加成' },
                { label: '闪避公式', value: '闪避率 = 60×(1-e^(-0.05×敏捷差值))，上限60%' },
                { label: '说明', value: '敏捷属性主要影响先手值和闪避率。先手值高的一方先攻击。' }
            ]
        },
        energy: {
            title: '能量',
            sections: [
                { label: '效果', value: '释放技能需要消耗能量' },
                { label: '计算方式', value: '最大能量 = 基础100 + 进化属性加成 + 天赋加成' },
                { label: '恢复方式', value: '每回合恢复10点，普攻+15点' },
                { label: '技能消耗', value: '小技能20，中技能35，大招50，终极80' },
                { label: '说明', value: '能量是技能释放的资源，进化属性会影响最大能量和恢复速度。' }
            ]
        },
        strength: {
            title: '力量',
            sections: [
                { label: '效果', value: '每点+2攻击力' },
                { label: '主属性', value: '是攻击力的主要来源' },
                { label: '说明', value: '力量属性决定物理输出能力，适合普攻和物理技能流派。' }
            ]
        },
        agility: {
            title: '敏捷',
            sections: [
                { label: '效果', value: '每点+1先手值，影响闪避差值' },
                { label: '主属性', value: '是先手值和闪避率的主要来源' },
                { label: '说明', value: '敏捷属性决定行动顺序和闪避能力，适合速度和闪避流派。' }
            ]
        },
        vitality: {
            title: '体质',
            sections: [
                { label: '效果', value: '每点+8最大生命，+0.8防御力' },
                { label: '主属性', value: '是生命值和防御力的主要来源' },
                { label: '说明', value: '体质属性决定生存能力，适合坦克和续航流派。' }
            ]
        },
        perception: {
            title: '感知',
            sections: [
                { label: '效果', value: '每点+0.8暴击值，+1发现值，每5点+1%命中率' },
                { label: '主属性', value: '是暴击率和命中率的主要来源' },
                { label: '说明', value: '感知属性决定输出稳定性和暴击能力，适合暴击和精准流派。' }
            ]
        },
        evolution: {
            title: '进化',
            sections: [
                { label: '天赋加成倍率', value: '每点+1%（影响天赋提供的攻击/防御/生命等加成数值）' },
                { label: '最大能量', value: '每点+5（基础100，进化10点→150能量）' },
                { label: '能量恢复', value: '每点+0.5/回合（基础10/回合，进化10点→15/回合）' },
                { label: 'Dot伤害加成', value: '每点+0.5%（进化10点→Dot伤害+5%）' },
                { label: '技能冷却缩减', value: '每点+0.2%，上限30%（进化150点达到上限）' },
                { label: '天赋强度加成', value: '每点+1%（影响天赋效果强度）' },
                { label: '说明', value: '进化是最特殊的属性，不直接加攻击/防御，而是通过倍率和衍生效果增强技能、天赋和Dot伤害，适合技能流和Dot流。' }
            ]
        },
        // 状态效果
        poison: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg>️ 中毒',
            sections: [
                { label: '类型', value: 'Dot伤害（持续伤害）' },
                { label: '伤害公式', value: '每回合受到 攻击者攻击力×0.2×层数 的伤害' },
                { label: '衰减', value: '每回合层数-1' },
                { label: '附加效果', value: '削弱目标攻击力和防御力' },
                { label: '说明', value: '中毒是稳定的持续伤害，适合长时间战斗。毒系天赋可以增强中毒效果。' }
            ]
        },
        burn: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg> 灼烧',
            sections: [
                { label: '类型', value: 'Dot伤害（持续伤害）' },
                { label: '伤害公式', value: '每回合受到 8×层数×(1+目标已损失生命%) 的伤害' },
                { label: '衰减', value: '每回合层数-1' },
                { label: '特殊效果', value: '斩杀效果：目标血量越低，灼烧伤害越高' },
                { label: '说明', value: '灼烧是斩杀型持续伤害，目标血量越低伤害越高，适合收尾。火系天赋可以增强灼烧效果。' }
            ]
        },
        bleed: {
            title: '🩸 流血',
            sections: [
                { label: '类型', value: 'Dot伤害（持续伤害）' },
                { label: '伤害公式', value: '每回合受到 5×层数 + 目标最大生命×0.01×层数 的伤害' },
                { label: '递增', value: '每回合层数+1（越流越痛）' },
                { label: '说明', value: '流血是递增型持续伤害，层数会越来越高，适合长时间战斗。流血系天赋可以增强流血效果。' }
            ]
        },
        wither: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg> 凋零',
            sections: [
                { label: '类型', value: 'Dot伤害（持续伤害）' },
                { label: '伤害公式', value: '每回合受到 目标最大生命×0.02×层数 的伤害' },
                { label: '衰减', value: '每回合层数-1' },
                { label: '附加效果', value: '全属性-10%' },
                { label: 'Boss抗性', value: 'Boss对凋零伤害有50%抗性' },
                { label: '说明', value: '凋零是百分比伤害，对高血量敌人效果显著，但Boss有抗性。凋零系天赋可以增强凋零效果。' }
            ]
        },
        stun: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 9l2 2-2 2\"/><path d=\"M16 9l-2 2 2 2\"/><path d=\"M9 16h6\"/></svg> 束缚/麻痹/冻结',
            sections: [
                { label: '类型', value: '控制效果' },
                { label: '束缚', value: '无法行动，Boss持续-1回合' },
                { label: '麻痹', value: '50%无法行动+敏捷-50%（降低闪避），Boss概率-20%' },
                { label: '冻结', value: '无法行动1回合+解冻减速，Boss持续-1回合' },
                { label: '控制铁律', value: '冷却回合必须大于控制持续回合，保证空窗期，不允许无限控制链' },
                { label: '说明', value: '控制效果可以限制敌人行动，但Boss有抗性，且不能无限控制。' }
            ]
        },
        slow: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0\"/><path d=\"M2 13h12\"/><path d=\"M14 13c2 0 4-2 4-4s-2-4-4-4\"/><path d=\"M2 9v4\"/><path d=\"M6 9v4\"/></svg> 减速',
            sections: [
                { label: '类型', value: '控制效果（Debuff）' },
                { label: '效果', value: '敏捷-50%（降低闪避）' },
                { label: 'Boss效果', value: '全额生效（不减半）' },
                { label: '说明', value: '减速是软控制，不阻止行动但降低先手值，对Boss全额生效。' }
            ]
        },
        silence: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5\"/><path d=\"M8 12h.01\"/><path d=\"M12 12h.01\"/><path d=\"M16 12h.01\"/></svg> 沉默',
            sections: [
                { label: '类型', value: '控制效果' },
                { label: '效果', value: '无法使用技能' },
                { label: 'Boss效果', value: '持续-1回合' },
                { label: '说明', value: '沉默阻止敌人使用技能，但不阻止普攻。对依赖技能的敌人效果显著。' }
            ]
        },
        buff: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 增益效果',
            sections: [
                { label: '类型', value: 'Buff（正面状态）' },
                { label: '常见效果', value: '攻击提升、防御提升、暴击提升、速度提升、护盾、吸血等' },
                { label: '来源', value: '天赋、技能、物品、随机事件' },
                { label: '说明', value: '增益效果会临时提升角色能力，战斗结束后清除。' }
            ]
        },
        debuff: {
            title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>️ 减益效果',
            sections: [
                { label: '类型', value: 'Debuff（负面状态）' },
                { label: '常见效果', value: '攻击降低、防御降低、暴击降低、速度降低等' },
                { label: '来源', value: '敌人技能、天赋、环境法则' },
                { label: '说明', value: '减益效果会临时降低角色能力，战斗结束后清除。' }
            ]
        }
    },
    
    // 显示Tooltip
    showTooltip(dataKey, event) {
        const tooltipBox = document.getElementById('tooltipBox');
        const data = this.tooltipData[dataKey];
        if (!tooltipBox || !data) return;
        
        // 第二次点击同一个属性：关闭tooltip
        if (this.currentTooltipKey === dataKey && tooltipBox.classList.contains('show')) {
            this.hideTooltip();
            return;
        }
        
        // 构建HTML内容
        let html = '<div class="tooltip-title">' + data.title + '</div>';
        if (data.sections) {
            data.sections.forEach(section => {
                html += '<div class="tooltip-section">';
                html += '<div class="tooltip-label">' + section.label + '</div>';
                html += '<div class="tooltip-value">' + section.value + '</div>';
                html += '</div>';
            });
        }
        if (data.desc) {
            html += '<div class="tooltip-desc">' + data.desc + '</div>';
        }
        tooltipBox.innerHTML = html;
        tooltipBox.classList.add('show');
        this.currentTooltipKey = dataKey;
        
        // 定位Tooltip（避免超出屏幕）
        const rect = event ? event.target.getBoundingClientRect() : { top: 100, left: 100, width: 0 };
        const tooltipRect = tooltipBox.getBoundingClientRect();
        let top = rect.top + rect.height + 8;
        let left = rect.left;
        
        // 防止超出右边界
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        // 防止超出下边界，显示在上方
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = rect.top - tooltipRect.height - 8;
        }
        // 防止超出左边界
        if (left < 10) left = 10;
        if (top < 10) top = 10;
        
        tooltipBox.style.top = top + 'px';
        tooltipBox.style.left = left + 'px';
    },
    
    // 隐藏Tooltip
    hideTooltip() {
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) {
            tooltipBox.classList.remove('show');
        }
        this.currentTooltipKey = null;
    },
    
    // 显示天赋Tooltip
    showTalentTooltip(talentId, event) {
        const talent = this.data.talents.talents.find(t => t.id === talentId);
        if (!talent) return;
        
        const qualityNames = ['', '普通', '稀有', '史诗', '传说', '神话'];
        const qualityColors = ['', 'var(--quality-common)', 'var(--accent-info)', 'var(--accent-purple)', 'var(--accent-warning)', 'var(--accent-orange)'];
        const typeNames = {1: '防御系', 2: '控制/辅助系', 3: '攻击系', passive: '纯被动', passive_active: '被动+主动技能', 'undefined': '融合类', 'null': '融合类'};
        
        const isUnlocked = this.permanent.unlockedTalents.includes(talentId);
        const lv = this.getTalentLevel(talentId);
        const maxLv = talent.maxLevel || 5;
        
        // 获取当前等级效果
        let effectText = '';
        if (isUnlocked) {
            const eff = this.getTalentEffect(talentId);
            effectText = eff ? eff.passive : '';
        } else if (talent.effects && talent.effects.length > 0) {
            effectText = talent.effects[0].passive || '';
        }
        
        // 解锁条件
        const cost = talent.unlockCost || {fragQuality: talent.quality, fragCount: 10};
        const talentTag = (talent.tags && talent.tags.length > 0) ? talent.tags[0] : 1;
        const tagFragCount = this.getTagFragmentCount(talentTag, cost.fragQuality);
        const tagName = this.tagNames[talentTag] || ('标签'+talentTag);
        const universalFragCount = this.permanent.universalFragments[cost.fragQuality] || 0;
        let unlockText = `${cost.fragCount}个【${tagName}】${qualityNames[cost.fragQuality]}碎片`;
        unlockText += `<br><span style="font-size:11px;color:var(--text-muted)">专属：${tagFragCount} + 万能：${universalFragCount} = ${tagFragCount + universalFragCount}</span>`;
        if (cost.bossCore) {
            unlockText += ` + 1个对应Boss核心`;
        }
        
        // 进化路线
        let advanceText = '';
        if (talent.advanceTo) {
            const nextTalent = this.data.talents.talents.find(t => t.id === talent.advanceTo);
            if (nextTalent) {
                advanceText = `可进化为：${nextTalent.name}（${qualityNames[nextTalent.quality]}）`;
            }
        }
        
        // 融合配方
        let fusionText = '';
        if (talent.isFusion && talent.fusionRecipe) {
            const recipeNames = talent.fusionRecipe.map(id => {
                const t = this.data.talents.talents.find(x => x.id === id);
                return t ? t.name : id;
            }).join(' + ');
            fusionText = `融合配方：${recipeNames}（均需Lv.5）`;
        }
        
        const html = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <div class="tooltip-title" style="color:${qualityColors[talent.quality]};margin:0">${talent.name}</div>
                <span onclick="game.hideTooltip()" style="cursor:pointer;color:var(--text-muted);font-size:16px;padding:0 4px;line-height:1" title="关闭"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg></span>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">品质</div>
                <div class="tooltip-value">${qualityNames[talent.quality]}</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">类型</div>
                <div class="tooltip-value">${typeNames[talent.type] || talent.type}</div>
            </div>
            ${isUnlocked ? `
            <div class="tooltip-section">
                <div class="tooltip-label">等级</div>
                <div class="tooltip-value">Lv.${lv}/${maxLv}</div>
            </div>
            ` : ''}
            <div class="tooltip-section">
                <div class="tooltip-label">效果</div>
                <div class="tooltip-value" style="font-size:12px">${effectText || '暂无效果描述'}</div>
            </div>
            ${!isUnlocked ? `
            <div class="tooltip-section">
                <div class="tooltip-label">解锁条件</div>
                <div class="tooltip-value">${unlockText}</div>
            </div>
            ` : ''}
            ${advanceText ? `
            <div class="tooltip-section">
                <div class="tooltip-label">进化路线</div>
                <div class="tooltip-value" style="font-size:12px">${advanceText}</div>
            </div>
            ` : ''}
            ${fusionText ? `
            <div class="tooltip-section">
                <div class="tooltip-label">融合配方</div>
                <div class="tooltip-value" style="font-size:12px">${fusionText}</div>
            </div>
            ` : ''}
        `;
        
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) {
            tooltipBox.innerHTML = html;
            tooltipBox.classList.add('show');
            // 定位
            const rect = event ? event.target.getBoundingClientRect() : {top: 100, left: 100, height: 0};
            const tooltipRect = tooltipBox.getBoundingClientRect();
            let top = rect.top + rect.height + 8;
            let left = rect.left;
            if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
            if (top + tooltipRect.height > window.innerHeight - 10) top = rect.top - tooltipRect.height - 8;
            if (left < 10) left = 10;
            if (top < 10) top = 10;
            tooltipBox.style.top = top + 'px';
            tooltipBox.style.left = left + 'px';
        }
    },
    
    // 显示技能Tooltip
    showSkillTooltip(skillId, event) {
        const skill = this.skillTable[skillId];
        if (!skill) return;
        
        const costText = skill.cost ? `${skill.cost}能量` : '无消耗';
        const cooldownText = skill.cooldown ? `${skill.cooldown}回合` : '无冷却';
        const targetText = skill.target === 'self' ? '自身' : '敌方单体';
        
        // 效果描述
        let effectsText = skill.desc || '';
        if (skill.effects && skill.effects.length > 0) {
            effectsText = skill.effects.map(e => {
                if (e.type === 'damage') return `造成${e.multiplier * 100}%攻击力伤害`;
                if (e.type === 'heal') return `恢复${e.percent * 100}%最大生命`;
                if (e.type === 'dot') return `施加${e.stacks}层${e.dotType}（${e.duration}回合）`;
                if (e.type === 'control') return `${e.chance * 100}%概率${e.controlType}（${e.duration}回合）`;
                if (e.type === 'buff') return `${e.stat}+${e.value}%（${e.duration}回合）`;
                if (e.type === 'debuff') return `${e.stat}-${e.value}%（${e.duration}回合）`;
                if (e.type === 'dot_explosion') return `立即结算Dot伤害×${e.multiplier}`;
                if (e.type === 'dot_double') return `${e.dotType}层数翻倍`;
                if (e.type === 'dot_damage') return `造成Dot层数×${e.multiplier}直接伤害`;
                return e.type;
            }).join('，');
        }
        
        const html = `
            <div class="tooltip-title">${skill.name}</div>
            <div class="tooltip-section">
                <div class="tooltip-label">消耗</div>
                <div class="tooltip-value">${costText}</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">冷却</div>
                <div class="tooltip-value">${cooldownText}</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">目标</div>
                <div class="tooltip-value">${targetText}</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">效果</div>
                <div class="tooltip-value" style="font-size:12px">${effectsText}</div>
            </div>
        `;
        
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) {
            tooltipBox.innerHTML = html;
            tooltipBox.classList.add('show');
            const rect = event ? event.target.getBoundingClientRect() : {top: 100, left: 100, height: 0};
            const tooltipRect = tooltipBox.getBoundingClientRect();
            let top = rect.top + rect.height + 8;
            let left = rect.left;
            if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
            if (top + tooltipRect.height > window.innerHeight - 10) top = rect.top - tooltipRect.height - 8;
            if (left < 10) left = 10;
            if (top < 10) top = 10;
            tooltipBox.style.top = top + 'px';
            tooltipBox.style.left = left + 'px';
        }
    },
    
    // 显示商品Tooltip
    showItemTooltip(itemId, event) {
        const item = this.data.shop.consumables.find(i => i.id === itemId);
        if (!item) return;
        
        // 根据effect.type生成具体效果描述
        let effectDetail = '';
        if (item.effect) {
            const eff = item.effect;
            if (eff.type === 'heal_percent') {
                effectDetail = `恢复${eff.value}%最大生命`;
            } else if (eff.type === 'full_restore') {
                effectDetail = '完全恢复生命和能量';
            } else if (eff.type === 'energy_percent') {
                effectDetail = `恢复${eff.value}%最大能量`;
            } else if (eff.type === 'buff') {
                effectDetail = `${eff.stat || '属性'}+${eff.value || 0}%，持续${eff.duration || 3}回合`;
            } else if (eff.type === 'damage') {
                effectDetail = `造成${eff.value || 0}点伤害`;
            } else if (eff.type === 'gold') {
                effectDetail = `获得${eff.value || 0}基因精华`;
            } else if (eff.type === 'fragments') {
                effectDetail = `获得${eff.value || 0}个${eff.quality || '普通'}碎片`;
            } else {
                effectDetail = eff.type || '特殊效果';
            }
        }
        
        const categoryNames = {heal:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M7 20h10\"/><path d=\"M10 20c5.5-2.5.8-6.4 3-10\"/><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\"/><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\"/></svg> 生命恢复', energy:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 能量恢复', buff:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M18 3a3 3 0 0 0-3 3v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 0-6 0v9a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6V8a3 3 0 0 1 3-3 3 3 0 0 0-3-3z\"/></svg> 属性强化', resource:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/></svg> 资源包', special:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 特殊道具'};
        
        const html = `
            <div class="tooltip-title">${item.icon || '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/></svg>'} ${item.name}</div>
            <div class="tooltip-section">
                <div class="tooltip-label">类别</div>
                <div class="tooltip-value">${categoryNames[item.category] || item.category || '消耗品'}</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">价格</div>
                <div class="tooltip-value">${item.price ? item.price.amount : 10} 基因精华</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">具体效果</div>
                <div class="tooltip-value" style="font-size:12px;color:var(--accent-success);font-weight:bold">${effectDetail || '暂无'}</div>
            </div>
            <div class="tooltip-section">
                <div class="tooltip-label">描述</div>
                <div class="tooltip-value" style="font-size:12px;color:var(--text-secondary)">${item.description || item.desc || '暂无描述'}</div>
            </div>
            ${item.limitPerRun ? `
            <div class="tooltip-section">
                <div class="tooltip-label">限购</div>
                <div class="tooltip-value">每局${item.limitPerRun}次</div>
            </div>
            ` : ''}
        `;
        
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) {
            tooltipBox.innerHTML = html;
            tooltipBox.classList.add('show');
            const rect = event ? event.target.getBoundingClientRect() : {top: 100, left: 100, height: 0};
            const tooltipRect = tooltipBox.getBoundingClientRect();
            let top = rect.top + rect.height + 8;
            let left = rect.left;
            if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
            if (top + tooltipRect.height > window.innerHeight - 10) top = rect.top - tooltipRect.height - 8;
            if (left < 10) left = 10;
            if (top < 10) top = 10;
            tooltipBox.style.top = top + 'px';
            tooltipBox.style.left = left + 'px';
        }
    },
    
    // 通用：给容器内的物品元素绑定Tooltip事件
    bindItemTooltips(container) {
        if (!container) return;
        const self = this;
        
        // 天赋Tooltip
        container.querySelectorAll('[data-talent-id]').forEach(el => {
            const id = el.getAttribute('data-talent-id');
            el.style.cursor = 'pointer';
            el.style.borderBottom = '1px dashed rgba(255,255,255,0.3)';
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                self.showTalentTooltip(id, e);
            });
            el.addEventListener('mouseenter', function(e) {
                self.showTalentTooltip(id, e);
            });
            el.addEventListener('mouseleave', function() {
                self.hideTooltip();
            });
        });
        
        // 技能Tooltip
        container.querySelectorAll('[data-skill-id]').forEach(el => {
            const id = el.getAttribute('data-skill-id');
            el.style.cursor = 'pointer';
            el.style.borderBottom = '1px dashed rgba(255,255,255,0.3)';
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                self.showSkillTooltip(id, e);
            });
            el.addEventListener('mouseenter', function(e) {
                self.showSkillTooltip(id, e);
            });
            el.addEventListener('mouseleave', function() {
                self.hideTooltip();
            });
        });
        
        // 商品Tooltip
        container.querySelectorAll('[data-item-id]').forEach(el => {
            const id = el.getAttribute('data-item-id');
            el.style.cursor = 'pointer';
            el.style.borderBottom = '1px dashed rgba(255,255,255,0.3)';
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                self.showItemTooltip(id, e);
            });
            el.addEventListener('mouseenter', function(e) {
                self.showItemTooltip(id, e);
            });
            el.addEventListener('mouseleave', function() {
                self.hideTooltip();
            });
        });
    },
    
    // 初始化Tooltip事件绑定
    initTooltips() {
        const self = this;
        // 点击空白处隐藏Tooltip（除了点击天赋/技能/商品名称本身）
        document.addEventListener('click', function(e) {
            if (!e.target.closest('[data-talent-id]') && 
                !e.target.closest('[data-skill-id]') && 
                !e.target.closest('[data-item-id]') &&
                !e.target.closest('.tooltip-trigger') && 
                !e.target.closest('.top-bar-item') && 
                !e.target.closest('.stat-row') &&
                !e.target.closest('.status-tag') &&
                !e.target.closest('.tooltip-box')) {
                self.hideTooltip();
            }
        });
        // ESC键关闭Tooltip
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                self.hideTooltip();
            }
        });
        // 滚动时隐藏Tooltip
        window.addEventListener('scroll', function() {
            self.hideTooltip();
        });
    },
    
    // 更多功能展开/收起
    toggleMoreFunctions() {
        const area = document.getElementById('moreFunctionsArea');
        const arrow = document.getElementById('moreFunctionsArrow');
        if (area && arrow) {
            if (area.classList.contains('show')) {
                area.classList.remove('show');
                area.style.display = 'none';
                arrow.textContent = '▼';
            } else {
                area.classList.add('show');
                area.style.display = 'block';
                arrow.textContent = '▲';
            }
        }
    },
    
    openInRunTalentPanel() {
        const allTalents = this.data.talents.talents || this.data.talents || [];
        const unlocked = this.permanent.unlockedTalents || [];
        const equipped = this.player.equippedTalents || [];
        const passiveSlots = this.getPassiveSlots();
        
        if (!this.inRunTalentFilter) this.inRunTalentFilter = { quality: 'all', tag: 'all', showOnlyUnlockable: false, hidden: {}, searchKeyword: '' };
        const filter = this.inRunTalentFilter;
        
        const talentList = allTalents.map(t => {
            const isUnlocked = unlocked.includes(t.id);
            const isEquipped = equipped.includes(t.id);
            const lv = isUnlocked ? (this.permanent.talentLevels && this.permanent.talentLevels[t.id] ? this.permanent.talentLevels[t.id] : 1) : 0;
            const maxLv = t.maxLevel || 5;
            const cost = t.unlockCost || {fragQuality: t.quality, fragCount: 10};
            // 确保talentTag是数字类型，避免字符串导致的bug
            const talentTag = (t.tags && t.tags.length > 0) ? parseInt(t.tags[0]) : 1;
            const fragQuality = parseInt(cost.fragQuality) || parseInt(t.quality) || 1;
            const fragCount = parseInt(cost.fragCount) || this.getTalentUnlockCost(fragQuality);
            const totalFrags = this.getTagFragmentCount(talentTag, fragQuality);
            const exclusiveFrags = this.permanent.tagFragments && this.permanent.tagFragments[talentTag] ? (this.permanent.tagFragments[talentTag][fragQuality] || 0) : 0;
            const universalFrags = this.permanent.universalFragments ? (this.permanent.universalFragments[fragQuality] || 0) : 0;
            const hasBossCore = !cost.bossCore || (this.permanent.bossCores && (this.permanent.bossCores[cost.bossCore] || 0) >= 1);
            // 和unlockTalent函数使用完全相同的判断逻辑
            const canUnlock = !isUnlocked && totalFrags >= fragCount && hasBossCore;
            
            let effectText = '';
            if (isUnlocked) {
                const eff = this.getTalentEffect(t.id);
                effectText = eff ? eff.passive : '';
            } else if (t.effects && t.effects.length > 0) {
                effectText = t.effects[0].passive || '';
            }
            
            return { ...t, isUnlocked, isEquipped, lv, maxLv, cost, talentTag, totalFrags, exclusiveFrags, universalFrags, canUnlock, effectText };
        });
        
        const self = this;
        let filtered = talentList.filter(t => {
            // 装备标签：只显示已解锁的天赋
            if (self.inRunTalentPanelTab === 'equip' && !t.isUnlocked) return false;
            if (filter.hidden[t.id]) return false;
            if (filter.quality !== 'all' && t.quality !== parseInt(filter.quality)) return false;
            if (filter.tag !== 'all' && (!t.tags || !t.tags.includes(parseInt(filter.tag)))) return false;
            // 只看可解锁（仅解锁标签有效）：只显示未解锁但碎片足够的天赋
            if (self.inRunTalentPanelTab === 'unlock' && filter.showOnlyUnlockable && !t.canUnlock) return false;
            // 搜索关键词过滤（匹配名称和效果描述）
            if (filter.searchKeyword && filter.searchKeyword.trim()) {
                const keyword = filter.searchKeyword.trim().toLowerCase();
                const nameMatch = t.name.toLowerCase().includes(keyword);
                const effectMatch = (t.effectText || '').toLowerCase().includes(keyword);
                if (!nameMatch && !effectMatch) return false;
            }
            return true;
        });
        
        filtered.sort((a, b) => {
            // 装备标签：已装备的优先，然后按品质排序
            if (self.inRunTalentPanelTab === 'equip') {
                if (a.isEquipped && !b.isEquipped) return -1;
                if (!a.isEquipped && b.isEquipped) return 1;
                return a.quality - b.quality;
            }
            // 解锁标签：只有当"只看可解锁"开启时，才优先显示可解锁的天赋
            if (filter.showOnlyUnlockable) {
                if (a.canUnlock && !b.canUnlock) return -1;
                if (!a.canUnlock && b.canUnlock) return 1;
            }
            // 已解锁的天赋优先
            if (a.isUnlocked && !b.isUnlocked) return -1;
            if (!a.isUnlocked && b.isUnlocked) return 1;
            // 按品质排序
            return a.quality - b.quality;
        });
        
        if (!this.inRunTalentPanelTab) this.inRunTalentPanelTab = 'equip';
        
        let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">';
        html += '<h3 style="margin:0;color:var(--accent-primary)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 局内天赋</h3>';
        html += '<button onclick="game.closePop()" style="padding:6px 12px;font-size:12px;background:var(--text-faint);color:var(--text-primary);border:none;border-radius:4px;cursor:pointer">关闭</button>';
        html += '</div>';
        
        // 标签切换：装备界面 / 解锁界面（装备在前）
        html += '<div style="display:flex;gap:6px;margin-bottom:10px">';
        html += '<button onclick="game.setInRunTalentPanelTab(\'equip\')" style="flex:1;padding:8px;font-size:12px;font-weight:bold;border-radius:6px;border:none;cursor:pointer;' + (this.inRunTalentPanelTab==='equip' ? 'background:var(--accent-primary);color:var(--text-primary)' : 'background:var(--bg-card);color:var(--text-muted)') + '"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 装备</button>';
        html += '<button onclick="game.setInRunTalentPanelTab(\'unlock\')" style="flex:1;padding:8px;font-size:12px;font-weight:bold;border-radius:6px;border:none;cursor:pointer;' + (this.inRunTalentPanelTab==='unlock' ? 'background:var(--accent-primary);color:var(--text-primary)' : 'background:var(--bg-card);color:var(--text-muted)') + '"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"/></svg> 解锁</button>';
        html += '</div>';
        
        // 碎片数量显示（按品质+体系分类）
        html += '<div style="margin-bottom:12px;padding:10px;background:rgba(0,40,30,0.6);border-radius:8px;border:1px solid rgba(0,229,176,0.2)">';
        html += '<div style="color:var(--text-muted);font-size:11px;margin-bottom:6px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg> 当前碎片（点击品质查看体系详情）</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
        for (let q=1; q<=5; q++) {
            let exclusiveQ = 0;
            let universalQ = this.permanent.universalFragments ? (this.permanent.universalFragments[q] || 0) : 0;
            let tagDetails = [];
            if (this.permanent.tagFragments) {
                for (let tag in this.permanent.tagFragments) {
                    const count = this.permanent.tagFragments[tag][q] || 0;
                    if (count > 0) {
                        exclusiveQ += count;
                        tagDetails.push((this.tagNames[tag] || ('标签'+tag)) + ':' + count);
                    }
                }
            }
            let totalQ = exclusiveQ + universalQ;
            const detailTip = this.qualityNames[q] + '碎片详情：\n专属碎片（' + exclusiveQ + '个）：\n' + (tagDetails.length > 0 ? tagDetails.join('\n') : '无') + '\n万能碎片：' + universalQ + '个';
            html += '<span onmouseover="game.showTooltip(event,\'' + detailTip.replace(/\n/g, '\\n') + '\')" onmouseout="game.hideTooltip()" style="font-size:12px;color:' + this.qualityColors[q] + ';cursor:help">' + this.qualityNames[q] + '：' + totalQ + '<span style="font-size:10px;opacity:0.7">（专' + exclusiveQ + '+万' + universalQ + '）</span></span>';
        }
        html += '</div>';
        html += '<div style="margin-top:6px;font-size:10px;color:var(--text-faint)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 鼠标悬浮在品质上查看各体系专属碎片数量；专属碎片只能用于对应体系，万能碎片可用于任意体系</div>';
        html += '</div>';
        
        html += '<div style="margin-bottom:12px;padding:10px;background:rgba(0,30,25,0.5);border-radius:8px;border:1px solid rgba(0,229,176,0.15)">';
        html += '<div style="margin-bottom:8px"><span style="color:var(--text-muted);font-size:12px;margin-right:8px">品质：</span>';
        const qFilters = [{v:'all',n:'全部'},{v:'1',n:'普通'},{v:'2',n:'稀有'},{v:'3',n:'史诗'},{v:'4',n:'传说'},{v:'5',n:'神话'}];
        qFilters.forEach(qf => {
            const active = filter.quality === qf.v;
            // 计算该品质的碎片总数
            let qTotal = 0, qExclusive = 0, qUniversal = this.permanent.universalFragments ? (this.permanent.universalFragments[parseInt(qf.v)] || 0) : 0;
            if (qf.v !== 'all' && this.permanent.tagFragments) {
                for (let tag in this.permanent.tagFragments) {
                    qExclusive += (this.permanent.tagFragments[tag][parseInt(qf.v)] || 0);
                }
            }
            qTotal = qExclusive + qUniversal;
            const fragTip = qf.v === 'all' ? '全部品质' : `${this.qualityNames[parseInt(qf.v)]}碎片：${qTotal}个（专属${qExclusive}+万能${qUniversal}）`;
            html += `<button onclick="game.setInRunTalentFilter('quality','${qf.v}')" onmouseover="game.showTooltip(event,'${fragTip}')" onmouseout="game.hideTooltip()" style="font-size:11px;padding:4px 10px;margin-right:4px;margin-bottom:4px;border-radius:4px;cursor:help;${active?'background:var(--accent-primary);color:var(--text-primary);font-weight:bold':'background:var(--text-faint);color:var(--text-secondary)'}">${qf.n}${qf.v!=='all'?` <span style="font-size:9px;opacity:0.8">(${qTotal})</span>`:''}</button>`;
        });
        html += '</div>';
        
        html += '<div style="margin-bottom:8px"><span style="color:var(--text-muted);font-size:12px;margin-right:8px">体系：</span>';
        html += `<button onclick="game.setInRunTalentFilter('tag','all')" style="font-size:11px;padding:4px 10px;margin-right:4px;margin-bottom:4px;border-radius:4px;${filter.tag==='all'?'background:var(--accent-primary);color:var(--text-primary);font-weight:bold':'background:var(--text-faint);color:var(--text-secondary)'}">全部</button>`;
        // 体系标签默认显示一行，可折叠展开
        const inrunAllTags = [];
        for (let tagId in this.tagNames) {
            const count = talentList.filter(t => t.tags && t.tags.includes(parseInt(tagId))).length;
            if (count > 0) {
                inrunAllTags.push({tagId, count});
            }
        }
        const showAllInrunTags = this.showAllInrunTalentTags || false;
        const visibleInrunTags = showAllInrunTags ? inrunAllTags : inrunAllTags.slice(0, 6);
        visibleInrunTags.forEach(item => {
            const active = filter.tag === item.tagId;
            html += `<button onclick="game.setInRunTalentFilter('tag','${item.tagId}')" style="font-size:11px;padding:4px 10px;margin-right:4px;margin-bottom:4px;border-radius:4px;${active?'background:var(--accent-primary);color:var(--text-primary);font-weight:bold':'background:var(--text-faint);color:var(--text-secondary)'}">${this.tagNames[item.tagId]}(${item.count})</button>`;
        });
        if (inrunAllTags.length > 6) {
            html += `<button onclick="game.toggleInrunTalentTagExpand()" style="font-size:11px;padding:4px 10px;margin-right:4px;margin-bottom:4px;border-radius:4px;background:var(--text-faint);color:var(--text-muted)">${showAllInrunTags?'收起 ▲':'展开 ▼ (' + (inrunAllTags.length - 6) + ')'}</button>`;
        }
        html += '</div>';
        
        html += '<div>';
        html += `<button onclick="game.setInRunTalentFilter('showOnlyUnlockable',${!filter.showOnlyUnlockable})" style="font-size:11px;padding:4px 12px;margin-right:8px;border-radius:4px;${filter.showOnlyUnlockable?'background:var(--accent-warning);color:var(--text-primary);font-weight:bold':'background:var(--text-faint);color:var(--text-secondary)'}"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 只看可解锁</button>`;
        html += `<span style="color:var(--text-faint);font-size:11px">共${filtered.length}个天赋</span>`;
        html += '</div>';
        // 搜索框
        html += '<div style="margin-top:8px">';
        html += `<div style="display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.3);border:1px solid var(--text-faint);border-radius:4px;padding:0 8px">
            <span style="color:var(--text-muted);flex-shrink:0">${this.getIcon('search', 14)}</span>
            <input type="text" id="inRunTalentSearchInput" placeholder="搜索天赋名称或效果..." value="${filter.searchKeyword || ''}" style="flex:1;padding:6px 0;font-size:12px;background:transparent;color:var(--text-primary);border:none;outline:none;box-sizing:border-box" oninput="game.setInRunTalentSearch(this.value)">
        </div>`;
        if (filter.searchKeyword) {
            html += `<div style="margin-top:4px;font-size:10px;color:var(--text-muted)">搜索关键词："${filter.searchKeyword}" <button onclick="game.clearInRunTalentSearch()" style="font-size:9px;padding:1px 6px;margin-left:6px">清除</button></div>`;
        }
        html += '</div></div>';
        
        html += '<div class="scroll-area" style="max-height:calc(100vh - 300px);padding-right:4px;padding-bottom:40px">';
        if (filtered.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:30px">没有符合条件的天赋</div>';
        }
        filtered.forEach(t => {
            const tagName = this.tagNames[t.talentTag] || ('标签'+t.talentTag);
            const bossCoreText = t.cost.bossCore ? ' + Boss核心' : '';
            
            let tagHtml = '';
            if (t.tags && t.tags.length > 0) {
                t.tags.forEach(tagId => {
                    const tn = this.tagNames[tagId] || ('标签'+tagId);
                    tagHtml += `<span style="display:inline-block;font-size:10px;padding:1px 5px;margin-right:3px;background:rgba(13,71,161,0.5);color:var(--accent-info);border-radius:3px">${tn}</span>`;
                });
            }
            
            let actionBtn = '';
            if (!t.isUnlocked) {
                const fragInfo = t.exclusiveFrags > 0 && t.universalFrags > 0 
                    ? `专属${t.exclusiveFrags}+万能${t.universalFrags}`
                    : t.exclusiveFrags > 0 ? `专属${t.exclusiveFrags}` : `万能${t.universalFrags}`;
                actionBtn = `<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
                    <button onclick="game.unlockTalentAndRefreshInRun('${t.id}')" ${t.canUnlock?'':'disabled'} style="font-size:11px;padding:5px 10px;flex:1;min-width:100px;${!t.canUnlock?'opacity:0.7':''}">解锁(${t.cost.fragCount}${this.qualityNames[t.cost.fragQuality]}碎片)<br><span style="font-size:10px;${t.canUnlock?'color:var(--accent-success)':'color:var(--accent-danger)'}">拥有${fragInfo}${bossCoreText}</span>${!t.canUnlock?'<br><span style="font-size:9px;color:var(--accent-danger)">碎片不足</span>':''}</button>
                    <button onclick="game.hideTalentInRun('${t.id}')" style="font-size:10px;padding:4px 8px;background:var(--text-faint);color:var(--text-muted)" title="不再提醒">隐藏</button>
                </div>`;
            } else {
                let upgradeBtn = '';
                if (t.lv < t.maxLv) {
                    const levelCosts = t.levelCost || [2,3,5,8,12];
                    const pointCost = levelCosts[t.lv-1] || 2;
                    const fragCost = pointCost;
                    const upgradeTagFrags = this.getTagFragmentCount(t.talentTag, t.quality);
                    const canUpgrade = (this.permanent.talentPoints || 0) >= pointCost && upgradeTagFrags >= fragCost;
                    upgradeBtn = `<button onclick="game.upgradeTalentAndRefreshInRun('${t.id}')" ${canUpgrade?'':'disabled'} style="font-size:10px;padding:4px 8px">升级Lv.${t.lv+1}(${pointCost}点+${fragCost}碎片)</button>`;
                }
                if (t.isEquipped) {
                    actionBtn = `<div style="display:flex;gap:6px;flex-wrap:wrap">${upgradeBtn}<button onclick="game.unequipTalentAndRefreshInRun('${t.id}')" style="font-size:11px;padding:5px 10px;background:var(--accent-danger)">卸下</button></div>`;
                } else {
                    const canEquip = equipped.length < passiveSlots;
                    actionBtn = `<div style="display:flex;gap:6px;flex-wrap:wrap">${upgradeBtn}<button onclick="game.equipTalentAndRefreshInRun('${t.id}')" ${canEquip?'':'disabled'} style="font-size:11px;padding:5px 10px">装备</button></div>`;
                }
            }
            
            const canUnlockGlow = t.canUnlock ? 'box-shadow:0 0 12px rgba(0,229,176,0.4);border-color:var(--accent-primary);' : '';
            html += `<div class="talent-card quality-${t.quality}" style="${t.isEquipped?'box-shadow:0 0 15px rgba(100,255,150,0.3);border-color:var(--accent-success);':canUnlockGlow}margin-bottom:12px">
                <div>
                    <div class="talent-name" data-talent-id="${t.id}">${t.name}
                        <span style="font-size:10px;opacity:0.7">[${this.qualityNames[t.quality]}]</span>
                        ${t.isUnlocked ? `<span style="font-size:10px;color:var(--accent-warning)">Lv.${t.lv}/${t.maxLv}</span>` : ''}
                        ${t.isEquipped ? '<span style="font-size:9px;color:var(--accent-success)">[已装备]</span>' : ''}
                        ${t.canUnlock ? '<span style="font-size:9px;color:var(--accent-primary);margin-left:4px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg>可解锁</span>' : ''}
                    </div>
                    <div style="margin:4px 0">${tagHtml}</div>
                    <div class="talent-desc" style="font-size:11px">${t.effectText}</div>
                </div>
                <div style="margin-top:8px">${actionBtn}</div>
            </div>`;
        });
        html += `<div style="height:80px"></div>`;
        html += `</div>`;
        
        html += '<div style="display:flex;gap:8px;margin-top:12px">';
        html += `<button onclick="game.resetHiddenTalents()" style="flex:1;padding:8px;font-size:12px;background:var(--text-faint)">显示隐藏天赋</button>`;
        html += `<button onclick="game.closePop()" style="flex:1;padding:8px;font-size:12px">关闭</button>`;
        html += '</div>';
        
        this.showPopup(html);
    },
    
    setInRunTalentFilter(key, value) {
        if (!this.inRunTalentFilter) this.inRunTalentFilter = { quality: 'all', tag: 'all', showOnlyUnlockable: false, hidden: {}, searchKeyword: '' };
        if (key === 'showOnlyUnlockable') {
            this.inRunTalentFilter.showOnlyUnlockable = value;
        } else {
            this.inRunTalentFilter[key] = value;
        }
        this.openInRunTalentPanel();
    },

    // 展开/收起局内天赋体系标签
    toggleInrunTalentTagExpand() {
        this.showAllInrunTalentTags = !this.showAllInrunTalentTags;
        this.openInRunTalentPanel();
    },
    
    // 设置局内天赋搜索关键词
    setInRunTalentSearch(keyword) {
        if (!this.inRunTalentFilter) this.inRunTalentFilter = { quality: 'all', tag: 'all', showOnlyUnlockable: false, hidden: {}, searchKeyword: '' };
        this.inRunTalentFilter.searchKeyword = keyword;
        // 延迟刷新，避免每次输入都刷新
        clearTimeout(this._inRunTalentSearchTimer);
        this._inRunTalentSearchTimer = setTimeout(() => {
            this.openInRunTalentPanel();
            // 保持搜索框焦点
            setTimeout(() => {
                const input = document.getElementById('inRunTalentSearchInput');
                if (input) {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            }, 50);
        }, 300);
    },

    // 清除局内天赋搜索
    clearInRunTalentSearch() {
        if (this.inRunTalentFilter) this.inRunTalentFilter.searchKeyword = '';
        this.openInRunTalentPanel();
    },
    
    hideTalentInRun(tid) {
        if (!this.inRunTalentFilter) this.inRunTalentFilter = { quality: 'all', tag: 'all', showOnlyUnlockable: false, hidden: {}, searchKeyword: '' };
        this.inRunTalentFilter.hidden[tid] = true;
        this.openInRunTalentPanel();
    },
    
    resetHiddenTalents() {
        if (this.inRunTalentFilter) this.inRunTalentFilter.hidden = {};
        this.openInRunTalentPanel();
    },
    

    unlockTalentAndRefreshInRun(tid) {
        const r = this.unlockTalent(tid);
        if (r.success) this.appendBattleLog(r.msg);
        else if (r.msg) this.showGameAlert("提示", r.msg);
        this.calcDerivedStats();
        this.refreshMainUI();
        this.openInRunTalentPanel();
    },
    upgradeTalentAndRefreshInRun(tid) {
        const r = this.upgradeTalent(tid);
        if (r.success) this.appendBattleLog(r.msg);
        else if (r.msg) this.showGameAlert("提示", r.msg);
        this.calcDerivedStats();
        this.refreshMainUI();
        this.openInRunTalentPanel();
    },
    equipTalentAndRefreshInRun(tid) {
        const r = this.equipTalent(tid);
        if (r.success) this.appendBattleLog(r.msg);
        else if (r.msg) this.showGameAlert("提示", r.msg);
        this.calcDerivedStats();
        this.refreshMainUI();
        this.openInRunTalentPanel();
    },
    unequipTalentAndRefreshInRun(tid) {
        const r = this.unequipTalent(tid);
        if (r.success) this.appendBattleLog(r.msg);
        else if (r.msg) this.showGameAlert("提示", r.msg);
        this.calcDerivedStats();
        this.refreshMainUI();
        this.openInRunTalentPanel();
    },

    openTalentPanel() {
        this.closePop();
        // 确保talentPanelTab有默认值
        if (!this.talentPanelTab) this.talentPanelTab = 'unlock';
        const all = this.data.talents.talents;
        if (!all) return;
        const unlocked = this.permanent.unlockedTalents;
        const equipped = this.player.equippedTalents;
        const passiveSlots = this.getPassiveSlots();

        let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
        html += '<h3 style="margin:0"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 天赋系统</h3>';
        html += '<button onclick="' + (this.merchantMode ? 'game.leaveMerchant()' : 'game.goBack()') + '" style="padding:8px 16px;font-size:13px;background:var(--accent-success);color:white;border-radius:6px">← 返回</button>';
        html += '</div>';
        
        // 筛选栏固定顶部（sticky）
        html += '<div style="position:sticky;top:0;z-index:10;background:var(--bg-primary);padding:8px 0;border-bottom:1px solid var(--border-secondary);margin-bottom:10px">';
        
        // 标签切换：解锁界面 / 装备界面
        html += '<div style="display:flex;gap:8px;margin-bottom:10px">';
        html += `<button onclick="game.setTalentPanelTab('unlock')" style="flex:1;padding:10px;font-size:14px;font-weight:bold;border-radius:8px;border:none;cursor:pointer;${this.talentPanelTab==='unlock'?'background:var(--accent-primary);color:var(--text-primary)':'background:var(--bg-card);color:var(--text-muted)'}"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"/></svg> 天赋解锁</button>`;
        html += `<button onclick="game.setTalentPanelTab('equip')" style="flex:1;padding:10px;font-size:14px;font-weight:bold;border-radius:8px;border:none;cursor:pointer;${this.talentPanelTab==='equip'?'background:var(--accent-primary);color:var(--text-primary)':'background:var(--bg-card);color:var(--text-muted)'}"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 装备管理</button>`;
        html += '</div>';
        // 资源显示
        html += `<div style="margin-bottom:10px;padding:10px;background:var(--bg-card);border-radius:8px;font-size:13px">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">`;
        html += `<span style="color:var(--accent-warning);font-weight:bold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 天赋点：${this.permanent.talentPoints || 0}</span>`;
        html += `</div>`;
        
        // 计算天赋槽扩充进度
        const totalSpent = Object.values(this.permanent.talentLevels || {}).reduce((sum, lv) => {
            const costs = [2, 4, 7, 11, 16];
            for (let i = 0; i < lv - 1; i++) sum += costs[i] || 2;
            return sum;
        }, 0);
        const essence = this.permanent.essence || 0;
        const talentSlotFromPoints = Math.floor(totalSpent / 20);
        const talentSlotFromEssence = Math.floor(essence / 50);
        const nextPointSlot = (talentSlotFromPoints + 1) * 20;
        const nextEssenceSlot = (talentSlotFromEssence + 1) * 50;
        
        // 天赋槽混合模式显示
        const passiveAuto = this.getPassiveSlotAutoProgress();
        const passiveManual = this.getPassiveSlotManualProgress();
        html += `<div style="margin-bottom:8px;padding:10px;background:var(--bg-secondary);border-radius:6px;border-left:3px solid var(--accent-success)">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">`;
        html += `<span style="color:var(--accent-success);font-weight:bold;font-size:13px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> 天赋槽（被动）：${equipped.length}/${passiveSlots}</span>`;
        html += `<span style="color:var(--text-faint);font-size:11px">初始4 + 自动${passiveAuto.autoSlots} + 手动${passiveManual.manualSlots}</span>`;
        html += `</div>`;
        html += `<div style="font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:8px">`;
        if (passiveAuto.isMaxAuto) {
            html += `<div style="color:var(--accent-success)">自动扩充：已达上限（${passiveAuto.autoSlots}/${passiveAuto.maxAutoSlots}）</div>`;
        } else {
            html += `<div>自动扩充：已花天赋点${passiveAuto.totalSpent} / ${passiveAuto.nextAutoSlot}（再花${passiveAuto.remainingToNext}点+1槽，上限${passiveAuto.maxAutoSlots}）</div>`;
        }
        html += `</div>`;
        // 手动扩充按钮
        if (passiveManual.isMaxManual) {
            html += `<div style="text-align:center;padding:6px;background:var(--bg-primary);border-radius:4px;font-size:11px;color:var(--text-faint)">手动扩充已达上限（${passiveManual.manualSlots}/${passiveManual.maxManualSlots}）</div>`;
        } else {
            html += `<button onclick="game.expandPassiveSlot();game.openTalentPanel();" style="width:100%;padding:8px;font-size:12px;background:${passiveManual.canAfford ? 'var(--accent-success)' : 'var(--text-faint)'};color:white;border:none;border-radius:4px;cursor:${passiveManual.canAfford ? 'pointer' : 'not-allowed'};font-weight:bold">`;
            html += `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 手动扩充（消耗${passiveManual.cost}精粹，当前${passiveManual.essence}）</button>`;
        }
        html += `</div>`;
        
        // 技能槽混合模式显示
        const activeSlots = this.getActiveSlots();
        const activeAuto = this.getActiveSlotAutoProgress();
        const activeManual = this.getActiveSlotManualProgress();
        html += `<div style="padding:10px;background:var(--bg-secondary);border-radius:6px;border-left:3px solid var(--accent-info)">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">`;
        html += `<span style="color:var(--accent-info);font-weight:bold;font-size:13px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> 技能槽（主动）：${activeSlots}/6</span>`;
        html += `<span style="color:var(--text-faint);font-size:11px">初始3 + 自动${activeAuto.autoSlots} + 手动${activeManual.manualSlots}</span>`;
        html += `</div>`;
        html += `<div style="font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:8px">`;
        if (activeAuto.isMaxAuto) {
            html += `<div style="color:var(--accent-success)">自动扩充：已达上限（${activeAuto.autoSlots}/${activeAuto.maxAutoSlots}）</div>`;
        } else {
            html += `<div>自动扩充：当前等级${activeAuto.level} / ${activeAuto.nextLevel}（再升${activeAuto.remainingToNext}级+1槽，上限${activeAuto.maxAutoSlots}）</div>`;
        }
        html += `<div style="color:var(--accent-warning);margin-top:2px">默认3个基础技能不占槽，始终可用</div>`;
        html += `</div>`;
        // 手动扩充按钮
        if (activeManual.isMaxManual) {
            html += `<div style="text-align:center;padding:6px;background:var(--bg-primary);border-radius:4px;font-size:11px;color:var(--text-faint)">手动扩充已达上限（${activeManual.manualSlots}/${activeManual.maxManualSlots}）</div>`;
        } else {
            html += `<button onclick="game.expandActiveSlot();game.openTalentPanel();" style="width:100%;padding:8px;font-size:12px;background:${activeManual.canAfford ? 'var(--accent-info)' : 'var(--text-faint)'};color:white;border:none;border-radius:4px;cursor:${activeManual.canAfford ? 'pointer' : 'not-allowed'};font-weight:bold">`;
            html += `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 手动扩充（消耗${activeManual.cost}精粹，当前${activeManual.essence}）</button>`;
        }
        html += `</div>`;
        
        html += `</div>`;
        
        // 已装备天赋快速管理区域
        html += `<div style="margin-bottom:12px;padding:10px;background:var(--bg-secondary);border-radius:8px;border-left:3px solid var(--accent-success)">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">`;
        html += `<span style="color:var(--accent-success);font-size:13px;font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 已装备天赋（${equipped.length}/${passiveSlots}）</span>`;
        html += `<span style="color:var(--text-faint);font-size:11px">点击天赋卡片上的"装备/卸下"按钮可快速更换</span>`;
        html += `</div>`;
        if (equipped.length === 0) {
            html += `<div style="text-align:center;color:var(--text-faint);font-size:12px;padding:10px">还没有装备任何天赋，在下方列表中点击"装备"按钮即可</div>`;
        } else {
            html += `<div style="display:flex;flex-wrap:wrap;gap:6px">`;
            equipped.forEach(tid => {
                const t = all.find(x => x.id === tid);
                if (!t) return;
                const lv = this.getTalentLevel(tid);
                html += `<div style="padding:6px 10px;background:var(--bg-primary);border:1px solid ${this.qualityColors[t.quality]};border-radius:6px;font-size:12px;display:flex;align-items:center;gap:6px">`;
                html += `<span style="color:${this.qualityColors[t.quality]};font-weight:bold">${t.name}</span>`;
                html += `<span style="color:var(--accent-warning);font-size:10px">Lv.${lv}</span>`;
                html += `<button onclick="game.unequipTalentAndRefresh('${tid}')" style="padding:2px 6px;font-size:10px;background:var(--accent-danger);color:white;border:none;border-radius:3px;cursor:pointer">卸下</button>`;
                html += `</div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
        // 碎片显示：universal碎片
        html += `<div style="margin-bottom:8px;font-size:12px">`;
        html += `<span style="color:var(--accent-warning);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 万能碎片：</span>`;
        for (let q=1; q<=5; q++) {
            const uf = this.permanent.universalFragments ? (this.permanent.universalFragments[q] || 0) : 0;
            html += `<span style="display:inline-block;margin-right:10px;color:${this.qualityColors[q]}">${this.qualityNames[q]}：${uf}</span>`;
        }
        html += `</div>`;
        html += `<p style="font-size:11px;color:var(--text-muted);margin-bottom:8px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 击败敌人掉落对应体系专属碎片，万能碎片可替代任意体系碎片</p>`;
        html += `<p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">有进化路线的天赋可消耗自身+高阶碎片进化为指定高阶天赋；已投入天赋点全额返还</p>`;
        html += `<div style="margin-bottom:10px;text-align:right"><button onclick="game.openFusionPanel()" style="font-size:13px;background:var(--accent-purple);color:white"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 天赋融合（双史诗Lv.5合成传说）</button></div>`;

        // 核心筛选栏固定顶部（sticky）：只包含标签切换、品质、体系、搜索
        html += '<div style="position:sticky;top:0;z-index:10;background:var(--bg-primary);padding:8px 0;border-bottom:1px solid var(--border-secondary);margin-bottom:10px">';
        
        // 筛选栏：品质 + 标签
        html += `<div style="margin-bottom:10px;padding:8px;background:var(--bg-secondary);border-radius:6px;font-size:12px">`;
        html += `<div style="margin-bottom:6px"><span style="color:var(--text-secondary);margin-right:8px">品质：</span>`;
        html += `<button onclick="game.setTalentFilter(0, game.talentFilter.tag)" style="margin:2px;padding:3px 8px;font-size:11px;${this.talentFilter.quality===0?'background:var(--accent-warning);color:var(--bg-card)':''}">全部</button>`;
        for (let q=1; q<=5; q++) {
            html += `<button onclick="game.setTalentFilter(${q}, game.talentFilter.tag)" style="margin:2px;padding:3px 8px;font-size:11px;color:${this.qualityColors[q]};${this.talentFilter.quality===q?'background:'+this.qualityColors[q]+';color:var(--bg-card)':''}">${this.qualityNames[q]}</button>`;
        }
        html += `</div>`;
        html += `<div><span style="color:var(--text-secondary);margin-right:8px">体系：</span>`;
        html += `<button onclick="game.setTalentFilter(game.talentFilter.quality, 0)" style="margin:2px;padding:3px 8px;font-size:11px;${this.talentFilter.tag===0?'background:var(--accent-warning);color:var(--bg-card)':''}">全部</button>`;
        // 体系标签默认显示一行，可折叠展开
        const allTags = Object.keys(this.tagNames).map(t => parseInt(t));
        const showAllTags = this.showAllTalentTags || false;
        const visibleTags = showAllTags ? allTags : allTags.slice(0, 8);
        visibleTags.forEach(tid => {
            html += `<button onclick="game.setTalentFilter(game.talentFilter.quality, ${tid})" style="margin:2px;padding:3px 8px;font-size:11px;${this.talentFilter.tag===tid?'background:var(--accent-info);color:var(--bg-card)':''}">${this.tagNames[tid]}</button>`;
        });
        if (allTags.length > 8) {
            html += `<button onclick="game.toggleTalentTagExpand()" style="margin:2px;padding:3px 8px;font-size:11px;background:var(--text-faint);color:var(--text-secondary)">${showAllTags?'收起 ▲':'展开 ▼ (' + (allTags.length - 8) + ')'}</button>`;
        }
        html += `</div></div>`;

        // 只看可解锁筛选按钮（非装备标签都显示）
        if (this.talentPanelTab !== 'equip') {
            html += `<div style="margin-bottom:10px;padding:8px;background:var(--bg-secondary);border-radius:6px;font-size:12px">`;
            html += `<button onclick="game.toggleShowOnlyUnlockable()" style="padding:4px 10px;font-size:11px;${this.talentFilter.showOnlyUnlockable?'background:var(--accent-success);color:var(--bg-card)':''}">只看可解锁</button>`;
            if (this.talentFilter.showOnlyUnlockable) {
                html += `<span style="margin-left:8px;color:var(--accent-success)">只显示碎片足够的未解锁天赋</span>`;
            }
            html += `</div>`;
        }
        
        // 搜索框
        html += `<div style="margin-bottom:10px;padding:8px;background:var(--bg-secondary);border-radius:6px">`;
        html += `<div style="display:flex;align-items:center;gap:8px;background:var(--bg-primary);border:1px solid var(--text-faint);border-radius:6px;padding:0 12px">
            <span style="color:var(--text-muted);flex-shrink:0">${this.getIcon('search', 16)}</span>
            <input type="text" id="talentSearchInput" placeholder="搜索天赋名称或效果..." value="${this.talentSearchKeyword || ''}" style="flex:1;padding:8px 0;font-size:13px;background:transparent;color:var(--text-primary);border:none;outline:none;box-sizing:border-box" oninput="game.setTalentSearch(this.value)">
        </div>`;
        if (this.talentSearchKeyword) {
            html += `<div style="margin-top:6px;font-size:11px;color:var(--text-muted)">搜索关键词："${this.talentSearchKeyword}" <button onclick="game.clearTalentSearch()" style="font-size:10px;padding:2px 8px;margin-left:8px">清除</button></div>`;
        }
        html += `</div>`;
        html += '</div>'; // 结束sticky核心筛选栏容器

        html += `<div class="talent-list-area">`;
        // 应用筛选
        let filtered = all.filter(t => {
            // 装备标签：只显示已解锁的天赋
            if (this.talentPanelTab === 'equip' && !unlocked.includes(t.id)) return false;
            if (this.talentFilter.quality > 0 && t.quality !== this.talentFilter.quality) return false;
            if (this.talentFilter.tag > 0 && !(t.tags || []).includes(this.talentFilter.tag)) return false;
            // 只看可解锁（仅解锁标签有效）：只显示未解锁但碎片足够的天赋
            const isUnlocked = unlocked.includes(t.id);
            const cost = t.unlockCost || {fragQuality: t.quality, fragCount: 10};
            const talentTag = (t.tags && t.tags.length > 0) ? parseInt(t.tags[0]) : 1;
            const canAfford = this.getTagFragmentCount(talentTag, cost.fragQuality) >= cost.fragCount;
            const canUnlock = !isUnlocked && canAfford;
            // 只要不是装备标签，且开启了"只看可解锁"，就应用筛选
            if (this.talentPanelTab !== 'equip' && this.talentFilter.showOnlyUnlockable && !canUnlock) return false;
            // 搜索关键词过滤（匹配名称和效果描述）
            if (this.talentSearchKeyword && this.talentSearchKeyword.trim()) {
                const keyword = this.talentSearchKeyword.trim().toLowerCase();
                const nameMatch = t.name.toLowerCase().includes(keyword);
                let effectMatch = false;
                if (t.effects && t.effects.length > 0) {
                    effectMatch = t.effects.some(e => (e.passive || '').toLowerCase().includes(keyword));
                }
                if (!nameMatch && !effectMatch) return false;
            }
            return true;
        });
        const sorted = [...filtered].sort((a,b)=>a.quality-b.quality);
        if (this.talentPanelTab === 'equip') {
            html += `<div style="font-size:11px;color:var(--accent-success);margin-bottom:6px">已解锁 ${filtered.length} 个天赋可装备，已装备 ${equipped.length}/${passiveSlots}</div>`;
        } else {
            html += `<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">共 ${filtered.length} 个天赋，已解锁 ${unlocked.length} 个</div>`;
        }
        sorted.forEach(t => {
            const isUnlocked = unlocked.includes(t.id);
            const isEquipped = equipped.includes(t.id);
            const lv = this.getTalentLevel(t.id);
            const maxLv = t.maxLevel || 5;
            const cost = t.unlockCost || {fragQuality: t.quality, fragCount: 10};
            const talentTag = (t.tags && t.tags.length > 0) ? t.tags[0] : 1;
            const canAfford = this.getTagFragmentCount(talentTag, cost.fragQuality) >= cost.fragCount;

            let effectText = '';
            if (isUnlocked) {
                const eff = this.getTalentEffect(t.id);
                effectText = eff ? eff.passive : '';
            } else if (t.effects && t.effects.length > 0) {
                effectText = t.effects[0].passive || '';
            }
            // 标签显示
            let tagHtml = '';
            if (t.tags && t.tags.length > 0) {
                t.tags.forEach(tagId => {
                    const tagName = this.tagNames[tagId] || ('标签'+tagId);
                    tagHtml += `<span style="display:inline-block;font-size:10px;padding:1px 5px;margin-right:3px;background:var(--accent-info);color:var(--accent-info);border-radius:3px">${tagName}</span>`;
                });
            }

            // 升级按钮
            let upgradeBtn = '';
            if (isUnlocked && lv < maxLv) {
                const levelCosts = t.levelCost || [2,3,5,8,12];
                const pointCost = levelCosts[lv-1] || 2;
                const fragCost = pointCost;
                const canUpgrade = (this.permanent.talentPoints || 0) >= pointCost && (this.permanent.universalFragments[t.quality] || 0) >= fragCost;
                upgradeBtn = `<button onclick="game.upgradeTalentAndRefresh('${t.id}')" ${canUpgrade?'':'disabled'} style="font-size:11px;margin-top:4px">升级Lv.${lv+1}(${pointCost}点+${fragCost}碎片)</button>`;
            } else if (isUnlocked && lv >= maxLv) {
                upgradeBtn = '<span style="color:var(--accent-warning);font-size:11px">已满级</span>';
            }

            // 操作按钮：解锁/进化/装备/卸下
            let actionBtn = '';
            if (!isUnlocked) {
                const talentTag2 = (t.tags && t.tags.length > 0) ? t.tags[0] : 1;
                const tagFragCount = this.getTagFragmentCount(talentTag2, cost.fragQuality);
                const tagName = this.tagNames[talentTag2] || ('标签'+talentTag2);
                actionBtn = `<button onclick="game.unlockTalentAndRefresh('${t.id}')" ${canAfford?'':'disabled'} style="font-size:12px">解锁(${cost.fragCount}【${tagName}】${this.qualityNames[cost.fragQuality]}碎片，拥有${tagFragCount})</button>`;
            } else {
                // 进化按钮
                let evolveBtn = '';
                if (t.advanceTo) {
                    const target = all.find(x => x.id === t.advanceTo);
                    if (target && !unlocked.includes(target.id)) {
                        const fragCost = this.talentEvolveCost[t.quality] || 10;
                        const canEvolve = (this.permanent.universalFragments[target.quality] || 0) >= fragCost;
                        evolveBtn = `<button onclick="game.evolveTalent('${t.id}')" ${canEvolve?'':'disabled'} style="font-size:11px;background:var(--accent-purple);color:white" title="进化为【${target.name}】，消耗${fragCost}个${this.qualityNames[target.quality]}碎片">进化→${target.name}</button>`;
                    }
                }
                if (isEquipped) {
                    actionBtn = `${evolveBtn}<button onclick="game.unequipTalentAndRefresh('${t.id}')" style="font-size:12px;background:var(--accent-danger);margin-left:4px">卸下</button>`;
                } else {
                    const canEquip = equipped.length < passiveSlots;
                    actionBtn = `${evolveBtn}<button onclick="game.equipTalentAndRefresh('${t.id}')" ${canEquip?'':'disabled'} style="font-size:12px;margin-left:4px">装备</button>`;
                }
            }

            html += `<div class="talent-card" style="${isEquipped?'border-color:var(--accent-success)':''}">
                <div>
                    <div class="talent-name quality-${t.quality}" data-talent-id="${t.id}">${t.name}
                        <span style="font-size:12px;color:var(--text-muted)">[${this.qualityNames[t.quality]}]</span>
                        ${isUnlocked ? `<span style="font-size:12px;color:var(--accent-warning)">Lv.${lv}/${maxLv}</span>` : ''}
                        ${isEquipped ? '<span style="font-size:11px;color:var(--accent-success)">[已装备]</span>' : ''}
                    </div>
                    <div class="talent-desc">${effectText}</div>
                    ${upgradeBtn}
                </div>
                <div>${actionBtn}</div>
            </div>`;
        });
        html += `<div style="height:120px"></div>`;
        html += `</div>`;
        // 渲染到独立页面
        const contentDiv = document.getElementById('talentScreenContent');
        if (contentDiv) {
            contentDiv.innerHTML = html;
            // 绑定天赋/技能/物品名称的Tooltip点击事件（手机端无hover，必须支持点击查看详情）
            setTimeout(() => this.bindItemTooltips(contentDiv), 50);
        }
        this.showScreen('talentScreen');
    },

    // 设置天赋筛选
    setTalentFilter(quality, tag) {
        const oldShowOnlyUnlockable = this.talentFilter ? (this.talentFilter.showOnlyUnlockable || false) : false;
        this.talentFilter = { quality: quality, tag: tag, showOnlyUnlockable: oldShowOnlyUnlockable };
        this.openTalentPanel();
    },
    
    // 切换"只看可解锁"筛选
    toggleShowOnlyUnlockable() {
        this.talentFilter.showOnlyUnlockable = !this.talentFilter.showOnlyUnlockable;
        this.openTalentPanel();
    },
    
    // 切换天赋面板标签（解锁/装备）
    setTalentPanelTab(tab) {
        this.talentPanelTab = tab;
        this.openTalentPanel();
    },
    
    // 切换局内天赋面板标签
    setInRunTalentPanelTab(tab) {
        this.inRunTalentPanelTab = tab;
        this.openInRunTalentPanel();
    },

    // 设置天赋搜索关键词
    setTalentSearch(keyword) {
        this.talentSearchKeyword = keyword;
        // 延迟刷新，避免每次输入都刷新
        clearTimeout(this._talentSearchTimer);
        this._talentSearchTimer = setTimeout(() => {
            this.openTalentPanel();
            // 保持搜索框焦点
            setTimeout(() => {
                const input = document.getElementById('talentSearchInput');
                if (input) {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            }, 50);
        }, 300);
    },

    // 清除天赋搜索
    clearTalentSearch() {
        this.talentSearchKeyword = '';
        this.openTalentPanel();
    },
    
    // 展开/收起天赋体系标签
    toggleTalentTagExpand() {
        this.showAllTalentTags = !this.showAllTalentTags;
        this.openTalentPanel();
    },

    toggleTalent(talentId) {
        const idx = this.player.equippedTalents.indexOf(talentId);
        if (idx >= 0) {
            this.player.equippedTalents.splice(idx, 1);
        } else {
            if (this.player.equippedTalents.length >= 4) { this.showGameAlert("提示", "最多装备4个天赋"); return; }
            this.player.equippedTalents.push(talentId);
        }
        this.calcDerivedStats();
        this.player.hp = Math.min(this.player.hp, this.player.maxHp);
        this.openTalentPanel();
        this.refreshMainUI();
    },

    // ========== 天赋系统核心函数 ==========
    // 获取天赋等级（未解锁返回0）
    getTalentLevel(talentId) {
        if (!this.permanent.talentLevels) this.permanent.talentLevels = {};
        return this.permanent.talentLevels[talentId] || 0;
    },

    // 获取天赋当前等级效果文本
    getTalentEffect(talentId) {
        const t = this.data.talents.talents.find(x => x.id === talentId);
        if (!t || !t.effects) return null;
        const lv = this.getTalentLevel(talentId);
        let eff = t.effects.find(e => e.level === lv);
        if (!eff) eff = t.effects[0];
        return eff;
    },

    // 获取天赋下一级效果文本（用于升级预览）
    getTalentNextEffect(talentId) {
        const t = this.data.talents.talents.find(x => x.id === talentId);
        if (!t || !t.effects) return null;
        const lv = this.getTalentLevel(talentId);
        const nextLv = Math.min(lv + 1, t.maxLevel || 5);
        return t.effects.find(e => e.level === nextLv) || null;
    },

    // 检查天赋是否已解锁
    isTalentUnlocked(talentId) {
        return this.permanent.unlockedTalents.includes(talentId);
    },


    // 升级天赋
    upgradeTalent(talentId) {
        const t = this.data.talents.talents.find(x => x.id === talentId);
        if (!t) return {success: false, msg: "天赋不存在"};
        if (!this.isTalentUnlocked(talentId)) return {success: false, msg: "未解锁"};

        const lv = this.getTalentLevel(talentId);
        const maxLv = t.maxLevel || 5;
        if (lv >= maxLv) return {success: false, msg: "已满级"};

        const levelCosts = t.levelCost || [2, 4, 7, 11, 16];
        const pointCost = levelCosts[lv - 1] || 2;
        // 碎片消耗：同品质碎片，数量=天赋点消耗
        const fragCost = pointCost;
        const fragQuality = t.quality || 1;

        // 检查天赋点
        if ((this.permanent.talentPoints || 0) < pointCost) {
            return {success: false, msg: "天赋点不足", needPoints: pointCost};
        }
        // 检查碎片（标签exclusive+universal）
        const talentTag = (t.tags && t.tags.length > 0) ? t.tags[0] : 1;
        if (this.getTagFragmentCount(talentTag, fragQuality) < fragCost) {
            return {success: false, msg: "碎片不足", need: {quality: fragQuality, count: fragCost}};
        }

        // 扣除，升级
        this.permanent.talentPoints -= pointCost;
        this.consumeFragments(talentTag, fragQuality, fragCost);
        this.permanent.talentLevels[talentId] = lv + 1;
        this.savePermanent();
        return {success: true, msg: t.name + " 升级到 Lv." + (lv + 1)};
    },

    // 进化精粹强化配置
    essenceUpgradeConfig: {
        strength: {name: '力量强化', desc: '基础力量+3%/级', maxLevel: 20, bonusPerLevel: 0.03},
        agility: {name: '敏捷强化', desc: '基础敏捷+3%/级', maxLevel: 20, bonusPerLevel: 0.03},
        vitality: {name: '体质强化', desc: '基础体质+3%/级', maxLevel: 20, bonusPerLevel: 0.03},
        perception: {name: '感知强化', desc: '基础感知+3%/级', maxLevel: 20, bonusPerLevel: 0.03},
        evolution: {name: '进化强化', desc: '基础进化+3%/级', maxLevel: 20, bonusPerLevel: 0.03},
        hp: {name: '生命强化', desc: '最大生命+2%/级', maxLevel: 30, bonusPerLevel: 0.02},
    },

    // 获取进化精粹强化消耗（递增）
    getEssenceUpgradeCost(stat, currentLevel) {
        return 10 * (currentLevel + 1);
    },

    // 重置进化精粹强化（全额返还）
    resetEssenceUpgrades() {
        const self = this;
        this.showGameConfirm('确认重置', '确定要重置所有进化精粹强化吗？将全额返还已消耗的进化精粹。', function() {
            const eu = self.permanent.essenceUpgrades || {};
            let totalRefund = 0;
            for (const stat in eu) {
                const lv = eu[stat] || 0;
                for (let i = 0; i < lv; i++) {
                    totalRefund += self.getEssenceUpgradeCost(stat, i);
                }
            }
            self.permanent.essence = (self.permanent.essence || 0) + totalRefund;
            self.permanent.essenceUpgrades = {strength:0, agility:0, vitality:0, perception:0, evolution:0, hp:0};
            self.savePermanent();
            self.refreshGrowthUI();
            self.appendBattleLog(`重置进化精粹强化，返还${totalRefund}点进化精粹`, 'log-info');
        });
    },

    // 进化精粹强化
    upgradeEssence(stat) {
        const config = this.essenceUpgradeConfig[stat];
        if (!config) { this.showGameAlert('提示', '未知强化项'); return; }
        if (!this.permanent.essenceUpgrades) this.permanent.essenceUpgrades = {};
        const currentLevel = this.permanent.essenceUpgrades[stat] || 0;
        if (currentLevel >= config.maxLevel) { this.showGameAlert('提示', '已达最高等级'); return; }
        const cost = this.getEssenceUpgradeCost(stat, currentLevel);
        if ((this.permanent.essence || 0) < cost) { this.showGameAlert("提示", `进化精粹不足，需要${cost}点，当前${this.permanent.essence || 0}点`); return; }
        this.permanent.essence -= cost;
        this.permanent.essenceUpgrades[stat] = currentLevel + 1;
        this.savePermanent();
        this.refreshGrowthUI();
        this.calcDerivedStats();
    },

    // 获取被动槽数量（混合模式：自动扩充 + 手动扩充）
    getPassiveSlots() {
        // 初始4个槽
        let slots = 4;
        // 自动扩充：每花20天赋点+1槽（最多自动+3槽）
        const totalSpent = Object.values(this.permanent.talentLevels || {}).reduce((sum, lv) => {
            const costs = [2, 4, 7, 11, 16];
            for (let i = 0; i < lv - 1; i++) sum += costs[i] || 2;
            return sum;
        }, 0);
        const autoFromPoints = Math.min(3, Math.floor(totalSpent / 20));
        slots += autoFromPoints;
        // 手动扩充：消耗50精粹+1槽（最多手动+3槽）
        const manualSlots = this.permanent.manualPassiveSlots || 0;
        slots += Math.min(3, manualSlots);
        return slots;
    },
    
    // 获取天赋槽自动扩充进度
    getPassiveSlotAutoProgress() {
        const totalSpent = Object.values(this.permanent.talentLevels || {}).reduce((sum, lv) => {
            const costs = [2, 4, 7, 11, 16];
            for (let i = 0; i < lv - 1; i++) sum += costs[i] || 2;
            return sum;
        }, 0);
        const autoFromPoints = Math.min(3, Math.floor(totalSpent / 20));
        const nextAutoSlot = (autoFromPoints + 1) * 20;
        return {
            totalSpent: totalSpent,
            autoSlots: autoFromPoints,
            maxAutoSlots: 3,
            nextAutoSlot: nextAutoSlot,
            remainingToNext: autoFromPoints >= 3 ? 0 : nextAutoSlot - totalSpent,
            isMaxAuto: autoFromPoints >= 3
        };
    },
    
    // 获取天赋槽手动扩充进度
    getPassiveSlotManualProgress() {
        const manualSlots = this.permanent.manualPassiveSlots || 0;
        const essence = this.permanent.essence || 0;
        const cost = 50;
        return {
            manualSlots: manualSlots,
            maxManualSlots: 3,
            cost: cost,
            essence: essence,
            canAfford: essence >= cost,
            isMaxManual: manualSlots >= 3
        };
    },
    
    // 手动扩充天赋槽
    expandPassiveSlot() {
        const progress = this.getPassiveSlotManualProgress();
        if (progress.isMaxManual) {
            this.showGameAlert('无法扩充', '天赋槽已达到手动扩充上限（3个）！');
            return false;
        }
        if (!progress.canAfford) {
            this.showGameAlert('精粹不足', '手动扩充天赋槽需要50局外精粹！\n当前精粹：' + progress.essence);
            return false;
        }
        this.permanent.essence -= progress.cost;
        this.permanent.manualPassiveSlots = (this.permanent.manualPassiveSlots || 0) + 1;
        this.savePermanent();
        this.showGameAlert('扩充成功！', '天赋槽+1！\n当前天赋槽：' + this.getPassiveSlots() + '个');
        return true;
    },

    // 获取主动槽数量（混合模式：自动扩充 + 手动扩充）
    getActiveSlots() {
        // 初始3个额外槽位（默认3个技能不占槽，始终可用）
        let slots = 3;
        // 自动扩充：等级25+1槽，等级50+1槽（最多自动+2槽）
        if (this.player.level >= 25) slots++;
        if (this.player.level >= 50) slots++;
        // 手动扩充：消耗100精粹+1槽（最多手动+1槽）
        const manualSlots = this.permanent.manualActiveSlots || 0;
        slots += Math.min(1, manualSlots);
        return Math.min(6, slots);
    },
    
    // 获取技能槽自动扩充进度
    getActiveSlotAutoProgress() {
        const level = this.player.level || 1;
        let autoSlots = 0;
        if (level >= 25) autoSlots++;
        if (level >= 50) autoSlots++;
        return {
            level: level,
            autoSlots: autoSlots,
            maxAutoSlots: 2,
            nextLevel: autoSlots >= 2 ? 0 : (autoSlots === 0 ? 25 : 50),
            remainingToNext: autoSlots >= 2 ? 0 : (autoSlots === 0 ? 25 - level : 50 - level),
            isMaxAuto: autoSlots >= 2
        };
    },
    
    // 获取技能槽手动扩充进度
    getActiveSlotManualProgress() {
        const manualSlots = this.permanent.manualActiveSlots || 0;
        const essence = this.permanent.essence || 0;
        const cost = 100;
        return {
            manualSlots: manualSlots,
            maxManualSlots: 1,
            cost: cost,
            essence: essence,
            canAfford: essence >= cost,
            isMaxManual: manualSlots >= 1
        };
    },
    
    // 手动扩充技能槽
    expandActiveSlot() {
        const progress = this.getActiveSlotManualProgress();
        if (progress.isMaxManual) {
            this.showGameAlert('无法扩充', '技能槽已达到手动扩充上限（1个）！');
            return false;
        }
        if (!progress.canAfford) {
            this.showGameAlert('精粹不足', '手动扩充技能槽需要100局外精粹！\n当前精粹：' + progress.essence);
            return false;
        }
        this.permanent.essence -= progress.cost;
        this.permanent.manualActiveSlots = (this.permanent.manualActiveSlots || 0) + 1;
        this.savePermanent();
        this.showGameAlert('扩充成功！', '技能槽+1！\n当前技能槽：' + this.getActiveSlots() + '个');
        return true;
    },

    // 装备天赋
    equipTalent(talentId) {
        if (!this.isTalentUnlocked(talentId)) return {success: false, msg: "未解锁"};
        if (this.player.equippedTalents.includes(talentId)) return {success: false, msg: "已装备"};
        if (this.player.equippedTalents.length >= this.getPassiveSlots()) {
            return {success: false, msg: "被动槽已满（" + this.getPassiveSlots() + "个）"};
        }
        this.player.equippedTalents.push(talentId);
        this.calcDerivedStats();
        return {success: true, msg: "装备成功"};
    },

    // 卸下天赋
    unequipTalent(talentId) {
        const idx = this.player.equippedTalents.indexOf(talentId);
        if (idx < 0) return {success: false, msg: "未装备"};
        this.player.equippedTalents.splice(idx, 1);
        this.calcDerivedStats();
        return {success: true, msg: "已卸下"};
    },

    // 计算已装备天赋的被动加成（扩展解析）
    getEquippedTalentBonus() {
        const bonus = {
            attack:0, maxHp:0, defense:0, crit:0, critDamage:0, hit:0, speed:0, maxEnergy:0,
            hpRegen:0, allStatPct:0, damagePct:0, damageReductionPct:0, lifeStealPct:0,
            dotOnHit: [], controlOnHit: [], debuffOnHit: [],
            reflectPct:0, reflectFlat:0, healOnKillPct:0, extraAttackChance:0,
            strength:0, agility:0, vitality:0, perception:0, evolution:0,
            cooldownReduction:0, dodgeBonus:0, firstStrikeDamagePct:0, lowHpDamagePct:0,
            // 新增：Dot效果
            bleedOnHit: [], witherOnHit: [],
            // 新增：控制效果
            stunChance:0, paralyzeChance:0, freezeChance:0, bindChance:0, silenceChance:0,
            // 新增：战斗开始效果
            startStealth:false, startCharm:false, startShield:0,
            // 新增：击杀效果
            energyOnKill:0, expBonusPct:0, dropBonusPct:0,
            // ========== 新机制字段 ==========
            dotExplosionRetainPct:0,      // 毒爆/爆燃保留层数百分比
            critExtraAttackChance:0,       // 暴击追加攻击概率
            critExtraAttackMult:0.5,       // 暴击追加攻击伤害倍率
            lethalSaveChance:0,             // 致命伤害保留1点概率
            lethalSaveMaxUses:0,            // 致命保留最大次数
            lifeStealToShieldPct:0,         // 吸血转护盾百分比
            dodgeCounterChance:0,           // 闪避反击概率
            dodgeCounterMult:0.5,           // 闪避反击伤害倍率
            extraTurnChance:0,               // 额外行动概率
            extraTurnMaxUses:0,              // 额外行动最大次数
            killStackAttack:0,               // 击杀叠加攻击力
            killStackCrit:0,                 // 击杀叠加暴击率
            lowHpInvincibleChance:0,         // 低血量无敌概率
            lowHpInvincibleMaxUses:0,        // 低血量无敌最大次数
            bossSkillSteal:false,            // 击杀Boss获得技能
            randomMythicTrigger:false,       // 随机触发神话效果
            allTalentEffectPct:0,            // 所有天赋效果百分比加成
            allDotDamagePct:0,               // 所有Dot伤害百分比
            allControlDurationPct:0,         // 所有控制时间百分比
            ignoreDefensePct:0,               // 无视防御百分比
            attackCannotDodge:false,          // 攻击无法被闪避
            firstStrikeDamagePct:0,           // 先手增伤
            poisonNoStackLimit:false,         // 中毒无层数上限
            poisonPerStackDamagePct:0,        // 每层中毒额外伤害百分比
            burnNoDecay:false,                // 灼烧不衰减
            burnTargetDamageTakenPct:0,       // 灼烧目标受到伤害增加
            freezeThresholdReduce:0,          // 冻结阈值降低
            chainLightningNoDecay:false,      // 连锁闪电不衰减
            chainLightningExtraBounces:0,     // 连锁闪电额外弹射次数
            paralyzeSkipActionBonus:0,        // 麻痹无法行动概率加成
            freeChainLightningChance:0,       // 免费连锁闪电概率
            killAttackStackPermanent:false,    // 击杀攻击叠加永久（本局）
            killCritStackPermanent:false,      // 击杀暴击叠加永久（本局）
            healEffectPct:0,                   // 回复效果百分比
            lifeStealBonusPct:0,               // 吸血比例加成
            shieldEffectPct:0,                 // 护盾效果百分比
            shieldDamageReduction:0,           // 护盾存在时减伤
            reflectBonusPct:0,                 // 反伤比例加成
            reflectHealPct:0,                  // 反伤回血百分比
            hpRegenPct:0,                      // 每回合回复最大生命百分比
            damageReductionPct:0,              // 减伤百分比
            allStatPctBonus:0,                 // 所有属性百分比加成
            cooldownReductionPct:0,            // 冷却缩减百分比
            randomBuffPerTurn:0,               // 每回合随机增益数量
            randomMythicPerTurn:false,         // 每回合随机触发神话效果
            causalChain:false,                 // 因果之链
            causalChainPct:0.35,               // 因果之链附加伤害百分比
            causalMaxRecord:200,               // 因果之链最大记录伤害
            bossSkillSteal:false,              // 噬神者：击杀Boss获得技能
            chimeraSoul:false,                 // 奇美拉之魂
            chimeraChance:0.25,                // 奇美拉之魂附加Dot概率
            poisonPenetration:0,               // 毒素穿透
            burnPenetration:0,                 // 火焰穿透
            bleedPenetration:0,                // 流血穿透
            witherPenetration:0,               // 凋零穿透
            allDotPenetration:0,               // 全Dot穿透
            startEnemyDebuff:false,            // 百兽龙威：开局降低敌人攻击
            startEnemyDebuffChance:0.35,       // 百兽龙威触发概率
            startEnemyDebuffPct:0.2,           // 百兽龙威降低攻击百分比
            randomMythicPerTurn:false,          // 奇点：每回合随机触发神话效果
            // ========== 新增天赋效果字段 ==========
            attackProcDamageChance:0,           // 攻击时概率造成额外伤害
            attackProcDamageMult:1.0,           // 攻击时概率额外伤害倍率
            critResistance:0,                    // 暴击抗性（降低被暴击概率）
            critDamageReduction:0,              // 受到暴击伤害减伤百分比
            hitDefenseReductionChance:0,        // 命中时概率降低敌人防御
            hitDefenseReductionPct:0,            // 命中时降低敌人防御百分比
            hitDefenseReductionDuration:3,       // 命中时降低防御持续回合
            attackIgnoreDodgeChance:0,           // 攻击时概率无视闪避
            shieldOnHitChance:0,                  // 受到攻击时概率获得护盾
            shieldOnHitPct:0,                     // 受到攻击时护盾吸收最大生命百分比
            energyFullDamageMult:1.0,             // 能量满时下次攻击伤害倍率
            fireDamageLifeStealPct:0,             // 受到火焰伤害转化为生命百分比
            burnResistancePct:0,                   // 灼烧抗性百分比
            meleeReflectChance:0,                  // 受到近战攻击时概率反伤
            meleeReflectPct:0,                     // 受到近战攻击时反伤百分比
            critHealDouble:false                   // 受到暴击伤害后恢复量翻倍
        };
        const all = this.data.talents.talents;
        if (!all) return bonus;
        let allTalentPct = 0;
        this.player.equippedTalents.forEach(tid => {
            const t = all.find(x => x.id === tid);
            if (!t || !t.effects || !Array.isArray(t.effects) || t.effects.length === 0) return;
            // 取当前等级效果，未升级的默认Lv1
            const lv = this.getTalentLevel(tid);
            let levelEffect = t.effects.find(e => e.level === lv);
            if (!levelEffect) levelEffect = t.effects[0];
            this.parsePassiveEffect(levelEffect.passive || '', bonus);
            // 检查是否有全知全能效果
            if (levelEffect.passive && levelEffect.passive.includes('所有天赋效果')) {
                const m = levelEffect.passive.match(/所有天赋效果\+(\d+)%/);
                if (m) allTalentPct += parseInt(m[1]) / 100;
            }
        });
        
        // 全知全能：所有天赋效果百分比加成
        if (allTalentPct > 0) {
            bonus.attack = Math.floor(bonus.attack * (1 + allTalentPct));
            bonus.maxHp = Math.floor(bonus.maxHp * (1 + allTalentPct));
            bonus.defense = Math.floor(bonus.defense * (1 + allTalentPct));
            bonus.crit = Math.floor(bonus.crit * (1 + allTalentPct));
            bonus.critDamage = Math.floor(bonus.critDamage * (1 + allTalentPct));
            bonus.speed = Math.floor(bonus.speed * (1 + allTalentPct));
            bonus.lifeStealPct = Math.floor(bonus.lifeStealPct * (1 + allTalentPct));
            bonus.reflectPct = Math.floor(bonus.reflectPct * (1 + allTalentPct));
            bonus.dotExplosionRetainPct = Math.min(1, bonus.dotExplosionRetainPct * (1 + allTalentPct));
            bonus.critExtraAttackChance = Math.min(1, bonus.critExtraAttackChance * (1 + allTalentPct));
            bonus.dodgeCounterChance = Math.min(1, bonus.dodgeCounterChance * (1 + allTalentPct));
            bonus.extraTurnChance = Math.min(1, bonus.extraTurnChance * (1 + allTalentPct));
            bonus.lethalSaveChance = Math.min(1, bonus.lethalSaveChance * (1 + allTalentPct));
            bonus.lowHpInvincibleChance = Math.min(1, bonus.lowHpInvincibleChance * (1 + allTalentPct));
        }
        
        return bonus;
    },

    // 解析被动效果文本（支持五维+衍生属性）
    parsePassiveEffect(text, bonus) {        if (!text) return;        let m = text.match(/攻击(?:力)?\s*\+\s*(\d+)/);        if (m) bonus.attack += parseInt(m[1]);        m = text.match(/(?:最大)?生命(?:值)?\s*\+\s*(\d+)/);        if (m) bonus.maxHp += parseInt(m[1]);        m = text.match(/防御(?:力)?\s*\+\s*(\d+)/);        if (m) bonus.defense += parseInt(m[1]);        m = text.match(/暴击(?:率)?\s*\+\s*(\d+)/);        if (m) bonus.crit += parseInt(m[1]);        m = text.match(/暴击伤害\s*\+\s*(\d+)/);        if (m) bonus.critDamage += parseInt(m[1]);        m = text.match(/命中(?:率)?\s*\+\s*(\d+)/);        if (m) bonus.hit += parseInt(m[1]);        m = text.match(/(?:先手值|先手|速度)\s*\+\s*(\d+)/);        if (m) bonus.speed += parseInt(m[1]);        m = text.match(/能量(?:上限)?\s*\+\s*(\d+)/);        if (m) bonus.maxEnergy += parseInt(m[1]);        m = text.match(/每回合回复\s*(\d+)\s*点?生命/);        if (m) bonus.hpRegen += parseInt(m[1]);        m = text.match(/吸取(?:造成)?伤害的\s*(\d+)%\s*为?生命/);        if (m) bonus.lifeStealPct += parseInt(m[1]);        if ((/中毒|毒素|猛毒/.test(text)) && (/攻击(?:时)?|附加|普攻/.test(text))) {            bonus.dotOnHit.push({type: 'poison', stacks: 2});        }        if ((/灼烧|火焰伤害/.test(text)) && (/攻击(?:时)?|附加/.test(text))) {            bonus.dotOnHit.push({type: 'burn', stacks: 1});        }        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*减速/);        if (m) bonus.controlOnHit.push({type: 'slow', chance: parseInt(m[1]), duration: 2});        if (/附加减速/.test(text)) {            bonus.controlOnHit.push({type: 'slow', chance: 100, duration: 2});        }        m = text.match(/受到攻击(?:时)?\s*(\d+)%\s*概率反弹\s*(\d+)%\s*伤害/);        if (m) bonus.reflectPct += parseInt(m[2]) * (parseInt(m[1]) / 100);        m = text.match(/近战攻击反弹\s*(\d+)\s*点伤害/);        if (m) bonus.reflectFlat += parseInt(m[1]);        m = text.match(/击杀(?:敌人|单位)(?:时)?回复\s*(\d+)%\s*最大生命/);        if (m) bonus.healOnKillPct += parseInt(m[1]);        m = text.match(/所有属性\s*\+\s*(\d+)%/);        if (m) bonus.allStatPct += parseInt(m[1]);
        // 五维基础属性
        m = text.match(/力量\s*\+\s*(\d+)/); if (m) bonus.strength = (bonus.strength||0) + parseInt(m[1]);
        m = text.match(/敏捷\s*\+\s*(\d+)/); if (m) bonus.agility = (bonus.agility||0) + parseInt(m[1]);
        m = text.match(/体质\s*\+\s*(\d+)/); if (m) bonus.vitality = (bonus.vitality||0) + parseInt(m[1]);
        m = text.match(/感知\s*\+\s*(\d+)/); if (m) bonus.perception = (bonus.perception||0) + parseInt(m[1]);
        m = text.match(/进化\s*\+\s*(\d+)/); if (m) bonus.evolution = (bonus.evolution||0) + parseInt(m[1]);
        // 闪避
        m = text.match(/闪避(?:率)?\s*\+\s*(\d+)/); if (m) bonus.dodgeBonus = (bonus.dodgeBonus||0) + parseInt(m[1]);
        // 增伤/减伤
        m = text.match(/造成(?:的)?伤害\s*\+\s*(\d+)%/); if (m) bonus.damagePct = (bonus.damagePct||0) + parseInt(m[1])/100;
        m = text.match(/受到(?:的)?伤害\s*-\s*(\d+)%/); if (m) bonus.damageReductionPct = (bonus.damageReductionPct||0) + parseInt(m[1])/100;
        // 对低血量增伤
        m = text.match(/对低血量目标伤害\s*\+\s*(\d+)%/); if (m) bonus.lowHpDamagePct = (bonus.lowHpDamagePct||0) + parseInt(m[1])/100;
        // 先手攻击额外伤害
        m = text.match(/先手攻击额外伤害\s*\+\s*(\d+)%/); if (m) bonus.firstStrikeDamagePct = (bonus.firstStrikeDamagePct||0) + parseInt(m[1])/100;
        // 额外攻击概率
        m = text.match(/(?:回合开始|每回合)\s*(\d+)%概率额外行动/); if (m) bonus.extraAttackChance = (bonus.extraAttackChance||0) + parseInt(m[1])/100;
        // 冷却缩减
        m = text.match(/技能冷却\s*-\s*(\d+)%/); if (m) bonus.cooldownReduction = (bonus.cooldownReduction||0) + parseInt(m[1])/100;
        // ========== 新增效果解析 ==========
        // Dot：流血
        if ((/流血|撕裂伤/.test(text)) && (/攻击(?:时)?|附加|普攻/.test(text))) {
            bonus.bleedOnHit.push({type: 'bleed', stacks: 2});
        }
        // Dot：凋零
        if ((/凋零|枯萎/.test(text)) && (/攻击(?:时)?|附加|普攻/.test(text))) {
            bonus.witherOnHit.push({type: 'wither', stacks: 1});
        }
        // 控制：眩晕
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*眩晕/);
        if (m) bonus.stunChance += parseInt(m[1]) / 100;
        else if (/附加眩晕/.test(text)) bonus.stunChance += 0.3;
        // 控制：麻痹
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*麻痹/);
        if (m) bonus.paralyzeChance += parseInt(m[1]) / 100;
        else if (/附加麻痹/.test(text)) bonus.paralyzeChance += 0.5;
        // 控制：冻结
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*冻结/);
        if (m) bonus.freezeChance += parseInt(m[1]) / 100;
        else if (/附加冻结/.test(text)) bonus.freezeChance += 0.3;
        // 控制：束缚
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*束缚/);
        if (m) bonus.bindChance += parseInt(m[1]) / 100;
        else if (/附加束缚/.test(text)) bonus.bindChance += 0.4;
        // 控制：沉默
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*沉默/);
        if (m) bonus.silenceChance += parseInt(m[1]) / 100;
        else if (/附加沉默/.test(text)) bonus.silenceChance += 0.3;
        // 战斗开始：隐身
        if (/战斗开始.*隐身|入场.*隐身|开局.*隐身/.test(text)) bonus.startStealth = true;
        // 战斗开始：魅惑
        if (/战斗开始.*魅惑|入场.*魅惑|开局.*魅惑/.test(text)) bonus.startCharm = true;
        // 战斗开始：护盾
        m = text.match(/战斗开始.*获得\s*(\d+)\s*点.*护盾|入场.*护盾\s*(\d+)/);
        if (m) bonus.startShield += parseInt(m[1] || m[2] || 0);
        if (/战斗开始.*护盾/.test(text) && !m) bonus.startShield += 20;
        // 击杀：回能
        m = text.match(/击杀(?:敌人|单位)(?:时)?回复\s*(\d+)\s*点.*能量/);
        if (m) bonus.energyOnKill += parseInt(m[1]);
        // 经验加成
        m = text.match(/获得经验\s*\+\s*(\d+)%/);
        if (m) bonus.expBonusPct += parseInt(m[1]) / 100;
        // 掉落加成
        m = text.match(/掉落(?:概率|数量)?\s*\+\s*(\d+)%/);
        if (m) bonus.dropBonusPct += parseInt(m[1]) / 100;
        
        // ========== 新机制解析 ==========
        // Dot穿透效果
        m = text.match(/(?:毒素|毒)穿透\s*\+\s*(\d+)%/);
        if (m) bonus.poisonPenetration = (bonus.poisonPenetration||0) + parseInt(m[1])/100;
        m = text.match(/(?:火焰|火)穿透\s*\+\s*(\d+)%/);
        if (m) bonus.burnPenetration = (bonus.burnPenetration||0) + parseInt(m[1])/100;
        m = text.match(/(?:流血|血)穿透\s*\+\s*(\d+)%/);
        if (m) bonus.bleedPenetration = (bonus.bleedPenetration||0) + parseInt(m[1])/100;
        m = text.match(/(?:凋零|枯萎)穿透\s*\+\s*(\d+)%/);
        if (m) bonus.witherPenetration = (bonus.witherPenetration||0) + parseInt(m[1])/100;
        m = text.match(/(?:全Dot|所有Dot)穿透\s*\+\s*(\d+)%/);
        if (m) bonus.allDotPenetration = (bonus.allDotPenetration||0) + parseInt(m[1])/100;
        // 毒爆/爆燃保留层数
        if (/毒爆(?:不再清除|保留)/.test(text) || /毒爆.*保留\d+%层数/.test(text)) {
            m2 = text.match(/保留(\d+)%层数/);
            bonus.dotExplosionRetainPct = m2 ? parseInt(m2[1])/100 : 0.5;
        }
        // 暴击追加攻击
        m = text.match(/暴击(?:时)?(\d+)%概率追加(?:一次)?攻击/);
        if (m) {
            bonus.critExtraAttackChance = parseInt(m[1])/100;
            m2 = text.match(/追加.*?(\d+)%伤害/);
            if (m2) bonus.critExtraAttackMult = parseInt(m2[1])/100;
        }
        // 致命伤害保留1点
        m = text.match(/受到致命伤害时保留1点生命.*?(\d+)次/);
        if (m) {
            bonus.lethalSaveChance = 1.0;
            bonus.lethalSaveMaxUses = parseInt(m[1]);
        }
        // 吸血转护盾
        m = text.match(/吸血量超过最大生命时(\d+)?%?转化为护盾/);
        if (m) {
            bonus.lifeStealToShieldPct = m[1] ? parseInt(m[1])/100 : 0.5;
        }
        // 闪避反击
        m = text.match(/闪避后(\d+)%概率反击/);
        if (m) {
            bonus.dodgeCounterChance = parseInt(m[1])/100;
            m2 = text.match(/反击.*?(\d+)%伤害/);
            if (m2) bonus.dodgeCounterMult = parseInt(m2[1])/100;
        }
        // 额外行动
        m = text.match(/(?:每回合|回合开始)(\d+)%概率获得额外行动/);
        if (m) {
            bonus.extraTurnChance = parseInt(m[1])/100;
            m2 = text.match(/每局限(\d+)次/);
            if (m2) bonus.extraTurnMaxUses = parseInt(m2[1]);
        }
        // 击杀叠加攻击力
        m = text.match(/击杀(?:敌人|单位)后攻击力\+(\d+)%.*可叠加/);
        if (m) {
            bonus.killStackAttack = parseInt(m[1])/100;
            bonus.killAttackStackPermanent = true;
        }
        // 击杀叠加暴击率
        m = text.match(/击杀(?:敌人|单位)后暴击率\+(\d+)%.*可叠加/);
        if (m) {
            bonus.killStackCrit = parseInt(m[1]);
            bonus.killCritStackPermanent = true;
        }
        // 低血量无敌
        m = text.match(/生命低于\d+%时无敌1回合.*每局限(\d+)次/);
        if (m) {
            bonus.lowHpInvincibleChance = 1.0;
            bonus.lowHpInvincibleMaxUses = parseInt(m[1]);
        }
        // 所有天赋效果加成
        m = text.match(/所有天赋效果\+(\d+)%/);
        if (m) bonus.allTalentEffectPct = parseInt(m[1])/100;
        // 所有Dot伤害加成
        m = text.match(/所有Dot伤害\+(\d+)%/);
        if (m) bonus.allDotDamagePct = parseInt(m[1])/100;
        // 所有控制时间加成
        m = text.match(/所有控制时间\+(\d+)%/);
        if (m) bonus.allControlDurationPct = parseInt(m[1])/100;
        // 无视防御
        m = text.match(/无视目标(\d+)%防御/);
        if (m) bonus.ignoreDefensePct = parseInt(m[1])/100;
        // 攻击无法被闪避
        if (/攻击无法被闪避/.test(text)) bonus.attackCannotDodge = true;
        // 中毒无层数上限
        if (/中毒层数无上限/.test(text)) bonus.poisonNoStackLimit = true;
        // 每层中毒额外伤害
        m = text.match(/每层中毒额外\+(\d+)%伤害/);
        if (m) bonus.poisonPerStackDamagePct = parseInt(m[1])/100;
        // 灼烧不衰减
        if (/灼烧(?:层数)?每回合\+1|灼烧不衰减/.test(text)) bonus.burnNoDecay = true;
        // 灼烧目标受到伤害增加
        m = text.match(/灼烧目标受到的(?:所有)?伤害\+(\d+)%/);
        if (m) bonus.burnTargetDamageTakenPct = parseInt(m[1])/100;
        // 回复效果加成
        m = text.match(/回复效果\+(\d+)%/);
        if (m) bonus.healEffectPct = parseInt(m[1])/100;
        // 吸血比例加成
        m = text.match(/吸血比例\+(\d+)%/);
        if (m) bonus.lifeStealBonusPct = parseInt(m[1])/100;
        // 护盾效果加成
        m = text.match(/护盾效果\+(\d+)%/);
        if (m) bonus.shieldEffectPct = parseInt(m[1])/100;
        // 反伤比例加成
        m = text.match(/反伤比例\+(\d+)%/);
        if (m) bonus.reflectBonusPct = parseInt(m[1])/100;
        // 每回合回复最大生命百分比
        m = text.match(/每回合回复(\d+)%最大生命/);
        if (m) bonus.hpRegenPct = parseInt(m[1])/100;
        // 减伤百分比
        m = text.match(/减伤\+(\d+)%/);
        if (m) bonus.damageReductionPct = parseInt(m[1])/100;
        // 所有属性百分比加成
        m = text.match(/所有属性\+(\d+)%/);
        if (m) bonus.allStatPctBonus = parseInt(m[1])/100;
        // 冷却缩减百分比
        m = text.match(/技能冷却-(\d+)%/);
        if (m) bonus.cooldownReductionPct = parseInt(m[1])/100;
        // 每回合随机增益
        m = text.match(/每回合开始随机获得(\d+)个增益/);
        if (m) bonus.randomBuffPerTurn = parseInt(m[1]);
        // 因果之链
        if (/因果之链|受到伤害时记录/.test(text)) {
            bonus.causalChain = true;
            m = text.match(/附加记录的(\d+)%伤害/);
            if (m) bonus.causalChainPct = parseInt(m[1]) / 100;
            m = text.match(/最多记录(\d+)点/);
            if (m) bonus.causalMaxRecord = parseInt(m[1]);
        }
        // 噬神者
        if (/击杀Boss后.*获得.*技能|噬神者/.test(text)) {
            bonus.bossSkillSteal = true;
        }
        // 奇美拉之魂：随机附加多种Dot
        if (/奇美拉之魂|随机附加流血.*中毒.*灼烧/.test(text)) {
            bonus.chimeraSoul = true;
            m = text.match(/各(\d+)%概率/);
            if (m) bonus.chimeraChance = parseInt(m[1]) / 100;
        }
        // 百兽龙威：战斗开始时降低敌人攻击力
        if (/百兽龙威|战斗开始时.*降低敌人攻击力/.test(text)) {
            bonus.startEnemyDebuff = true;
            m = text.match(/(\d+)%概率降低敌人攻击力/);
            if (m) bonus.startEnemyDebuffChance = parseInt(m[1]) / 100;
            m = text.match(/降低敌人攻击力(\d+)%/);
            if (m) bonus.startEnemyDebuffPct = parseInt(m[1]) / 100;
        }
        // 奇点：每回合随机触发神话天赋效果
        if (/奇点|每回合开始随机触发一个.*神话天赋/.test(text)) {
            bonus.randomMythicPerTurn = true;
        }
        // ========== 新增天赋效果解析 ==========
        // 攻击时概率造成额外伤害（鹰眼、弱点洞察）
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*造成\s*(\d+)%\s*伤害/);
        if (m) {
            bonus.attackProcDamageChance = parseInt(m[1]) / 100;
            bonus.attackProcDamageMult = parseInt(m[2]) / 100;
        }
        // 暴击抗性（硬化骨骼）
        m = text.match(/暴击抗性\s*\+\s*(\d+)%/);
        if (m) bonus.critResistance = parseInt(m[1]);
        // 受到暴击伤害减伤（硬化骨骼）
        m = text.match(/受到暴击伤害\s*-\s*(\d+)%/);
        if (m) bonus.critDamageReduction = parseInt(m[1]) / 100;
        // 命中时概率降低敌人防御（全视之眼）
        m = text.match(/命中(?:时)?\s*(\d+)%\s*概率.*防御\s*-\s*(\d+)%/);
        if (m) {
            bonus.hitDefenseReductionChance = parseInt(m[1]) / 100;
            bonus.hitDefenseReductionPct = parseInt(m[2]);
            m2 = text.match(/防御-\d+%.*?(\d+)回合/);
            if (m2) bonus.hitDefenseReductionDuration = parseInt(m2[1]);
        }
        // 攻击时概率无视闪避（红外锁定）
        m = text.match(/攻击(?:时)?\s*(\d+)%\s*概率.*无视.*闪避/);
        if (m) bonus.attackIgnoreDodgeChance = parseInt(m[1]) / 100;
        // 受到攻击时概率获得护盾（灵能护盾）
        m = text.match(/受到攻击(?:时)?\s*(\d+)%\s*概率.*护盾.*吸收\s*(\d+)%.*生命/);
        if (m) {
            bonus.shieldOnHitChance = parseInt(m[1]) / 100;
            bonus.shieldOnHitPct = parseInt(m[2]) / 100;
        }
        // 能量满时下次攻击伤害倍率（灵能爆发）
        m = text.match(/能量满(?:时)?.*下一次攻击造成\s*(\d+)%\s*伤害/);
        if (m) bonus.energyFullDamageMult = parseInt(m[1]) / 100;
        // 受到火焰伤害转化为生命（热能吸收）
        m = text.match(/受到火焰伤害(?:时)?.*(\d+)%.*转化为.*生命/);
        if (m) bonus.fireDamageLifeStealPct = parseInt(m[1]) / 100;
        // 灼烧抗性（热能吸收）
        m = text.match(/灼烧抗性\s*\+\s*(\d+)%/);
        if (m) bonus.burnResistancePct = parseInt(m[1]) / 100;
        // 受到近战攻击时概率反伤（骨刺反击）
        m = text.match(/受到近战攻击(?:时)?\s*(\d+)%\s*概率反弹\s*(\d+)%\s*伤害/);
        if (m) {
            bonus.meleeReflectChance = parseInt(m[1]) / 100;
            bonus.meleeReflectPct = parseInt(m[2]) / 100;
        }
        // 受到暴击伤害后恢复量翻倍（骨骼再生）
        if (/受到暴击伤害后.*恢复量.*翻倍|暴击.*恢复.*翻倍/.test(text)) {
            bonus.critHealDouble = true;
        }
    },    //  商店
    // ============================================================
    openShop(category) {
        this.closePop();
        this.updateBottomNav('shop');
        const shop = this.data.shop;
        if (!shop) return;
        const consumables = shop.consumables || [];
        const currencyNames = {fragments_1:'普通碎片', fragments_2:'稀有碎片', fragments_3:'史诗碎片', fragments_4:'传说碎片', fragments_5:'神话碎片', gold:'基因精华'};
        const currencyColors = {fragments_1:'var(--quality-common)', fragments_2:'var(--accent-info)', fragments_3:'var(--accent-purple)', fragments_4:'var(--accent-warning)', fragments_5:'var(--accent-danger)', gold:'var(--accent-warning)'};
        const categoryNames = {heal:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M7 20h10\"/><path d=\"M10 20c5.5-2.5.8-6.4 3-10\"/><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\"/><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\"/></svg> 生命恢复', energy:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 能量恢复', buff:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M18 3a3 3 0 0 0-3 3v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 0-6 0v9a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6V8a3 3 0 0 1 3-3 3 3 0 0 0-3-3z\"/></svg> 属性强化', resource:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"/><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"/></svg> 资源包', special:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 特殊道具'};
        const categories = ['heal', 'energy', 'buff', 'resource', 'special'];
        const activeCat = category || 'all';

        // 初始化本局购买记录
        if (!this.shopPurchaseCount) this.shopPurchaseCount = {};

        let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
        html += '<h3 style="margin:0;color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因共生体商人</h3>';
        html += '<button onclick="' + (this.merchantMode ? 'game.leaveMerchant()' : 'game.goBack()') + '" style="padding:8px 16px;font-size:13px;background:var(--accent-success);color:white;border-radius:6px">← 返回</button>';
        html += '</div>';
        if (this.merchantMode) {
            html += '<p style="color:var(--accent-success);font-size:13px;margin-bottom:10px;line-height:1.6;font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M2 12c0-4 4-6 10-6s10 2 10 6v2c0 4-4 6-10 6s-10-2-10-6z\"/><circle cx=\"8\" cy=\"12\" r=\"1.5\"/><circle cx=\"16\" cy=\"12\" r=\"1.5\"/><path d=\"M10 16c.5.5 1.5.5 2 0s1.5-.5 2 0\"/></svg> 流浪商人特惠！所有商品8折优惠！</p>';
        } else {
            html += '<p style="color:var(--text-secondary);font-size:13px;margin-bottom:10px;line-height:1.6">"欢迎，进化者。我这里有各种基因改造品，能让你在进化之路上走得更远。"</p>';
        }
        
        // 资源显示
        html += '<div style="margin-bottom:12px;padding:10px;background:linear-gradient(135deg,var(--bg-card),var(--bg-secondary));border-radius:8px;font-size:12px;border:1px solid var(--text-faint)">';
        html += `<span style="color:var(--accent-warning);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因精华：${this.player.gold}</span>`;
        for (let q=1; q<=4; q++) {
            html += `<span style="margin-left:10px;color:${currencyColors['fragments_'+q]}">${currencyNames['fragments_'+q]}：${this.permanent.universalFragments[q] || 0}</span>`;
        }
        html += '</div>';

        // 分类标签
        html += '<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">';
        html += `<button onclick="game.openShop('all')" style="padding:6px 12px;font-size:12px;border-radius:6px;${activeCat==='all'?'background:var(--accent-warning);color:var(--bg-card);font-weight:bold':'background:var(--text-faint);color:var(--text-secondary)'}" class="shop-cat-btn">全部</button>`;
        categories.forEach(cat => {
            const count = consumables.filter(i => i.category === cat).length;
            html += `<button onclick="game.openShop('${cat}')" style="padding:6px 12px;font-size:12px;border-radius:6px;${activeCat===cat?'background:var(--accent-warning);color:var(--bg-card);font-weight:bold':'background:var(--text-faint);color:var(--text-secondary)'}" class="shop-cat-btn">${categoryNames[cat]} (${count})</button>`;
        });
        html += '</div>';

        // 商品列表
        const filtered = activeCat === 'all' ? consumables : consumables.filter(i => i.category === activeCat);
        html += '<div class="scroll-area" style="padding-bottom:50px">';
        filtered.forEach(item => {
            const price = item.price ? item.price.amount : 10;
            const currency = item.price ? item.price.currency : 'gold';
            const currName = currencyNames[currency] || currency;
            const currColor = currencyColors[currency] || 'var(--accent-warning)';
            const limit = item.limitPerRun || 99;
            const purchased = this.shopPurchaseCount[item.id] || 0;
            const remaining = limit - purchased;
            const icon = (item.icon && this.icons[item.icon]) ? this.getIcon(item.icon, 28) : (item.icon || this.getIcon('box', 28));

            // 检查是否能购买
            let canBuy = remaining > 0;
            if (currency === 'gold') {
                canBuy = canBuy && this.player.gold >= price;
            } else {
                const q = parseInt(currency.replace('fragments_', ''));
                canBuy = canBuy && (this.permanent.universalFragments[q] || 0) >= price;
            }

            html += `<div class="talent-card" style="${!canBuy?'opacity:0.5':''}">`;
            html += '<div style="display:flex;align-items:flex-start;gap:10px">';
            html += `<div style="font-size:28px;line-height:1">${icon}</div>`;
            html += '<div style="flex:1">';
            html += `<div class="talent-name" style="color:var(--text-primary)" data-item-id="${item.id}">${item.name}</div>`;
            html += `<div class="talent-desc" style="color:var(--text-secondary);font-size:12px">${item.description}</div>`;
            // 显示具体效果数值
            if (item.effect && item.effect.type) {
                const effectNames = {
                    heal: '恢复生命', heal_percent: '恢复生命', max_hp: '最大生命',
                    energy: '恢复能量', energy_percent: '恢复能量', max_energy: '能量上限',
                    attack_boost: '攻击力', defense_boost: '防御力', speed_boost: '先手值',
                    all_boost: '全属性', exp_boost: '经验获取', drop_boost: '掉落率',
                    unlock_passive_slot: '被动槽位', fragment_drop_bonus_percent: '碎片掉落',
                    upgrade_success_rate_bonus: '升阶成功率', start_with_item: '开局道具',
                    gain_fragments: '获得碎片', gain_talent_points: '获得天赋点',
                    gain_gold: '获得基因精华', revive: '复活', revive_percent: '复活恢复',
                    damage_boost: '伤害提升', crit_boost: '暴击率', crit_damage_boost: '暴击伤害',
                    hit_boost: '命中率', dodge_boost: '闪避率', hp_regen: '生命恢复',
                    energy_regen: '能量恢复', dot_damage: 'Dot伤害', cooldown_reduction: '冷却缩减',
                    life_steal: '吸血', reflect_damage: '反伤', shield: '护盾',
                    armor_penetration: '护甲穿透', crit_resistance: '暴击抗性',
                    firstStrike: '先手值', first_strike: '先手值',
                    talentPower: '天赋强度', talent_power: '天赋强度'
                };
                const effectName = effectNames[item.effect.type] || item.effect.type;
                const effectValue = item.effect.value;
                let effectText = '';
                if (typeof effectValue === 'number') {
                    if (item.effect.type.includes('percent') || item.effect.type.includes('bonus') || item.effect.type.includes('rate')) {
                        effectText = `${effectName} +${effectValue}%`;
                    } else if (item.effect.type === 'heal_percent') {
                        effectText = `${effectName} +${effectValue}%`;
                    } else {
                        effectText = `${effectName} +${effectValue}`;
                    }
                } else if (effectValue) {
                    effectText = `${effectName}: ${effectValue}`;
                }
                if (effectText) {
                    html += `<div style="color:var(--accent-primary);font-size:12px;font-weight:bold;margin-top:4px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> ${effectText}</div>`;
                }
            }
            if (limit < 99) {
                html += `<div style="font-size:11px;color:${remaining > 0 ? 'var(--accent-success)' : 'var(--accent-danger)'};margin-top:3px">每局限购${limit}个，剩余${remaining}个</div>`;
            }
            html += '</div>';
            html += '</div>';
            html += '<div style="text-align:right;margin-top:8px">';
            const displayPrice = this.merchantMode ? Math.floor(price * 0.8) : price;
            const priceText = this.merchantMode ? `<span style="text-decoration:line-through;color:var(--text-muted);font-size:12px">${price}</span> <span style="color:var(--accent-success)">${displayPrice}</span>` : `${price}`;
            html += `<div style="color:${currColor};font-size:14px;font-weight:bold;margin-bottom:6px">${priceText} ${currName}</div>`;
            html += `<button onclick="game.buyItem('${item.id}')" ${canBuy?'':'disabled'} style="font-size:13px;padding:6px 16px;border-radius:6px;font-weight:bold">${remaining > 0 ? '购买' : '已售罄'}</button>`;
            html += '</div>';
            html += '</div>';
        });
        if (filtered.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:30px">该分类暂无商品</div>';
        }
        html += '</div>';
        if (this.merchantMode) {
            html += '<div style="display:flex;gap:10px;margin-top:12px">';
            html += '<button onclick="game.closePop()" style="flex:1;padding:10px;border-radius:6px;background:var(--accent-warning);color:white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> 暂离（返回主界面）</button>';
            html += '<button onclick="game.leaveMerchant()" style="flex:1;padding:10px;border-radius:6px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0\"/><path d=\"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2\"/><path d=\"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8\"/><path d=\"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\"/></svg> 离开商人</button>';
            html += '</div>';
        } else {
            html += '<button onclick="game.closePop()" style="margin-top:12px;width:100%;padding:10px;border-radius:6px">关闭</button>';
        }
        // 出售标签
        html += '<div style="margin-top:15px;padding-top:15px;border-top:1px solid var(--text-faint)">';
        html += '<h4 style="color:var(--accent-warning);margin-bottom:10px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v12\"/><path d=\"M15 9.5a3 3 0 0 0-3-1.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3 1.34 3 3-1.34 3-3 3a3 3 0 0 1-3-1.5\"/></svg> 出售物品（售价为原价的50%）</h4>';
        
        // 出售背包物品
        if (this.player.inventory && this.player.inventory.length > 0) {
            html += '<div style="margin-bottom:10px"><span style="color:var(--text-muted);font-size:12px">消耗品：</span></div>';
            this.player.inventory.forEach((itemId, idx) => {
                const item = this.data.shop.consumables.find(x => x.id === itemId);
                if (!item) return;
                const sellPrice = Math.floor((item.price.amount || 10) * 0.5);
                html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(0,0,0,0.2);border-radius:4px;margin-bottom:4px">
                    <span style="font-size:12px">${item.icon} ${item.name}</span>
                    <button onclick="game.sellItem(${idx})" style="font-size:11px;padding:3px 10px;background:var(--accent-warning);color:var(--text-primary)">出售(${sellPrice}精华)</button>
                </div>`;
            });
        }
        
        // 出售多余共生体
        const equippedSymIds = Object.values(this.permanent.equippedSymbionts || {});
        const extraSymbionts = (this.permanent.symbionts || []).filter(id => !equippedSymIds.includes(id));
        if (extraSymbionts.length > 0) {
            html += '<div style="margin:10px 0 6px 0"><span style="color:var(--text-muted);font-size:12px">多余共生体：</span></div>';
            extraSymbionts.forEach((symId, idx) => {
                const tpl = this.getSymbiontTemplate(symId);
                if (!tpl) return;
                const basePrice = {1:10, 2:25, 3:50, 4:100, 5:200}[tpl.quality] || 10;
                const sellPrice = Math.floor(basePrice * 0.5);
                html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(0,0,0,0.2);border-radius:4px;margin-bottom:4px">
                    <span style="font-size:12px;color:${this.symbiontQualityColors[tpl.quality] || 'var(--text-primary)'}">${tpl.name} [${this.symbiontQualityNames[tpl.quality]}]</span>
                    <button onclick="game.sellSymbiont('${symId}')" style="font-size:11px;padding:3px 10px;background:var(--accent-warning);color:var(--text-primary)">出售(${sellPrice}精华)</button>
                </div>`;
            });
        }
        
        if ((!this.player.inventory || this.player.inventory.length === 0) && extraSymbionts.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:15px;font-size:12px">暂无可出售物品</div>';
        }
        html += '</div>';
        
        // 渲染到独立页面
        const contentDiv = document.getElementById('shopScreenContent');
        if (contentDiv) {
            contentDiv.innerHTML = html;
        }
        this.showScreen('shopScreen');
    },

    // 出售背包物品
    sellItem(idx) {
        if (!this.player.inventory || !this.player.inventory[idx]) return;
        const itemId = this.player.inventory[idx];
        const item = this.data.shop.consumables.find(x => x.id === itemId);
        if (!item) return;
        const sellPrice = Math.floor((item.price.amount || 10) * 0.5);
        this.player.inventory.splice(idx, 1);
        this.player.gold = (this.player.gold || 0) + sellPrice;
        this.appendBattleLog(`出售${item.name}，获得${sellPrice}基因精华`, 'log-info');
        this.openShop('all');
    },

    // 出售多余共生体
    sellSymbiont(symId) {
        const tpl = this.getSymbiontTemplate(symId);
        if (!tpl) return;
        const equippedSymIds = Object.values(this.permanent.equippedSymbionts || {});
        if (equippedSymIds.includes(symId)) {
            this.showGameAlert('提示', '已装备的共生体无法出售');
            return;
        }
        const idx = (this.permanent.symbionts || []).indexOf(symId);
        if (idx < 0) return;
        const basePrice = {1:10, 2:25, 3:50, 4:100, 5:200}[tpl.quality] || 10;
        const sellPrice = Math.floor(basePrice * 0.5);
        this.permanent.symbionts.splice(idx, 1);
        this.player.gold = (this.player.gold || 0) + sellPrice;
        this.savePermanent();
        this.appendBattleLog(`出售${tpl.name}，获得${sellPrice}基因精华`, 'log-info');
        this.openShop('all');
    },

    // 应用物品效果（从背包使用或购买时调用）
    applyItemEffect(item) {
        const eff = item.effect || {};
        let resultMsg = `使用了【${item.name}】！`;

        switch(eff.type) {
            case 'heal_percent':
                const heal = Math.floor(this.player.maxHp * eff.value / 100);
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
                resultMsg += `\n恢复${heal}点生命！`;
                break;
            case 'energy_percent':
                const energy = Math.floor(this.player.maxEnergy * eff.value / 100);
                this.player.energy = Math.min(this.player.maxEnergy, this.player.energy + energy);
                resultMsg += `\n恢复${energy}点能量！`;
                break;
            case 'full_restore':
                this.player.hp = this.player.maxHp;
                this.player.energy = this.player.maxEnergy;
                resultMsg += '\n生命和能量完全恢复！';
                break;
            case 'attack_boost':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.attackBoost = (this.runBuffs.attackBoost || 0) + eff.value;
                this.calcDerivedStats();
                resultMsg += `\n本局攻击力+${eff.value}%！`;
                break;
            case 'defense_boost':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.defenseBoost = (this.runBuffs.defenseBoost || 0) + eff.value;
                this.calcDerivedStats();
                resultMsg += `\n本局防御力+${eff.value}%！`;
                break;
            case 'speed_boost':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.speedBoost = (this.runBuffs.speedBoost || 0) + eff.value;
                this.calcDerivedStats();
                resultMsg += `\n本局先手值+${eff.value}！`;
                break;
            case 'all_boost':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.allBoost = (this.runBuffs.allBoost || 0) + eff.value;
                this.calcDerivedStats();
                resultMsg += `\n本局全属性+${eff.value}%！`;
                break;
            case 'gain_fragments':
                this.permanent.universalFragments[eff.quality] = (this.permanent.universalFragments[eff.quality] || 0) + eff.value;
                const qNames = {1:'普通',2:'稀有',3:'史诗',4:'传说',5:'神话'};
                resultMsg += `\n获得${eff.value}个${qNames[eff.quality] || ''}碎片！`;
                break;
            case 'exp_boost':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.expBoost = (this.runBuffs.expBoost || 0) + eff.value;
                resultMsg += `\n本局获得经验+${eff.value}%！`;
                break;
            case 'drop_boost':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.dropBoost = (this.runBuffs.dropBoost || 0) + eff.value;
                resultMsg += `\n本局碎片掉落+${eff.value}%！`;
                break;
            case 'gain_talent_points':
                this.permanent.talentPoints = (this.permanent.talentPoints || 0) + eff.value;
                this.savePermanent();
                resultMsg += `\n获得${eff.value}点天赋点（永久）！`;
                break;
            case 'revive':
                if (!this.runBuffs) this.runBuffs = {};
                this.runBuffs.reviveAvailable = true;
                this.runBuffs.revivePercent = eff.value;
                resultMsg += `\n死亡时将自动复活，恢复${eff.value}%生命（本局1次）！`;
                break;
            default:
                resultMsg += '\n（效果已记录）';
        }
        return resultMsg;
    },

    buyItem(itemId) {
        const shop = this.data.shop;
        if (!shop || !shop.consumables) return;
        const item = shop.consumables.find(x => x.id === itemId);
        if (!item) return;

        // 初始化本局购买记录
        if (!this.shopPurchaseCount) this.shopPurchaseCount = {};
        const limit = item.limitPerRun || 99;
        const purchased = this.shopPurchaseCount[item.id] || 0;
        if (purchased >= limit) { this.showGameAlert("提示", `该商品每局限购${limit}个，已售罄`); return; }

        let price = item.price ? item.price.amount : 10;
        const currency = item.price ? item.price.currency : 'gold';
        
        // 游商8折优惠
        if (this.merchantMode) {
            price = Math.floor(price * 0.8);
        }

        // 检查并扣除货币
        if (currency === 'gold') {
            if (this.player.gold < price) { this.showGameAlert('提示', '基因精华不足'); return; }
            this.player.gold -= price;
        } else {
            const q = parseInt(currency.replace('fragments_', ''));
            if ((this.permanent.universalFragments[q] || 0) < price) { this.showGameAlert('提示', '碎片不足'); return; }
            this.permanent.universalFragments[q] -= price;
        }

        // 记录购买
        this.shopPurchaseCount[item.id] = purchased + 1;

        // 存入背包（不立即使用）
        if (!this.player.items) this.player.items = [];
        this.player.items.push(item.id);

        const resultMsg = `购买了【${item.name}】，已存入背包！\n当前背包：${this.player.items.length}个物品`;

        // 用游戏内弹窗显示结果
        this.showPopup(`<h3 style="color:var(--accent-success)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"20 6 9 17 4 12\"/></svg> 购买成功</h3><p style="color:var(--text-secondary);line-height:1.8;white-space:pre-line">${resultMsg}</p><div style="display:flex;gap:10px;margin-top:15px"><button onclick="game.openShop()" style="flex:1;padding:10px;border-radius:6px">继续购物</button><button onclick="game.openInventory()" style="flex:1;padding:10px;border-radius:6px;background:var(--accent-success);color:white">打开背包</button></div>`);
        this.savePermanent();
        this.refreshMainUI();
    },

    // 打开背包（独立页面）
    openInventory() {
        this.closePop();
        const items = this.player.items || [];
        const shop = this.data.shop;
        const consumables = shop ? (shop.consumables || []) : [];

        let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
        html += '<h3 style="margin:0;color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"/><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg> 背包</h3>';
        html += '<button onclick="game.goBack()" style="padding:6px 14px;font-size:12px;background:var(--text-faint);color:var(--text-primary);border:none;border-radius:4px;cursor:pointer"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg> 关闭</button>';
        html += '</div>';
        
        // 战斗中打开背包时，添加"返回战斗"按钮
        if (this.inBattle) {
            html += '<div style="margin-bottom:15px;padding:10px;background:var(--bg-card);border-radius:8px;border-left:3px solid var(--accent-success);display:flex;justify-content:space-between;align-items:center">';
            html += '<span style="color:var(--accent-success);font-size:13px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>️ 战斗中 - 使用物品后请返回战斗</span>';
            html += '<button onclick="game.showScreen(\'battleScreen\')" style="padding:8px 16px;font-size:13px;font-weight:bold;background:var(--accent-success);color:white;border-radius:6px;border:none;cursor:pointer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> 返回战斗</button>';
            html += '</div>';
        }

        // 消耗品
        html += '<div style="margin-bottom:15px">';
        html += '<div style="color:var(--accent-success);font-size:14px;font-weight:bold;margin-bottom:8px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10 2v7.31\"/><path d=\"M14 9.3V1.99\"/><path d=\"M8.5 2h7\"/><path d=\"M14 9.3a6.5 6.5 0 1 1-4 0\"/></svg> 消耗品（' + items.length + '）</div>';

        if (items.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:20px">背包空空如也，去商店购买吧！</div>';
        } else {
            // 统计物品数量
            const itemCounts = {};
            items.forEach(id => { itemCounts[id] = (itemCounts[id] || 0) + 1; });

            html += '<div style="display:grid;grid-template-columns:1fr;gap:8px">';
            Object.keys(itemCounts).forEach(id => {
                const item = consumables.find(x => x.id === id);
                if (!item) return;
                const count = itemCounts[id];
                const eff = item.effect || {};
                // 生成效果描述
                let effectDesc = '';
                switch(eff.type) {
                    case 'heal_percent': effectDesc = `恢复${eff.value}%最大生命`; break;
                    case 'energy_percent': effectDesc = `恢复${eff.value}%最大能量`; break;
                    case 'full_restore': effectDesc = '生命和能量完全恢复'; break;
                    case 'attack_boost': effectDesc = `本局攻击力+${eff.value}%`; break;
                    case 'defense_boost': effectDesc = `本局防御力+${eff.value}%`; break;
                    case 'speed_boost': effectDesc = `本局先手值+${eff.value}`; break;
                    case 'all_boost': effectDesc = `本局全属性+${eff.value}%`; break;
                    case 'gain_fragments': effectDesc = `获得${eff.value}个碎片`; break;
                    case 'exp_boost': effectDesc = `本局经验+${eff.value}%`; break;
                    case 'drop_boost': effectDesc = `本局掉落+${eff.value}%`; break;
                    case 'gain_talent_points': effectDesc = `获得${eff.value}天赋点`; break;
                    case 'revive': effectDesc = `死亡复活（${eff.value}%生命）`; break;
                    default: effectDesc = '特殊效果';
                }

                html += '<div style="background:var(--bg-card);padding:10px;border-radius:8px;border:1px solid var(--border-primary);display:flex;justify-content:space-between;align-items:center">';
                html += '<div style="flex:1">';
                html += `<div style="color:var(--text-primary);font-size:14px;font-weight:bold">${item.icon || '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10 2v7.31\"/><path d=\"M14 9.3V1.99\"/><path d=\"M8.5 2h7\"/><path d=\"M14 9.3a6.5 6.5 0 1 1-4 0\"/></svg>'} ${item.name} <span style="color:var(--accent-success);font-size:12px">×${count}</span></div>`;
                html += `<div style="color:var(--text-secondary);font-size:12px;margin-top:3px">${effectDesc}</div>`;
                if (item.description) html += `<div style="color:var(--text-faint);font-size:11px;margin-top:2px;font-style:italic">${item.description}</div>`;
                html += '</div>';
                html += `<button onclick="game.useInventoryItem('${item.id}')" style="padding:8px 16px;border-radius:6px;font-size:13px;font-weight:bold;background:var(--accent-success);color:white;white-space:nowrap">使用</button>`;
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';

        // 共生体（简要显示，详细管理在共生体面板）
        const symbionts = this.permanent.symbionts || [];
        if (symbionts.length > 0) {
            html += '<div style="margin-bottom:15px">';
            html += '<div style="color:var(--accent-purple);font-size:14px;font-weight:bold;margin-bottom:8px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg> 共生体（' + symbionts.length + '）</div>';
            html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
            symbionts.forEach((s, idx) => {
                const equipped = s.equipped ? '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"20 6 9 17 4 12\"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>';
                html += `<div style="background:var(--bg-card);padding:8px;border-radius:6px;font-size:12px;color:var(--text-muted)">${equipped} ${s.name || '共生体'}</div>`;
            });
            html += '</div>';
            html += `<button onclick="game.openSymbiontPanel()" style="margin-top:8px;width:100%;padding:8px;border-radius:6px;font-size:13px">管理共生体</button>`;
            html += '</div>';
        }

        // Boss核心（显示具体每个Boss核心的名称和数量）
        const bossCores = this.permanent.bossCores || {};
        const coreCount = Object.values(bossCores).reduce((a, b) => a + b, 0);
        if (coreCount > 0) {
            html += '<div style="margin-bottom:15px">';
            html += '<div style="color:var(--accent-danger);font-size:14px;font-weight:bold;margin-bottom:8px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 3h12l4 6-10 13L2 9z\"/><path d=\"M11 3 8 9l4 13 4-13-3-6\"/><path d=\"M2 9h20\"/></svg> Boss核心（' + coreCount + '）</div>';
            html += '<div style="color:var(--text-secondary);font-size:12px;margin-bottom:8px">用于解锁神话天赋和高级合成</div>';
            // 显示具体每个Boss核心
            html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
            const allEnemies = this.data.enemies ? (this.data.enemies.enemies || this.data.enemies) : [];
            for (let bossId in bossCores) {
                const count = bossCores[bossId];
                if (count <= 0) continue;
                const bossData = allEnemies.find(e => e.id === bossId);
                const bossName = bossData ? bossData.name : bossId;
                const bossDesc = bossData ? (bossData.description || '') : '';
                html += '<div style="background:var(--bg-card);padding:8px;border-radius:6px;border-left:3px solid var(--accent-danger)" title="' + bossDesc + '">';
                html += '<div style="display:flex;justify-content:space-between;align-items:center">';
                html += '<span style="color:var(--text-primary);font-size:12px;font-weight:bold">' + bossName + '</span>';
                html += '<span style="color:var(--accent-danger);font-size:13px;font-weight:bold">×' + count + '</span>';
                html += '</div>';
                if (bossDesc) html += '<div style="color:var(--text-faint);font-size:10px;margin-top:2px;line-height:1.3">' + bossDesc.substring(0, 30) + (bossDesc.length > 30 ? '...' : '') + '</div>';
                html += '</div>';
            }
            html += '</div>';
            html += '</div>';
        }
        
        // 基因碎片管理（按品质+体系分类）
        html += '<div style="margin-bottom:15px">';
        html += '<div style="color:var(--accent-purple);font-size:14px;font-weight:bold;margin-bottom:8px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因碎片管理</div>';
        html += '<div style="background:rgba(0,30,25,0.5);border-radius:8px;padding:12px;border:1px solid rgba(0,229,176,0.15)">';
        
        // 按品质显示
        for (let q=1; q<=5; q++) {
            let exclusiveTotal = 0;
            let universalCount = this.permanent.universalFragments ? (this.permanent.universalFragments[q] || 0) : 0;
            let tagDetails = [];
            if (this.permanent.tagFragments) {
                for (let tag in this.permanent.tagFragments) {
                    const count = this.permanent.tagFragments[tag][q] || 0;
                    if (count > 0) {
                        exclusiveTotal += count;
                        tagDetails.push({tag: parseInt(tag), name: this.tagNames[tag] || ('标签'+tag), count: count});
                    }
                }
            }
            const total = exclusiveTotal + universalCount;
            if (total === 0) continue;
            
            html += '<div style="margin-bottom:12px;padding:8px;background:rgba(0,0,0,0.2);border-radius:6px">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
            html += '<span style="color:' + this.qualityColors[q] + ';font-weight:bold;font-size:13px">' + this.qualityNames[q] + '碎片</span>';
            html += '<span style="color:' + this.qualityColors[q] + ';font-size:14px;font-weight:bold">总数：' + total + '</span>';
            html += '</div>';
            
            // 体系专属碎片详情
            if (tagDetails.length > 0) {
                html += '<div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">专属碎片（' + exclusiveTotal + '个）：</div>';
                html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px">';
                tagDetails.forEach(td => {
                    html += '<span style="font-size:10px;padding:2px 6px;background:rgba(0,229,176,0.1);border-radius:3px;color:var(--accent-success)">' + td.name + '：' + td.count + '</span>';
                });
                html += '</div>';
            }
            
            // 万能碎片
            html += '<div style="font-size:11px;color:var(--text-muted)">万能碎片：<span style="color:var(--accent-warning)">' + universalCount + '个</span>（可用于任意体系）</div>';
            html += '</div>';
        }
        
        // 碎片操作按钮
        html += '<div style="display:flex;gap:8px;margin-top:10px">';
        html += '<button onclick="game.openFragmentManager()" style="flex:1;padding:8px;border-radius:6px;font-size:12px;background:var(--text-faint);color:var(--text-secondary)">碎片合成/兑换</button>';
        html += '</div>';
        
        html += '<div style="margin-top:8px;font-size:10px;color:var(--text-faint);line-height:1.5">';
        html += '<p><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 解锁天赋时优先消耗对应体系的专属碎片，专属不足时自动使用万能碎片</p>';
        html += '</div>';
        html += '</div></div>';

        // 渲染到独立页面
        const contentDiv = document.getElementById('inventoryScreenContent');
        if (contentDiv) {
            contentDiv.innerHTML = html;
        }
        this.showScreen('inventoryScreen');
    },

    // 人物状态界面当前标签页
    characterTab: 'status',

    // 打开人物状态界面
    openCharacterPanel() {
        this.closePop();
        if (!this.characterTab) this.characterTab = 'status';
        this.updateBottomNav('character');
        this.showScreen('characterScreen');
        this.renderCharacterPanel();
    },

    // 切换人物状态界面标签页
    setCharacterTab(tab) {
        this.characterTab = tab;
        this.renderCharacterPanel();
    },

    // 渲染人物状态界面
    renderCharacterPanel() {
        const contentDiv = document.getElementById('characterContent');
        if (!contentDiv) return;

        // 更新标签页按钮样式
        const tabs = ['status', 'equipment', 'talents', 'skills', 'inventory'];
        tabs.forEach(tab => {
            const btn = document.getElementById('charTab' + tab.charAt(0).toUpperCase() + tab.slice(1));
            if (btn) {
                if (this.characterTab === tab) {
                    btn.style.background = 'var(--accent-primary)';
                    btn.style.color = 'var(--text-primary)';
                    btn.style.fontWeight = 'bold';
                } else {
                    btn.style.background = 'var(--bg-card)';
                    btn.style.color = 'var(--text-secondary)';
                    btn.style.fontWeight = 'normal';
                }
            }
        });

        let html = '';
        switch (this.characterTab) {
            case 'status':
                html = this.renderCharacterStatus();
                break;
            case 'equipment':
                html = this.renderCharacterEquipment();
                break;
            case 'talents':
                html = this.renderCharacterTalents();
                break;
            case 'skills':
                html = this.renderCharacterSkills();
                break;
            case 'inventory':
                html = this.renderCharacterInventory();
                break;
        }
        contentDiv.innerHTML = html;
    },

    // 渲染人物状态-状态标签页
    renderCharacterStatus() {
        const p = this.player;
        // 先计算衍生属性（直接修改p）
        if (this.calcDerivedStats) this.calcDerivedStats();
        
        // 属性tooltip说明
        const attrTips = {
            level: '等级：提升等级可以获得属性点和天赋点',
            exp: '经验：击杀敌人和完成事件可以获得经验',
            hp: '生命：生命值归零则死亡，进入轮回空间',
            energy: '能量：释放主动技能需要消耗能量，每回合自动恢复',
            strength: '力量：每点力量+2攻击力',
            agility: '敏捷：每点敏捷+1先手值，影响闪避率',
            vitality: '体质：每点体质+8最大生命+0.4防御力',
            perception: '感知：每点感知+0.8暴击率+0.2命中率',
            evolution: '进化：每点进化+5能量上限+0.5% Dot伤害+0.2%技能冷却缩减',
            attack: '攻击力：决定物理伤害的基础值',
            defense: '防御力：减少受到的物理伤害',
            crit: '暴击率：攻击时触发暴击的概率',
            critDamage: '暴击伤害：暴击时造成的伤害倍率（默认150%）',
            hit: '命中率：攻击命中敌人的概率，受敌人敏捷影响',
            dodgeRate: '闪避率（基础）：躲避敌人攻击的概率\n主界面显示基础闪避（天赋/共生体加成）\n战斗中显示实际闪避（受双方敏捷差值影响）\n公式：60×(1-e^(-0.05×(防御者敏捷-攻击者敏捷)))，上限60%',
            speed: '先手值：决定战斗中谁先出手'
        };
        
        // 生成带tooltip的属性名
        const tip = (key, name) => '<span style="cursor:help;border-bottom:1px dotted var(--text-faint);color:var(--text-secondary)" data-tooltip="' + key + '" onmouseenter="game.showAttrTooltip(event, \'' + key + '\')" onmouseleave="game.hideAttrTooltip()">' + name + '</span>';
        
        let html = '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> 基本信息</h3>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">';
        html += '<div><span style="color:var(--text-muted)">' + tip('level', '等级') + '：</span><span style="color:var(--text-primary)">' + (p.level || 1) + '</span></div>';
        html += '<div><span style="color:var(--text-muted)">' + tip('exp', '经验') + '：</span><span style="color:var(--text-primary)">' + (p.exp || 0) + '/' + (p.expToNext || 20) + '</span></div>';
        html += '<div><span style="color:var(--text-muted)">' + tip('hp', '生命') + '：</span><span style="color:var(--accent-success)">' + Math.floor(p.hp || 0) + '/' + Math.floor(p.maxHp || 0) + '</span></div>';
        html += '<div><span style="color:var(--text-muted)">' + tip('energy', '能量') + '：</span><span style="color:var(--accent-info)">' + Math.floor(p.energy || 0) + '/' + Math.floor(p.maxEnergy || 0) + '</span></div>';
        html += '</div></div>';

        // 槽位扩充信息
        const passiveSlots = this.getPassiveSlots();
        const activeSlots = this.getActiveSlots();
        const equippedTalents = p.equippedTalents || [];
        const totalSpent = Object.values(this.permanent.talentLevels || {}).reduce((sum, lv) => {
            const costs = [2, 4, 7, 11, 16];
            for (let i = 0; i < lv - 1; i++) sum += costs[i] || 2;
            return sum;
        }, 0);
        const essence = this.permanent.essence || 0;
        const talentSlotFromPoints = Math.floor(totalSpent / 20);
        const talentSlotFromEssence = Math.floor(essence / 50);
        const nextPointSlot = (talentSlotFromPoints + 1) * 20;
        const nextEssenceSlot = (talentSlotFromEssence + 1) * 50;
        
        html += '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> 槽位扩充</h3>';
        
        // 天赋槽（混合模式）
        const passiveAuto = this.getPassiveSlotAutoProgress();
        const passiveManual = this.getPassiveSlotManualProgress();
        html += '<div style="margin-bottom:12px;padding:10px;background:var(--bg-secondary);border-radius:6px;border-left:3px solid var(--accent-success)">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        html += '<span style="color:var(--accent-success);font-weight:bold;font-size:13px">天赋槽（被动）：' + equippedTalents.length + '/' + passiveSlots + '</span>';
        html += '<span style="color:var(--text-faint);font-size:11px">初始4 + 自动' + passiveAuto.autoSlots + ' + 手动' + passiveManual.manualSlots + '</span>';
        html += '</div>';
        html += '<div style="font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:8px">';
        if (passiveAuto.isMaxAuto) {
            html += '<div style="color:var(--accent-success)">自动扩充：已达上限（' + passiveAuto.autoSlots + '/' + passiveAuto.maxAutoSlots + '）</div>';
        } else {
            html += '<div>自动扩充：已花天赋点' + passiveAuto.totalSpent + ' / ' + passiveAuto.nextAutoSlot + '（再花' + passiveAuto.remainingToNext + '点+1槽，上限' + passiveAuto.maxAutoSlots + '）</div>';
        }
        html += '</div>';
        // 手动扩充按钮
        if (passiveManual.isMaxManual) {
            html += '<div style="text-align:center;padding:6px;background:var(--bg-primary);border-radius:4px;font-size:11px;color:var(--text-faint)">手动扩充已达上限（' + passiveManual.manualSlots + '/' + passiveManual.maxManualSlots + '）</div>';
        } else {
            html += '<button onclick="game.expandPassiveSlot();game.renderCharacterPanel();" style="width:100%;padding:8px;font-size:12px;background:' + (passiveManual.canAfford ? 'var(--accent-success)' : 'var(--text-faint)') + ';color:white;border:none;border-radius:4px;cursor:' + (passiveManual.canAfford ? 'pointer' : 'not-allowed') + ';font-weight:bold">';
            html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 手动扩充（消耗' + passiveManual.cost + '精粹，当前' + passiveManual.essence + '）</button>';
        }
        html += '</div>';
        
        // 技能槽（混合模式）
        const activeAuto = this.getActiveSlotAutoProgress();
        const activeManual = this.getActiveSlotManualProgress();
        html += '<div style="padding:10px;background:var(--bg-secondary);border-radius:6px;border-left:3px solid var(--accent-info)">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
        html += '<span style="color:var(--accent-info);font-weight:bold;font-size:13px">技能槽（主动）：' + activeSlots + '/6</span>';
        html += '<span style="color:var(--text-faint);font-size:11px">初始3 + 自动' + activeAuto.autoSlots + ' + 手动' + activeManual.manualSlots + '</span>';
        html += '</div>';
        html += '<div style="font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:8px">';
        if (activeAuto.isMaxAuto) {
            html += '<div style="color:var(--accent-success)">自动扩充：已达上限（' + activeAuto.autoSlots + '/' + activeAuto.maxAutoSlots + '）</div>';
        } else {
            html += '<div>自动扩充：当前等级' + activeAuto.level + ' / ' + activeAuto.nextLevel + '（再升' + activeAuto.remainingToNext + '级+1槽，上限' + activeAuto.maxAutoSlots + '）</div>';
        }
        html += '<div style="color:var(--accent-warning);margin-top:2px">默认3个基础技能不占槽，始终可用</div>';
        html += '</div>';
        // 手动扩充按钮
        if (activeManual.isMaxManual) {
            html += '<div style="text-align:center;padding:6px;background:var(--bg-primary);border-radius:4px;font-size:11px;color:var(--text-faint)">手动扩充已达上限（' + activeManual.manualSlots + '/' + activeManual.maxManualSlots + '）</div>';
        } else {
            html += '<button onclick="game.expandActiveSlot();game.renderCharacterPanel();" style="width:100%;padding:8px;font-size:12px;background:' + (activeManual.canAfford ? 'var(--accent-info)' : 'var(--text-faint)') + ';color:white;border:none;border-radius:4px;cursor:' + (activeManual.canAfford ? 'pointer' : 'not-allowed') + ';font-weight:bold">';
            html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 手动扩充（消耗' + activeManual.cost + '精粹，当前' + activeManual.essence + '）</button>';
        }
        html += '</div>';
        
        html += '<div style="margin-top:8px;font-size:11px;color:var(--text-faint);text-align:center">槽位满足条件后自动扩充，无需手动操作</div>';
        html += '</div>';

        // 计算永久成长值（来自bonusStats和essenceUpgrades）
        const b = this.permanent.bonusStats;
        const eu = this.permanent.essenceUpgrades || {};
        const permanentStats = {
            strength: b.strength + (eu.strength || 0) * 0.03 * 6,
            agility: b.agility + (eu.agility || 0) * 0.03 * 6,
            vitality: b.vitality + (eu.vitality || 0) * 0.03 * 6,
            perception: b.perception + (eu.perception || 0) * 0.03 * 6,
            evolution: b.evolution + (eu.evolution || 0) * 0.03 * 6
        };
        
        html += '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M18 3a3 3 0 0 0-3 3v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 0-6 0v9a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6V8a3 3 0 0 1 3-3 3 3 0 0 0-3-3z\"/></svg> 基础属性 <span style="font-size:11px;color:var(--text-muted);font-weight:normal">（基础 + 永久成长）</span></h3>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">';
        
        // 生成带永久成长值的属性显示
        const statDisplay = (key, label, color, value) => {
            const perm = Math.floor(permanentStats[key] * 10) / 10;
            const base = Math.floor((value - perm) * 10) / 10;
            const permText = perm > 0 ? `<span style="color:var(--accent-primary);font-size:11px">+${perm}永久</span>` : '';
            return `<div><span style="color:${color}">` + tip(key, label) + `：</span><span style="color:var(--text-primary)">${value}</span> ${permText}</div>`;
        };
        
        html += statDisplay('strength', '力量', 'var(--accent-warning)', p.strength || 0);
        html += statDisplay('agility', '敏捷', 'var(--accent-success)', p.agility || 0);
        html += statDisplay('vitality', '体质', 'var(--accent-danger)', p.vitality || 0);
        html += statDisplay('perception', '感知', 'var(--accent-purple)', p.perception || 0);
        html += statDisplay('evolution', '进化', 'var(--accent-info)', p.evolution || 0);
        html += '</div></div>';

        // 计算战斗属性的永久成长值
        const permAttack = Math.floor(permanentStats.strength * 2);
        const permDefense = Math.floor(permanentStats.vitality * 0.4 * 10) / 10;
        const permHp = Math.floor(permanentStats.vitality * 8 + (eu.hp || 0) * 0.02 * 100);
        const permSpeed = Math.floor(permanentStats.agility);
        const permCrit = Math.floor(permanentStats.perception * 0.8 * 10) / 10;
        
        html += '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>️ 战斗属性 <span style="font-size:11px;color:var(--text-muted);font-weight:normal">（基础 + 永久成长）</span></h3>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">';
        
        const combatStatDisplay = (key, label, value, unit, permValue) => {
            const permText = permValue > 0 ? `<span style="color:var(--accent-primary);font-size:11px">+${permValue}${unit}永久</span>` : '';
            return `<div><span style="color:var(--text-muted)">` + tip(key, label) + `：</span><span style="color:var(--text-primary)">${value}${unit}</span> ${permText}</div>`;
        };
        
        html += combatStatDisplay('attack', '攻击力', Math.floor(p.attack || 0), '', permAttack);
        html += combatStatDisplay('defense', '防御力', Math.floor(p.defense || 0), '', permDefense);
        html += combatStatDisplay('crit', '暴击率', Math.floor(p.crit || 0), '%', permCrit);
        html += '<div><span style="color:var(--text-muted)">' + tip('critDamage', '暴击伤害') + '：</span><span style="color:var(--accent-warning)">' + Math.floor(p.critDamage || 150) + '%</span></div>';
        html += '<div><span style="color:var(--text-muted)">' + tip('hit', '命中率') + '：</span><span style="color:var(--accent-success)">' + Math.floor(p.hit || 90) + '%</span></div>';
        html += '<div><span style="color:var(--text-muted)">' + tip('dodgeRate', '闪避率') + '：</span><span style="color:var(--accent-info)">' + Math.floor(p.dodgeRate || 0) + '%</span></div>';
        html += combatStatDisplay('speed', '先手值', Math.floor(p.speed || 0), '', permSpeed);
        html += '</div></div>';

        return html;
    },

    // 显示属性tooltip（详细版，和主界面一致）
    showAttrTooltip(event, key) {
        // Toggle逻辑：如果当前显示的是同一个key的tooltip，就关闭它
        if (this._currentAttrTooltipKey === key) {
            this.hideAttrTooltip();
            this._currentAttrTooltipKey = null;
            return;
        }
        this._currentAttrTooltipKey = key;
        
        const attrDetail = {
            level: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> 等级',
                sections: [
                    { label: '类型', value: '角色等级' },
                    { label: '提升方式', value: '获得经验值升级' },
                    { label: '升级奖励', value: '获得属性点和天赋点' },
                    { label: '说明', value: '等级越高，可解锁的天赋和技能越多。' }
                ]
            },
            exp: {
                title: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 经验值',
                sections: [
                    { label: '类型', value: '升级资源' },
                    { label: '获取方式', value: '击杀敌人、完成随机事件' },
                    { label: '说明', value: '经验值满后自动升级，获得属性点和天赋点。' }
                ]
            },
            hp: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg> 生命值',
                sections: [
                    { label: '类型', value: '生存属性' },
                    { label: '计算公式', value: '60 + 体质×8 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '生命值归零则死亡，进入轮回空间。战斗之间恢复20%最大生命。' }
                ]
            },
            energy: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 能量值',
                sections: [
                    { label: '类型', value: '技能资源' },
                    { label: '计算公式', value: '100 + 进化×5 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '释放主动技能需要消耗能量，每回合自动恢复10+进化×0.5点能量。' }
                ]
            },
            strength: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M18 3a3 3 0 0 0-3 3v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 0-6 0v9a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6V8a3 3 0 0 1 3-3 3 3 0 0 0-3-3z\"/></svg> 力量',
                sections: [
                    { label: '类型', value: '基础属性' },
                    { label: '效果', value: '每点力量+2攻击力' },
                    { label: '说明', value: '力量决定物理伤害的基础值，适合近战和物理输出流派。' }
                ]
            },
            agility: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"13\" cy=\"4\" r=\"2\"/><path d=\"M4 22v-2a4 4 0 0 1 4-4h1\"/><path d=\"M11 22v-1a4 4 0 0 1 4-4h2\"/><path d=\"M13 10l-2 5 3 2\"/><path d=\"M9 10l2-3 3 1\"/></svg> 敏捷',
                sections: [
                    { label: '类型', value: '基础属性' },
                    { label: '效果', value: '每点敏捷+1先手值，影响闪避率' },
                    { label: '说明', value: '敏捷决定战斗中谁先出手，以及躲避敌人攻击的概率。' }
                ]
            },
            vitality: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg> 体质',
                sections: [
                    { label: '类型', value: '基础属性' },
                    { label: '效果', value: '每点体质+8最大生命+0.4防御力' },
                    { label: '说明', value: '体质决定生存能力，适合坦克和续航流派。' }
                ]
            },
            perception: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg> 感知',
                sections: [
                    { label: '类型', value: '基础属性' },
                    { label: '效果', value: '每点感知+0.8暴击率+0.2命中率' },
                    { label: '说明', value: '感知决定暴击和命中，适合暴击输出和控制流派。' }
                ]
            },
            evolution: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 进化',
                sections: [
                    { label: '类型', value: '核心属性' },
                    { label: '效果', value: '每点进化+5能量上限+0.5% Dot伤害+0.2%技能冷却缩减' },
                    { label: '说明', value: '进化是游戏的核心属性，决定能量、Dot伤害和技能效率，适合技能和Dot流派。' }
                ]
            },
            attack: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg> 攻击力',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '力量×2 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '攻击力决定物理伤害的基础值，实际伤害还受敌人防御力和暴击影响。' }
                ]
            },
            defense: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg> 防御力',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '体质×0.4 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '防御力减少受到的物理伤害，实际减伤公式：伤害×(100/(100+防御))。' }
                ]
            },
            crit: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2l2 4 4-2-1 5 5 1-4 3 2 5-5-2-2 4-2-4-5 2 2-5-4-3 5-1-1-5 4 2z\"/></svg> 暴击率',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '5 + 感知×0.8 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '攻击时触发暴击的概率，暴击时造成暴击伤害倍率的伤害（默认150%）。' }
                ]
            },
            critDamage: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/></svg> 暴击伤害',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '150 + max(0, 暴击率-100)/2 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '暴击时造成的伤害倍率，默认150%。暴击率超过100%后，每2点暴击率+1%暴击伤害。' }
                ]
            },
            hit: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg> 命中率',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '85 + 感知/5 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '攻击命中敌人的概率，实际命中率还受敌人敏捷影响（敌人敏捷越高越难命中）。' }
                ]
            },
            dodgeRate: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2\"/><path d=\"M9.6 4.6A2 2 0 1 1 11 8H2\"/><path d=\"M12.6 19.4A2 2 0 1 0 14 16H2\"/></svg> 闪避率',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '天赋加成 + 共生体加成（基础0%）' },
                    { label: '说明', value: '躲避敌人攻击的概率，实际闪避率受敏捷差值影响（防御者敏捷>攻击者敏捷时获得额外闪避）。' }
                ]
            },
            speed: {
                title: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 先手值',
                sections: [
                    { label: '类型', value: '战斗属性' },
                    { label: '计算公式', value: '敏捷×1 + 天赋加成 + 共生体加成' },
                    { label: '说明', value: '决定战斗中谁先出手，先手值高的一方先攻击。战斗开始时比较一次，之后固定轮流行动。' }
                ]
            }
        };
        
        const detail = attrDetail[key];
        if (!detail) {
            this.hideAttrTooltip();
            return;
        }
        
        // 移除旧的tooltip
        const oldTooltip = document.getElementById('attrTooltip');
        if (oldTooltip) oldTooltip.remove();
        
        // 创建新的tooltip（详细版，和主界面一致）
        const tooltip = document.createElement('div');
        tooltip.id = 'attrTooltip';
        tooltip.style.cssText = 'position:fixed;background:var(--bg-card);color:var(--text-primary);padding:0;border-radius:10px;border:1px solid var(--accent-primary);font-size:13px;z-index:99999;max-width:280px;box-shadow:0 4px 20px rgba(0,0,0,0.8);pointer-events:none;overflow:hidden;';
        
        let html = '<div style="background:linear-gradient(135deg,var(--accent-primary)22,var(--accent-primary)11);padding:10px 14px;border-bottom:1px solid var(--accent-primary)44;font-weight:bold;font-size:14px;color:var(--accent-primary)">' + detail.title + '</div>';
        html += '<div style="padding:10px 14px">';
        detail.sections.forEach(section => {
            html += '<div style="margin-bottom:6px;line-height:1.5">';
            html += '<span style="color:var(--text-muted);font-size:11px">' + section.label + '：</span>';
            html += '<span style="color:var(--text-secondary);font-size:12px;margin-left:4px">' + section.value + '</span>';
            html += '</div>';
        });
        html += '</div>';
        
        tooltip.innerHTML = html;
        document.body.appendChild(tooltip);
        
        // 定位tooltip（在点击位置上方显示）
        const x = event.clientX;
        const y = event.clientY;
        const tooltipWidth = tooltip.offsetWidth || 280;
        const tooltipHeight = tooltip.offsetHeight || 150;
        
        let left = x - tooltipWidth / 2;
        let top = y - tooltipHeight - 10;
        
        // 防止超出屏幕
        if (left < 10) left = 10;
        if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
        if (top < 10) top = y + 20;
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'block';
    },

    // 隐藏属性tooltip
    hideAttrTooltip() {
        const tooltip = document.getElementById('attrTooltip');
        if (tooltip) tooltip.remove();
        clearTimeout(this._attrTooltipTimer);
        this._currentAttrTooltipKey = null;
    },

    // 渲染人物状态-装备标签页（显示所有共生体，包括未拥有的）
    renderCharacterEquipment() {
        const symbiontIds = this.permanent.symbionts || [];
        const equippedSymbionts = this.permanent.equippedSymbionts || {};
        const allSymbiontsData = this.data.symbionts ? (this.data.symbionts.symbionts || this.data.symbionts) : [];
        const slotNames = {core: '核心', predator: '捕食', sensor: '感知', motor: '运动', energy: '能量', evolution: '进化'};
        const slotOrder = ['core', 'predator', 'sensor', 'motor', 'energy', 'evolution'];
        const qualityNames = ['', '普通', '稀有', '史诗', '传说', '神话'];
        const qualityColors = ['', 'var(--quality-common)', 'var(--quality-rare)', 'var(--quality-epic)', 'var(--accent-orange)', 'var(--accent-danger)'];
        
        let html = '';
        
        // 按部位分类显示所有共生体
        slotOrder.forEach(slot => {
            const slotSymbionts = allSymbiontsData.filter(s => s.slot === slot && (symbiontIds.includes(s.id) || equippedSymbionts[slot] === s.id));
            const equippedId = equippedSymbionts[slot];
            const equipped = equippedId ? allSymbiontsData.find(x => x.id === equippedId) : null;
            
            html += '<div class="box" style="margin-bottom:16px">';
            html += '<h3 style="margin-bottom:12px;color:' + qualityColors[1] + '"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/></svg> ' + (slotNames[slot] || slot) + 
                    (equipped ? ' <span style="font-size:12px;color:var(--accent-success)">（已装备：' + equipped.name + '）</span>' : ' <span style="font-size:12px;color:var(--text-faint)">（未装备）</span>') + 
                    '</h3>';
            
            if (slotSymbionts.length === 0) {
                html += '<div style="text-align:center;color:var(--text-faint);padding:12px;font-size:12px">该部位还没有共生体</div>';
            } else {
                html += '<div style="display:grid;grid-template-columns:1fr;gap:8px">';
                slotSymbionts.forEach(s => {
                    const owned = symbiontIds.includes(s.id) || equippedSymbionts[slot] === s.id;
                    const isEquipped = equippedSymbionts[slot] === s.id;
                    const stats = s.stats || {};
                    let statText = [];
                    const statNames = {maxHp:'生命', defense:'防御', attack:'攻击', speed:'先手值', crit:'暴击率', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', hit:'命中率', dodge:'闪避率', critDamage:'暴击伤害', energy:'能量', maxEnergy:'能量上限', energyRegen:'能量恢复', talentPower:'天赋强度', firstStrike:'先手值', hp:'生命', hpRegen:'生命恢复', dotDamage:'Dot伤害', cooldownReduction:'冷却缩减', armorPenetration:'护甲穿透', critResistance:'暴击抗性', lifeSteal:'吸血', reflectDamage:'反伤', shield:'护盾', thorns:'荆棘'};
                    for (let key in stats) {
                        if (stats[key]) statText.push((statNames[key] || key) + '+' + stats[key]);
                    }
                    
                    // 未拥有的共生体显示为灰色锁定状态
                    const bgColor = owned ? 'var(--bg-card)' : 'var(--bg-primary)';
                    const opacity = owned ? '1' : '0.5';
                    const borderColor = owned ? qualityColors[s.quality || 1] : 'var(--text-faint)';
                    const statusText = isEquipped ? '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"20 6 9 17 4 12\"/></svg> 已装备（点击卸下）' : (owned ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><rect x="3" y="3" width="18" height="18" rx="2"/></svg> 未装备（点击装备）' : '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg> 未获得');
                    const statusColor = isEquipped ? 'var(--accent-success)' : (owned ? 'var(--text-muted)' : 'var(--text-faint)');
                    const cursor = owned ? 'pointer' : 'not-allowed';
                    const onclick = owned ? 'onclick="game.toggleSymbiontEquipById(\'' + s.id + '\')"' : '';
                    
                    html += '<div style="background:' + bgColor + ';padding:10px;border-radius:8px;border-left:3px solid ' + borderColor + ';cursor:' + cursor + ';opacity:' + opacity + '" ' + onclick + '>';
                    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
                    html += '<span style="color:var(--text-primary);font-weight:bold;font-size:13px">' + (s.name || '共生体') + '</span>';
                    html += '<span style="font-size:11px;color:' + statusColor + '">' + statusText + '</span>';
                    html += '</div>';
                    html += '<div style="font-size:11px;color:' + qualityColors[s.quality || 1] + ';margin-bottom:4px">' + qualityNames[s.quality || 1] + '品质</div>';
                    if (statText.length > 0) html += '<div style="font-size:12px;color:var(--text-secondary)">' + statText.join('，') + '</div>';
                    if (s.special) {
                        const specialNames = {firstStrike:'先手值', first_strike:'先手值', talentPower:'天赋强度', talent_power:'天赋强度', energyRegen:'能量恢复', energy_regen:'能量恢复', hpRegen:'生命恢复', hp_regen:'生命恢复', lifeSteal:'吸血', life_steal:'吸血', reflectDamage:'反伤', reflect_damage:'反伤', critDamage:'暴击伤害', crit_damage:'暴击伤害', armorPenetration:'护甲穿透', armor_penetration:'护甲穿透', dotDamage:'Dot伤害', dot_damage:'Dot伤害', cooldownReduction:'冷却缩减', cooldown_reduction:'冷却缩减', shield:'护盾', dodge:'闪避率', dodgeBonus:'闪避加成', hit:'命中率', crit:'暴击率', attack:'攻击力', defense:'防御力', maxHp:'最大生命', maxEnergy:'能量上限', speed:'先手值', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', dotOnHit:'攻击附带Dot', bleedOnHit:'攻击附带流血', poisonOnHit:'攻击附带中毒', burnOnHit:'攻击附带灼烧', freezeOnHit:'攻击附带冰冻', stunOnHit:'攻击附带眩晕', paralyzeOnHit:'攻击附带麻痹', slowOnHit:'攻击附带减速', extraAttack:'额外攻击', extraAttackChance:'额外攻击概率', damagePct:'伤害百分比', damageReduction:'伤害减免', reflectPct:'反伤百分比', energyOnHit:'攻击回能', critChance:'暴击率', hpOnHit:'攻击回血', hpOnKill:'击杀回血', energyOnKill:'击杀回能', talentPointsOnKill:'击杀获得天赋点', fragmentsOnKill:'击杀获得碎片', expBonus:'经验加成', goldBonus:'金币加成', essenceBonus:'进化精粹加成', fragmentBonus:'碎片加成', talentPointBonus:'天赋点加成', allStats:'全属性', allResist:'全抗性', physicalResist:'物理抗性', fireResist:'火焰抗性', iceResist:'冰霜抗性', poisonResist:'毒素抗性', lightningResist:'雷电抗性', shadowResist:'暗影抗性', holyResist:'神圣抗性', arcaneResist:'奥术抗性', physicalPenetration:'物理穿透', firePenetration:'火焰穿透', icePenetration:'冰霜穿透', poisonPenetration:'毒素穿透', lightningPenetration:'雷电穿透', shadowPenetration:'暗影穿透', holyPenetration:'神圣穿透', arcanePenetration:'奥术穿透'};
                        const specialName = specialNames[s.special] || s.special;
                        html += '<div style="font-size:11px;color:var(--accent-warning);margin-top:4px">特殊：' + specialName + (s.specialValue ? ' +' + s.specialValue : '') + '</div>';
                    }
                    if (s.desc) html += '<div style="font-size:11px;color:var(--text-faint);margin-top:4px;font-style:italic">' + s.desc + '</div>';
                    html += '</div>';
                });
                html += '</div>';
            }
            html += '</div>';
        });
        
        return html;
    },
    toggleSymbiontEquipById(id) {
        const allSymbionts = this.data.symbionts ? (this.data.symbionts.symbionts || this.data.symbionts) : [];
        const s = allSymbionts.find(x => x.id === id);
        if (!s) return;
        
        const slot = s.slot;
        const equippedSymbionts = this.permanent.equippedSymbionts || {};
        const symbiontIds = this.permanent.symbionts || [];
        
        if (equippedSymbionts[slot] === id) {
            // 卸下：移到背包
            delete equippedSymbionts[slot];
            if (!symbiontIds.includes(id)) symbiontIds.push(id);
            this.permanent.equippedSymbionts = equippedSymbionts;
            this.permanent.symbionts = symbiontIds;
            this.savePermanent();
            this.renderCharacterPanel();
        } else if (equippedSymbionts[slot]) {
            // 该部位已有共生体，显示对比界面让玩家选择是否替换
            this.showSymbiontReplaceConfirm(id, equippedSymbionts[slot]);
        } else {
            // 直接装备
            this.doEquipSymbiont(id);
        }
    },
    
    // 执行装备共生体（内部函数）
    doEquipSymbiont(id) {
        const allSymbionts = this.data.symbionts ? (this.data.symbionts.symbionts || this.data.symbionts) : [];
        const s = allSymbionts.find(x => x.id === id);
        if (!s) return;
        
        const slot = s.slot;
        const equippedSymbionts = this.permanent.equippedSymbionts || {};
        const symbiontIds = this.permanent.symbionts || [];
        
        // 先卸下同部位的其他共生体
        const oldId = equippedSymbionts[slot];
        if (oldId && !symbiontIds.includes(oldId)) symbiontIds.push(oldId);
        // 从背包中移除
        const idx = symbiontIds.indexOf(id);
        if (idx >= 0) symbiontIds.splice(idx, 1);
        // 装备
        equippedSymbionts[slot] = id;
        
        this.permanent.equippedSymbionts = equippedSymbionts;
        this.permanent.symbionts = symbiontIds;
        this.savePermanent();
        this.renderCharacterPanel();
    },
    
    // 显示共生体替换确认界面（对比两个共生体的属性）
    showSymbiontReplaceConfirm(newId, oldId) {
        const allSymbionts = this.data.symbionts ? (this.data.symbionts.symbionts || this.data.symbionts) : [];
        const newSym = allSymbionts.find(x => x.id === newId);
        const oldSym = allSymbionts.find(x => x.id === oldId);
        if (!newSym || !oldSym) return;
        
        const qualityNames = ['', '普通', '稀有', '史诗', '传说', '神话'];
        const qualityColors = ['', 'var(--quality-common)', 'var(--accent-info)', 'var(--accent-purple)', 'var(--accent-orange)', 'var(--accent-danger)'];
        const statNames = {maxHp:'生命', defense:'防御', attack:'攻击', speed:'先手值', crit:'暴击率', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', hit:'命中率', dodge:'闪避率', critDamage:'暴击伤害', energy:'能量', maxEnergy:'能量上限', energyRegen:'能量恢复', talentPower:'天赋强度', firstStrike:'先手值', hp:'生命', hpRegen:'生命恢复', dotDamage:'Dot伤害', cooldownReduction:'冷却缩减', armorPenetration:'护甲穿透', critResistance:'暴击抗性', lifeSteal:'吸血', reflectDamage:'反伤', shield:'护盾', thorns:'荆棘'};
        const specialNames = {
            firstStrike:'先手值', first_strike:'先手值', talentPower:'天赋强度', talent_power:'天赋强度',
            energyRegen:'能量恢复', energy_regen:'能量恢复', hpRegen:'生命恢复', hp_regen:'生命恢复',
            lifeSteal:'吸血', life_steal:'吸血', reflectDamage:'反伤', reflect_damage:'反伤',
            critDamage:'暴击伤害', crit_damage:'暴击伤害', armorPenetration:'护甲穿透', armor_penetration:'护甲穿透',
            dotDamage:'Dot伤害', dot_damage:'Dot伤害', cooldownReduction:'冷却缩减', cooldown_reduction:'冷却缩减',
            shield:'护盾', dodge:'闪避率', dodgeBonus:'闪避加成', hit:'命中率', crit:'暴击率',
            attack:'攻击力', defense:'防御力', maxHp:'最大生命', maxEnergy:'能量上限', speed:'先手值',
            extraAttack:'额外攻击', extraAttackChance:'额外攻击概率', damagePct:'伤害百分比',
            damageReduction:'伤害减免', reflectPct:'反伤百分比', energyOnHit:'攻击回能',
            critChance:'暴击率', hpOnHit:'攻击回血', hpOnKill:'击杀回血', energyOnKill:'击杀回能',
            talentPointsOnKill:'击杀获得天赋点', fragmentsOnKill:'击杀获得碎片',
            expBonus:'经验加成', goldBonus:'金币加成', essenceBonus:'进化精粹加成',
            fragmentBonus:'碎片加成', talentPointBonus:'天赋点加成', allStats:'全属性',
            allResist:'全抗性', physicalResist:'物理抗性', fireResist:'火焰抗性',
            iceResist:'冰霜抗性', poisonResist:'毒素抗性', lightningResist:'雷电抗性',
            shadowResist:'暗影抗性', holyResist:'神圣抗性', arcaneResist:'奥术抗性',
            physicalPenetration:'物理穿透', firePenetration:'火焰穿透', icePenetration:'冰霜穿透',
            poisonPenetration:'毒素穿透', lightningPenetration:'雷电穿透', shadowPenetration:'暗影穿透',
            holyPenetration:'神圣穿透', arcanePenetration:'奥术穿透',
            dotOnHit:'攻击附带Dot', bleedOnHit:'攻击附带流血', poisonOnHit:'攻击附带中毒',
            burnOnHit:'攻击附带灼烧', freezeOnHit:'攻击附带冰冻', stunOnHit:'攻击附带眩晕',
            paralyzeOnHit:'攻击附带麻痹', slowOnHit:'攻击附带减速',
            agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化',
            critResistance:'暴击抗性', thorns:'荆棘', healMod:'治疗效果', damageMod:'伤害加成',
            damageTakenMod:'受到伤害', hitMod:'命中加成', speedMod:'速度加成',
            perTurnHealPct:'每回合回血百分比', healOnKillPct:'击杀回血百分比'
        };
        
        // 收集所有属性key
        const allStats = new Set();
        if (newSym.stats) Object.keys(newSym.stats).forEach(k => allStats.add(k));
        if (oldSym.stats) Object.keys(oldSym.stats).forEach(k => allStats.add(k));
        
        // 生成属性对比HTML
        let statsHtml = '';
        allStats.forEach(key => {
            const newVal = newSym.stats ? (newSym.stats[key] || 0) : 0;
            const oldVal = oldSym.stats ? (oldSym.stats[key] || 0) : 0;
            const name = statNames[key] || key;
            const diff = newVal - oldVal;
            const diffColor = diff > 0 ? 'var(--accent-success)' : (diff < 0 ? 'var(--accent-danger)' : 'var(--text-muted)');
            const diffText = diff > 0 ? '+' + diff : (diff < 0 ? diff.toString() : '—');
            statsHtml += `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border-primary)">
                <span style="color:var(--text-secondary);font-size:12px">${name}</span>
                <span style="font-size:12px">
                    <span style="color:var(--text-muted)">${oldVal}</span>
                    <span style="color:var(--text-faint);margin:0 6px">→</span>
                    <span style="color:var(--text-primary)">${newVal}</span>
                    <span style="color:${diffColor};margin-left:6px;font-size:11px">(${diffText})</span>
                </span>
            </div>`;
        });
        
        // 特殊效果对比
        let specialHtml = '';
        const newSpecial = newSym.special ? (specialNames[newSym.special] || newSym.special) + (newSym.specialValue ? ' +' + newSym.specialValue : '') : '无';
        const oldSpecial = oldSym.special ? (specialNames[oldSym.special] || oldSym.special) + (oldSym.specialValue ? ' +' + oldSym.specialValue : '') : '无';
        if (newSym.special || oldSym.special) {
            specialHtml = `<div style="margin-top:10px;padding:8px;background:var(--bg-card);border-radius:6px">
                <div style="color:var(--accent-warning);font-size:12px;font-weight:bold;margin-bottom:4px">特殊效果</div>
                <div style="font-size:11px;color:var(--text-muted)">当前：${oldSpecial}</div>
                <div style="font-size:11px;color:var(--text-primary)">替换后：${newSpecial}</div>
            </div>`;
        }
        
        const html = `<div style="min-width:320px;max-width:400px">
            <h3 style="color:var(--accent-warning);margin-bottom:12px;text-align:center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> 替换共生体确认
            </h3>
            <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:12px">
                <div style="text-align:center;padding:8px;background:var(--bg-card);border-radius:8px;border-left:3px solid ${qualityColors[oldSym.quality || 1]}">
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px">当前装备</div>
                    <div style="color:var(--text-primary);font-weight:bold;font-size:13px">${oldSym.name}</div>
                    <div style="font-size:10px;color:${qualityColors[oldSym.quality || 1]}">${qualityNames[oldSym.quality || 1]}</div>
                </div>
                <div style="color:var(--accent-warning);font-size:20px">⇄</div>
                <div style="text-align:center;padding:8px;background:var(--bg-card);border-radius:8px;border-left:3px solid ${qualityColors[newSym.quality || 1]}">
                    <div style="font-size:11px;color:var(--accent-success);margin-bottom:2px">待装备</div>
                    <div style="color:var(--text-primary);font-weight:bold;font-size:13px">${newSym.name}</div>
                    <div style="font-size:10px;color:${qualityColors[newSym.quality || 1]}">${qualityNames[newSym.quality || 1]}</div>
                </div>
            </div>
            <div style="margin-bottom:10px">
                <div style="color:var(--text-primary);font-size:12px;font-weight:bold;margin-bottom:6px">属性对比</div>
                ${statsHtml || '<div style="color:var(--text-faint);font-size:11px;text-align:center;padding:8px">无属性加成</div>'}
            </div>
            ${specialHtml}
            <div style="display:flex;gap:10px;margin-top:15px">
                <button onclick="game.closePop()" style="flex:1;padding:10px;border-radius:6px;background:var(--text-faint);color:var(--text-secondary);font-size:13px">取消</button>
                <button onclick="game.doEquipSymbiont('${newId}');game.closePop()" style="flex:1;padding:10px;border-radius:6px;background:var(--accent-success);color:white;font-size:13px;font-weight:bold">确认替换</button>
            </div>
        </div>`;
        
        this.showPopup(html);
    },

    // 切换共生体装备状态（旧函数，保留兼容）
    toggleSymbiontEquip(id) {
        const symbionts = this.permanent.symbionts || [];
        const s = symbionts.find(x => x.id === id);
        if (!s) return;
        
        if (s.equipped) {
            // 卸下
            s.equipped = false;
        } else {
            // 装备：先卸下同部位的其他共生体
            symbionts.forEach(x => {
                if (x.slot === s.slot && x.equipped) x.equipped = false;
            });
            s.equipped = true;
        }
        
        this.savePermanent();
        this.renderCharacterPanel();
    },

    // 渲染人物状态-天赋标签页
    renderCharacterTalents() {
        const equipped = this.player.equippedTalents || [];
        const allTalents = this.data.talents.talents || this.data.talents || [];
        
        let html = '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 已装备天赋（' + equipped.length + '/' + this.getPassiveSlots() + '）</h3>';
        
        if (equipped.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:20px">还没有装备天赋，去天赋面板解锁吧！</div>';
        } else {
            html += '<div style="display:grid;grid-template-columns:1fr;gap:8px">';
            equipped.forEach(tid => {
                const t = allTalents.find(x => x.id === tid);
                if (!t) return;
                const lv = this.permanent.talentLevels && this.permanent.talentLevels[tid] ? this.permanent.talentLevels[tid] : 1;
                const qualityNames = ['', '普通', '稀有', '史诗', '传说', '神话'];
                const qualityColors = ['', 'var(--quality-common)', 'var(--quality-rare)', 'var(--quality-epic)', 'var(--accent-orange)', 'var(--accent-danger)'];
                html += '<div style="background:var(--bg-card);padding:10px;border-radius:8px;border-left:3px solid ' + qualityColors[t.quality] + '">';
                html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
                html += '<span style="color:var(--text-primary);font-weight:bold">' + t.name + '</span>';
                html += '<span style="font-size:11px;color:' + qualityColors[t.quality] + '">Lv.' + lv + ' ' + qualityNames[t.quality] + '</span>';
                html += '</div>';
                const eff = this.getTalentEffect(tid);
                if (eff) html += '<div style="font-size:12px;color:var(--text-secondary)">' + eff.passive + '</div>';
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        html += '<button onclick="game.openTalentPanelFromCharacter()" style="width:100%;padding:10px;font-size:13px;background:var(--accent-info);color:white;border-radius:6px">打开天赋面板</button>';
        
        return html;
    },

    // 渲染人物状态-技能标签页
    renderCharacterSkills() {
        const activeSkills = this.player.activeSkills || [];
        const allSkills = this.skillTable || {};
        const skillList = Object.keys(allSkills).map(id => ({...allSkills[id], id}));
        // 已学会的技能：默认3个基础技能 + 已装备的技能（去重）
        const defaultSkills = ['skill_power_strike', 'skill_heal', 'skill_attack_buff'];
        const learnedSkills = [...new Set([...defaultSkills, ...activeSkills])];
        
        let html = '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>️ 已选技能（' + activeSkills.length + '/' + this.getActiveSlots() + '）</h3>';
        
        if (activeSkills.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:20px">还没有选择技能，点击下方按钮选择技能！</div>';
        } else {
            html += '<div style="display:grid;grid-template-columns:1fr;gap:8px">';
            activeSkills.forEach(sid => {
                const s = allSkills[sid];
                if (!s) return;
                html += '<div style="background:var(--bg-card);padding:10px;border-radius:8px;border:1px solid var(--accent-success)">';
                html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
                html += '<span style="color:var(--text-primary);font-weight:bold">' + s.name + '</span>';
                if (s.cost) html += '<span style="font-size:11px;color:var(--accent-info)">能量消耗：' + s.cost + '</span>';
                html += '</div>';
                if (s.desc) html += '<div style="font-size:12px;color:var(--text-secondary)">' + s.desc + '</div>';
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        // 添加打开技能面板按钮
        html += '<button onclick="game.openSkillLoadoutPanel()" style="width:100%;padding:12px;font-size:14px;background:var(--accent-warning);color:white;border-radius:6px;margin-bottom:16px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>️ 选择/更换技能</button>';
        
        // 显示已学会的技能
        html += '<div class="box">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg> 已学会技能（' + learnedSkills.length + '个）</h3>';
        html += '<div style="display:grid;grid-template-columns:1fr;gap:6px;max-height:300px;overflow-y:auto">';
        learnedSkills.forEach(sid => {
            const s = allSkills[sid];
            if (!s) return;
            const equipped = activeSkills.includes(sid);
            html += '<div style="background:' + (equipped ? 'var(--bg-card)' : 'var(--bg-card)') + ';padding:8px;border-radius:6px;border:1px solid ' + (equipped ? 'var(--accent-success)' : 'var(--border-primary)') + '">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center">';
            html += '<span style="color:var(--text-primary);font-size:13px;font-weight:bold">' + s.name + '</span>';
            html += '<span style="font-size:10px;color:' + (equipped ? 'var(--accent-success)' : 'var(--text-faint)') + '">' + (equipped ? '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"20 6 9 17 4 12\"/></svg> 已选' : '未选') + '</span>';
            html += '</div>';
            if (s.desc) html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px">' + s.desc + '</div>';
            html += '</div>';
        });
        html += '</div></div>';
        
        return html;
    },
    openSkillLoadoutPanel() {
        this.closePop();
        const activeSkills = this.player.activeSkills || [];
        const allSkills = this.skillTable || {};
        const skillList = Object.keys(allSkills).map(id => ({...allSkills[id], id}));
        
        let html = '<h3 style="text-align:center;margin-bottom:16px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\"/><line x1=\"13\" y1=\"19\" x2=\"19\" y2=\"13\"/><line x1=\"16\" y1=\"16\" x2=\"20\" y2=\"20\"/><line x1=\"19\" y1=\"21\" x2=\"21\" y2=\"19\"/></svg>️ 选择技能（最多3个）</h3>';
        html += '<div style="margin-bottom:12px;font-size:13px;color:var(--text-muted)">已选：' + activeSkills.length + '/3</div>';
        
        html += '<div style="max-height:400px;overflow-y:auto">';
        skillList.forEach(s => {
            const equipped = activeSkills.includes(s.id);
            html += '<div style="background:' + (equipped ? 'var(--bg-card)' : 'var(--bg-card)') + ';padding:10px;border-radius:8px;border:1px solid ' + (equipped ? 'var(--accent-success)' : 'var(--border-primary)') + ';margin-bottom:8px;cursor:pointer" onclick="game.toggleSkillLoadout(\'' + s.id + '\')">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center">';
            html += '<span style="color:var(--text-primary);font-weight:bold">' + s.name + '</span>';
            html += '<span style="font-size:11px;color:' + (equipped ? 'var(--accent-success)' : 'var(--text-muted)') + '">' + (equipped ? '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"20 6 9 17 4 12\"/></svg> 已装备（点击卸下）' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><rect x="3" y="3" width="18" height="18" rx="2"/></svg> 未装备（点击装备）') + '</span>';
            html += '</div>';
            if (s.desc) html += '<div style="font-size:12px;color:var(--text-secondary);margin-top:4px">' + s.desc + '</div>';
            if (s.cost) html += '<div style="font-size:11px;color:var(--accent-info);margin-top:2px">能量消耗：' + s.cost + '</div>';
            html += '</div>';
        });
        html += '</div>';
        
        html += '<button onclick="game.closePop();game.renderCharacterPanel();" style="width:100%;padding:12px;margin-top:16px;background:var(--accent-success);color:white;border-radius:6px;font-size:14px">完成选择</button>';
        
        this.showPopup(html);
    },

    // 切换技能装备状态
    toggleSkillLoadout(id) {
        if (!this.player.activeSkills) this.player.activeSkills = [];
        const idx = this.player.activeSkills.indexOf(id);
        if (idx >= 0) {
            this.player.activeSkills.splice(idx, 1);
        } else {
            if (this.player.activeSkills.length >= 3) {
                this.showGameAlert('提示', '最多只能装备3个技能！');
                return;
            }
            this.player.activeSkills.push(id);
        }
        this.savePermanent();
        this.openSkillLoadoutPanel();
    },

    // 从角色界面打开技能面板
    openSkillPanelFromCharacter() {
        this.returnToScreen = 'characterScreen';
        this.openSkillPanel();
    },

    // 从角色界面打开天赋面板
    openTalentPanelFromCharacter() {
        this.returnToScreen = 'characterScreen';
        this.openTalentPanel();
    },

    // 从角色界面打开商店
    openShopFromCharacter() {
        this.returnToScreen = 'characterScreen';
        this.openShop();
    },

    // 渲染人物状态-背包标签页
    renderCharacterInventory() {
        const items = this.player.items || [];
        const shop = this.data.shop;
        const consumables = shop ? (shop.consumables || []) : [];
        
        let html = '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"/><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg> 背包物品（' + items.length + '）</h3>';
        
        if (items.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:20px">背包空空如也，去商店购买吧！</div>';
        } else {
            const itemCounts = {};
            items.forEach(id => { itemCounts[id] = (itemCounts[id] || 0) + 1; });
            
            html += '<div style="display:grid;grid-template-columns:1fr;gap:8px">';
            Object.keys(itemCounts).forEach(id => {
                const item = consumables.find(x => x.id === id);
                if (!item) return;
                const count = itemCounts[id];
                html += '<div style="background:var(--bg-card);padding:10px;border-radius:8px;border:1px solid var(--border-primary);display:flex;justify-content:space-between;align-items:center">';
                html += '<div style="flex:1">';
                html += '<div style="color:var(--text-primary);font-weight:bold">' + (item.icon || '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10 2v7.31\"/><path d=\"M14 9.3V1.99\"/><path d=\"M8.5 2h7\"/><path d=\"M14 9.3a6.5 6.5 0 1 1-4 0\"/></svg>') + ' ' + item.name + ' <span style="color:var(--accent-success);font-size:12px">×' + count + '</span></div>';
                if (item.description) html += '<div style="color:var(--text-faint);font-size:11px;margin-top:2px;font-style:italic">' + item.description + '</div>';
                html += '</div>';
                html += '<button onclick="game.useInventoryItem(\'' + item.id + '\')" style="padding:6px 12px;font-size:12px;background:var(--accent-success);color:white;border-radius:4px;white-space:nowrap">使用</button>';
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        // 共生体背包
        const symbionts = this.permanent.symbionts || [];
        const equippedSym = this.permanent.equippedSymbionts || {};
        html += '<div class="box" style="margin-bottom:16px">';
        html += '<h3 style="margin-bottom:12px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><path d="M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><path d="M10 17h4"/></svg> 共生体背包（' + symbionts.length + '）</h3>';
        
        if (symbionts.length === 0) {
            html += '<div style="text-align:center;color:var(--text-faint);padding:20px">共生体背包为空，击败敌人有几率获得共生体</div>';
        } else {
            html += '<div style="display:grid;grid-template-columns:1fr;gap:8px">';
            symbionts.forEach(symId => {
                const tpl = this.getSymbiontTemplate(symId);
                if (!tpl) return;
                const color = this.symbiontQualityColors[tpl.quality] || 'var(--text-primary)';
                const isEquipped = Object.values(equippedSym).includes(symId);
                html += '<div style="background:var(--bg-card);padding:10px;border-radius:8px;border:1px solid var(--border-primary)">';
                html += '<div style="display:flex;justify-content:space-between;align-items:center">';
                html += '<div style="color:' + color + ';font-weight:bold">' + tpl.name + ' <span style="font-size:11px;color:var(--text-muted)">[' + this.symbiontQualityNames[tpl.quality] + '·' + this.symbiontSlotNames[tpl.slot] + ']</span></div>';
                if (isEquipped) {
                    html += '<span style="font-size:11px;color:var(--accent-success)">已装备</span>';
                }
                html += '</div>';
                html += '<div style="color:var(--text-muted);font-size:12px;margin-top:4px">' + tpl.desc + '</div>';
                // 显示属性
                let statsText = '';
                if (tpl.stats) {
                    const statNames = {maxHp:'生命', defense:'防御', attack:'攻击', speed:'先手', crit:'暴击', agility:'敏捷', strength:'力量', vitality:'体质', perception:'感知', evolution:'进化', hit:'命中', dodge:'闪避', critDamage:'暴伤', energy:'能量', maxEnergy:'能量上限'};
                    for (const key in tpl.stats) {
                        if (tpl.stats[key]) statsText += (statNames[key] || key) + '+' + tpl.stats[key] + ' ';
                    }
                }
                if (tpl.special) {
                    const specialNames = {
                        hpRegen:'每回合回血', healOnKill:'击杀回血', damageReduction:'减伤',
                        lifeSteal:'吸血', critDamage:'暴伤', dodge:'闪避', dodgeBonus:'闪避加成',
                        firstStrike:'先手', hit:'命中', energyRegen:'能量回复',
                        maxHp:'生命', attack:'攻击', defense:'防御', crit:'暴击',
                        speed:'速度', agility:'敏捷', strength:'力量', perception:'感知',
                        evolution:'进化', maxEnergy:'能量', dotDamage:'Dot伤害',
                        cooldownReduction:'冷却缩减', talentPower:'天赋强度',
                        dotOnHit:'攻击附加中毒', critChance:'暴击率', extraAttack:'额外行动概率',
                        energyOnHit:'攻击回能', damagePct:'伤害加成', expBonus:'经验加成',
                        allStatPct:'全属性加成', extraAttackChance:'额外攻击概率',
                        reflectDamage:'反伤', reflectPct:'反伤百分比', armorPenetration:'护甲穿透',
                        critResistance:'暴击抗性', shield:'护盾', thorns:'荆棘',
                        hpOnHit:'攻击回血', hpOnKill:'击杀回血', energyOnKill:'击杀回能',
                        talentPointsOnKill:'击杀获得天赋点', fragmentsOnKill:'击杀获得碎片',
                        goldBonus:'金币加成', essenceBonus:'进化精粹加成', fragmentBonus:'碎片加成',
                        talentPointBonus:'天赋点加成', allStats:'全属性', allResist:'全抗性',
                        physicalResist:'物理抗性', fireResist:'火焰抗性', iceResist:'冰霜抗性',
                        poisonResist:'毒素抗性', lightningResist:'雷电抗性', shadowResist:'暗影抗性',
                        holyResist:'神圣抗性', arcaneResist:'奥术抗性',
                        physicalPenetration:'物理穿透', firePenetration:'火焰穿透', icePenetration:'冰霜穿透',
                        poisonPenetration:'毒素穿透', lightningPenetration:'雷电穿透', shadowPenetration:'暗影穿透',
                        holyPenetration:'神圣穿透', arcanePenetration:'奥术穿透',
                        bleedOnHit:'攻击附带流血', poisonOnHit:'攻击附带中毒', burnOnHit:'攻击附带灼烧',
                        freezeOnHit:'攻击附带冰冻', stunOnHit:'攻击附带眩晕', paralyzeOnHit:'攻击附带麻痹',
                        slowOnHit:'攻击附带减速', healMod:'治疗效果', damageMod:'伤害加成',
                        damageTakenMod:'受到伤害', hitMod:'命中加成', speedMod:'速度加成',
                        perTurnHealPct:'每回合回血百分比', healOnKillPct:'击杀回血百分比',
                        vitality:'体质', first_strike:'先手值', talent_power:'天赋强度',
                        energy_regen:'能量恢复', hp_regen:'生命恢复', life_steal:'吸血',
                        reflect_damage:'反伤', crit_damage:'暴击伤害', armor_penetration:'护甲穿透',
                        dot_damage:'Dot伤害', cooldown_reduction:'冷却缩减'
                    };
                    statsText += (specialNames[tpl.special] || tpl.special) + (tpl.specialValue ? '+' + tpl.specialValue : '') + ' ';
                }
                if (statsText) html += '<div style="color:var(--accent-primary);font-size:11px;margin-top:2px">' + statsText.trim() + '</div>';
                html += '</div>';
            });
            html += '</div>';
        }
        html += '</div>';
        
        // Boss核心（显示具体每个Boss核心的名称和数量）
        const bossCores = this.permanent.bossCores || {};
        const coreCount = Object.values(bossCores).reduce((a, b) => a + b, 0);
        if (coreCount > 0) {
            html += '<div class="box" style="margin-bottom:16px">';
            html += '<h3 style="margin-bottom:12px;color:var(--accent-danger)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;vertical-align:middle"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg> Boss核心（' + coreCount + '）</h3>';
            html += '<div style="color:var(--text-secondary);font-size:12px;margin-bottom:8px">用于解锁神话天赋和高级合成</div>';
            // 显示具体每个Boss核心
            html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
            const allEnemies = this.data.enemies ? (this.data.enemies.enemies || this.data.enemies) : [];
            for (let bossId in bossCores) {
                const count = bossCores[bossId];
                if (count <= 0) continue;
                const bossData = allEnemies.find(e => e.id === bossId);
                const bossName = bossData ? bossData.name : bossId;
                const bossDesc = bossData ? (bossData.description || '') : '';
                html += '<div style="background:var(--bg-card);padding:10px;border-radius:8px;border-left:3px solid var(--accent-danger)" title="' + bossDesc + '">';
                html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
                html += '<span style="color:var(--text-primary);font-size:13px;font-weight:bold">' + bossName + '</span>';
                html += '<span style="color:var(--accent-danger);font-size:14px;font-weight:bold">×' + count + '</span>';
                html += '</div>';
                if (bossDesc) html += '<div style="color:var(--text-faint);font-size:11px;line-height:1.4">' + bossDesc.substring(0, 40) + (bossDesc.length > 40 ? '...' : '') + '</div>';
                html += '</div>';
            }
            html += '</div>';
            html += '</div>';
        }
        
        html += '<button onclick="game.openShopFromCharacter()" style="width:100%;padding:10px;font-size:13px;background:var(--accent-warning);color:white;border-radius:6px">打开商店</button>';
        
        return html;
    },

    // 使用背包中的物品
    useInventoryItem(itemId) {
        const items = this.player.items || [];
        const idx = items.indexOf(itemId);
        if (idx === -1) { this.showGameAlert('提示', '背包中没有该物品'); return; }

        const shop = this.data.shop;
        const consumables = shop ? (shop.consumables || []) : [];
        const item = consumables.find(x => x.id === itemId);
        if (!item) { this.showGameAlert('提示', '物品数据不存在'); return; }

        // 从背包中移除
        items.splice(idx, 1);
        this.player.items = items;

        // 应用效果
        const resultMsg = this.applyItemEffect(item);

        this.savePermanent();
        this.refreshMainUI();

        // 显示结果并返回背包
        this.showPopup(`<h3 style="color:var(--accent-success)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polyline points=\"20 6 9 17 4 12\"/></svg> 使用成功</h3><p style="color:var(--text-secondary);line-height:1.8;white-space:pre-line">${resultMsg}</p><div style="display:flex;gap:10px;margin-top:15px"><button onclick="game.openInventory()" style="flex:1;padding:10px;border-radius:6px">返回背包</button><button onclick="game.closePop()" style="flex:1;padding:10px;border-radius:6px">关闭</button></div>`);
    },

    // ============================================================
    //  状态面板
    // ============================================================
    openStatus() {
        const p = this.player;
        let html = `<h3>详细状态</h3>`;
        html += `<div style="margin:8px 0;font-size:13px;color:var(--text-muted)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 点击属性查看详细说明</div>`;
        html += `<div style="margin:8px 0;font-size:14px;color:var(--text-secondary)">五维基础属性</div>`;
        const statKeys = ['strength','agility','vitality','perception','evolution'];
        statKeys.forEach(s => {
            const si = this.statInfo[s];
            html += `<div class="stat-row" onclick="game.showTooltip('${s}', event)" style="cursor:pointer;padding:8px 4px;border-radius:4px;transition:background 0.2s" onmouseover="this.style.background='var(--border-secondary)'" onmouseout="this.style.background='transparent'"><span class="stat-label">${si.name}</span><span>${p[s]}（${si.desc}）</span></div>`;
        });
        html += `<div style="margin:10px 0 6px;font-size:14px;color:var(--text-secondary)">衍生战斗属性</div>`;
        // 衍生属性tooltip映射
        const derivedStats = [
            {label:'等级', key:'level', value:`${p.level} (${p.exp}/${p.expToNext} exp)`},
            {label:'可用属性点', key:null, value:`<span class="stat-highlight">${p.statPoints}</span>`},
            {label:'生命值', key:'hp', value:`${p.hp}/${p.maxHp}`},
            {label:'攻击力', key:'attack', value:`${p.attack}`},
            {label:'防御力', key:'defense', value:`${p.defense}（减伤率${(p.defense/(p.defense+100)*100).toFixed(1)}%）`},
            {label:'暴击率', key:'crit', value:`${p.crit}%`},
            {label:'暴击伤害', key:'critDamage', value:`${p.critDamage}%`},
            {label:'基础命中率', key:'hit', value:`${p.hit}%`},
            {label:'闪避率', key:'dodgeRate', value:`${p.dodgeRate || 0}%`},
            {label:'先手值', key:'speed', value:`${p.speed}`},
            {label:'能量', key:null, value:`${p.energy}/${p.maxEnergy}`},
            {label:'基因精华', key:'geneEssence', value:`${p.gold}`},
        ];
        derivedStats.forEach(s => {
            if (s.key) {
                html += `<div class="stat-row" onclick="game.showTooltip('${s.key}', event)" style="cursor:pointer;padding:8px 4px;border-radius:4px;transition:background 0.2s" onmouseover="this.style.background='var(--border-secondary)'" onmouseout="this.style.background='transparent'"><span class="stat-label">${s.label}</span><span>${s.value}</span></div>`;
            } else {
                html += `<div class="stat-row" style="cursor:default;padding:4px 0"><span class="stat-label">${s.label}</span><span>${s.value}</span></div>`;
            }
        });
        html += `<div class="stat-row" style="cursor:default;padding:4px 0"><span class="stat-label">当前层</span><span>第${this.currentFloor}层</span></div>`;
        if (this.currentMap) html += `<div class="stat-row" style="cursor:default;padding:4px 0"><span class="stat-label">当前地图</span><span>${this.currentMap.name}</span></div>`;
        html += `<button onclick="game.closePop()" style="margin-top:10px">关闭</button>`;
        this.showPopup(html);
    },

    // 特殊效果图鉴
    openStatusGuide() {
        let html = '<h3 style="color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg> 特殊效果图鉴</h3>';
        
        // Dot效果
        html += '<div style="margin:12px 0 8px;font-size:15px;color:var(--accent-danger);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a8 8 0 0 0-8 8c0 2.5 1 4.5 2.5 6L8 20h8l1.5-4c1.5-1.5 2.5-3.5 2.5-6a8 8 0 0 0-8-8z\"/><circle cx=\"9\" cy=\"12\" r=\"1.5\"/><circle cx=\"15\" cy=\"12\" r=\"1.5\"/><path d=\"M10 17h4\"/></svg> 持续伤害（Dot）</div>';
        
        const dotEffects = [
            {
                name: '中毒', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-success)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>', color: 'var(--accent-success)',
                desc: '毒素侵蚀目标，降低其攻防能力并造成持续伤害',
                formula: '伤害 = 攻击者攻击力 × 20% × 层数',
                effect: '目标攻击力-15%，防御力-10%',
                duration: '3回合，层数-1/回合',
                special: '叠加层数增加伤害，毒系天赋可强化'
            },
            {
                name: '流血', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-danger)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>', color: 'var(--accent-danger)',
                desc: '伤口持续流血，越流越猛，受物理攻击时伤口扩大',
                formula: '伤害 = (基础5 + 目标最大生命×1%) × 层数',
                effect: '层数每回合+1，受物理攻击额外受伤，生命回复-50%',
                duration: '4回合，层数递增',
                special: '唯一层数递增的Dot，长时间战斗伤害爆炸'
            },
            {
                name: '灼烧', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-orange)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>', color: 'var(--accent-warning)',
                desc: '烈焰焚烧目标，血量越低伤害越高，同时增加受到的伤害',
                formula: '伤害 = 基础8 × (1 + (1-目标生命百分比)×2) × 层数',
                effect: '目标血量越低伤害越高（斩杀型），受到伤害+15%',
                duration: '5回合，层数-1/回合',
                special: '对低血量目标伤害极高，配合斩杀天赋效果拔群'
            },
            {
                name: '凋零', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-epic)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>', color: 'var(--accent-purple)',
                desc: '死亡能量侵蚀目标，按最大生命百分比造成伤害并削弱全属性',
                formula: '伤害 = 目标最大生命 × 2% × 层数',
                effect: '目标全属性-10%',
                duration: '3回合，层数-1/回合',
                special: 'Boss抗性50%（伤害减半），对普通敌人效果最强'
            }
        ];
        
        dotEffects.forEach(e => {
            html += `<div style="background:var(--bg-card);padding:12px;border-radius:8px;margin-bottom:10px;border-left:4px solid ${e.color}">`;
            html += `<div style="color:${e.color};font-size:16px;font-weight:bold;margin-bottom:6px">${e.icon} ${e.name}</div>`;
            html += `<div style="color:var(--text-muted);font-size:13px;margin-bottom:8px;line-height:1.6">${e.desc}</div>`;
            html += `<div style="font-size:12px;color:var(--text-secondary);line-height:1.8">`;
            html += `<div><span style="color:var(--accent-warning)">伤害公式：</span>${e.formula}</div>`;
            html += `<div><span style="color:var(--accent-warning)">附加效果：</span>${e.effect}</div>`;
            html += `<div><span style="color:var(--accent-warning)">持续时间：</span>${e.duration}</div>`;
            html += `<div><span style="color:var(--accent-success)">特殊机制：</span>${e.special}</div>`;
            html += `</div></div>`;
        });
        
        // 控制效果
        html += '<div style="margin:15px 0 8px;font-size:15px;color:var(--accent-info);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg> 控制效果</div>';
        
        const controlEffects = [
            {
                name: '束缚', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>', color: 'var(--text-muted)',
                desc: '目标被束缚，完全无法行动',
                effect: '跳过行动回合',
                duration: '2回合',
                boss: 'Boss持续-1回合（最短1回合）',
                special: '最强控制，但对Boss效果减弱'
            },
            {
                name: '麻痹', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg>', color: 'var(--quality-legendary)',
                desc: '目标被麻痹，有概率无法行动，同时先手值降低',
                effect: '50%概率无法行动，敏捷-50%（降低闪避）',
                duration: '持续至结束',
                boss: '概率-20%（30%概率无法行动）',
                special: '概率型控制，即使没触发也会降低敏捷（降低闪避）'
            },
            {
                name: '冻结', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"/><path d=\"m20 16-4-4 4-4\"/><path d=\"m4 8 4 4-4 4\"/><path d=\"m16 4-4 4-4-4\"/><path d=\"m8 20 4-4 4 4\"/></svg>️', color: 'var(--accent-info)',
                desc: '目标被冻结，完全无法行动1回合，解冻后速度降低',
                effect: '跳过行动1回合，解冻后附加减速',
                duration: '1回合 + 减速2回合',
                boss: 'Boss持续-1回合（可能免疫）',
                special: '冻结结束后自动附加减速，控制链衔接'
            },
            {
                name: '减速', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0\"/><path d=\"M2 13h12\"/><path d=\"M14 13c2 0 4-2 4-4s-2-4-4-4\"/><path d=\"M2 9v4\"/><path d=\"M6 9v4\"/></svg>', color: 'var(--accent-success)',
                desc: '目标速度降低，先手值大幅下降',
                effect: '敏捷-50%（降低闪避）',
                duration: '3回合',
                boss: '全额生效',
                special: '唯一对Boss全额生效的控制，降低敌人敏捷从而降低闪避率'
            },
            {
                name: '沉默', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5\"/><path d=\"M8 12h.01\"/><path d=\"M12 12h.01\"/><path d=\"M16 12h.01\"/></svg>', color: 'var(--quality-epic)',
                desc: '目标被沉默，无法使用技能，只能普通攻击',
                effect: '无法使用技能',
                duration: '2回合',
                boss: 'Boss持续-1回合（最短1回合）',
                special: '克制依赖技能的敌人，Boss技能被封锁时输出大降'
            }
        ];
        
        controlEffects.forEach(e => {
            html += `<div style="background:var(--bg-card);padding:12px;border-radius:8px;margin-bottom:10px;border-left:4px solid ${e.color}">`;
            html += `<div style="color:${e.color};font-size:16px;font-weight:bold;margin-bottom:6px">${e.icon} ${e.name}</div>`;
            html += `<div style="color:var(--text-muted);font-size:13px;margin-bottom:8px;line-height:1.6">${e.desc}</div>`;
            html += `<div style="font-size:12px;color:var(--text-secondary);line-height:1.8">`;
            html += `<div><span style="color:var(--accent-warning)">控制效果：</span>${e.effect}</div>`;
            html += `<div><span style="color:var(--accent-warning)">持续时间：</span>${e.duration}</div>`;
            html += `<div><span style="color:var(--accent-warning)">对Boss：</span>${e.boss}</div>`;
            html += `<div><span style="color:var(--accent-success)">特殊机制：</span>${e.special}</div>`;
            html += `</div></div>`;
        });
        
        // 其他效果
        html += '<div style="margin:15px 0 8px;font-size:15px;color:var(--accent-warning);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 其他状态效果</div>';
        
        const otherEffects = [
            {
                name: '隐身', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 2h6a4 4 0 0 1 4 4v12l-3-2-3 2-3-2-3 2V6a4 4 0 0 1 4-4z\"/><circle cx=\"9\" cy=\"10\" r=\"1\"/><circle cx=\"15\" cy=\"10\" r=\"1\"/></svg>', color: 'var(--text-secondary)',
                desc: '进入隐身状态，敌人难以命中',
                effect: '敌人命中率降低30%',
                duration: '2回合',
                special: '攻击后隐身消失，适合开局先手爆发'
            },
            {
                name: '魅惑', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--accent-danger)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg>', color: 'var(--accent-danger)',
                desc: '目标被魅惑，无法行动',
                effect: '跳过行动1回合',
                duration: '1回合',
                special: '灵能系天赋专属控制，对普通敌人效果稳定'
            },
            {
                name: '护盾', icon: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg>️', color: 'var(--accent-success)',
                desc: '获得护盾，吸收受到的伤害',
                effect: '吸收固定数值伤害',
                duration: '3回合',
                special: '护盾吸收的伤害不计入实际掉血，可抵挡致命攻击'
            }
        ];
        
        otherEffects.forEach(e => {
            html += `<div style="background:var(--bg-card);padding:12px;border-radius:8px;margin-bottom:10px;border-left:4px solid ${e.color}">`;
            html += `<div style="color:${e.color};font-size:16px;font-weight:bold;margin-bottom:6px">${e.icon} ${e.name}</div>`;
            html += `<div style="color:var(--text-muted);font-size:13px;margin-bottom:8px;line-height:1.6">${e.desc}</div>`;
            html += `<div style="font-size:12px;color:var(--text-secondary);line-height:1.8">`;
            html += `<div><span style="color:var(--accent-warning)">效果：</span>${e.effect}</div>`;
            html += `<div><span style="color:var(--accent-warning)">持续时间：</span>${e.duration}</div>`;
            html += `<div><span style="color:var(--accent-success)">特殊机制：</span>${e.special}</div>`;
            html += `</div></div>`;
        });
        
        // 控制铁律说明
        html += '<div style="margin-top:15px;padding:12px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--text-faint)">';
        html += '<div style="color:var(--accent-warning);font-size:14px;font-weight:bold;margin-bottom:8px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3v18\"/><path d=\"M3 7h18\"/><path d=\"M7 7l-3 6a3 3 0 0 0 6 0z\"/><path d=\"M17 7l-3 6a3 3 0 0 0 6 0z\"/></svg>️ 控制铁律</div>';
        html += '<div style="color:var(--text-secondary);font-size:12px;line-height:1.8">';
        html += '<div>• 控制技能的冷却回合必须大于控制持续回合，保证空窗期</div>';
        html += '<div>• 不允许无限控制链，Boss有控制抗性</div>';
        html += '<div>• 减速是唯一对Boss全额生效的控制</div>';
        html += '<div>• 束缚/冻结/沉默对Boss持续时间-1回合</div>';
        html += '<div>• 麻痹对Boss触发概率-20%</div>';
        html += '</div></div>';
        
        html += '<button onclick="game.closePop()" style="margin-top:15px;width:100%;padding:12px;border-radius:8px;font-size:15px">关闭</button>';
        this.showPopup(html);
    },

    // ============================================================
    //  通用弹窗
    // ============================================================
    showPopup(html) {
        // 先关闭其他弹窗，避免叠加
        this.closeKillDropPopup();
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel) settingsPanel.style.display = 'none';
        
        document.getElementById('popBox').innerHTML = html;
        document.getElementById('popBox').style.display = 'block';
        document.getElementById('overlay').classList.add('active');
        // 自动绑定物品Tooltip
        setTimeout(() => this.bindItemTooltips(document.getElementById('popBox')), 50);
    },

    closePop() {
        document.getElementById('popBox').style.display = 'none';
        document.getElementById('overlay').classList.remove('active');
        // 关闭所有tooltip（防止关闭弹窗后tooltip残留）
        const tooltipBox = document.getElementById('tooltipBox');
        if (tooltipBox) tooltipBox.classList.remove('show');
        this.currentTooltipKey = null;
        // 关闭天赋详情tooltip
        const talentTooltip = document.getElementById('talentTooltip');
        if (talentTooltip) talentTooltip.remove();
        // 关闭击杀奖励弹窗（如果存在）
        const killDropPopup = document.getElementById('killDropPopup');
        if (killDropPopup) killDropPopup.remove();
        const dropTooltip = document.getElementById('dropTooltip');
        if (dropTooltip) dropTooltip.remove();
    },

    // ============================================================
    //  基因精华抽奖系统
    // ============================================================
    openGoldGacha() {
        const gold = this.player.gold;
        const singleCost = 50;
        const tenCost = 450; // 九折

        let html = '<h3 style="color:var(--accent-warning)"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/></svg> 基因抽奖</h3>';
        html += '<p style="color:var(--text-secondary);font-size:13px;margin-bottom:10px;line-height:1.6">消耗基因精华抽取随机基因碎片，有几率获得高品质碎片！</p>';
        
        // 基因精华显示
        html += `<div style="margin-bottom:15px;padding:10px;background:linear-gradient(135deg,var(--bg-card),var(--bg-secondary));border-radius:8px;font-size:14px;border:1px solid var(--text-faint)">`;
        html += `<span style="color:var(--accent-warning);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 当前基因精华：${gold}</span>`;
        html += '</div>';

        // 抽奖概率说明
        html += '<div style="margin-bottom:15px;padding:10px;background:var(--bg-card);border-radius:6px;font-size:12px;color:var(--text-secondary)">';
        html += '<div style="color:var(--text-primary);margin-bottom:5px;font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> 抽奖概率</div>';
        html += '<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg> 普通碎片×3：65%</div>';
        html += '<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-rare)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg> 稀有碎片×2：25%</div>';
        html += '<div><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-epic)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg> 史诗碎片×1：10%</div>';
        html += '<div style="color:var(--accent-warning);margin-top:5px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/><path d=\"M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z\"/></svg> 传说/神话碎片需通过击杀Boss获得，无法通过抽奖获取</div>';
        html += '</div>';

        // 抽奖按钮
        html += '<div style="display:flex;gap:10px;margin-bottom:15px">';
        html += `<button onclick="game.goldGacha(1)" ${gold >= singleCost ? '' : 'disabled'} style="flex:1;padding:12px;font-size:14px;border-radius:8px;font-weight:bold;background:${gold >= singleCost ? 'var(--accent-warning)' : 'var(--text-faint)'};color:${gold >= singleCost ? 'var(--bg-card)' : 'var(--text-muted)'}">单抽<br><span style="font-size:11px">${singleCost} 精华</span></button>`;
        html += `<button onclick="game.goldGacha(10)" ${gold >= tenCost ? '' : 'disabled'} style="flex:1;padding:12px;font-size:14px;border-radius:8px;font-weight:bold;background:${gold >= tenCost ? 'var(--accent-warning)' : 'var(--text-faint)'};color:${gold >= tenCost ? 'var(--text-primary)' : 'var(--text-muted)'}">十连抽<br><span style="font-size:11px">${tenCost} 精华（九折）</span></button>`;
        html += '</div>';

        html += '<button onclick="game.closePop()" style="width:100%;padding:10px;border-radius:6px">关闭</button>';
        this.showPopup(html);
    },

    goldGacha(times) {
        const singleCost = 50;
        const tenCost = 450;
        const cost = times === 10 ? tenCost : singleCost * times;
        
        if (this.player.gold < cost) {
            this.showGameAlert('提示', '基因精华不足！');
            return;
        }

        this.player.gold -= cost;
        // 基因精华现为局内货币，不再永久累积

        // 预先计算结果
        const results = [];
        for (let i = 0; i < times; i++) {
            const roll = Math.random() * 100;
            let quality, count;
            if (roll < 65) { quality = 1; count = 3; }
            else if (roll < 90) { quality = 2; count = 2; }
            else { quality = 3; count = 1; }
            
            this.permanent.universalFragments[quality] = (this.permanent.universalFragments[quality] || 0) + count;
            results.push({quality, count});
        }
        this.savePermanent();

        const qualityNames = {1:'普通', 2:'稀有', 3:'史诗'};
        const qualityColors = {1:'var(--quality-common)', 2:'var(--accent-info)', 3:'var(--accent-purple)'};
        const qualityIcons = {1:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>', 2:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-rare)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>', 3:'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--quality-epic)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>'};

        // ========== 显示抽奖动画 ==========
        let animHtml = '<h3 style="color:var(--accent-warning);text-align:center"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 基因提取中...</h3>';
        // 旋转的DNA动画
        animHtml += '<div style="text-align:center;margin:20px 0;font-size:60px;animation:spin 1s linear infinite" id="gachaDna"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg></div>';
        animHtml += '<style>@keyframes spin {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes popIn {0%{transform:scale(0);opacity:0}70%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}@keyframes glow {0%,100%{box-shadow:0 0 5px currentColor}50%{box-shadow:0 0 20px currentColor,0 0 30px currentColor}}</style>';
        // 进度条
        animHtml += '<div style="background:var(--text-faint);border-radius:10px;height:20px;margin:15px 0;overflow:hidden">';
        animHtml += '<div id="gachaProgress" style="background:linear-gradient(90deg,var(--accent-warning),var(--accent-warning));height:100%;width:0%;border-radius:10px;transition:width 0.1s"></div>';
        animHtml += '</div>';
        animHtml += '<div id="gachaProgressText" style="text-align:center;color:var(--accent-warning);font-size:14px;margin-bottom:10px">0%</div>';
        animHtml += '<div id="gachaStatus" style="text-align:center;color:var(--text-secondary);font-size:13px">正在提取基因片段...</div>';
        // 结果容器（初始为空，动画完成后逐个添加）
        animHtml += '<div id="gachaResults" style="display:flex;flex-wrap:wrap;gap:8px;margin:15px 0;justify-content:center;min-height:80px"></div>';
        // 统计和按钮（初始隐藏）
        animHtml += '<div id="gachaSummary" style="display:none">';
        animHtml += '<div style="padding:10px;background:var(--bg-card);border-radius:6px;font-size:13px;color:var(--text-secondary);margin-bottom:15px">';
        animHtml += '<div style="color:var(--text-primary);margin-bottom:5px;font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> 本次获得</div>';
        const totalByQuality = {};
        results.forEach(r => {
            totalByQuality[r.quality] = (totalByQuality[r.quality] || 0) + r.count;
        });
        for (let q = 1; q <= 3; q++) {
            if (totalByQuality[q]) {
                animHtml += `<div style="color:${qualityColors[q]}">${qualityIcons[q]} ${qualityNames[q]}碎片：${totalByQuality[q]}个</div>`;
            }
        }
        animHtml += '</div>';
        animHtml += `<div style="color:var(--accent-warning);margin-bottom:15px;text-align:center"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1.5 3.5L14 11l-.5.5c-1 1-1.5 2-1.5 3.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5L7 11l.5-.5c1-1 1.5-2 1.5-3.5a4 4 0 0 1 3-3.87z\"/><path d=\"M5 8h14\"/><path d=\"M5 16h14\"/></svg> 剩余基因精华：${this.player.gold}</div>`;
        animHtml += '<div style="display:flex;gap:10px">';
        animHtml += '<button onclick="game.openGoldGacha()" style="flex:1;padding:10px;border-radius:6px">继续抽奖</button>';
        animHtml += '<button onclick="game.closePop()" style="flex:1;padding:10px;border-radius:6px">关闭</button>';
        animHtml += '</div>';
        animHtml += '</div>';

        this.showPopup(animHtml);
        this.refreshMainUI();

        // ========== 执行动画 ==========
        const duration = times === 10 ? 2000 : 1200; // 十连抽动画更长
        const startTime = Date.now();
        const statuses = times === 10 ? 
            ['正在扫描基因库...', '正在提取基因片段...', '正在分析基因品质...', '正在整理结果...'] :
            ['正在提取基因片段...', '正在分析基因品质...'];
        
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / duration) * 100);
            const progressEl = document.getElementById('gachaProgress');
            const progressText = document.getElementById('gachaProgressText');
            const statusEl = document.getElementById('gachaStatus');
            if (progressEl) progressEl.style.width = progress + '%';
            if (progressText) progressText.textContent = Math.floor(progress) + '%';
            if (statusEl) {
                const statusIndex = Math.min(statuses.length - 1, Math.floor(progress / (100 / statuses.length)));
                statusEl.textContent = statuses[statusIndex];
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                // 隐藏进度条和状态
                const dnaEl = document.getElementById('gachaDna');
                if (dnaEl) dnaEl.style.animation = 'none';
                if (statusEl) statusEl.textContent = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z\"/></svg> 提取完成！';
                
                // 逐个显示结果
                const resultsContainer = document.getElementById('gachaResults');
                if (resultsContainer) {
                    results.forEach((r, index) => {
                        setTimeout(() => {
                            const itemDiv = document.createElement('div');
                            itemDiv.style.cssText = `padding:10px 15px;background:var(--bg-card);border-radius:8px;border:2px solid ${qualityColors[r.quality]};text-align:center;min-width:80px;animation:popIn 0.4s ease-out;animation:glow 1.5s ease-in-out infinite;color:${qualityColors[r.quality]}`;
                            itemDiv.innerHTML = `<div style="font-size:28px">${qualityIcons[r.quality]}</div><div style="color:${qualityColors[r.quality]};font-size:13px;font-weight:bold;margin-top:4px">${qualityNames[r.quality]}×${r.count}</div>`;
                            resultsContainer.appendChild(itemDiv);
                            
                            // 最后一个结果显示后，显示统计
                            if (index === results.length - 1) {
                                setTimeout(() => {
                                    const summaryEl = document.getElementById('gachaSummary');
                                    if (summaryEl) summaryEl.style.display = 'block';
                                }, 300);
                            }
                        }, index * (times === 10 ? 150 : 250));
                    });
                }
            }
        }, 50);
    },

    // ============================================================
    //  新手引导系统
    // ============================================================
    tutorialSteps: [
        {
            title: '欢迎来到吞噬无限进化',
            content: '你是一个被注入<span class="highlight">无限吞噬基因</span>的实验体。<br><br>你的目标是：<span class="highlight">吞噬敌人 → 获取基因 → 解锁天赋 → 无限变强 → 轮回再战</span><br><br>死亡不是终点，而是新的开始！',
            tip: '提示：点击"下一步"继续了解游戏'
        },
        {
            title: '五维属性系统',
            content: '你拥有五个基础属性：<br><br><span class="highlight">力量</span>：每点+2攻击力<br><span class="highlight">敏捷</span>：每点+1先手值，影响闪避<br><span class="highlight">体质</span>：每点+8最大生命，+0.4防御<br><span class="highlight">感知</span>：每点+0.8暴击，+1发现值<br><span class="highlight">进化</span>：每点+1天赋强度，+2本源能量<br><br>升级获得属性点，自由分配！',
            tip: '提示：属性点可以随时在主界面分配'
        },
        {
            title: '回合制战斗',
            content: '战斗采用<span class="highlight">回合制</span>：<br><br>1. 比较先手值决定行动顺序<br>2. 你可以选择<span class="highlight">普攻</span>、<span class="highlight">技能</span>或<span class="highlight">逃跑</span><br>3. 技能消耗能量，普攻回复能量<br>4. 击败敌人获得<span class="highlight">经验、基因精华、基因碎片</span><br><br>击杀敌人后保持空血条短暂展示，然后自动进入下一场！',
            tip: '提示：能量不足时使用普攻回复能量'
        },
        {
            title: '天赋系统',
            content: '天赋是你变强的核心：<br><br><span class="highlight">解锁</span>：消耗基因碎片+天赋点解锁新天赋<br><span class="highlight">升级</span>：消耗天赋点提升天赋等级（最高5级）<br><span class="highlight">进化</span>：低品质天赋+碎片进化为高品质天赋<br><span class="highlight">融合</span>：两个满级史诗天赋融合为传说天赋<br><br>天赋分为<span class="highlight">纯被动</span>和<span class="highlight">被动+主动技能</span>两种类型！',
            tip: '提示：点击主界面"天赋"按钮查看所有天赋'
        },
        {
            title: '死亡与轮回',
            content: '死亡不是惩罚，而是<span class="highlight">永久成长</span>的机会！<br><br>死亡时：<br>1. 本局获得的属性按比例转化为<span class="highlight">永久自由属性点</span><br>2. 已解锁的天赋转化为<span class="highlight">基因碎片</span>保留<br>3. 获得<span class="highlight">天赋点</span>用于局外升级<br>4. 所有碎片、材料100%保留<br><br>每一次死亡，都让你变得更强！',
            tip: '提示：在轮回空间可以分配永久属性点、升级天赋'
        },
        {
            title: '开始你的进化之旅',
            content: '你已经了解了游戏的核心玩法！<br><br>现在点击<span class="highlight">"探索前进"</span>按钮，开始你的第一场战斗吧！<br><br>记住：<span class="highlight">吞噬 → 进化 → 轮回 → 无限变强</span><br><br>祝你在进化之路上越走越远！',
            tip: '提示：遇到不懂的地方可以随时点击"设置"查看帮助'
        }
    ],

    currentTutorialStep: 0,

    startTutorial() {
        this.currentTutorialStep = 0;
        this.showTutorialStep();
        document.getElementById('tutorialOverlay').classList.add('active');
    },

    showTutorialStep() {
        const step = this.tutorialSteps[this.currentTutorialStep];
        document.getElementById('tutorialTitle').textContent = step.title;
        document.getElementById('tutorialContent').innerHTML = step.content + 
            (step.tip ? '<div class="tip">' + step.tip + '</div>' : '');
        
        const progress = document.getElementById('tutorialProgress');
        progress.innerHTML = '';
        for (let i = 0; i < this.tutorialSteps.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'tutorial-dot' + (i === this.currentTutorialStep ? ' active' : '');
            progress.appendChild(dot);
        }

        const prevBtn = document.getElementById('btnTutorialPrev');
        const nextBtn = document.getElementById('btnTutorialNext');
        prevBtn.style.display = this.currentTutorialStep > 0 ? 'inline-block' : 'none';
        nextBtn.textContent = this.currentTutorialStep === this.tutorialSteps.length - 1 ? '开始游戏' : '下一步';
    },

    nextTutorial() {
        if (this.currentTutorialStep < this.tutorialSteps.length - 1) {
            this.currentTutorialStep++;
            this.showTutorialStep();
        } else {
            this.completeTutorial();
        }
    },

    prevTutorial() {
        if (this.currentTutorialStep > 0) {
            this.currentTutorialStep--;
            this.showTutorialStep();
        }
    },

    skipTutorial() {
        const self = this;
        // 先隐藏新手教程，避免确认弹窗被覆盖
        document.getElementById('tutorialOverlay').classList.remove('active');
        this.showGameConfirm('跳过新手引导', '确定要跳过新手引导吗？', () => {
            self.completeTutorial();
        }, () => {
            // 取消时重新显示新手教程
            document.getElementById('tutorialOverlay').classList.add('active');
        });
    },

    completeTutorial() {
        this.permanent.tutorialCompleted = true;
        this.savePermanent();
        document.getElementById('tutorialOverlay').classList.remove('active');
    },

    resetTutorial() {
        this.permanent.tutorialCompleted = false;
        this.savePermanent();
    }
};

// 启动
setTimeout(() => game.init(), 100);