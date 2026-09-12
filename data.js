// 内嵌数据（TapTap 小游戏环境避免 fetch 加载本地 JSON）
window.EMBEDDED_DATA = {
  enemies: {
  "enemies": [
    {
      "id": "primordial_soup_norm_01",
      "name": "原始阿米巴",
      "type": "normal",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 28,
        "atk": 5,
        "def": 2,
        "agi": 7,
        "per": 2
      },
      "tags": [
        10,
        15
      ],
      "lootableTalentId": "tal_pseudopod",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "伸出伪足进行攻击"
            ]
          }
        ]
      },
      "description": "一团半透明的细胞质在原始汤中缓缓流动，依靠变形运动靠近微小的有机物颗粒。"
    },
    {
      "id": "primordial_soup_norm_02",
      "name": "鞭毛虫",
      "type": "normal",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 28,
        "atk": 5,
        "def": 2,
        "agi": 4,
        "per": 6
      },
      "tags": [
        15,
        17
      ],
      "lootableTalentId": "tal_flagellum",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "高速摆动鞭毛穿刺"
            ]
          }
        ]
      },
      "description": "细长的鞭毛高速摆动，推动纺锤形的躯体在液体中穿梭，冲向食物团块。"
    },
    {
      "id": "primordial_soup_norm_03",
      "name": "草履虫",
      "type": "normal",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 28,
        "atk": 6,
        "def": 2,
        "agi": 4,
        "per": 4
      },
      "tags": [
        9,
        18
      ],
      "lootableTalentId": "tal_cilia",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用纤毛扫击"
            ]
          }
        ]
      },
      "description": "浑身纤毛整齐划动，草履虫旋转着前进，用口沟滤食水中的细菌。"
    },
    {
      "id": "primordial_soup_norm_04",
      "name": "噬菌体",
      "type": "normal",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 28,
        "atk": 6,
        "def": 2,
        "agi": 6,
        "per": 5
      },
      "tags": [
        3,
        17
      ],
      "lootableTalentId": "tal_inject",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "吸附并注入遗传物质"
            ]
          }
        ]
      },
      "description": "微小的病毒样颗粒，头部包裹着核酸，尾部纤维精准地识别宿主表面。"
    },
    {
      "id": "primordial_soup_elite_01",
      "name": "巨噬变形体",
      "type": "elite",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 46,
        "atk": 12,
        "def": 3,
        "agi": 7,
        "per": 5
      },
      "tags": [
        10,
        11
      ],
      "lootableTalentId": "tal_phagocytosis",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "包裹吞噬目标"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "分裂出一个小型拟态体"
            ]
          }
        ]
      },
      "description": "体积是普通阿米巴的数倍，流动的细胞质能瞬间包裹住猎物，化为营养液。"
    },
    {
      "id": "primordial_soup_elite_02",
      "name": "病毒聚合体",
      "type": "elite",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 45,
        "atk": 12,
        "def": 3,
        "agi": 3,
        "per": 5
      },
      "tags": [
        3,
        28
      ],
      "lootableTalentId": "tal_viral_swarm",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "释放子病毒群攻击"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "进入潜伏状态，持续恢复"
            ]
          }
        ]
      },
      "description": "数十个噬菌体聚集成的复合体，协同释放出大量病毒粒子，侵染周围一切细胞。"
    },
    {
      "id": "primordial_soup_elite_03",
      "name": "原始水螅",
      "type": "elite",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 45,
        "atk": 12,
        "def": 3,
        "agi": 8,
        "per": 2
      },
      "tags": [
        5,
        10
      ],
      "lootableTalentId": "tal_cnidocyte",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "射出刺丝囊缠绕"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "全身刺丝齐射，束缚并麻痹"
            ]
          }
        ]
      },
      "description": "管状身体的一端长满触手，每个触手上密布微小的刺细胞，可射出毒丝。"
    },
    {
      "id": "primordial_soup_boss_01",
      "name": "原始巨核·普罗托斯",
      "type": "boss",
      "mapId": "primordial_soup",
      "stats": {
        "hp": 97,
        "atk": 30,
        "def": 9,
        "agi": 5,
        "per": 12
      },
      "tags": [
        10,
        11,
        24
      ],
      "lootableTalentId": "tal_photosynthesis",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": "boss_core_primal"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "伸出多条巨伪足横扫",
              "分裂小型拟态干扰"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "凝聚细胞质形成护盾",
              "触手释放消化酶"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "爆发原始吞噬力，尝试吞没整个空间"
            ]
          }
        ]
      },
      "description": "这团巨大的原生质仿佛拥有模糊的意志，无数流动的细胞核在体内明灭，是所有原始生命的始祖雏形。"
    },
    {
      "id": "tidal_flat_norm_01",
      "name": "沙蚕",
      "type": "normal",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 32,
        "atk": 6,
        "def": 2,
        "agi": 3,
        "per": 5
      },
      "tags": [
        1,
        17
      ],
      "lootableTalentId": "tal_bristle",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用刚毛刺击"
            ]
          }
        ]
      },
      "description": "环节身体在泥沙中蠕动，两侧的疣足密布细针般的刚毛，捕食小型甲壳类。"
    },
    {
      "id": "tidal_flat_norm_02",
      "name": "海蟑螂",
      "type": "normal",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 34,
        "atk": 7,
        "def": 2,
        "agi": 6,
        "per": 2
      },
      "tags": [
        9,
        15
      ],
      "lootableTalentId": "tal_carapace",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "快速冲撞撕咬"
            ]
          }
        ]
      },
      "description": "扁平的甲壳紧贴礁石，快速爬行时如一道灰色闪电，颚部能咬碎软体动物的壳。"
    },
    {
      "id": "tidal_flat_norm_03",
      "name": "滨螺",
      "type": "normal",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 32,
        "atk": 6,
        "def": 2,
        "agi": 5,
        "per": 4
      },
      "tags": [
        8,
        9
      ],
      "lootableTalentId": "tal_spiral_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "缩入螺壳防御",
              "伸出齿舌刮食"
            ]
          }
        ]
      },
      "description": "螺旋外壳提供坚固保护，潮水退去后它从壳口探出软体，用齿舌刮取岩石上的藻类。"
    },
    {
      "id": "tidal_flat_norm_04",
      "name": "招潮蟹",
      "type": "normal",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 32,
        "atk": 6,
        "def": 2,
        "agi": 7,
        "per": 3
      },
      "tags": [
        1,
        15
      ],
      "lootableTalentId": "tal_big_claw",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "高举大螯炫耀",
              "猛然钳击"
            ]
          }
        ]
      },
      "description": "一大一小两只螯足极为醒目，雄性高举大螯如同挥舞盾牌，防御领地并吸引异性。"
    },
    {
      "id": "tidal_flat_elite_01",
      "name": "岩蛞蝓",
      "type": "elite",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 54,
        "atk": 14,
        "def": 4,
        "agi": 5,
        "per": 6
      },
      "tags": [
        3,
        10
      ],
      "lootableTalentId": "tal_toxic_mucus",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "分泌毒黏液覆盖周身"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "分裂为两个小型个体，同时喷吐毒雾"
            ]
          }
        ]
      },
      "description": "肥厚的软体表面覆盖着一层荧亮的黏液，触之即麻痹，它缓缓蠕动在潮间带岩石上。"
    },
    {
      "id": "tidal_flat_elite_02",
      "name": "滩涂弹涂鱼",
      "type": "elite",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 53,
        "atk": 14,
        "def": 4,
        "agi": 4,
        "per": 3
      },
      "tags": [
        15,
        18
      ],
      "lootableTalentId": "tal_mud_jump",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "弹跳突击",
              "用胸鳍支撑短暂离开水体"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "钻入泥洞，从另一侧突然冲出"
            ]
          }
        ]
      },
      "description": "强壮的胸鳍让它能在泥滩上跳跃，鳃部可短暂呼吸空气，在潮水间来回穿梭猎食。"
    },
    {
      "id": "tidal_flat_elite_03",
      "name": "沙穴海葵",
      "type": "elite",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 53,
        "atk": 14,
        "def": 4,
        "agi": 8,
        "per": 4
      },
      "tags": [
        5,
        17
      ],
      "lootableTalentId": "tal_venom_tentacle",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "潜伏沙中伸出触手诱捕"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "所有触手同时释放刺细胞，造成麻痹"
            ]
          }
        ]
      },
      "description": "圆柱形的身体大半埋在沙中，只露出一圈绚丽的触手随水流摇曳，等待小生物触碰。"
    },
    {
      "id": "tidal_flat_boss_01",
      "name": "滩涂之主·泥噬巨蠕",
      "type": "boss",
      "mapId": "tidal_flat",
      "stats": {
        "hp": 120,
        "atk": 37,
        "def": 11,
        "agi": 8,
        "per": 8
      },
      "tags": [
        5,
        17,
        24
      ],
      "lootableTalentId": "tal_slime",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": "boss_core_venom"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "甩动巨型环节躯体横扫",
              "喷射泥浆降低视野"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "钻入深处并从随机位置暴起",
              "体表分泌腐蚀性黏液"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "疯狂吞噬周围泥沙与生命，体型急剧膨胀"
            ]
          }
        ]
      },
      "description": "这条隐藏在潮滩下的巨型蠕虫，每一次蠕动都让整片泥滩震颤，它是潮汐带上最古老的掠食者。"
    },
    {
      "id": "coral_rubble_norm_01",
      "name": "珊瑚虫",
      "type": "normal",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 32,
        "atk": 6,
        "def": 2,
        "agi": 3,
        "per": 5
      },
      "tags": [
        9,
        28
      ],
      "lootableTalentId": "tal_calcium_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "伸出触手滤食浮游生物"
            ]
          }
        ]
      },
      "description": "微小的水螅体集群栖息在石灰质骨骼上，无数的触手如同海底的星点繁花。"
    },
    {
      "id": "coral_rubble_norm_02",
      "name": "螳螂虾",
      "type": "normal",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 31,
        "atk": 6,
        "def": 2,
        "agi": 4,
        "per": 4
      },
      "tags": [
        1,
        4
      ],
      "lootableTalentId": "tal_hammer_punch",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "高速弹出掠肢重击"
            ]
          }
        ]
      },
      "description": "一对折叠的掠肢以极速弹出，敲碎贝壳或击晕小鱼，瞬间爆发力堪比利器。"
    },
    {
      "id": "coral_rubble_norm_03",
      "name": "海胆",
      "type": "normal",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 32,
        "atk": 6,
        "def": 2,
        "agi": 4,
        "per": 6
      },
      "tags": [
        12,
        8
      ],
      "lootableTalentId": "tal_spine_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "竖立长刺防御",
              "缓慢移动刮食藻类"
            ]
          }
        ]
      },
      "description": "浑圆的外壳布满锐利长刺，它缓缓爬行在珊瑚碎屑上，用复杂的咀嚼器研磨食物。"
    },
    {
      "id": "coral_rubble_norm_04",
      "name": "小丑鱼",
      "type": "normal",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 31,
        "atk": 6,
        "def": 2,
        "agi": 4,
        "per": 5
      },
      "tags": [
        15,
        18
      ],
      "lootableTalentId": "tal_agile_swim",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "在海葵间快速穿梭躲避",
              "啄击入侵者"
            ]
          }
        ]
      },
      "description": "鲜艳的橙色体侧带白色条纹，它灵巧地在海葵触手间穿行，与刺胞动物互利共生。"
    },
    {
      "id": "coral_rubble_elite_01",
      "name": "狮子鱼",
      "type": "elite",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 52,
        "atk": 14,
        "def": 4,
        "agi": 5,
        "per": 4
      },
      "tags": [
        3,
        14
      ],
      "lootableTalentId": "tal_venom_spine",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "展开剧毒鳍条逼近"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "将所有鳍条竖立如刺阵，并缓慢旋转"
            ]
          }
        ]
      },
      "description": "华丽延长的鳍条美如羽扇，每根鳍棘都藏着神经毒素，它悠然巡游，令小型鱼群闻风丧胆。"
    },
    {
      "id": "coral_rubble_elite_02",
      "name": "章鱼",
      "type": "elite",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 50,
        "atk": 12,
        "def": 3,
        "agi": 5,
        "per": 5
      },
      "tags": [
        11,
        17
      ],
      "lootableTalentId": "tal_camouflage",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "变色拟态融入环境",
              "腕足擒拿"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "喷吐墨汁制造烟幕",
              "急速后退脱离"
            ]
          }
        ]
      },
      "description": "柔软的身体能挤入极窄缝隙，皮肤色素细胞瞬间改变体色与纹理，堪比环境魔术师。"
    },
    {
      "id": "coral_rubble_elite_03",
      "name": "海鳗",
      "type": "elite",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 50,
        "atk": 13,
        "def": 3,
        "agi": 4,
        "per": 2
      },
      "tags": [
        2,
        17
      ],
      "lootableTalentId": "tal_serpent_bite",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "从岩穴突袭撕咬"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "身体缠绕猎物拖入缝隙"
            ]
          }
        ]
      },
      "description": "蛇形身躯大半藏在珊瑚礁洞穴中，只露出布满利齿的颚，等待猎物经过。"
    },
    {
      "id": "coral_rubble_boss_01",
      "name": "珊瑚巨灵·礁噬口",
      "type": "boss",
      "mapId": "coral_rubble",
      "stats": {
        "hp": 109,
        "atk": 33,
        "def": 11,
        "agi": 9,
        "per": 9
      },
      "tags": [
        5,
        9,
        27
      ],
      "lootableTalentId": "tal_predator_web",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": "100%"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "无数触手从珊瑚骨架中伸出抽打",
              "释放石灰质碎片散射"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "召唤珊瑚虫集群覆盖伤口",
              "触手带麻痹毒液"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "整片珊瑚礁活化，所有骨骼化为巨口吞噬一切"
            ]
          }
        ]
      },
      "description": "它不是单体生物，而是整片珊瑚碎屑的集体意志，无数水螅体同时共鸣，形成一张巨大的吞噬网。"
    },
    {
      "id": "temperate_forest_floor_norm_01",
      "name": "蜗牛",
      "type": "normal",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 35,
        "atk": 7,
        "def": 2,
        "agi": 6,
        "per": 4
      },
      "tags": [
        9,
        10
      ],
      "lootableTalentId": "tal_snail_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "缩壳防御",
              "伸出齿舌刮食腐叶"
            ]
          }
        ]
      },
      "description": "背负螺旋壳缓行在落叶层，两条触角顶端长着微小眼睛，感知湿度与光线。"
    },
    {
      "id": "temperate_forest_floor_norm_02",
      "name": "蜈蚣",
      "type": "normal",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 35,
        "atk": 7,
        "def": 2,
        "agi": 6,
        "per": 5
      },
      "tags": [
        3,
        15
      ],
      "lootableTalentId": "tal_venom_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "多足快速移动",
              "毒颚撕咬"
            ]
          }
        ]
      },
      "description": "修长的节状躯体两侧密布步足，一对毒颚如弯钩，能迅速麻痹小型节肢动物。"
    },
    {
      "id": "temperate_forest_floor_norm_03",
      "name": "鼠妇",
      "type": "normal",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 34,
        "atk": 7,
        "def": 2,
        "agi": 5,
        "per": 5
      },
      "tags": [
        9,
        12
      ],
      "lootableTalentId": "tal_roll_defense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "受惊时蜷成球状"
            ]
          }
        ]
      },
      "description": "体表覆有坚硬的节状甲片，遇险便滚成一颗小圆球，几乎密不透风。"
    },
    {
      "id": "temperate_forest_floor_norm_04",
      "name": "跳虫",
      "type": "normal",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 35,
        "atk": 7,
        "def": 2,
        "agi": 5,
        "per": 6
      },
      "tags": [
        15,
        15
      ],
      "lootableTalentId": "tal_spring_tail",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "弹跳躲避",
              "啃食真菌孢子"
            ]
          }
        ]
      },
      "description": "尾部弹器能瞬间将身体弹射到空中，是落叶层中最常见的微型分解者。"
    },
    {
      "id": "temperate_forest_floor_elite_01",
      "name": "鼩鼱",
      "type": "elite",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 54,
        "atk": 13,
        "def": 4,
        "agi": 6,
        "per": 5
      },
      "tags": [
        2,
        22
      ],
      "lootableTalentId": "tal_sonar_sense",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "高速冲刺撕咬",
              "发出超声波定位"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "进入狂暴状态，攻速提升"
            ]
          }
        ]
      },
      "description": "外形似鼠但吻部尖长，依靠高频回声定位穿梭于落叶间，代谢极快，永远在觅食。"
    },
    {
      "id": "temperate_forest_floor_elite_02",
      "name": "幽灵竹节虫",
      "type": "elite",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 57,
        "atk": 15,
        "def": 4,
        "agi": 3,
        "per": 5
      },
      "tags": [
        11,
        17
      ],
      "lootableTalentId": "tal_phantom_mimic",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "拟态枯枝静止不动",
              "突然挥动带刺前肢"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "释放化学气味迷惑天敌"
            ]
          }
        ]
      },
      "description": "身体像一节枯枝，连叶脉都模仿得惟妙惟肖，静伏时完全融入林下灌丛。"
    },
    {
      "id": "temperate_forest_floor_elite_03",
      "name": "毒蝾螈",
      "type": "elite",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 57,
        "atk": 15,
        "def": 4,
        "agi": 5,
        "per": 6
      },
      "tags": [
        3,
        10
      ],
      "lootableTalentId": "tal_toxic_skin",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "分泌皮肤神经毒素"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "脱落尾部吸引注意，主体潜行"
            ]
          }
        ]
      },
      "description": "色彩艳丽的皮肤警告着毒性，它缓慢爬行在潮湿的朽木上，捕食小型蠕虫。"
    },
    {
      "id": "temperate_forest_floor_boss_01",
      "name": "腐殖之王·菌丝巨怪",
      "type": "boss",
      "mapId": "temperate_forest_floor",
      "stats": {
        "hp": 123,
        "atk": 35,
        "def": 10,
        "agi": 10,
        "per": 9
      },
      "tags": [
        5,
        10,
        28
      ],
      "lootableTalentId": "tal_venom_tentacle",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": "100%"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "地下菌丝网束缚行动",
              "喷吐分解孢子"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "吸收落叶层腐殖质快速再生",
              "菌丝长出子实体释放毒气"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "整个林地地面化为消化垫，包裹所有生物"
            ]
          }
        ]
      },
      "description": "它由林地中千丝万缕的菌丝凝聚而成，是森林底层循环力量的化身，所过之处落叶化为齑粉。"
    },
    {
      "id": "east_african_savanna_norm_01",
      "name": "疣猪",
      "type": "normal",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 38,
        "atk": 7,
        "def": 2,
        "agi": 6,
        "per": 5
      },
      "tags": [
        2,
        8
      ],
      "lootableTalentId": "tal_tusk_charge",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "低头冲撞",
              "獠牙上挑"
            ]
          }
        ]
      },
      "description": "一对弯曲的獠牙从嘴中突出，疣猪低头狂奔时泥土飞溅，是草原上暴躁的掘食者。"
    },
    {
      "id": "east_african_savanna_norm_02",
      "name": "獴",
      "type": "normal",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 38,
        "atk": 8,
        "def": 2,
        "agi": 3,
        "per": 5
      },
      "tags": [
        15,
        28
      ],
      "lootableTalentId": "tal_group_hunt",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "群体协作围攻",
              "快速闪避"
            ]
          }
        ]
      },
      "description": "细长的小型食肉动物，群体出动时分工明确，甚至敢于围攻毒蛇。"
    },
    {
      "id": "east_african_savanna_norm_03",
      "name": "秃鹫",
      "type": "normal",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 37,
        "atk": 7,
        "def": 2,
        "agi": 3,
        "per": 4
      },
      "tags": [
        14,
        21
      ],
      "lootableTalentId": "tal_scavenger_sense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "俯冲啄击",
              "从高处监视"
            ]
          }
        ]
      },
      "description": "宽大的翅膀在热气流中盘旋，锐利的目光能发现数公里外的动物尸骸。"
    },
    {
      "id": "east_african_savanna_norm_04",
      "name": "斑马",
      "type": "normal",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 38,
        "atk": 7,
        "def": 2,
        "agi": 6,
        "per": 5
      },
      "tags": [
        15,
        28
      ],
      "lootableTalentId": "tal_herd_kick",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "群体奔跑踩踏",
              "后腿猛踢"
            ]
          }
        ]
      },
      "description": "黑白条纹在阳光下晃动，形成干扰视觉的效应，大群奔驰时蹄声如雷。"
    },
    {
      "id": "east_african_savanna_elite_01",
      "name": "鬣狗",
      "type": "elite",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 61,
        "atk": 15,
        "def": 5,
        "agi": 7,
        "per": 5
      },
      "tags": [
        2,
        28
      ],
      "lootableTalentId": "tal_crushing_jaw",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "团队包抄",
              "咬碎骨头"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "呼叫更多同伴增援"
            ]
          }
        ]
      },
      "description": "发出咯咯笑声般的叫声，强大的下颚能碾碎大型动物的腿骨，是草原机会主义猎手。"
    },
    {
      "id": "east_african_savanna_elite_02",
      "name": "猎豹",
      "type": "elite",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 63,
        "atk": 16,
        "def": 5,
        "agi": 5,
        "per": 2
      },
      "tags": [
        1,
        15
      ],
      "lootableTalentId": "tal_sprint_claw",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "瞬间加速冲刺",
              "前爪绊倒猎物"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "短暂休息后再次爆发极速"
            ]
          }
        ]
      },
      "description": "流线型躯体专为速度而生，从静止到百公里时速只需三秒，是草原上的闪电猎手。"
    },
    {
      "id": "east_african_savanna_elite_03",
      "name": "非洲野犬",
      "type": "elite",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 62,
        "atk": 16,
        "def": 5,
        "agi": 5,
        "per": 3
      },
      "tags": [
        2,
        28
      ],
      "lootableTalentId": "tal_coordinated_hunt",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "接力追逐耗尽猎物体力"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "分散包围，同时从多方向攻击"
            ]
          }
        ]
      },
      "description": "大圆耳朵和斑驳皮毛是其标志，群体配合天衣无缝，围猎成功率冠绝草原。"
    },
    {
      "id": "east_african_savanna_boss_01",
      "name": "草原霸主·金鬃狮",
      "type": "boss",
      "mapId": "east_african_savanna",
      "stats": {
        "hp": 141,
        "atk": 44,
        "def": 12,
        "agi": 10,
        "per": 11
      },
      "tags": [
        1,
        2,
        27
      ],
      "lootableTalentId": "tal_blade_tail",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": "boss_core_tyrant"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "震耳欲聋的狮吼降低士气",
              "利爪重击"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "召唤狮群协同攻击",
              "鬃毛竖起显得更加庞大"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "进入狂暴，无视伤痛疯狂扑咬"
            ]
          }
        ]
      },
      "description": "金色鬃毛在夕阳下如火焰燃烧，它是这片稀树草原无可争议的统治者，每一次呼吸都充满威严。"
    },
    {
      "id": "intertidal_rocks_norm_01",
      "name": "弹涂鱼",
      "type": "normal",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 52,
        "atk": 10,
        "def": 3,
        "agi": 6,
        "per": 4
      },
      "tags": [
        15,
        18
      ],
      "lootableTalentId": "tal_bite",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "跳跃起来用牙齿撕咬"
            ]
          }
        ]
      },
      "description": "能在陆地上跳跃的鱼类，虽然弱小但十分灵活，是生命登陆的先驱者。"
    },
    {
      "id": "intertidal_rocks_norm_02",
      "name": "招潮蟹",
      "type": "normal",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 51,
        "atk": 11,
        "def": 3,
        "agi": 8,
        "per": 6
      },
      "tags": [
        1,
        9
      ],
      "lootableTalentId": "tal_claw",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "挥舞大螯进行钳击"
            ]
          }
        ]
      },
      "description": "挥舞着巨大螯足的小型蟹类，领地意识极强，会用大螯警告入侵者。"
    },
    {
      "id": "intertidal_rocks_norm_03",
      "name": "海螺",
      "type": "normal",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 52,
        "atk": 11,
        "def": 3,
        "agi": 6,
        "per": 3
      },
      "tags": [
        9,
        8
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "缩回壳中进行防御反击"
            ]
          }
        ]
      },
      "description": "背着螺旋形坚硬外壳的软体动物，防御较高但行动缓慢，遇到危险会缩入壳中。"
    },
    {
      "id": "intertidal_rocks_elite_01",
      "name": "海葵",
      "type": "elite",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 84,
        "atk": 21,
        "def": 6,
        "agi": 3,
        "per": 2
      },
      "tags": [
        3,
        5
      ],
      "lootableTalentId": "tal_poison_gland",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "伸出有毒触手进行刺击"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "释放大量刺细胞毒素"
            ]
          }
        ]
      },
      "description": "附着在岩石上的刺胞动物，色彩斑斓的触手上布满了有毒的刺细胞，被蛰中会剧痛难忍。"
    },
    {
      "id": "intertidal_rocks_elite_02",
      "name": "藤壶群",
      "type": "elite",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 86,
        "atk": 23,
        "def": 7,
        "agi": 8,
        "per": 5
      },
      "tags": [
        9,
        28
      ],
      "lootableTalentId": "tal_thick_skin",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用坚硬的壳板进行撞击"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "分泌藤壶胶强化外壳"
            ]
          }
        ]
      },
      "description": "密密麻麻附着在岩石上的甲壳动物群落，每一个都有坚硬的壳板，整体防御力惊人。"
    },
    {
      "id": "intertidal_rocks_elite_03",
      "name": "岩藻守卫",
      "type": "elite",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 88,
        "atk": 23,
        "def": 7,
        "agi": 8,
        "per": 3
      },
      "tags": [
        10,
        9
      ],
      "lootableTalentId": "tal_regeneration",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用坚韧的藻体进行抽打"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "进行光合作用恢复生命"
            ]
          }
        ]
      },
      "description": "被岩藻覆盖的岩石生物，能进行光合作用恢复生命，藻体坚韧如皮革。"
    },
    {
      "id": "intertidal_rocks_boss_01",
      "name": "远古蝎鲎",
      "type": "boss",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 200,
        "atk": 62,
        "def": 18,
        "agi": 5,
        "per": 8
      },
      "tags": [
        3,
        9,
        1
      ],
      "lootableTalentId": "tal_venom_fang",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用蝎尾进行毒刺攻击",
              "挥舞鲎的尾剑进行横扫"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "蜷缩进鲎壳中大幅提升防御",
              "从螯足释放消化液"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "爆发远古生命力，进行疯狂的连击"
            ]
          }
        ]
      },
      "description": "生活在潮间带的远古生物，有着蝎子的尾巴和鲎的坚硬外壳，是生命登陆时代的顶级掠食者。它的尾刺含有古老的毒素，能让猎物在痛苦中死去。"
    },
    {
      "id": "fern_swamp_norm_01",
      "name": "巨型马陆",
      "type": "normal",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 52,
        "atk": 11,
        "def": 4,
        "agi": 4,
        "per": 4
      },
      "tags": [
        9,
        8
      ],
      "lootableTalentId": "tal_thick_skin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用无数对脚进行碾压"
            ]
          }
        ]
      },
      "description": "长达两米的多足类动物，身体分节，外骨骼坚硬，在腐烂的植物上缓缓爬行。"
    },
    {
      "id": "fern_swamp_norm_02",
      "name": "古蜻蜓",
      "type": "normal",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 53,
        "atk": 10,
        "def": 4,
        "agi": 4,
        "per": 6
      },
      "tags": [
        14,
        21
      ],
      "lootableTalentId": "tal_flight",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "从空中俯冲进行啄击"
            ]
          }
        ]
      },
      "description": "翼展达70厘米的远古蜻蜓，飞行速度极快，复眼能360度观察周围环境。"
    },
    {
      "id": "fern_swamp_norm_03",
      "name": "肺鱼",
      "type": "normal",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 53,
        "atk": 11,
        "def": 4,
        "agi": 3,
        "per": 5
      },
      "tags": [
        10,
        8
      ],
      "lootableTalentId": "tal_regeneration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用有力的颌部进行撕咬"
            ]
          }
        ]
      },
      "description": "能在旱季用肺呼吸的鱼类，生命力顽强，即使在泥中休眠数月也能存活。"
    },
    {
      "id": "fern_swamp_elite_01",
      "name": "始祖鸟",
      "type": "elite",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 88,
        "atk": 23,
        "def": 6,
        "agi": 4,
        "per": 5
      },
      "tags": [
        14,
        1
      ],
      "lootableTalentId": "tal_flight",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "从空中俯冲用利爪攻击",
              "用尖锐的牙齿撕咬"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "发出刺耳的鸣叫扰乱敌人"
            ]
          }
        ]
      },
      "description": "拥有羽毛和牙齿的早期鸟类，虽然飞行能力不强，但能从空中俯冲攻击，是沼泽上空的掠食者。"
    },
    {
      "id": "fern_swamp_elite_02",
      "name": "巨脉蜻蜓",
      "type": "elite",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 89,
        "atk": 24,
        "def": 6,
        "agi": 7,
        "per": 2
      },
      "tags": [
        14,
        15
      ],
      "lootableTalentId": "tal_lightning_reflex",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "高速飞行中用翅膀切割",
              "用巨大的复眼锁定弱点"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "进行极限闪避后反击"
            ]
          }
        ]
      },
      "description": "翼展达75厘米的巨型蜻蜓，是石炭纪天空的霸主，飞行速度和机动性都无与伦比。"
    },
    {
      "id": "fern_swamp_elite_03",
      "name": "鳞木精",
      "type": "elite",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 90,
        "atk": 23,
        "def": 7,
        "agi": 7,
        "per": 3
      },
      "tags": [
        5,
        10,
        9
      ],
      "lootableTalentId": "tal_mimicry",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "60%_1-2",
        "fragments_3": "20%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用坚硬的树皮进行撞击",
              "释放孢子迷雾"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "用树根束缚敌人",
              "树皮再生恢复生命"
            ]
          }
        ]
      },
      "description": "由高耸的鳞木进化而来的精灵，能释放孢子迷雾控制敌人，树皮坚硬如铁，还能再生。"
    },
    {
      "id": "fern_swamp_boss_01",
      "name": "远古巨蝎",
      "type": "boss",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 204,
        "atk": 59,
        "def": 18,
        "agi": 8,
        "per": 12
      },
      "tags": [
        3,
        1,
        9
      ],
      "lootableTalentId": "tal_poison_gland",
      "drops": {
        "fragments_1": "8-12",
        "fragments_2": "100%_3-5",
        "fragments_3": "100%_1-2",
        "fragments_4": "25%_1",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用巨螯进行钳击",
              "用毒尾进行刺击"
            ]
          },
          {
            "trigger": "生命<50%",
            "actions": [
              "钻入地下进行突袭",
              "喷射毒液进行范围攻击"
            ]
          },
          {
            "trigger": "生命<20%",
            "actions": [
              "进入狂暴状态，攻击速度翻倍"
            ]
          }
        ]
      },
      "description": "生活在蕨类沼泽中的巨型蝎子，体长超过三米，毒液能腐蚀一切，是生命登陆时代的陆地霸主。它的巨螯能夹碎骨头，毒尾能瞬间麻痹猎物。"
    },
    {
      "id": "intertidal_rocks_norm_04",
      "name": "岩藻蜗牛",
      "type": "normal",
      "mapId": "intertidal_rocks",
      "stats": {
        "hp": 52,
        "atk": 10,
        "def": 3,
        "agi": 5,
        "per": 6
      },
      "tags": [
        9,
        10
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "用齿舌刮食岩藻，偶尔进行撞击"
            ]
          }
        ]
      },
      "description": "背着厚重外壳的蜗牛，在岩礁上缓慢爬行，以岩藻为食，遇到危险会缩入壳中。"
    },
    {
      "id": "fern_swamp_norm_04",
      "name": "沼泽水蛭",
      "type": "normal",
      "mapId": "fern_swamp",
      "stats": {
        "hp": 54,
        "atk": 10,
        "def": 4,
        "agi": 3,
        "per": 2
      },
      "tags": [
        2,
        3
      ],
      "lootableTalentId": "tal_bite",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "吸附在猎物身上吸血"
            ]
          }
        ]
      },
      "description": "生活在沼泽中的巨型水蛭，能吸附在猎物身上吸血，被它吸附后会持续失血。"
    },
    {
      "id": "ice_tundra_rabbit",
      "name": "冰原兔",
      "type": "normal",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 68,
        "atk": 14,
        "def": 4,
        "agi": 8,
        "per": 3
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_ice_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "10%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "一种适应了极寒环境的兔子，毛发厚密，行动敏捷。"
    },
    {
      "id": "ice_tundra_fox",
      "name": "雪狐",
      "type": "normal",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 69,
        "atk": 13,
        "def": 5,
        "agi": 5,
        "per": 4
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_frost_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "白色的狐狸在雪地中几乎隐形，擅长偷袭。"
    },
    {
      "id": "ice_tundra_owl",
      "name": "雪鸮",
      "type": "normal",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 69,
        "atk": 14,
        "def": 5,
        "agi": 7,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_glacial_thick_skin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "巨大的白色猫头鹰，能在暴风雪中精准定位猎物。"
    },
    {
      "id": "ice_tundra_goat",
      "name": "冰山羊",
      "type": "normal",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 69,
        "atk": 14,
        "def": 5,
        "agi": 5,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "10%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在陡峭冰壁上如履平地的山羊，羊角坚硬。"
    },
    {
      "id": "ice_tundra_wolf",
      "name": "冰原狼",
      "type": "elite",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 120,
        "atk": 31,
        "def": 8,
        "agi": 8,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "40%_1",
        "fragments_3": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "群体行动的凶猛狼类，白色毛发与雪地融为一体。"
    },
    {
      "id": "ice_tundra_bear",
      "name": "冰熊",
      "type": "elite",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 117,
        "atk": 31,
        "def": 9,
        "agi": 8,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "50%_1",
        "fragments_3": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "体型巨大的白熊，一掌能拍碎厚冰。"
    },
    {
      "id": "ice_tundra_saber",
      "name": "剑齿虎",
      "type": "elite",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 119,
        "atk": 32,
        "def": 9,
        "agi": 6,
        "per": 3
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_myriad_beast_divinity",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "长着巨大獠牙的远古猫科动物，一击致命。"
    },
    {
      "id": "ice_tundra_mammoth",
      "name": "远古猛犸象",
      "type": "boss",
      "mapId": "frozen_tundra",
      "stats": {
        "hp": 282,
        "atk": 85,
        "def": 28,
        "agi": 5,
        "per": 12
      },
      "tags": [
        27,
        8
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_2",
        "fragments_3": "60%_1",
        "fragments_4": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "冰河世纪的巨兽，长长的象牙和厚重的皮毛让它成为冰原的霸主。它的怒吼能引发雪崩。"
    },
    {
      "id": "glacier_rift_bat",
      "name": "冰蝙蝠",
      "type": "normal",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 68,
        "atk": 13,
        "def": 4,
        "agi": 8,
        "per": 3
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_ice_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "栖息在冰川裂缝中的蝙蝠，能在黑暗中精准导航。"
    },
    {
      "id": "glacier_rift_spider",
      "name": "冰蜘蛛",
      "type": "normal",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 67,
        "atk": 13,
        "def": 5,
        "agi": 7,
        "per": 4
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_glacial_thick_skin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在冰壁上结网的蜘蛛，蛛丝在低温下依然坚韧。"
    },
    {
      "id": "glacier_rift_fish",
      "name": "冰下鱼",
      "type": "normal",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 67,
        "atk": 13,
        "def": 4,
        "agi": 6,
        "per": 3
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "10%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在冰川暗河中生存的鱼类，血液中有抗冻蛋白。"
    },
    {
      "id": "glacier_rift_crab",
      "name": "冰蟹",
      "type": "normal",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 68,
        "atk": 14,
        "def": 4,
        "agi": 4,
        "per": 6
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_ice_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "外壳如冰般透明的螃蟹，钳子能夹碎冰块。"
    },
    {
      "id": "glacier_rift_worm",
      "name": "冰蠕虫",
      "type": "elite",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 113,
        "atk": 30,
        "def": 8,
        "agi": 5,
        "per": 6
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "45%_1",
        "fragments_3": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在冰层中钻行的巨大蠕虫，能融化冰层开辟通道。"
    },
    {
      "id": "glacier_rift_yeti",
      "name": "雪怪",
      "type": "elite",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 111,
        "atk": 30,
        "def": 9,
        "agi": 5,
        "per": 2
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_frost_armor",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "55%_1",
        "fragments_3": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "传说中的雪山怪物，高大威猛，浑身覆盖白色长毛。"
    },
    {
      "id": "glacier_rift_serpent",
      "name": "冰蛇",
      "type": "elite",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 111,
        "atk": 28,
        "def": 8,
        "agi": 5,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_myriad_beast_divinity",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在冰面上滑行如飞的巨蛇，毒液能冻结血液。"
    },
    {
      "id": "glacier_rift_dragon",
      "name": "冰霜巨龙",
      "type": "boss",
      "mapId": "glacier_rift",
      "stats": {
        "hp": 265,
        "atk": 79,
        "def": 24,
        "agi": 5,
        "per": 7
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_ice_shell",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_2",
        "fragments_3": "70%_1",
        "fragments_4": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "沉睡在冰川深处的远古巨龙，它的吐息能冻结一切。据说它的鳞片是最好的冰系天赋来源。"
    },
    {
      "id": "permafrost_penguin",
      "name": "帝企鹅",
      "type": "normal",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 65,
        "atk": 13,
        "def": 4,
        "agi": 3,
        "per": 4
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_frost_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "10%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在冰原上群居的企鹅，虽然走路笨拙但游泳极快。"
    },
    {
      "id": "permafrost_seal",
      "name": "冰海豹",
      "type": "normal",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 64,
        "atk": 12,
        "def": 5,
        "agi": 7,
        "per": 4
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_glacial_thick_skin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在冰面上晒太阳的海豹，脂肪厚得能抵御严寒。"
    },
    {
      "id": "permafrost_lemming",
      "name": "旅鼠",
      "type": "normal",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 63,
        "atk": 13,
        "def": 4,
        "agi": 7,
        "per": 2
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "8%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "繁殖力极强的小型啮齿动物，数量多时会集体迁徙。"
    },
    {
      "id": "permafrost_ermine",
      "name": "白鼬",
      "type": "normal",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 65,
        "atk": 13,
        "def": 4,
        "agi": 8,
        "per": 4
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "冬季毛色纯白的小型食肉动物，凶猛程度远超体型。"
    },
    {
      "id": "permafrost_walrus",
      "name": "海象",
      "type": "elite",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 104,
        "atk": 27,
        "def": 8,
        "agi": 5,
        "per": 4
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_tusk_charge",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "50%_1",
        "fragments_3": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "长着巨大獠牙的海象，脂肪层厚得几乎刀枪不入。"
    },
    {
      "id": "permafrost_polar_bear",
      "name": "北极熊",
      "type": "elite",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 110,
        "atk": 29,
        "def": 9,
        "agi": 7,
        "per": 2
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_ice_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "冰原上的顶级掠食者，嗅觉灵敏，能在数公里外发现猎物。"
    },
    {
      "id": "permafrost_giant_sloth",
      "name": "大地懒",
      "type": "elite",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 107,
        "atk": 27,
        "def": 8,
        "agi": 3,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_beast_intimidation",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "55%_1",
        "fragments_3": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "冰河世纪的巨型树懒，虽然行动缓慢但力量惊人，爪子能撕开冰面。"
    },
    {
      "id": "permafrost_titan",
      "name": "冰河泰坦",
      "type": "boss",
      "mapId": "permafrost_plain",
      "stats": {
        "hp": 255,
        "atk": 76,
        "def": 21,
        "agi": 10,
        "per": 10
      },
      "tags": [
        7,
        8
      ],
      "lootableTalentId": "tal_frost_armor",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "80%_1",
        "fragments_4": "30%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "从永冻层中苏醒的远古泰坦，它的身体由冰雪和远古生物骸骨构成。它的存在本身就是冰河时代的象征。"
    },
    {
      "id": "dragon_mountain_goat",
      "name": "岩山羊",
      "type": "normal",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 91,
        "atk": 18,
        "def": 6,
        "agi": 8,
        "per": 6
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在陡峭山崖上如履平地的山羊，羊角坚硬如铁。"
    },
    {
      "id": "dragon_mountain_eagle",
      "name": "山鹰",
      "type": "normal",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 93,
        "atk": 18,
        "def": 6,
        "agi": 8,
        "per": 4
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_burn_penetration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在高空中盘旋的猛禽，能从数百米高空俯冲捕猎。"
    },
    {
      "id": "dragon_mountain_snake",
      "name": "山蝮蛇",
      "type": "normal",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 91,
        "atk": 19,
        "def": 6,
        "agi": 4,
        "per": 2
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_thermal_absorb",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "隐藏在石缝中的毒蛇，毒液能让猎物瞬间麻痹。"
    },
    {
      "id": "dragon_mountain_bear",
      "name": "棕熊",
      "type": "normal",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 94,
        "atk": 18,
        "def": 6,
        "agi": 6,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_nirvana_flame",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "体型巨大的山地棕熊，一掌能拍碎岩石。"
    },
    {
      "id": "dragon_mountain_wyvern",
      "name": "翼龙",
      "type": "elite",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 154,
        "atk": 39,
        "def": 12,
        "agi": 6,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath_2",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "50%_1",
        "fragments_3": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "能在天空中自由飞翔的小型龙类，俯冲攻击威力巨大。"
    },
    {
      "id": "dragon_mountain_drake",
      "name": "山龙",
      "type": "elite",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 161,
        "atk": 42,
        "def": 12,
        "agi": 5,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_heat_storage",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "生活在山脉中的小型龙类，鳞片坚硬，吐息能融化岩石。"
    },
    {
      "id": "dragon_mountain_griffin",
      "name": "狮鹫",
      "type": "elite",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 155,
        "atk": 38,
        "def": 13,
        "agi": 6,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_calcium_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "55%_1",
        "fragments_3": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "狮头鹰身的传说生物，锋利的爪子能撕开龙鳞。"
    },
    {
      "id": "dragon_mountain_king",
      "name": "山脉龙王",
      "type": "boss",
      "mapId": "dragon_spine_mountains",
      "stats": {
        "hp": 404,
        "atk": 122,
        "def": 35,
        "agi": 8,
        "per": 12
      },
      "tags": [
        27,
        6
      ],
      "lootableTalentId": "tal_king_roar",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "80%_1",
        "fragments_4": "30%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "统治这片山脉的古老巨龙，它的怒吼能引发山崩，它的龙息能融化整座山峰。据说它已经活了上万年。"
    },
    {
      "id": "volcano_lizard",
      "name": "火蜥蜴",
      "type": "normal",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 84,
        "atk": 16,
        "def": 6,
        "agi": 5,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath_2",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在岩浆中游泳的蜥蜴，身体温度高得能点燃树木。"
    },
    {
      "id": "volcano_beetle",
      "name": "熔岩甲虫",
      "type": "normal",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 87,
        "atk": 17,
        "def": 6,
        "agi": 3,
        "per": 4
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_burn_penetration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "外壳由冷却岩浆构成的甲虫，几乎刀枪不入。"
    },
    {
      "id": "volcano_salamander",
      "name": "火蝾螈",
      "type": "normal",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 87,
        "atk": 17,
        "def": 6,
        "agi": 4,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_thermal_absorb",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在火焰中诞生的两栖生物，它的皮肤能分泌易燃液体。"
    },
    {
      "id": "volcano_bat",
      "name": "火蝙蝠",
      "type": "normal",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 85,
        "atk": 16,
        "def": 5,
        "agi": 4,
        "per": 2
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在火山洞穴中群居的蝙蝠，翅膀扇动能掀起热浪。"
    },
    {
      "id": "volcano_golem",
      "name": "熔岩石人",
      "type": "elite",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 149,
        "atk": 38,
        "def": 10,
        "agi": 3,
        "per": 2
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_heat_storage",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "50%_1",
        "fragments_3": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由冷却岩浆构成的石人，核心是一团永不熄灭的火焰。"
    },
    {
      "id": "volcano_phoenix",
      "name": "火凤凰",
      "type": "elite",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 151,
        "atk": 41,
        "def": 12,
        "agi": 4,
        "per": 2
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_nirvana_flame",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在火焰中重生的神鸟，它的羽毛燃烧着永恒之火，死亡后会化为灰烬重生。"
    },
    {
      "id": "volcano_fire_dragon",
      "name": "火龙",
      "type": "elite",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 145,
        "atk": 39,
        "def": 11,
        "agi": 8,
        "per": 5
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "65%_1",
        "fragments_3": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "栖息在火山中的龙类，它的龙息温度高达数千度，能熔化一切金属。"
    },
    {
      "id": "volcano_emperor",
      "name": "炎魔皇帝",
      "type": "boss",
      "mapId": "volcanic_lava",
      "stats": {
        "hp": 354,
        "atk": 103,
        "def": 31,
        "agi": 8,
        "per": 7
      },
      "tags": [
        6,
        25
      ],
      "lootableTalentId": "tal_burn_penetration",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "85%_1",
        "fragments_4": "35%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由火山核心的纯粹火焰凝聚而成的魔神，它的存在让整座火山永不熄灭。据说它是第一条火龙的化身。"
    },
    {
      "id": "abyss_worm",
      "name": "龙骸虫",
      "type": "normal",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 89,
        "atk": 17,
        "def": 6,
        "agi": 7,
        "per": 6
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath_2",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "以龙骸为食的巨大蠕虫，体内积累了大量龙气。"
    },
    {
      "id": "abyss_bat",
      "name": "深渊蝙蝠",
      "type": "normal",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 86,
        "atk": 18,
        "def": 5,
        "agi": 4,
        "per": 2
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在深渊中飞行的蝙蝠，能在完全黑暗中精准定位猎物。"
    },
    {
      "id": "abyss_spider",
      "name": "龙丝蜘蛛",
      "type": "normal",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 88,
        "atk": 17,
        "def": 6,
        "agi": 6,
        "per": 6
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_thermal_absorb",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "用龙气凝结成蛛丝的蜘蛛，它的网能困住小型龙类。"
    },
    {
      "id": "abyss_slime",
      "name": "龙液史莱姆",
      "type": "normal",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 89,
        "atk": 18,
        "def": 6,
        "agi": 5,
        "per": 6
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_nirvana_flame",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由龙血和龙气混合形成的史莱姆，吞噬了大量龙的力量。"
    },
    {
      "id": "abyss_drake",
      "name": "骸骨龙",
      "type": "elite",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 152,
        "atk": 41,
        "def": 12,
        "agi": 8,
        "per": 4
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_burn_penetration",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由龙骸和龙气重新凝聚而成的不死龙，它的眼中燃烧着不灭的怨念。"
    },
    {
      "id": "abyss_guardian",
      "name": "守墓龙",
      "type": "elite",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 153,
        "atk": 39,
        "def": 11,
        "agi": 5,
        "per": 3
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_heat_storage",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "65%_1",
        "fragments_3": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "守护龙墓的古老龙类，它已经在这里守护了数千年，力量深不可测。"
    },
    {
      "id": "abyss_dragon_spirit",
      "name": "龙魂",
      "type": "elite",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 156,
        "atk": 42,
        "def": 12,
        "agi": 6,
        "per": 2
      },
      "tags": [
        6,
        9,
        14,
        27
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "70%_1",
        "fragments_3": "30%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "死去巨龙的灵魂凝聚体，它保留了生前的大部分力量，能释放强大的龙息。"
    },
    {
      "id": "abyss_dragon_emperor",
      "name": "龙皇遗骸",
      "type": "boss",
      "mapId": "dragon_nest_abyss",
      "stats": {
        "hp": 387,
        "atk": 116,
        "def": 32,
        "agi": 6,
        "per": 6
      },
      "tags": [
        27,
        23
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "90%_1",
        "fragments_4": "40%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "传说中第一代龙皇的遗骸，即使在死后万年，它的身体依然散发着令人窒息的龙威。任何靠近它的生物都会感受到来自血脉深处的恐惧。"
    },
    {
      "id": "insect_forest_ant",
      "name": "巨型蚂蚁",
      "type": "normal",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 55,
        "atk": 11,
        "def": 3,
        "agi": 7,
        "per": 4
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_scale_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "比狗还大的蚂蚁，群体行动，力量惊人。"
    },
    {
      "id": "insect_forest_butterfly",
      "name": "巨型蝴蝶",
      "type": "normal",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 57,
        "atk": 12,
        "def": 4,
        "agi": 3,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_heat_resistant_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "翅膀展开有两米宽的蝴蝶，鳞片能让人产生幻觉。"
    },
    {
      "id": "insect_forest_beetle",
      "name": "巨型甲虫",
      "type": "normal",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 58,
        "atk": 12,
        "def": 4,
        "agi": 8,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "外壳坚硬如钢的甲虫，头上的角能刺穿树木。"
    },
    {
      "id": "insect_forest_bee",
      "name": "巨型蜜蜂",
      "type": "normal",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 58,
        "atk": 12,
        "def": 4,
        "agi": 7,
        "per": 2
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_desert_tenacity",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "比拳头还大的蜜蜂，毒针能注入强效毒素。"
    },
    {
      "id": "insect_forest_mantis",
      "name": "巨型螳螂",
      "type": "elite",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 95,
        "atk": 24,
        "def": 8,
        "agi": 4,
        "per": 6
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "55%_1",
        "fragments_3": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "比人还高的螳螂，镰刀般的前肢能瞬间斩断猎物。"
    },
    {
      "id": "insect_forest_spider",
      "name": "巨型蜘蛛",
      "type": "elite",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 92,
        "atk": 25,
        "def": 6,
        "agi": 6,
        "per": 6
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_snail_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "能织出比钢索还坚韧的蛛网的巨型蜘蛛，毒液能麻痹神经。"
    },
    {
      "id": "insect_forest_centipede",
      "name": "巨型蜈蚣",
      "type": "elite",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 91,
        "atk": 23,
        "def": 7,
        "agi": 3,
        "per": 6
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_calcium_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "65%_1",
        "fragments_3": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "长达数米的巨型蜈蚣，每一节都有一对毒爪，被它缠住就无法逃脱。"
    },
    {
      "id": "insect_forest_king",
      "name": "虫群之王",
      "type": "boss",
      "mapId": "giant_insect_forest",
      "stats": {
        "hp": 216,
        "atk": 64,
        "def": 18,
        "agi": 7,
        "per": 8
      },
      "tags": [
        28,
        3
      ],
      "lootableTalentId": "tal_coordinated_hunt",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "85%_1",
        "fragments_4": "35%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "统治整片巨虫森林的王者，它的信息素能指挥无数昆虫为它作战。据说它是有史以来最大的昆虫。"
    },
    {
      "id": "spider_maze_small",
      "name": "小蜘蛛",
      "type": "normal",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 59,
        "atk": 11,
        "def": 4,
        "agi": 4,
        "per": 4
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_heat_resistant_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "10%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在迷宫中随处可见的小蜘蛛，虽然体型小但数量众多。"
    },
    {
      "id": "spider_maze_poison",
      "name": "毒蜘蛛",
      "type": "normal",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 61,
        "atk": 12,
        "def": 4,
        "agi": 5,
        "per": 6
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_spiral_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "色彩斑斓的毒蜘蛛，它的毒液能在数秒内麻痹猎物。"
    },
    {
      "id": "spider_maze_jumping",
      "name": "跳蛛",
      "type": "normal",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 57,
        "atk": 11,
        "def": 3,
        "agi": 4,
        "per": 2
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_hard_bone",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "视力极佳的跳蛛，能从数米外精准跳跃到猎物身上。"
    },
    {
      "id": "spider_maze_trapdoor",
      "name": "活板门蛛",
      "type": "normal",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 58,
        "atk": 11,
        "def": 4,
        "agi": 3,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_ambush",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "隐藏在地下的活板门蛛，当猎物经过时会突然冲出。"
    },
    {
      "id": "spider_maze_wolf",
      "name": "狼蛛",
      "type": "elite",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 97,
        "atk": 25,
        "def": 7,
        "agi": 6,
        "per": 5
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_carapace",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "不结网的巨型狼蛛，靠速度和力量捕猎，它的毒牙能穿透厚皮。"
    },
    {
      "id": "spider_maze_orb",
      "name": "圆网蛛",
      "type": "elite",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 99,
        "atk": 26,
        "def": 8,
        "agi": 6,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "65%_1",
        "fragments_3": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "能织出完美圆形大网的圆网蛛，它的蛛丝比钢还坚韧，猎物一旦被粘住就无法逃脱。"
    },
    {
      "id": "spider_maze_tarantula",
      "name": "捕鸟蛛",
      "type": "elite",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 97,
        "atk": 26,
        "def": 7,
        "agi": 7,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "70%_1",
        "fragments_3": "30%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "体型最大的蜘蛛之一，浑身覆盖着毒毛，能发射毒毛攻击远处的猎物。"
    },
    {
      "id": "spider_maze_queen",
      "name": "蜘蛛女王",
      "type": "boss",
      "mapId": "spider_web_maze",
      "stats": {
        "hp": 229,
        "atk": 67,
        "def": 22,
        "agi": 7,
        "per": 12
      },
      "tags": [
        3,
        5
      ],
      "lootableTalentId": "tal_poison_gland",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "90%_1",
        "fragments_4": "40%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "统治整个蛛网迷宫的女王，她的身体比房子还大，能产下无数蜘蛛卵。她的蛛丝能困住任何闯入者。"
    },
    {
      "id": "insect_nest_larva",
      "name": "幼虫",
      "type": "normal",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 61,
        "atk": 12,
        "def": 4,
        "agi": 6,
        "per": 4
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_heat_resistant_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "10%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在虫巢中蠕动的白色幼虫，虽然行动缓慢但食欲惊人。"
    },
    {
      "id": "insect_nest_worker",
      "name": "工蚁",
      "type": "normal",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 62,
        "atk": 13,
        "def": 4,
        "agi": 6,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "勤劳的工蚁，负责维护虫巢和寻找食物，数量众多。"
    },
    {
      "id": "insect_nest_soldier",
      "name": "兵蚁",
      "type": "normal",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 62,
        "atk": 13,
        "def": 4,
        "agi": 6,
        "per": 4
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_spiral_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "全副武装的兵蚁，大颚能轻松咬碎骨头，是虫巢的守卫者。"
    },
    {
      "id": "insect_nest_drone",
      "name": "雄蜂",
      "type": "normal",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 60,
        "atk": 12,
        "def": 4,
        "agi": 4,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_carapace",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "12%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "负责交配的雄蜂，虽然不参与战斗但飞行速度极快。"
    },
    {
      "id": "insect_nest_guardian",
      "name": "虫巢守卫",
      "type": "elite",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 106,
        "atk": 28,
        "def": 8,
        "agi": 4,
        "per": 6
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_snail_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "60%_1",
        "fragments_3": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "专门守护虫巢深处的精英昆虫，它的外壳比普通昆虫厚三倍。"
    },
    {
      "id": "insect_nest_assassin",
      "name": "刺客虫",
      "type": "elite",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 103,
        "atk": 27,
        "def": 7,
        "agi": 3,
        "per": 4
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_diamond_shell",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "65%_1",
        "fragments_3": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "隐藏在暗处的刺客虫，能在瞬间爆发出惊人的速度，一击致命。"
    },
    {
      "id": "insect_nest_breeder",
      "name": "繁殖虫",
      "type": "elite",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 101,
        "atk": 26,
        "def": 7,
        "agi": 6,
        "per": 3
      },
      "tags": [
        9,
        3,
        28,
        15
      ],
      "lootableTalentId": "tal_desert_tenacity",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "70%_1",
        "fragments_3": "30%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "能快速繁殖后代的繁殖虫，在战斗中会不断召唤小虫协助战斗。"
    },
    {
      "id": "insect_nest_queen",
      "name": "虫后",
      "type": "boss",
      "mapId": "insect_nest_abyss",
      "stats": {
        "hp": 248,
        "atk": 73,
        "def": 23,
        "agi": 7,
        "per": 9
      },
      "tags": [
        28,
        3
      ],
      "lootableTalentId": "tal_viral_swarm",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "95%_1",
        "fragments_4": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "整个虫巢的母亲，她的身体比房子还大，每天能产下数千枚卵。她的信息素能控制整个虫巢的所有昆虫，是虫巢绝对的统治者。"
    },
    {
      "id": "holy_ruins_knight",
      "name": "堕落骑士",
      "type": "normal",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 111,
        "atk": 21,
        "def": 7,
        "agi": 6,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被黑暗力量腐蚀的圣骑士，还保留着部分战斗技巧。"
    },
    {
      "id": "holy_ruins_priest",
      "name": "堕落祭司",
      "type": "normal",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 110,
        "atk": 21,
        "def": 7,
        "agi": 3,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_mind_stun",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "曾经的神圣祭司，现在用黑暗魔法攻击入侵者。"
    },
    {
      "id": "holy_ruins_guardian",
      "name": "石像守卫",
      "type": "normal",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 109,
        "atk": 21,
        "def": 8,
        "agi": 5,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_holy_light_protection",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由神圣力量驱动的石像守卫，不知疲倦地守护着遗迹。"
    },
    {
      "id": "holy_ruins_creature",
      "name": "神圣生物",
      "type": "normal",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 114,
        "atk": 22,
        "def": 7,
        "agi": 3,
        "per": 2
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被神圣力量改造的生物，浑身散发着金色的光芒。"
    },
    {
      "id": "holy_ruins_templar",
      "name": "圣殿骑士",
      "type": "elite",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 193,
        "atk": 50,
        "def": 15,
        "agi": 3,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_eternal_skeleton",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "70%_1",
        "fragments_3": "30%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "精英级的圣殿骑士，装备着神圣铠甲和圣剑，战斗力极强。"
    },
    {
      "id": "holy_ruins_archangel",
      "name": "大天使幻影",
      "type": "elite",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 201,
        "atk": 52,
        "def": 14,
        "agi": 3,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "75%_1",
        "fragments_3": "35%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由神圣力量构成的大天使幻影，能释放强大的神圣魔法。"
    },
    {
      "id": "holy_ruins_paladin",
      "name": "圣骑士长",
      "type": "elite",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 193,
        "atk": 52,
        "def": 13,
        "agi": 6,
        "per": 2
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "80%_1",
        "fragments_3": "38%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "圣骑士团的团长，拥有最强大的神圣力量和战斗技巧。"
    },
    {
      "id": "holy_ruins_king",
      "name": "圣剑之主",
      "type": "boss",
      "mapId": "holy_sword_ruins",
      "stats": {
        "hp": 514,
        "atk": 147,
        "def": 49,
        "agi": 10,
        "per": 8
      },
      "tags": [
        1,
        25
      ],
      "lootableTalentId": "tal_unquenchable_flame",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "95%_1",
        "fragments_4": "50%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "传说中圣剑的主人，他用圣剑击败了无数邪恶，最终选择在遗迹中沉睡。他的圣剑能斩断一切邪恶。"
    },
    {
      "id": "battlefield_soldier",
      "name": "神兵残骸",
      "type": "normal",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 125,
        "atk": 24,
        "def": 8,
        "agi": 8,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_mind_stun",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被神力驱动的神兵残骸，还在重复着千年前的战斗动作。"
    },
    {
      "id": "battlefield_demon",
      "name": "魔兵残骸",
      "type": "normal",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 119,
        "atk": 24,
        "def": 8,
        "agi": 7,
        "per": 5
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被魔力驱动的魔兵残骸，眼中还闪烁着邪恶的光芒。"
    },
    {
      "id": "battlefield_spirit",
      "name": "战魂",
      "type": "normal",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 122,
        "atk": 25,
        "def": 8,
        "agi": 7,
        "per": 6
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_holy_light_protection",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在战场上徘徊的战士灵魂，还在寻找着战斗的意义。"
    },
    {
      "id": "battlefield_golem",
      "name": "战争傀儡",
      "type": "normal",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 126,
        "atk": 26,
        "def": 8,
        "agi": 7,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_wither_penetration",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "用神力和魔力共同制造的战争傀儡，防御力惊人。"
    },
    {
      "id": "battlefield_god_general",
      "name": "神将幻影",
      "type": "elite",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 218,
        "atk": 56,
        "def": 15,
        "agi": 4,
        "per": 3
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_thorn_body",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "75%_1",
        "fragments_3": "35%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "上古神将的幻影，还保留着生前的大部分力量和战斗技巧。"
    },
    {
      "id": "battlefield_demon_lord",
      "name": "魔将幻影",
      "type": "elite",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 222,
        "atk": 59,
        "def": 16,
        "agi": 4,
        "per": 6
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "80%_1",
        "fragments_3": "38%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "上古魔将的幻影，拥有强大的黑暗魔力和毁灭性的攻击。"
    },
    {
      "id": "battlefield_titan",
      "name": "战争泰坦",
      "type": "elite",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 221,
        "atk": 56,
        "def": 16,
        "agi": 7,
        "per": 5
      },
      "tags": [
        23,
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "85%_1",
        "fragments_3": "40%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由无数战争残骸融合而成的泰坦，它的每一步都能让大地颤抖。"
    },
    {
      "id": "battlefield_god_demon_king",
      "name": "神魔之主",
      "type": "boss",
      "mapId": "god_demon_battlefield",
      "stats": {
        "hp": 601,
        "atk": 176,
        "def": 55,
        "agi": 10,
        "per": 8
      },
      "tags": [
        25,
        23
      ],
      "lootableTalentId": "tal_fusion_immortal",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_1",
        "fragments_4": "55%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "同时拥有神力和魔力的超越存在，他是这场神魔战争的最终胜利者。他的力量能轻易毁灭一个国家，是这片战场绝对的统治者。"
    },
    {
      "id": "temple_guard",
      "name": "圣殿守卫",
      "type": "normal",
      "mapId": "legend_temple",
      "stats": {
        "hp": 149,
        "atk": 31,
        "def": 9,
        "agi": 6,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "圣殿的普通守卫，装备着标准的圣殿铠甲和武器。"
    },
    {
      "id": "temple_mage",
      "name": "圣殿法师",
      "type": "normal",
      "mapId": "legend_temple",
      "stats": {
        "hp": 146,
        "atk": 30,
        "def": 10,
        "agi": 6,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "圣殿的法师，掌握着各种神圣魔法和古代法术。"
    },
    {
      "id": "temple_construct",
      "name": "圣殿构装体",
      "type": "normal",
      "mapId": "legend_temple",
      "stats": {
        "hp": 146,
        "atk": 30,
        "def": 9,
        "agi": 5,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "15%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由圣殿魔法驱动的构装体，不知疲倦地执行着守护任务。"
    },
    {
      "id": "temple_acolyte",
      "name": "圣殿侍僧",
      "type": "normal",
      "mapId": "legend_temple",
      "stats": {
        "hp": 144,
        "atk": 30,
        "def": 9,
        "agi": 7,
        "per": 5
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "2-3",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "正在接受训练的圣殿侍僧，虽然还年轻但已经掌握了不少神圣技能。"
    },
    {
      "id": "temple_high_guard",
      "name": "圣殿守卫长",
      "type": "elite",
      "mapId": "legend_temple",
      "stats": {
        "hp": 275,
        "atk": 74,
        "def": 21,
        "agi": 5,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_medusa_eye",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "75%_1",
        "fragments_3": "35%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "圣殿守卫的队长，拥有最强大的防御能力和战斗技巧。"
    },
    {
      "id": "temple_archmage",
      "name": "圣殿大法师",
      "type": "elite",
      "mapId": "legend_temple",
      "stats": {
        "hp": 269,
        "atk": 69,
        "def": 22,
        "agi": 3,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "80%_1",
        "fragments_3": "40%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "圣殿最强大的法师，掌握着无数失传的古代魔法和禁忌法术。"
    },
    {
      "id": "temple_judge",
      "name": "圣殿审判官",
      "type": "elite",
      "mapId": "legend_temple",
      "stats": {
        "hp": 270,
        "atk": 72,
        "def": 20,
        "agi": 8,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "85%_1",
        "fragments_3": "42%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "负责审判入侵者的圣殿审判官，他的判决就是最终的命运。"
    },
    {
      "id": "temple_master",
      "name": "圣殿之主",
      "type": "boss",
      "mapId": "legend_temple",
      "stats": {
        "hp": 717,
        "atk": 216,
        "def": 61,
        "agi": 5,
        "per": 8
      },
      "tags": [
        25,
        23
      ],
      "lootableTalentId": "tal_energy_devourer",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_2",
        "fragments_4": "60%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "传说圣殿的创造者和主人，他已经超越了生死的界限，成为了接近神的存在。他掌握着世界上所有的知识和力量，是所有英雄最终的导师。"
    },
    {
      "id": "divine_gate_soldier",
      "name": "天兵",
      "type": "normal",
      "mapId": "divine_gate",
      "stats": {
        "hp": 176,
        "atk": 36,
        "def": 12,
        "agi": 5,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "神界的普通士兵，装备着标准的神兵和神甲。"
    },
    {
      "id": "divine_gate_mage",
      "name": "神术师",
      "type": "normal",
      "mapId": "divine_gate",
      "stats": {
        "hp": 175,
        "atk": 35,
        "def": 10,
        "agi": 6,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌握神术的法师，能释放各种神圣魔法。"
    },
    {
      "id": "divine_gate_guardian",
      "name": "神殿守卫",
      "type": "normal",
      "mapId": "divine_gate",
      "stats": {
        "hp": 177,
        "atk": 36,
        "def": 10,
        "agi": 5,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "守护天门的精锐守卫，防御力惊人。"
    },
    {
      "id": "divine_gate_creature",
      "name": "神兽幼崽",
      "type": "normal",
      "mapId": "divine_gate",
      "stats": {
        "hp": 172,
        "atk": 35,
        "def": 11,
        "agi": 5,
        "per": 2
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "神兽的幼崽，虽然还小但已经拥有不俗的力量。"
    },
    {
      "id": "divine_gate_general",
      "name": "神将",
      "type": "elite",
      "mapId": "divine_gate",
      "stats": {
        "hp": 327,
        "atk": 86,
        "def": 24,
        "agi": 8,
        "per": 5
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_chaos_origin",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "80%_1",
        "fragments_3": "40%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "神界的将军，拥有强大的战斗力和指挥能力。"
    },
    {
      "id": "divine_gate_archangel",
      "name": "大天使",
      "type": "elite",
      "mapId": "divine_gate",
      "stats": {
        "hp": 331,
        "atk": 85,
        "def": 25,
        "agi": 4,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "85%_1",
        "fragments_3": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "神界的高阶天使，能释放毁灭性的神圣魔法。"
    },
    {
      "id": "divine_gate_beast",
      "name": "神兽",
      "type": "elite",
      "mapId": "divine_gate",
      "stats": {
        "hp": 339,
        "atk": 86,
        "def": 25,
        "agi": 4,
        "per": 2
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "90%_1",
        "fragments_3": "48%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "神界的神兽，拥有强大的肉体力量和特殊能力。"
    },
    {
      "id": "divine_gate_keeper",
      "name": "天门守护者",
      "type": "boss",
      "mapId": "divine_gate",
      "stats": {
        "hp": 949,
        "atk": 278,
        "def": 92,
        "agi": 5,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_all_dot_penetration",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_2",
        "fragments_4": "65%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "守护天门的至高存在，他拥有接近神王的力量。只有击败他的人才能进入神界，一睹众神的真容。"
    },
    {
      "id": "gods_bf_soldier",
      "name": "神兵残骸",
      "type": "normal",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 175,
        "atk": 35,
        "def": 11,
        "agi": 6,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被神力驱动的神兵残骸，还在重复着千年前的战斗。"
    },
    {
      "id": "gods_bf_demon",
      "name": "魔兵残骸",
      "type": "normal",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 183,
        "atk": 38,
        "def": 12,
        "agi": 6,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被魔力驱动的魔兵残骸，眼中还闪烁着邪恶的光芒。"
    },
    {
      "id": "gods_bf_spirit",
      "name": "战魂",
      "type": "normal",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 185,
        "atk": 36,
        "def": 11,
        "agi": 6,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在战场上徘徊的战士灵魂，还在寻找着战斗的意义。"
    },
    {
      "id": "gods_bf_golem",
      "name": "战争傀儡",
      "type": "normal",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 180,
        "atk": 35,
        "def": 13,
        "agi": 4,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "用神力和魔力共同制造的战争傀儡，防御力惊人。"
    },
    {
      "id": "gods_bf_god_general",
      "name": "神将幻影",
      "type": "elite",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 345,
        "atk": 92,
        "def": 25,
        "agi": 8,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_werewolf_bloodline",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "85%_1",
        "fragments_3": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "上古神将的幻影，还保留着生前的大部分力量和战斗技巧。"
    },
    {
      "id": "gods_bf_demon_lord",
      "name": "魔将幻影",
      "type": "elite",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 342,
        "atk": 88,
        "def": 26,
        "agi": 3,
        "per": 3
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "90%_1",
        "fragments_3": "50%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "上古魔将的幻影，拥有强大的黑暗魔力和毁灭性的攻击。"
    },
    {
      "id": "gods_bf_titan",
      "name": "战争泰坦",
      "type": "elite",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 339,
        "atk": 85,
        "def": 27,
        "agi": 5,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "95%_1",
        "fragments_3": "55%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由无数战争残骸融合而成的泰坦，它的每一步都能让天空颤抖。"
    },
    {
      "id": "gods_bf_king",
      "name": "众神之主",
      "type": "boss",
      "mapId": "gods_battlefield",
      "stats": {
        "hp": 976,
        "atk": 293,
        "def": 80,
        "agi": 8,
        "per": 8
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_final_singularity_fusion",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_3",
        "fragments_4": "70%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "同时拥有神力和魔力的超越存在，他是众神之战的最终胜利者。他的力量能轻易毁灭一个神系，是这片战场绝对的统治者。"
    },
    {
      "id": "creation_guard",
      "name": "神殿守卫",
      "type": "normal",
      "mapId": "creation_temple",
      "stats": {
        "hp": 189,
        "atk": 38,
        "def": 11,
        "agi": 4,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "创世神殿的普通守卫，装备着神殿的标准装备。"
    },
    {
      "id": "creation_mage",
      "name": "创世法师",
      "type": "normal",
      "mapId": "creation_temple",
      "stats": {
        "hp": 187,
        "atk": 37,
        "def": 11,
        "agi": 6,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌握创世魔法的法师，能使用各种改变规则的法术。"
    },
    {
      "id": "creation_construct",
      "name": "创世构装体",
      "type": "normal",
      "mapId": "creation_temple",
      "stats": {
        "hp": 192,
        "atk": 38,
        "def": 14,
        "agi": 6,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由创世之力驱动的构装体，不知疲倦地执行着守护任务。"
    },
    {
      "id": "creation_acolyte",
      "name": "创世侍僧",
      "type": "normal",
      "mapId": "creation_temple",
      "stats": {
        "hp": 184,
        "atk": 39,
        "def": 12,
        "agi": 7,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "正在接受创世神训练的侍僧，已经掌握了不少创世技能。"
    },
    {
      "id": "creation_high_guard",
      "name": "神殿守卫长",
      "type": "elite",
      "mapId": "creation_temple",
      "stats": {
        "hp": 376,
        "atk": 102,
        "def": 29,
        "agi": 3,
        "per": 5
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_fusion_neuro_poison",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "85%_1",
        "fragments_3": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "创世神殿守卫的队长，拥有最强大的防御能力和战斗技巧。"
    },
    {
      "id": "creation_archmage",
      "name": "创世大法师",
      "type": "elite",
      "mapId": "creation_temple",
      "stats": {
        "hp": 378,
        "atk": 95,
        "def": 29,
        "agi": 4,
        "per": 4
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "90%_1",
        "fragments_3": "50%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "创世神殿最强大的法师，掌握着无数失传的创世魔法和禁忌法术。"
    },
    {
      "id": "creation_judge",
      "name": "创世审判官",
      "type": "elite",
      "mapId": "creation_temple",
      "stats": {
        "hp": 369,
        "atk": 96,
        "def": 29,
        "agi": 8,
        "per": 6
      },
      "tags": [
        25,
        26
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "95%_1",
        "fragments_3": "55%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "负责审判入侵者的创世审判官，他的判决就是最终的命运。"
    },
    {
      "id": "creation_god",
      "name": "创世神",
      "type": "boss",
      "mapId": "creation_temple",
      "stats": {
        "hp": 1042,
        "atk": 328,
        "def": 89,
        "agi": 9,
        "per": 10
      },
      "tags": [
        25,
        26,
        24
      ],
      "lootableTalentId": "tal_spacetime_warp",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_3",
        "fragments_4": "80%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "这个世界的创造者，他超越了一切存在的界限。他的力量能创造一切，也能毁灭一切。据说他就是所有生物的共同祖先，整个旅程就是在重走他曾经的进化之路。"
    },
    {
      "id": "chaos_abyss_wraith",
      "name": "混沌怨灵",
      "type": "normal",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 217,
        "atk": 45,
        "def": 13,
        "agi": 3,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被混沌侵蚀的怨灵，不断地在深渊中徘徊，寻找着解脱。"
    },
    {
      "id": "chaos_abyss_horror",
      "name": "混沌恐兽",
      "type": "normal",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 213,
        "atk": 44,
        "def": 15,
        "agi": 6,
        "per": 2
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由混沌构成的恐怖生物，它的形态不断变化，让人无法捉摸。"
    },
    {
      "id": "chaos_abyss_mage",
      "name": "混沌术士",
      "type": "normal",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 220,
        "atk": 43,
        "def": 13,
        "agi": 5,
        "per": 4
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌握混沌魔法的术士，能释放各种扭曲现实的法术。"
    },
    {
      "id": "chaos_abyss_golem",
      "name": "混沌傀儡",
      "type": "normal",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 211,
        "atk": 41,
        "def": 13,
        "agi": 5,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_wither_penetration",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由混沌之力驱动的傀儡，不知疲倦地执行着毁灭的任务。"
    },
    {
      "id": "chaos_abyss_lord",
      "name": "混沌领主",
      "type": "elite",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 425,
        "atk": 113,
        "def": 32,
        "agi": 4,
        "per": 2
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_dragon_breath",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "85%_1",
        "fragments_3": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "统治一片混沌区域的领主，拥有强大的混沌力量和统治能力。"
    },
    {
      "id": "chaos_abyss_dragon",
      "name": "混沌巨龙",
      "type": "elite",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 443,
        "atk": 114,
        "def": 32,
        "agi": 7,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_mind_stun",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "90%_1",
        "fragments_3": "50%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被混沌侵蚀的巨龙，它的龙息能腐蚀一切，让万物归于混沌。"
    },
    {
      "id": "chaos_abyss_titan",
      "name": "混沌泰坦",
      "type": "elite",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 442,
        "atk": 120,
        "def": 31,
        "agi": 8,
        "per": 4
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "95%_1",
        "fragments_3": "55%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由无数混沌生物融合而成的泰坦，它的每一步都能让深渊颤抖。"
    },
    {
      "id": "chaos_abyss_king",
      "name": "混沌之主",
      "type": "boss",
      "mapId": "chaos_abyss",
      "stats": {
        "hp": 1267,
        "atk": 388,
        "def": 115,
        "agi": 8,
        "per": 11
      },
      "tags": [
        26,
        25
      ],
      "lootableTalentId": "tal_omnipotence_unity",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_3",
        "fragments_4": "85%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "混沌深渊的至高存在，他是混沌的化身，是世界诞生之前的唯一存在。他的力量能创造一切，也能毁灭一切。据说他就是所有生物的共同祖先。"
    },
    {
      "id": "reincarnation_soul",
      "name": "轮回灵魂",
      "type": "normal",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 233,
        "atk": 46,
        "def": 14,
        "agi": 3,
        "per": 2
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "等待轮回的灵魂，它们还保留着前世的记忆和力量。"
    },
    {
      "id": "reincarnation_guard",
      "name": "轮回守卫",
      "type": "normal",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 228,
        "atk": 47,
        "def": 15,
        "agi": 3,
        "per": 5
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_wither_penetration",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "20%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "守护轮回之门的守卫，确保每个灵魂都能正确地进入轮回。"
    },
    {
      "id": "reincarnation_mage",
      "name": "轮回术士",
      "type": "normal",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 236,
        "atk": 49,
        "def": 16,
        "agi": 3,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_holy_light_protection",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌握轮回魔法的术士，能操纵灵魂的轮回命运。"
    },
    {
      "id": "reincarnation_beast",
      "name": "轮回兽",
      "type": "normal",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 231,
        "atk": 47,
        "def": 14,
        "agi": 8,
        "per": 5
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "在轮回之门前徘徊的神兽，它的身上有无数轮回的印记。"
    },
    {
      "id": "reincarnation_judge",
      "name": "轮回审判官",
      "type": "elite",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 466,
        "atk": 125,
        "def": 35,
        "agi": 8,
        "per": 4
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_all_dot_penetration",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "85%_1",
        "fragments_3": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "负责审判灵魂轮回命运的审判官，他的判决就是最终的命运。"
    },
    {
      "id": "reincarnation_guardian",
      "name": "轮回守护者",
      "type": "elite",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 466,
        "atk": 118,
        "def": 35,
        "agi": 5,
        "per": 3
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "90%_1",
        "fragments_3": "50%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "守护轮回之门的至高存在，拥有强大的防御能力和轮回之力。"
    },
    {
      "id": "reincarnation_dragon",
      "name": "轮回神龙",
      "type": "elite",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 465,
        "atk": 126,
        "def": 35,
        "agi": 4,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "95%_1",
        "fragments_3": "55%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌控轮回的神龙，它的每一次呼吸都能改变无数灵魂的轮回命运。"
    },
    {
      "id": "reincarnation_king",
      "name": "轮回之主",
      "type": "boss",
      "mapId": "reincarnation_gate",
      "stats": {
        "hp": 1447,
        "atk": 429,
        "def": 128,
        "agi": 8,
        "per": 9
      },
      "tags": [
        26,
        24
      ],
      "lootableTalentId": "tal_singularity",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_3",
        "fragments_4": "80%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌控所有轮回的至高存在，他是轮回的化身，决定着所有生命的轮回命运。他的力量能让一切重新开始，也能让一切永远终结。"
    },
    {
      "id": "void_wraith",
      "name": "虚空怨灵",
      "type": "normal",
      "mapId": "infinite_void",
      "stats": {
        "hp": 253,
        "atk": 49,
        "def": 17,
        "agi": 5,
        "per": 5
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "25%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被虚空吞噬的怨灵，它们已经失去了实体，成为了虚空的一部分。"
    },
    {
      "id": "void_horror",
      "name": "虚空恐兽",
      "type": "normal",
      "mapId": "infinite_void",
      "stats": {
        "hp": 257,
        "atk": 51,
        "def": 17,
        "agi": 4,
        "per": 2
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "22%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由虚空构成的恐怖生物，它没有实体，却能吞噬一切。"
    },
    {
      "id": "void_mage",
      "name": "虚空术士",
      "type": "normal",
      "mapId": "infinite_void",
      "stats": {
        "hp": 244,
        "atk": 48,
        "def": 14,
        "agi": 4,
        "per": 5
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_mind_stun",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "28%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "掌握虚空魔法的术士，能操纵虚空的力量，扭曲一切维度。"
    },
    {
      "id": "void_golem",
      "name": "虚空傀儡",
      "type": "normal",
      "mapId": "infinite_void",
      "stats": {
        "hp": 250,
        "atk": 48,
        "def": 15,
        "agi": 8,
        "per": 4
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_holy_light_protection",
      "drops": {
        "fragments_1": "3-4",
        "fragments_2": "18%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由虚空之力驱动的傀儡，不知疲倦地执行着吞噬的任务。"
    },
    {
      "id": "void_lord",
      "name": "虚空领主",
      "type": "elite",
      "mapId": "infinite_void",
      "stats": {
        "hp": 541,
        "atk": 140,
        "def": 43,
        "agi": 7,
        "per": 3
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_final_singularity_fusion",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "85%_1",
        "fragments_3": "45%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "统治一片虚空区域的领主，拥有强大的虚空力量和统治能力。"
    },
    {
      "id": "void_dragon",
      "name": "虚空巨龙",
      "type": "elite",
      "mapId": "infinite_void",
      "stats": {
        "hp": 523,
        "atk": 133,
        "def": 37,
        "agi": 6,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "90%_1",
        "fragments_3": "50%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "被虚空吞噬的巨龙，它的龙息能吞噬一切，让万物归于虚无。"
    },
    {
      "id": "void_titan",
      "name": "虚空泰坦",
      "type": "elite",
      "mapId": "infinite_void",
      "stats": {
        "hp": 539,
        "atk": 138,
        "def": 40,
        "agi": 3,
        "per": 6
      },
      "tags": [
        26,
        23,
        25
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "95%_1",
        "fragments_3": "55%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "由无数虚空生物融合而成的泰坦，它的每一步都能让虚空震颤。"
    },
    {
      "id": "void_king",
      "name": "虚空之主",
      "type": "boss",
      "mapId": "infinite_void",
      "stats": {
        "hp": 1578,
        "atk": 455,
        "def": 131,
        "agi": 6,
        "per": 9
      },
      "tags": [
        26,
        23
      ],
      "lootableTalentId": "tal_transcend_dimension",
      "drops": {
        "fragments_1": "3-5",
        "fragments_2": "100%_3",
        "fragments_3": "100%_4",
        "fragments_4": "90%_1"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_gt_50",
            "actions": [
              "normal_attack",
              "normal_attack",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_50",
            "actions": [
              "normal_attack",
              "skill",
              "skill"
            ]
          },
          {
            "trigger": "hp_lt_20",
            "actions": [
              "skill",
              "skill",
              "charge"
            ]
          }
        ]
      },
      "description": "无限虚空的至高存在，他是虚空的化身，是一切的起源和终点。他的力量能创造一切，也能毁灭一切。据说他就是所有生物的共同祖先，整个旅程就是在重走他曾经的进化之路。"
    },
    {
      "id": "primordial_pool_norm_01",
      "name": "热泉杆菌",
      "type": "normal",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 30,
        "atk": 6,
        "def": 2,
        "agi": 6,
        "per": 6
      },
      "tags": [
        3,
        10
      ],
      "lootableTalentId": "tal_stench",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动热泉杆菌的本能攻击"
            ]
          }
        ]
      },
      "description": "嗜热的原始菌落聚集在泉眼边缘，通过化学合成获取能量。"
    },
    {
      "id": "primordial_pool_norm_02",
      "name": "嗜热古菌",
      "type": "normal",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 29,
        "atk": 6,
        "def": 2,
        "agi": 5,
        "per": 3
      },
      "tags": [
        9,
        20
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动嗜热古菌的本能攻击"
            ]
          }
        ]
      },
      "description": "能在沸腾热水中存活的古菌，细胞壁厚实坚硬。"
    },
    {
      "id": "primordial_pool_norm_03",
      "name": "温泉蓝藻",
      "type": "normal",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 30,
        "atk": 6,
        "def": 2,
        "agi": 3,
        "per": 6
      },
      "tags": [
        18,
        10
      ],
      "lootableTalentId": "tal_flagellum",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动温泉蓝藻的本能攻击"
            ]
          }
        ]
      },
      "description": "铺满泉壁的蓝绿色藻膜，能进行光合作用自养。"
    },
    {
      "id": "primordial_pool_norm_04",
      "name": "硫磺线虫",
      "type": "normal",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 31,
        "atk": 7,
        "def": 2,
        "agi": 7,
        "per": 6
      },
      "tags": [
        3,
        15
      ],
      "lootableTalentId": "tal_venom_spine",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动硫磺线虫的本能攻击"
            ]
          }
        ]
      },
      "description": "在硫磺泉中扭动的细长线虫，体表带腐蚀性黏液。"
    },
    {
      "id": "primordial_pool_elite_01",
      "name": "聚合变形体",
      "type": "elite",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 48,
        "atk": 13,
        "def": 4,
        "agi": 5,
        "per": 3
      },
      "tags": [
        10,
        28
      ],
      "lootableTalentId": "tal_multi_head_regen",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动聚合变形体的精英绝技"
            ]
          }
        ]
      },
      "description": "无数原始细胞聚合成的半透明胶质体，缓慢吞噬一切有机物。"
    },
    {
      "id": "primordial_pool_elite_02",
      "name": "沸腾轮虫",
      "type": "elite",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 49,
        "atk": 13,
        "def": 4,
        "agi": 5,
        "per": 2
      },
      "tags": [
        20,
        15
      ],
      "lootableTalentId": "tal_infrared_vision",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动沸腾轮虫的精英绝技"
            ]
          }
        ]
      },
      "description": "在热浪中高速旋转的轮虫，触须带灼热能量。"
    },
    {
      "id": "primordial_pool_elite_03",
      "name": "热泉黏菌",
      "type": "elite",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 47,
        "atk": 12,
        "def": 3,
        "agi": 3,
        "per": 4
      },
      "tags": [
        3,
        11
      ],
      "lootableTalentId": "tal_inject",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动热泉黏菌的精英绝技"
            ]
          }
        ]
      },
      "description": "黏菌在泉边蔓延成网，分泌的黏液带有强烈毒性。"
    },
    {
      "id": "primordial_pool_boss",
      "name": "原初热泉之心",
      "type": "boss",
      "mapId": "primordial_pool",
      "stats": {
        "hp": 104,
        "atk": 32,
        "def": 9,
        "agi": 6,
        "per": 12
      },
      "tags": [
        27,
        24
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "primordial_pool"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "原初热泉之心进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "原初热泉之心发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "整座汤池的生命源头，一颗搏动的细胞核凝聚了原始汤的所有生机。"
    },
    {
      "id": "rainforest_understory_norm_01",
      "name": "雨林箭毒蛙",
      "type": "normal",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 36,
        "atk": 7,
        "def": 2,
        "agi": 8,
        "per": 3
      },
      "tags": [
        3,
        15
      ],
      "lootableTalentId": "tal_paralyze_stinger",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雨林箭毒蛙的本能攻击"
            ]
          }
        ]
      },
      "description": "体色鲜艳的毒蛙，皮肤分泌物能麻痹猎物。"
    },
    {
      "id": "rainforest_understory_norm_02",
      "name": "行军蚁群",
      "type": "normal",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 37,
        "atk": 7,
        "def": 2,
        "agi": 3,
        "per": 4
      },
      "tags": [
        28,
        3
      ],
      "lootableTalentId": "tal_swarm_bite",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动行军蚁群的本能攻击"
            ]
          }
        ]
      },
      "description": "铺天盖地的蚂蚁洪流，所过之处寸草不生。"
    },
    {
      "id": "rainforest_understory_norm_03",
      "name": "枯叶螳螂",
      "type": "normal",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 36,
        "atk": 7,
        "def": 2,
        "agi": 3,
        "per": 3
      },
      "tags": [
        11,
        5
      ],
      "lootableTalentId": "tal_mirror_mimicry",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动枯叶螳螂的本能攻击"
            ]
          }
        ]
      },
      "description": "伪装成枯叶的螳螂，伏击路过的昆虫。"
    },
    {
      "id": "rainforest_understory_norm_04",
      "name": "红眼树蛙",
      "type": "normal",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 37,
        "atk": 7,
        "def": 2,
        "agi": 7,
        "per": 3
      },
      "tags": [
        18,
        15
      ],
      "lootableTalentId": "tal_tidal_adaptation",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动红眼树蛙的本能攻击"
            ]
          }
        ]
      },
      "description": "栖息在叶片上的树蛙，跳跃力惊人。"
    },
    {
      "id": "rainforest_understory_elite_01",
      "name": "巨森蚺",
      "type": "elite",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 58,
        "atk": 15,
        "def": 5,
        "agi": 5,
        "per": 2
      },
      "tags": [
        5,
        10
      ],
      "lootableTalentId": "tal_world_entangle",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨森蚺的精英绝技"
            ]
          }
        ]
      },
      "description": "盘踞在树冠的巨型蟒蛇，绞杀力足以勒碎猎物骨骼。"
    },
    {
      "id": "rainforest_understory_elite_02",
      "name": "食人蚁后",
      "type": "elite",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 58,
        "atk": 15,
        "def": 4,
        "agi": 6,
        "per": 3
      },
      "tags": [
        28,
        10
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动食人蚁后的精英绝技"
            ]
          }
        ]
      },
      "description": "行军蚁的统治者，腹部蕴含强大的繁殖力。"
    },
    {
      "id": "rainforest_understory_elite_03",
      "name": "豹纹守宫",
      "type": "elite",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 60,
        "atk": 16,
        "def": 5,
        "agi": 3,
        "per": 6
      },
      "tags": [
        11,
        21
      ],
      "lootableTalentId": "tal_phantom_mimic",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动豹纹守宫的精英绝技"
            ]
          }
        ]
      },
      "description": "花纹如猎豹的守宫，能瞬间弹射舌头捕捉飞虫。"
    },
    {
      "id": "rainforest_understory_boss",
      "name": "雨林霸主·巨森蚺王",
      "type": "boss",
      "mapId": "rainforest_understory",
      "stats": {
        "hp": 128,
        "atk": 38,
        "def": 13,
        "agi": 10,
        "per": 12
      },
      "tags": [
        27,
        24
      ],
      "lootableTalentId": "tal_myriad_beast_divinity",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "rainforest_understory"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "雨林霸主·巨森蚺王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "雨林霸主·巨森蚺王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "盘踞整片雨林顶层的蛇王，鳞片如铁，绞杀万物。"
    },
    {
      "id": "north_american_plains_norm_01",
      "name": "美洲野牛",
      "type": "normal",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 40,
        "atk": 8,
        "def": 3,
        "agi": 4,
        "per": 3
      },
      "tags": [
        8,
        28
      ],
      "lootableTalentId": "tal_roll_defense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动美洲野牛的本能攻击"
            ]
          }
        ]
      },
      "description": "成群的野牛在草原上迁徙，冲撞力惊人。"
    },
    {
      "id": "north_american_plains_norm_02",
      "name": "灰狼",
      "type": "normal",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 41,
        "atk": 9,
        "def": 3,
        "agi": 3,
        "per": 2
      },
      "tags": [
        15,
        17
      ],
      "lootableTalentId": "tal_spring_tail",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灰狼的本能攻击"
            ]
          }
        ]
      },
      "description": "协同狩猎的草原狼，擅长围堵猎物。"
    },
    {
      "id": "north_american_plains_norm_03",
      "name": "草原犬鼠",
      "type": "normal",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 40,
        "atk": 8,
        "def": 3,
        "agi": 8,
        "per": 5
      },
      "tags": [
        28,
        15
      ],
      "lootableTalentId": "tal_viral_swarm",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动草原犬鼠的本能攻击"
            ]
          }
        ]
      },
      "description": "草原上的穴居鼠类，数量庞大。"
    },
    {
      "id": "north_american_plains_norm_04",
      "name": "响尾蛇",
      "type": "normal",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 40,
        "atk": 8,
        "def": 2,
        "agi": 8,
        "per": 2
      },
      "tags": [
        3,
        20
      ],
      "lootableTalentId": "tal_venom_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动响尾蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "尾环振响的毒蛇，热感应窝能锁定温血猎物。"
    },
    {
      "id": "north_american_plains_elite_01",
      "name": "美洲狮",
      "type": "elite",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 64,
        "atk": 16,
        "def": 5,
        "agi": 5,
        "per": 6
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_ambush",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动美洲狮的精英绝技"
            ]
          }
        ]
      },
      "description": "潜伏在山岩后的独行猎手，爆发力极强。"
    },
    {
      "id": "north_american_plains_elite_02",
      "name": "灰熊",
      "type": "elite",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 66,
        "atk": 17,
        "def": 5,
        "agi": 4,
        "per": 5
      },
      "tags": [
        8,
        27
      ],
      "lootableTalentId": "tal_iron_wall",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灰熊的精英绝技"
            ]
          }
        ]
      },
      "description": "体型巨大的杂食猛兽，一掌能拍碎树干。"
    },
    {
      "id": "north_american_plains_elite_03",
      "name": "金雕",
      "type": "elite",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 65,
        "atk": 17,
        "def": 5,
        "agi": 8,
        "per": 5
      },
      "tags": [
        14,
        21
      ],
      "lootableTalentId": "tal_high_altitude",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动金雕的精英绝技"
            ]
          }
        ]
      },
      "description": "翼展惊人的猛禽，从高空俯冲捕猎。"
    },
    {
      "id": "north_american_plains_boss",
      "name": "平原霸主·牛群之王",
      "type": "boss",
      "mapId": "north_american_plains",
      "stats": {
        "hp": 148,
        "atk": 42,
        "def": 14,
        "agi": 7,
        "per": 12
      },
      "tags": [
        27,
        8
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "north_american_plains"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "平原霸主·牛群之王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "平原霸主·牛群之王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "统御整片草原野牛群的巨牛，角如弯刀。"
    },
    {
      "id": "cliff_face_norm_01",
      "name": "岩羊",
      "type": "normal",
      "mapId": "cliff_face",
      "stats": {
        "hp": 41,
        "atk": 8,
        "def": 3,
        "agi": 5,
        "per": 2
      },
      "tags": [
        15,
        8
      ],
      "lootableTalentId": "tal_swift_nerve",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动岩羊的本能攻击"
            ]
          }
        ]
      },
      "description": "在垂直岩壁上如履平地的山羊，蹄瓣能卡住岩缝。"
    },
    {
      "id": "cliff_face_norm_02",
      "name": "游隼",
      "type": "normal",
      "mapId": "cliff_face",
      "stats": {
        "hp": 42,
        "atk": 8,
        "def": 3,
        "agi": 3,
        "per": 5
      },
      "tags": [
        14,
        15
      ],
      "lootableTalentId": "tal_storm_lord",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动游隼的本能攻击"
            ]
          }
        ]
      },
      "description": "俯冲速度极快的隼类，一击必中。"
    },
    {
      "id": "cliff_face_norm_03",
      "name": "岩蜥蜴",
      "type": "normal",
      "mapId": "cliff_face",
      "stats": {
        "hp": 41,
        "atk": 8,
        "def": 2,
        "agi": 6,
        "per": 3
      },
      "tags": [
        9,
        20
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动岩蜥蜴的本能攻击"
            ]
          }
        ]
      },
      "description": "贴伏在滚烫岩面的蜥蜴，体温调节能力极强。"
    },
    {
      "id": "cliff_face_norm_04",
      "name": "秃鹫",
      "type": "normal",
      "mapId": "cliff_face",
      "stats": {
        "hp": 43,
        "atk": 9,
        "def": 3,
        "agi": 5,
        "per": 5
      },
      "tags": [
        14,
        10
      ],
      "lootableTalentId": "tal_high_altitude_predator",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动秃鹫的本能攻击"
            ]
          }
        ]
      },
      "description": "盘旋在悬崖上空的大型食腐鸟。"
    },
    {
      "id": "cliff_face_elite_01",
      "name": "雪豹",
      "type": "elite",
      "mapId": "cliff_face",
      "stats": {
        "hp": 69,
        "atk": 17,
        "def": 5,
        "agi": 8,
        "per": 2
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雪豹的精英绝技"
            ]
          }
        ]
      },
      "description": "高崖上的幽灵猎手，皮毛与岩石融为一体。"
    },
    {
      "id": "cliff_face_elite_02",
      "name": "岩鹰王",
      "type": "elite",
      "mapId": "cliff_face",
      "stats": {
        "hp": 67,
        "atk": 18,
        "def": 5,
        "agi": 6,
        "per": 2
      },
      "tags": [
        14,
        4
      ],
      "lootableTalentId": "tal_high_altitude",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动岩鹰王的精英绝技"
            ]
          }
        ]
      },
      "description": "统治这片空域的巨鹰，爪力能撕开甲壳。"
    },
    {
      "id": "cliff_face_elite_03",
      "name": "巨岩蟒",
      "type": "elite",
      "mapId": "cliff_face",
      "stats": {
        "hp": 67,
        "atk": 18,
        "def": 5,
        "agi": 6,
        "per": 2
      },
      "tags": [
        5,
        9
      ],
      "lootableTalentId": "tal_pseudopod",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨岩蟒的精英绝技"
            ]
          }
        ]
      },
      "description": "缠绕在崖壁裂缝中的巨蟒，鳞片如岩石。"
    },
    {
      "id": "cliff_face_boss",
      "name": "悬崖之王·石翼龙",
      "type": "boss",
      "mapId": "cliff_face",
      "stats": {
        "hp": 154,
        "atk": 44,
        "def": 13,
        "agi": 10,
        "per": 7
      },
      "tags": [
        14,
        27
      ],
      "lootableTalentId": "tal_sky_lord",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "cliff_face"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "悬崖之王·石翼龙进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "悬崖之王·石翼龙发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "从岩壁中破出的古龙，翼展遮天蔽日。"
    },
    {
      "id": "mountain_peak_norm_01",
      "name": "高山兀鹫",
      "type": "normal",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 43,
        "atk": 8,
        "def": 3,
        "agi": 8,
        "per": 3
      },
      "tags": [
        14,
        21
      ],
      "lootableTalentId": "tal_high_altitude",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动高山兀鹫的本能攻击"
            ]
          }
        ]
      },
      "description": "翱翔在雪线以上的巨型鹫类，视力能穿透云层。"
    },
    {
      "id": "mountain_peak_norm_02",
      "name": "雪兔",
      "type": "normal",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 43,
        "atk": 9,
        "def": 3,
        "agi": 8,
        "per": 5
      },
      "tags": [
        15,
        17
      ],
      "lootableTalentId": "tal_flagellum",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雪兔的本能攻击"
            ]
          }
        ]
      },
      "description": "冬季皮毛纯白的野兔，与雪地融为一体。"
    },
    {
      "id": "mountain_peak_norm_03",
      "name": "高山鼩鼱",
      "type": "normal",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 44,
        "atk": 8,
        "def": 3,
        "agi": 4,
        "per": 2
      },
      "tags": [
        15,
        21
      ],
      "lootableTalentId": "tal_leap",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动高山鼩鼱的本能攻击"
            ]
          }
        ]
      },
      "description": "高海拔地区的小型哺乳动物，代谢极快。"
    },
    {
      "id": "mountain_peak_norm_04",
      "name": "岩貂",
      "type": "normal",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 45,
        "atk": 9,
        "def": 3,
        "agi": 3,
        "per": 6
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_shadow_stalk",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动岩貂的本能攻击"
            ]
          }
        ]
      },
      "description": "攀岩如飞的貂类，专猎岩缝中的小兽。"
    },
    {
      "id": "mountain_peak_elite_01",
      "name": "雪人",
      "type": "elite",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 72,
        "atk": 19,
        "def": 5,
        "agi": 3,
        "per": 6
      },
      "tags": [
        8,
        7
      ],
      "lootableTalentId": "tal_elemental_resist",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雪人的精英绝技"
            ]
          }
        ]
      },
      "description": "传说中的雪峰巨人，皮毛抗寒如铁。"
    },
    {
      "id": "mountain_peak_elite_02",
      "name": "山狮",
      "type": "elite",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 70,
        "atk": 19,
        "def": 6,
        "agi": 4,
        "per": 4
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_ambush",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动山狮的精英绝技"
            ]
          }
        ]
      },
      "description": "高原之巅的顶级捕食者，行动无声。"
    },
    {
      "id": "mountain_peak_elite_03",
      "name": "巨山鹰",
      "type": "elite",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 73,
        "atk": 18,
        "def": 6,
        "agi": 8,
        "per": 6
      },
      "tags": [
        14,
        4
      ],
      "lootableTalentId": "tal_sky_dominator",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨山鹰的精英绝技"
            ]
          }
        ]
      },
      "description": "比游隼大三倍的山鹰，爪握力可碎骨。"
    },
    {
      "id": "mountain_peak_boss",
      "name": "山之君王·雪山巨猿",
      "type": "boss",
      "mapId": "mountain_peak",
      "stats": {
        "hp": 167,
        "atk": 51,
        "def": 16,
        "agi": 7,
        "per": 10
      },
      "tags": [
        27,
        8
      ],
      "lootableTalentId": "tal_wild_lord",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "mountain_peak"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "山之君王·雪山巨猿进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "山之君王·雪山巨猿发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "盘踞峰顶的远古巨猿，吼声能引发雪崩。"
    },
    {
      "id": "continental_shelf_norm_01",
      "name": "海星",
      "type": "normal",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 47,
        "atk": 10,
        "def": 3,
        "agi": 7,
        "per": 4
      },
      "tags": [
        10,
        9
      ],
      "lootableTalentId": "tal_super_regeneration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海星的本能攻击"
            ]
          }
        ]
      },
      "description": "吸附在礁石上的棘皮动物，断腕可再生。"
    },
    {
      "id": "continental_shelf_norm_02",
      "name": "海胆",
      "type": "normal",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 45,
        "atk": 9,
        "def": 3,
        "agi": 8,
        "per": 3
      },
      "tags": [
        9,
        3
      ],
      "lootableTalentId": "tal_hard_bone",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海胆的本能攻击"
            ]
          }
        ]
      },
      "description": "浑身尖刺的棘皮生物，刺端带微弱毒素。"
    },
    {
      "id": "continental_shelf_norm_03",
      "name": "寄居蟹",
      "type": "normal",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 47,
        "atk": 10,
        "def": 3,
        "agi": 3,
        "per": 5
      },
      "tags": [
        9,
        15
      ],
      "lootableTalentId": "tal_snail_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动寄居蟹的本能攻击"
            ]
          }
        ]
      },
      "description": "背着螺壳行走的甲壳生物。"
    },
    {
      "id": "continental_shelf_norm_04",
      "name": "比目鱼",
      "type": "normal",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 47,
        "atk": 10,
        "def": 3,
        "agi": 5,
        "per": 2
      },
      "tags": [
        11,
        18
      ],
      "lootableTalentId": "tal_camouflage",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动比目鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "伏在沙底的扁平鱼，体色随环境变化。"
    },
    {
      "id": "continental_shelf_elite_01",
      "name": "巨型章鱼",
      "type": "elite",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 77,
        "atk": 21,
        "def": 5,
        "agi": 7,
        "per": 4
      },
      "tags": [
        5,
        18
      ],
      "lootableTalentId": "tal_predator_web",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨型章鱼的精英绝技"
            ]
          }
        ]
      },
      "description": "八腕缠绕的深海智慧生物，能改变体色。"
    },
    {
      "id": "continental_shelf_elite_02",
      "name": "狮鬃水母",
      "type": "elite",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 77,
        "atk": 21,
        "def": 6,
        "agi": 3,
        "per": 5
      },
      "tags": [
        3,
        18
      ],
      "lootableTalentId": "tal_poison_sac",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动狮鬃水母的精英绝技"
            ]
          }
        ]
      },
      "description": "触须如狮鬃般蓬乱的巨型水母，剧毒。"
    },
    {
      "id": "continental_shelf_elite_03",
      "name": "礁鲨",
      "type": "elite",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 76,
        "atk": 20,
        "def": 5,
        "agi": 8,
        "per": 2
      },
      "tags": [
        15,
        2
      ],
      "lootableTalentId": "tal_lightning_reflex",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动礁鲨的精英绝技"
            ]
          }
        ]
      },
      "description": "游弋在珊瑚礁间的敏捷鲨鱼。"
    },
    {
      "id": "continental_shelf_boss",
      "name": "大陆架之王·巨鲭鲨",
      "type": "boss",
      "mapId": "continental_shelf",
      "stats": {
        "hp": 176,
        "atk": 52,
        "def": 15,
        "agi": 8,
        "per": 6
      },
      "tags": [
        27,
        18
      ],
      "lootableTalentId": "tal_king_roar",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "continental_shelf"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "大陆架之王·巨鲭鲨进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "大陆架之王·巨鲭鲨发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "统御浅海大陆架的巨型鲨鱼，齿如锯齿。"
    },
    {
      "id": "abyssal_deep_norm_01",
      "name": "鮟鱇鱼",
      "type": "normal",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 47,
        "atk": 10,
        "def": 3,
        "agi": 3,
        "per": 6
      },
      "tags": [
        20,
        17
      ],
      "lootableTalentId": "tal_infrared_lock",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动鮟鱇鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "头顶发光诱饵的深海鱼，在黑暗中诱捕猎物。"
    },
    {
      "id": "abyssal_deep_norm_02",
      "name": "深海蠕虫",
      "type": "normal",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 48,
        "atk": 9,
        "def": 3,
        "agi": 4,
        "per": 6
      },
      "tags": [
        10,
        3
      ],
      "lootableTalentId": "tal_nirvana_flame",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动深海蠕虫的本能攻击"
            ]
          }
        ]
      },
      "description": "在热泉口繁衍生息的管状蠕虫。"
    },
    {
      "id": "abyssal_deep_norm_03",
      "name": "灯笼鱼",
      "type": "normal",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 49,
        "atk": 10,
        "def": 3,
        "agi": 5,
        "per": 5
      },
      "tags": [
        20,
        28
      ],
      "lootableTalentId": "tal_geomagnetic_sense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灯笼鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "成群结队的发光小鱼，光点如星河。"
    },
    {
      "id": "abyssal_deep_norm_04",
      "name": "玻璃乌贼",
      "type": "normal",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 48,
        "atk": 9,
        "def": 3,
        "agi": 7,
        "per": 2
      },
      "tags": [
        11,
        18
      ],
      "lootableTalentId": "tal_camouflage",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动玻璃乌贼的本能攻击"
            ]
          }
        ]
      },
      "description": "身体几乎透明的乌贼，隐没在深海中。"
    },
    {
      "id": "abyssal_deep_elite_01",
      "name": "大王乌贼",
      "type": "elite",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 79,
        "atk": 20,
        "def": 6,
        "agi": 4,
        "per": 4
      },
      "tags": [
        5,
        27
      ],
      "lootableTalentId": "tal_mycelial_web",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动大王乌贼的精英绝技"
            ]
          }
        ]
      },
      "description": "触腕长达数十米的深海巨兽。"
    },
    {
      "id": "abyssal_deep_elite_02",
      "name": "深海龙鱼",
      "type": "elite",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 79,
        "atk": 21,
        "def": 6,
        "agi": 7,
        "per": 3
      },
      "tags": [
        17,
        3
      ],
      "lootableTalentId": "tal_night_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动深海龙鱼的精英绝技"
            ]
          }
        ]
      },
      "description": "獠牙外露的深渊猎食者，能吞噬比自己大的猎物。"
    },
    {
      "id": "abyssal_deep_elite_03",
      "name": "巨型等足虫",
      "type": "elite",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 79,
        "atk": 21,
        "def": 6,
        "agi": 6,
        "per": 6
      },
      "tags": [
        9,
        10
      ],
      "lootableTalentId": "tal_hard_bone",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨型等足虫的精英绝技"
            ]
          }
        ]
      },
      "description": "如盔甲般的深海甲壳生物，啃食沉落物。"
    },
    {
      "id": "abyssal_deep_boss",
      "name": "深渊之王·利维坦",
      "type": "boss",
      "mapId": "abyssal_deep",
      "stats": {
        "hp": 183,
        "atk": 55,
        "def": 18,
        "agi": 5,
        "per": 11
      },
      "tags": [
        27,
        18
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "abyssal_deep"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "深渊之王·利维坦进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "深渊之王·利维坦发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "盘踞在深渊最底层的远古海兽，整个深渊都在它的呼吸中震颤。"
    },
    {
      "id": "jungle_monitor_norm_01",
      "name": "巨蜥",
      "type": "normal",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 51,
        "atk": 10,
        "def": 4,
        "agi": 5,
        "per": 3
      },
      "tags": [
        9,
        20
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨蜥的本能攻击"
            ]
          }
        ]
      },
      "description": "潜伏在溪边的巨型蜥蜴，咬合力惊人。"
    },
    {
      "id": "jungle_monitor_norm_02",
      "name": "树蟒",
      "type": "normal",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 51,
        "atk": 10,
        "def": 3,
        "agi": 4,
        "per": 6
      },
      "tags": [
        5,
        11
      ],
      "lootableTalentId": "tal_corrosive_slime",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动树蟒的本能攻击"
            ]
          }
        ]
      },
      "description": "缠绕在树冠的蟒蛇，静待猎物上门。"
    },
    {
      "id": "jungle_monitor_norm_03",
      "name": "毒蜥",
      "type": "normal",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 51,
        "atk": 11,
        "def": 3,
        "agi": 7,
        "per": 5
      },
      "tags": [
        3,
        10
      ],
      "lootableTalentId": "tal_toxic_mucus",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动毒蜥的本能攻击"
            ]
          }
        ]
      },
      "description": "分泌剧毒的巨蜥，齿槽带毒腺。"
    },
    {
      "id": "jungle_monitor_norm_04",
      "name": "丛林鳄",
      "type": "normal",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 51,
        "atk": 10,
        "def": 4,
        "agi": 8,
        "per": 4
      },
      "tags": [
        9,
        2
      ],
      "lootableTalentId": "tal_calcium_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动丛林鳄的本能攻击"
            ]
          }
        ]
      },
      "description": "伏在泥水中的鳄鱼，突袭岸边饮水者。"
    },
    {
      "id": "jungle_monitor_elite_01",
      "name": "科摩多龙",
      "type": "elite",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 84,
        "atk": 21,
        "def": 7,
        "agi": 4,
        "per": 2
      },
      "tags": [
        3,
        27
      ],
      "lootableTalentId": "tal_venom_tentacle",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动科摩多龙的精英绝技"
            ]
          }
        ]
      },
      "description": "唾液中含剧毒细菌的巨蜥之王。"
    },
    {
      "id": "jungle_monitor_elite_02",
      "name": "绿鬣蜥",
      "type": "elite",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 84,
        "atk": 23,
        "def": 7,
        "agi": 7,
        "per": 6
      },
      "tags": [
        9,
        11
      ],
      "lootableTalentId": "tal_hard_bone",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动绿鬣蜥的精英绝技"
            ]
          }
        ]
      },
      "description": "全身翠绿的巨鬣蜥，尾鞭可抽裂树皮。"
    },
    {
      "id": "jungle_monitor_elite_03",
      "name": "眼镜王蛇",
      "type": "elite",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 84,
        "atk": 22,
        "def": 6,
        "agi": 7,
        "per": 2
      },
      "tags": [
        3,
        15
      ],
      "lootableTalentId": "tal_viral_swarm",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动眼镜王蛇的精英绝技"
            ]
          }
        ]
      },
      "description": "能站立攻击的剧毒蛇王。"
    },
    {
      "id": "jungle_monitor_boss",
      "name": "巨蜥之王·丛林泰坦",
      "type": "boss",
      "mapId": "jungle_monitor",
      "stats": {
        "hp": 191,
        "atk": 59,
        "def": 18,
        "agi": 9,
        "per": 12
      },
      "tags": [
        27,
        3
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "jungle_monitor"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "巨蜥之王·丛林泰坦进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "巨蜥之王·丛林泰坦发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "统治整片丛林的远古巨蜥，鳞甲如玄铁。"
    },
    {
      "id": "desert_dragon_norm_01",
      "name": "沙漠角蜥",
      "type": "normal",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 95,
        "atk": 20,
        "def": 6,
        "agi": 5,
        "per": 5
      },
      "tags": [
        9,
        20
      ],
      "lootableTalentId": "tal_scale_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动沙漠角蜥的本能攻击"
            ]
          }
        ]
      },
      "description": "体表长满尖刺的沙蜥，能从眼角喷血驱敌。"
    },
    {
      "id": "desert_dragon_norm_02",
      "name": "沙蛇",
      "type": "normal",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 100,
        "atk": 19,
        "def": 7,
        "agi": 8,
        "per": 6
      },
      "tags": [
        3,
        15
      ],
      "lootableTalentId": "tal_urticating_hair",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动沙蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "在沙海中潜行的毒蛇，来去无声。"
    },
    {
      "id": "desert_dragon_norm_03",
      "name": "鬣蜥",
      "type": "normal",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 99,
        "atk": 20,
        "def": 7,
        "agi": 5,
        "per": 2
      },
      "tags": [
        9,
        10
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动鬣蜥的本能攻击"
            ]
          }
        ]
      },
      "description": "耐旱的沙漠蜥蜴，能长时间不饮水。"
    },
    {
      "id": "desert_dragon_norm_04",
      "name": "沙蝎",
      "type": "normal",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 98,
        "atk": 20,
        "def": 7,
        "agi": 5,
        "per": 2
      },
      "tags": [
        3,
        9
      ],
      "lootableTalentId": "tal_dissolving_fluid",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动沙蝎的本能攻击"
            ]
          }
        ]
      },
      "description": "尾部毒钩高悬的沙漠毒蝎。"
    },
    {
      "id": "desert_dragon_elite_01",
      "name": "沙漠龙蜥",
      "type": "elite",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 172,
        "atk": 47,
        "def": 13,
        "agi": 8,
        "per": 4
      },
      "tags": [
        9,
        6
      ],
      "lootableTalentId": "tal_desert_tenacity",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动沙漠龙蜥的精英绝技"
            ]
          }
        ]
      },
      "description": "身披火红鳞片的龙血蜥蜴，口中能吐热气。"
    },
    {
      "id": "desert_dragon_elite_02",
      "name": "响尾蛇王",
      "type": "elite",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 175,
        "atk": 45,
        "def": 13,
        "agi": 7,
        "per": 4
      },
      "tags": [
        3,
        20
      ],
      "lootableTalentId": "tal_viral_swarm",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动响尾蛇王的精英绝技"
            ]
          }
        ]
      },
      "description": "体长数米的响尾蛇之王。"
    },
    {
      "id": "desert_dragon_elite_03",
      "name": "鹰身女妖",
      "type": "elite",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 168,
        "atk": 44,
        "def": 13,
        "agi": 6,
        "per": 5
      },
      "tags": [
        14,
        17
      ],
      "lootableTalentId": "tal_sky_lord",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动鹰身女妖的精英绝技"
            ]
          }
        ]
      },
      "description": "半鸟半人的沙海掠食者，尖啸摄魂。"
    },
    {
      "id": "desert_dragon_boss",
      "name": "荒漠龙王·沙暴巨龙",
      "type": "boss",
      "mapId": "desert_dragon",
      "stats": {
        "hp": 429,
        "atk": 130,
        "def": 41,
        "agi": 7,
        "per": 7
      },
      "tags": [
        27,
        6
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "desert_dragon"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "荒漠龙王·沙暴巨龙进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "荒漠龙王·沙暴巨龙发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "在沙暴中现身的远古龙兽，一翼掀起的沙尘能掩埋绿洲。"
    },
    {
      "id": "coastal_hunting_norm_01",
      "name": "海獭",
      "type": "normal",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 100,
        "atk": 21,
        "def": 6,
        "agi": 3,
        "per": 3
      },
      "tags": [
        18,
        15
      ],
      "lootableTalentId": "tal_water_sac",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海獭的本能攻击"
            ]
          }
        ]
      },
      "description": "仰浮在海面的可爱猎手，爪下碎石如泥。"
    },
    {
      "id": "coastal_hunting_norm_02",
      "name": "沙蟹",
      "type": "normal",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 103,
        "atk": 20,
        "def": 6,
        "agi": 6,
        "per": 2
      },
      "tags": [
        9,
        15
      ],
      "lootableTalentId": "tal_heat_resistant_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动沙蟹的本能攻击"
            ]
          }
        ]
      },
      "description": "在浪花中疾走的甲壳生物，速度极快。"
    },
    {
      "id": "coastal_hunting_norm_03",
      "name": "滨鸟",
      "type": "normal",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 102,
        "atk": 21,
        "def": 7,
        "agi": 8,
        "per": 3
      },
      "tags": [
        14,
        28
      ],
      "lootableTalentId": "tal_sky_dominator",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动滨鸟的本能攻击"
            ]
          }
        ]
      },
      "description": "成群在潮线啄食的候鸟。"
    },
    {
      "id": "coastal_hunting_norm_04",
      "name": "海豹",
      "type": "normal",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 100,
        "atk": 20,
        "def": 7,
        "agi": 7,
        "per": 2
      },
      "tags": [
        8,
        18
      ],
      "lootableTalentId": "tal_deep_sea_blubber",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海豹的本能攻击"
            ]
          }
        ]
      },
      "description": "在礁石上晒日的鳍足类，入水如箭。"
    },
    {
      "id": "coastal_hunting_elite_01",
      "name": "虎鲸",
      "type": "elite",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 172,
        "atk": 43,
        "def": 12,
        "agi": 7,
        "per": 3
      },
      "tags": [
        27,
        28
      ],
      "lootableTalentId": "tal_beast_intimidation",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动虎鲸的精英绝技"
            ]
          }
        ]
      },
      "description": "黑白相间的海洋顶级猎手，群体围猎。"
    },
    {
      "id": "coastal_hunting_elite_02",
      "name": "大白鲨",
      "type": "elite",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 181,
        "atk": 48,
        "def": 13,
        "agi": 6,
        "per": 3
      },
      "tags": [
        2,
        27
      ],
      "lootableTalentId": "tal_deadly_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动大白鲨的精英绝技"
            ]
          }
        ]
      },
      "description": "海中恐怖传说，嗅觉能闻到数公里外的血腥。"
    },
    {
      "id": "coastal_hunting_elite_03",
      "name": "海蛇",
      "type": "elite",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 174,
        "atk": 44,
        "def": 12,
        "agi": 3,
        "per": 2
      },
      "tags": [
        3,
        18
      ],
      "lootableTalentId": "tal_venom_spine",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海蛇的精英绝技"
            ]
          }
        ]
      },
      "description": "尾鳍如桨的剧毒海蛇。"
    },
    {
      "id": "coastal_hunting_boss",
      "name": "海滨之王·鲸王",
      "type": "boss",
      "mapId": "coastal_hunting",
      "stats": {
        "hp": 440,
        "atk": 128,
        "def": 39,
        "agi": 10,
        "per": 11
      },
      "tags": [
        27,
        18
      ],
      "lootableTalentId": "tal_king_roar",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "coastal_hunting"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "海滨之王·鲸王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "海滨之王·鲸王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "统治海滨的远古鲸类之王，喷出的水柱如喷泉。"
    },
    {
      "id": "volcanic_plain_norm_01",
      "name": "熔岩蝾螈",
      "type": "normal",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 95,
        "atk": 19,
        "def": 6,
        "agi": 7,
        "per": 3
      },
      "tags": [
        6,
        10
      ],
      "lootableTalentId": "tal_thermal_absorb",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动熔岩蝾螈的本能攻击"
            ]
          }
        ]
      },
      "description": "在岩浆边栖息的蝾螈，体表灼热。"
    },
    {
      "id": "volcanic_plain_norm_02",
      "name": "火山龟",
      "type": "normal",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 93,
        "atk": 18,
        "def": 6,
        "agi": 4,
        "per": 2
      },
      "tags": [
        9,
        6
      ],
      "lootableTalentId": "tal_spiral_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动火山龟的本能攻击"
            ]
          }
        ]
      },
      "description": "龟壳如玄武岩般坚硬的巨龟。"
    },
    {
      "id": "volcanic_plain_norm_03",
      "name": "硫磺蜥",
      "type": "normal",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 91,
        "atk": 17,
        "def": 6,
        "agi": 4,
        "per": 5
      },
      "tags": [
        6,
        20
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动硫磺蜥的本能攻击"
            ]
          }
        ]
      },
      "description": "靠硫磺气体维生的蜥蜴，吐息带酸。"
    },
    {
      "id": "volcanic_plain_norm_04",
      "name": "火山鼠",
      "type": "normal",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 96,
        "atk": 18,
        "def": 6,
        "agi": 5,
        "per": 6
      },
      "tags": [
        15,
        20
      ],
      "lootableTalentId": "tal_leap",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动火山鼠的本能攻击"
            ]
          }
        ]
      },
      "description": "在岩缝中穿行的耐热啮齿类。"
    },
    {
      "id": "volcanic_plain_elite_01",
      "name": "岩浆蠕虫",
      "type": "elite",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 160,
        "atk": 40,
        "def": 12,
        "agi": 8,
        "per": 2
      },
      "tags": [
        6,
        10
      ],
      "lootableTalentId": "tal_heat_storage",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动岩浆蠕虫的精英绝技"
            ]
          }
        ]
      },
      "description": "体表流淌熔岩的巨型蠕虫，灼烧一切。"
    },
    {
      "id": "volcanic_plain_elite_02",
      "name": "火焰蛇",
      "type": "elite",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 167,
        "atk": 42,
        "def": 14,
        "agi": 4,
        "per": 4
      },
      "tags": [
        6,
        3
      ],
      "lootableTalentId": "tal_fire_breath_2",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动火焰蛇的精英绝技"
            ]
          }
        ]
      },
      "description": "口中喷火的小型火蛇，鳞片通红。"
    },
    {
      "id": "volcanic_plain_elite_03",
      "name": "火山岩甲龙",
      "type": "elite",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 169,
        "atk": 44,
        "def": 14,
        "agi": 4,
        "per": 5
      },
      "tags": [
        9,
        6
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动火山岩甲龙的精英绝技"
            ]
          }
        ]
      },
      "description": "背甲如活火山的甲龙，移动时喷出火星。"
    },
    {
      "id": "volcanic_plain_boss",
      "name": "火山之王·熔岩巨魔",
      "type": "boss",
      "mapId": "volcanic_plain",
      "stats": {
        "hp": 420,
        "atk": 123,
        "def": 40,
        "agi": 7,
        "per": 8
      },
      "tags": [
        27,
        6
      ],
      "lootableTalentId": "tal_beast_intimidation",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "volcanic_plain"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "火山之王·熔岩巨魔进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "火山之王·熔岩巨魔发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "从火山口爬出的岩浆巨人，一拳砸出熔岩喷泉。"
    },
    {
      "id": "mammoth_steppe_norm_01",
      "name": "猛犸",
      "type": "normal",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 73,
        "atk": 14,
        "def": 4,
        "agi": 8,
        "per": 6
      },
      "tags": [
        27,
        8
      ],
      "lootableTalentId": "tal_beast_intimidation",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动猛犸的本能攻击"
            ]
          }
        ]
      },
      "description": "长毛覆体的远古巨象，獠牙如巨钩。"
    },
    {
      "id": "mammoth_steppe_norm_02",
      "name": "披毛犀",
      "type": "normal",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 72,
        "atk": 15,
        "def": 4,
        "agi": 3,
        "per": 5
      },
      "tags": [
        8,
        9
      ],
      "lootableTalentId": "tal_deep_sea_blubber",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动披毛犀的本能攻击"
            ]
          }
        ]
      },
      "description": "身披长毛的远古犀牛，头角锐利。"
    },
    {
      "id": "mammoth_steppe_norm_03",
      "name": "草原狼",
      "type": "normal",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 73,
        "atk": 15,
        "def": 5,
        "agi": 8,
        "per": 5
      },
      "tags": [
        15,
        28
      ],
      "lootableTalentId": "tal_agile_swim",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动草原狼的本能攻击"
            ]
          }
        ]
      },
      "description": "集群狩猎的远古狼群。"
    },
    {
      "id": "mammoth_steppe_norm_04",
      "name": "旅鼠",
      "type": "normal",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 73,
        "atk": 14,
        "def": 4,
        "agi": 3,
        "per": 2
      },
      "tags": [
        28,
        15
      ],
      "lootableTalentId": "tal_benevolent_beast",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动旅鼠的本能攻击"
            ]
          }
        ]
      },
      "description": "数量暴涨的小型啮齿类，迁徙如潮。"
    },
    {
      "id": "mammoth_steppe_elite_01",
      "name": "剑齿虎",
      "type": "elite",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 127,
        "atk": 33,
        "def": 10,
        "agi": 4,
        "per": 4
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_shadow_stalk",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动剑齿虎的精英绝技"
            ]
          }
        ]
      },
      "description": "獠牙如匕首的远古猛虎，突袭致命。"
    },
    {
      "id": "mammoth_steppe_elite_02",
      "name": "巨角鹿",
      "type": "elite",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 127,
        "atk": 32,
        "def": 9,
        "agi": 7,
        "per": 6
      },
      "tags": [
        8,
        27
      ],
      "lootableTalentId": "tal_tenacity",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨角鹿的精英绝技"
            ]
          }
        ]
      },
      "description": "角冠如巨扇的远古鹿，角击之力可断骨。"
    },
    {
      "id": "mammoth_steppe_elite_03",
      "name": "史前鬣狗",
      "type": "elite",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 125,
        "atk": 31,
        "def": 10,
        "agi": 4,
        "per": 2
      },
      "tags": [
        28,
        2
      ],
      "lootableTalentId": "tal_secret_realm_mother",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动史前鬣狗的精英绝技"
            ]
          }
        ]
      },
      "description": "咬合力冠绝史前的食骨猎手。"
    },
    {
      "id": "mammoth_steppe_boss",
      "name": "冰河之王·猛犸巨象",
      "type": "boss",
      "mapId": "mammoth_steppe",
      "stats": {
        "hp": 303,
        "atk": 87,
        "def": 30,
        "agi": 9,
        "per": 10
      },
      "tags": [
        27,
        8
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "mammoth_steppe"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "冰河之王·猛犸巨象进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "冰河之王·猛犸巨象发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "冰河期最庞大的陆地生物，踏地如雷鸣。"
    },
    {
      "id": "tundra_permafrost_norm_01",
      "name": "驯鹿",
      "type": "normal",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 78,
        "atk": 16,
        "def": 5,
        "agi": 8,
        "per": 5
      },
      "tags": [
        15,
        8
      ],
      "lootableTalentId": "tal_leap",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动驯鹿的本能攻击"
            ]
          }
        ]
      },
      "description": "成群迁徙的苔原鹿，耐寒极强。"
    },
    {
      "id": "tundra_permafrost_norm_02",
      "name": "北极狐",
      "type": "normal",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 78,
        "atk": 16,
        "def": 5,
        "agi": 6,
        "per": 4
      },
      "tags": [
        17,
        21
      ],
      "lootableTalentId": "tal_mud_burrow",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动北极狐的本能攻击"
            ]
          }
        ]
      },
      "description": "毛色纯白的苔原狐，听觉能穿透雪层。"
    },
    {
      "id": "tundra_permafrost_norm_03",
      "name": "雪兔",
      "type": "normal",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 78,
        "atk": 15,
        "def": 5,
        "agi": 4,
        "per": 5
      },
      "tags": [
        15,
        17
      ],
      "lootableTalentId": "tal_swift_nerve",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雪兔的本能攻击"
            ]
          }
        ]
      },
      "description": "与雪地同色的苔原野兔。"
    },
    {
      "id": "tundra_permafrost_norm_04",
      "name": "苔原狼",
      "type": "normal",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 77,
        "atk": 15,
        "def": 5,
        "agi": 4,
        "per": 6
      },
      "tags": [
        15,
        28
      ],
      "lootableTalentId": "tal_mud_jump",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动苔原狼的本能攻击"
            ]
          }
        ]
      },
      "description": "白色毛皮的苔原狼，围猎驯鹿群。"
    },
    {
      "id": "tundra_permafrost_elite_01",
      "name": "麝牛",
      "type": "elite",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 133,
        "atk": 36,
        "def": 10,
        "agi": 4,
        "per": 2
      },
      "tags": [
        8,
        7
      ],
      "lootableTalentId": "tal_iron_wall",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动麝牛的精英绝技"
            ]
          }
        ]
      },
      "description": "抱团御敌的苔原巨兽，撞角如锤。"
    },
    {
      "id": "tundra_permafrost_elite_02",
      "name": "雪鸮",
      "type": "elite",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 126,
        "atk": 32,
        "def": 9,
        "agi": 6,
        "per": 4
      },
      "tags": [
        14,
        21
      ],
      "lootableTalentId": "tal_flight",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雪鸮的精英绝技"
            ]
          }
        ]
      },
      "description": "纯白猛禽，飞行无声无息。"
    },
    {
      "id": "tundra_permafrost_elite_03",
      "name": "北极熊",
      "type": "elite",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 131,
        "atk": 33,
        "def": 10,
        "agi": 5,
        "per": 4
      },
      "tags": [
        8,
        27
      ],
      "lootableTalentId": "tal_elemental_resist",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动北极熊的精英绝技"
            ]
          }
        ]
      },
      "description": "苔原食物链顶端的白色巨兽。"
    },
    {
      "id": "tundra_permafrost_boss",
      "name": "苔原之王·北极熊王",
      "type": "boss",
      "mapId": "tundra_permafrost",
      "stats": {
        "hp": 308,
        "atk": 93,
        "def": 30,
        "agi": 5,
        "per": 8
      },
      "tags": [
        27,
        7
      ],
      "lootableTalentId": "tal_beast_intimidation",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "tundra_permafrost"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "苔原之王·北极熊王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "苔原之王·北极熊王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "统治冰封苔原的熊王，一掌可碎浮冰。"
    },
    {
      "id": "glacial_icefield_norm_01",
      "name": "帝企鹅",
      "type": "normal",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 80,
        "atk": 17,
        "def": 5,
        "agi": 5,
        "per": 6
      },
      "tags": [
        18,
        8
      ],
      "lootableTalentId": "tal_deep_sea_lung",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动帝企鹅的本能攻击"
            ]
          }
        ]
      },
      "description": "在冰原上列队行走的极地鸟类。"
    },
    {
      "id": "glacial_icefield_norm_02",
      "name": "冰海豹",
      "type": "normal",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 79,
        "atk": 16,
        "def": 5,
        "agi": 4,
        "per": 6
      },
      "tags": [
        18,
        15
      ],
      "lootableTalentId": "tal_ocean_sovereign",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰海豹的本能攻击"
            ]
          }
        ]
      },
      "description": "在冰洞中栖息的幼豹，游泳如飞。"
    },
    {
      "id": "glacial_icefield_norm_03",
      "name": "雪燕",
      "type": "normal",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 80,
        "atk": 16,
        "def": 5,
        "agi": 4,
        "per": 4
      },
      "tags": [
        14,
        15
      ],
      "lootableTalentId": "tal_flight",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雪燕的本能攻击"
            ]
          }
        ]
      },
      "description": "穿梭在暴风雪中的极地燕鸟。"
    },
    {
      "id": "glacial_icefield_norm_04",
      "name": "冰鱼",
      "type": "normal",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 79,
        "atk": 16,
        "def": 5,
        "agi": 3,
        "per": 2
      },
      "tags": [
        18,
        7
      ],
      "lootableTalentId": "tal_ink_spray",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "血液含抗冻蛋白的极地鱼。"
    },
    {
      "id": "glacial_icefield_elite_01",
      "name": "冰鲨",
      "type": "elite",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 134,
        "atk": 36,
        "def": 10,
        "agi": 4,
        "per": 6
      },
      "tags": [
        7,
        2
      ],
      "lootableTalentId": "tal_frost_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰鲨的精英绝技"
            ]
          }
        ]
      },
      "description": "在冰缝中游弋的远古鲨鱼，齿带寒气。"
    },
    {
      "id": "glacial_icefield_elite_02",
      "name": "独角鲸",
      "type": "elite",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 135,
        "atk": 35,
        "def": 10,
        "agi": 5,
        "per": 2
      },
      "tags": [
        7,
        18
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动独角鲸的精英绝技"
            ]
          }
        ]
      },
      "description": "长角如螺旋长矛的极地鲸。"
    },
    {
      "id": "glacial_icefield_elite_03",
      "name": "巨型海象",
      "type": "elite",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 132,
        "atk": 34,
        "def": 10,
        "agi": 3,
        "per": 2
      },
      "tags": [
        8,
        7
      ],
      "lootableTalentId": "tal_elemental_resist",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨型海象的精英绝技"
            ]
          }
        ]
      },
      "description": "獠牙如象牙的极地巨兽。"
    },
    {
      "id": "glacial_icefield_boss",
      "name": "冰川之王·冰霜巨鲸",
      "type": "boss",
      "mapId": "glacial_icefield",
      "stats": {
        "hp": 335,
        "atk": 97,
        "def": 30,
        "agi": 9,
        "per": 6
      },
      "tags": [
        27,
        7
      ],
      "lootableTalentId": "tal_dragon_might",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "glacial_icefield"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "冰川之王·冰霜巨鲸进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "冰川之王·冰霜巨鲸发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "沉睡在万年冰川下的巨鲸，醒来时冰层开裂。"
    },
    {
      "id": "coastal_tundra_norm_01",
      "name": "海鸦",
      "type": "normal",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 81,
        "atk": 15,
        "def": 5,
        "agi": 8,
        "per": 2
      },
      "tags": [
        14,
        18
      ],
      "lootableTalentId": "tal_sky_dominator",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海鸦的本能攻击"
            ]
          }
        ]
      },
      "description": "在冻海礁石上聚栖的海鸟。"
    },
    {
      "id": "coastal_tundra_norm_02",
      "name": "冻原蟹",
      "type": "normal",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 82,
        "atk": 17,
        "def": 5,
        "agi": 4,
        "per": 6
      },
      "tags": [
        9,
        18
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冻原蟹的本能攻击"
            ]
          }
        ]
      },
      "description": "适应冰海的甲壳生物。"
    },
    {
      "id": "coastal_tundra_norm_03",
      "name": "海鸥",
      "type": "normal",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 81,
        "atk": 16,
        "def": 5,
        "agi": 3,
        "per": 5
      },
      "tags": [
        14,
        21
      ],
      "lootableTalentId": "tal_high_altitude",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海鸥的本能攻击"
            ]
          }
        ]
      },
      "description": "追着渔汛的极地海鸥。"
    },
    {
      "id": "coastal_tundra_norm_04",
      "name": "冻原兔",
      "type": "normal",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 81,
        "atk": 17,
        "def": 6,
        "agi": 4,
        "per": 3
      },
      "tags": [
        15,
        17
      ],
      "lootableTalentId": "tal_lightning_reflex",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冻原兔的本能攻击"
            ]
          }
        ]
      },
      "description": "滨海冻原上的白色野兔。"
    },
    {
      "id": "coastal_tundra_elite_01",
      "name": "白鲸",
      "type": "elite",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 138,
        "atk": 36,
        "def": 11,
        "agi": 5,
        "per": 6
      },
      "tags": [
        18,
        7
      ],
      "lootableTalentId": "tal_ink_spray",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动白鲸的精英绝技"
            ]
          }
        ]
      },
      "description": "歌声悠扬的极地鲸类，肤色如雪。"
    },
    {
      "id": "coastal_tundra_elite_02",
      "name": "海象王",
      "type": "elite",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 139,
        "atk": 37,
        "def": 11,
        "agi": 8,
        "per": 3
      },
      "tags": [
        8,
        7
      ],
      "lootableTalentId": "tal_roll_defense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海象王的精英绝技"
            ]
          }
        ]
      },
      "description": "獠牙最长的海象头领。"
    },
    {
      "id": "coastal_tundra_elite_03",
      "name": "北极狼",
      "type": "elite",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 137,
        "atk": 37,
        "def": 11,
        "agi": 7,
        "per": 5
      },
      "tags": [
        15,
        28
      ],
      "lootableTalentId": "tal_cilia_movement",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动北极狼的精英绝技"
            ]
          }
        ]
      },
      "description": "滨海冻原的白色狼王。"
    },
    {
      "id": "coastal_tundra_boss",
      "name": "冻海之王·白鲸王",
      "type": "boss",
      "mapId": "coastal_tundra",
      "stats": {
        "hp": 354,
        "atk": 111,
        "def": 33,
        "agi": 7,
        "per": 7
      },
      "tags": [
        27,
        7
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "coastal_tundra"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "冻海之王·白鲸王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "冻海之王·白鲸王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "统御冻海的鲸群之王，长鸣可震碎冰层。"
    },
    {
      "id": "glimmer_woods_norm_01",
      "name": "荧光菌菇",
      "type": "normal",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 107,
        "atk": 22,
        "def": 6,
        "agi": 6,
        "per": 5
      },
      "tags": [
        3,
        10
      ],
      "lootableTalentId": "tal_plague_cloud",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动荧光菌菇的本能攻击"
            ]
          }
        ]
      },
      "description": "散发幽蓝荧光的巨型菌菇，孢子带毒。"
    },
    {
      "id": "glimmer_woods_norm_02",
      "name": "萤火虫群",
      "type": "normal",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 107,
        "atk": 20,
        "def": 7,
        "agi": 3,
        "per": 3
      },
      "tags": [
        15,
        21
      ],
      "lootableTalentId": "tal_agile_swim",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动萤火虫群的本能攻击"
            ]
          }
        ]
      },
      "description": "如星海般的发光虫群。"
    },
    {
      "id": "glimmer_woods_norm_03",
      "name": "幽光蛾",
      "type": "normal",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 109,
        "atk": 22,
        "def": 8,
        "agi": 4,
        "per": 6
      },
      "tags": [
        14,
        11
      ],
      "lootableTalentId": "tal_high_altitude",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动幽光蛾的本能攻击"
            ]
          }
        ]
      },
      "description": "翅膀散发磷光的巨蛾，鳞粉致幻。"
    },
    {
      "id": "glimmer_woods_norm_04",
      "name": "荧光树蛙",
      "type": "normal",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 110,
        "atk": 23,
        "def": 8,
        "agi": 5,
        "per": 5
      },
      "tags": [
        3,
        18
      ],
      "lootableTalentId": "tal_dissolving_fluid",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动荧光树蛙的本能攻击"
            ]
          }
        ]
      },
      "description": "体表发光的树蛙，毒液荧光。"
    },
    {
      "id": "glimmer_woods_elite_01",
      "name": "幽光鹿",
      "type": "elite",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 185,
        "atk": 48,
        "def": 13,
        "agi": 8,
        "per": 3
      },
      "tags": [
        8,
        23
      ],
      "lootableTalentId": "tal_shadow_predator",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动幽光鹿的精英绝技"
            ]
          }
        ]
      },
      "description": "鹿角散发柔光的灵鹿，疾驰如影。"
    },
    {
      "id": "glimmer_woods_elite_02",
      "name": "幻影狼",
      "type": "elite",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 194,
        "atk": 51,
        "def": 14,
        "agi": 8,
        "per": 6
      },
      "tags": [
        17,
        11
      ],
      "lootableTalentId": "tal_shadow_stalk",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动幻影狼的精英绝技"
            ]
          }
        ]
      },
      "description": "能隐入幽光的幻影狼群。"
    },
    {
      "id": "glimmer_woods_elite_03",
      "name": "荧光巨蛛",
      "type": "elite",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 188,
        "atk": 49,
        "def": 15,
        "agi": 7,
        "per": 4
      },
      "tags": [
        5,
        3
      ],
      "lootableTalentId": "tal_mind_stun",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动荧光巨蛛的精英绝技"
            ]
          }
        ]
      },
      "description": "吐出发光蛛丝的巨型蜘蛛。"
    },
    {
      "id": "glimmer_woods_boss",
      "name": "幽光之王·荧光巨鹿",
      "type": "boss",
      "mapId": "glimmer_woods",
      "stats": {
        "hp": 502,
        "atk": 157,
        "def": 46,
        "agi": 6,
        "per": 6
      },
      "tags": [
        27,
        23
      ],
      "lootableTalentId": "tal_ancestor_of_beasts",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "glimmer_woods"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "幽光之王·荧光巨鹿进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "幽光之王·荧光巨鹿发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "林地中所有光芒的主人，鹿角如星冠。"
    },
    {
      "id": "encircling_sea_norm_01",
      "name": "环流鱼",
      "type": "normal",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 116,
        "atk": 22,
        "def": 7,
        "agi": 8,
        "per": 4
      },
      "tags": [
        18,
        28
      ],
      "lootableTalentId": "tal_ink_spray",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动环流鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "随洋流环绕世界的远洋鱼群。"
    },
    {
      "id": "encircling_sea_norm_02",
      "name": "漩涡水母",
      "type": "normal",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 118,
        "atk": 23,
        "def": 8,
        "agi": 7,
        "per": 5
      },
      "tags": [
        3,
        4
      ],
      "lootableTalentId": "tal_neurotoxin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动漩涡水母的本能攻击"
            ]
          }
        ]
      },
      "description": "随漩涡旋转的水母，触须带电。"
    },
    {
      "id": "encircling_sea_norm_03",
      "name": "潮汐蟹",
      "type": "normal",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 112,
        "atk": 22,
        "def": 7,
        "agi": 6,
        "per": 6
      },
      "tags": [
        9,
        18
      ],
      "lootableTalentId": "tal_spiral_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动潮汐蟹的本能攻击"
            ]
          }
        ]
      },
      "description": "乘着洋流迁徙的巨型蟹类。"
    },
    {
      "id": "encircling_sea_norm_04",
      "name": "环海蛇",
      "type": "normal",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 116,
        "atk": 24,
        "def": 8,
        "agi": 6,
        "per": 3
      },
      "tags": [
        3,
        18
      ],
      "lootableTalentId": "tal_neurotoxin_king",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动环海蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "体长环绕礁石的海洋蛇类。"
    },
    {
      "id": "encircling_sea_elite_01",
      "name": "海龙",
      "type": "elite",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 205,
        "atk": 51,
        "def": 16,
        "agi": 7,
        "per": 5
      },
      "tags": [
        18,
        14
      ],
      "lootableTalentId": "tal_blood_venom",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动海龙的精英绝技"
            ]
          }
        ]
      },
      "description": "传说中的海洋龙兽，鳞片如蓝宝石。"
    },
    {
      "id": "encircling_sea_elite_02",
      "name": "巨型环海龟",
      "type": "elite",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 205,
        "atk": 51,
        "def": 16,
        "agi": 4,
        "per": 3
      },
      "tags": [
        9,
        18
      ],
      "lootableTalentId": "tal_scale_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨型环海龟的精英绝技"
            ]
          }
        ]
      },
      "description": "背负岛屿般龟壳的远古海龟。"
    },
    {
      "id": "encircling_sea_elite_03",
      "name": "漩涡鲸",
      "type": "elite",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 207,
        "atk": 51,
        "def": 16,
        "agi": 4,
        "per": 5
      },
      "tags": [
        27,
        18
      ],
      "lootableTalentId": "tal_king_roar",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动漩涡鲸的精英绝技"
            ]
          }
        ]
      },
      "description": "在洋流中心嬉戏的巨型鲸类。"
    },
    {
      "id": "encircling_sea_boss",
      "name": "环海之王·漩涡龙王",
      "type": "boss",
      "mapId": "encircling_sea",
      "stats": {
        "hp": 536,
        "atk": 154,
        "def": 51,
        "agi": 7,
        "per": 7
      },
      "tags": [
        27,
        18
      ],
      "lootableTalentId": "tal_siren_song",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "encircling_sea"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "环海之王·漩涡龙王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "环海之王·漩涡龙王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "环绕之海的主人，掀起漩涡吞噬一切。"
    },
    {
      "id": "frost_abyss_norm_01",
      "name": "冰渊鱼",
      "type": "normal",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 122,
        "atk": 25,
        "def": 7,
        "agi": 8,
        "per": 3
      },
      "tags": [
        7,
        17
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰渊鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "在冰缝中游动的极寒之鱼。"
    },
    {
      "id": "frost_abyss_norm_02",
      "name": "霜冻水母",
      "type": "normal",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 119,
        "atk": 23,
        "def": 8,
        "agi": 5,
        "per": 6
      },
      "tags": [
        7,
        3
      ],
      "lootableTalentId": "tal_frost_armor",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动霜冻水母的本能攻击"
            ]
          }
        ]
      },
      "description": "触须凝霜的水母，冰毒入骨。"
    },
    {
      "id": "frost_abyss_norm_03",
      "name": "冰甲虾",
      "type": "normal",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 120,
        "atk": 25,
        "def": 8,
        "agi": 6,
        "per": 3
      },
      "tags": [
        9,
        7
      ],
      "lootableTalentId": "tal_carapace",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰甲虾的本能攻击"
            ]
          }
        ]
      },
      "description": "甲壳覆冰的深渊虾类。"
    },
    {
      "id": "frost_abyss_norm_04",
      "name": "深渊冰蛇",
      "type": "normal",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 118,
        "atk": 25,
        "def": 7,
        "agi": 5,
        "per": 4
      },
      "tags": [
        7,
        3
      ],
      "lootableTalentId": "tal_glacial_thick_skin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动深渊冰蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "盘绕在冰柱上的寒蛇。"
    },
    {
      "id": "frost_abyss_elite_01",
      "name": "冰霜巨蜥",
      "type": "elite",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 215,
        "atk": 55,
        "def": 16,
        "agi": 3,
        "per": 3
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_temporal_nerve",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰霜巨蜥的精英绝技"
            ]
          }
        ]
      },
      "description": "鳞片凝结冰晶的巨蜥，吐息成冰。"
    },
    {
      "id": "frost_abyss_elite_02",
      "name": "寒冰水母",
      "type": "elite",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 216,
        "atk": 58,
        "def": 16,
        "agi": 6,
        "per": 5
      },
      "tags": [
        7,
        3
      ],
      "lootableTalentId": "tal_ice_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动寒冰水母的精英绝技"
            ]
          }
        ]
      },
      "description": "深渊中最大的冰系水母。"
    },
    {
      "id": "frost_abyss_elite_03",
      "name": "冻渊鲨",
      "type": "elite",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 212,
        "atk": 54,
        "def": 16,
        "agi": 6,
        "per": 3
      },
      "tags": [
        7,
        2
      ],
      "lootableTalentId": "tal_bloodthirst",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冻渊鲨的精英绝技"
            ]
          }
        ]
      },
      "description": "游弋在冰渊中的远古鲨鱼。"
    },
    {
      "id": "frost_abyss_boss",
      "name": "冰渊之王·永冻巨兽",
      "type": "boss",
      "mapId": "frost_abyss",
      "stats": {
        "hp": 570,
        "atk": 173,
        "def": 55,
        "agi": 10,
        "per": 8
      },
      "tags": [
        27,
        7
      ],
      "lootableTalentId": "tal_ice_flame_body",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "frost_abyss"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "冰渊之王·永冻巨兽进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "冰渊之王·永冻巨兽发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "冰封万年的远古巨兽，苏醒时大地结霜。"
    },
    {
      "id": "magma_abyss_norm_01",
      "name": "熔岩蠕虫",
      "type": "normal",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 126,
        "atk": 25,
        "def": 8,
        "agi": 3,
        "per": 6
      },
      "tags": [
        6,
        10
      ],
      "lootableTalentId": "tal_burn_penetration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动熔岩蠕虫的本能攻击"
            ]
          }
        ]
      },
      "description": "在岩浆河中翻涌的灼热蠕虫。"
    },
    {
      "id": "magma_abyss_norm_02",
      "name": "火蛇",
      "type": "normal",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 129,
        "atk": 26,
        "def": 8,
        "agi": 5,
        "per": 4
      },
      "tags": [
        6,
        3
      ],
      "lootableTalentId": "tal_thermal_absorb",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动火蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "鳞片如烙铁的深渊火蛇。"
    },
    {
      "id": "magma_abyss_norm_03",
      "name": "岩浆蟹",
      "type": "normal",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 129,
        "atk": 27,
        "def": 8,
        "agi": 5,
        "per": 3
      },
      "tags": [
        9,
        6
      ],
      "lootableTalentId": "tal_carapace",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动岩浆蟹的本能攻击"
            ]
          }
        ]
      },
      "description": "甲壳流淌熔岩的蟹类。"
    },
    {
      "id": "magma_abyss_norm_04",
      "name": "硫磺鱼",
      "type": "normal",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 131,
        "atk": 26,
        "def": 9,
        "agi": 3,
        "per": 4
      },
      "tags": [
        6,
        3
      ],
      "lootableTalentId": "tal_fire_breath_2",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动硫磺鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "在硫磺湖中游动的炽热之鱼。"
    },
    {
      "id": "magma_abyss_elite_01",
      "name": "火蜥王",
      "type": "elite",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 226,
        "atk": 60,
        "def": 18,
        "agi": 8,
        "per": 2
      },
      "tags": [
        6,
        10
      ],
      "lootableTalentId": "tal_unquenchable_flame",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动火蜥王的精英绝技"
            ]
          }
        ]
      },
      "description": "深渊火蜥之王，吐息如火山喷发。"
    },
    {
      "id": "magma_abyss_elite_02",
      "name": "熔岩巨龟",
      "type": "elite",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 238,
        "atk": 61,
        "def": 16,
        "agi": 8,
        "per": 4
      },
      "tags": [
        9,
        6
      ],
      "lootableTalentId": "tal_spiral_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动熔岩巨龟的精英绝技"
            ]
          }
        ]
      },
      "description": "龟壳如熔岩块般龟裂发光。"
    },
    {
      "id": "magma_abyss_elite_03",
      "name": "炎魔幼体",
      "type": "elite",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 237,
        "atk": 63,
        "def": 17,
        "agi": 3,
        "per": 4
      },
      "tags": [
        6,
        23
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动炎魔幼体的精英绝技"
            ]
          }
        ]
      },
      "description": "深渊炎魔的幼体，周身燃着地狱火。"
    },
    {
      "id": "magma_abyss_boss",
      "name": "熔渊之王·炎魔领主",
      "type": "boss",
      "mapId": "magma_abyss",
      "stats": {
        "hp": 607,
        "atk": 184,
        "def": 50,
        "agi": 7,
        "per": 11
      },
      "tags": [
        27,
        6
      ],
      "lootableTalentId": "tal_nirvana_flame_legend",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "magma_abyss"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "熔渊之王·炎魔领主进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "熔渊之王·炎魔领主发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "地心深处的炎魔领主，一步踏出岩浆翻涌。"
    },
    {
      "id": "celestial_zenith_norm_01",
      "name": "天界雀",
      "type": "normal",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 138,
        "atk": 28,
        "def": 8,
        "agi": 3,
        "per": 3
      },
      "tags": [
        14,
        25
      ],
      "lootableTalentId": "tal_sky_lord",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动天界雀的本能攻击"
            ]
          }
        ]
      },
      "description": "羽毛泛金光的仙雀，鸣声悦耳。"
    },
    {
      "id": "celestial_zenith_norm_02",
      "name": "云鲸幼体",
      "type": "normal",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 138,
        "atk": 27,
        "def": 10,
        "agi": 6,
        "per": 3
      },
      "tags": [
        14,
        18
      ],
      "lootableTalentId": "tal_sky_dominator",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动云鲸幼体的本能攻击"
            ]
          }
        ]
      },
      "description": "在云海中翻腾的幼年云鲸。"
    },
    {
      "id": "celestial_zenith_norm_03",
      "name": "星辉蛾",
      "type": "normal",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 141,
        "atk": 27,
        "def": 9,
        "agi": 8,
        "per": 5
      },
      "tags": [
        14,
        23
      ],
      "lootableTalentId": "tal_storm_lord",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动星辉蛾的本能攻击"
            ]
          }
        ]
      },
      "description": "翅翼映出星空的灵蛾。"
    },
    {
      "id": "celestial_zenith_norm_04",
      "name": "天风鹰",
      "type": "normal",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 136,
        "atk": 27,
        "def": 9,
        "agi": 3,
        "per": 5
      },
      "tags": [
        14,
        4
      ],
      "lootableTalentId": "tal_flight",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动天风鹰的本能攻击"
            ]
          }
        ]
      },
      "description": "驾驭天风的银翼之鹰。"
    },
    {
      "id": "celestial_zenith_elite_01",
      "name": "天界狮鹫",
      "type": "elite",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 263,
        "atk": 70,
        "def": 20,
        "agi": 3,
        "per": 6
      },
      "tags": [
        14,
        4
      ],
      "lootableTalentId": "tal_fusion_storm_sky",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动天界狮鹫的精英绝技"
            ]
          }
        ]
      },
      "description": "狮身鹰翼的天界神兽，雷霆随行。"
    },
    {
      "id": "celestial_zenith_elite_02",
      "name": "星界麒麟",
      "type": "elite",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 259,
        "atk": 64,
        "def": 18,
        "agi": 5,
        "per": 6
      },
      "tags": [
        23,
        27
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动星界麒麟的精英绝技"
            ]
          }
        ]
      },
      "description": "周身星光流转的圣兽。"
    },
    {
      "id": "celestial_zenith_elite_03",
      "name": "雷霆鹏鸟",
      "type": "elite",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 266,
        "atk": 67,
        "def": 21,
        "agi": 8,
        "per": 2
      },
      "tags": [
        14,
        4
      ],
      "lootableTalentId": "tal_high_altitude",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雷霆鹏鸟的精英绝技"
            ]
          }
        ]
      },
      "description": "双翼振翅便引来雷霆的巨鹏。"
    },
    {
      "id": "celestial_zenith_boss",
      "name": "天阙之王·苍穹巨龙",
      "type": "boss",
      "mapId": "celestial_zenith",
      "stats": {
        "hp": 703,
        "atk": 205,
        "def": 60,
        "agi": 6,
        "per": 10
      },
      "tags": [
        27,
        14
      ],
      "lootableTalentId": "tal_all_seeing_eye",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "celestial_zenith"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "天阙之王·苍穹巨龙进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "天阙之王·苍穹巨龙发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "盘旋在天界最高处的神龙，云层为其爪垫。"
    },
    {
      "id": "dragon_lair_norm_01",
      "name": "龙裔幼兽",
      "type": "normal",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 104,
        "atk": 20,
        "def": 7,
        "agi": 7,
        "per": 5
      },
      "tags": [
        6,
        9
      ],
      "lootableTalentId": "tal_heat_storage",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动龙裔幼兽的本能攻击"
            ]
          }
        ]
      },
      "description": "刚破壳的龙裔，爪牙初具锋芒。"
    },
    {
      "id": "dragon_lair_norm_02",
      "name": "龙血蜥",
      "type": "normal",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 105,
        "atk": 22,
        "def": 7,
        "agi": 4,
        "per": 2
      },
      "tags": [
        2,
        6
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动龙血蜥的本能攻击"
            ]
          }
        ]
      },
      "description": "体内流淌龙血的蜥蜴，鳞片泛红。"
    },
    {
      "id": "dragon_lair_norm_03",
      "name": "翼龙",
      "type": "normal",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 105,
        "atk": 22,
        "def": 7,
        "agi": 8,
        "per": 2
      },
      "tags": [
        14,
        9
      ],
      "lootableTalentId": "tal_storm_lord",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动翼龙的本能攻击"
            ]
          }
        ]
      },
      "description": "滑翔在龙巢上空的远古翼龙。"
    },
    {
      "id": "dragon_lair_norm_04",
      "name": "龙鳞蛇",
      "type": "normal",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 104,
        "atk": 22,
        "def": 6,
        "agi": 8,
        "per": 2
      },
      "tags": [
        3,
        9
      ],
      "lootableTalentId": "tal_toxic_mucus",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动龙鳞蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "鳞片如龙鳞的剧毒蛇。"
    },
    {
      "id": "dragon_lair_elite_01",
      "name": "赤炎龙",
      "type": "elite",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 186,
        "atk": 48,
        "def": 14,
        "agi": 4,
        "per": 5
      },
      "tags": [
        6,
        27
      ],
      "lootableTalentId": "tal_fire_breath",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动赤炎龙的精英绝技"
            ]
          }
        ]
      },
      "description": "喷吐烈焰的年轻火龙。"
    },
    {
      "id": "dragon_lair_elite_02",
      "name": "冰霜龙",
      "type": "elite",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 181,
        "atk": 49,
        "def": 15,
        "agi": 7,
        "per": 5
      },
      "tags": [
        7,
        27
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动冰霜龙的精英绝技"
            ]
          }
        ]
      },
      "description": "呼出寒气的冰龙，翼下生霜。"
    },
    {
      "id": "dragon_lair_elite_03",
      "name": "雷暴龙",
      "type": "elite",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 184,
        "atk": 47,
        "def": 13,
        "agi": 7,
        "per": 3
      },
      "tags": [
        4,
        27
      ],
      "lootableTalentId": "tal_electric",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动雷暴龙的精英绝技"
            ]
          }
        ]
      },
      "description": "爪间缠绕闪电的雷龙。"
    },
    {
      "id": "dragon_lair_boss",
      "name": "龙巢之王·太古龙王",
      "type": "boss",
      "mapId": "dragon_lair",
      "stats": {
        "hp": 465,
        "atk": 136,
        "def": 45,
        "agi": 10,
        "per": 9
      },
      "tags": [
        27,
        6
      ],
      "lootableTalentId": "tal_myriad_beast_divinity",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "dragon_lair"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "龙巢之王·太古龙王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "龙巢之王·太古龙王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "龙巢秘境的主宰，一声龙吟万兽臣服。"
    },
    {
      "id": "spirit_woods_norm_01",
      "name": "灵狐",
      "type": "normal",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 131,
        "atk": 26,
        "def": 8,
        "agi": 8,
        "per": 4
      },
      "tags": [
        23,
        15
      ],
      "lootableTalentId": "tal_holy_light_protection",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灵狐的本能攻击"
            ]
          }
        ]
      },
      "description": "尾尖燃着魂火的灵狐，行动如鬼魅。"
    },
    {
      "id": "spirit_woods_norm_02",
      "name": "魂火蛾",
      "type": "normal",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 127,
        "atk": 26,
        "def": 9,
        "agi": 7,
        "per": 5
      },
      "tags": [
        23,
        6
      ],
      "lootableTalentId": "tal_wither_penetration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动魂火蛾的本能攻击"
            ]
          }
        ]
      },
      "description": "翅翼如两团魂火的灵蛾。"
    },
    {
      "id": "spirit_woods_norm_03",
      "name": "树灵",
      "type": "normal",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 133,
        "atk": 25,
        "def": 9,
        "agi": 7,
        "per": 3
      },
      "tags": [
        23,
        10
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动树灵的本能攻击"
            ]
          }
        ]
      },
      "description": "从古树中诞生的树人守卫。"
    },
    {
      "id": "spirit_woods_norm_04",
      "name": "幽灵狼",
      "type": "normal",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 134,
        "atk": 27,
        "def": 8,
        "agi": 5,
        "per": 3
      },
      "tags": [
        23,
        17
      ],
      "lootableTalentId": "tal_mind_stun",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动幽灵狼的本能攻击"
            ]
          }
        ]
      },
      "description": "半透明的幽狼，穿行于林间。"
    },
    {
      "id": "spirit_woods_elite_01",
      "name": "灵鹿王",
      "type": "elite",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 234,
        "atk": 64,
        "def": 19,
        "agi": 5,
        "per": 2
      },
      "tags": [
        23,
        8
      ],
      "lootableTalentId": "tal_infinite_proliferation",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灵鹿王的精英绝技"
            ]
          }
        ]
      },
      "description": "头生琉璃角的灵鹿之王。"
    },
    {
      "id": "spirit_woods_elite_02",
      "name": "缚魂藤",
      "type": "elite",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 243,
        "atk": 61,
        "def": 17,
        "agi": 4,
        "per": 4
      },
      "tags": [
        23,
        5
      ],
      "lootableTalentId": "tal_mycelial_web",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动缚魂藤的精英绝技"
            ]
          }
        ]
      },
      "description": "能束缚灵魂的远古藤蔓。"
    },
    {
      "id": "spirit_woods_elite_03",
      "name": "灵犀",
      "type": "elite",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 245,
        "atk": 63,
        "def": 18,
        "agi": 3,
        "per": 5
      },
      "tags": [
        23,
        27
      ],
      "lootableTalentId": "tal_primal_devour",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灵犀的精英绝技"
            ]
          }
        ]
      },
      "description": "额生灵角的独角巨兽。"
    },
    {
      "id": "spirit_woods_boss",
      "name": "灵域之王·万灵之树",
      "type": "boss",
      "mapId": "spirit_woods",
      "stats": {
        "hp": 642,
        "atk": 201,
        "def": 59,
        "agi": 6,
        "per": 6
      },
      "tags": [
        23,
        27
      ],
      "lootableTalentId": "tal_chimera_soul",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "spirit_woods"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "灵域之王·万灵之树进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "灵域之王·万灵之树发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "整片灵域的灵魂枢纽，树冠托举着万千魂火。"
    },
    {
      "id": "sacred_beast_forest_norm_01",
      "name": "圣鹿",
      "type": "normal",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 132,
        "atk": 26,
        "def": 9,
        "agi": 7,
        "per": 6
      },
      "tags": [
        23,
        8
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动圣鹿的本能攻击"
            ]
          }
        ]
      },
      "description": "毛色如月光的圣洁之鹿。"
    },
    {
      "id": "sacred_beast_forest_norm_02",
      "name": "白猿",
      "type": "normal",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 138,
        "atk": 26,
        "def": 9,
        "agi": 3,
        "per": 5
      },
      "tags": [
        8,
        15
      ],
      "lootableTalentId": "tal_glacial_thick_skin",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动白猿的本能攻击"
            ]
          }
        ]
      },
      "description": "通体雪白的灵猿，臂力惊人。"
    },
    {
      "id": "sacred_beast_forest_norm_03",
      "name": "灵猫",
      "type": "normal",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 139,
        "atk": 28,
        "def": 8,
        "agi": 6,
        "per": 2
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_ambush",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动灵猫的本能攻击"
            ]
          }
        ]
      },
      "description": "身法如电的圣林灵猫。"
    },
    {
      "id": "sacred_beast_forest_norm_04",
      "name": "圣象幼崽",
      "type": "normal",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 137,
        "atk": 27,
        "def": 9,
        "agi": 5,
        "per": 2
      },
      "tags": [
        8,
        28
      ],
      "lootableTalentId": "tal_tenacity",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动圣象幼崽的本能攻击"
            ]
          }
        ]
      },
      "description": "背负圣纹的幼年神象。"
    },
    {
      "id": "sacred_beast_forest_elite_01",
      "name": "麒麟",
      "type": "elite",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 244,
        "atk": 63,
        "def": 17,
        "agi": 5,
        "per": 4
      },
      "tags": [
        23,
        27
      ],
      "lootableTalentId": "tal_giant_blood",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动麒麟的精英绝技"
            ]
          }
        ]
      },
      "description": "祥瑞圣兽，脚踏祥云而来。"
    },
    {
      "id": "sacred_beast_forest_elite_02",
      "name": "白虎",
      "type": "elite",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 252,
        "atk": 64,
        "def": 18,
        "agi": 8,
        "per": 3
      },
      "tags": [
        17,
        27
      ],
      "lootableTalentId": "tal_shadow_stalk",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动白虎的精英绝技"
            ]
          }
        ]
      },
      "description": "额生王纹的圣林白虎。"
    },
    {
      "id": "sacred_beast_forest_elite_03",
      "name": "圣猿王",
      "type": "elite",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 249,
        "atk": 62,
        "def": 20,
        "agi": 5,
        "per": 4
      },
      "tags": [
        8,
        27
      ],
      "lootableTalentId": "tal_deep_sea_blubber",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动圣猿王的精英绝技"
            ]
          }
        ]
      },
      "description": "统御万猿的圣林猿王。"
    },
    {
      "id": "sacred_beast_forest_boss",
      "name": "圣林之王·万兽之祖",
      "type": "boss",
      "mapId": "sacred_beast_forest",
      "stats": {
        "hp": 660,
        "atk": 197,
        "def": 63,
        "agi": 9,
        "per": 11
      },
      "tags": [
        27,
        24
      ],
      "lootableTalentId": "tal_fusion_beast_dragon",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "sacred_beast_forest"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "圣林之王·万兽之祖进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "圣林之王·万兽之祖发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "万兽的始祖，圣林一切生灵的源头。"
    },
    {
      "id": "deep_mystery_norm_01",
      "name": "秘境蟹",
      "type": "normal",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 162,
        "atk": 33,
        "def": 11,
        "agi": 4,
        "per": 3
      },
      "tags": [
        9,
        10
      ],
      "lootableTalentId": "tal_indestructible_body",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动秘境蟹的本能攻击"
            ]
          }
        ]
      },
      "description": "甲壳上流转着秘纹的蟹类。"
    },
    {
      "id": "deep_mystery_norm_02",
      "name": "幽影蛇",
      "type": "normal",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 168,
        "atk": 33,
        "def": 11,
        "agi": 3,
        "per": 6
      },
      "tags": [
        17,
        3
      ],
      "lootableTalentId": "tal_ambush",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动幽影蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "如影子般流动的蛇类。"
    },
    {
      "id": "deep_mystery_norm_03",
      "name": "深秘虫",
      "type": "normal",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 161,
        "atk": 32,
        "def": 10,
        "agi": 6,
        "per": 2
      },
      "tags": [
        28,
        10
      ],
      "lootableTalentId": "tal_coordinated_hunt",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动深秘虫的本能攻击"
            ]
          }
        ]
      },
      "description": "啃食秘境力量的虫群。"
    },
    {
      "id": "deep_mystery_norm_04",
      "name": "秘光鱼",
      "type": "normal",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 165,
        "atk": 33,
        "def": 11,
        "agi": 8,
        "per": 6
      },
      "tags": [
        20,
        21
      ],
      "lootableTalentId": "tal_geomagnetic_sense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动秘光鱼的本能攻击"
            ]
          }
        ]
      },
      "description": "游动时留下光痕的神秘之鱼。"
    },
    {
      "id": "deep_mystery_elite_01",
      "name": "秘境守卫者",
      "type": "elite",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 324,
        "atk": 82,
        "def": 22,
        "agi": 4,
        "per": 2
      },
      "tags": [
        23,
        9
      ],
      "lootableTalentId": "tal_fusion_thorn_bind",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动秘境守卫者的精英绝技"
            ]
          }
        ]
      },
      "description": "守护秘境核心的石像守卫，突然活了过来。"
    },
    {
      "id": "deep_mystery_elite_02",
      "name": "远古虫母",
      "type": "elite",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 313,
        "atk": 78,
        "def": 22,
        "agi": 8,
        "per": 5
      },
      "tags": [
        28,
        10
      ],
      "lootableTalentId": "tal_group_hunt",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动远古虫母的精英绝技"
            ]
          }
        ]
      },
      "description": "孕育神秘虫群的远古母体。"
    },
    {
      "id": "deep_mystery_elite_03",
      "name": "秘影猎手",
      "type": "elite",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 306,
        "atk": 82,
        "def": 22,
        "agi": 8,
        "per": 5
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_tundra_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动秘影猎手的精英绝技"
            ]
          }
        ]
      },
      "description": "能在阴影间跳跃的猎手。"
    },
    {
      "id": "deep_mystery_boss",
      "name": "秘境之王·时空守护者",
      "type": "boss",
      "mapId": "deep_mystery",
      "stats": {
        "hp": 861,
        "atk": 257,
        "def": 72,
        "agi": 8,
        "per": 7
      },
      "tags": [
        27,
        23
      ],
      "lootableTalentId": "tal_void_venom",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "deep_mystery"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "秘境之王·时空守护者进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "秘境之王·时空守护者发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "看守秘境真相的存在，周身时空扭曲。"
    },
    {
      "id": "beast_divine_court_norm_01",
      "name": "神庭犬",
      "type": "normal",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 148,
        "atk": 30,
        "def": 10,
        "agi": 6,
        "per": 3
      },
      "tags": [
        25,
        15
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动神庭犬的本能攻击"
            ]
          }
        ]
      },
      "description": "看守神庭大门的犬首神兽。"
    },
    {
      "id": "beast_divine_court_norm_02",
      "name": "圣翼隼",
      "type": "normal",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 151,
        "atk": 31,
        "def": 10,
        "agi": 5,
        "per": 4
      },
      "tags": [
        25,
        14
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动圣翼隼的本能攻击"
            ]
          }
        ]
      },
      "description": "翼展如圣光的隼神。"
    },
    {
      "id": "beast_divine_court_norm_03",
      "name": "神庭象",
      "type": "normal",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 146,
        "atk": 30,
        "def": 10,
        "agi": 6,
        "per": 2
      },
      "tags": [
        25,
        8
      ],
      "lootableTalentId": "tal_tenacity",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动神庭象的本能攻击"
            ]
          }
        ]
      },
      "description": "背负神庭图腾的巨象。"
    },
    {
      "id": "beast_divine_court_norm_04",
      "name": "执法虎",
      "type": "normal",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 148,
        "atk": 29,
        "def": 9,
        "agi": 7,
        "per": 3
      },
      "tags": [
        25,
        17
      ],
      "lootableTalentId": "tal_swamp_ambush",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动执法虎的本能攻击"
            ]
          }
        ]
      },
      "description": "维持神庭秩序的虎神。"
    },
    {
      "id": "beast_divine_court_elite_01",
      "name": "神兽狻猊",
      "type": "elite",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 279,
        "atk": 72,
        "def": 22,
        "agi": 5,
        "per": 3
      },
      "tags": [
        25,
        6
      ],
      "lootableTalentId": "tal_fusion_ancient_hunt",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动神兽狻猊的精英绝技"
            ]
          }
        ]
      },
      "description": "香火中诞生的狮形神兽，口吐神火。"
    },
    {
      "id": "beast_divine_court_elite_02",
      "name": "神鹿",
      "type": "elite",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 277,
        "atk": 75,
        "def": 22,
        "agi": 8,
        "per": 6
      },
      "tags": [
        25,
        23
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动神鹿的精英绝技"
            ]
          }
        ]
      },
      "description": "鹿角悬挂星灯的神兽。"
    },
    {
      "id": "beast_divine_court_elite_03",
      "name": "天狗",
      "type": "elite",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 284,
        "atk": 71,
        "def": 23,
        "agi": 5,
        "per": 5
      },
      "tags": [
        25,
        4
      ],
      "lootableTalentId": "tal_electric",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动天狗的精英绝技"
            ]
          }
        ]
      },
      "description": "吞月之兽的后裔，爪间雷光。"
    },
    {
      "id": "beast_divine_court_boss",
      "name": "神庭之王·万兽神尊",
      "type": "boss",
      "mapId": "beast_divine_court",
      "stats": {
        "hp": 776,
        "atk": 224,
        "def": 63,
        "agi": 9,
        "per": 12
      },
      "tags": [
        25,
        27
      ],
      "lootableTalentId": "tal_psi_burst",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "beast_divine_court"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "神庭之王·万兽神尊进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "神庭之王·万兽神尊发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "万兽之神，端坐神庭之巅俯瞰众生。"
    },
    {
      "id": "beast_lair_norm_01",
      "name": "巢穴狼",
      "type": "normal",
      "mapId": "beast_lair",
      "stats": {
        "hp": 159,
        "atk": 31,
        "def": 11,
        "agi": 8,
        "per": 5
      },
      "tags": [
        28,
        15
      ],
      "lootableTalentId": "tal_benevolent_beast",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巢穴狼的本能攻击"
            ]
          }
        ]
      },
      "description": "成群的洞穴狼，红眼在黑暗中闪烁。"
    },
    {
      "id": "beast_lair_norm_02",
      "name": "巨鼠",
      "type": "normal",
      "mapId": "beast_lair",
      "stats": {
        "hp": 151,
        "atk": 30,
        "def": 9,
        "agi": 7,
        "per": 4
      },
      "tags": [
        28,
        10
      ],
      "lootableTalentId": "tal_group_hunt",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨鼠的本能攻击"
            ]
          }
        ]
      },
      "description": "体型如犬的变异鼠类，繁殖力惊人。"
    },
    {
      "id": "beast_lair_norm_03",
      "name": "洞熊",
      "type": "normal",
      "mapId": "beast_lair",
      "stats": {
        "hp": 155,
        "atk": 32,
        "def": 10,
        "agi": 7,
        "per": 6
      },
      "tags": [
        8,
        2
      ],
      "lootableTalentId": "tal_roll_defense",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动洞熊的本能攻击"
            ]
          }
        ]
      },
      "description": "在洞穴深处冬眠的远古巨熊。"
    },
    {
      "id": "beast_lair_norm_04",
      "name": "巢穴蛇",
      "type": "normal",
      "mapId": "beast_lair",
      "stats": {
        "hp": 152,
        "atk": 31,
        "def": 10,
        "agi": 3,
        "per": 5
      },
      "tags": [
        3,
        28
      ],
      "lootableTalentId": "tal_poison_sac",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巢穴蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "盘绕在巢穴石柱上的蛇群。"
    },
    {
      "id": "beast_lair_elite_01",
      "name": "兽群头狼",
      "type": "elite",
      "mapId": "beast_lair",
      "stats": {
        "hp": 298,
        "atk": 74,
        "def": 23,
        "agi": 6,
        "per": 5
      },
      "tags": [
        28,
        17
      ],
      "lootableTalentId": "tal_plague_source",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动兽群头狼的精英绝技"
            ]
          }
        ]
      },
      "description": "统率狼群的银鬃头狼。"
    },
    {
      "id": "beast_lair_elite_02",
      "name": "巨型山猫",
      "type": "elite",
      "mapId": "beast_lair",
      "stats": {
        "hp": 289,
        "atk": 78,
        "def": 20,
        "agi": 4,
        "per": 5
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_night_hunter",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动巨型山猫的精英绝技"
            ]
          }
        ]
      },
      "description": "潜伏在巢穴穹顶的巨猫。"
    },
    {
      "id": "beast_lair_elite_03",
      "name": "穴居巨熊",
      "type": "elite",
      "mapId": "beast_lair",
      "stats": {
        "hp": 284,
        "atk": 71,
        "def": 20,
        "agi": 8,
        "per": 4
      },
      "tags": [
        8,
        27
      ],
      "lootableTalentId": "tal_elemental_resist",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动穴居巨熊的精英绝技"
            ]
          }
        ]
      },
      "description": "占巢为王的远古洞熊。"
    },
    {
      "id": "beast_lair_boss",
      "name": "巢穴之王·兽群霸主",
      "type": "boss",
      "mapId": "beast_lair",
      "stats": {
        "hp": 832,
        "atk": 255,
        "def": 72,
        "agi": 7,
        "per": 7
      },
      "tags": [
        28,
        27
      ],
      "lootableTalentId": "tal_prehistoric_gene_pool",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "beast_lair"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "巢穴之王·兽群霸主进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "巢穴之王·兽群霸主发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "万兽巢穴的统治者，一声号令群兽奔涌。"
    },
    {
      "id": "prehistoric_colosseum_norm_01",
      "name": "角斗迅猛龙",
      "type": "normal",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 159,
        "atk": 32,
        "def": 11,
        "agi": 7,
        "per": 5
      },
      "tags": [
        15,
        2
      ],
      "lootableTalentId": "tal_sprint_claw",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动角斗迅猛龙的本能攻击"
            ]
          }
        ]
      },
      "description": "被驯为角斗士的迅猛龙，爪如弯钩。"
    },
    {
      "id": "prehistoric_colosseum_norm_02",
      "name": "三叶虫",
      "type": "normal",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 163,
        "atk": 34,
        "def": 11,
        "agi": 5,
        "per": 6
      },
      "tags": [
        9,
        28
      ],
      "lootableTalentId": "tal_shell",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动三叶虫的本能攻击"
            ]
          }
        ]
      },
      "description": "甲壳如铠甲的古生物。"
    },
    {
      "id": "prehistoric_colosseum_norm_03",
      "name": "角斗剑齿兽",
      "type": "normal",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 165,
        "atk": 32,
        "def": 11,
        "agi": 6,
        "per": 3
      },
      "tags": [
        2,
        15
      ],
      "lootableTalentId": "tal_bite",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动角斗剑齿兽的本能攻击"
            ]
          }
        ]
      },
      "description": "獠牙如剑的角斗兽。"
    },
    {
      "id": "prehistoric_colosseum_norm_04",
      "name": "斗场巨蝎",
      "type": "normal",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 163,
        "atk": 33,
        "def": 11,
        "agi": 5,
        "per": 2
      },
      "tags": [
        3,
        9
      ],
      "lootableTalentId": "tal_poison_penetration",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动斗场巨蝎的本能攻击"
            ]
          }
        ]
      },
      "description": "尾部毒钩挥舞的巨型蝎。"
    },
    {
      "id": "prehistoric_colosseum_elite_01",
      "name": "角斗霸王龙",
      "type": "elite",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 310,
        "atk": 83,
        "def": 21,
        "agi": 7,
        "per": 2
      },
      "tags": [
        27,
        2
      ],
      "lootableTalentId": "tal_fusion_blood_bone",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动角斗霸王龙的精英绝技"
            ]
          }
        ]
      },
      "description": "角斗场之王，牙缝间还挂着上一位对手的血。"
    },
    {
      "id": "prehistoric_colosseum_elite_02",
      "name": "斗场棘龙",
      "type": "elite",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 304,
        "atk": 81,
        "def": 22,
        "agi": 3,
        "per": 4
      },
      "tags": [
        27,
        18
      ],
      "lootableTalentId": "tal_king_roar",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动斗场棘龙的精英绝技"
            ]
          }
        ]
      },
      "description": "背帆高耸的角斗巨兽。"
    },
    {
      "id": "prehistoric_colosseum_elite_03",
      "name": "角斗巨齿鲨",
      "type": "elite",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 299,
        "atk": 80,
        "def": 21,
        "agi": 4,
        "per": 3
      },
      "tags": [
        2,
        27
      ],
      "lootableTalentId": "tal_deadly_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动角斗巨齿鲨的精英绝技"
            ]
          }
        ]
      },
      "description": "在斗场水牢中徘徊的远古巨鲨。"
    },
    {
      "id": "prehistoric_colosseum_boss",
      "name": "角斗之王·霸王龙之王",
      "type": "boss",
      "mapId": "prehistoric_colosseum",
      "stats": {
        "hp": 839,
        "atk": 243,
        "def": 78,
        "agi": 7,
        "per": 9
      },
      "tags": [
        27,
        2
      ],
      "lootableTalentId": "tal_werewolf_bloodline",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "prehistoric_colosseum"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "角斗之王·霸王龙之王进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "角斗之王·霸王龙之王发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "未尝一败的角斗场传说，獠牙如柱。"
    },
    {
      "id": "final_trial_norm_01",
      "name": "试炼守卫",
      "type": "normal",
      "mapId": "final_trial",
      "stats": {
        "hp": 192,
        "atk": 39,
        "def": 13,
        "agi": 7,
        "per": 6
      },
      "tags": [
        9,
        25
      ],
      "lootableTalentId": "tal_hard_bone",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动试炼守卫的本能攻击"
            ]
          }
        ]
      },
      "description": "手持长矛的石像守卫，挡在试炼之路上。"
    },
    {
      "id": "final_trial_norm_02",
      "name": "终焉猎犬",
      "type": "normal",
      "mapId": "final_trial",
      "stats": {
        "hp": 192,
        "atk": 38,
        "def": 13,
        "agi": 7,
        "per": 3
      },
      "tags": [
        25,
        15
      ],
      "lootableTalentId": "tal_god_devouring_fang",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动终焉猎犬的本能攻击"
            ]
          }
        ]
      },
      "description": "三头地狱犬的分身，口喷黑火。"
    },
    {
      "id": "final_trial_norm_03",
      "name": "试炼圣徒",
      "type": "normal",
      "mapId": "final_trial",
      "stats": {
        "hp": 195,
        "atk": 41,
        "def": 12,
        "agi": 5,
        "per": 2
      },
      "tags": [
        23,
        25
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动试炼圣徒的本能攻击"
            ]
          }
        ]
      },
      "description": "受试炼祝福的神圣战士。"
    },
    {
      "id": "final_trial_norm_04",
      "name": "终焉蛇",
      "type": "normal",
      "mapId": "final_trial",
      "stats": {
        "hp": 192,
        "atk": 40,
        "def": 12,
        "agi": 6,
        "per": 4
      },
      "tags": [
        25,
        3
      ],
      "lootableTalentId": "tal_abyssal_devour",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动终焉蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "缠绕试炼之门的漆黑巨蛇。"
    },
    {
      "id": "final_trial_elite_01",
      "name": "终焉骑士",
      "type": "elite",
      "mapId": "final_trial",
      "stats": {
        "hp": 381,
        "atk": 101,
        "def": 31,
        "agi": 7,
        "per": 4
      },
      "tags": [
        25,
        9
      ],
      "lootableTalentId": "tal_fusion_infinite_devour",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动终焉骑士的精英绝技"
            ]
          }
        ]
      },
      "description": "铠甲上刻满审判铭文的骑士。"
    },
    {
      "id": "final_trial_elite_02",
      "name": "审判巨兽",
      "type": "elite",
      "mapId": "final_trial",
      "stats": {
        "hp": 392,
        "atk": 98,
        "def": 30,
        "agi": 7,
        "per": 2
      },
      "tags": [
        27,
        25
      ],
      "lootableTalentId": "tal_frost_giant_king",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动审判巨兽的精英绝技"
            ]
          }
        ]
      },
      "description": "承载审判之力的远古巨兽。"
    },
    {
      "id": "final_trial_elite_03",
      "name": "终焉审判者",
      "type": "elite",
      "mapId": "final_trial",
      "stats": {
        "hp": 393,
        "atk": 103,
        "def": 29,
        "agi": 6,
        "per": 6
      },
      "tags": [
        25,
        23
      ],
      "lootableTalentId": "tal_psi_shield",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动终焉审判者的精英绝技"
            ]
          }
        ]
      },
      "description": "宣告终焉的裁决者，目光所及万物冻结。"
    },
    {
      "id": "final_trial_boss",
      "name": "终焉之王·灭世者",
      "type": "boss",
      "mapId": "final_trial",
      "stats": {
        "hp": 1134,
        "atk": 355,
        "def": 98,
        "agi": 9,
        "per": 8
      },
      "tags": [
        26,
        27
      ],
      "lootableTalentId": "tal_storm_wing_fusion",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "final_trial"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "终焉之王·灭世者进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "终焉之王·灭世者发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "终焉试炼的最终考验，存在本身即是世界的终结。"
    },
    {
      "id": "chaos_cycle_norm_01",
      "name": "混沌孢体",
      "type": "normal",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 207,
        "atk": 42,
        "def": 13,
        "agi": 8,
        "per": 5
      },
      "tags": [
        28,
        10
      ],
      "lootableTalentId": "tal_coordinated_hunt",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动混沌孢体的本能攻击"
            ]
          }
        ]
      },
      "description": "从混沌中不断分裂的孢体。"
    },
    {
      "id": "chaos_cycle_norm_02",
      "name": "无序蠕虫",
      "type": "normal",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 206,
        "atk": 41,
        "def": 13,
        "agi": 6,
        "per": 4
      },
      "tags": [
        3,
        15
      ],
      "lootableTalentId": "tal_inject",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动无序蠕虫的本能攻击"
            ]
          }
        ]
      },
      "description": "扭曲时空的混沌蠕虫。"
    },
    {
      "id": "chaos_cycle_norm_03",
      "name": "混沌拟体",
      "type": "normal",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 206,
        "atk": 40,
        "def": 13,
        "agi": 4,
        "per": 3
      },
      "tags": [
        11,
        28
      ],
      "lootableTalentId": "tal_perfect_camouflage",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动混沌拟体的本能攻击"
            ]
          }
        ]
      },
      "description": "模仿万物形态的混沌造物。"
    },
    {
      "id": "chaos_cycle_norm_04",
      "name": "轮回之蛇",
      "type": "normal",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 200,
        "atk": 42,
        "def": 13,
        "agi": 8,
        "per": 6
      },
      "tags": [
        3,
        17
      ],
      "lootableTalentId": "tal_neurotoxin_king",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "15%_1",
        "fragments_3": "",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动轮回之蛇的本能攻击"
            ]
          }
        ]
      },
      "description": "衔尾而行的轮回巨蛇。"
    },
    {
      "id": "chaos_cycle_elite_01",
      "name": "混沌聚合体",
      "type": "elite",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 417,
        "atk": 105,
        "def": 30,
        "agi": 8,
        "per": 6
      },
      "tags": [
        28,
        23
      ],
      "lootableTalentId": "tal_causal_chain",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动混沌聚合体的精英绝技"
            ]
          }
        ]
      },
      "description": "无数混沌生物聚合的扭曲存在。"
    },
    {
      "id": "chaos_cycle_elite_02",
      "name": "轮回守卫",
      "type": "elite",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 401,
        "atk": 105,
        "def": 31,
        "agi": 5,
        "per": 3
      },
      "tags": [
        23,
        9
      ],
      "lootableTalentId": "tal_spirit_guardian",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动轮回守卫的精英绝技"
            ]
          }
        ]
      },
      "description": "守候轮回入口的混沌守卫。"
    },
    {
      "id": "chaos_cycle_elite_03",
      "name": "混沌猎手",
      "type": "elite",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 419,
        "atk": 112,
        "def": 31,
        "agi": 5,
        "per": 5
      },
      "tags": [
        17,
        15
      ],
      "lootableTalentId": "tal_mud_burrow",
      "drops": {
        "fragments_1": "1-2",
        "fragments_2": "40%_1",
        "fragments_3": "10%_1",
        "fragments_4": "",
        "bossCore": ""
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "always",
            "actions": [
              "发动混沌猎手的精英绝技"
            ]
          }
        ]
      },
      "description": "在混沌中狩猎的影之存在。"
    },
    {
      "id": "chaos_cycle_boss",
      "name": "混沌之主·轮回化身",
      "type": "boss",
      "mapId": "chaos_cycle",
      "stats": {
        "hp": 1199,
        "atk": 367,
        "def": 111,
        "agi": 5,
        "per": 9
      },
      "tags": [
        26,
        27
      ],
      "lootableTalentId": "tal_god_eater",
      "drops": {
        "fragments_1": "",
        "fragments_2": "",
        "fragments_3": "3",
        "fragments_4": "20%_1",
        "bossCore": "chaos_cycle"
      },
      "aiPattern": {
        "phases": [
          {
            "trigger": "hp_below_50",
            "actions": [
              "混沌之主·轮回化身进入狂暴状态，攻击提升"
            ]
          },
          {
            "trigger": "always",
            "actions": [
              "混沌之主·轮回化身发动毁灭性攻击"
            ]
          }
        ]
      },
      "description": "混沌轮回本身的人格化，吞噬一切又重塑一切。"
    }
  ]
},
  maps: {
  "maps": [
    {
      "id": "primordial_soup",
      "name": "原始浓汤",
      "totalLayers": 5,
      "eventsPerLayer": [
        2,
        3
      ],
      "environmentLaw": {
        "name": "丰饶原液",
        "effect": "有机物浓度极高，伤口以肉眼可见的速度愈合——这里是生命的温床，也是猎食者的天堂。治疗效果+30%，每回合回复3%最大生命。",
        "immuneTag": null,
        "healBonus": 30,
        "playerHeal": 3
      },
      "events": [
        {
          "id": "primordial_soup_event_1",
          "mapId": "primordial_soup",
          "name": "营养涡流",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一股温暖的涡流卷过，带来了高浓度的有机分子，但也引来了几个贪婪的竞争者。",
          "options": [
            {
              "text": "A. 争抢营养",
              "result": "你奋力吞食，成功吸收了大量能量，但消耗了一些体力。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            },
            {
              "text": "B. 避让涡流",
              "result": "你闪避到涡流边缘，安全地吸收了一些残余营养。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            },
            {
              "text": "C. 驱赶竞争者",
              "result": "你释放出消化酶，吓退了对手，独享了营养。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3
                }
              ]
            }
          ]
        },
        {
          "id": "ps_e5",
          "mapId": "primordial_soup",
          "name": "分子漩涡",
          "description": "汤中出现了一个奇特的分子漩涡，旋转的有机分子形成了一个微小的奇点。",
          "options": [
            {
              "text": "靠近漩涡，感受力量",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            },
            {
              "text": "远离漩涡",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "ps_e6",
          "mapId": "primordial_soup",
          "name": "远古遗迹",
          "description": "你在汤底发现了一个不属于这个时代的金属碎片，上面刻着奇怪的符号。",
          "options": [
            {
              "text": "触碰碎片",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "无视它",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "ps_e7",
          "mapId": "primordial_soup",
          "name": "共生邀请",
          "description": "一群线粒体样的微小结构围绕着你，它们似乎想与你建立共生关系。",
          "options": [
            {
              "text": "接受共生",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 3
                },
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 1
                }
              ]
            },
            {
              "text": "吞噬它们",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            }
          ]
        },
        {
          "id": "ps_e8",
          "mapId": "primordial_soup",
          "name": "温度骤变",
          "description": "汤的温度突然升高，一些脆弱的微生物开始死亡，但也释放出了丰富的营养。",
          "options": [
            {
              "text": "忍受高温，吸收营养",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "游向低温区域",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "name": "DNA双螺旋的启示",
          "description": "你看到一个奇特的分子结构，两条链相互缠绕，仿佛蕴含着生命的终极密码。",
          "options": [
            {
              "text": "尝试解读结构",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 25
                }
              ]
            },
            {
              "text": "模仿其形态",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 2
                },
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            },
            {
              "text": "吞噬这个分子",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            }
          ],
          "id": "primordial_soup_event_2"
        },
        {
          "name": "原始细胞的战争",
          "description": "两群原始细胞正在为争夺一片营养丰富的区域而激烈战斗，残骸四处飘散。",
          "options": [
            {
              "text": "加入强势一方",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 5,
                  "tag": 28
                },
                {
                  "type": "damage",
                  "value": 8
                }
              ]
            },
            {
              "text": "捡拾残骸",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 15
                },
                {
                  "type": "heal",
                  "value": 15
                }
              ]
            },
            {
              "text": "释放毒素驱散",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 1
                },
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 2,
                  "tag": 3
                }
              ]
            }
          ],
          "id": "primordial_soup_event_3"
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "primordial_ocean"
    },
    {
      "id": "primordial_pool",
      "name": "原初汤池",
      "totalLayers": 3,
      "eventsPerLayer": [
        2,
        3
      ],
      "environmentLaw": {
        "name": "聚合热泉",
        "effect": "热泉从地底喷涌而出，周围的水温忽冷忽热，生物在极端环境中不断变异。每回合开始，随机使1个单位的攻击力提升10%，持续1回合，可叠加。",
        "immuneTag": null,
        "randomEffects": [
          {
            "type": "atk",
            "value": 10,
            "target": "random",
            "desc": "热泉涌动，攻击力提升！"
          }
        ]
      },
      "events": [
        {
          "id": "primordial_pool_event_1",
          "mapId": "primordial_pool",
          "name": "竞争汤池",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一群原生细胞正在争夺一处富含磷的池角，混战不可避免。",
          "options": [
            {
              "text": "A. 参与争夺",
              "result": "你加入战局，凭借吞噬能力抢到了一些磷，获得基因碎片。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 等待时机",
              "result": "你静待它们散去，捡拾残留的营养，安全地获取能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            },
            {
              "text": "C. 吓退竞争者",
              "result": "你膨胀身体模拟威胁，成功占据资源点。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 6,
                  "tag": 28
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "primordial_ocean"
    },
    {
      "id": "coral_rubble",
      "name": "珊瑚碎石带",
      "totalLayers": 5,
      "eventsPerLayer": [
        2,
        4
      ],
      "environmentLaw": {
        "name": "珊瑚迷踪",
        "effect": "珊瑚丛错综复杂，到处都是藏身之处，但也容易迷失方向。受到伤害-15%，命中率-10%。",
        "immuneTag": null,
        "damageTakenPenalty": 15,
        "hitPenalty": 10
      },
      "events": [
        {
          "id": "coral_rubble_event_1",
          "mapId": "coral_rubble",
          "name": "伪装大师",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一只善于伪装的章鱼在你眼前变换颜色，它似乎想和你玩个游戏。",
          "options": [
            {
              "text": "A. 尝试捕捉",
              "result": "你差点抓到它，但只得到一点墨汁，不过墨汁里含有特殊基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 模仿它的变色",
              "result": "你学习它的色素细胞控制，暂时提升了隐蔽能力。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                }
              ]
            },
            {
              "text": "C. 放弃追逐",
              "result": "你转身离开，章鱼反而送你一颗发光小球，内含能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "cr_e5",
          "mapId": "coral_rubble",
          "name": "珊瑚迷宫",
          "description": "破碎的珊瑚丛形成了一个复杂的迷宫，深处似乎有什么东西在闪烁。",
          "options": [
            {
              "text": "深入迷宫",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 2
                },
                {
                  "type": "damage",
                  "value": 12
                }
              ]
            },
            {
              "text": "在边缘探索",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "cr_e6",
          "mapId": "coral_rubble",
          "name": "共生珊瑚虫",
          "description": "一群彩色的珊瑚虫向你游来，它们似乎想在你身上定居，为你提供保护。",
          "options": [
            {
              "text": "接受共生",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "gain_stat",
                  "stat": "defense",
                  "value": 3
                }
              ]
            },
            {
              "text": "驱散它们",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "cr_e7",
          "mapId": "coral_rubble",
          "name": "沉船残骸",
          "description": "一艘古老的沉船残骸半埋在珊瑚沙中，船舱似乎还保存完好。",
          "options": [
            {
              "text": "进入船舱搜索",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 4
                },
                {
                  "type": "spawn_elite",
                  "enemyId": "coral_rubble_elite_01"
                }
              ]
            },
            {
              "text": "在船外搜索",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3
                }
              ]
            }
          ]
        },
        {
          "id": "cr_e8",
          "mapId": "coral_rubble",
          "name": "珊瑚产卵",
          "description": "整片珊瑚礁同时开始产卵，无数微小的生殖细胞在水中飘散，形成粉色云雾。",
          "options": [
            {
              "text": "吞噬这些生殖细胞",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 2
                }
              ]
            },
            {
              "text": "静静观赏这一奇观",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            }
          ]
        },
        {
          "name": "珊瑚产卵的盛宴",
          "description": "整片珊瑚礁同时开始产卵，无数微小的生殖细胞在水中飘散，形成粉色云雾，营养极其丰富。",
          "options": [
            {
              "text": "大量吞噬",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 2
                }
              ]
            },
            {
              "text": "选择性吸收",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 4,
                  "tag": 18
                },
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            },
            {
              "text": "静静观赏",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 3
                },
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            }
          ],
          "id": "coral_rubble_event_2"
        },
        {
          "name": "章鱼的智慧考验",
          "description": "一只巨大的章鱼用触手摆出了复杂的图案，它似乎在测试你的智力，眼中闪烁着狡黠的光芒。",
          "options": [
            {
              "text": "尝试破解图案",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 25
                }
              ]
            },
            {
              "text": "模仿它的动作",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 2,
                  "tag": 27
                }
              ]
            },
            {
              "text": "发起攻击",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "coral_rubble_elite_01"
                }
              ]
            }
          ],
          "id": "coral_rubble_event_3"
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "tidal_flat",
      "name": "潮汐滩涂",
      "totalLayers": 5,
      "eventsPerLayer": [
        2,
        4
      ],
      "environmentLaw": {
        "name": "潮汐周期",
        "effect": "潮水有节奏地涨落，所有生物都在跟随潮汐的韵律行动。所有单位速度+15%，先手优势。",
        "immuneTag": 18,
        "speedBonus": 15
      },
      "events": [
        {
          "id": "tidal_flat_event_1",
          "mapId": "tidal_flat",
          "name": "沙蟹的宝藏",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一只小沙蟹正在拖拽一颗富含矿物质的泥球，看起来很有营养。",
          "options": [
            {
              "text": "A. 抢夺泥球",
              "result": "你成功抢到泥球，吸收了其中的矿物质。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3
                }
              ]
            },
            {
              "text": "B. 与沙蟹合作",
              "result": "你帮助沙蟹搬运，它分享了一部分泥球给你。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 寻找其他泥球",
              "result": "你绕开沙蟹，找到了另一处矿泥，恢复了少许生命。",
              "effects": [
                {
                  "type": "heal",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "tf_e5",
          "mapId": "tidal_flat",
          "name": "潮汐宝藏",
          "description": "退潮后，岩石缝隙中露出了一个被海水打磨光滑的贝壳，里面似乎藏着什么。",
          "options": [
            {
              "text": "打开贝壳",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 18
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            },
            {
              "text": "放下贝壳",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "tf_e6",
          "mapId": "tidal_flat",
          "name": "寄居蟹的挑战",
          "description": "一只巨大的寄居蟹挡住了你的去路，它挥舞着钳子，似乎在向你发起挑战。",
          "options": [
            {
              "text": "接受挑战",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "tidal_flat_elite_01"
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "tf_e7",
          "mapId": "tidal_flat",
          "name": "海藻森林",
          "description": "一片茂密的海藻森林出现在眼前，海藻上挂满了晶莹的气泡。",
          "options": [
            {
              "text": "刺破气泡，呼吸空气",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "heal",
                  "value": 15
                }
              ]
            },
            {
              "text": "采集海藻",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 5
                }
              ]
            }
          ]
        },
        {
          "id": "tf_e8",
          "mapId": "tidal_flat",
          "name": "月潮之力",
          "description": "你感到一股神秘的力量在体内涌动，这是月亮引力带来的潮汐之力。",
          "options": [
            {
              "text": "吸收月潮之力",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 2
                },
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                }
              ]
            },
            {
              "text": "释放月潮之力",
              "effects": [
                {
                  "type": "heal",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "name": "潮间带的生存竞赛",
          "description": "退潮后，无数小生物在水洼中挣扎求生，适者生存的法则在这里体现得淋漓尽致。",
          "options": [
            {
              "text": "捕食最强壮的",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "拯救弱小的",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "heal",
                  "value": 25
                }
              ]
            },
            {
              "text": "观察学习",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 2
                },
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 4,
                  "tag": 18
                }
              ]
            }
          ],
          "id": "tidal_flat_event_2"
        },
        {
          "name": "贝壳中的珍珠",
          "description": "一个巨大的贝壳半埋在沙中，微微张开，里面似乎有什么东西在发光。",
          "options": [
            {
              "text": "伸手取出",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 1,
                  "tag": 9
                },
                {
                  "type": "damage",
                  "value": 12
                }
              ]
            },
            {
              "text": "等待贝壳完全张开",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 2,
                  "tag": 9
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            },
            {
              "text": "敲碎贝壳",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 6,
                  "tag": 9
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            }
          ],
          "id": "tidal_flat_event_3"
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "temperate_forest_floor",
      "name": "温带林地面",
      "totalLayers": 5,
      "eventsPerLayer": [
        3,
        4
      ],
      "environmentLaw": {
        "name": "落叶庇护",
        "effect": "厚厚的落叶层覆盖着地面，为弱者提供了庇护，也为伏击者提供了掩护。防御+20%，血量低于50%时每回合回复5%。",
        "immuneTag": null,
        "defenseBonus": 20,
        "lowHpHealPct": 5,
        "lowHpThreshold": 50
      },
      "events": [
        {
          "id": "temperate_forest_floor_event_1",
          "mapId": "temperate_forest_floor",
          "name": "蘑菇圈",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "你遇到一圈发着微光的蘑菇，它们围成一个完美的圆，散发着奇异的气息。",
          "options": [
            {
              "text": "A. 吃下蘑菇",
              "result": "你吞食了一朵，获得了短暂的感官强化，基因略微变化。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 在圈中休息",
              "result": "你呆在圈内，感到体力迅速恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            },
            {
              "text": "C. 收集孢子",
              "result": "你收集了一些孢子，它们可以作为能量储备。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "tf2_e5",
          "mapId": "temperate_forest_floor",
          "name": "蘑菇圈",
          "description": "林间空地上出现了一个完美的蘑菇圈，传说这是精灵跳舞留下的痕迹。",
          "options": [
            {
              "text": "食用蘑菇",
              "effects": [
                {
                  "type": "heal",
                  "value": 35
                },
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                }
              ]
            },
            {
              "text": "采集蘑菇带走",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 4,
                  "tag": 23
                }
              ]
            }
          ]
        },
        {
          "id": "tf2_e6",
          "mapId": "temperate_forest_floor",
          "name": "古树树洞",
          "description": "一棵千年古树的树干上有一个巨大的树洞，里面似乎住着什么生物。",
          "options": [
            {
              "text": "探入树洞",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "temperate_forest_elite_01"
                },
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 27
                }
              ]
            },
            {
              "text": "在树洞外等待",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "tf2_e7",
          "mapId": "temperate_forest_floor",
          "name": "落叶暴雨",
          "description": "一阵狂风卷起漫天落叶，形成了一场金色的落叶暴雨。",
          "options": [
            {
              "text": "在暴雨中收集食物",
              "effects": [
                {
                  "type": "heal",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            },
            {
              "text": "躲避到树下",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "tf2_e8",
          "mapId": "temperate_forest_floor",
          "name": "鹿群经过",
          "description": "一群鹿从林间穿过，为首的雄鹿有着巨大的鹿角，似乎在警告你。",
          "options": [
            {
              "text": "发起攻击",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "temperate_forest_elite_02"
                }
              ]
            },
            {
              "text": "静静目送它们离开",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 8
                }
              ]
            }
          ]
        },
        {
          "name": "菌丝网络的秘密",
          "description": "厚厚的落叶层下，菌丝网络交错纵横，连接着整片森林的树木，仿佛一个巨大的信息网络。",
          "options": [
            {
              "text": "接入网络获取信息",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "吸收菌丝营养",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "heal",
                  "value": 25
                }
              ]
            },
            {
              "text": "在网络中留下印记",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 2
                },
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 2,
                  "tag": 27
                }
              ]
            }
          ],
          "id": "temperate_forest_floor_event_2"
        },
        {
          "name": "鹿群的迁徙指引",
          "description": "一群鹿从林间穿过，为首的雄鹿有着巨大的鹿角，它们似乎在向某个神秘的地方迁徙。",
          "options": [
            {
              "text": "悄悄跟随",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 5,
                  "tag": 28
                }
              ]
            },
            {
              "text": "正面接触",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "temperate_forest_elite_02"
                }
              ]
            },
            {
              "text": "观察它们的路线",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            }
          ],
          "id": "temperate_forest_floor_event_3"
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "rainforest_understory",
      "name": "雨林底层",
      "totalLayers": 6,
      "eventsPerLayer": [
        3,
        4
      ],
      "environmentLaw": {
        "name": "骤雨甘霖",
        "effect": "暴雨倾盆而下，空气中弥漫着水汽，所有生物都在潮湿中挣扎。每回合开始，若场上存在水属性单位，所有单位回复2%最大生命值；若无，则随机为一个单位附加潮湿状态，提升其受治疗效果15%。",
        "immuneTag": null,
        "perTurnHealPct": 2,
        "playerHeal": 2
      },
      "events": [
        {
          "id": "rainforest_understory_event_1",
          "mapId": "rainforest_understory",
          "name": "闪蝶之舞",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一群闪蝶从你面前飞过，它们翅膀上的鳞粉在阳光下闪闪发光。",
          "options": [
            {
              "text": "A. 收集鳞粉",
              "result": "你收集了一些掉落鳞粉，它们能折射光线，暂时提升闪避。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                }
              ]
            },
            {
              "text": "B. 追随闪蝶",
              "result": "你跟随它们找到了一处花蜜，获得了能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 模仿翅膀花纹",
              "result": "你调整自身色素，学会了恐吓图案，下次战斗先手值提升。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "name": "雨林的呼吸",
          "description": "整片雨林仿佛在呼吸，空气中弥漫着湿润的气息和无数植物的信息素，让人感到既舒适又压抑。",
          "options": [
            {
              "text": "深呼吸融入",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 3
                },
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            },
            {
              "text": "分析信息素",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "警惕潜在危险",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 2
                }
              ]
            }
          ],
          "id": "rainforest_understory_event_2"
        },
        {
          "name": "绞杀榕的陷阱",
          "description": "一棵巨大的绞杀榕用气根包裹住了另一棵树，树干上有一个黑暗的洞口，似乎藏着什么。",
          "options": [
            {
              "text": "进入洞口探索",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 1,
                  "tag": 17
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "吸收气根营养",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 2
                },
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            },
            {
              "text": "在树根下休息",
              "effects": [
                {
                  "type": "heal",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ],
          "id": "rainforest_understory_event_3"
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "east_african_savanna",
      "name": "东非草原",
      "totalLayers": 5,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "稀树烈日",
        "effect": "烈日炙烤着稀树草原，所有生物都在为了生存而激烈竞争。攻击+15%，治疗效果-30%。",
        "immuneTag": 8,
        "attackBonus": 15,
        "healPenalty": 30
      },
      "events": [
        {
          "id": "east_african_savanna_event_1",
          "mapId": "east_african_savanna",
          "name": "鬣狗的争夺",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一只鬣狗叼着一块带肉的骨头，另一群鬣狗虎视眈眈。",
          "options": [
            {
              "text": "A. 抢夺骨头",
              "result": "你趁乱抢走了骨头，吸收骨髓中的基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 13
                }
              ]
            },
            {
              "text": "B. 等待残渣",
              "result": "你耐心等待，它们走后你舔舐了残留的肉末，获得能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            },
            {
              "text": "C. 驱散鬣狗",
              "result": "你展示威吓，吓得鬣狗四散，你获得了完整的骨头。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 6,
                  "tag": 13
                }
              ]
            }
          ]
        },
        {
          "id": "east_african_savanna_event_2",
          "mapId": "east_african_savanna",
          "name": "白蚁丘",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一座巨大的白蚁丘拔地而起，工蚁们忙碌地进进出出。",
          "options": [
            {
              "text": "A. 吞食工蚁",
              "result": "你吞下一些工蚁，获得了纤维素消化基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 挖掘蚁穴",
              "result": "你挖掘蚁穴寻找菌圃，获得了营养丰富的真菌。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 利用蚁丘避暑",
              "result": "你钻进蚁丘通风道降温，生命有所恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 25
                }
              ]
            }
          ]
        },
        {
          "id": "sa_e5",
          "mapId": "east_african_savanna",
          "name": "白蚁丘",
          "description": "一座高达数米的白蚁丘矗立在草原上，无数白蚁进进出出。",
          "options": [
            {
              "text": "破坏蚁丘取食",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "spawn_elite",
                  "enemyId": "east_african_savanna_elite_01"
                }
              ]
            },
            {
              "text": "在蚁丘旁休息",
              "effects": [
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "sa_e6",
          "mapId": "east_african_savanna",
          "name": "狮子的领地",
          "description": "你进入了一片狮子的领地，远处的草丛中，一双金色的眼睛正在注视着你。",
          "options": [
            {
              "text": "正面挑战",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "east_african_savanna_elite_02"
                }
              ]
            },
            {
              "text": "悄悄撤退",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "sa_e7",
          "mapId": "east_african_savanna",
          "name": "草原大火",
          "description": "远处的草原燃起了大火，火势正迅速向你蔓延。",
          "options": [
            {
              "text": "迎着火势奔跑",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 25
                }
              ]
            },
            {
              "text": "寻找安全地带",
              "effects": [
                {
                  "type": "nothing"
                }
              ]
            }
          ]
        },
        {
          "id": "sa_e8",
          "mapId": "east_african_savanna",
          "name": "秃鹫的盛宴",
          "description": "一群秃鹫正在啄食一具动物的尸体，它们警惕地看着你。",
          "options": [
            {
              "text": "抢夺尸体",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                },
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 5,
                  "tag": 28
                }
              ]
            },
            {
              "text": "等待秃鹫离开",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "name": "草原大火的洗礼",
          "description": "远处的草原燃起了大火，火势正迅速蔓延，火光冲天，空气中弥漫着烧焦的气息。",
          "options": [
            {
              "text": "迎着火势奔跑",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "寻找安全地带",
              "effects": [
                {
                  "type": "heal",
                  "value": 20
                },
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            },
            {
              "text": "在火边取暖",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            }
          ],
          "id": "east_african_savanna_event_3"
        },
        {
          "name": "狮子的领地挑战",
          "description": "你进入了一片狮子的领地，远处的草丛中，一双金色的眼睛正在注视着你，雄狮的低吼回荡在草原上。",
          "options": [
            {
              "text": "正面挑战",
              "effects": [
                {
                  "type": "spawn_elite",
                  "enemyId": "east_african_savanna_elite_02"
                }
              ]
            },
            {
              "text": "展示力量后撤退",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "悄悄撤退",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "heal",
                  "value": 15
                }
              ]
            }
          ],
          "id": "east_african_savanna_event_4"
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "north_american_plains",
      "name": "北美大平原",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "风暴前夕",
        "effect": "狂风在平原上呼啸，预示着一场风暴即将来临。所有单位速度提升20%，但远程攻击命中率下降10%。",
        "immuneTag": null,
        "speedBonus": 20,
        "hitPenalty": 10
      },
      "events": [
        {
          "id": "north_american_plains_event_1",
          "mapId": "north_american_plains",
          "name": "龙卷风过境",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "远方一道细长的龙卷风正在移动，卷起了大量尘土和植物碎屑。",
          "options": [
            {
              "text": "A. 冲入风柱边缘",
              "result": "你冒险进入边缘，收集到被卷起的稀有种子基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 远离并观察",
              "result": "你安全地等待龙卷风过去，捡拾散落一地的果实。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 利用风力加速",
              "result": "你顺着风向前进，节省了大量体力。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "cliff_face",
      "name": "悬崖峭壁",
      "totalLayers": 6,
      "eventsPerLayer": [
        3,
        4
      ],
      "environmentLaw": {
        "name": "上升气流",
        "effect": "悬崖边的上升气流托举着飞行生物，让它们能够轻松翱翔。每回合开始，随机1个单位获得浮空状态，闪避率提高20%，但受到远程伤害增加10%。",
        "immuneTag": null,
        "randomEffects": [
          {
            "type": "dodge",
            "value": 20,
            "target": "random",
            "desc": "上升气流托举，闪避提升！"
          }
        ]
      },
      "events": [
        {
          "id": "cliff_face_event_1",
          "mapId": "cliff_face",
          "name": "岩羊的跳跃",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一只岩羊轻巧地在绝壁上跳跃，啃食着岩缝中的地衣。",
          "options": [
            {
              "text": "A. 尝试追赶",
              "result": "你虽未追上，但锻炼了攀爬能力，获得了移动相关的基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 观察路线",
              "result": "你学习岩羊的路径，找到了一处安全的休息点，生命恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            },
            {
              "text": "C. 吃它剩下的地衣",
              "result": "你享用岩羊啃剩的地衣，味道不错，补充了能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "mountain_peak",
      "name": "高山之巅",
      "totalLayers": 6,
      "eventsPerLayer": [
        3,
        4
      ],
      "environmentLaw": {
        "name": "稀薄空气",
        "effect": "高山之巅空气稀薄，每一次呼吸都在消耗生命，但也激发了生物的斗志。每回合开始，所有单位损失1%最大生命值，但攻击力提升5%。免疫标签9可免疫生命损失。",
        "immuneTag": 9,
        "hpDrain": 1,
        "attackBonus": 5
      },
      "events": [
        {
          "id": "mountain_peak_event_1",
          "mapId": "mountain_peak",
          "name": "雷暴云团",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一团带电的云层笼罩了山顶，空气中充满了静电，噼啪作响。",
          "options": [
            {
              "text": "A. 吸收闪电能量",
              "result": "你冒险引下一道微小闪电，获得了电能基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 4
                }
              ]
            },
            {
              "text": "B. 寻找避雷处",
              "result": "你躲进岩缝，安全度过雷暴，还捡到了被雷击落的矿物。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 利用静电",
              "result": "你让静电附着体表，暂时提升了麻痹抗性。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "continental_shelf",
      "name": "近海大陆架",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "光合作用带",
        "effect": "阳光穿透浅海，光合作用让这里充满了生机。每回合开始，所有单位回复1%最大生命值。光系单位额外回复2%。",
        "immuneTag": null,
        "playerHeal": 1
      },
      "events": [
        {
          "id": "continental_shelf_event_1",
          "mapId": "continental_shelf",
          "name": "魔鬼鱼群",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一群魔鬼鱼优雅地滑翔而过，它们的腹面吸附着许多小鱼。",
          "options": [
            {
              "text": "A. 乘上魔鬼鱼",
              "result": "你搭了一程顺风车，节约了大量体力，还吃到了它甩下的食物碎屑。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "B. 捕捉掉落的小鱼",
              "result": "你捕食了几条从鱼群中掉落的小鱼，获得基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "C. 学习滑翔",
              "result": "你模仿魔鬼鱼的泳姿，暂时提升了游泳速度。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 2
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "abyssal_deep",
      "name": "远洋深渊",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "深渊高压",
        "effect": "深渊的压力从四面八方涌来，没有甲壳的生物难以承受。每回合开始，没有甲壳的单位损失2%最大生命值。免疫标签9免疫此效果。",
        "immuneTag": 9,
        "hpDrain": 2
      },
      "events": [
        {
          "id": "abyssal_deep_event_1",
          "mapId": "abyssal_deep",
          "name": "巨鲸遗骸",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一副巨大的鲸鱼骨架躺在海床，许多食骨蠕虫正忙碌地分解它。",
          "options": [
            {
              "text": "A. 加入分解",
              "result": "你啃食骨架上的残余组织，获得了大量能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "B. 吸收骨髓",
              "result": "你钻进骨头吸取骨髓，获得了哺乳动物基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 13
                }
              ]
            },
            {
              "text": "C. 在骨架中休息",
              "result": "你躲在骨架的庇护下，安全地恢复生命。",
              "effects": [
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "jungle_monitor",
      "name": "丛林巨蜥",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "湿热丛林",
        "effect": "湿热的丛林中，水汽凝结成雾，所有生物的行动都变得迟缓。每回合开始，所有单位叠加1层湿热，每层降低1%速度，最多5层。免疫标签8可免疫。",
        "immuneTag": 8,
        "speedPenalty": 5
      },
      "events": [
        {
          "id": "jungle_monitor_event_1",
          "mapId": "jungle_monitor",
          "name": "蕨类丛林",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "你进入一片高大的蕨类植物林，叶片遮蔽了大部分视线，但孢子囊十分饱满。",
          "options": [
            {
              "text": "A. 吞食孢子",
              "result": "你吃下孢子，获得了蕨类植物繁殖相关的基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 10
                }
              ]
            },
            {
              "text": "B. 收集孢子弹",
              "result": "你收集了富含能量的孢子弹作为储备。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 在蕨叶下躲藏",
              "result": "你藏在叶片下，成功躲避了一次天敌的搜索。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "modern"
    },
    {
      "id": "intertidal_rocks",
      "name": "潮间带岩礁",
      "totalLayers": 5,
      "eventsPerLayer": 1,
      "environmentLaw": {
        "name": "潮汐节律",
        "effect": "潮汐的节律在岩礁间回荡，奇数回合适合进攻，偶数回合适合防守。奇数回合攻击力+15%，偶数回合防御力+15%。",
        "immuneTag": null,
        "attackBonus": 15,
        "defenseBonus": 15
      },
      "events": [
        {
          "id": "intertidal_rocks_event_1",
          "mapId": "intertidal_rocks",
          "name": "退潮后的水洼",
          "description": "潮水退去，岩礁上留下一个个小水洼，里面困着各种海洋生物。",
          "options": [
            {
              "text": "捕食水洼中的生物",
              "effects": [
                {
                  "type": "exp",
                  "value": 15
                },
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 2
                }
              ]
            },
            {
              "text": "释放它们，积累善缘",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                },
                {
                  "type": "stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_2",
          "mapId": "intertidal_rocks",
          "name": "藤壶群落",
          "description": "密密麻麻的藤壶附着在岩石上，坚硬的外壳保护着它们。",
          "options": [
            {
              "text": "强行撬开藤壶",
              "effects": [
                {
                  "type": "damage",
                  "value": 8
                },
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 3
                }
              ]
            },
            {
              "text": "观察它们的结构",
              "effects": [
                {
                  "type": "stat",
                  "stat": "defense",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_3",
          "mapId": "intertidal_rocks",
          "name": "招潮蟹的领地",
          "description": "一只巨大的招潮蟹挥舞着大螯，警告你不要靠近它的洞穴。",
          "options": [
            {
              "text": "挑战它",
              "effects": [
                {
                  "type": "damage",
                  "value": 12
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 1
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": [
                {
                  "type": "none"
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_4",
          "mapId": "intertidal_rocks",
          "name": "海葵的触手",
          "description": "色彩斑斓的海葵在岩礁上舒展着有毒的触手，等待猎物。",
          "options": [
            {
              "text": "研究它的毒素",
              "effects": [
                {
                  "type": "damage",
                  "value": 5
                },
                {
                  "type": "talent_points",
                  "value": 1
                }
              ]
            },
            {
              "text": "小心避开",
              "effects": [
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_5",
          "mapId": "intertidal_rocks",
          "name": "岩藻的馈赠",
          "description": "岩礁上生长着厚厚的岩藻，富含营养物质。",
          "options": [
            {
              "text": "大量食用",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 20
                },
                {
                  "type": "stat",
                  "stat": "vitality",
                  "value": 1
                }
              ]
            },
            {
              "text": "收集带走",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 8
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_6",
          "mapId": "intertidal_rocks",
          "name": "潮汐洞穴",
          "description": "岩礁间有一个被潮汐冲刷形成的洞穴，里面漆黑一片。",
          "options": [
            {
              "text": "进入探索",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "在洞口等待",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 15
                },
                {
                  "type": "exp",
                  "value": 5
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_7",
          "mapId": "intertidal_rocks",
          "name": "海螺的旋律",
          "description": "一只巨大的海螺发出低沉的声音，仿佛在诉说着远古的故事。",
          "options": [
            {
              "text": "倾听它的故事",
              "effects": [
                {
                  "type": "exp",
                  "value": 20
                },
                {
                  "type": "stat",
                  "stat": "evolution",
                  "value": 1
                }
              ]
            },
            {
              "text": "捕食它",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 4
                },
                {
                  "type": "damage",
                  "value": 3
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_8",
          "mapId": "intertidal_rocks",
          "name": "滩涂鱼的跳跃",
          "description": "一群滩涂鱼在岩礁上跳跃，它们已经能在陆地上短暂生存。",
          "options": [
            {
              "text": "学习它们的运动方式",
              "effects": [
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 12
                }
              ]
            },
            {
              "text": "捕食它们",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 3
                },
                {
                  "type": "heal_percent",
                  "value": 5
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_9",
          "mapId": "intertidal_rocks",
          "name": "暴风雨来临",
          "description": "天空乌云密布，暴风雨即将来临，海浪开始变得汹涌。",
          "options": [
            {
              "text": "寻找庇护所",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                },
                {
                  "type": "none"
                }
              ]
            },
            {
              "text": "在暴风雨中历练",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "stat",
                  "stat": "strength",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "intertidal_rocks_event_10",
          "mapId": "intertidal_rocks",
          "name": "远古的足迹",
          "description": "岩礁上发现了一些奇怪的足迹，似乎是某种远古生物留下的。",
          "options": [
            {
              "text": "追踪足迹",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "exp",
                  "value": 25
                }
              ]
            },
            {
              "text": "研究足迹",
              "effects": [
                {
                  "type": "stat",
                  "stat": "perception",
                  "value": 2
                },
                {
                  "type": "talent_points",
                  "value": 1
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "id": "heal",
          "name": "在岩礁后休整",
          "description": "恢复50%最大生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "reselect",
          "name": "调整技能搭配",
          "description": "重新选择主动技能",
          "effect": {
            "type": "reselect_skills"
          }
        },
        {
          "id": "fight",
          "name": "直接迎战",
          "description": "不做任何准备，直接挑战首领",
          "effect": {
            "type": "none"
          }
        }
      ],
      "eraEn": "life_landing"
    },
    {
      "id": "fern_swamp",
      "name": "蕨类沼泽",
      "totalLayers": 5,
      "eventsPerLayer": 1,
      "environmentLaw": {
        "name": "孢子迷雾",
        "effect": "孢子的迷雾在沼泽中弥漫，所有生物的视线都受到影响，但也可能获得意外的增益。命中率-10%，每回合开始有15%概率获得随机增益（攻击+10%/防御+10%/回复5%生命）。",
        "immuneTag": null,
        "hitPenalty": 10
      },
      "events": [
        {
          "id": "fern_swamp_event_1",
          "mapId": "fern_swamp",
          "name": "巨型孢子",
          "description": "空气中漂浮着巨大的孢子，吸入后可能产生各种效果。",
          "options": [
            {
              "text": "大量吸入",
              "effects": [
                {
                  "type": "random_buff",
                  "value": 1
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            },
            {
              "text": "屏住呼吸通过",
              "effects": [
                {
                  "type": "stat",
                  "stat": "vitality",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_2",
          "mapId": "fern_swamp",
          "name": "鳞木森林",
          "description": "高耸入云的鳞木构成了一片茂密的森林，树干上覆盖着厚厚的苔藓。",
          "options": [
            {
              "text": "攀爬鳞木",
              "effects": [
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 15
                }
              ]
            },
            {
              "text": "在树下休息",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 25
                },
                {
                  "type": "none"
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_3",
          "mapId": "fern_swamp",
          "name": "巨型马陆",
          "description": "一条长达两米的巨型马陆在腐烂的植物上爬行，它的身体分节，有无数对脚。",
          "options": [
            {
              "text": "攻击它",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "观察它的结构",
              "effects": [
                {
                  "type": "stat",
                  "stat": "defense",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_4",
          "mapId": "fern_swamp",
          "name": "古蜻蜓的翅膀",
          "description": "一只翼展达70厘米的古蜻蜓从头顶飞过，它的翅膀在阳光下闪烁着彩虹般的光芒。",
          "options": [
            {
              "text": "尝试捕捉它",
              "effects": [
                {
                  "type": "damage",
                  "value": 8
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 1
                },
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 1
                }
              ]
            },
            {
              "text": "欣赏它的飞行",
              "effects": [
                {
                  "type": "exp",
                  "value": 12
                },
                {
                  "type": "stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_5",
          "mapId": "fern_swamp",
          "name": "沼泽泥潭",
          "description": "前方是一片深不见底的泥潭，里面似乎有什么东西在蠕动。",
          "options": [
            {
              "text": "小心绕过",
              "effects": [
                {
                  "type": "none"
                }
              ]
            },
            {
              "text": "探索泥潭",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_6",
          "mapId": "fern_swamp",
          "name": "肺鱼的洞穴",
          "description": "泥岸边有一个洞穴，里面住着一条肺鱼，它能在旱季用肺呼吸。",
          "options": [
            {
              "text": "学习它的呼吸方式",
              "effects": [
                {
                  "type": "stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 18
                }
              ]
            },
            {
              "text": "捕食它",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 2
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_7",
          "mapId": "fern_swamp",
          "name": "始祖鸟的巢穴",
          "description": "树上有一个巢穴，里面有几只始祖鸟的幼鸟，它们的父母正在附近觅食。",
          "options": [
            {
              "text": "偷取幼鸟",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "观察它们",
              "effects": [
                {
                  "type": "exp",
                  "value": 20
                },
                {
                  "type": "stat",
                  "stat": "evolution",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_8",
          "mapId": "fern_swamp",
          "name": "木贼的尖刺",
          "description": "一片茂密的木贼挡住了去路，它们的茎上布满了锋利的尖刺。",
          "options": [
            {
              "text": "强行穿过",
              "effects": [
                {
                  "type": "damage",
                  "value": 12
                },
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 3
                }
              ]
            },
            {
              "text": "寻找其他路径",
              "effects": [
                {
                  "type": "exp",
                  "value": 8
                },
                {
                  "type": "none"
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_9",
          "mapId": "fern_swamp",
          "name": "沼泽毒气",
          "description": "沼泽中冒出一股股有毒的气体，空气中弥漫着刺鼻的气味。",
          "options": [
            {
              "text": "憋气快速通过",
              "effects": [
                {
                  "type": "damage",
                  "value": 5
                },
                {
                  "type": "stat",
                  "stat": "vitality",
                  "value": 1
                }
              ]
            },
            {
              "text": "适应毒气",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "stat",
                  "stat": "defense",
                  "value": 3
                }
              ]
            }
          ]
        },
        {
          "id": "fern_swamp_event_10",
          "mapId": "fern_swamp",
          "name": "远古的种子",
          "description": "在沼泽深处发现了一颗巨大的种子，它已经沉睡了数亿年。",
          "options": [
            {
              "text": "唤醒它",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "带走它",
              "effects": [
                {
                  "type": "talent_points",
                  "value": 2
                },
                {
                  "type": "stat",
                  "stat": "evolution",
                  "value": 1
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "id": "heal",
          "name": "在鳞木下休整",
          "description": "恢复50%最大生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "reselect",
          "name": "调整技能搭配",
          "description": "重新选择主动技能",
          "effect": {
            "type": "reselect_skills"
          }
        },
        {
          "id": "fight",
          "name": "直接迎战",
          "description": "不做任何准备，直接挑战首领",
          "effect": {
            "type": "none"
          }
        }
      ],
      "eraEn": "life_landing"
    },
    {
      "id": "giant_insect_forest",
      "name": "巨型昆虫森林",
      "totalLayers": 5,
      "eventsPerLayer": 1,
      "environmentLaw": {
        "name": "富氧大气",
        "effect": "富氧的大气让所有生物都变得更加强壮，但也更加脆弱。攻击力+20%，最大生命+10%，但受到的伤害+10%。",
        "immuneTag": null,
        "attackBonus": 20,
        "hpBonus": 10,
        "damageTakenBonus": 10
      },
      "events": [
        {
          "id": "giant_insect_forest_event_1",
          "mapId": "giant_insect_forest",
          "name": "巨脉蜻蜓的俯冲",
          "description": "一只翼展达75厘米的巨脉蜻蜓从高空俯冲而下，它的复眼紧盯着你。",
          "options": [
            {
              "text": "反击",
              "effects": [
                {
                  "type": "damage",
                  "value": 12
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "躲避",
              "effects": [
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_2",
          "mapId": "giant_insect_forest",
          "name": "巨型蜈蚣的洞穴",
          "description": "一个巨大的洞穴入口，里面传来沙沙的声音，一条三米长的巨型蜈蚣正在窥视你。",
          "options": [
            {
              "text": "闯入洞穴",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "在洞口设伏",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 1
                },
                {
                  "type": "exp",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_3",
          "mapId": "giant_insect_forest",
          "name": "远古蜘蛛的网",
          "description": "一张巨大的蜘蛛网横跨在两棵树之间，网的主人是一只体型如狗的远古蜘蛛。",
          "options": [
            {
              "text": "破坏蛛网",
              "effects": [
                {
                  "type": "damage",
                  "value": 8
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 1
                }
              ]
            },
            {
              "text": "研究蛛丝",
              "effects": [
                {
                  "type": "stat",
                  "stat": "defense",
                  "value": 2
                },
                {
                  "type": "talent_points",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_4",
          "mapId": "giant_insect_forest",
          "name": "巨型蟑螂群",
          "description": "一群巨型蟑螂从腐烂的原木中涌出，它们的数量惊人，所过之处寸草不生。",
          "options": [
            {
              "text": "喷洒毒液",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 1,
                  "value": 5
                },
                {
                  "type": "exp",
                  "value": 12
                }
              ]
            },
            {
              "text": "快速逃离",
              "effects": [
                {
                  "type": "damage",
                  "value": 5
                },
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_5",
          "mapId": "giant_insect_forest",
          "name": "蝎子的尾针",
          "description": "一只巨型蝎子举起它的尾针，毒液在尖端闪烁着寒光。",
          "options": [
            {
              "text": "夺取毒液",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "研究它的攻击方式",
              "effects": [
                {
                  "type": "stat",
                  "stat": "strength",
                  "value": 2
                },
                {
                  "type": "exp",
                  "value": 18
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_6",
          "mapId": "giant_insect_forest",
          "name": "独角仙的角",
          "description": "一只巨大的独角仙用它的长角挑衅你，它的外壳坚硬如铁。",
          "options": [
            {
              "text": "掰断它的角",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 2
                },
                {
                  "type": "stat",
                  "stat": "strength",
                  "value": 1
                }
              ]
            },
            {
              "text": "观察它的外壳",
              "effects": [
                {
                  "type": "stat",
                  "stat": "defense",
                  "value": 3
                },
                {
                  "type": "exp",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_7",
          "mapId": "giant_insect_forest",
          "name": "螳螂的伏击",
          "description": "一只巨型螳螂从树叶后跳出，它的镰刀状前肢闪着寒光。",
          "options": [
            {
              "text": "以快制快",
              "effects": [
                {
                  "type": "damage",
                  "value": 12
                },
                {
                  "type": "fragments",
                  "quality": 2,
                  "value": 1
                },
                {
                  "type": "stat",
                  "stat": "agility",
                  "value": 1
                }
              ]
            },
            {
              "text": "以静制动",
              "effects": [
                {
                  "type": "damage",
                  "value": 8
                },
                {
                  "type": "stat",
                  "stat": "perception",
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_8",
          "mapId": "giant_insect_forest",
          "name": "富氧的陶醉",
          "description": "空气中氧气含量极高，深吸一口后感到力量倍增，但也有些头晕目眩。",
          "options": [
            {
              "text": "尽情呼吸",
              "effects": [
                {
                  "type": "stat",
                  "stat": "strength",
                  "value": 3
                },
                {
                  "type": "damage",
                  "value": 8
                }
              ]
            },
            {
              "text": "控制呼吸",
              "effects": [
                {
                  "type": "stat",
                  "stat": "vitality",
                  "value": 2
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_9",
          "mapId": "giant_insect_forest",
          "name": "虫蜕的宝藏",
          "description": "一只巨型昆虫刚刚蜕皮，留下了完整的外骨骼，它比钢铁还要坚硬。",
          "options": [
            {
              "text": "收集外骨骼",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "stat",
                  "stat": "defense",
                  "value": 2
                }
              ]
            },
            {
              "text": "研究蜕皮过程",
              "effects": [
                {
                  "type": "exp",
                  "value": 25
                },
                {
                  "type": "talent_points",
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "giant_insect_forest_event_10",
          "mapId": "giant_insect_forest",
          "name": "虫群的意志",
          "description": "你感到一股强大的集体意识在森林中回荡，无数昆虫的意志汇聚在一起。",
          "options": [
            {
              "text": "融入虫群",
              "effects": [
                {
                  "type": "fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "stat",
                  "stat": "evolution",
                  "value": 2
                }
              ]
            },
            {
              "text": "抵抗意志",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "stat",
                  "stat": "strength",
                  "value": 3
                },
                {
                  "type": "exp",
                  "value": 30
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "id": "heal",
          "name": "在树洞中休整",
          "description": "恢复50%最大生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "reselect",
          "name": "调整技能搭配",
          "description": "重新选择主动技能",
          "effect": {
            "type": "reselect_skills"
          }
        },
        {
          "id": "fight",
          "name": "直接迎战",
          "description": "不做任何准备，直接挑战首领",
          "effect": {
            "type": "none"
          }
        }
      ],
      "eraEn": "insect_age"
    },
    {
      "id": "spider_web_maze",
      "name": "蛛网迷宫",
      "description": "由无数巨型蛛网构成的迷宫，每一步都可能触发隐藏的陷阱。空气中弥漫着粘液的气味，墙壁上挂满了被吸干的猎物残骸。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "粘稠蛛丝",
        "effect": "粘稠的蛛丝遍布迷宫，所有生物都被粘住，无法逃跑。所有单位先手值-30%，无法逃跑，体格强壮者挣脱蛛丝束缚。",
        "immuneTagNum": 8,
        "mechanic": "speed_penalty_no_flee",
        "speedPenalty": 30
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "茧中休息",
          "description": "在安全的茧中恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "分泌溶解液",
          "description": "临时免疫蛛丝减速效果",
          "effect": {
            "type": "immune_env"
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "spider_maze_1",
          "mapId": "spider_web_maze",
          "name": "蛛丝陷阱",
          "description": "你一脚踩空，陷入了一张隐藏的蛛网，粘稠的丝紧紧缠住了你！",
          "options": [
            {
              "text": "用力挣脱",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            },
            {
              "text": "用锋利的爪子割开",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 10,
                  "duration": 5
                },
                {
                  "type": "damage",
                  "value": 8
                }
              ]
            },
            {
              "text": "等待蛛丝失去粘性",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_2",
          "mapId": "spider_web_maze",
          "name": "蛛卵",
          "description": "你发现了一团巨大的蛛卵，每个卵都有拳头大小，里面似乎有东西在动。",
          "options": [
            {
              "text": "打破蛛卵",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "收集蛛丝",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "远离蛛卵",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_3",
          "mapId": "spider_web_maze",
          "name": "被吸干的猎物",
          "description": "墙上挂着一具被吸干的巨型昆虫残骸，它的外壳还保持着完整的形状。",
          "options": [
            {
              "text": "研究残骸",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 8
                }
              ]
            },
            {
              "text": "收集残骸中的残余能量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 30
                },
                {
                  "type": "buff_attack",
                  "value": 10,
                  "duration": 5
                }
              ]
            },
            {
              "text": "离开",
              "effects": []
            }
          ]
        },
        {
          "id": "spider_maze_4",
          "mapId": "spider_web_maze",
          "name": "毒蜘蛛",
          "description": "一只色彩斑斓的毒蜘蛛从天花板垂下，它的毒牙闪着寒光。",
          "options": [
            {
              "text": "击杀毒蜘蛛",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "收集毒液",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "小心绕过",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_5",
          "mapId": "spider_web_maze",
          "name": "分岔路口",
          "description": "迷宫出现了三个分岔口，每个路口都传来不同的声音。",
          "options": [
            {
              "text": "走左边（传来嗡嗡声）",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "走中间（传来沙沙声）",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "走右边（传来水滴声）",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 25
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_6",
          "mapId": "spider_web_maze",
          "name": "蜘蛛的礼物",
          "description": "你发现了一个用蛛丝包裹的包裹，里面似乎有什么东西在发光。",
          "options": [
            {
              "text": "打开包裹",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "小心检查后打开",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            },
            {
              "text": "不碰它",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_7",
          "mapId": "spider_web_maze",
          "name": "蜕皮的蜘蛛",
          "description": "一只正在蜕皮的巨型蜘蛛，它的新壳还很柔软，是最佳的攻击时机。",
          "options": [
            {
              "text": "趁机攻击",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "收集旧皮",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "等它蜕皮完成",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_8",
          "mapId": "spider_web_maze",
          "name": "蛛丝桥",
          "description": "一道深渊横亘在面前，只有一根细细的蛛丝连接两岸。",
          "options": [
            {
              "text": "走蛛丝桥",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "用蛛丝做绳索",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_9",
          "mapId": "spider_web_maze",
          "name": "蜘蛛女王的寝宫",
          "description": "迷宫的中心，一个巨大的房间，墙上挂满了蛛丝和猎物。这里是蜘蛛女王的寝宫。",
          "options": [
            {
              "text": "潜入寝宫",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 50
                }
              ]
            },
            {
              "text": "在门口修炼",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 8
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "spider_maze_10",
          "mapId": "spider_web_maze",
          "name": "迷宫出口",
          "description": "你终于找到了迷宫的出口，阳光从出口照进来，你感到一阵轻松。",
          "options": [
            {
              "text": "冲出迷宫",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "在出口处搜刮",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "回头继续探索",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 10
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "insect_age"
    },
    {
      "id": "insect_nest_abyss",
      "name": "虫巢深渊",
      "description": "一个深不见底的巨大洞穴，是无数巨型昆虫的巢穴。空气中弥漫着信息素的气味，每一步都可能惊动整个虫群。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "信息素干扰",
        "effect": "信息素在虫巢中干扰着所有生物的感知，敌人变得更加凶猛，而玩家的感知则被削弱。敌人攻击力+15%，玩家感知-10%，感知敏锐者免疫信息素干扰。",
        "immuneTagNum": 21,
        "mechanic": "enemy_attack_buff_player_perception_penalty",
        "enemyAttackBonus": 15,
        "playerPerceptionPenalty": 10
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "虫茧中休息",
          "description": "在废弃的虫茧中恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "伪装信息素",
          "description": "临时伪装成虫群成员，免疫信息素干扰",
          "effect": {
            "type": "immune_env"
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "insect_nest_1",
          "mapId": "insect_nest_abyss",
          "name": "虫道",
          "description": "你进入了一条由无数昆虫开凿的通道，墙壁上布满了爬行的痕迹。",
          "options": [
            {
              "text": "沿着虫道深入",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "在虫道中隐藏",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 8
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            },
            {
              "text": "退出虫道",
              "effects": []
            }
          ]
        },
        {
          "id": "insect_nest_2",
          "mapId": "insect_nest_abyss",
          "name": "幼虫室",
          "description": "一个巨大的房间，里面满是蠕动的白色幼虫，它们正在贪婪地进食。",
          "options": [
            {
              "text": "猎杀幼虫",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "收集幼虫的分泌物",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            },
            {
              "text": "悄悄离开",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_3",
          "mapId": "insect_nest_abyss",
          "name": "食物储藏室",
          "description": "一个堆满了被麻醉的猎物的房间，它们还活着，但已经无法动弹。",
          "options": [
            {
              "text": "解救猎物",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "heal_percent",
                  "value": 20
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            },
            {
              "text": "收集储藏的食物",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            },
            {
              "text": "离开",
              "effects": []
            }
          ]
        },
        {
          "id": "insect_nest_4",
          "mapId": "insect_nest_abyss",
          "name": "兵蚁巡逻队",
          "description": "一队全副武装的兵蚁正在巡逻，它们的大颚能轻松咬碎骨头。",
          "options": [
            {
              "text": "伏击巡逻队",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "躲避巡逻队",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            },
            {
              "text": "伪装成兵蚁",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 8
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_5",
          "mapId": "insect_nest_abyss",
          "name": "蜂王浆",
          "description": "你发现了一小池珍贵的蜂王浆，它散发着诱人的香气，据说能大幅提升体质。",
          "options": [
            {
              "text": "饮用蜂王浆",
              "effects": [
                {
                  "type": "buff_vitality",
                  "value": 8,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "收集蜂王浆",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "只尝一小口",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 20
                },
                {
                  "type": "buff_all",
                  "value": 3,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_6",
          "mapId": "insect_nest_abyss",
          "name": "甲虫角斗场",
          "description": "一个天然形成的角斗场，两只巨型甲虫正在进行激烈的战斗。",
          "options": [
            {
              "text": "坐收渔利",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "帮助其中一方",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 5
                },
                {
                  "type": "gain_gold",
                  "value": 30
                }
              ]
            },
            {
              "text": "悄悄离开",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_7",
          "mapId": "insect_nest_abyss",
          "name": "虫巢深处",
          "description": "你来到了虫巢的最深处，这里的信息素浓度高得几乎化为实质，无数昆虫在你周围爬行。",
          "options": [
            {
              "text": "吸收信息素",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 5
                },
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "在虫群中修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 8
                }
              ]
            },
            {
              "text": "快速通过",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_8",
          "mapId": "insect_nest_abyss",
          "name": "蜕皮场",
          "description": "一个巨大的房间，无数昆虫正在这里蜕皮，地上堆满了旧壳。",
          "options": [
            {
              "text": "收集旧壳",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "吸收蜕皮时的能量",
              "effects": [
                {
                  "type": "buff_evolution",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 35
                }
              ]
            },
            {
              "text": "在蜕皮场修炼",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 8
                },
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_9",
          "mapId": "insect_nest_abyss",
          "name": "虫后的寝宫",
          "description": "虫巢的中心，一个巨大的房间，一只比房子还大的虫后正在产卵。她就是整个虫巢的母亲。",
          "options": [
            {
              "text": "挑战虫后",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "暗中观察学习",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "buff_evolution",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "insect_nest_10",
          "mapId": "insect_nest_abyss",
          "name": "虫巢出口",
          "description": "你终于找到了虫巢的出口，阳光从出口照进来，你终于可以离开这个可怕的地方了。",
          "options": [
            {
              "text": "冲出虫巢",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            },
            {
              "text": "在出口处搜刮",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "回头继续探索",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "insect_age"
    },
    {
      "id": "permafrost_plain",
      "name": "永冻冰原",
      "description": "这片冰原已经冻结了数百万年，冰层下埋藏着无数远古生物的遗骸，以及未知的恐怖。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "永久冻土",
        "effect": "永久冻土让生命的恢复变得困难，但也让生物的防御更加坚固。所有生命恢复效果-50%，但防御力+20%。",
        "immuneTag": "ice",
        "mechanic": "heal_defense_mod",
        "healPenalty": 50,
        "defenseBonus": 20,
        "immuneTagNum": 7
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "挖掘冰窖",
          "description": "挖一个冰窖休息，恢复40%生命（受冻土影响）",
          "effect": {
            "type": "heal_percent",
            "value": 40
          }
        },
        {
          "id": "rest_skill",
          "name": "热身训练",
          "description": "活动身体，临时提升攻击力20%",
          "effect": {
            "type": "buff_attack",
            "value": 20,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "permafrost_1",
          "mapId": "permafrost_plain",
          "name": "解冻的遗骸",
          "description": "气温异常升高，一具远古生物的遗骸从冰层中暴露出来。",
          "options": [
            {
              "text": "吞噬遗骸获取基因",
              "effects": [
                {
                  "type": "buff_strength",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 25
                }
              ]
            },
            {
              "text": "搜刮遗骸周围",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                },
                {
                  "type": "gain_gold",
                  "value": 30
                }
              ]
            },
            {
              "text": "离开",
              "effects": []
            }
          ]
        },
        {
          "id": "permafrost_2",
          "mapId": "permafrost_plain",
          "name": "冰原风暴",
          "description": "一场夹杂着冰粒的风暴席卷而来，能见度几乎为零。",
          "options": [
            {
              "text": "顶风前进",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 3
                }
              ]
            },
            {
              "text": "原地等待",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "heal_percent",
                  "value": 5
                }
              ]
            },
            {
              "text": "在风暴中修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_exp",
                  "value": 35
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_3",
          "mapId": "permafrost_plain",
          "name": "猛犸象群",
          "description": "一群巨大的猛犸象从你面前经过，大地在它们的脚下颤抖。",
          "options": [
            {
              "text": "猎杀落单的猛犸象",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "跟随象群寻找水源",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 15
                },
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            },
            {
              "text": "躲避象群",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_4",
          "mapId": "permafrost_plain",
          "name": "冰下的声音",
          "description": "你听到冰层下方传来奇怪的声音，似乎有什么东西在下面活动。",
          "options": [
            {
              "text": "凿开冰层查看",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "把耳朵贴在冰面上听",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            },
            {
              "text": "快速离开",
              "effects": []
            }
          ]
        },
        {
          "id": "permafrost_5",
          "mapId": "permafrost_plain",
          "name": "远古遗迹",
          "description": "一座被冰雪半埋的远古遗迹，石柱上刻着无法辨认的文字。",
          "options": [
            {
              "text": "进入遗迹探索",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "研究石柱上的文字",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "buff_evolution",
                  "value": 3,
                  "duration": 10
                }
              ]
            },
            {
              "text": "搜刮遗迹外围",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_6",
          "mapId": "permafrost_plain",
          "name": "冰原狼群",
          "description": "一群巨大的冰原狼包围了你，它们的毛发上结着冰晶。",
          "options": [
            {
              "text": "正面厮杀",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_exp",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "击杀狼王震慑群狼",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 5
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            },
            {
              "text": "留下食物换取安全",
              "effects": [
                {
                  "type": "lose_gold",
                  "value": 25
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_7",
          "mapId": "permafrost_plain",
          "name": "陨石坑",
          "description": "一个古老的陨石坑，坑底的陨石还在散发着微弱的热量。",
          "options": [
            {
              "text": "吸收陨石的能量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 8
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "采集陨石碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "在陨石旁休息",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 25
                },
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_8",
          "mapId": "permafrost_plain",
          "name": "冰下森林",
          "description": "冰层下方竟然保存着一片完整的远古森林，树木还保持着生前的姿态。",
          "options": [
            {
              "text": "进入冰下森林",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 35
                },
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "采集远古树木的样本",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 4
                },
                {
                  "type": "gain_gold",
                  "value": 20
                }
              ]
            },
            {
              "text": "在森林边缘冥想",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_9",
          "mapId": "permafrost_plain",
          "name": "雪怪的脚印",
          "description": "你发现了一串巨大的脚印，每个脚印都有一米宽，似乎是什么巨大的生物留下的。",
          "options": [
            {
              "text": "追踪脚印",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 60
                }
              ]
            },
            {
              "text": "研究脚印的特征",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "buff_strength",
                  "value": 3,
                  "duration": 10
                }
              ]
            },
            {
              "text": "朝相反方向走",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "permafrost_10",
          "mapId": "permafrost_plain",
          "name": "冰河时代的终结",
          "description": "你来到了冰原的尽头，远处的冰川正在崩塌，似乎一个时代即将结束。",
          "options": [
            {
              "text": "见证时代的终结",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "吸收崩塌释放的能量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 80
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 30
                }
              ]
            },
            {
              "text": "寻找安全的地方",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "glacier_rift",
      "name": "冰川裂缝",
      "description": "巨大的冰川裂开一道深邃的裂缝，冰壁上闪烁着蓝色的光芒，里面隐藏着未知的危险。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "冰滑地面",
        "effect": "冰面湿滑无比，所有生物都难以站稳，但也更加灵活。所有单位先手值-20%，但闪避率+10%。",
        "immuneTag": "ice",
        "mechanic": "speed_dodge_mod",
        "speedPenalty": 20,
        "dodgeBonus": 10,
        "immuneTagNum": 7
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "冰洞休整",
          "description": "在冰洞中恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "调整重心",
          "description": "适应冰面，临时免疫冰滑效果",
          "effect": {
            "type": "immune_env"
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "glacier_rift_1",
          "mapId": "glacier_rift",
          "name": "冰壁上的壁画",
          "description": "冰壁上刻着古老的壁画，描绘着某种远古生物的进化历程。",
          "options": [
            {
              "text": "仔细研究壁画",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "buff_evolution",
                  "value": 3,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收壁画的能量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "继续前进",
              "effects": []
            }
          ]
        },
        {
          "id": "glacier_rift_2",
          "mapId": "glacier_rift",
          "name": "薄冰",
          "description": "脚下的冰面发出咔咔的声响，似乎随时会裂开。",
          "options": [
            {
              "text": "小心翼翼地通过",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            },
            {
              "text": "快速冲过去",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 5
                }
              ]
            }
          ]
        },
        {
          "id": "glacier_rift_3",
          "mapId": "glacier_rift",
          "name": "地下暗河",
          "description": "裂缝底部传来流水声，一条地下暗河在冰下流淌。",
          "options": [
            {
              "text": "下到暗河边",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            },
            {
              "text": "在上面钓鱼",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            },
            {
              "text": "离开",
              "effects": []
            }
          ]
        },
        {
          "id": "glacier_rift_4",
          "mapId": "glacier_rift",
          "name": "冰晶洞穴",
          "description": "一个布满冰晶的洞穴，冰晶折射出七彩的光芒。",
          "options": [
            {
              "text": "采集冰晶",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                },
                {
                  "type": "damage",
                  "value": 8
                }
              ]
            },
            {
              "text": "在冰晶中冥想",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "buff_perception",
                  "value": 3,
                  "duration": 10
                }
              ]
            },
            {
              "text": "穿过洞穴",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 2,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "glacier_rift_5",
          "mapId": "glacier_rift",
          "name": "冰封的剑齿虎",
          "description": "一只完美保存的剑齿虎被封在冰块中，它的獠牙闪着寒光。",
          "options": [
            {
              "text": "提取它的基因",
              "effects": [
                {
                  "type": "buff_strength",
                  "value": 4,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "解放它的灵魂",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 50
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 5
                }
              ]
            },
            {
              "text": "带走冰块",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "glacier_rift_6",
          "mapId": "glacier_rift",
          "name": "冰崩",
          "description": "上方的冰川突然崩塌，大量冰块砸下来！",
          "options": [
            {
              "text": "用身体硬抗",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 5
                }
              ]
            },
            {
              "text": "寻找掩体",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            },
            {
              "text": "在冰崩中修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "glacier_rift_7",
          "mapId": "glacier_rift",
          "name": "古老的祭坛",
          "description": "裂缝深处有一座用冰块搭建的祭坛，上面放着一颗发光的石头。",
          "options": [
            {
              "text": "拿走发光石头",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "在祭坛前祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 30
                },
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 5
                }
              ]
            },
            {
              "text": "破坏祭坛",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "glacier_rift_8",
          "mapId": "glacier_rift",
          "name": "冰蜘蛛巢",
          "description": "你误入了一个巨大的冰蜘蛛巢穴，到处都是粘稠的蛛丝。",
          "options": [
            {
              "text": "烧毁巢穴",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_exp",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            },
            {
              "text": "小心穿过",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 4,
                  "duration": 5
                }
              ]
            },
            {
              "text": "收集蛛丝",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 30
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "glacier_rift_9",
          "mapId": "glacier_rift",
          "name": "回声走廊",
          "description": "一段长长的冰走廊，你的每一个动作都会产生诡异的回声。",
          "options": [
            {
              "text": "倾听回声中的秘密",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "大声呐喊震慑敌人",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 3
                },
                {
                  "type": "damage",
                  "value": 5
                }
              ]
            },
            {
              "text": "快速通过",
              "effects": []
            }
          ]
        },
        {
          "id": "glacier_rift_10",
          "mapId": "glacier_rift",
          "name": "冰川之心",
          "description": "裂缝的最深处，一颗巨大的蓝色心脏在冰块中跳动，这是冰川的核心。",
          "options": [
            {
              "text": "吸收冰川之心",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "与冰川之心共鸣",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "gain_energy",
                  "value": 50
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 30,
                  "duration": 5
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "frozen_tundra",
      "name": "冰封苔原",
      "description": "被永恒冰雪覆盖的广袤苔原，寒风刺骨，只有最顽强的生物才能在这里生存。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "极寒之地",
        "effect": "永冻的苔原上，冰霜随时可能吞噬粗心的生物。每回合开始，随机1个单位被冻结，速度降为0，持续1回合。免疫标签8免疫冻结。",
        "immuneTag": "fire",
        "mechanic": "hp_drain_per_turn",
        "value": 5,
        "hpDrain": 5,
        "immuneTagNum": 6,
        "randomEffects": [
          {
            "type": "speed",
            "value": -50,
            "target": "random",
            "desc": "被极寒冻结，速度骤降！"
          }
        ]
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "生火取暖",
          "description": "消耗碎片生火，恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "热身运动",
          "description": "调整状态，重置技能冷却",
          "effect": {
            "type": "reset_cooldown"
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整，直接挑战首领",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "ice_tundra_1",
          "mapId": "frozen_tundra",
          "name": "冰封的猎物",
          "description": "你发现了一只被冰封的远古生物，它的体内似乎还有生命迹象。",
          "options": [
            {
              "text": "破冰救出它",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 15
                }
              ]
            },
            {
              "text": "吞噬它的生命精华",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "离开",
              "effects": []
            }
          ]
        },
        {
          "id": "ice_tundra_2",
          "mapId": "frozen_tundra",
          "name": "暴风雪",
          "description": "一场猛烈的暴风雪突然袭来，能见度几乎为零。",
          "options": [
            {
              "text": "顶着风雪前进",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "buff_attack",
                  "value": 10,
                  "duration": 3
                }
              ]
            },
            {
              "text": "寻找掩体躲避",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            },
            {
              "text": "在风雪中修炼",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "damage",
                  "value": 8
                }
              ]
            }
          ]
        },
        {
          "id": "ice_tundra_3",
          "mapId": "frozen_tundra",
          "name": "温泉眼",
          "description": "在冰封的苔原上，你发现了一处冒着热气的温泉眼。",
          "options": [
            {
              "text": "泡进去恢复",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            },
            {
              "text": "饮用温泉水",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 5
                },
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            },
            {
              "text": "在温泉边狩猎",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 1,
                  "value": 3
                }
              ]
            }
          ]
        },
        {
          "id": "ice_tundra_4",
          "mapId": "frozen_tundra",
          "name": "猛犸象的骸骨",
          "description": "一具巨大的猛犸象骸骨半埋在冰雪中，它的獠牙似乎还保存着某种力量。",
          "options": [
            {
              "text": "吸收獠牙的力量",
              "effects": [
                {
                  "type": "buff_strength",
                  "value": 3,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            },
            {
              "text": "搜刮骸骨周围",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 1
                },
                {
                  "type": "gain_gold",
                  "value": 20
                }
              ]
            },
            {
              "text": "致敬后离开",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 5
                }
              ]
            }
          ]
        },
        {
          "id": "ice_tundra_5",
          "mapId": "frozen_tundra",
          "name": "冰裂缝",
          "description": "地面突然裂开一道深不见底的冰裂缝，寒气从底部涌出。",
          "options": [
            {
              "text": "跳下去探索",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "沿着裂缝边缘走",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 2,
                  "duration": 5
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": []
            }
          ]
        },
        {
          "id": "ice_tundra_6",
          "mapId": "frozen_tundra",
          "name": "雪狼群",
          "description": "一群雪狼包围了你，它们的眼睛在雪地中闪着寒光。",
          "options": [
            {
              "text": "正面迎战",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "展示力量吓退它们",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 3
                }
              ]
            },
            {
              "text": "留下食物换取安全",
              "effects": [
                {
                  "type": "lose_gold",
                  "value": 15
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "ice_tundra_7",
          "mapId": "frozen_tundra",
          "name": "极光",
          "description": "绚烂的极光在夜空中舞动，你感到一股神秘的能量在体内涌动。",
          "options": [
            {
              "text": "吸收极光能量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 50
                },
                {
                  "type": "buff_evolution",
                  "value": 2,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在极光下冥想",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            },
            {
              "text": "继续赶路",
              "effects": []
            }
          ]
        },
        {
          "id": "ice_tundra_8",
          "mapId": "frozen_tundra",
          "name": "冰封的宝箱",
          "description": "一个被冰封的宝箱，锁上刻着古老的符文。",
          "options": [
            {
              "text": "用体温融化冰块",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "gain_gold",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            },
            {
              "text": "暴力砸开",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "gain_fragments",
                  "quality": 1,
                  "value": 5
                }
              ]
            },
            {
              "text": "尝试解开符文锁",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 20
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "ice_tundra_9",
          "mapId": "frozen_tundra",
          "name": "冻原部落",
          "description": "你遇到了一个在冻原上流浪的小部落，他们用警惕的目光看着你。",
          "options": [
            {
              "text": "用食物换取情报",
              "effects": [
                {
                  "type": "lose_gold",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 15
                },
                {
                  "type": "buff_defense",
                  "value": 10,
                  "duration": 5
                }
              ]
            },
            {
              "text": "展示力量要求臣服",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 30
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "友好交流后离开",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                },
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "ice_tundra_10",
          "mapId": "frozen_tundra",
          "name": "远古冰棺",
          "description": "一座透明的冰棺矗立在苔原中央，里面似乎封印着什么东西。",
          "options": [
            {
              "text": "打开冰棺",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 50
                }
              ]
            },
            {
              "text": "吸收冰棺的寒气",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 3
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "mammoth_steppe",
      "name": "猛犸草原",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "干冷草原",
        "effect": "干冷的草原上，寒风刺骨，非冰系生物的行动变得僵硬。每回合开始，所有非冰系单位速度降低5%，冰系单位攻击力提升5%。免疫标签8免疫减速。",
        "immuneTag": 8,
        "speedPenalty": 5,
        "attackBonus": 5
      },
      "events": [
        {
          "id": "mammoth_steppe_event_1",
          "mapId": "mammoth_steppe",
          "name": "剑齿虎的伏击",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "你察觉到灌木丛后有一双锐利的眼睛，一头剑齿虎正在埋伏猎物。",
          "options": [
            {
              "text": "A. 绕道而行",
              "result": "你悄悄地绕过伏击圈，安全离开，并在路上找到一些浆果。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            },
            {
              "text": "B. 观察狩猎",
              "result": "你等待剑齿虎狩猎，之后偷食了剩下的猎物残渣，获得基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 6,
                  "tag": 24
                }
              ]
            },
            {
              "text": "C. 虚张声势",
              "result": "你发出威吓的声音，剑齿虎犹豫后离开，你获得了它的临时领地。",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "tundra_permafrost",
      "name": "冻土苔原",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "永冻之触",
        "effect": "永冻的苔原上，冰霜随时可能吞噬粗心的生物。每回合开始，随机1个单位被冻结，速度降为0，持续1回合。免疫标签8免疫冻结。",
        "immuneTag": 8,
        "randomEffects": [
          {
            "type": "speed",
            "value": -50,
            "target": "random",
            "desc": "被永冻束缚，速度骤降！"
          }
        ]
      },
      "events": [
        {
          "id": "tundra_permafrost_event_1",
          "mapId": "tundra_permafrost",
          "name": "极光下的能量",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "夜空中舞动的极光洒下斑斓的光带，空气中似乎弥漫着微弱的能量。",
          "options": [
            {
              "text": "A. 吸收极光能量",
              "result": "你敞开身体吸收，获得了稀有的光能基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 在极光下冥想",
              "result": "你安静感受，身体的能量自然而然地充盈起来。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 追逐光带",
              "result": "你跟随极光移动，不知不觉中锻炼了速度。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "glacial_icefield",
      "name": "雪域冰川",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "极地严寒",
        "effect": "极地的严寒侵蚀着一切，寒霜在生物的体表不断累积。每回合开始，所有单位损失1%最大生命值，并获得1层寒霜，每层降低2%速度，可叠加。免疫标签8免疫。",
        "immuneTag": 8,
        "hpDrain": 1,
        "speedPenalty": 2
      },
      "events": [
        {
          "id": "glacial_icefield_event_1",
          "mapId": "glacial_icefield",
          "name": "冰瀑攀爬",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一道巨大的冰瀑布冻结在悬崖上，仿佛时间静止的河流。",
          "options": [
            {
              "text": "A. 尝试攀爬",
              "result": "你攀爬冰瀑，虽然吃力但成功登顶，获得了俯瞰地形带来的基因感悟。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 7
                }
              ]
            },
            {
              "text": "B. 寻找冰瀑后的洞穴",
              "result": "你绕到冰瀑后方，发现一个小洞穴，里面有些储存的坚果。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 敲下冰柱食用",
              "result": "你敲下几根冰柱，咀嚼后身体冷却，但意外激活了抗冻机制。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 2
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "coastal_tundra",
      "name": "滨海冻原",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "冻海雾",
        "effect": "冻海的迷雾笼罩着海岸，所有生物的视线都变得模糊。每回合开始，所有单位命中率降低10%，冰系单位不受影响。",
        "immuneTag": 8,
        "hitPenalty": 10
      },
      "events": [
        {
          "id": "coastal_tundra_event_1",
          "mapId": "coastal_tundra",
          "name": "白鲸之歌",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一群白鲸在近海歌唱，悠扬的声音穿透海水，令人心旷神怡。",
          "options": [
            {
              "text": "A. 聆听歌声",
              "result": "你沉浸在歌声中，精神振奋，战斗意志得到提升。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "strength",
                  "value": 2
                }
              ]
            },
            {
              "text": "B. 与白鲸同游",
              "result": "你加入白鲸的队伍，它们友善地分享了一些食物。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 学习它们的声波",
              "result": "你尝试模仿，学会了简单的回声定位基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 18
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "ice_age"
    },
    {
      "id": "volcanic_lava",
      "name": "火山熔岩",
      "description": "炽热的火山地带，到处都是流动的岩浆和喷发的火山口。火系巨龙喜欢在这里栖息。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "灼热高温",
        "effect": "灼热的高温炙烤着一切，非冰系/水系生物在熔岩边不断灼伤。每回合损失3%最大生命，冰系/水系天赋免疫，火系天赋攻击力+20%。",
        "immuneTag": "ice",
        "mechanic": "hp_drain_fire_bonus",
        "value": 3,
        "fireBonus": 20,
        "hpDrain": 3,
        "attackBonus": 20,
        "immuneTagNum": 7
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "岩浆池沐浴",
          "description": "在温热的岩浆池中恢复40%生命（火系天赋效果翻倍）",
          "effect": {
            "type": "heal_percent",
            "value": 40
          }
        },
        {
          "id": "rest_skill",
          "name": "吸收火元素",
          "description": "吸收火元素，临时提升攻击力25%",
          "effect": {
            "type": "buff_attack",
            "value": 25,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "volcano_1",
          "mapId": "volcanic_lava",
          "name": "岩浆喷发",
          "description": "脚下的地面突然裂开，炽热的岩浆喷涌而出！",
          "options": [
            {
              "text": "硬抗岩浆喷发",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 5
                }
              ]
            },
            {
              "text": "快速躲避",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            },
            {
              "text": "吸收岩浆的热量",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_2",
          "mapId": "volcanic_lava",
          "name": "火蜥蜴",
          "description": "一群在岩浆中游泳的火蜥蜴围了过来，它们的身体散发着灼人的热量。",
          "options": [
            {
              "text": "猎杀火蜥蜴",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            },
            {
              "text": "吸收火蜥蜴的火焰",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 8
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "绕过它们",
              "effects": []
            }
          ]
        },
        {
          "id": "volcano_3",
          "mapId": "volcanic_lava",
          "name": "黑曜石矿脉",
          "description": "你发现了一条巨大的黑曜石矿脉，这些黑色的石头是火山玻璃化的产物。",
          "options": [
            {
              "text": "采集黑曜石",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "吸收黑曜石的能量",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "用黑曜石打造护甲",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 8
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_4",
          "mapId": "volcanic_lava",
          "name": "火龙的巢穴",
          "description": "一个巨大的洞穴，里面温度高得几乎无法呼吸，洞壁上挂满了凝固的岩浆。",
          "options": [
            {
              "text": "深入巢穴探索",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 50
                }
              ]
            },
            {
              "text": "在洞口吸收热量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 5
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            },
            {
              "text": "搜刮洞口",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_5",
          "mapId": "volcanic_lava",
          "name": "岩浆瀑布",
          "description": "一道由岩浆组成的瀑布从高处倾泻而下，壮观而危险。",
          "options": [
            {
              "text": "穿过岩浆瀑布",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "在瀑布旁修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 45
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 8
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_6",
          "mapId": "volcanic_lava",
          "name": "火焰精灵",
          "description": "一群由纯粹火焰构成的精灵在半空中跳舞，它们看到你后围了上来。",
          "options": [
            {
              "text": "吸收火焰精灵",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 5
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "与火焰精灵共舞",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "驱散它们",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_7",
          "mapId": "volcanic_lava",
          "name": "火山口",
          "description": "你来到了一个活火山的边缘，向下望去是翻滚的岩浆，热浪扑面而来。",
          "options": [
            {
              "text": "跳入火山口",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在火山口修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 8
                }
              ]
            },
            {
              "text": "收集火山灰",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_8",
          "mapId": "volcanic_lava",
          "name": "熔岩石人",
          "description": "一个由冷却岩浆构成的石人从地面站起，它的眼睛里燃烧着火焰。",
          "options": [
            {
              "text": "击碎石人",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "吸收石人的火焰核心",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 5
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "绕过石人",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 2,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_9",
          "mapId": "volcanic_lava",
          "name": "硫磺泉",
          "description": "一处冒着黄色气泡的硫磺泉，空气中弥漫着刺鼻的气味。",
          "options": [
            {
              "text": "饮用硫磺泉水",
              "effects": [
                {
                  "type": "damage",
                  "value": 15
                },
                {
                  "type": "buff_strength",
                  "value": 4,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在硫磺泉中沐浴",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 25
                },
                {
                  "type": "buff_defense",
                  "value": 10,
                  "duration": 8
                }
              ]
            },
            {
              "text": "收集硫磺",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 25
                },
                {
                  "type": "gain_fragments",
                  "quality": 1,
                  "value": 5
                }
              ]
            }
          ]
        },
        {
          "id": "volcano_10",
          "mapId": "volcanic_lava",
          "name": "炎龙的试炼",
          "description": "一只巨大的炎龙出现在你面前，它说如果你能通过它的试炼，就赐予你火焰的力量。",
          "options": [
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求炎龙的指引",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "buff_evolution",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "拒绝并离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 5
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "dragon_nest_abyss",
      "name": "龙巢深渊",
      "description": "一条深不见底的巨大裂谷，据说底部是远古巨龙的墓地。无数龙的遗骸堆积在这里，龙气浓郁得几乎化为实质。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "龙息余威",
        "effect": "龙息的余威在深渊中回荡，每3回合就有一次致命的龙息扫过战场。每3回合受到一次龙息伤害（最大生命10%），龙系天赋免疫。",
        "immuneTag": "dragon",
        "mechanic": "periodic_dragon_breath",
        "value": 10,
        "interval": 3,
        "hpDrain": 10,
        "immuneTagNum": 27
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "龙骸庇护",
          "description": "在巨大的龙骸下休息，恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "吸收龙气",
          "description": "吸收深渊中的龙气，全属性+10%（5回合）",
          "effect": {
            "type": "buff_all",
            "value": 10,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "abyss_1",
          "mapId": "dragon_nest_abyss",
          "name": "龙骸之路",
          "description": "你走在一条由无数龙骸铺成的道路上，每一步都踩在远古巨龙的骨头上。",
          "options": [
            {
              "text": "吸收龙骸中的残余龙气",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "收集龙骸",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "gain_gold",
                  "value": 40
                }
              ]
            },
            {
              "text": "快速通过",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_2",
          "mapId": "dragon_nest_abyss",
          "name": "龙的怨念",
          "description": "深渊中弥漫着无数死去巨龙的怨念，它们的灵魂在低语。",
          "options": [
            {
              "text": "倾听龙的遗言",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收怨念增强自身",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 5
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "净化怨念",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_3",
          "mapId": "dragon_nest_abyss",
          "name": "龙晶矿脉",
          "description": "深渊的岩壁上镶嵌着无数闪烁着光芒的龙晶，这是龙气凝结而成的结晶。",
          "options": [
            {
              "text": "采集龙晶",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_gold",
                  "value": 50
                }
              ]
            },
            {
              "text": "吸收龙晶的能量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 8
                }
              ]
            },
            {
              "text": "用龙晶强化自身",
              "effects": [
                {
                  "type": "buff_strength",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_4",
          "mapId": "dragon_nest_abyss",
          "name": "古龙的遗骸",
          "description": "一具超乎想象的巨大龙骸横亘在深渊中，它的头骨比一座山还大。",
          "options": [
            {
              "text": "进入头骨探索",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 60
                }
              ]
            },
            {
              "text": "吸收古龙的残余力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "在遗骸前致敬",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 25
                },
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_5",
          "mapId": "dragon_nest_abyss",
          "name": "龙蛋孵化场",
          "description": "深渊底部有一个巨大的孵化场，无数龙蛋在龙气的滋养下微微发光。",
          "options": [
            {
              "text": "打破龙蛋吸收能量",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 5
                }
              ]
            },
            {
              "text": "帮助龙蛋孵化",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            },
            {
              "text": "收集未孵化的龙蛋",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_6",
          "mapId": "dragon_nest_abyss",
          "name": "龙血之河",
          "description": "一条由远古巨龙的血液汇成的河流在深渊中流淌，河水闪着暗红色的光芒。",
          "options": [
            {
              "text": "饮用龙血",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "buff_strength",
                  "value": 8,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "在龙血中沐浴",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            },
            {
              "text": "收集龙血",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_gold",
                  "value": 45
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_7",
          "mapId": "dragon_nest_abyss",
          "name": "守墓龙",
          "description": "一只苍老但依然强大的龙挡住了你的去路，它是这片龙墓的守护者。",
          "options": [
            {
              "text": "与守墓龙战斗",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "请求通过",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "展示对龙的敬意",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_8",
          "mapId": "dragon_nest_abyss",
          "name": "龙气漩涡",
          "description": "深渊中心有一个巨大的龙气漩涡，无数龙气在其中旋转凝聚。",
          "options": [
            {
              "text": "进入漩涡核心",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在漩涡边缘修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_evolution",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "远离漩涡",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_9",
          "mapId": "dragon_nest_abyss",
          "name": "龙的宝藏",
          "description": "你发现了一个被龙骸半埋的宝藏，里面闪烁着无数珍宝的光芒。",
          "options": [
            {
              "text": "拿走所有宝藏",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "只拿需要的",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "不动宝藏",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "abyss_10",
          "mapId": "dragon_nest_abyss",
          "name": "龙王的遗骸",
          "description": "深渊的最深处，你找到了传说中龙王的遗骸。它的身体即使在死后依然散发着令人窒息的龙威。",
          "options": [
            {
              "text": "吸收龙王的力量",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在龙王遗骸前顿悟",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_evolution",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "dragon_spine_mountains",
      "name": "龙脊山脉",
      "description": "连绵起伏的巨大山脉，每一座山峰都像是一条沉睡的巨龙。这里是巨龙们的领地，空气中弥漫着龙威。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "龙威压制",
        "effect": "龙威在山脉中压制着一切非龙系生物，让它们难以发挥全部实力。所有非龙系单位攻击力-15%，龙系天赋免疫此效果。",
        "immuneTag": "dragon",
        "mechanic": "attack_penalty",
        "value": 15,
        "attackBonus": -15,
        "immuneTagNum": 27
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "龙穴休息",
          "description": "在废弃的龙穴中恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "吸收龙气",
          "description": "吸收山中的龙气，临时免疫龙威",
          "effect": {
            "type": "immune_env"
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "dragon_mountain_1",
          "mapId": "dragon_spine_mountains",
          "name": "龙的足迹",
          "description": "你发现了一个巨大的脚印，每个脚趾都有你身体那么大。",
          "options": [
            {
              "text": "研究足迹获取龙的信息",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 25
                },
                {
                  "type": "buff_perception",
                  "value": 3,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收足迹中的龙气",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 5
                },
                {
                  "type": "gain_energy",
                  "value": 20
                }
              ]
            },
            {
              "text": "离开",
              "effects": []
            }
          ]
        },
        {
          "id": "dragon_mountain_2",
          "mapId": "dragon_spine_mountains",
          "name": "落石",
          "description": "上方的山崖突然崩塌，大量巨石砸下来！",
          "options": [
            {
              "text": "用身体硬抗",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 5
                }
              ]
            },
            {
              "text": "寻找掩体",
              "effects": [
                {
                  "type": "damage",
                  "value": 10
                },
                {
                  "type": "heal_percent",
                  "value": 10
                }
              ]
            },
            {
              "text": "在落石中修炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 35
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_3",
          "mapId": "dragon_spine_mountains",
          "name": "龙鳞碎片",
          "description": "你在山路上发现了一片闪烁着金属光泽的龙鳞碎片。",
          "options": [
            {
              "text": "吸收龙鳞的力量",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 20
                }
              ]
            },
            {
              "text": "收集龙鳞碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "用龙鳞打造武器",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 12,
                  "duration": 8
                },
                {
                  "type": "damage",
                  "value": 8
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_4",
          "mapId": "dragon_spine_mountains",
          "name": "幼龙",
          "description": "一只还没长大的幼龙挡在路中央，它好奇地看着你。",
          "options": [
            {
              "text": "猎杀幼龙获取龙血",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "与幼龙交流",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 30
                }
              ]
            },
            {
              "text": "绕过幼龙",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 2,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_5",
          "mapId": "dragon_spine_mountains",
          "name": "龙息痕迹",
          "description": "山崖上有一道被龙息灼烧的痕迹，岩石都被融化成了玻璃状。",
          "options": [
            {
              "text": "研究龙息的原理",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "buff_evolution",
                  "value": 3,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收残留的龙息能量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 5
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "收集玻璃化岩石",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_6",
          "mapId": "dragon_spine_mountains",
          "name": "龙巢",
          "description": "你发现了一个废弃的龙巢，里面还有几颗未孵化的龙蛋。",
          "options": [
            {
              "text": "打破龙蛋吸收能量",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 50
                }
              ]
            },
            {
              "text": "在龙巢中修炼",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 8
                }
              ]
            },
            {
              "text": "搜刮龙巢",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_7",
          "mapId": "dragon_spine_mountains",
          "name": "龙的怒吼",
          "description": "远处传来一声震耳欲聋的龙吼，山体都在颤抖。",
          "options": [
            {
              "text": "在龙吼中锻炼意志",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 25
                }
              ]
            },
            {
              "text": "寻找龙吼的来源",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            },
            {
              "text": "躲避龙吼的冲击",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_8",
          "mapId": "dragon_spine_mountains",
          "name": "龙骨",
          "description": "一具巨大的龙骨横亘在山谷中，它的脊椎比你还高。",
          "options": [
            {
              "text": "吸收龙骨中的残余能量",
              "effects": [
                {
                  "type": "buff_strength",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "收集龙骨碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "gain_gold",
                  "value": 30
                }
              ]
            },
            {
              "text": "在龙骨下冥想",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 50
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_9",
          "mapId": "dragon_spine_mountains",
          "name": "飞龙群",
          "description": "一群小型飞龙从天空俯冲下来，它们的鳞片在阳光下闪闪发光。",
          "options": [
            {
              "text": "迎战飞龙群",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "用龙威震慑它们",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 3
                },
                {
                  "type": "gain_fragments",
                  "quality": 2,
                  "value": 3
                }
              ]
            },
            {
              "text": "躲避飞龙群",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 4,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "dragon_mountain_10",
          "mapId": "dragon_spine_mountains",
          "name": "龙王的宝座",
          "description": "山顶有一座天然形成的石座，据说曾是龙王的宝座，空气中弥漫着强大的龙威。",
          "options": [
            {
              "text": "坐上宝座吸收龙威",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在宝座前祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "gain_energy",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 35
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 5
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "volcanic_plain",
      "name": "火山平原",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "硫磺气息",
        "effect": "空气中弥漫着硫磺味，每一次呼吸都可能带来致命的毒素。每回合开始，随机使1个单位中毒，每回合损失1%生命值，持续3回合。免疫标签8可免疫。",
        "immuneTag": 8,
        "hpDrain": 1
      },
      "events": [
        {
          "id": "volcanic_plain_event_1",
          "mapId": "volcanic_plain",
          "name": "火山弹",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "远处火山口喷出几颗炽热的火山弹，砸在地上形成小坑。",
          "options": [
            {
              "text": "A. 靠近刚落的火山弹",
              "result": "你感受到巨大的热量，但也在附近找到了熔融的稀有金属基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 6
                }
              ]
            },
            {
              "text": "B. 躲避并等待",
              "result": "你安全地等火山弹冷却，捡到了一些硫磺与矿物质。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 利用热浪上升",
              "result": "你乘着热浪气流短暂飞行，获得了快速位移机会。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "desert_dragon",
      "name": "荒漠巨龙",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "沙漠热浪",
        "effect": "沙漠的热浪扭曲了视线，非火系生物在烈日下不断失水。每回合开始，所有非火系单位损失1%最大生命值，火系单位攻击力提升5%。免疫标签8可免疫生命损失。",
        "immuneTag": 8,
        "hpDrain": 1,
        "attackBonus": 5
      },
      "events": [
        {
          "id": "desert_dragon_event_1",
          "mapId": "desert_dragon",
          "name": "沙尘暴",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "天边涌来一堵黄褐色的沙墙，狂风裹挟着沙粒呼啸而来。",
          "options": [
            {
              "text": "A. 迎风而上",
              "result": "你冲入沙暴，体表被沙粒打磨得更加坚韧，暂时提升防御。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 1
                },
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            },
            {
              "text": "B. 挖掘沙坑躲避",
              "result": "你迅速钻入沙中，安全躲过沙暴，还找到了埋藏的植物根茎。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 收集沙粒中的矿物",
              "result": "你过滤风沙，获得了微量的金属矿物基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "coastal_hunting",
      "name": "海滨猎场",
      "totalLayers": 7,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "潮间捕猎",
        "effect": "潮间带是捕猎的绝佳场所，满血的猎手在这里更加致命。每回合开始，若单位处于满血状态，攻击力提升10%，持续该回合。",
        "immuneTag": null,
        "attackBonus": 10
      },
      "events": [
        {
          "id": "coastal_hunting_event_1",
          "mapId": "coastal_hunting",
          "name": "沧龙尾迹",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "水中突然出现一道巨大的尾鳍划出的水痕，显然有一头沧龙刚刚经过。",
          "options": [
            {
              "text": "A. 追踪尾迹",
              "result": "你尾随其后，捡到了它捕食后剩下的食物残渣，能量不错。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "B. 远离这片水域",
              "result": "你迅速离开，但顺路采食了一些海藻，生命略有恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 15
                }
              ]
            },
            {
              "text": "C. 分析水痕",
              "result": "你从水痕中分析出沧龙的游动效率基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 18
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "dragon_lair",
      "name": "龙巢秘境",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "龙威压制",
        "effect": "龙威在巢穴中弥漫，非龙族生物在威压下不断退缩。每回合开始，非龙族单位攻击力降低5%，龙族单位攻击力提升5%。免疫标签28可免疫降低。",
        "immuneTag": 28,
        "attackBonus": 5
      },
      "events": [
        {
          "id": "dragon_lair_event_1",
          "mapId": "dragon_lair",
          "name": "贪婪的龙人",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一个半龙人在宝藏堆里翻找，它看到你后露出警惕的神色。",
          "options": [
            {
              "text": "A. 分享宝藏",
              "result": "你表示友好，它不情愿地分给你一些闪亮的基因碎片。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 用计引开",
              "result": "你制造声响引开它，趁机拿走了几块高能宝石。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 提出决斗",
              "result": "你提出友善切磋，获胜后它佩服地让出了一件治愈宝物。",
              "effects": [
                {
                  "type": "heal",
                  "value": 40
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "dragon_age"
    },
    {
      "id": "glimmer_woods",
      "name": "幽光林地",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "幽光祝福",
        "effect": "幽光在林地中闪烁，随机祝福着经过的生物。每回合开始，随机1个单位获得祝福，造成的伤害提升15%，持续1回合。",
        "immuneTag": null,
        "randomEffects": [
          {
            "type": "atk",
            "value": 15,
            "target": "random",
            "desc": "幽光祝福，伤害提升！"
          }
        ]
      },
      "events": [
        {
          "id": "glimmer_woods_event_1",
          "mapId": "glimmer_woods",
          "name": "月下花海",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一片只在月光下盛开的花海，花瓣散发着柔和的银光。",
          "options": [
            {
              "text": "A. 采摘花朵",
              "result": "你采下几朵，它们能制成短效的夜视药膏。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 2
                }
              ]
            },
            {
              "text": "B. 在花海中打滚",
              "result": "你沾了满身花粉，吸引了友善的授粉精灵，获得了能量馈赠。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 静待花开",
              "result": "你观赏花开花落，感悟了生命周期，生命有所恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 20
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "holy_sword_ruins",
      "name": "圣剑遗迹",
      "description": "传说中圣剑陨落的地方，整片遗迹都沐浴在神圣的光辉中。邪恶的生物在这里会被净化，而正义的战士则能获得祝福。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "神圣光辉",
        "effect": "神圣的光辉在遗迹中闪耀，治愈着正义的生物，灼烧着邪恶的存在。玩家每回合恢复5%最大生命，邪恶系敌人每回合损失3%生命。",
        "immuneTag": "holy",
        "mechanic": "holy_heal_evil_damage",
        "playerHeal": 5,
        "enemyDamage": 3,
        "immuneTagNum": 25
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "祈祷恢复",
          "description": "在神圣光辉中祈祷，恢复60%生命",
          "effect": {
            "type": "heal_percent",
            "value": 60
          }
        },
        {
          "id": "rest_skill",
          "name": "接受祝福",
          "description": "接受神圣祝福，全属性+15%（5回合）",
          "effect": {
            "type": "buff_all",
            "value": 15,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "holy_ruins_1",
          "mapId": "holy_sword_ruins",
          "name": "圣剑碎片",
          "description": "你发现了一块闪烁着神圣光芒的圣剑碎片，它的力量让你感到温暖。",
          "options": [
            {
              "text": "吸收圣剑碎片的力量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            },
            {
              "text": "收集圣剑碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                },
                {
                  "type": "gain_gold",
                  "value": 50
                }
              ]
            },
            {
              "text": "在碎片前祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_2",
          "mapId": "holy_sword_ruins",
          "name": "圣骑士的遗骸",
          "description": "一具穿着圣骑士铠甲的遗骸跪在地上，手中还紧握着断裂的圣剑。",
          "options": [
            {
              "text": "致敬后取走装备",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "吸收圣骑士的残余意志",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 35
                }
              ]
            },
            {
              "text": "为他祈祷后离开",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 25
                },
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_3",
          "mapId": "holy_sword_ruins",
          "name": "神圣喷泉",
          "description": "一处散发着神圣光芒的喷泉，泉水能治愈一切伤痛。",
          "options": [
            {
              "text": "饮用神圣泉水",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            },
            {
              "text": "在喷泉中沐浴",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集神圣泉水",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_4",
          "mapId": "holy_sword_ruins",
          "name": "堕落的圣骑士",
          "description": "一个被黑暗力量腐蚀的圣骑士挡在你面前，他的眼中闪烁着疯狂的光芒。",
          "options": [
            {
              "text": "击败他净化灵魂",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            },
            {
              "text": "用神圣力量净化他",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "绕过他",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_5",
          "mapId": "holy_sword_ruins",
          "name": "天使的羽毛",
          "description": "一根散发着金色光芒的羽毛飘落在你面前，它似乎来自某种神圣的存在。",
          "options": [
            {
              "text": "吸收羽毛的力量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                },
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集天使羽毛",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                },
                {
                  "type": "gain_gold",
                  "value": 70
                }
              ]
            },
            {
              "text": "让羽毛随风飘走",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 15
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_6",
          "mapId": "holy_sword_ruins",
          "name": "黑暗生物",
          "description": "一群被神圣光辉灼伤的黑暗生物躲在阴影中，它们用仇恨的目光看着你。",
          "options": [
            {
              "text": "净化它们",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_exp",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            },
            {
              "text": "用神圣光辉驱散",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 8
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            },
            {
              "text": "快速通过",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_7",
          "mapId": "holy_sword_ruins",
          "name": "古老的神殿",
          "description": "一座被时间侵蚀的古老神殿，门上刻着已经失传的神圣符文。",
          "options": [
            {
              "text": "进入神殿探索",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 50
                }
              ]
            },
            {
              "text": "研究门上的符文",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 45
                },
                {
                  "type": "buff_evolution",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在神殿前祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "gain_energy",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_8",
          "mapId": "holy_sword_ruins",
          "name": "圣剑的试炼",
          "description": "一个由神圣力量构成的幻影出现在你面前，它说只有通过试炼的人才能获得圣剑的认可。",
          "options": [
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求指引",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_evolution",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "拒绝试炼",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_9",
          "mapId": "holy_sword_ruins",
          "name": "神圣护盾",
          "description": "一个由神圣力量构成的护盾漂浮在空中，它能保护持有者免受邪恶力量的侵害。",
          "options": [
            {
              "text": "吸收神圣护盾",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            },
            {
              "text": "收集护盾碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "gain_gold",
                  "value": 50
                }
              ]
            },
            {
              "text": "让护盾守护你",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "holy_ruins_10",
          "mapId": "holy_sword_ruins",
          "name": "圣剑之主",
          "description": "遗迹的最深处，一个由神圣光芒构成的巨大身影正在等待着你。他就是圣剑的主人，传说中的英雄。",
          "options": [
            {
              "text": "挑战圣剑之主",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求圣剑的祝福",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "encircling_sea",
      "name": "环绕之海",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "永恒漩涡",
        "effect": "永恒的漩涡在海中旋转，近战生物不断被拉向中心。每回合开始，随机1个近战单位被拉向场地中央，速度降低10%。免疫标签18免疫。",
        "immuneTag": 18,
        "speedPenalty": 10
      },
      "events": [
        {
          "id": "encircling_sea_event_1",
          "mapId": "encircling_sea",
          "name": "飞翔的蝠鲼群",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一群发光的巨型蝠鲼跃出水面，在空中滑翔，落下时砸出巨大的水花。",
          "options": [
            {
              "text": "A. 乘上它们的背",
              "result": "你搭上一只蝠鲼，从空中俯瞰海洋，获得了全局视野基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 18
                }
              ]
            },
            {
              "text": "B. 收集溅起的水花精华",
              "result": "你收集水花中浓缩的魔力，能量值大幅上升。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 模仿滑翔",
              "result": "你试着跃出水面，虽然笨拙但锻炼了飞行肌肉，速度暂时提升。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "agility",
                  "value": 1
                },
                {
                  "type": "gain_exp",
                  "value": 10
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "frost_abyss",
      "name": "冰霜之渊",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "永冻诅咒",
        "effect": "永冻的诅咒在深渊中回荡，冰霜束缚着粗心的生物。每回合开始，随机1个单位受到冰霜束缚，造成的伤害降低20%，持续1回合。免疫标签8免疫。",
        "immuneTag": 8,
        "randomEffects": [
          {
            "type": "atk",
            "value": -20,
            "target": "random",
            "desc": "冰霜束缚，伤害降低！"
          }
        ]
      },
      "events": [
        {
          "id": "frost_abyss_event_1",
          "mapId": "frost_abyss",
          "name": "冰晶森林",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一座由纯净冰晶构成的森林，每棵树都如同一座雕塑，发出叮咚的声音。",
          "options": [
            {
              "text": "A. 敲击冰树",
              "result": "你敲击冰树，掉落下许多音符般的冰晶碎片，富含能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "B. 聆听冰之乐章",
              "result": "你静听，学会了冰系魔力的振动频率，获得基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 7
                }
              ]
            },
            {
              "text": "C. 穿过森林",
              "result": "你漫步其中，精神得到洗涤，所有异常状态清除。",
              "effects": [
                {
                  "type": "heal",
                  "value": 50
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "god_demon_battlefield",
      "name": "神魔战场",
      "description": "上古时期神与魔决战的战场，整片土地都被神力和魔力浸透。在这里，每一次攻击都蕴含着毁天灭地的力量。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "神力残留",
        "effect": "神力的残留在战场上激荡，所有生物的攻击力都被提升，但防御力则被削弱。所有单位攻击力+25%，防御力-15%，战斗更加激烈。",
        "mechanic": "attack_buff_defense_penalty",
        "attackBonus": 25,
        "defensePenalty": 15
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "战场急救",
          "description": "在战场上紧急处理伤口，恢复40%生命",
          "effect": {
            "type": "heal_percent",
            "value": 40
          }
        },
        {
          "id": "rest_skill",
          "name": "激发战意",
          "description": "激发战斗意志，攻击力+30%（5回合）",
          "effect": {
            "type": "buff_attack",
            "value": 30,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "battlefield_1",
          "mapId": "god_demon_battlefield",
          "name": "神将的武器",
          "description": "一把散发着神威的武器插在地上，它的力量让周围的空气都在颤抖。",
          "options": [
            {
              "text": "拔出武器",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "吸收武器的神力",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            },
            {
              "text": "收集武器碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                },
                {
                  "type": "gain_gold",
                  "value": 60
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_2",
          "mapId": "god_demon_battlefield",
          "name": "魔将的铠甲",
          "description": "一副被黑暗力量浸透的铠甲散落在地上，它的表面还在不断渗出黑色的雾气。",
          "options": [
            {
              "text": "穿上铠甲",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "净化铠甲",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 45
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集铠甲碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                },
                {
                  "type": "gain_gold",
                  "value": 55
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_3",
          "mapId": "god_demon_battlefield",
          "name": "神力结晶",
          "description": "一颗由纯粹神力凝结而成的结晶，它散发着令人敬畏的光芒。",
          "options": [
            {
              "text": "吸收神力结晶",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 60
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "收集神力结晶",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "gain_gold",
                  "value": 80
                }
              ]
            },
            {
              "text": "在结晶旁修炼",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_4",
          "mapId": "god_demon_battlefield",
          "name": "魔力漩涡",
          "description": "一个由黑暗魔力构成的巨大漩涡在战场上旋转，它能吞噬一切靠近的东西。",
          "options": [
            {
              "text": "进入漩涡",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收魔力",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "远离漩涡",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_5",
          "mapId": "god_demon_battlefield",
          "name": "战死者的遗骸",
          "description": "无数神与魔的遗骸堆积在战场上，他们的武器和铠甲还保持着战斗的姿态。",
          "options": [
            {
              "text": "搜刮战利品",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 80
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 3
                },
                {
                  "type": "damage",
                  "value": 10
                }
              ]
            },
            {
              "text": "吸收残余的战意",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "为战死者祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "buff_all",
                  "value": 5,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_6",
          "mapId": "god_demon_battlefield",
          "name": "神将的幻影",
          "description": "一个由神力构成的神将幻影出现在你面前，他正在重复着千年前的战斗动作。",
          "options": [
            {
              "text": "与幻影切磋",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察学习",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "绕过幻影",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_7",
          "mapId": "god_demon_battlefield",
          "name": "魔将的幻影",
          "description": "一个由魔力构成的魔将幻影出现在你面前，它的眼中闪烁着邪恶的光芒。",
          "options": [
            {
              "text": "击败幻影",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                },
                {
                  "type": "gain_exp",
                  "value": 55
                }
              ]
            },
            {
              "text": "吸收魔力",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "净化幻影",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_8",
          "mapId": "god_demon_battlefield",
          "name": "战场中央",
          "description": "你来到了战场的最中央，这里是神与魔最终决战的地方，地面上还留着一个巨大的坑洞。",
          "options": [
            {
              "text": "进入坑洞探索",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在坑洞旁修炼",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_9",
          "mapId": "god_demon_battlefield",
          "name": "神器碎片",
          "description": "一块在战斗中碎裂的神器碎片，它还保留着部分神器的力量。",
          "options": [
            {
              "text": "吸收神器力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 50
                },
                {
                  "type": "damage",
                  "value": 15
                }
              ]
            },
            {
              "text": "收集神器碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "gain_gold",
                  "value": 100
                }
              ]
            },
            {
              "text": "用碎片强化自身",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "battlefield_10",
          "mapId": "god_demon_battlefield",
          "name": "神魔之主",
          "description": "战场的尽头，一个同时拥有神力和魔力的存在正在等待着你。他是这场战争的胜利者，也是这片战场的主人。",
          "options": [
            {
              "text": "挑战神魔之主",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求力量",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "magma_abyss",
      "name": "熔火深渊",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "熔岩热浪",
        "effect": "熔岩的热浪扑面而来，非火系生物在高温中不断灼伤。每回合开始，所有非火系单位损失1%最大生命值，火系单位攻击力提升10%。免疫标签8可免疫损失。",
        "immuneTag": 8,
        "hpDrain": 1,
        "attackBonus": 10
      },
      "events": [
        {
          "id": "magma_abyss_event_1",
          "mapId": "magma_abyss",
          "name": "火焰符文",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "岩壁上刻着闪烁的火焰符文，它们似乎构成了一道防御结界。",
          "options": [
            {
              "text": "A. 解读符文",
              "result": "你理解了一部分符文，学会了火焰护盾的基因片段。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 6
                }
              ]
            },
            {
              "text": "B. 吸收符文能量",
              "result": "你触摸符文，一股炽热的能量涌入，补充了大量能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 激活结界休息",
              "result": "你激活结界，一个安全的空间让你生命完全恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 50
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "spirit_woods",
      "name": "灵域林地",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "灵魂共鸣",
        "effect": "灵魂的共鸣在林地中回荡，技能的冷却在神秘力量下不断缩短。每回合开始，随机1个单位技能冷却时间减少1回合。",
        "immuneTag": null,
        "randomEffects": [
          {
            "type": "atk",
            "value": 5,
            "target": "random",
            "desc": "灵魂共鸣，战力微幅提升！"
          }
        ]
      },
      "events": [
        {
          "id": "spirit_woods_event_1",
          "mapId": "spirit_woods",
          "name": "迷幻蘑菇",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一圈色彩鲜艳的蘑菇围成环，散发着令人微醺的香气。",
          "options": [
            {
              "text": "A. 谨慎食用",
              "result": "你只吃一小口，幻觉中看到了基因排列的奥秘。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 收集孢子",
              "result": "你收集孢子，可以制作成提神药剂。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "evolution",
                  "value": 2
                }
              ]
            },
            {
              "text": "C. 远离蘑菇环",
              "result": "你远离香气，但绕路发现了一处干净的水源，生命恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 25
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "sacred_beast_forest",
      "name": "万兽圣林",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "兽灵庇佑",
        "effect": "兽灵在圣林中庇佑着兽系生物，让它们变得更加强大。每回合开始，所有兽系单位获得1层兽灵，每层兽灵提升2%攻击力，可叠加5层。",
        "immuneTag": null,
        "attackBonus": 10
      },
      "events": [
        {
          "id": "sacred_beast_forest_event_1",
          "mapId": "sacred_beast_forest",
          "name": "独角兽的试炼",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一只高傲的独角兽挡在前路，只有纯洁之心才能通过。",
          "options": [
            {
              "text": "A. 展示纯净意图",
              "result": "你坦荡地表达善意，独角兽允许你通过，并赠予一根独角兽尾毛基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 用食物引诱",
              "result": "你拿出珍藏的果实，独角兽吃完后满意地离开，留下了一些魔法粉尘。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 绕路而行",
              "result": "你选择绕路，却意外发现了独角兽的草药园，生命恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "legend_realm"
    },
    {
      "id": "celestial_zenith",
      "name": "苍穹天阙",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "天界罡风",
        "effect": "天界的罡风呼啸而过，地面生物在风中艰难前行，而飞行生物则如鱼得水。每回合开始，所有地面单位速度降低10%，飞行单位闪避率提高15%。",
        "immuneTag": null,
        "speedPenalty": 10
      },
      "events": [
        {
          "id": "celestial_zenith_event_1",
          "mapId": "celestial_zenith",
          "name": "彩虹桥",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一道绚丽的彩虹桥横跨天际，桥面上流淌着七彩的光芒。",
          "options": [
            {
              "text": "A. 走过彩虹桥",
              "result": "你踏上桥，每走一步都有一种元素力量涌入体内，获得复合基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 收集彩虹光",
              "result": "你收集了一束彩虹光，它凝聚成高能结晶体。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 在桥下沐浴光雨",
              "result": "彩虹洒下的光雨有治疗效果，你的生命值大幅恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 40
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "legend_temple",
      "name": "传说圣殿",
      "description": "传说中所有英雄最终归宿的圣殿，这里收藏着无数传说中的宝物和知识。只有通过重重试炼的人才能进入圣殿的最深处。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "神圣试炼",
        "effect": "神圣的试炼在圣殿中进行，玩家获得神的祝福，但敌人也变得更加强大。玩家全属性+10%，但敌人强度+25%，这是对强者的试炼。",
        "mechanic": "player_buff_enemy_stronger",
        "playerBonus": 10,
        "enemyBonus": 25,
        "attackBonus": 10,
        "defenseBonus": 10,
        "speedBonus": 10
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "圣殿祝福",
          "description": "接受圣殿的祝福，恢复50%生命和能量",
          "effect": {
            "type": "full_restore"
          }
        },
        {
          "id": "rest_skill",
          "name": "圣殿试炼",
          "description": "接受额外试炼，全属性+20%（5回合）但受到20点伤害",
          "effect": {
            "type": "buff_all",
            "value": 20,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "temple_1",
          "mapId": "legend_temple",
          "name": "圣殿守卫",
          "description": "一个由神圣力量构成的守卫挡在圣殿入口，它说只有通过试炼的人才能进入。",
          "options": [
            {
              "text": "击败守卫",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            },
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 20
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 40
                }
              ]
            },
            {
              "text": "请求放行",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 5,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "temple_2",
          "mapId": "legend_temple",
          "name": "英雄的雕像",
          "description": "圣殿的走廊上排列着无数英雄的雕像，每一座都记载着一段传奇。",
          "options": [
            {
              "text": "研究雕像学习技巧",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 55
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "向英雄祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 30
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集雕像碎片",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "temple_3",
          "mapId": "legend_temple",
          "name": "知识殿堂",
          "description": "一个收藏着无数知识的殿堂，书架上的书籍记载着世界的真相。",
          "options": [
            {
              "text": "阅读古籍",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "buff_evolution",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "寻找禁书",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "快速浏览",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 30
                },
                {
                  "type": "buff_perception",
                  "value": 3,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "temple_4",
          "mapId": "legend_temple",
          "name": "宝物库",
          "description": "圣殿的宝物库，里面收藏着无数传说中的宝物，但也有强大的守护机关。",
          "options": [
            {
              "text": "搜刮宝物",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_gold",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "只取一件宝物",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_gold",
                  "value": 50
                }
              ]
            },
            {
              "text": "不碰宝物",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "temple_5",
          "mapId": "legend_temple",
          "name": "试炼之间",
          "description": "一个用于试炼勇者的房间，地面上刻着复杂的魔法阵。",
          "options": [
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "研究魔法阵",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "buff_evolution",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "绕过试炼",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "temple_6",
          "mapId": "legend_temple",
          "name": "治愈之泉",
          "description": "圣殿深处的一处神奇泉水，据说能治愈一切伤痛和疾病。",
          "options": [
            {
              "text": "饮用泉水",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 60
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "在泉水中沐浴",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集泉水",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 3,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "temple_7",
          "mapId": "legend_temple",
          "name": "预言之间",
          "description": "一个能看到未来的神秘房间，水晶球中闪烁着模糊的影像。",
          "options": [
            {
              "text": "查看预言",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "改变命运",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            },
            {
              "text": "不看预言",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "temple_8",
          "mapId": "legend_temple",
          "name": "英雄的灵魂",
          "description": "一个已故英雄的灵魂在圣殿中游荡，他还在寻找着未完成的使命。",
          "options": [
            {
              "text": "帮助英雄完成使命",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "与英雄交流学习",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 55
                },
                {
                  "type": "buff_attack",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "超度英雄的灵魂",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "temple_9",
          "mapId": "legend_temple",
          "name": "圣殿核心",
          "description": "圣殿的最核心，一个巨大的能量核心在缓缓旋转，它是整个圣殿的力量来源。",
          "options": [
            {
              "text": "吸收核心能量",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "与核心共鸣",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 90
                },
                {
                  "type": "buff_evolution",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "temple_10",
          "mapId": "legend_temple",
          "name": "圣殿之主",
          "description": "圣殿的最深处，一个超越了生死的存在正在等待着你。他是所有英雄的导师，也是这片圣殿的创造者。",
          "options": [
            {
              "text": "接受最终试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求成为继承者",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 60
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "beast_divine_court",
      "name": "万兽神庭",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "神圣领域",
        "effect": "神圣的力量在神庭中流淌，所有生物都在治愈中变得更加强大。每回合开始，所有单位回复3%最大生命值，治疗效果提升15%。",
        "immuneTag": null,
        "playerHeal": 3,
        "healBonus": 15
      },
      "events": [
        {
          "id": "beast_divine_court_event_1",
          "mapId": "beast_divine_court",
          "name": "花园中的奇美拉",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "神庭花园里有一头温和的奇美拉，它正在用三个头分别品尝不同的花朵。",
          "options": [
            {
              "text": "A. 尝试与它交流",
              "result": "你成功交流，它允许你采集一些它培育的基因花卉。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 帮它摘花",
              "result": "你帮忙摘下高处的花朵，它高兴地分给你一些花蜜能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 在花园中散步",
              "result": "你漫步花园，花香四溢，身心愉悦，生命恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "beast_lair",
      "name": "万兽巢穴",
      "totalLayers": 8,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "兽群意志",
        "effect": "兽群的意志在巢穴中凝聚，数量优势在这里被无限放大。每回合开始，若一方场上单位数量多于对方，则该方攻击力提升10%。免疫标签28免疫此效果。",
        "immuneTag": 28,
        "randomEffects": [
          {
            "type": "atk",
            "value": 10,
            "target": "random",
            "desc": "兽群意志，攻击提升！"
          }
        ]
      },
      "events": [
        {
          "id": "beast_lair_event_1",
          "mapId": "beast_lair",
          "name": "菌毯网络",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "巢穴角落生长着发光的菌毯，它们连接成一个巨大的营养网络。",
          "options": [
            {
              "text": "A. 接入网络",
              "result": "你暂时接入，共享了部分营养，获得能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "B. 采集菌毯样本",
              "result": "你采集样本，获得了共生菌的基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "C. 躺在菌毯上",
              "result": "你躺上去，菌毯主动为你提供了一些疗愈物质。",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "prehistoric_colosseum",
      "name": "史前角斗场",
      "totalLayers": 10,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "角斗狂热",
        "effect": "角斗的狂热在竞技场中燃烧，所有生物都在疯狂进攻，无法退缩。每回合开始，所有单位攻击力提升5%，但无法主动脱离战斗。",
        "immuneTag": null,
        "attackBonus": 5
      },
      "events": [
        {
          "id": "prehistoric_colosseum_event_1",
          "mapId": "prehistoric_colosseum",
          "name": "沙暴突袭",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "角斗场中突然刮起一阵沙暴，视野变得极差。",
          "options": [
            {
              "text": "A. 迎着沙暴训练",
              "result": "你借机训练自己在恶劣环境中的战斗能力，获得基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 挖掘沙下避难",
              "result": "你快速挖掘沙坑躲藏，发现了一些被沙埋没的能量石。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 用沙粒打磨甲壳",
              "result": "你利用沙粒打磨外壳，使其更光滑，提升防御。",
              "effects": [
                {
                  "type": "gain_stat",
                  "stat": "vitality",
                  "value": 1
                },
                {
                  "type": "gain_stat",
                  "stat": "perception",
                  "value": 1
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "deep_mystery",
      "name": "深邃秘境",
      "totalLayers": 9,
      "eventsPerLayer": [
        3,
        5
      ],
      "environmentLaw": {
        "name": "黑暗视觉",
        "effect": "黑暗笼罩着秘境，普通生物的视线受阻，但拥有夜视能力的生物却能精准打击。每回合开始，所有单位命中率降低10%，但拥有夜视能力的单位提升10%暴击率。",
        "immuneTag": null,
        "hitPenalty": 10
      },
      "events": [
        {
          "id": "deep_mystery_event_1",
          "mapId": "deep_mystery",
          "name": "回声蘑菇",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一片散发微光的蘑菇林，你一出声它们就轻轻摇晃，发出悦耳的回声。",
          "options": [
            {
              "text": "A. 唱首歌",
              "result": "你哼起旋律，蘑菇们共鸣，释放出治疗孢子，生命恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 30
                }
              ]
            },
            {
              "text": "B. 采集蘑菇",
              "result": "你采了几朵，它们可以作为应急食物，能量不错。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 40
                }
              ]
            },
            {
              "text": "C. 研究回声",
              "result": "你研究回声定位，获得了声音相关的基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 3,
                  "tag": 24
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "divine_gate",
      "name": "神界天门",
      "description": "传说中进入神界的天门，高耸入云，门上刻着无数神文。只有通过神之试炼的人才能进入天门，一睹神界的真容。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "神威压制",
        "effect": "神威在天门压制着一切非神系生物，让它们难以发挥全部实力。所有非神系单位全属性-12%，神系天赋免疫此效果。",
        "immuneTag": "divine",
        "mechanic": "all_stat_penalty",
        "value": 12,
        "attackBonus": -12,
        "defenseBonus": -12,
        "immuneTagNum": 25
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "神泉沐浴",
          "description": "在神泉中沐浴，恢复60%生命和能量",
          "effect": {
            "type": "full_restore"
          }
        },
        {
          "id": "rest_skill",
          "name": "接受神启",
          "description": "接受神的启示，全属性+20%（5回合）",
          "effect": {
            "type": "buff_all",
            "value": 20,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "divine_gate_1",
          "mapId": "divine_gate",
          "name": "神文石碑",
          "description": "一块刻满神文的石碑，据说读懂神文的人能获得神的力量。",
          "options": [
            {
              "text": "研读神文",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_evolution",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收神文力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "拓印神文",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_2",
          "mapId": "divine_gate",
          "name": "天兵",
          "description": "一队天兵拦住了你的去路，他们用警惕的目光看着你。",
          "options": [
            {
              "text": "击败天兵",
              "effects": [
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            },
            {
              "text": "出示信物",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 30
                }
              ]
            },
            {
              "text": "绕道而行",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 3,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_3",
          "mapId": "divine_gate",
          "name": "神泉",
          "description": "一处散发着神圣光芒的泉水，据说能洗涤一切罪孽和伤痛。",
          "options": [
            {
              "text": "饮用神泉",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 60
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "在神泉中沐浴",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集神泉水",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_4",
          "mapId": "divine_gate",
          "name": "神兽",
          "description": "一只浑身散发着神光的神兽出现在你面前，它似乎在审视着你。",
          "options": [
            {
              "text": "挑战神兽",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求神兽的祝福",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_5",
          "mapId": "divine_gate",
          "name": "神之试炼",
          "description": "一个由神光构成的试炼场出现在你面前，神的声音在你耳边响起：通过试炼者，可得神位。",
          "options": [
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求简单试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "拒绝试炼",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_6",
          "mapId": "divine_gate",
          "name": "天使的羽翼",
          "description": "一根散发着金色光芒的天使羽翼飘落在你面前，它似乎还保留着天使的力量。",
          "options": [
            {
              "text": "吸收羽翼力量",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 80
                },
                {
                  "type": "buff_perception",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集天使羽翼",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "gain_gold",
                  "value": 100
                }
              ]
            },
            {
              "text": "让羽翼回归天堂",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 30
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_7",
          "mapId": "divine_gate",
          "name": "神之宝库",
          "description": "一个由神光守护的宝库，里面收藏着无数神的宝物。",
          "options": [
            {
              "text": "强行打开宝库",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_gold",
                  "value": 150
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "用神力打开宝库",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "只取一件宝物",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_gold",
                  "value": 50
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_8",
          "mapId": "divine_gate",
          "name": "堕落天使",
          "description": "一个被逐出神界的堕落天使挡在你面前，他的眼中闪烁着仇恨的光芒。",
          "options": [
            {
              "text": "击败堕落天使",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "净化堕落天使",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 12,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 60
                }
              ]
            },
            {
              "text": "与堕落天使交易",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 80
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_9",
          "mapId": "divine_gate",
          "name": "神之预言",
          "description": "一个神秘的预言家出现在你面前，他说他能看到你的未来。",
          "options": [
            {
              "text": "聆听预言",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "改变命运",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 1
                }
              ]
            },
            {
              "text": "不相信预言",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "divine_gate_10",
          "mapId": "divine_gate",
          "name": "天门守护者",
          "description": "天门的最前方，一个超越了普通神的存在正在等待着你。他是天门的守护者，只有击败他的人才能进入神界。",
          "options": [
            {
              "text": "挑战天门守护者",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求进入神界",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "gods_battlefield",
      "name": "众神战场",
      "description": "上古众神决战的战场，整片天空都被神力和魔力撕裂。在这里，每一次呼吸都能感受到毁天灭地的力量残留。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "神力激荡",
        "effect": "神力在战场上激荡，每回合都有随机的增益或减益降临到所有生物身上。每回合开始随机获得增益或减益（全属性±15%）。",
        "mechanic": "random_buff_debuff",
        "value": 15,
        "randomEffects": [
          {
            "type": "atk",
            "value": 15,
            "target": "random",
            "desc": "神力激荡，全属性提升！"
          },
          {
            "type": "atk",
            "value": -15,
            "target": "random",
            "desc": "神力反噬，全属性降低！"
          }
        ]
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "战场疗伤",
          "description": "在战场上紧急处理伤口，恢复40%生命",
          "effect": {
            "type": "heal_percent",
            "value": 40
          }
        },
        {
          "id": "rest_skill",
          "name": "激发神力",
          "description": "激发体内的神力，攻击力+35%（5回合）",
          "effect": {
            "type": "buff_attack",
            "value": 35,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "gods_bf_1",
          "mapId": "gods_battlefield",
          "name": "神器残骸",
          "description": "一件在众神之战中碎裂的神器，它的碎片还在散发着令人敬畏的力量。",
          "options": [
            {
              "text": "吸收神器力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "收集神器碎片",
              "effects": [
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "gain_gold",
                  "value": 120
                }
              ]
            },
            {
              "text": "用碎片强化自身",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_2",
          "mapId": "gods_battlefield",
          "name": "神将的遗骸",
          "description": "一具穿着神将铠甲的遗骸，他的手中还紧握着断裂的神枪。",
          "options": [
            {
              "text": "取走神将装备",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "吸收神将残余意志",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 60
                }
              ]
            },
            {
              "text": "为神将祈祷",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_3",
          "mapId": "gods_battlefield",
          "name": "神力漩涡",
          "description": "一个由纯粹神力构成的巨大漩涡在天空中旋转，它能吞噬一切靠近的东西。",
          "options": [
            {
              "text": "进入漩涡",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收神力",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "远离漩涡",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_4",
          "mapId": "gods_battlefield",
          "name": "魔力深渊",
          "description": "地面上有一个深不见底的深渊，里面涌出无尽的黑暗魔力。",
          "options": [
            {
              "text": "跳入深渊",
              "effects": [
                {
                  "type": "damage",
                  "value": 55
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收魔力",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 35
                }
              ]
            },
            {
              "text": "净化深渊",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 12,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 70
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_5",
          "mapId": "gods_battlefield",
          "name": "战死者的灵魂",
          "description": "无数在众神之战中死去的灵魂在战场上徘徊，他们还在重复着千年前的战斗。",
          "options": [
            {
              "text": "超度灵魂",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 30
                }
              ]
            },
            {
              "text": "吸收灵魂力量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            },
            {
              "text": "与灵魂交流",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_perception",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_6",
          "mapId": "gods_battlefield",
          "name": "神之武器库",
          "description": "一个收藏着无数神之武器的宝库，每一件武器都拥有毁天灭地的力量。",
          "options": [
            {
              "text": "搜刮武器库",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_gold",
                  "value": 200
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "只取一件武器",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "gain_gold",
                  "value": 80
                }
              ]
            },
            {
              "text": "不碰武器",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_7",
          "mapId": "gods_battlefield",
          "name": "神王的幻影",
          "description": "一个由神力构成的神王幻影出现在你面前，他正在重复着千年前的战斗动作。",
          "options": [
            {
              "text": "与幻影切磋",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_exp",
                  "value": 90
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察学习",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "绕过幻影",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_8",
          "mapId": "gods_battlefield",
          "name": "魔神的幻影",
          "description": "一个由魔力构成的魔神幻影出现在你面前，它的眼中闪烁着毁灭一切的光芒。",
          "options": [
            {
              "text": "击败幻影",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 80
                }
              ]
            },
            {
              "text": "吸收魔力",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 35
                }
              ]
            },
            {
              "text": "净化幻影",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 30
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_9",
          "mapId": "gods_battlefield",
          "name": "战场中央",
          "description": "你来到了众神战场的最中央，这里是神王与魔神最终决战的地方，地面上还留着一个深不见底的巨坑。",
          "options": [
            {
              "text": "进入巨坑",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在坑边修炼",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "gods_bf_10",
          "mapId": "gods_battlefield",
          "name": "众神之主",
          "description": "战场的尽头，一个同时拥有神力和魔力的超越存在正在等待着你。他是众神之战的最终胜利者，也是这片战场的主人。",
          "options": [
            {
              "text": "挑战众神之主",
              "effects": [
                {
                  "type": "damage",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 6
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求力量",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_attack",
                  "value": 35,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "creation_temple",
      "name": "创世神殿",
      "description": "传说中创世神创造世界的地方，神殿中弥漫着创世的原初力量。在这里，一切规则都可以被重新定义。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "创世之力",
        "effect": "创世的力量在神殿中流淌，所有生物的生命力和攻击力都被提升。所有单位最大生命+25%，攻击力+20%，战斗更加激烈。",
        "mechanic": "hp_attack_buff",
        "hpBonus": 25,
        "attackBonus": 20
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "创世之力恢复",
          "description": "吸收创世之力，完全恢复生命和能量",
          "effect": {
            "type": "full_restore"
          }
        },
        {
          "id": "rest_skill",
          "name": "创世祝福",
          "description": "接受创世神的祝福，全属性+25%（5回合）",
          "effect": {
            "type": "buff_all",
            "value": 25,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "creation_1",
          "mapId": "creation_temple",
          "name": "创世神纹",
          "description": "神殿的墙壁上刻满了创世神的神纹，据说读懂神纹的人能获得创造的力量。",
          "options": [
            {
              "text": "研读神纹",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_evolution",
                  "value": 8,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收神纹力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                }
              ]
            },
            {
              "text": "拓印神纹",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "creation_2",
          "mapId": "creation_temple",
          "name": "生命之泉",
          "description": "神殿深处的一处神奇泉水，据说这是创世神创造生命的地方。",
          "options": [
            {
              "text": "饮用生命之泉",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 80
                },
                {
                  "type": "gain_energy",
                  "value": 80
                },
                {
                  "type": "buff_vitality",
                  "value": 5,
                  "duration": 10
                }
              ]
            },
            {
              "text": "在泉水中沐浴",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集生命泉水",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 120
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "creation_3",
          "mapId": "creation_temple",
          "name": "元素之源",
          "description": "神殿的一个房间里，四大元素的源头在这里汇聚，形成了一个巨大的元素漩涡。",
          "options": [
            {
              "text": "吸收元素之力",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 60
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "研究元素之源",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "buff_evolution",
                  "value": 6,
                  "duration": 10
                }
              ]
            },
            {
              "text": "远离元素漩涡",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "creation_4",
          "mapId": "creation_temple",
          "name": "创世神器",
          "description": "一件传说中的创世神器静静地悬浮在神殿中央，它散发着创造一切的力量。",
          "options": [
            {
              "text": "尝试使用神器",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "吸收神器力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_energy",
                  "value": 80
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 30
                }
              ]
            }
          ]
        },
        {
          "id": "creation_5",
          "mapId": "creation_temple",
          "name": "世界的记忆",
          "description": "神殿的一个房间里，漂浮着无数光球，每个光球都记录着世界的一段历史。",
          "options": [
            {
              "text": "观看世界记忆",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "寻找自己的命运",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 80
                }
              ]
            },
            {
              "text": "不看记忆",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "creation_6",
          "mapId": "creation_temple",
          "name": "守护者",
          "description": "一个由创世之力构成的守护者挡在你面前，它说只有通过试炼的人才能继续前进。",
          "options": [
            {
              "text": "击败守护者",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_exp",
                  "value": 90
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 70
                }
              ]
            },
            {
              "text": "请求放行",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "creation_7",
          "mapId": "creation_temple",
          "name": "创世神的祝福",
          "description": "一道神圣的光芒从天而降，笼罩着你的身体，你感到一股温暖的力量在体内流动。",
          "options": [
            {
              "text": "接受祝福",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            },
            {
              "text": "吸收祝福力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "拒绝祝福",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "creation_8",
          "mapId": "creation_temple",
          "name": "时间长河",
          "description": "神殿的最深处，一条由时间构成的长河在缓缓流淌，河中能看到过去和未来的影像。",
          "options": [
            {
              "text": "进入时间长河",
              "effects": [
                {
                  "type": "damage",
                  "value": 55
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察过去和未来",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_perception",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "远离时间长河",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 8,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "creation_9",
          "mapId": "creation_temple",
          "name": "空间裂缝",
          "description": "神殿的墙壁上出现了一道空间裂缝，裂缝中能看到无数平行世界的影像。",
          "options": [
            {
              "text": "进入空间裂缝",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察平行世界",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_evolution",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "修复空间裂缝",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "creation_10",
          "mapId": "creation_temple",
          "name": "创世神",
          "description": "神殿的最深处，一个超越了一切存在的身影正在等待着你。他就是创世神，这个世界的创造者。他的力量能创造一切，也能毁灭一切。",
          "options": [
            {
              "text": "挑战创世神",
              "effects": [
                {
                  "type": "damage",
                  "value": 80
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 8
                },
                {
                  "type": "buff_all",
                  "value": 35,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求成为继承者",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 150
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 80
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 100
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "final_trial",
      "name": "终焉试炼",
      "totalLayers": 12,
      "eventsPerLayer": [
        4,
        5
      ],
      "environmentLaw": {
        "name": "终焉之力",
        "effect": "终焉的力量在试炼场中涌动，所有生物的生命力都被翻倍，战斗变得更加持久。所有单位最大生命值翻倍，每回合开始回复2%最大生命值。",
        "immuneTag": null,
        "hpBonus": 100,
        "playerHeal": 2
      },
      "events": [
        {
          "id": "final_trial_event_1",
          "mapId": "final_trial",
          "name": "时间漩涡",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一个时间漩涡出现在试炼场中，能看到过去的自己正在奋力进化。",
          "options": [
            {
              "text": "A. 帮助过去的自己",
              "result": "你给予一些能量，过去的成功让你现在获得了额外的基因感悟。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 观察时间流",
              "result": "你观察时间流动，学会了时间相关的稀有基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 1,
                  "count": 6,
                  "tag": 24
                }
              ]
            },
            {
              "text": "C. 向过去的自己挥手",
              "result": "你挥了挥手，心中释然，生命值因此得到恢复。",
              "effects": [
                {
                  "type": "heal",
                  "value": 40
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "mythic_sky"
    },
    {
      "id": "chaos_cycle",
      "name": "混沌轮回",
      "totalLayers": -1,
      "eventsPerLayer": [
        1,
        1
      ],
      "environmentLaw": {
        "name": "混沌无序",
        "effect": "混沌的力量在空间中肆虐，随机的基因标签被禁用，所有生物都在无序中挣扎。每场战斗开始时，随机禁用1种基因标签，所有单位无法获得该标签的增益。",
        "immuneTag": null,
        "randomEffects": [
          {
            "type": "atk",
            "value": -10,
            "target": "random",
            "desc": "混沌无序，力量被扰乱！"
          }
        ]
      },
      "events": [
        {
          "id": "chaos_cycle_event_1",
          "mapId": "chaos_cycle",
          "name": "混沌商人",
          "isChain": false,
          "chainId": null,
          "chainStep": null,
          "description": "一个由混沌能量构成的商人出现在你面前，愿意用记忆交换商品。",
          "options": [
            {
              "text": "A. 交易一段记忆",
              "result": "你出售一段无关紧要的记忆，获得了稀有基因。",
              "effects": [
                {
                  "type": "gain_fragment",
                  "quality": 2,
                  "count": 3,
                  "tag": 24
                }
              ]
            },
            {
              "text": "B. 购买能量",
              "result": "你用一些无用的基因碎片交换了大量能量。",
              "effects": [
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "C. 拒绝交易",
              "result": "你拒绝了，商人反而欣赏你的坚定，赠送了恢复药剂。",
              "effects": [
                {
                  "type": "heal",
                  "value": 50
                }
              ]
            }
          ]
        }
      ],
      "bossRestOptions": [
        {
          "text": "A. 原地休整（回复50%生命）",
          "effect": "heal_50"
        },
        {
          "text": "B. 基因调整（重选技能搭配）",
          "effect": "reselect_skills"
        },
        {
          "text": "C. 直接迎战",
          "effect": "none"
        }
      ],
      "eraEn": "chaos_reincarnation"
    },
    {
      "id": "chaos_abyss",
      "name": "混沌深渊",
      "description": "世界诞生之前的混沌深渊，这里没有时间和空间的概念，只有无尽的混沌在翻涌。在这里，一切规则都失去了意义。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "混沌侵蚀",
        "effect": "混沌的侵蚀在深渊中蔓延，所有生物都在不断失温，但攻击力却被激发。所有单位每回合损失5%最大生命，但攻击力+15%，战斗更加惨烈。",
        "immuneTag": "chaos",
        "mechanic": "hp_drain_attack_buff",
        "hpDrain": 5,
        "attackBuff": 15,
        "attackBonus": 15,
        "immuneTagNum": 26
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "混沌疗伤",
          "description": "用混沌之力疗伤，恢复50%生命",
          "effect": {
            "type": "heal_percent",
            "value": 50
          }
        },
        {
          "id": "rest_skill",
          "name": "吸收混沌",
          "description": "吸收混沌之力，攻击力+40%（5回合）",
          "effect": {
            "type": "buff_attack",
            "value": 40,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "chaos_abyss_1",
          "mapId": "chaos_abyss",
          "name": "混沌漩涡",
          "description": "一个由纯粹混沌构成的巨大漩涡在深渊中旋转，它能吞噬一切靠近的东西。",
          "options": [
            {
              "text": "进入漩涡",
              "effects": [
                {
                  "type": "damage",
                  "value": 55
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收混沌",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "远离漩涡",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 5,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_2",
          "mapId": "chaos_abyss",
          "name": "混沌生物",
          "description": "一只由混沌构成的生物出现在你面前，它没有固定的形态，不断地变化着。",
          "options": [
            {
              "text": "击败混沌生物",
              "effects": [
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "吸收混沌生物",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                }
              ]
            },
            {
              "text": "观察学习",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_evolution",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_3",
          "mapId": "chaos_abyss",
          "name": "规则碎片",
          "description": "一块闪烁着光芒的规则碎片漂浮在混沌中，据说这是世界规则的原始形态。",
          "options": [
            {
              "text": "吸收规则碎片",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 80
                }
              ]
            },
            {
              "text": "研究规则碎片",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_evolution",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集规则碎片",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 150
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_4",
          "mapId": "chaos_abyss",
          "name": "混沌之眼",
          "description": "一只巨大的眼睛在混沌中睁开，它的目光能穿透一切，看到事物的本质。",
          "options": [
            {
              "text": "与混沌之眼对视",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 25
                },
                {
                  "type": "gain_exp",
                  "value": 70
                }
              ]
            },
            {
              "text": "吸收目光",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "避开目光",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 8,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_5",
          "mapId": "chaos_abyss",
          "name": "混沌之心",
          "description": "一颗由纯粹混沌构成的心脏在深渊中跳动，每一次跳动都能让整个深渊颤抖。",
          "options": [
            {
              "text": "吸收混沌之心",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                }
              ]
            },
            {
              "text": "与混沌之心共鸣",
              "effects": [
                {
                  "type": "buff_vitality",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "buff_attack",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_6",
          "mapId": "chaos_abyss",
          "name": "堕落的神",
          "description": "一个被混沌侵蚀的神出现在你面前，他的眼中已经没有了神性，只有无尽的混沌。",
          "options": [
            {
              "text": "击败堕落神",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "净化堕落神",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "heal_percent",
                  "value": 30
                }
              ]
            },
            {
              "text": "吸收混沌力量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 35,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_7",
          "mapId": "chaos_abyss",
          "name": "混沌风暴",
          "description": "一场由混沌构成的风暴在深渊中肆虐，风暴中能看到无数世界的诞生和毁灭。",
          "options": [
            {
              "text": "进入风暴",
              "effects": [
                {
                  "type": "damage",
                  "value": 65
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察风暴",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_evolution",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "远离风暴",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 10,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_8",
          "mapId": "chaos_abyss",
          "name": "世界的种子",
          "description": "一颗散发着光芒的种子漂浮在混沌中，据说这是新世界诞生的种子。",
          "options": [
            {
              "text": "吸收种子力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "gain_energy",
                  "value": 80
                }
              ]
            },
            {
              "text": "保护种子",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_vitality",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            },
            {
              "text": "不碰种子",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_9",
          "mapId": "chaos_abyss",
          "name": "混沌使者",
          "description": "一个由混沌构成的使者出现在你面前，他说他是混沌意志的化身。",
          "options": [
            {
              "text": "挑战混沌使者",
              "effects": [
                {
                  "type": "damage",
                  "value": 55
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "gain_exp",
                  "value": 90
                }
              ]
            },
            {
              "text": "接受混沌意志",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 40,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "拒绝混沌意志",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "chaos_abyss_10",
          "mapId": "chaos_abyss",
          "name": "混沌之主",
          "description": "深渊的最深处，一个超越了一切存在的身影正在等待着你。他是混沌的化身，是世界诞生之前的唯一存在。他的力量能创造一切，也能毁灭一切。",
          "options": [
            {
              "text": "挑战混沌之主",
              "effects": [
                {
                  "type": "damage",
                  "value": 80
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 8
                },
                {
                  "type": "buff_all",
                  "value": 35,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求成为继承者",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 150
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 80
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 100
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "chaos_reincarnation"
    },
    {
      "id": "reincarnation_gate",
      "name": "轮回之门",
      "description": "连接所有轮回的神秘之门，门前有无数灵魂在等待着轮回。穿过这扇门，就能开始新的轮回，获得新的生命。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "轮回之力",
        "effect": "轮回的力量在门后涌动，每3回合所有生物的状态都被重置，生命得到部分恢复。每3回合所有单位重置所有状态，生命恢复30%，战斗充满变数。",
        "mechanic": "periodic_reset",
        "resetInterval": 3,
        "healPercent": 30,
        "interval": 3,
        "playerHeal": 30
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "轮回恢复",
          "description": "借助轮回之力，完全恢复生命和能量",
          "effect": {
            "type": "full_restore"
          }
        },
        {
          "id": "rest_skill",
          "name": "轮回祝福",
          "description": "接受轮回的祝福，全属性+25%（5回合）",
          "effect": {
            "type": "buff_all",
            "value": 25,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "reincarnation_1",
          "mapId": "reincarnation_gate",
          "name": "等待轮回的灵魂",
          "description": "无数灵魂在轮回之门前等待，他们的眼中充满了对新生的渴望。",
          "options": [
            {
              "text": "超度灵魂",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 30
                }
              ]
            },
            {
              "text": "吸收灵魂力量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_energy",
                  "value": 50
                }
              ]
            },
            {
              "text": "与灵魂交流",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 60
                },
                {
                  "type": "buff_perception",
                  "value": 8,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_2",
          "mapId": "reincarnation_gate",
          "name": "前世的记忆",
          "description": "一道光芒闪过，你看到了自己前世的记忆，那是一段完全不同的人生。",
          "options": [
            {
              "text": "观看前世记忆",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_perception",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收前世力量",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "忘记前世",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 8
                },
                {
                  "type": "heal_percent",
                  "value": 20
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_3",
          "mapId": "reincarnation_gate",
          "name": "轮回守护者",
          "description": "一个守护轮回之门的存在出现在你面前，他说只有通过试炼的人才能穿过轮回之门。",
          "options": [
            {
              "text": "击败守护者",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_exp",
                  "value": 90
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "接受试炼",
              "effects": [
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 70
                }
              ]
            },
            {
              "text": "请求放行",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_4",
          "mapId": "reincarnation_gate",
          "name": "孟婆汤",
          "description": "一碗散发着奇异香气的汤出现在你面前，据说喝了它就能忘记前世的一切。",
          "options": [
            {
              "text": "喝下孟婆汤",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 60
                },
                {
                  "type": "buff_all",
                  "value": 12,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "倒掉孟婆汤",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 50
                }
              ]
            },
            {
              "text": "收集孟婆汤",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 100
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_5",
          "mapId": "reincarnation_gate",
          "name": "三生石",
          "description": "一块刻满名字的石头出现在你面前，据说这是记录所有轮回的三生石。",
          "options": [
            {
              "text": "查看自己的名字",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "吸收三生石力量",
              "effects": [
                {
                  "type": "buff_vitality",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "buff_defense",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "不看三生石",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 8,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_6",
          "mapId": "reincarnation_gate",
          "name": "轮回兽",
          "description": "一只守护轮回的神兽出现在你面前，它的身上有无数轮回的印记。",
          "options": [
            {
              "text": "挑战轮回兽",
              "effects": [
                {
                  "type": "damage",
                  "value": 50
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                },
                {
                  "type": "gain_exp",
                  "value": 80
                }
              ]
            },
            {
              "text": "请求轮回兽的祝福",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "gain_exp",
                  "value": 60
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 8
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_7",
          "mapId": "reincarnation_gate",
          "name": "忘川河",
          "description": "一条流淌着遗忘之水的河流在门前流过，河中能看到无数被遗忘的记忆。",
          "options": [
            {
              "text": "饮用忘川河水",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "buff_all",
                  "value": 10,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 20
                }
              ]
            },
            {
              "text": "在河中沐浴",
              "effects": [
                {
                  "type": "heal_percent",
                  "value": 40
                },
                {
                  "type": "buff_defense",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集忘川水",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 120
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 2
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_8",
          "mapId": "reincarnation_gate",
          "name": "轮回的裂缝",
          "description": "轮回之门上出现了一道裂缝，裂缝中能看到无数平行轮回的影像。",
          "options": [
            {
              "text": "进入裂缝",
              "effects": [
                {
                  "type": "damage",
                  "value": 55
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                },
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察平行轮回",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 100
                },
                {
                  "type": "buff_evolution",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "修复裂缝",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_9",
          "mapId": "reincarnation_gate",
          "name": "轮回使者",
          "description": "一个引导灵魂轮回的使者出现在你面前，他说他能看到你的所有轮回。",
          "options": [
            {
              "text": "询问自己的轮回",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_perception",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求使者的帮助",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 18,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "拒绝使者",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "reincarnation_10",
          "mapId": "reincarnation_gate",
          "name": "轮回之主",
          "description": "轮回之门的最深处，一个掌控所有轮回的存在正在等待着你。他是轮回的化身，决定着所有生命的轮回命运。他的力量能让一切重新开始，也能让一切永远终结。",
          "options": [
            {
              "text": "挑战轮回之主",
              "effects": [
                {
                  "type": "damage",
                  "value": 80
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 8
                },
                {
                  "type": "buff_all",
                  "value": 35,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求成为继承者",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 150
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 80
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 20,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 100
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "chaos_reincarnation"
    },
    {
      "id": "infinite_void",
      "name": "无限虚空",
      "description": "超越了轮回和混沌的无限虚空，这里什么都没有，又什么都有。在这片虚空中，你能感受到自己就是一切，一切就是自己。",
      "totalLayers": 5,
      "environmentLaw": {
        "name": "虚空吞噬",
        "effect": "虚空的吞噬在空间中弥漫，所有生物的能量消耗都被增加，但技能伤害也被提升。所有单位能量消耗+50%，但技能伤害+30%，技能成为胜负关键。",
        "immuneTag": "void",
        "mechanic": "energy_cost_damage_buff",
        "energyCostIncrease": 50,
        "skillDamageBuff": 30,
        "attackBonus": 30,
        "immuneTagNum": 25
      },
      "bossRestOptions": [
        {
          "id": "rest_heal",
          "name": "虚空恢复",
          "description": "从虚空中汲取力量，恢复60%生命和能量",
          "effect": {
            "type": "heal_percent",
            "value": 60
          }
        },
        {
          "id": "rest_skill",
          "name": "虚空共鸣",
          "description": "与虚空共鸣，技能伤害+50%（5回合）",
          "effect": {
            "type": "buff_attack",
            "value": 50,
            "duration": 5
          }
        },
        {
          "id": "rest_fight",
          "name": "直接迎战",
          "description": "不做休整",
          "effect": {
            "type": "none"
          }
        }
      ],
      "events": [
        {
          "id": "void_1",
          "mapId": "infinite_void",
          "name": "虚空碎片",
          "description": "一块散发着虚无光芒的碎片漂浮在虚空中，据说这是虚空的原始形态。",
          "options": [
            {
              "text": "吸收虚空碎片",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 18,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 80
                },
                {
                  "type": "damage",
                  "value": 25
                }
              ]
            },
            {
              "text": "研究虚空碎片",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 90
                },
                {
                  "type": "buff_evolution",
                  "value": 10,
                  "duration": 10
                }
              ]
            },
            {
              "text": "收集虚空碎片",
              "effects": [
                {
                  "type": "gain_gold",
                  "value": 150
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            }
          ]
        },
        {
          "id": "void_2",
          "mapId": "infinite_void",
          "name": "虚空生物",
          "description": "一只由纯粹虚空构成的生物出现在你面前，它没有实体，却能吞噬一切。",
          "options": [
            {
              "text": "击败虚空生物",
              "effects": [
                {
                  "type": "damage",
                  "value": 45
                },
                {
                  "type": "gain_exp",
                  "value": 80
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "吸收虚空生物",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 35
                },
                {
                  "type": "gain_energy",
                  "value": 60
                }
              ]
            },
            {
              "text": "观察学习",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 70
                },
                {
                  "type": "buff_perception",
                  "value": 10,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "void_3",
          "mapId": "infinite_void",
          "name": "虚空之眼",
          "description": "一只由虚空构成的巨大眼睛在虚空中睁开，它的目光能穿透一切维度。",
          "options": [
            {
              "text": "与虚空之眼对视",
              "effects": [
                {
                  "type": "buff_perception",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 30
                },
                {
                  "type": "gain_exp",
                  "value": 80
                }
              ]
            },
            {
              "text": "吸收目光",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "buff_perception",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "避开目光",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 10,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "void_4",
          "mapId": "infinite_void",
          "name": "维度裂缝",
          "description": "虚空中出现了一道维度裂缝，裂缝中能看到无数平行维度的影像。",
          "options": [
            {
              "text": "进入维度裂缝",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察平行维度",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_evolution",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "修复维度裂缝",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 15,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "id": "void_5",
          "mapId": "infinite_void",
          "name": "虚空之心",
          "description": "一颗由纯粹虚空构成的心脏在虚空中跳动，每一次跳动都能让整个虚空震颤。",
          "options": [
            {
              "text": "吸收虚空之心",
              "effects": [
                {
                  "type": "damage",
                  "value": 65
                },
                {
                  "type": "buff_all",
                  "value": 35,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                }
              ]
            },
            {
              "text": "与虚空之心共鸣",
              "effects": [
                {
                  "type": "buff_vitality",
                  "value": 12,
                  "duration": 10
                },
                {
                  "type": "buff_attack",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 50
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 30,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "void_6",
          "mapId": "infinite_void",
          "name": "堕落的虚空神",
          "description": "一个被虚空吞噬的神出现在你面前，他已经失去了自我，成为了虚空的一部分。",
          "options": [
            {
              "text": "击败虚空神",
              "effects": [
                {
                  "type": "damage",
                  "value": 55
                },
                {
                  "type": "gain_exp",
                  "value": 110
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 4
                }
              ]
            },
            {
              "text": "净化虚空神",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 18,
                  "duration": 10
                },
                {
                  "type": "gain_exp",
                  "value": 90
                },
                {
                  "type": "heal_percent",
                  "value": 40
                }
              ]
            },
            {
              "text": "吸收虚空力量",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 40,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 45
                }
              ]
            }
          ]
        },
        {
          "id": "void_7",
          "mapId": "infinite_void",
          "name": "虚空风暴",
          "description": "一场由虚空构成的风暴在虚空中肆虐，风暴中能看到无数世界的诞生和毁灭。",
          "options": [
            {
              "text": "进入风暴",
              "effects": [
                {
                  "type": "damage",
                  "value": 70
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 6
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                }
              ]
            },
            {
              "text": "观察风暴",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 130
                },
                {
                  "type": "buff_evolution",
                  "value": 15,
                  "duration": 10
                }
              ]
            },
            {
              "text": "远离风暴",
              "effects": [
                {
                  "type": "buff_agility",
                  "value": 12,
                  "duration": 5
                }
              ]
            }
          ]
        },
        {
          "id": "void_8",
          "mapId": "infinite_void",
          "name": "一切的起源",
          "description": "虚空中出现了一个光点，据说这是一切的起源，也是一切的终点。",
          "options": [
            {
              "text": "吸收起源之力",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 60
                },
                {
                  "type": "gain_energy",
                  "value": 100
                }
              ]
            },
            {
              "text": "保护起源",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 120
                },
                {
                  "type": "buff_vitality",
                  "value": 12,
                  "duration": 10
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 3
                }
              ]
            },
            {
              "text": "不碰起源",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 25,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "void_9",
          "mapId": "infinite_void",
          "name": "虚空使者",
          "description": "一个由虚空构成的使者出现在你面前，他说他是虚空意志的化身。",
          "options": [
            {
              "text": "挑战虚空使者",
              "effects": [
                {
                  "type": "damage",
                  "value": 60
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 5
                },
                {
                  "type": "gain_exp",
                  "value": 100
                }
              ]
            },
            {
              "text": "接受虚空意志",
              "effects": [
                {
                  "type": "buff_attack",
                  "value": 45,
                  "duration": 10
                },
                {
                  "type": "damage",
                  "value": 40
                },
                {
                  "type": "buff_all",
                  "value": 12,
                  "duration": 10
                }
              ]
            },
            {
              "text": "拒绝虚空意志",
              "effects": [
                {
                  "type": "buff_defense",
                  "value": 35,
                  "duration": 10
                },
                {
                  "type": "buff_perception",
                  "value": 12,
                  "duration": 10
                }
              ]
            }
          ]
        },
        {
          "id": "void_10",
          "mapId": "infinite_void",
          "name": "虚空之主",
          "description": "虚空的最深处，一个超越了一切存在的身影正在等待着你。他是虚空的化身，是一切的起源和终点。他的力量能创造一切，也能毁灭一切。据说他就是所有生物的共同祖先，整个旅程就是在重走他曾经的进化之路。",
          "options": [
            {
              "text": "挑战虚空之主",
              "effects": [
                {
                  "type": "damage",
                  "value": 90
                },
                {
                  "type": "gain_fragments",
                  "quality": 4,
                  "value": 10
                },
                {
                  "type": "buff_all",
                  "value": 40,
                  "duration": 10
                }
              ]
            },
            {
              "text": "请求成为继承者",
              "effects": [
                {
                  "type": "gain_exp",
                  "value": 200
                },
                {
                  "type": "buff_all",
                  "value": 30,
                  "duration": 10
                },
                {
                  "type": "heal_percent",
                  "value": 100
                }
              ]
            },
            {
              "text": "敬畏地离开",
              "effects": [
                {
                  "type": "buff_all",
                  "value": 25,
                  "duration": 10
                },
                {
                  "type": "gain_energy",
                  "value": 150
                }
              ]
            }
          ]
        }
      ],
      "eraEn": "chaos_reincarnation"
    }
  ]
},
  shop: {
  "consumables": [
    {
      "id": "con_health_small",
      "name": "再生孢子",
      "type": "consumable",
      "category": "heal",
      "icon": "seedling",
      "description": "注入再生基因的孢子，能快速修复受损的细胞组织",
      "effect": {
        "type": "heal_percent",
        "value": 25
      },
      "price": {
        "currency": "gold",
        "amount": 25
      },
      "limitPerRun": 5
    },
    {
      "id": "con_health_large",
      "name": "愈合囊肿",
      "type": "consumable",
      "category": "heal",
      "icon": "heartGreen",
      "description": "蕴含强大再生能力的基因囊肿，能在短时间内治愈重伤",
      "effect": {
        "type": "heal_percent",
        "value": 60
      },
      "price": {
        "currency": "gold",
        "amount": 96
      },
      "limitPerRun": 3
    },
    {
      "id": "con_health_full",
      "name": "生命本源",
      "type": "consumable",
      "category": "heal",
      "icon": "spark",
      "description": "提取自生命起源的纯粹能量，能完全恢复身体的一切损伤",
      "effect": {
        "type": "full_restore"
      },
      "price": {
        "currency": "gold",
        "amount": 125
      },
      "limitPerRun": 2
    },
    {
      "id": "con_energy_small",
      "name": "能量腺体",
      "type": "consumable",
      "category": "energy",
      "icon": "bolt",
      "description": "能快速分泌能量激素的腺体，为身体补充战斗能量",
      "effect": {
        "type": "energy_percent",
        "value": 40
      },
      "price": {
        "currency": "gold",
        "amount": 20
      },
      "limitPerRun": 5
    },
    {
      "id": "con_energy_large",
      "name": "源能核心",
      "type": "consumable",
      "category": "energy",
      "icon": "battery",
      "description": "浓缩了大量本源能量的核心，能瞬间将能量槽充满",
      "effect": {
        "type": "energy_percent",
        "value": 80
      },
      "price": {
        "currency": "gold",
        "amount": 72
      },
      "limitPerRun": 3
    },
    {
      "id": "con_attack_boost",
      "name": "狂暴腺体",
      "type": "consumable",
      "category": "buff",
      "icon": "flame",
      "description": "分泌狂暴激素的基因腺体，激活后攻击力大幅提升",
      "effect": {
        "type": "attack_boost",
        "value": 20
      },
      "price": {
        "currency": "gold",
        "amount": 120
      },
      "limitPerRun": 2
    },
    {
      "id": "con_defense_boost",
      "name": "铁壁甲壳",
      "type": "consumable",
      "category": "buff",
      "icon": "shield",
      "description": "提取自重甲生物的基因片段，能在体表形成坚硬的甲壳",
      "effect": {
        "type": "defense_boost",
        "value": 25
      },
      "price": {
        "currency": "gold",
        "amount": 120
      },
      "limitPerRun": 2
    },
    {
      "id": "con_speed_boost",
      "name": "疾风肌腱",
      "type": "consumable",
      "category": "buff",
      "icon": "wind",
      "description": "强化肌肉纤维的基因改造，能大幅提升行动速度和反应",
      "effect": {
        "type": "speed_boost",
        "value": 15
      },
      "price": {
        "currency": "gold",
        "amount": 96
      },
      "limitPerRun": 2
    },
    {
      "id": "con_all_boost",
      "name": "全能基因",
      "type": "consumable",
      "category": "buff",
      "icon": "dna",
      "description": "蕴含全方位强化的稀有基因，能全面提升各项属性",
      "effect": {
        "type": "all_boost",
        "value": 10
      },
      "price": {
        "currency": "gold",
        "amount": 200
      },
      "limitPerRun": 1
    },
    {
      "id": "pack_fragments_1",
      "name": "基因碎片包",
      "type": "consumable",
      "category": "resource",
      "icon": "box",
      "description": "商人收集的普通基因碎片，包含10个可用碎片",
      "effect": {
        "type": "gain_fragments",
        "quality": 1,
        "value": 10
      },
      "price": {
        "currency": "gold",
        "amount": 50
      },
      "limitPerRun": 3
    },
    {
      "id": "pack_fragments_2",
      "name": "稀有基因包",
      "type": "consumable",
      "category": "resource",
      "icon": "gift",
      "description": "精心挑选的稀有基因碎片，包含5个高品质碎片",
      "effect": {
        "type": "gain_fragments",
        "quality": 2,
        "value": 5
      },
      "price": {
        "currency": "gold",
        "amount": 100
      },
      "limitPerRun": 2
    },
    {
      "id": "con_exp_boost",
      "name": "进化催化剂",
      "type": "consumable",
      "category": "special",
      "icon": "trendUp",
      "description": "加速基因进化的特殊催化剂，本局获得的经验大幅提升",
      "effect": {
        "type": "exp_boost",
        "value": 50
      },
      "price": {
        "currency": "gold",
        "amount": 144
      },
      "limitPerRun": 1
    },
    {
      "id": "con_drop_boost",
      "name": "猎食本能",
      "type": "consumable",
      "category": "special",
      "icon": "meat",
      "description": "唤醒体内的猎食本能，击杀敌人后获得更多基因碎片",
      "effect": {
        "type": "drop_boost",
        "value": 50
      },
      "price": {
        "currency": "gold",
        "amount": 150
      },
      "limitPerRun": 1
    },
    {
      "id": "con_talent_point",
      "name": "天赋精华",
      "type": "consumable",
      "category": "special",
      "icon": "star",
      "description": "浓缩了无数天赋的精华，能永久获得3点天赋点",
      "effect": {
        "type": "gain_talent_points",
        "value": 3
      },
      "price": {
        "currency": "gold",
        "amount": 150
      },
      "limitPerRun": 1
    },
    {
      "id": "con_revive",
      "name": "不死孢子",
      "type": "consumable",
      "category": "special",
      "icon": "skull",
      "description": "蕴含不死基因的神秘孢子，死亡时能自动复活一次",
      "effect": {
        "type": "revive",
        "value": 30
      },
      "price": {
        "currency": "gold",
        "amount": 250
      },
      "limitPerRun": 1
    }
  ],
  "permanentItems": [
    {
      "id": "perm_passive_slot",
      "name": "额外被动槽位",
      "type": "permanent",
      "description": "永久解锁一个额外的被动槽位",
      "effect": {
        "type": "unlock_passive_slot",
        "value": 1,
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 50
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    },
    {
      "id": "perm_energy_cap",
      "name": "能量上限提升",
      "type": "permanent",
      "description": "永久提升30点能量上限",
      "effect": {
        "type": "max_energy",
        "value": 30,
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 30
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    },
    {
      "id": "perm_fragment_bonus",
      "name": "碎片收获加成",
      "type": "permanent",
      "description": "全局基因碎片掉落数量增加10%",
      "effect": {
        "type": "fragment_drop_bonus_percent",
        "value": 10,
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 40
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    },
    {
      "id": "perm_start_item",
      "name": "开局补给",
      "type": "permanent",
      "description": "每局开始时获得一个小生命药剂",
      "effect": {
        "type": "start_with_item",
        "value": "con_health_small",
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 25
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    },
    {
      "id": "perm_death_bonus",
      "name": "死亡馈赠",
      "type": "permanent",
      "description": "死亡结算时额外获得20%天赋点",
      "effect": {
        "type": "death_talent_bonus_percent",
        "value": 20,
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 35
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    },
    {
      "id": "perm_move_speed",
      "name": "永久移速",
      "type": "permanent",
      "description": "永久增加5%移动速度（游戏内映射为先手值+5%）",
      "effect": {
        "type": "move_speed_percent",
        "value": 5,
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 20
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    },
    {
      "id": "perm_luck_perm",
      "name": "稀有感知",
      "type": "permanent",
      "description": "全局掉落品质小幅提升",
      "effect": {
        "type": "drop_quality_bonus",
        "value": 1,
        "duration": "permanent"
      },
      "price": {
        "currency": "essence",
        "amount": 45
      },
      "limitPerRun": 1,
      "stockLimit": 1,
      "refreshCycle": null,
      "icon": "upgrade"
    }
  ],
  "dailyItems": [
    {
      "id": "daily_fragment_pack_3",
      "name": "史诗碎片包",
      "type": "daily",
      "description": "获得5个品质3的基因碎片",
      "effect": {
        "type": "give_currency",
        "value": {
          "currency": "fragments_3",
          "amount": 5
        },
        "duration": "instant"
      },
      "price": {
        "currency": "fragments_2",
        "amount": 30
      },
      "limitPerRun": null,
      "stockLimit": 1,
      "refreshCycle": "daily",
      "icon": "daily"
    },
    {
      "id": "daily_essence_pack",
      "name": "精粹小包",
      "type": "daily",
      "description": "获得10个进化精粹",
      "effect": {
        "type": "give_currency",
        "value": {
          "currency": "essence",
          "amount": 10
        },
        "duration": "instant"
      },
      "price": {
        "currency": "fragments_3",
        "amount": 50
      },
      "limitPerRun": null,
      "stockLimit": 2,
      "refreshCycle": "daily",
      "icon": "daily"
    },
    {
      "id": "daily_random_fragment",
      "name": "随机品质碎片",
      "type": "daily",
      "description": "随机获得品质3~5的基因碎片3个",
      "effect": {
        "type": "random_fragment",
        "value": {
          "minQuality": 3,
          "maxQuality": 5,
          "amount": 3
        },
        "duration": "instant"
      },
      "price": {
        "currency": "fragments_2",
        "amount": 25
      },
      "limitPerRun": null,
      "stockLimit": 1,
      "refreshCycle": "daily",
      "icon": "daily"
    },
    {
      "id": "daily_boost_pack",
      "name": "消耗品礼包",
      "type": "daily",
      "description": "获得小生命药剂、攻击强化药剂各1个",
      "effect": {
        "type": "give_items",
        "value": [
          "con_health_small",
          "con_attack_boost"
        ],
        "duration": "instant"
      },
      "price": {
        "currency": "fragments_1",
        "amount": 40
      },
      "limitPerRun": null,
      "stockLimit": 1,
      "refreshCycle": "daily",
      "icon": "daily"
    }
  ],
  "weeklyItems": [
    {
      "id": "weekly_epic_fragment",
      "name": "传说碎片礼盒",
      "type": "weekly",
      "description": "获得3个品质4的基因碎片",
      "effect": {
        "type": "give_currency",
        "value": {
          "currency": "fragments_4",
          "amount": 3
        },
        "duration": "instant"
      },
      "price": {
        "currency": "essence",
        "amount": 80
      },
      "limitPerRun": null,
      "stockLimit": 1,
      "refreshCycle": "weekly",
      "icon": "weekly"
    },
    {
      "id": "weekly_legendary_fragment",
      "name": "神话碎片",
      "type": "weekly",
      "description": "获得1个品质5的基因碎片",
      "effect": {
        "type": "give_currency",
        "value": {
          "currency": "fragments_5",
          "amount": 1
        },
        "duration": "instant"
      },
      "price": {
        "currency": "essence",
        "amount": 150
      },
      "limitPerRun": null,
      "stockLimit": 1,
      "refreshCycle": "weekly",
      "icon": "weekly"
    },
    {
      "id": "weekly_boss_core",
      "name": "首领核心兑换",
      "type": "weekly",
      "description": "消耗进化精粹兑换一个随机首领核心",
      "effect": {
        "type": "random_boss_core",
        "value": 1,
        "duration": "instant"
      },
      "price": {
        "currency": "essence",
        "amount": 200
      },
      "limitPerRun": null,
      "stockLimit": 1,
      "refreshCycle": "weekly",
      "icon": "weekly"
    }
  ]
},
  talents_skills: {
  "talents": [
    {
      "id": "tal_claw",
      "name": "利爪",
      "quality": 1,
      "type": 3,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+4，暴击率+2%"
        },
        {
          "level": 2,
          "passive": "攻击力+6，暴击率+3%"
        },
        {
          "level": 3,
          "passive": "攻击力+8，暴击率+4%"
        },
        {
          "level": 4,
          "passive": "攻击力+10，暴击率+5%"
        },
        {
          "level": 5,
          "passive": "攻击力+12，暴击率+6%"
        }
      ],
      "advanceTo": "tal_deadly_fang"
    },
    {
      "id": "tal_bite",
      "name": "撕咬",
      "quality": 1,
      "type": 3,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，攻击时15%概率造成流血（2回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+4，攻击时20%概率造成流血（2回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+5，攻击时25%概率造成流血（2回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+6，攻击时30%概率造成流血（2回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+7，攻击时35%概率造成流血（2回合）"
        }
      ],
      "advanceTo": "tal_blood_feast"
    },
    {
      "id": "tal_poison_gland",
      "name": "剧毒腺体",
      "quality": 1,
      "type": 3,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，攻击时25%概率使目标中毒（3回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+3，攻击时30%概率使目标中毒（3回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+4，攻击时35%概率使目标中毒（3回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+5，攻击时40%概率使目标中毒（3回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+6，攻击时45%概率使目标中毒（3回合）"
        }
      ],
      "advanceTo": "tal_neurotoxin"
    },
    {
      "id": "tal_electric",
      "name": "电击",
      "quality": 1,
      "type": 3,
      "tags": [
        4
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，攻击时20%概率使目标麻痹（2回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+3，攻击时25%概率使目标麻痹（2回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+4，攻击时30%概率使目标麻痹（2回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+5，攻击时35%概率使目标麻痹（2回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+6，攻击时40%概率使目标麻痹（2回合）"
        }
      ],
      "advanceTo": "tal_thunder_power"
    },
    {
      "id": "tal_tangle_tentacle",
      "name": "缠绕触须",
      "quality": 1,
      "type": 3,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+3，攻击时15%概率束缚目标1回合"
        },
        {
          "level": 2,
          "passive": "防御力+4，攻击时20%概率束缚目标1回合"
        },
        {
          "level": 3,
          "passive": "防御力+5，攻击时25%概率束缚目标1回合"
        },
        {
          "level": 4,
          "passive": "防御力+6，攻击时30%概率束缚目标1回合"
        },
        {
          "level": 5,
          "passive": "防御力+7，攻击时35%概率束缚目标1回合"
        }
      ],
      "advanceTo": "tal_predator_web"
    },
    {
      "id": "tal_paralyze_stinger",
      "name": "麻痹刺丝",
      "quality": 1,
      "type": 3,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3"
        },
        {
          "level": 2,
          "passive": "攻击力+6"
        },
        {
          "level": 3,
          "passive": "攻击力+9"
        },
        {
          "level": 4,
          "passive": "攻击力+12"
        },
        {
          "level": 5,
          "passive": "攻击力+15"
        }
      ],
      "advanceTo": "tal_lightning_reflex"
    },
    {
      "id": "tal_fire_breath",
      "name": "火焰吐息",
      "quality": 1,
      "type": 3,
      "tags": [
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，攻击时25%概率使目标灼烧（3回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+3，攻击时30%概率使目标灼烧（3回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+4，攻击时35%概率使目标灼烧（3回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+5，攻击时40%概率使目标灼烧（3回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+6，攻击时45%概率使目标灼烧（3回合）"
        }
      ],
      "advanceTo": "tal_fire_breath_2"
    },
    {
      "id": "tal_ice_shell",
      "name": "寒冰外壳",
      "quality": 1,
      "type": 1,
      "tags": [
        7
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，受到攻击时15%概率使攻击者减速（2回合）"
        },
        {
          "level": 2,
          "passive": "防御力+6，受到攻击时20%概率使攻击者减速（2回合）"
        },
        {
          "level": 3,
          "passive": "防御力+8，受到攻击时25%概率使攻击者减速（2回合）"
        },
        {
          "level": 4,
          "passive": "防御力+10，受到攻击时30%概率使攻击者减速（2回合）"
        },
        {
          "level": 5,
          "passive": "防御力+12，受到攻击时35%概率使攻击者减速（2回合）"
        }
      ],
      "advanceTo": "tal_frost_armor"
    },
    {
      "id": "tal_thick_skin",
      "name": "厚皮",
      "quality": 1,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+20，防御力+2"
        },
        {
          "level": 2,
          "passive": "生命值+30，防御力+3"
        },
        {
          "level": 3,
          "passive": "生命值+40，防御力+4"
        },
        {
          "level": 4,
          "passive": "生命值+50，防御力+5"
        },
        {
          "level": 5,
          "passive": "生命值+60，防御力+6"
        }
      ],
      "advanceTo": "tal_iron_wall"
    },
    {
      "id": "tal_shell",
      "name": "甲壳",
      "quality": 1,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+5，生命值+10"
        },
        {
          "level": 2,
          "passive": "防御力+7，生命值+15"
        },
        {
          "level": 3,
          "passive": "防御力+9，生命值+20"
        },
        {
          "level": 4,
          "passive": "防御力+11，生命值+25"
        },
        {
          "level": 5,
          "passive": "防御力+13，生命值+30"
        }
      ]
    },
    {
      "id": "tal_regeneration",
      "name": "再生",
      "quality": 1,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复3点生命"
        },
        {
          "level": 2,
          "passive": "每回合回复4点生命"
        },
        {
          "level": 3,
          "passive": "每回合回复5点生命"
        },
        {
          "level": 4,
          "passive": "每回合回复6点生命"
        },
        {
          "level": 5,
          "passive": "每回合回复7点生命"
        }
      ],
      "advanceTo": "tal_super_regeneration"
    },
    {
      "id": "tal_mimicry",
      "name": "拟态",
      "quality": 1,
      "type": 1,
      "tags": [
        11
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+5，闪避率+3%"
        },
        {
          "level": 2,
          "passive": "先手值+7，闪避率+4%"
        },
        {
          "level": 3,
          "passive": "先手值+9，闪避率+5%"
        },
        {
          "level": 4,
          "passive": "先手值+11，闪避率+6%"
        },
        {
          "level": 5,
          "passive": "先手值+13，闪避率+7%"
        }
      ],
      "advanceTo": "tal_perfect_camouflage"
    },
    {
      "id": "tal_thorns",
      "name": "反伤棘刺",
      "quality": 1,
      "type": 2,
      "tags": [
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，受到攻击时30%概率反弹20%伤害"
        },
        {
          "level": 2,
          "passive": "防御力+6，受到攻击时35%概率反弹27%伤害"
        },
        {
          "level": 3,
          "passive": "防御力+8，受到攻击时40%概率反弹34%伤害"
        },
        {
          "level": 4,
          "passive": "防御力+10，受到攻击时45%概率反弹41%伤害"
        },
        {
          "level": 5,
          "passive": "防御力+12，受到攻击时50%概率反弹48%伤害"
        }
      ],
      "advanceTo": "tal_spike_armor"
    },
    {
      "id": "tal_hardened_bone",
      "name": "硬化骨骼",
      "quality": 1,
      "type": 1,
      "tags": [
        13
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+6，受到暴击伤害-5%"
        },
        {
          "level": 2,
          "passive": "防御力+9，受到暴击伤害-7%"
        },
        {
          "level": 3,
          "passive": "防御力+12，受到暴击伤害-9%"
        },
        {
          "level": 4,
          "passive": "防御力+15，受到暴击伤害-11%"
        },
        {
          "level": 5,
          "passive": "防御力+18，受到暴击伤害-13%"
        }
      ],
      "advanceTo": "tal_titanium_bone"
    },
    {
      "id": "tal_flight",
      "name": "飞行",
      "quality": 1,
      "type": 1,
      "tags": [
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+6，闪避率+2%"
        },
        {
          "level": 2,
          "passive": "先手值+9，闪避率+3%"
        },
        {
          "level": 3,
          "passive": "先手值+12，闪避率+4%"
        },
        {
          "level": 4,
          "passive": "先手值+15，闪避率+5%"
        },
        {
          "level": 5,
          "passive": "先手值+18，闪避率+6%"
        }
      ],
      "advanceTo": "tal_high_altitude"
    },
    {
      "id": "tal_swift_nerve",
      "name": "迅捷神经",
      "quality": 1,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+5，暴击率+2%"
        },
        {
          "level": 2,
          "passive": "先手值+7，暴击率+3%"
        },
        {
          "level": 3,
          "passive": "先手值+9，暴击率+4%"
        },
        {
          "level": 4,
          "passive": "先手值+11，暴击率+5%"
        },
        {
          "level": 5,
          "passive": "先手值+13，暴击率+6%"
        }
      ]
    },
    {
      "id": "tal_leap",
      "name": "跳跃",
      "quality": 1,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+3，攻击力+2，闪避率+2%"
        },
        {
          "level": 2,
          "passive": "先手值+4，攻击力+3，闪避率+3%"
        },
        {
          "level": 3,
          "passive": "先手值+5，攻击力+4，闪避率+4%"
        },
        {
          "level": 4,
          "passive": "先手值+6，攻击力+5，闪避率+5%"
        },
        {
          "level": 5,
          "passive": "先手值+7，攻击力+6，闪避率+6%"
        }
      ]
    },
    {
      "id": "tal_ambush",
      "name": "潜伏",
      "quality": 1,
      "type": 1,
      "tags": [
        17
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "暴击率+5%，先手值+2"
        },
        {
          "level": 2,
          "passive": "暴击率+7%，先手值+3"
        },
        {
          "level": 3,
          "passive": "暴击率+9%，先手值+4"
        },
        {
          "level": 4,
          "passive": "暴击率+11%，先手值+5"
        },
        {
          "level": 5,
          "passive": "暴击率+13%，先手值+6"
        }
      ]
    },
    {
      "id": "tal_swimming",
      "name": "游泳",
      "quality": 1,
      "type": 1,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+4，水中伤害+5%"
        },
        {
          "level": 2,
          "passive": "先手值+6，水中伤害+7%"
        },
        {
          "level": 3,
          "passive": "先手值+8，水中伤害+9%"
        },
        {
          "level": 4,
          "passive": "先手值+10，水中伤害+11%"
        },
        {
          "level": 5,
          "passive": "先手值+12，水中伤害+13%"
        }
      ]
    },
    {
      "id": "tal_ultrasonic",
      "name": "超声波",
      "quality": 1,
      "type": 1,
      "tags": [
        22
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+3%，先手值+2"
        },
        {
          "level": 2,
          "passive": "命中率+4%，先手值+3"
        },
        {
          "level": 3,
          "passive": "命中率+5%，先手值+4"
        },
        {
          "level": 4,
          "passive": "命中率+6%，先手值+5"
        },
        {
          "level": 5,
          "passive": "命中率+7%，先手值+6"
        }
      ]
    },
    {
      "id": "tal_heat_sense",
      "name": "热感应",
      "quality": 1,
      "type": 1,
      "tags": [
        20
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+3%，暴击率+2%"
        },
        {
          "level": 2,
          "passive": "命中率+4%，暴击率+3%"
        },
        {
          "level": 3,
          "passive": "命中率+5%，暴击率+4%"
        },
        {
          "level": 4,
          "passive": "命中率+6%，暴击率+5%"
        },
        {
          "level": 5,
          "passive": "命中率+7%，暴击率+6%"
        }
      ]
    },
    {
      "id": "tal_night_vision",
      "name": "夜视",
      "quality": 1,
      "type": 1,
      "tags": [
        21
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+3%，闪避率+2%"
        },
        {
          "level": 2,
          "passive": "命中率+4%，闪避率+3%"
        },
        {
          "level": 3,
          "passive": "命中率+5%，闪避率+4%"
        },
        {
          "level": 4,
          "passive": "命中率+6%，闪避率+5%"
        },
        {
          "level": 5,
          "passive": "命中率+7%，闪避率+6%"
        }
      ]
    },
    {
      "id": "tal_sonar",
      "name": "声呐",
      "quality": 1,
      "type": 1,
      "tags": [
        22
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+3%，先手值+1"
        },
        {
          "level": 2,
          "passive": "命中率+4%，先手值+2"
        },
        {
          "level": 3,
          "passive": "命中率+5%，先手值+3"
        },
        {
          "level": 4,
          "passive": "命中率+6%，先手值+4"
        },
        {
          "level": 5,
          "passive": "命中率+7%，先手值+5"
        }
      ]
    },
    {
      "id": "tal_psionic_sense",
      "name": "灵能感知",
      "quality": 1,
      "type": 1,
      "tags": [
        21
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+3，命中率+2%，暴击率+1%"
        },
        {
          "level": 2,
          "passive": "先手值+4，命中率+3%，暴击率+2%"
        },
        {
          "level": 3,
          "passive": "先手值+5，命中率+4%，暴击率+3%"
        },
        {
          "level": 4,
          "passive": "先手值+6，命中率+5%，暴击率+4%"
        },
        {
          "level": 5,
          "passive": "先手值+7，命中率+6%，暴击率+5%"
        }
      ]
    },
    {
      "id": "tal_stench",
      "name": "腐臭气息",
      "quality": 1,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，攻击时30%概率降低目标攻击力15%（2回合）"
        },
        {
          "level": 2,
          "passive": "防御力+6，攻击时35%概率降低目标攻击力20%（2回合）"
        },
        {
          "level": 3,
          "passive": "防御力+8，攻击时40%概率降低目标攻击力25%（2回合）"
        },
        {
          "level": 4,
          "passive": "防御力+10，攻击时45%概率降低目标攻击力30%（2回合）"
        },
        {
          "level": 5,
          "passive": "防御力+12，攻击时50%概率降低目标攻击力35%（2回合）"
        }
      ]
    },
    {
      "id": "tal_slime",
      "name": "粘液",
      "quality": 1,
      "type": 2,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+4，攻击时20%概率减速目标（2回合）"
        },
        {
          "level": 2,
          "passive": "先手值+6，攻击时25%概率减速目标（2回合）"
        },
        {
          "level": 3,
          "passive": "先手值+8，攻击时30%概率减速目标（2回合）"
        },
        {
          "level": 4,
          "passive": "先手值+10，攻击时35%概率减速目标（2回合）"
        },
        {
          "level": 5,
          "passive": "先手值+12，攻击时40%概率减速目标（2回合）"
        }
      ]
    },
    {
      "id": "tal_vampire",
      "name": "吸血",
      "quality": 1,
      "type": 2,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，攻击时25%概率吸取造成伤害的20%为生命"
        },
        {
          "level": 2,
          "passive": "攻击力+4，攻击时30%概率吸取造成伤害的27%为生命"
        },
        {
          "level": 3,
          "passive": "攻击力+5，攻击时35%概率吸取造成伤害的34%为生命"
        },
        {
          "level": 4,
          "passive": "攻击力+6，攻击时40%概率吸取造成伤害的41%为生命"
        },
        {
          "level": 5,
          "passive": "攻击力+7，攻击时45%概率吸取造成伤害的48%为生命"
        }
      ]
    },
    {
      "id": "tal_water_sac",
      "name": "储水囊",
      "quality": 1,
      "type": 1,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+20，能量上限+10"
        },
        {
          "level": 2,
          "passive": "生命值+30，能量上限+10"
        },
        {
          "level": 3,
          "passive": "生命值+40，能量上限+10"
        },
        {
          "level": 4,
          "passive": "生命值+50，能量上限+10"
        },
        {
          "level": 5,
          "passive": "生命值+60，能量上限+10"
        }
      ]
    },
    {
      "id": "tal_heat_resistant_shell",
      "name": "耐热甲壳",
      "quality": 1,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，火焰抗性+10%"
        },
        {
          "level": 2,
          "passive": "防御力+6，火焰抗性+13%"
        },
        {
          "level": 3,
          "passive": "防御力+8，火焰抗性+16%"
        },
        {
          "level": 4,
          "passive": "防御力+10，火焰抗性+19%"
        },
        {
          "level": 5,
          "passive": "防御力+12，火焰抗性+22%"
        }
      ]
    },
    {
      "id": "tal_thick_fur",
      "name": "厚毛皮",
      "quality": 1,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+15，寒冷抗性+10%"
        },
        {
          "level": 2,
          "passive": "生命值+22，寒冷抗性+13%"
        },
        {
          "level": 3,
          "passive": "生命值+29，寒冷抗性+16%"
        },
        {
          "level": 4,
          "passive": "生命值+36，寒冷抗性+19%"
        },
        {
          "level": 5,
          "passive": "生命值+43，寒冷抗性+22%"
        }
      ]
    },
    {
      "id": "tal_blade_tail",
      "name": "利刃尾",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5，暴击率+3%"
        },
        {
          "level": 2,
          "passive": "攻击力+7，暴击率+4%"
        },
        {
          "level": 3,
          "passive": "攻击力+9，暴击率+5%"
        },
        {
          "level": 4,
          "passive": "攻击力+11，暴击率+6%"
        },
        {
          "level": 5,
          "passive": "攻击力+13，暴击率+7%"
        }
      ]
    },
    {
      "id": "tal_poison_sac",
      "name": "毒囊",
      "quality": 1,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，攻击时20%概率使目标中毒（3回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+4，攻击时25%概率使目标中毒（3回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+5，攻击时30%概率使目标中毒（3回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+6，攻击时35%概率使目标中毒（3回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+7，攻击时40%概率使目标中毒（3回合）"
        }
      ]
    },
    {
      "id": "tal_photosynthesis",
      "name": "光合作用",
      "quality": 1,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复2点生命，每回合回复2点能量"
        },
        {
          "level": 2,
          "passive": "每回合回复3点生命，每回合回复3点能量"
        },
        {
          "level": 3,
          "passive": "每回合回复4点生命，每回合回复4点能量"
        },
        {
          "level": 4,
          "passive": "每回合回复5点生命，每回合回复5点能量"
        },
        {
          "level": 5,
          "passive": "每回合回复6点生命，每回合回复6点能量"
        }
      ]
    },
    {
      "id": "tal_scale_armor",
      "name": "鳞甲",
      "quality": 1,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+5，受到所有伤害-3%"
        },
        {
          "level": 2,
          "passive": "防御力+7，受到所有伤害-4%"
        },
        {
          "level": 3,
          "passive": "防御力+9，受到所有伤害-5%"
        },
        {
          "level": 4,
          "passive": "防御力+11，受到所有伤害-6%"
        },
        {
          "level": 5,
          "passive": "防御力+13，受到所有伤害-7%"
        }
      ]
    },
    {
      "id": "tal_deadly_fang",
      "name": "致命獠牙",
      "quality": 2,
      "type": 3,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ],
      "advanceTo": "tal_bone_crusher"
    },
    {
      "id": "tal_neurotoxin",
      "name": "神经毒液",
      "quality": 2,
      "type": 3,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ],
      "advanceTo": "tal_myriad_poisons"
    },
    {
      "id": "tal_thunder_power",
      "name": "雷霆之力",
      "quality": 2,
      "type": 3,
      "tags": [
        4
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ],
      "advanceTo": "tal_storm_lord"
    },
    {
      "id": "tal_predator_web",
      "name": "捕食者之网",
      "quality": 2,
      "type": 3,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+8"
        },
        {
          "level": 2,
          "passive": "防御力+16"
        },
        {
          "level": 3,
          "passive": "防御力+24"
        },
        {
          "level": 4,
          "passive": "防御力+32"
        },
        {
          "level": 5,
          "passive": "防御力+40"
        }
      ],
      "advanceTo": "tal_medusa_eye"
    },
    {
      "id": "tal_fire_breath_2",
      "name": "火焰之息",
      "quality": 2,
      "type": 3,
      "tags": [
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ],
      "advanceTo": "tal_dragon_breath"
    },
    {
      "id": "tal_frost_armor",
      "name": "冰霜护甲",
      "quality": 2,
      "type": 3,
      "tags": [
        7
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+8"
        },
        {
          "level": 2,
          "passive": "防御力+16"
        },
        {
          "level": 3,
          "passive": "防御力+24"
        },
        {
          "level": 4,
          "passive": "防御力+32"
        },
        {
          "level": 5,
          "passive": "防御力+40"
        }
      ]
    },
    {
      "id": "tal_iron_wall",
      "name": "铁壁",
      "quality": 2,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+11"
        },
        {
          "level": 2,
          "passive": "防御力+22"
        },
        {
          "level": 3,
          "passive": "防御力+33"
        },
        {
          "level": 4,
          "passive": "防御力+44"
        },
        {
          "level": 5,
          "passive": "防御力+54"
        }
      ],
      "advanceTo": "tal_indestructible_body"
    },
    {
      "id": "tal_diamond_shell",
      "name": "钻石甲壳",
      "quality": 2,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+7,生命值+18"
        },
        {
          "level": 2,
          "passive": "防御力+14,生命值+36"
        },
        {
          "level": 3,
          "passive": "防御力+21,生命值+54"
        },
        {
          "level": 4,
          "passive": "防御力+28,生命值+72"
        },
        {
          "level": 5,
          "passive": "防御力+36,生命值+90"
        }
      ]
    },
    {
      "id": "tal_super_regeneration",
      "name": "超速再生",
      "quality": 2,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复4点生命"
        },
        {
          "level": 2,
          "passive": "每回合回复7点生命"
        },
        {
          "level": 3,
          "passive": "每回合回复11点生命"
        },
        {
          "level": 4,
          "passive": "每回合回复14点生命"
        },
        {
          "level": 5,
          "passive": "每回合回复18点生命"
        }
      ],
      "advanceTo": "tal_undying_body"
    },
    {
      "id": "tal_perfect_camouflage",
      "name": "完美伪装",
      "quality": 2,
      "type": 2,
      "tags": [
        11
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+8，战斗开始时20%概率进入隐身状态，持续1回合"
        },
        {
          "level": 2,
          "passive": "先手值+16，战斗开始时22%概率进入隐身状态，持续1回合"
        },
        {
          "level": 3,
          "passive": "先手值+24，战斗开始时24%概率进入隐身状态，持续1回合"
        },
        {
          "level": 4,
          "passive": "先手值+32，战斗开始时26%概率进入隐身状态，持续1回合"
        },
        {
          "level": 5,
          "passive": "先手值+40，战斗开始时30%概率进入隐身状态，持续1回合"
        }
      ],
      "advanceTo": "tal_mirror_mimicry"
    },
    {
      "id": "tal_spike_armor",
      "name": "尖刺护甲",
      "quality": 2,
      "type": 2,
      "tags": [
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+9，受到攻击时30%概率反弹25%伤害"
        },
        {
          "level": 2,
          "passive": "防御力+18，受到攻击时32%概率反弹25%伤害"
        },
        {
          "level": 3,
          "passive": "防御力+27，受到攻击时34%概率反弹25%伤害"
        },
        {
          "level": 4,
          "passive": "防御力+36，受到攻击时36%概率反弹25%伤害"
        },
        {
          "level": 5,
          "passive": "防御力+45，受到攻击时40%概率反弹25%伤害"
        }
      ],
      "advanceTo": "tal_vengeful_thorns"
    },
    {
      "id": "tal_titanium_bone",
      "name": "钛金骨骼",
      "quality": 2,
      "type": 1,
      "tags": [
        13
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+11"
        },
        {
          "level": 2,
          "passive": "防御力+22"
        },
        {
          "level": 3,
          "passive": "防御力+33"
        },
        {
          "level": 4,
          "passive": "防御力+44"
        },
        {
          "level": 5,
          "passive": "防御力+54"
        }
      ]
    },
    {
      "id": "tal_high_altitude",
      "name": "高空优势",
      "quality": 2,
      "type": 1,
      "tags": [
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ],
      "advanceTo": "tal_sky_dominator"
    },
    {
      "id": "tal_lightning_reflex",
      "name": "闪电反射",
      "quality": 2,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ]
    },
    {
      "id": "tal_night_hunter",
      "name": "暗夜猎手",
      "quality": 2,
      "type": 2,
      "tags": [
        17
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "暴击率+8%，夜晚战斗时暴击率额外+10%"
        },
        {
          "level": 2,
          "passive": "暴击率+16%，夜晚战斗时暴击率额外+12%"
        },
        {
          "level": 3,
          "passive": "暴击率+24%，夜晚战斗时暴击率额外+14%"
        },
        {
          "level": 4,
          "passive": "暴击率+32%，夜晚战斗时暴击率额外+16%"
        },
        {
          "level": 5,
          "passive": "暴击率+40%，夜晚战斗时暴击率额外+20%"
        }
      ]
    },
    {
      "id": "tal_echolocation",
      "name": "回声定位",
      "quality": 2,
      "type": 1,
      "tags": [
        22
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+4%"
        },
        {
          "level": 2,
          "passive": "命中率+7%"
        },
        {
          "level": 3,
          "passive": "命中率+11%"
        },
        {
          "level": 4,
          "passive": "命中率+14%"
        },
        {
          "level": 5,
          "passive": "命中率+18%"
        }
      ]
    },
    {
      "id": "tal_infrared_vision",
      "name": "红外视觉",
      "quality": 2,
      "type": 1,
      "tags": [
        20
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+4%"
        },
        {
          "level": 2,
          "passive": "命中率+7%"
        },
        {
          "level": 3,
          "passive": "命中率+11%"
        },
        {
          "level": 4,
          "passive": "命中率+14%"
        },
        {
          "level": 5,
          "passive": "命中率+18%"
        }
      ]
    },
    {
      "id": "tal_plague_cloud",
      "name": "瘟疫云雾",
      "quality": 2,
      "type": 3,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ]
    },
    {
      "id": "tal_corrosive_slime",
      "name": "腐蚀粘液",
      "quality": 2,
      "type": 3,
      "tags": [
        3,
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ]
    },
    {
      "id": "tal_bloodlust",
      "name": "血之饥渴",
      "quality": 2,
      "type": 3,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ]
    },
    {
      "id": "tal_energy_drain",
      "name": "能量窃取",
      "quality": 2,
      "type": 3,
      "tags": [
        4
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5"
        },
        {
          "level": 2,
          "passive": "攻击力+11"
        },
        {
          "level": 3,
          "passive": "攻击力+16"
        },
        {
          "level": 4,
          "passive": "攻击力+22"
        },
        {
          "level": 5,
          "passive": "攻击力+27"
        }
      ]
    },
    {
      "id": "tal_swarm_behavior",
      "name": "群体行动",
      "quality": 2,
      "type": 1,
      "tags": [
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ]
    },
    {
      "id": "tal_bioluminescence",
      "name": "生物发光",
      "quality": 2,
      "type": 1,
      "tags": [
        21
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+4%"
        },
        {
          "level": 2,
          "passive": "命中率+7%"
        },
        {
          "level": 3,
          "passive": "命中率+11%"
        },
        {
          "level": 4,
          "passive": "命中率+14%"
        },
        {
          "level": 5,
          "passive": "命中率+18%"
        }
      ]
    },
    {
      "id": "tal_ink_spray",
      "name": "墨汁喷射",
      "quality": 2,
      "type": 1,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ]
    },
    {
      "id": "tal_cilia_movement",
      "name": "纤毛运动",
      "quality": 2,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ]
    },
    {
      "id": "tal_storm_wing",
      "name": "暴风之翼",
      "quality": 2,
      "type": 1,
      "tags": [
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ]
    },
    {
      "id": "tal_deep_sea_lung",
      "name": "深海肺",
      "quality": 2,
      "type": 1,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+27"
        },
        {
          "level": 2,
          "passive": "生命值+54"
        },
        {
          "level": 3,
          "passive": "生命值+81"
        },
        {
          "level": 4,
          "passive": "生命值+108"
        },
        {
          "level": 5,
          "passive": "生命值+135"
        }
      ]
    },
    {
      "id": "tal_geomagnetic_sense",
      "name": "地磁感应",
      "quality": 2,
      "type": 1,
      "tags": [
        20
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+4%，先手值+3"
        },
        {
          "level": 2,
          "passive": "命中率+7%，先手值+6"
        },
        {
          "level": 3,
          "passive": "命中率+11%，先手值+9"
        },
        {
          "level": 4,
          "passive": "命中率+14%，先手值+12"
        },
        {
          "level": 5,
          "passive": "命中率+18%，先手值+15"
        }
      ]
    },
    {
      "id": "tal_heat_storage",
      "name": "热能储存",
      "quality": 2,
      "type": 1,
      "tags": [
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9"
        },
        {
          "level": 2,
          "passive": "攻击力+18"
        },
        {
          "level": 3,
          "passive": "攻击力+27"
        },
        {
          "level": 4,
          "passive": "攻击力+36"
        },
        {
          "level": 5,
          "passive": "攻击力+45"
        }
      ]
    },
    {
      "id": "tal_bone_crusher",
      "name": "碎骨者",
      "quality": 3,
      "type": 3,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9"
        },
        {
          "level": 2,
          "passive": "攻击力+18"
        },
        {
          "level": 3,
          "passive": "攻击力+27"
        },
        {
          "level": 4,
          "passive": "攻击力+36"
        },
        {
          "level": 5,
          "passive": "攻击力+45"
        }
      ],
      "advanceTo": "tal_ancestor_of_beasts"
    },
    {
      "id": "tal_myriad_poisons",
      "name": "万毒之源",
      "quality": 3,
      "type": 3,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9"
        },
        {
          "level": 2,
          "passive": "攻击力+18"
        },
        {
          "level": 3,
          "passive": "攻击力+27"
        },
        {
          "level": 4,
          "passive": "攻击力+36"
        },
        {
          "level": 5,
          "passive": "攻击力+45"
        }
      ],
      "advanceTo": "tal_plague_source"
    },
    {
      "id": "tal_indestructible_body",
      "name": "不坏金身",
      "quality": 3,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+18"
        },
        {
          "level": 2,
          "passive": "防御力+36"
        },
        {
          "level": 3,
          "passive": "防御力+54"
        },
        {
          "level": 4,
          "passive": "防御力+72"
        },
        {
          "level": 5,
          "passive": "防御力+90"
        }
      ],
      "advanceTo": "tal_eternal_skeleton"
    },
    {
      "id": "tal_undying_body",
      "name": "不死之躯",
      "quality": 3,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复6点生命"
        },
        {
          "level": 2,
          "passive": "每回合回复12点生命"
        },
        {
          "level": 3,
          "passive": "每回合回复18点生命"
        },
        {
          "level": 4,
          "passive": "每回合回复24点生命"
        },
        {
          "level": 5,
          "passive": "每回合回复30点生命"
        }
      ],
      "advanceTo": "tal_life_spring"
    },
    {
      "id": "tal_sky_dominator",
      "name": "天空霸主",
      "quality": 3,
      "type": 3,
      "tags": [
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+9"
        },
        {
          "level": 2,
          "passive": "先手值+18"
        },
        {
          "level": 3,
          "passive": "先手值+27"
        },
        {
          "level": 4,
          "passive": "先手值+36"
        },
        {
          "level": 5,
          "passive": "先手值+45"
        }
      ]
    },
    {
      "id": "tal_mirror_mimicry",
      "name": "镜像拟态",
      "quality": 3,
      "type": 2,
      "tags": [
        11
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+14，战斗中有25%概率复制目标上一次使用的技能效果"
        },
        {
          "level": 2,
          "passive": "先手值+28，战斗中有27%概率复制目标上一次使用的技能效果"
        },
        {
          "level": 3,
          "passive": "先手值+42，战斗中有29%概率复制目标上一次使用的技能效果"
        },
        {
          "level": 4,
          "passive": "先手值+56，战斗中有31%概率复制目标上一次使用的技能效果"
        },
        {
          "level": 5,
          "passive": "先手值+70，战斗中有35%概率复制目标上一次使用的技能效果"
        }
      ],
      "advanceTo": "tal_shadow_predator"
    },
    {
      "id": "tal_storm_lord",
      "name": "风暴之主",
      "quality": 3,
      "type": 3,
      "tags": [
        4,
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9，先手值+5"
        },
        {
          "level": 2,
          "passive": "攻击力+18，先手值+10"
        },
        {
          "level": 3,
          "passive": "攻击力+27，先手值+15"
        },
        {
          "level": 4,
          "passive": "攻击力+36，先手值+20"
        },
        {
          "level": 5,
          "passive": "攻击力+45，先手值+25"
        }
      ]
    },
    {
      "id": "tal_dissolving_fluid",
      "name": "溶解液",
      "quality": 3,
      "type": 3,
      "tags": [
        3,
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9"
        },
        {
          "level": 2,
          "passive": "攻击力+18"
        },
        {
          "level": 3,
          "passive": "攻击力+27"
        },
        {
          "level": 4,
          "passive": "攻击力+36"
        },
        {
          "level": 5,
          "passive": "攻击力+45"
        }
      ]
    },
    {
      "id": "tal_blood_feast",
      "name": "血之盛宴",
      "quality": 3,
      "type": 3,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9"
        },
        {
          "level": 2,
          "passive": "攻击力+18"
        },
        {
          "level": 3,
          "passive": "攻击力+27"
        },
        {
          "level": 4,
          "passive": "攻击力+36"
        },
        {
          "level": 5,
          "passive": "攻击力+45"
        }
      ],
      "advanceTo": "tal_blood_venom"
    },
    {
      "id": "tal_vengeful_thorns",
      "name": "复仇荆棘",
      "quality": 3,
      "type": 2,
      "tags": [
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+15，受到攻击时35%概率反弹30%伤害"
        },
        {
          "level": 2,
          "passive": "防御力+30，受到攻击时37%概率反弹30%伤害"
        },
        {
          "level": 3,
          "passive": "防御力+45，受到攻击时39%概率反弹30%伤害"
        },
        {
          "level": 4,
          "passive": "防御力+60，受到攻击时41%概率反弹30%伤害"
        },
        {
          "level": 5,
          "passive": "防御力+75，受到攻击时45%概率反弹30%伤害"
        }
      ],
      "advanceTo": "tal_thorn_body"
    },
    {
      "id": "tal_elemental_resist",
      "name": "元素抗性",
      "quality": 3,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "所有元素抗性+10%"
        },
        {
          "level": 2,
          "passive": "所有元素抗性+20%"
        },
        {
          "level": 3,
          "passive": "所有元素抗性+30%"
        },
        {
          "level": 4,
          "passive": "所有元素抗性+40%"
        },
        {
          "level": 5,
          "passive": "所有元素抗性+50%"
        }
      ]
    },
    {
      "id": "tal_genetic_stability",
      "name": "基因稳固",
      "quality": 3,
      "type": 1,
      "tags": [
        24
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45"
        },
        {
          "level": 2,
          "passive": "生命值+90"
        },
        {
          "level": 3,
          "passive": "生命值+135"
        },
        {
          "level": 4,
          "passive": "生命值+180"
        },
        {
          "level": 5,
          "passive": "生命值+225"
        }
      ]
    },
    {
      "id": "tal_primal_devour",
      "name": "原始吞噬",
      "quality": 3,
      "type": 3,
      "tags": [
        24,
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_primal"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，生命值+60"
        },
        {
          "level": 2,
          "passive": "攻击力+40，生命值+120"
        },
        {
          "level": 3,
          "passive": "攻击力+60，生命值+180"
        },
        {
          "level": 4,
          "passive": "攻击力+80，生命值+240"
        },
        {
          "level": 5,
          "passive": "攻击力+100，生命值+300"
        }
      ]
    },
    {
      "id": "tal_tidal_adaptation",
      "name": "潮汐适应",
      "quality": 3,
      "type": 1,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45"
        },
        {
          "level": 2,
          "passive": "生命值+90"
        },
        {
          "level": 3,
          "passive": "生命值+135"
        },
        {
          "level": 4,
          "passive": "生命值+180"
        },
        {
          "level": 5,
          "passive": "生命值+225"
        }
      ]
    },
    {
      "id": "tal_ancient_predator",
      "name": "远古捕食",
      "quality": 3,
      "type": 2,
      "tags": [
        24
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+13，攻击时25%概率造成1.5倍暴击伤害"
        },
        {
          "level": 2,
          "passive": "攻击力+26，攻击时27%概率造成1.5倍暴击伤害"
        },
        {
          "level": 3,
          "passive": "攻击力+39，攻击时29%概率造成1.5倍暴击伤害"
        },
        {
          "level": 4,
          "passive": "攻击力+52，攻击时31%概率造成1.5倍暴击伤害"
        },
        {
          "level": 5,
          "passive": "攻击力+65，攻击时35%概率造成1.5倍暴击伤害"
        }
      ]
    },
    {
      "id": "tal_neurotoxin_king",
      "name": "神经毒液·王",
      "quality": 3,
      "type": 3,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_venom"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20"
        },
        {
          "level": 2,
          "passive": "攻击力+40"
        },
        {
          "level": 3,
          "passive": "攻击力+60"
        },
        {
          "level": 4,
          "passive": "攻击力+80"
        },
        {
          "level": 5,
          "passive": "攻击力+100"
        }
      ]
    },
    {
      "id": "tal_humid_tolerance",
      "name": "湿热耐性",
      "quality": 3,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+18，生命值+27"
        },
        {
          "level": 2,
          "passive": "防御力+36，生命值+54"
        },
        {
          "level": 3,
          "passive": "防御力+54，生命值+81"
        },
        {
          "level": 4,
          "passive": "防御力+72，生命值+108"
        },
        {
          "level": 5,
          "passive": "防御力+90，生命值+135"
        }
      ]
    },
    {
      "id": "tal_beast_intimidation",
      "name": "百兽威慑",
      "quality": 3,
      "type": 2,
      "tags": [
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+15，战斗开始时30%概率降低全体敌人攻击力15%，持续2回合"
        },
        {
          "level": 2,
          "passive": "防御力+30，战斗开始时32%概率降低全体敌人攻击力15%，持续2回合"
        },
        {
          "level": 3,
          "passive": "防御力+45，战斗开始时34%概率降低全体敌人攻击力15%，持续2回合"
        },
        {
          "level": 4,
          "passive": "防御力+60，战斗开始时36%概率降低全体敌人攻击力15%，持续2回合"
        },
        {
          "level": 5,
          "passive": "防御力+75，战斗开始时40%概率降低全体敌人攻击力15%，持续2回合"
        }
      ]
    },
    {
      "id": "tal_unyielding",
      "name": "不屈",
      "quality": 3,
      "type": 1,
      "tags": [
        13
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+18"
        },
        {
          "level": 2,
          "passive": "防御力+36"
        },
        {
          "level": 3,
          "passive": "防御力+54"
        },
        {
          "level": 4,
          "passive": "防御力+72"
        },
        {
          "level": 5,
          "passive": "防御力+90"
        }
      ]
    },
    {
      "id": "tal_high_altitude_predator",
      "name": "高空捕食",
      "quality": 3,
      "type": 3,
      "tags": [
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9，先手值+5"
        },
        {
          "level": 2,
          "passive": "攻击力+18，先手值+10"
        },
        {
          "level": 3,
          "passive": "攻击力+27，先手值+15"
        },
        {
          "level": 4,
          "passive": "攻击力+36，先手值+20"
        },
        {
          "level": 5,
          "passive": "攻击力+45，先手值+25"
        }
      ]
    },
    {
      "id": "tal_keen_eye",
      "name": "锐眼",
      "quality": 3,
      "type": 1,
      "tags": [
        21
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+6%"
        },
        {
          "level": 2,
          "passive": "命中率+12%"
        },
        {
          "level": 3,
          "passive": "命中率+18%"
        },
        {
          "level": 4,
          "passive": "命中率+24%"
        },
        {
          "level": 5,
          "passive": "命中率+30%"
        }
      ]
    },
    {
      "id": "tal_blood_frenzy",
      "name": "血之狂热",
      "quality": 3,
      "type": 3,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9"
        },
        {
          "level": 2,
          "passive": "攻击力+18"
        },
        {
          "level": 3,
          "passive": "攻击力+27"
        },
        {
          "level": 4,
          "passive": "攻击力+36"
        },
        {
          "level": 5,
          "passive": "攻击力+45"
        }
      ]
    },
    {
      "id": "tal_deep_sea_behemoth",
      "name": "深海巨兽",
      "quality": 3,
      "type": 3,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_deep"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+100，防御力+40"
        },
        {
          "level": 2,
          "passive": "生命值+200，防御力+80"
        },
        {
          "level": 3,
          "passive": "生命值+300，防御力+120"
        },
        {
          "level": 4,
          "passive": "生命值+400，防御力+160"
        },
        {
          "level": 5,
          "passive": "生命值+500，防御力+200"
        }
      ]
    },
    {
      "id": "tal_swamp_ambush",
      "name": "沼泽潜伏",
      "quality": 3,
      "type": 1,
      "tags": [
        17
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+15"
        },
        {
          "level": 2,
          "passive": "先手值+30"
        },
        {
          "level": 3,
          "passive": "先手值+45"
        },
        {
          "level": 4,
          "passive": "先手值+60"
        },
        {
          "level": 5,
          "passive": "先手值+75"
        }
      ]
    },
    {
      "id": "tal_desert_tenacity",
      "name": "荒漠坚韧",
      "quality": 3,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+18，生命值+27"
        },
        {
          "level": 2,
          "passive": "防御力+36，生命值+54"
        },
        {
          "level": 3,
          "passive": "防御力+54，生命值+81"
        },
        {
          "level": 4,
          "passive": "防御力+72，生命值+108"
        },
        {
          "level": 5,
          "passive": "防御力+90，生命值+135"
        }
      ]
    },
    {
      "id": "tal_ocean_sovereign",
      "name": "海洋霸主",
      "quality": 3,
      "type": 3,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_ocean"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，生命值+60"
        },
        {
          "level": 2,
          "passive": "攻击力+40，生命值+120"
        },
        {
          "level": 3,
          "passive": "攻击力+60，生命值+180"
        },
        {
          "level": 4,
          "passive": "攻击力+80，生命值+240"
        },
        {
          "level": 5,
          "passive": "攻击力+100，生命值+300"
        }
      ]
    },
    {
      "id": "tal_tyrant_fang",
      "name": "暴君之牙",
      "quality": 3,
      "type": 3,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_tyrant"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20"
        },
        {
          "level": 2,
          "passive": "攻击力+40"
        },
        {
          "level": 3,
          "passive": "攻击力+60"
        },
        {
          "level": 4,
          "passive": "攻击力+80"
        },
        {
          "level": 5,
          "passive": "攻击力+100"
        }
      ]
    },
    {
      "id": "tal_glacial_thick_skin",
      "name": "冰河厚皮",
      "quality": 3,
      "type": 1,
      "tags": [
        8,
        7
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45，防御力+18"
        },
        {
          "level": 2,
          "passive": "生命值+90，防御力+36"
        },
        {
          "level": 3,
          "passive": "生命值+135，防御力+54"
        },
        {
          "level": 4,
          "passive": "生命值+180，防御力+72"
        },
        {
          "level": 5,
          "passive": "生命值+225，防御力+90"
        }
      ]
    },
    {
      "id": "tal_hibernation_regen",
      "name": "冬眠再生",
      "quality": 3,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复6点生命，生命低于30%时回复翻倍"
        },
        {
          "level": 2,
          "passive": "每回合回复12点生命，生命低于30%时回复翻倍"
        },
        {
          "level": 3,
          "passive": "每回合回复18点生命，生命低于30%时回复翻倍"
        },
        {
          "level": 4,
          "passive": "每回合回复24点生命，生命低于30%时回复翻倍"
        },
        {
          "level": 5,
          "passive": "每回合回复30点生命，生命低于30%时回复翻倍"
        }
      ]
    },
    {
      "id": "tal_tundra_hunter",
      "name": "冰原猎手",
      "quality": 3,
      "type": 2,
      "tags": [
        17,
        7
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+13，攻击时有30%概率附加减速，持续2回合"
        },
        {
          "level": 2,
          "passive": "攻击力+26，攻击时有32%概率附加减速，持续2回合"
        },
        {
          "level": 3,
          "passive": "攻击力+39，攻击时有34%概率附加减速，持续2回合"
        },
        {
          "level": 4,
          "passive": "攻击力+52，攻击时有36%概率附加减速，持续2回合"
        },
        {
          "level": 5,
          "passive": "攻击力+65，攻击时有40%概率附加减速，持续2回合"
        }
      ]
    },
    {
      "id": "tal_deep_sea_blubber",
      "name": "深海脂肪",
      "quality": 3,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45"
        },
        {
          "level": 2,
          "passive": "生命值+90"
        },
        {
          "level": 3,
          "passive": "生命值+135"
        },
        {
          "level": 4,
          "passive": "生命值+180"
        },
        {
          "level": 5,
          "passive": "生命值+225"
        }
      ]
    },
    {
      "id": "tal_holy_light_protection",
      "name": "圣光庇护",
      "quality": 3,
      "type": 2,
      "tags": [
        23
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+15，受到攻击时25%概率免疫该次伤害"
        },
        {
          "level": 2,
          "passive": "防御力+30，受到攻击时27%概率免疫该次伤害"
        },
        {
          "level": 3,
          "passive": "防御力+45，受到攻击时29%概率免疫该次伤害"
        },
        {
          "level": 4,
          "passive": "防御力+60，受到攻击时31%概率免疫该次伤害"
        },
        {
          "level": 5,
          "passive": "防御力+75，受到攻击时35%概率免疫该次伤害"
        }
      ]
    },
    {
      "id": "tal_world_entangle",
      "name": "世界缠绕",
      "quality": 3,
      "type": 3,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_world"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+40"
        },
        {
          "level": 2,
          "passive": "防御力+80"
        },
        {
          "level": 3,
          "passive": "防御力+120"
        },
        {
          "level": 4,
          "passive": "防御力+160"
        },
        {
          "level": 5,
          "passive": "防御力+200"
        }
      ]
    },
    {
      "id": "tal_god_devouring_fang",
      "name": "噬神之牙",
      "quality": 3,
      "type": 3,
      "tags": [
        2,
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_god"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20"
        },
        {
          "level": 2,
          "passive": "攻击力+40"
        },
        {
          "level": 3,
          "passive": "攻击力+60"
        },
        {
          "level": 4,
          "passive": "攻击力+80"
        },
        {
          "level": 5,
          "passive": "攻击力+100"
        }
      ]
    },
    {
      "id": "tal_multi_head_regen",
      "name": "多头再生",
      "quality": 3,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复8点生命"
        },
        {
          "level": 2,
          "passive": "每回合回复16点生命"
        },
        {
          "level": 3,
          "passive": "每回合回复24点生命"
        },
        {
          "level": 4,
          "passive": "每回合回复32点生命"
        },
        {
          "level": 5,
          "passive": "每回合回复40点生命"
        }
      ]
    },
    {
      "id": "tal_nirvana_flame",
      "name": "涅槃之火",
      "quality": 3,
      "type": 3,
      "tags": [
        6,
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_phoenix"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，每回合回复7点生命"
        },
        {
          "level": 2,
          "passive": "攻击力+40，每回合回复14点生命"
        },
        {
          "level": 3,
          "passive": "攻击力+60，每回合回复20点生命"
        },
        {
          "level": 4,
          "passive": "攻击力+80，每回合回复27点生命"
        },
        {
          "level": 5,
          "passive": "攻击力+100，每回合回复33点生命"
        }
      ]
    },
    {
      "id": "tal_dragon_might",
      "name": "龙威",
      "quality": 3,
      "type": 2,
      "tags": [
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+13，攻击时30%概率使目标攻击力降低15%，持续2回合"
        },
        {
          "level": 2,
          "passive": "攻击力+26，攻击时32%概率使目标攻击力降低15%，持续2回合"
        },
        {
          "level": 3,
          "passive": "攻击力+39，攻击时34%概率使目标攻击力降低15%，持续2回合"
        },
        {
          "level": 4,
          "passive": "攻击力+52，攻击时36%概率使目标攻击力降低15%，持续2回合"
        },
        {
          "level": 5,
          "passive": "攻击力+65，攻击时40%概率使目标攻击力降低15%，持续2回合"
        }
      ]
    },
    {
      "id": "tal_spirit_guardian",
      "name": "灵域守护",
      "quality": 3,
      "type": 2,
      "tags": [
        23
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+15，每回合开始20%概率获得一个护盾，吸收8%最大生命伤害"
        },
        {
          "level": 2,
          "passive": "防御力+30，每回合开始22%概率获得一个护盾，吸收8%最大生命伤害"
        },
        {
          "level": 3,
          "passive": "防御力+45，每回合开始24%概率获得一个护盾，吸收8%最大生命伤害"
        },
        {
          "level": 4,
          "passive": "防御力+60，每回合开始26%概率获得一个护盾，吸收8%最大生命伤害"
        },
        {
          "level": 5,
          "passive": "防御力+75，每回合开始30%概率获得一个护盾，吸收8%最大生命伤害"
        }
      ]
    },
    {
      "id": "tal_benevolent_beast",
      "name": "仁兽之佑",
      "quality": 3,
      "type": 1,
      "tags": [
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45，每回合回复3点生命"
        },
        {
          "level": 2,
          "passive": "生命值+90，每回合回复6点生命"
        },
        {
          "level": 3,
          "passive": "生命值+135，每回合回复9点生命"
        },
        {
          "level": 4,
          "passive": "生命值+180，每回合回复12点生命"
        },
        {
          "level": 5,
          "passive": "生命值+225，每回合回复15点生命"
        }
      ]
    },
    {
      "id": "tal_abyssal_devour",
      "name": "深渊吞噬",
      "quality": 3,
      "type": 2,
      "tags": [
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+13，击杀敌人时回复10%最大生命"
        },
        {
          "level": 2,
          "passive": "攻击力+26，击杀敌人时回复12%最大生命"
        },
        {
          "level": 3,
          "passive": "攻击力+39，击杀敌人时回复14%最大生命"
        },
        {
          "level": 4,
          "passive": "攻击力+52，击杀敌人时回复16%最大生命"
        },
        {
          "level": 5,
          "passive": "攻击力+65，击杀敌人时回复20%最大生命"
        }
      ]
    },
    {
      "id": "tal_myriad_beast_divinity",
      "name": "万兽神威",
      "quality": 3,
      "type": 2,
      "tags": [
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+13，防御力+10，战斗中每回合提升2%攻击力，最多10%"
        },
        {
          "level": 2,
          "passive": "攻击力+26，防御力+20，战斗中每回合提升2%攻击力，最多10%"
        },
        {
          "level": 3,
          "passive": "攻击力+39，防御力+30，战斗中每回合提升2%攻击力，最多10%"
        },
        {
          "level": 4,
          "passive": "攻击力+52，防御力+40，战斗中每回合提升2%攻击力，最多10%"
        },
        {
          "level": 5,
          "passive": "攻击力+65，防御力+50，战斗中每回合提升2%攻击力，最多10%"
        }
      ]
    },
    {
      "id": "tal_frost_giant_king",
      "name": "冰霜巨人王",
      "quality": 3,
      "type": 1,
      "tags": [
        7,
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45，防御力+18，寒冰抗性+15%"
        },
        {
          "level": 2,
          "passive": "生命值+90，防御力+36，寒冰抗性+20%"
        },
        {
          "level": 3,
          "passive": "生命值+135，防御力+54，寒冰抗性+25%"
        },
        {
          "level": 4,
          "passive": "生命值+180，防御力+72，寒冰抗性+30%"
        },
        {
          "level": 5,
          "passive": "生命值+225，防御力+90，寒冰抗性+40%"
        }
      ]
    },
    {
      "id": "tal_wild_lord",
      "name": "荒野领主",
      "quality": 3,
      "type": 1,
      "tags": [
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+9，先手值+15"
        },
        {
          "level": 2,
          "passive": "攻击力+18，先手值+30"
        },
        {
          "level": 3,
          "passive": "攻击力+27，先手值+45"
        },
        {
          "level": 4,
          "passive": "攻击力+36，先手值+60"
        },
        {
          "level": 5,
          "passive": "攻击力+45，先手值+75"
        }
      ]
    },
    {
      "id": "tal_sacred_forest_guardian",
      "name": "圣林守护者",
      "quality": 3,
      "type": 1,
      "tags": [
        10,
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+18，每回合回复3点生命"
        },
        {
          "level": 2,
          "passive": "防御力+36，每回合回复6点生命"
        },
        {
          "level": 3,
          "passive": "防御力+54，每回合回复9点生命"
        },
        {
          "level": 4,
          "passive": "防御力+72，每回合回复12点生命"
        },
        {
          "level": 5,
          "passive": "防御力+90，每回合回复15点生命"
        }
      ]
    },
    {
      "id": "tal_sky_lord",
      "name": "苍穹之主",
      "quality": 3,
      "type": 2,
      "tags": [
        14
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+14，攻击时30%概率附加束缚，持续1回合"
        },
        {
          "level": 2,
          "passive": "先手值+28，攻击时32%概率附加束缚，持续1回合"
        },
        {
          "level": 3,
          "passive": "先手值+42，攻击时34%概率附加束缚，持续1回合"
        },
        {
          "level": 4,
          "passive": "先手值+56，攻击时36%概率附加束缚，持续1回合"
        },
        {
          "level": 5,
          "passive": "先手值+70，攻击时40%概率附加束缚，持续1回合"
        }
      ]
    },
    {
      "id": "tal_secret_realm_mother",
      "name": "秘境之母",
      "quality": 3,
      "type": 1,
      "tags": [
        26,
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+45，每回合回复5点生命"
        },
        {
          "level": 2,
          "passive": "生命值+90，每回合回复10点生命"
        },
        {
          "level": 3,
          "passive": "生命值+135，每回合回复15点生命"
        },
        {
          "level": 4,
          "passive": "生命值+180，每回合回复20点生命"
        },
        {
          "level": 5,
          "passive": "生命值+225，每回合回复25点生命"
        }
      ]
    },
    {
      "id": "tal_ancestor_of_beasts",
      "name": "百兽之祖",
      "quality": 4,
      "type": 1,
      "tags": [
        24,
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，暴击率+8%，击杀敌人后攻击力+8%（持续5回合，可叠加无上限）"
        },
        {
          "level": 2,
          "passive": "攻击力+25，暴击率+10%，击杀敌人后攻击力+10%（持续5回合，可叠加无上限）"
        },
        {
          "level": 3,
          "passive": "攻击力+30，暴击率+12%，击杀敌人后攻击力+12%（持续5回合，可叠加无上限）"
        },
        {
          "level": 4,
          "passive": "攻击力+35，暴击率+15%，击杀敌人后攻击力+15%（持续5回合，可叠加无上限）"
        },
        {
          "level": 5,
          "passive": "攻击力+40，暴击率+18%，击杀敌人后攻击力+18%（持续5回合，可叠加无上限）"
        }
      ],
      "advanceTo": "tal_god_eater"
    },
    {
      "id": "tal_prehistoric_gene_pool",
      "name": "史前基因库",
      "quality": 4,
      "type": 1,
      "tags": [
        24
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "所有属性+12%，所有天赋效果+10%，每回合开始随机获得1个增益效果"
        },
        {
          "level": 2,
          "passive": "所有属性+15%，所有天赋效果+12%，每回合开始随机获得1个增益效果"
        },
        {
          "level": 3,
          "passive": "所有属性+18%，所有天赋效果+15%，每回合开始随机获得2个增益效果"
        },
        {
          "level": 4,
          "passive": "所有属性+20%，所有天赋效果+18%，每回合开始随机获得2个增益效果"
        },
        {
          "level": 5,
          "passive": "所有属性+25%，所有天赋效果+20%，每回合开始随机获得3个增益效果"
        }
      ]
    },
    {
      "id": "tal_chaos_origin",
      "name": "混沌起源",
      "quality": 4,
      "type": 1,
      "tags": [
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+25，暴击伤害+30%，暴击时30%概率追加一次攻击（50%伤害）"
        },
        {
          "level": 2,
          "passive": "攻击力+30，暴击伤害+40%，暴击时35%概率追加一次攻击（55%伤害）"
        },
        {
          "level": 3,
          "passive": "攻击力+35，暴击伤害+50%，暴击时40%概率追加一次攻击（60%伤害）"
        },
        {
          "level": 4,
          "passive": "攻击力+40，暴击伤害+60%，暴击时45%概率追加一次攻击（65%伤害）"
        },
        {
          "level": 5,
          "passive": "攻击力+50，暴击伤害+80%，暴击时50%概率追加一次攻击（70%伤害）"
        }
      ]
    },
    {
      "id": "tal_dragon_breath",
      "name": "龙息",
      "quality": 4,
      "type": 1,
      "tags": [
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时25%概率使目标灼烧（5回合），灼烧伤害+50%，爆燃不再清除灼烧而是保留50%层数"
        },
        {
          "level": 2,
          "passive": "攻击时30%概率使目标灼烧（5回合），灼烧伤害+60%，爆燃不再清除灼烧而是保留50%层数"
        },
        {
          "level": 3,
          "passive": "攻击时35%概率使目标灼烧（5回合），灼烧伤害+70%，爆燃不再清除灼烧而是保留50%层数"
        },
        {
          "level": 4,
          "passive": "攻击时40%概率使目标灼烧（5回合），灼烧伤害+80%，爆燃不再清除灼烧而是保留50%层数"
        },
        {
          "level": 5,
          "passive": "攻击时45%概率使目标灼烧（5回合），灼烧伤害+100%，爆燃不再清除灼烧而是保留50%层数"
        }
      ],
      "advanceTo": "tal_nirvana_flame_legend"
    },
    {
      "id": "tal_nirvana_flame_legend",
      "name": "涅槃之火·传",
      "quality": 4,
      "type": 1,
      "tags": [
        6,
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "灼烧层数每回合+1（不再衰减），灼烧伤害+30%，生命低于30%时攻击力+30%"
        },
        {
          "level": 2,
          "passive": "灼烧层数每回合+1（不再衰减），灼烧伤害+40%，生命低于30%时攻击力+35%"
        },
        {
          "level": 3,
          "passive": "灼烧层数每回合+1（不再衰减），灼烧伤害+50%，生命低于30%时攻击力+40%"
        },
        {
          "level": 4,
          "passive": "灼烧层数每回合+1（不再衰减），灼烧伤害+60%，生命低于30%时攻击力+45%"
        },
        {
          "level": 5,
          "passive": "灼烧层数每回合+1（不再衰减），灼烧伤害+80%，生命低于30%时攻击力+50%"
        }
      ],
      "advanceTo": "tal_final_fang"
    },
    {
      "id": "tal_medusa_eye",
      "name": "美杜莎之眼",
      "quality": 4,
      "type": 2,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+20，攻击时30%概率使目标冻结（持续1回合），冻结目标受到伤害+30%"
        },
        {
          "level": 2,
          "passive": "先手值+25，攻击时35%概率使目标冻结（持续1回合），冻结目标受到伤害+35%"
        },
        {
          "level": 3,
          "passive": "先手值+30，攻击时40%概率使目标冻结（持续2回合），冻结目标受到伤害+40%"
        },
        {
          "level": 4,
          "passive": "先手值+35，攻击时45%概率使目标冻结（持续2回合），冻结目标受到伤害+45%"
        },
        {
          "level": 5,
          "passive": "先手值+40，攻击时50%概率使目标冻结（持续2回合），冻结目标受到伤害+50%"
        }
      ]
    },
    {
      "id": "tal_werewolf_bloodline",
      "name": "狼人血统",
      "quality": 4,
      "type": 1,
      "tags": [
        1,
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，先手值+20，生命低于50%时攻击力+30%，攻击时20%概率吸血25%"
        },
        {
          "level": 2,
          "passive": "攻击力+25，先手值+25，生命低于50%时攻击力+35%，攻击时25%概率吸血30%"
        },
        {
          "level": 3,
          "passive": "攻击力+30，先手值+30，生命低于50%时攻击力+40%，攻击时30%概率吸血35%"
        },
        {
          "level": 4,
          "passive": "攻击力+35，先手值+35，生命低于50%时攻击力+45%，攻击时35%概率吸血40%"
        },
        {
          "level": 5,
          "passive": "攻击力+40，先手值+40，生命低于50%时攻击力+50%，攻击时40%概率吸血50%"
        }
      ]
    },
    {
      "id": "tal_siren_song",
      "name": "海妖之歌",
      "quality": 4,
      "type": 2,
      "tags": [
        18,
        22
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+20，战斗开始时40%概率魅惑敌人，使其跳过行动（持续1回合），被魅惑的目标受到伤害+25%"
        },
        {
          "level": 2,
          "passive": "先手值+25，战斗开始时45%概率魅惑敌人，使其跳过行动（持续1回合），被魅惑的目标受到伤害+30%"
        },
        {
          "level": 3,
          "passive": "先手值+30，战斗开始时50%概率魅惑敌人，使其跳过行动（持续1回合），被魅惑的目标受到伤害+35%"
        },
        {
          "level": 4,
          "passive": "先手值+35，战斗开始时55%概率魅惑敌人，使其跳过行动（持续2回合），被魅惑的目标受到伤害+40%"
        },
        {
          "level": 5,
          "passive": "先手值+40，战斗开始时60%概率魅惑敌人，使其跳过行动（持续2回合），被魅惑的目标受到伤害+50%"
        }
      ]
    },
    {
      "id": "tal_god_eater",
      "name": "噬神者",
      "quality": 5,
      "type": 1,
      "tags": [
        25,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_chaos_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+40%"
        }
      ]
    },
    {
      "id": "tal_final_fang",
      "name": "终焉之牙",
      "quality": 5,
      "type": 1,
      "tags": [
        2,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_myth_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+40%，暴击率+20%，暴击时80%概率追加一次攻击（70%伤害），击杀敌人后暴击率+4%（本局可叠加无上限）"
        }
      ]
    },
    {
      "id": "tal_primordial_venom",
      "name": "原初之毒",
      "quality": 5,
      "type": 1,
      "tags": [
        3,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_legend_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "中毒层数无上限，每层中毒额外+1%伤害，毒爆不再清除Dot而是保留100%层数，中毒目标全属性-20%，攻击时50%概率使目标中毒（10回合）"
        }
      ]
    },
    {
      "id": "tal_omnipotence_unity",
      "name": "万物归一",
      "quality": 5,
      "type": 1,
      "tags": [
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_insect_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "所有属性+25%，所有持续伤害+40%，所有控制时间+40%，所有技能冷却-15%，每回合开始随机获得一个增益效果"
        }
      ]
    },
    {
      "id": "tal_indestructible",
      "name": "不灭",
      "quality": 5,
      "type": 1,
      "tags": [
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_dragon_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+40%，防御力+40%，受到致命伤害时保留1点生命（每局限2次），每回合回复8%最大生命，减伤+25%，反伤+25%"
        }
      ]
    },
    {
      "id": "tal_life_spring",
      "name": "生命之源",
      "quality": 5,
      "type": 1,
      "tags": [
        10,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_ice_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复15%最大生命，回复效果+100%，吸血比例+30%，吸血量超过最大生命时100%转化为护盾，生命低于30%时无敌1回合（每局限2次）"
        }
      ]
    },
    {
      "id": "tal_transcend_dimension",
      "name": "超越维度",
      "quality": 5,
      "type": 1,
      "tags": [
        25,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_land_3"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+40，闪避率+15%，闪避后80%概率反击（80%伤害），每回合25%概率获得额外行动（每局限4次），先手值高于目标时伤害+40%"
        }
      ]
    },
    {
      "id": "tal_true_form",
      "name": "真实之姿",
      "quality": 5,
      "type": 1,
      "tags": [
        26,
        11
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_modern_6"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "无视目标50%防御，攻击无法被闪避，命中时30%概率使目标防御-30%（持续5回合），技能伤害+100%且无视100%防御"
        }
      ]
    },
    {
      "id": "tal_omniscience_omnipotence",
      "name": "全知全能",
      "quality": 5,
      "type": 1,
      "tags": [
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_chaos_2"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "所有天赋效果+25%，所有技能冷却-25%，所有属性+15%，所有持续伤害+40%，所有控制时间+40%，每回合开始随机获得2个增益效果"
        }
      ]
    },
    {
      "id": "tal_singularity",
      "name": "奇点",
      "quality": 5,
      "type": 1,
      "tags": [
        26,
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 5,
        "fragCount": 10,
        "bossCore": "boss_chaos_1"
      },
      "levelCost": [],
      "maxLevel": 1,
      "effects": [
        {
          "level": 1,
          "passive": "持续伤害+100%，控制时间+100%，暴击伤害+100%，吸血比例+50%，闪避率+15%，每回合开始随机触发一个已解锁神话天赋的核心效果（不叠加，每回合切换）"
        }
      ]
    },
    {
      "id": "tal_thorn_body",
      "name": "荆棘之躯",
      "quality": 4,
      "type": 2,
      "tags": [
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+20，受到攻击时50%概率反弹40%伤害，反伤时回复反伤伤害8%的生命"
        },
        {
          "level": 2,
          "passive": "防御力+25，受到攻击时55%概率反弹45%伤害，反伤时回复反伤伤害10%的生命"
        },
        {
          "level": 3,
          "passive": "防御力+30，受到攻击时60%概率反弹50%伤害，反伤时回复反伤伤害12%的生命"
        },
        {
          "level": 4,
          "passive": "防御力+35，受到攻击时65%概率反弹55%伤害，反伤时回复反伤伤害15%的生命"
        },
        {
          "level": 5,
          "passive": "防御力+40，受到攻击时70%概率反弹60%伤害，反伤时回复反伤伤害18%的生命"
        }
      ]
    },
    {
      "id": "tal_energy_devourer",
      "name": "噬能之主",
      "quality": 4,
      "type": 1,
      "tags": [
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，技能吸血+20%，击杀敌人后回复15%最大生命，能量回复+5/回合"
        },
        {
          "level": 2,
          "passive": "攻击力+25，技能吸血+25%，击杀敌人后回复18%最大生命，能量回复+6/回合"
        },
        {
          "level": 3,
          "passive": "攻击力+30，技能吸血+30%，击杀敌人后回复20%最大生命，能量回复+8/回合"
        },
        {
          "level": 4,
          "passive": "攻击力+35，技能吸血+35%，击杀敌人后回复25%最大生命，能量回复+10/回合"
        },
        {
          "level": 5,
          "passive": "攻击力+40，技能吸血+40%，击杀敌人后回复30%最大生命，能量回复+12/回合"
        }
      ]
    },
    {
      "id": "tal_eternal_skeleton",
      "name": "永生骨架",
      "quality": 4,
      "type": 1,
      "tags": [
        13
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+20，生命值+120，每回合回复4%最大生命，减伤+8%"
        },
        {
          "level": 2,
          "passive": "防御力+25，生命值+150，每回合回复5%最大生命，减伤+10%"
        },
        {
          "level": 3,
          "passive": "防御力+30，生命值+180，每回合回复6%最大生命，减伤+12%"
        },
        {
          "level": 4,
          "passive": "防御力+35，生命值+200，每回合回复7%最大生命，减伤+15%"
        },
        {
          "level": 5,
          "passive": "防御力+40，生命值+250，每回合回复8%最大生命，减伤+18%"
        }
      ],
      "advanceTo": "tal_indestructible"
    },
    {
      "id": "tal_temporal_nerve",
      "name": "时流神经",
      "quality": 4,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+20，技能冷却-1回合（最低1），每回合开始12%概率获得额外行动（每局限2次）"
        },
        {
          "level": 2,
          "passive": "先手值+25，技能冷却-1回合（最低1），每回合开始15%概率获得额外行动（每局限2次）"
        },
        {
          "level": 3,
          "passive": "先手值+30，技能冷却-1回合（最低1），每回合开始18%概率获得额外行动（每局限3次）"
        },
        {
          "level": 4,
          "passive": "先手值+35，技能冷却-2回合（最低1），每回合开始20%概率获得额外行动（每局限3次）"
        },
        {
          "level": 5,
          "passive": "先手值+40，技能冷却-2回合（最低1），每回合开始25%概率获得额外行动（每局限4次）"
        }
      ]
    },
    {
      "id": "tal_plague_source",
      "name": "瘟疫之源",
      "quality": 4,
      "type": 2,
      "tags": [
        3,
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时40%概率使目标中毒（5回合），攻击中毒目标时30%概率将中毒传染给另一个敌人，中毒伤害+30%"
        },
        {
          "level": 2,
          "passive": "攻击时45%概率使目标中毒（5回合），攻击中毒目标时35%概率将中毒传染给另一个敌人，中毒伤害+40%"
        },
        {
          "level": 3,
          "passive": "攻击时50%概率使目标中毒（5回合），攻击中毒目标时40%概率将中毒传染给另一个敌人，中毒伤害+50%"
        },
        {
          "level": 4,
          "passive": "攻击时55%概率使目标中毒（5回合），攻击中毒目标时45%概率将中毒传染给另一个敌人，中毒伤害+60%"
        },
        {
          "level": 5,
          "passive": "攻击时60%概率使目标中毒（5回合），攻击中毒目标时50%概率将中毒传染给另一个敌人，中毒伤害+80%"
        }
      ],
      "advanceTo": "tal_primordial_venom"
    },
    {
      "id": "tal_blood_venom",
      "name": "血毒",
      "quality": 4,
      "type": 2,
      "tags": [
        2,
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "暴击时100%概率使目标中毒（5回合，3层），中毒目标受到的流血伤害+30%，暴击伤害+20%"
        },
        {
          "level": 2,
          "passive": "暴击时100%概率使目标中毒（5回合，4层），中毒目标受到的流血伤害+40%，暴击伤害+25%"
        },
        {
          "level": 3,
          "passive": "暴击时100%概率使目标中毒（5回合，5层），中毒目标受到的流血伤害+50%，暴击伤害+30%"
        },
        {
          "level": 4,
          "passive": "暴击时100%概率使目标中毒（5回合，6层），中毒目标受到的流血伤害+60%，暴击伤害+35%"
        },
        {
          "level": 5,
          "passive": "暴击时100%概率使目标中毒（5回合，8层），中毒目标受到的流血伤害+80%，暴击伤害+50%"
        }
      ]
    },
    {
      "id": "tal_shadow_predator",
      "name": "暗影捕食者",
      "quality": 4,
      "type": 1,
      "tags": [
        17
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+15，先手值+15，战斗开始时隐身（1回合），隐身状态下攻击必暴击且伤害+25%"
        },
        {
          "level": 2,
          "passive": "攻击力+18，先手值+18，战斗开始时隐身（2回合），隐身状态下攻击必暴击且伤害+28%"
        },
        {
          "level": 3,
          "passive": "攻击力+20，先手值+20，战斗开始时隐身（2回合），隐身状态下攻击必暴击且伤害+30%"
        },
        {
          "level": 4,
          "passive": "攻击力+25，先手值+25，战斗开始时隐身（3回合），隐身状态下攻击必暴击且伤害+35%"
        },
        {
          "level": 5,
          "passive": "攻击力+30，先手值+30，战斗开始时隐身（3回合），隐身状态下攻击必暴击且伤害+40%"
        }
      ]
    },
    {
      "id": "tal_storm_wing_fusion",
      "name": "风暴之翼",
      "quality": 4,
      "type": 1,
      "tags": [
        14,
        4
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+15，先手值+25，闪避率+8%，闪避后50%概率反击（40%伤害）"
        },
        {
          "level": 2,
          "passive": "攻击力+18，先手值+30，闪避率+10%，闪避后55%概率反击（45%伤害）"
        },
        {
          "level": 3,
          "passive": "攻击力+20，先手值+35，闪避率+12%，闪避后60%概率反击（50%伤害）"
        },
        {
          "level": 4,
          "passive": "攻击力+25，先手值+40，闪避率+15%，闪避后65%概率反击（55%伤害）"
        },
        {
          "level": 5,
          "passive": "攻击力+30，先手值+45，闪避率+18%，闪避后70%概率反击（60%伤害）"
        }
      ]
    },
    {
      "id": "tal_unquenchable_flame",
      "name": "不灭之焰",
      "quality": 4,
      "type": 1,
      "tags": [
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时30%概率使目标灼烧（5回合），灼烧伤害+40%，灼烧目标受到的所有伤害+15%"
        },
        {
          "level": 2,
          "passive": "攻击时35%概率使目标灼烧（5回合），灼烧伤害+50%，灼烧目标受到的所有伤害+20%"
        },
        {
          "level": 3,
          "passive": "攻击时40%概率使目标灼烧（5回合），灼烧伤害+60%，灼烧目标受到的所有伤害+25%"
        },
        {
          "level": 4,
          "passive": "攻击时45%概率使目标灼烧（5回合），灼烧伤害+70%，灼烧目标受到的所有伤害+30%"
        },
        {
          "level": 5,
          "passive": "攻击时50%概率使目标灼烧（5回合），灼烧伤害+80%，灼烧目标受到的所有伤害+40%"
        }
      ]
    },
    {
      "id": "tal_giant_blood",
      "name": "巨兽之血",
      "quality": 4,
      "type": 1,
      "tags": [
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "生命值+120，防御力+20，受到致命伤害时保留1点生命（每局限1次），生命回复效果+15%"
        },
        {
          "level": 2,
          "passive": "生命值+150，防御力+25，受到致命伤害时保留1点生命（每局限1次），生命回复效果+18%"
        },
        {
          "level": 3,
          "passive": "生命值+180，防御力+30，受到致命伤害时保留1点生命（每局限1次），生命回复效果+20%"
        },
        {
          "level": 4,
          "passive": "生命值+200，防御力+35，受到致命伤害时保留1点生命（每局限2次），生命回复效果+25%"
        },
        {
          "level": 5,
          "passive": "生命值+250，防御力+40，受到致命伤害时保留1点生命（每局限2次），生命回复效果+30%"
        }
      ]
    },
    {
      "id": "tal_void_venom",
      "name": "虚空之毒",
      "quality": 4,
      "type": 1,
      "tags": [
        25,
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "中毒伤害无视目标50%防御，中毒目标全属性-10%，毒爆伤害+30%"
        },
        {
          "level": 2,
          "passive": "中毒伤害无视目标55%防御，中毒目标全属性-12%，毒爆伤害+40%"
        },
        {
          "level": 3,
          "passive": "中毒伤害无视目标60%防御，中毒目标全属性-15%，毒爆伤害+50%"
        },
        {
          "level": 4,
          "passive": "中毒伤害无视目标65%防御，中毒目标全属性-18%，毒爆伤害+60%"
        },
        {
          "level": 5,
          "passive": "中毒伤害无视目标70%防御，中毒目标全属性-20%，毒爆伤害+80%"
        }
      ]
    },
    {
      "id": "tal_all_seeing_eye",
      "name": "全视之眼",
      "quality": 4,
      "type": 1,
      "tags": [
        21,
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+20%，暴击率+18%，攻击无法被闪避，命中时20%概率使目标防御-15%（3回合）"
        },
        {
          "level": 2,
          "passive": "命中率+22%，暴击率+20%，攻击无法被闪避，命中时25%概率使目标防御-18%（3回合）"
        },
        {
          "level": 3,
          "passive": "命中率+25%，暴击率+22%，攻击无法被闪避，命中时30%概率使目标防御-20%（3回合）"
        },
        {
          "level": 4,
          "passive": "命中率+28%，暴击率+25%，攻击无法被闪避，命中时35%概率使目标防御-25%（4回合）"
        },
        {
          "level": 5,
          "passive": "命中率+30%，暴击率+28%，攻击无法被闪避，命中时40%概率使目标防御-30%（5回合）"
        }
      ]
    },
    {
      "id": "tal_ice_flame_body",
      "name": "冰焰之躯",
      "quality": 4,
      "type": 1,
      "tags": [
        6,
        7
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时交替附加灼烧或减速（各50%概率），灼烧伤害+30%，减速持续时间+1回合，受到的冰火伤害-20%"
        },
        {
          "level": 2,
          "passive": "攻击时交替附加灼烧或减速（各50%概率），灼烧伤害+40%，减速持续时间+1回合，受到的冰火伤害-25%"
        },
        {
          "level": 3,
          "passive": "攻击时交替附加灼烧或减速（各50%概率），灼烧伤害+50%，减速持续时间+2回合，受到的冰火伤害-30%"
        },
        {
          "level": 4,
          "passive": "攻击时交替附加灼烧或减速（各50%概率），灼烧伤害+60%，减速持续时间+2回合，受到的冰火伤害-35%"
        },
        {
          "level": 5,
          "passive": "攻击时交替附加灼烧或减速（各50%概率），灼烧伤害+80%，减速持续时间+2回合，受到的冰火伤害-40%"
        }
      ]
    },
    {
      "id": "tal_chimera_soul",
      "name": "奇美拉之魂",
      "quality": 4,
      "type": 1,
      "tags": [
        24
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "同时拥有利爪、撕咬、剧毒标签效果+20%，攻击时随机附加流血/中毒/灼烧（各25%概率）"
        },
        {
          "level": 2,
          "passive": "同时拥有利爪、撕咬、剧毒标签效果+25%，攻击时随机附加流血/中毒/灼烧（各30%概率）"
        },
        {
          "level": 3,
          "passive": "同时拥有利爪、撕咬、剧毒标签效果+30%，攻击时随机附加流血/中毒/灼烧（各35%概率）"
        },
        {
          "level": 4,
          "passive": "同时拥有利爪、撕咬、剧毒标签效果+35%，攻击时随机附加流血/中毒/灼烧（各40%概率）"
        },
        {
          "level": 5,
          "passive": "同时拥有利爪、撕咬、剧毒标签效果+40%，攻击时随机附加流血/中毒/灼烧（各50%概率）"
        }
      ]
    },
    {
      "id": "tal_final_singularity_fusion",
      "name": "终焉奇点",
      "quality": 4,
      "type": 1,
      "tags": [
        25,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，击杀敌人时引发爆炸，对目标造成50%攻击力额外伤害，暴击率+10%"
        },
        {
          "level": 2,
          "passive": "攻击力+25，击杀敌人时引发爆炸，对目标造成60%攻击力额外伤害，暴击率+12%"
        },
        {
          "level": 3,
          "passive": "攻击力+30，击杀敌人时引发爆炸，对目标造成70%攻击力额外伤害，暴击率+15%"
        },
        {
          "level": 4,
          "passive": "攻击力+35，击杀敌人时引发爆炸，对目标造成80%攻击力额外伤害，暴击率+18%"
        },
        {
          "level": 5,
          "passive": "攻击力+40，击杀敌人时引发爆炸，对目标造成100%攻击力额外伤害，暴击率+20%"
        }
      ]
    },
    {
      "id": "tal_spacetime_warp",
      "name": "时空扭曲",
      "quality": 4,
      "type": 1,
      "tags": [
        15,
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+20，回合开始12%概率额外行动一次（每局限2次），先手值高于目标时伤害+15%"
        },
        {
          "level": 2,
          "passive": "先手值+25，回合开始15%概率额外行动一次（每局限2次），先手值高于目标时伤害+18%"
        },
        {
          "level": 3,
          "passive": "先手值+30，回合开始18%概率额外行动一次（每局限3次），先手值高于目标时伤害+20%"
        },
        {
          "level": 4,
          "passive": "先手值+35，回合开始20%概率额外行动一次（每局限3次），先手值高于目标时伤害+25%"
        },
        {
          "level": 5,
          "passive": "先手值+40，回合开始25%概率额外行动一次（每局限4次），先手值高于目标时伤害+30%"
        }
      ]
    },
    {
      "id": "tal_causal_chain",
      "name": "因果之链",
      "quality": 4,
      "type": 1,
      "tags": [
        26,
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "受到伤害时记录伤害，下次攻击附加记录的35%伤害（最多记录200点），受到伤害-10%"
        },
        {
          "level": 2,
          "passive": "受到伤害时记录伤害，下次攻击附加记录的40%伤害（最多记录250点），受到伤害-12%"
        },
        {
          "level": 3,
          "passive": "受到伤害时记录伤害，下次攻击附加记录的45%伤害（最多记录300点），受到伤害-15%"
        },
        {
          "level": 4,
          "passive": "受到伤害时记录伤害，下次攻击附加记录的50%伤害（最多记录400点），受到伤害-18%"
        },
        {
          "level": 5,
          "passive": "受到伤害时记录伤害，下次攻击附加记录的60%伤害（最多记录500点），受到伤害-20%"
        }
      ]
    },
    {
      "id": "tal_bloodthirst",
      "name": "嗜血渴望",
      "quality": 1,
      "type": 1,
      "tags": [
        2
      ],
      "isInfiniteGrowth": true,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [],
      "maxLevel": -1,
      "effects": [
        {
          "level": 1,
          "passive": "每击杀一个敌人，本局永久提升1点攻击力"
        }
      ]
    },
    {
      "id": "tal_tenacity",
      "name": "坚韧",
      "quality": 1,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": true,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [],
      "maxLevel": -1,
      "effects": [
        {
          "level": 1,
          "passive": "每击杀一个敌人，本局永久提升3点生命值"
        }
      ]
    },
    {
      "id": "tal_predator_instinct",
      "name": "猎食者",
      "quality": 2,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": true,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [],
      "maxLevel": -1,
      "effects": [
        {
          "level": 1,
          "passive": "每击杀一个敌人，本局永久提升0.5%暴击率（本局最多15%）"
        }
      ]
    },
    {
      "id": "tal_gene_mutation",
      "name": "基因突变",
      "quality": 2,
      "type": 1,
      "tags": [
        24
      ],
      "isInfiniteGrowth": true,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [],
      "maxLevel": -1,
      "effects": [
        {
          "level": 1,
          "passive": "每击杀一个敌人，本局随机永久提升1点攻击/防御/生命（本局最多30点）"
        }
      ]
    },
    {
      "id": "tal_devour_evolution",
      "name": "吞噬进化",
      "quality": 3,
      "type": 1,
      "tags": [
        24
      ],
      "isInfiniteGrowth": true,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [],
      "maxLevel": -1,
      "effects": [
        {
          "level": 1,
          "passive": "吞噬首领级敌人，本局永久提升3点全属性（本局最多15次）"
        }
      ]
    },
    {
      "id": "tal_infinite_proliferation",
      "name": "无限增殖",
      "quality": 4,
      "type": 1,
      "tags": [
        10
      ],
      "isInfiniteGrowth": true,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合回复已损失生命值的8%，回复效果+30%，生命低于30%时回复效果翻倍"
        },
        {
          "level": 2,
          "passive": "每回合回复已损失生命值的10%，回复效果+40%，生命低于30%时回复效果翻倍"
        },
        {
          "level": 3,
          "passive": "每回合回复已损失生命值的12%，回复效果+50%，生命低于30%时回复效果翻倍"
        },
        {
          "level": 4,
          "passive": "每回合回复已损失生命值的15%，回复效果+60%，生命低于30%时回复效果翻倍"
        },
        {
          "level": 5,
          "passive": "每回合回复已损失生命值的20%，回复效果+80%，生命低于30%时回复效果翻倍"
        }
      ]
    },
    {
      "id": "tal_pseudopod",
      "name": "伪足",
      "quality": 1,
      "type": 1,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，攻击时有15%概率束缚目标1回合"
        },
        {
          "level": 2,
          "passive": "攻击力+3，攻击时有20%概率束缚目标1回合"
        },
        {
          "level": 3,
          "passive": "攻击力+4，攻击时有25%概率束缚目标1回合"
        },
        {
          "level": 4,
          "passive": "攻击力+5，攻击时有30%概率束缚目标1回合"
        },
        {
          "level": 5,
          "passive": "攻击力+6，攻击时有35%概率束缚目标1回合"
        }
      ]
    },
    {
      "id": "tal_flagellum",
      "name": "鞭毛",
      "quality": 1,
      "type": 1,
      "tags": [
        15,
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+5，水中移速提升"
        },
        {
          "level": 2,
          "passive": "先手值+7，水中移速提升"
        },
        {
          "level": 3,
          "passive": "先手值+9，水中移速提升"
        },
        {
          "level": 4,
          "passive": "先手值+11，水中移速提升"
        },
        {
          "level": 5,
          "passive": "先手值+13，水中移速提升"
        }
      ]
    },
    {
      "id": "tal_cilia",
      "name": "纤毛",
      "quality": 1,
      "type": 1,
      "tags": [
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "水环境受到伤害降低5%，先手值+2"
        },
        {
          "level": 2,
          "passive": "水环境受到伤害降低12%，先手值+3"
        },
        {
          "level": 3,
          "passive": "水环境受到伤害降低25%，先手值+4"
        },
        {
          "level": 4,
          "passive": "水环境受到伤害降低47%，先手值+5"
        },
        {
          "level": 5,
          "passive": "水环境受到伤害降低69%，先手值+6"
        }
      ]
    },
    {
      "id": "tal_inject",
      "name": "刺注腺体",
      "quality": 1,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，普攻附带2回合每层3点毒素伤害"
        },
        {
          "level": 2,
          "passive": "攻击力+3，普攻附带2回合每层4点毒素伤害"
        },
        {
          "level": 3,
          "passive": "攻击力+4，普攻附带2回合每层5点毒素伤害"
        },
        {
          "level": 4,
          "passive": "攻击力+5，普攻附带2回合每层6点毒素伤害"
        },
        {
          "level": 5,
          "passive": "攻击力+6，普攻附带2回合每层7点毒素伤害"
        }
      ]
    },
    {
      "id": "tal_phagocytosis",
      "name": "吞噬胞膜",
      "quality": 2,
      "type": 2,
      "tags": [
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "击杀单位恢复6%最大生命"
        },
        {
          "level": 2,
          "passive": "击杀单位恢复8%最大生命"
        },
        {
          "level": 3,
          "passive": "击杀单位恢复10%最大生命"
        },
        {
          "level": 4,
          "passive": "击杀单位恢复12%最大生命"
        },
        {
          "level": 5,
          "passive": "击杀单位恢复14%最大生命"
        }
      ]
    },
    {
      "id": "tal_viral_swarm",
      "name": "胞内菌群",
      "quality": 2,
      "type": 2,
      "tags": [
        3,
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每次攻击附加1层弱感染，持续2回合"
        },
        {
          "level": 2,
          "passive": "每次攻击附加2层弱感染，持续2回合"
        },
        {
          "level": 3,
          "passive": "每次攻击附加3层弱感染，持续2回合"
        },
        {
          "level": 4,
          "passive": "每次攻击附加4层弱感染，持续2回合"
        },
        {
          "level": 5,
          "passive": "每次攻击附加5层弱感染，持续2回合"
        }
      ]
    },
    {
      "id": "tal_cnidocyte",
      "name": "刺细胞",
      "quality": 2,
      "type": 2,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "被近战攻击时有15%概率麻痹敌方1回合"
        },
        {
          "level": 2,
          "passive": "被近战攻击时有20%概率麻痹敌方1回合"
        },
        {
          "level": 3,
          "passive": "被近战攻击时有25%概率麻痹敌方1回合"
        },
        {
          "level": 4,
          "passive": "被近战攻击时有30%概率麻痹敌方1回合"
        },
        {
          "level": 5,
          "passive": "被近战攻击时有35%概率麻痹敌方1回合"
        }
      ]
    },
    {
      "id": "tal_protocore",
      "name": "原始胞核",
      "quality": 3,
      "type": 1,
      "tags": [
        24
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": "boss_core_primal"
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "全属性小幅提升，对原始生物伤害+18%"
        },
        {
          "level": 2,
          "passive": "全属性小幅提升，对原始生物伤害+26%"
        },
        {
          "level": 3,
          "passive": "全属性小幅提升，对原始生物伤害+32%"
        },
        {
          "level": 4,
          "passive": "全属性小幅提升，对原始生物伤害+39%"
        },
        {
          "level": 5,
          "passive": "全属性小幅提升，对原始生物伤害+45%"
        }
      ]
    },
    {
      "id": "tal_bristle",
      "name": "刚毛",
      "quality": 1,
      "type": 1,
      "tags": [
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+2，受到近战攻击反弹3点伤害"
        },
        {
          "level": 2,
          "passive": "防御力+3，受到近战攻击反弹4点伤害"
        },
        {
          "level": 3,
          "passive": "防御力+4，受到近战攻击反弹5点伤害"
        },
        {
          "level": 4,
          "passive": "防御力+5，受到近战攻击反弹6点伤害"
        },
        {
          "level": 5,
          "passive": "防御力+6，受到近战攻击反弹7点伤害"
        }
      ]
    },
    {
      "id": "tal_carapace",
      "name": "薄甲壳",
      "quality": 1,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，先手值+2"
        },
        {
          "level": 2,
          "passive": "防御力+6，先手值+3"
        },
        {
          "level": 3,
          "passive": "防御力+8，先手值+4"
        },
        {
          "level": 4,
          "passive": "防御力+10，先手值+5"
        },
        {
          "level": 5,
          "passive": "防御力+12，先手值+6"
        }
      ]
    },
    {
      "id": "tal_spiral_shell",
      "name": "螺旋外壳",
      "quality": 1,
      "type": 2,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "最大生命+20，单次伤害减伤5%"
        },
        {
          "level": 2,
          "passive": "最大生命+30，单次伤害减伤9%"
        },
        {
          "level": 3,
          "passive": "最大生命+40，单次伤害减伤15%"
        },
        {
          "level": 4,
          "passive": "最大生命+50，单次伤害减伤23%"
        },
        {
          "level": 5,
          "passive": "最大生命+60，单次伤害减伤29%"
        }
      ]
    },
    {
      "id": "tal_big_claw",
      "name": "巨螯",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+5，攻击时10%概率束缚目标1回合"
        },
        {
          "level": 2,
          "passive": "攻击力+7，攻击时15%概率束缚目标1回合"
        },
        {
          "level": 3,
          "passive": "攻击力+9，攻击时20%概率束缚目标1回合"
        },
        {
          "level": 4,
          "passive": "攻击力+11，攻击时25%概率束缚目标1回合"
        },
        {
          "level": 5,
          "passive": "攻击力+13，攻击时30%概率束缚目标1回合"
        }
      ]
    },
    {
      "id": "tal_toxic_mucus",
      "name": "毒粘液",
      "quality": 2,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "近身敌方每回合受到2点毒素伤害"
        },
        {
          "level": 2,
          "passive": "近身敌方每回合受到3点毒素伤害"
        },
        {
          "level": 3,
          "passive": "近身敌方每回合受到4点毒素伤害"
        },
        {
          "level": 4,
          "passive": "近身敌方每回合受到5点毒素伤害"
        },
        {
          "level": 5,
          "passive": "近身敌方每回合受到6点毒素伤害"
        }
      ]
    },
    {
      "id": "tal_mud_jump",
      "name": "泥地弹跳",
      "quality": 2,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "泥地地形先手值+8"
        },
        {
          "level": 2,
          "passive": "泥地地形先手值+12"
        },
        {
          "level": 3,
          "passive": "泥地地形先手值+16"
        },
        {
          "level": 4,
          "passive": "泥地地形先手值+20"
        },
        {
          "level": 5,
          "passive": "泥地地形先手值+24"
        }
      ]
    },
    {
      "id": "tal_venom_tentacle",
      "name": "毒触须",
      "quality": 2,
      "type": 2,
      "tags": [
        3,
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "触击同时造成束缚1回合，并施加1层中毒"
        },
        {
          "level": 2,
          "passive": "触击同时造成束缚1回合，并施加2层中毒"
        },
        {
          "level": 3,
          "passive": "触击同时造成束缚2回合，并施加3层中毒"
        },
        {
          "level": 4,
          "passive": "触击同时造成束缚2回合，并施加4层中毒"
        },
        {
          "level": 5,
          "passive": "触击同时造成束缚2回合，并施加5层中毒"
        }
      ]
    },
    {
      "id": "tal_mud_burrow",
      "name": "掘土蛰伏",
      "quality": 3,
      "type": 2,
      "tags": [
        17
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "蛰伏状态受到伤害降低12%"
        },
        {
          "level": 2,
          "passive": "蛰伏状态受到伤害降低21%"
        },
        {
          "level": 3,
          "passive": "蛰伏状态受到伤害降低34%"
        },
        {
          "level": 4,
          "passive": "蛰伏状态受到伤害降低48%"
        },
        {
          "level": 5,
          "passive": "蛰伏状态受到伤害降低64%"
        }
      ]
    },
    {
      "id": "tal_calcium_shell",
      "name": "碳酸钙外壳",
      "quality": 1,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，穿刺伤害-8%"
        },
        {
          "level": 2,
          "passive": "防御力+6，穿刺伤害-11%"
        },
        {
          "level": 3,
          "passive": "防御力+8，穿刺伤害-14%"
        },
        {
          "level": 4,
          "passive": "防御力+10，穿刺伤害-17%"
        },
        {
          "level": 5,
          "passive": "防御力+12，穿刺伤害-20%"
        }
      ]
    },
    {
      "id": "tal_hammer_punch",
      "name": "锤击肢体",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，攻击时有10%概率眩晕目标1回合"
        },
        {
          "level": 2,
          "passive": "攻击力+4，攻击时有15%概率眩晕目标1回合"
        },
        {
          "level": 3,
          "passive": "攻击力+5，攻击时有20%概率眩晕目标1回合"
        },
        {
          "level": 4,
          "passive": "攻击力+6，攻击时有25%概率眩晕目标1回合"
        },
        {
          "level": 5,
          "passive": "攻击力+7，攻击时有30%概率眩晕目标1回合"
        }
      ]
    },
    {
      "id": "tal_spine_armor",
      "name": "棘刺护甲",
      "quality": 1,
      "type": 1,
      "tags": [
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+3，受到近战攻击反弹4点伤害"
        },
        {
          "level": 2,
          "passive": "防御力+4，受到近战攻击反弹6点伤害"
        },
        {
          "level": 3,
          "passive": "防御力+5，受到近战攻击反弹8点伤害"
        },
        {
          "level": 4,
          "passive": "防御力+6，受到近战攻击反弹10点伤害"
        },
        {
          "level": 5,
          "passive": "防御力+7，受到近战攻击反弹12点伤害"
        }
      ]
    },
    {
      "id": "tal_agile_swim",
      "name": "敏捷泳肢",
      "quality": 1,
      "type": 1,
      "tags": [
        15,
        18
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+4，水中闪避+5%"
        },
        {
          "level": 2,
          "passive": "先手值+6，水中闪避+7%"
        },
        {
          "level": 3,
          "passive": "先手值+8，水中闪避+9%"
        },
        {
          "level": 4,
          "passive": "先手值+10，水中闪避+11%"
        },
        {
          "level": 5,
          "passive": "先手值+12，水中闪避+13%"
        }
      ]
    },
    {
      "id": "tal_venom_spine",
      "name": "毒棘",
      "quality": 2,
      "type": 2,
      "tags": [
        3,
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "反击附带1层中毒，持续2回合"
        },
        {
          "level": 2,
          "passive": "反击附带2层中毒，持续2回合"
        },
        {
          "level": 3,
          "passive": "反击附带3层中毒，持续2回合"
        },
        {
          "level": 4,
          "passive": "反击附带4层中毒，持续3回合"
        },
        {
          "level": 5,
          "passive": "反击附带5层中毒，持续3回合"
        }
      ]
    },
    {
      "id": "tal_camouflage",
      "name": "珊瑚拟态",
      "quality": 2,
      "type": 1,
      "tags": [
        11
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "初始闪避+5%"
        },
        {
          "level": 2,
          "passive": "初始闪避+7%"
        },
        {
          "level": 3,
          "passive": "初始闪避+9%"
        },
        {
          "level": 4,
          "passive": "初始闪避+11%"
        },
        {
          "level": 5,
          "passive": "初始闪避+13%"
        }
      ]
    },
    {
      "id": "tal_serpent_bite",
      "name": "蛇形利齿",
      "quality": 2,
      "type": 1,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "撕咬伤害+10%"
        },
        {
          "level": 2,
          "passive": "撕咬伤害+13%"
        },
        {
          "level": 3,
          "passive": "撕咬伤害+16%"
        },
        {
          "level": 4,
          "passive": "撕咬伤害+19%"
        },
        {
          "level": 5,
          "passive": "撕咬伤害+22%"
        }
      ]
    },
    {
      "id": "tal_reef_maw",
      "name": "礁窟巨口",
      "quality": 3,
      "type": 2,
      "tags": [
        24
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "吞噬敌人额外获取10%碎片收益"
        },
        {
          "level": 2,
          "passive": "吞噬敌人额外获取13%碎片收益"
        },
        {
          "level": 3,
          "passive": "吞噬敌人额外获取16%碎片收益"
        },
        {
          "level": 4,
          "passive": "吞噬敌人额外获取19%碎片收益"
        },
        {
          "level": 5,
          "passive": "吞噬敌人额外获取22%碎片收益"
        }
      ]
    },
    {
      "id": "tal_snail_shell",
      "name": "螺壳防护",
      "quality": 1,
      "type": 1,
      "tags": [
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+5，受到暴击伤害-10%"
        },
        {
          "level": 2,
          "passive": "防御力+7，受到暴击伤害-13%"
        },
        {
          "level": 3,
          "passive": "防御力+9，受到暴击伤害-16%"
        },
        {
          "level": 4,
          "passive": "防御力+11，受到暴击伤害-19%"
        },
        {
          "level": 5,
          "passive": "防御力+13，受到暴击伤害-22%"
        }
      ]
    },
    {
      "id": "tal_venom_fang",
      "name": "毒牙",
      "quality": 1,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，攻击时20%概率使目标中毒（2回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+4，攻击时25%概率使目标中毒（2回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+5，攻击时30%概率使目标中毒（2回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+6，攻击时35%概率使目标中毒（2回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+7，攻击时40%概率使目标中毒（2回合）"
        }
      ]
    },
    {
      "id": "tal_roll_defense",
      "name": "卷曲防御",
      "quality": 1,
      "type": 1,
      "tags": [
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+3，可主动进入防御姿态，减伤15%"
        },
        {
          "level": 2,
          "passive": "防御力+4，可主动进入防御姿态，减伤20%"
        },
        {
          "level": 3,
          "passive": "防御力+5，可主动进入防御姿态，减伤25%"
        },
        {
          "level": 4,
          "passive": "防御力+6，可主动进入防御姿态，减伤30%"
        },
        {
          "level": 5,
          "passive": "防御力+7，可主动进入防御姿态，减伤35%"
        }
      ]
    },
    {
      "id": "tal_spring_tail",
      "name": "弹尾肢体",
      "quality": 1,
      "type": 1,
      "tags": [
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+5，逃跑成功率+10%"
        },
        {
          "level": 2,
          "passive": "先手值+7，逃跑成功率+13%"
        },
        {
          "level": 3,
          "passive": "先手值+9，逃跑成功率+16%"
        },
        {
          "level": 4,
          "passive": "先手值+11，逃跑成功率+19%"
        },
        {
          "level": 5,
          "passive": "先手值+13，逃跑成功率+22%"
        }
      ]
    },
    {
      "id": "tal_sonar_sense",
      "name": "声波感知",
      "quality": 2,
      "type": 1,
      "tags": [
        22
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手值+5"
        },
        {
          "level": 2,
          "passive": "先手值+10"
        },
        {
          "level": 3,
          "passive": "先手值+15"
        },
        {
          "level": 4,
          "passive": "先手值+20"
        },
        {
          "level": 5,
          "passive": "先手值+25"
        }
      ]
    },
    {
      "id": "tal_phantom_mimic",
      "name": "虚影拟态",
      "quality": 2,
      "type": 1,
      "tags": [
        11
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "受到攻击时有15%概率生成虚影规避伤害"
        },
        {
          "level": 2,
          "passive": "受到攻击时有20%概率生成虚影规避伤害"
        },
        {
          "level": 3,
          "passive": "受到攻击时有25%概率生成虚影规避伤害"
        },
        {
          "level": 4,
          "passive": "受到攻击时有30%概率生成虚影规避伤害"
        },
        {
          "level": 5,
          "passive": "受到攻击时有35%概率生成虚影规避伤害"
        }
      ]
    },
    {
      "id": "tal_toxic_skin",
      "name": "毒表皮",
      "quality": 2,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "近身攻击者持续受到每回合1%最大生命的毒素伤害"
        },
        {
          "level": 2,
          "passive": "近身攻击者持续受到每回合2%最大生命的毒素伤害"
        },
        {
          "level": 3,
          "passive": "近身攻击者持续受到每回合3%最大生命的毒素伤害"
        },
        {
          "level": 4,
          "passive": "近身攻击者持续受到每回合4%最大生命的毒素伤害"
        },
        {
          "level": 5,
          "passive": "近身攻击者持续受到每回合5%最大生命的毒素伤害"
        }
      ]
    },
    {
      "id": "tal_mycelial_web",
      "name": "菌丝网络",
      "quality": 3,
      "type": 2,
      "tags": [
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "敌方先手值-5%"
        },
        {
          "level": 2,
          "passive": "敌方先手值-5%"
        },
        {
          "level": 3,
          "passive": "敌方先手值-10%"
        },
        {
          "level": 4,
          "passive": "敌方先手值-10%"
        },
        {
          "level": 5,
          "passive": "敌方先手值-10%"
        }
      ]
    },
    {
      "id": "tal_bright_toxin",
      "name": "亮彩毒素",
      "quality": 1,
      "type": 2,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，毒素效果附带致盲（目标命中率-10%）"
        },
        {
          "level": 2,
          "passive": "攻击力+3，毒素效果附带致盲（目标命中率-13%）"
        },
        {
          "level": 3,
          "passive": "攻击力+4，毒素效果附带致盲（目标命中率-16%）"
        },
        {
          "level": 4,
          "passive": "攻击力+5，毒素效果附带致盲（目标命中率-19%）"
        },
        {
          "level": 5,
          "passive": "攻击力+6，毒素效果附带致盲（目标命中率-22%）"
        }
      ]
    },
    {
      "id": "tal_leaf_cutter",
      "name": "切割颚",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+4，攻击无视5%防御"
        },
        {
          "level": 2,
          "passive": "攻击力+6，攻击无视7%防御"
        },
        {
          "level": 3,
          "passive": "攻击力+8，攻击无视9%防御"
        },
        {
          "level": 4,
          "passive": "攻击力+10，攻击无视11%防御"
        },
        {
          "level": 5,
          "passive": "攻击力+12，攻击无视13%防御"
        }
      ]
    },
    {
      "id": "tal_pincer_tail",
      "name": "尾钳",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，有10%概率发动二次追击"
        },
        {
          "level": 2,
          "passive": "攻击力+4，有15%概率发动二次追击"
        },
        {
          "level": 3,
          "passive": "攻击力+5，有20%概率发动二次追击"
        },
        {
          "level": 4,
          "passive": "攻击力+6，有25%概率发动二次追击"
        },
        {
          "level": 5,
          "passive": "攻击力+7，有30%概率发动二次追击"
        }
      ]
    },
    {
      "id": "tal_swarm_bite",
      "name": "集群撕咬",
      "quality": 1,
      "type": 1,
      "tags": [
        28,
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，敌方数量越多自身攻击越高（每个+3%）"
        },
        {
          "level": 2,
          "passive": "攻击力+3，敌方数量越多自身攻击越高（每个+4%）"
        },
        {
          "level": 3,
          "passive": "攻击力+4，敌方数量越多自身攻击越高（每个+5%）"
        },
        {
          "level": 4,
          "passive": "攻击力+5，敌方数量越多自身攻击越高（每个+6%）"
        },
        {
          "level": 5,
          "passive": "攻击力+6，敌方数量越多自身攻击越高（每个+7%）"
        }
      ]
    },
    {
      "id": "tal_tail_whip",
      "name": "尾鞭",
      "quality": 2,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "可同时攻击相邻单位"
        },
        {
          "level": 2,
          "passive": "可同时攻击相邻单位，群体攻击伤害+5%"
        },
        {
          "level": 3,
          "passive": "可同时攻击相邻单位，群体攻击伤害+10%"
        },
        {
          "level": 4,
          "passive": "可同时攻击相邻单位，群体攻击伤害+15%"
        },
        {
          "level": 5,
          "passive": "可同时攻击相邻单位，群体攻击伤害+25%"
        }
      ]
    },
    {
      "id": "tal_urticating_hair",
      "name": "蛰毛",
      "quality": 2,
      "type": 2,
      "tags": [
        3,
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "受到攻击时释放蛰毛毒素，造成每回合1%最大生命伤害"
        },
        {
          "level": 2,
          "passive": "受到攻击时释放蛰毛毒素，造成每回合2%最大生命伤害"
        },
        {
          "level": 3,
          "passive": "受到攻击时释放蛰毛毒素，造成每回合3%最大生命伤害"
        },
        {
          "level": 4,
          "passive": "受到攻击时释放大范围蛰毛，造成每回合4%最大生命伤害"
        },
        {
          "level": 5,
          "passive": "受到攻击时释放大范围蛰毛，造成每回合5%最大生命伤害"
        }
      ]
    },
    {
      "id": "tal_shadow_stalk",
      "name": "暗影潜行",
      "quality": 3,
      "type": 1,
      "tags": [
        17
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "暗影环境下闪避+12%"
        },
        {
          "level": 2,
          "passive": "暗影环境下闪避+16%"
        },
        {
          "level": 3,
          "passive": "暗影环境下闪避+20%"
        },
        {
          "level": 4,
          "passive": "暗影环境下闪避+24%"
        },
        {
          "level": 5,
          "passive": "暗影环境下闪避+28%"
        }
      ]
    },
    {
      "id": "tal_tusk_charge",
      "name": "獠牙冲锋",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，冲锋攻击伤害+12%"
        },
        {
          "level": 2,
          "passive": "攻击力+4，冲锋攻击伤害+16%"
        },
        {
          "level": 3,
          "passive": "攻击力+5，冲锋攻击伤害+20%"
        },
        {
          "level": 4,
          "passive": "攻击力+6，冲锋攻击伤害+24%"
        },
        {
          "level": 5,
          "passive": "攻击力+7，冲锋攻击伤害+28%"
        }
      ]
    },
    {
      "id": "tal_group_hunt",
      "name": "群体狩猎",
      "quality": 1,
      "type": 1,
      "tags": [
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+2，造成伤害+5%"
        },
        {
          "level": 2,
          "passive": "攻击力+3，造成伤害+7%"
        },
        {
          "level": 3,
          "passive": "攻击力+4，造成伤害+9%"
        },
        {
          "level": 4,
          "passive": "攻击力+5，造成伤害+11%"
        },
        {
          "level": 5,
          "passive": "攻击力+6，造成伤害+13%"
        }
      ]
    },
    {
      "id": "tal_scavenger_sense",
      "name": "腐食感知",
      "quality": 1,
      "type": 1,
      "tags": [
        20
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "对生命值低于30%的目标伤害+8%"
        },
        {
          "level": 2,
          "passive": "对生命值低于30%的目标伤害+11%"
        },
        {
          "level": 3,
          "passive": "对生命值低于30%的目标伤害+14%"
        },
        {
          "level": 4,
          "passive": "对生命值低于30%的目标伤害+17%"
        },
        {
          "level": 5,
          "passive": "对生命值低于30%的目标伤害+20%"
        }
      ]
    },
    {
      "id": "tal_herd_kick",
      "name": "蹄踏冲击",
      "quality": 1,
      "type": 1,
      "tags": [
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+3，近战攻击有10%概率使目标束缚1回合"
        },
        {
          "level": 2,
          "passive": "攻击力+4，近战攻击有15%概率使目标束缚1回合"
        },
        {
          "level": 3,
          "passive": "攻击力+5，近战攻击有20%概率使目标束缚1回合"
        },
        {
          "level": 4,
          "passive": "攻击力+6，近战攻击有25%概率使目标束缚1回合"
        },
        {
          "level": 5,
          "passive": "攻击力+7，近战攻击有30%概率使目标束缚1回合"
        }
      ]
    },
    {
      "id": "tal_crushing_jaw",
      "name": "碎颚",
      "quality": 2,
      "type": 1,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "撕咬降低敌方5%防御"
        },
        {
          "level": 2,
          "passive": "撕咬降低敌方7%防御"
        },
        {
          "level": 3,
          "passive": "撕咬降低敌方9%防御"
        },
        {
          "level": 4,
          "passive": "撕咬降低敌方11%防御"
        },
        {
          "level": 5,
          "passive": "撕咬降低敌方13%防御"
        }
      ]
    },
    {
      "id": "tal_sprint_claw",
      "name": "奔袭利爪",
      "quality": 2,
      "type": 1,
      "tags": [
        1,
        15
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "先手攻击增伤10%"
        },
        {
          "level": 2,
          "passive": "先手攻击增伤13%"
        },
        {
          "level": 3,
          "passive": "先手攻击增伤16%"
        },
        {
          "level": 4,
          "passive": "先手攻击增伤19%"
        },
        {
          "level": 5,
          "passive": "先手攻击增伤22%"
        }
      ]
    },
    {
      "id": "tal_coordinated_hunt",
      "name": "协同狩猎",
      "quality": 2,
      "type": 1,
      "tags": [
        28
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 8,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "造成伤害+5%"
        },
        {
          "level": 2,
          "passive": "造成伤害+7%"
        },
        {
          "level": 3,
          "passive": "造成伤害+9%"
        },
        {
          "level": 4,
          "passive": "造成伤害+11%"
        },
        {
          "level": 5,
          "passive": "造成伤害+13%"
        }
      ]
    },
    {
      "id": "tal_king_roar",
      "name": "王者咆哮",
      "quality": 3,
      "type": 2,
      "tags": [
        27
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 4,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "周围敌方单位攻击-8%"
        },
        {
          "level": 2,
          "passive": "周围敌方单位攻击-11%"
        },
        {
          "level": 3,
          "passive": "周围敌方单位攻击-14%"
        },
        {
          "level": 4,
          "passive": "周围敌方单位攻击-17%"
        },
        {
          "level": 5,
          "passive": "周围敌方单位攻击-20%"
        }
      ]
    },
    {
      "id": "tal_fusion_blood_bone",
      "name": "噬血碎骨",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_bone_crusher",
        "tal_blood_feast"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，吸取造成伤害的12%为生命，击杀敌人后回复15%最大生命"
        },
        {
          "level": 2,
          "passive": "攻击力+25，吸取造成伤害的15%为生命，击杀敌人后回复18%最大生命"
        },
        {
          "level": 3,
          "passive": "攻击力+30，吸取造成伤害的18%为生命，击杀敌人后回复20%最大生命"
        },
        {
          "level": 4,
          "passive": "攻击力+38，吸取造成伤害的22%为生命，击杀敌人后回复22%最大生命"
        },
        {
          "level": 5,
          "passive": "攻击力+45，吸取造成伤害的25%为生命，击杀敌人后回复25%最大生命"
        }
      ],
      "description": "碎骨者与血之盛宴融合而成，攻击时吸取敌人生命，越战越强",
      "tags": [
        2,
        1
      ]
    },
    {
      "id": "tal_fusion_immortal",
      "name": "金刚不死",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_indestructible_body",
        "tal_undying_body"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "防御力+30，每回合回复15点生命，减伤+12%，受到攻击时25%概率反弹35%伤害"
        },
        {
          "level": 2,
          "passive": "防御力+38，每回合回复18点生命，减伤+15%，受到攻击时30%概率反弹40%伤害"
        },
        {
          "level": 3,
          "passive": "防御力+45，每回合回复22点生命，减伤+18%，受到攻击时35%概率反弹45%伤害"
        },
        {
          "level": 4,
          "passive": "防御力+52，每回合回复25点生命，减伤+20%，受到攻击时40%概率反弹50%伤害"
        },
        {
          "level": 5,
          "passive": "防御力+60，每回合回复30点生命，减伤+25%，受到攻击时45%概率反弹60%伤害"
        }
      ],
      "description": "不坏金身与不死之躯融合而成，金刚不坏，永生不灭",
      "tags": [
        8,
        10,
        12
      ]
    },
    {
      "id": "tal_fusion_neuro_poison",
      "name": "万毒神经",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_myriad_poisons",
        "tal_neurotoxin_king"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "攻击时100%概率使目标中毒（3回合，3层），中毒伤害+25%，攻击中毒目标时伤害+20%"
        },
        {
          "level": 2,
          "passive": "攻击时100%概率使目标中毒（3回合，4层），中毒伤害+30%，攻击中毒目标时伤害+25%"
        },
        {
          "level": 3,
          "passive": "攻击时100%概率使目标中毒（3回合，5层），中毒伤害+35%，攻击中毒目标时伤害+30%"
        },
        {
          "level": 4,
          "passive": "攻击时100%概率使目标中毒（3回合，6层），中毒伤害+40%，攻击中毒目标时伤害+35%"
        },
        {
          "level": 5,
          "passive": "攻击时100%概率使目标中毒（3回合，8层），中毒伤害+50%，攻击中毒目标时伤害+50%"
        }
      ],
      "description": "万毒之源与神经毒液·王融合而成，剧毒与神经毒素结合，敌人中招后动弹不得",
      "tags": [
        3
      ]
    },
    {
      "id": "tal_fusion_storm_sky",
      "name": "风暴天空",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_sky_dominator",
        "tal_storm_lord"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+18，先手值+30，闪避率+9%，攻击时25%概率麻痹目标（1回合）"
        },
        {
          "level": 2,
          "passive": "攻击力+22，先手值+35，闪避率+12%，攻击时30%概率麻痹目标（1回合）"
        },
        {
          "level": 3,
          "passive": "攻击力+27，先手值+42，闪避率+14%，攻击时35%概率麻痹目标（2回合）"
        },
        {
          "level": 4,
          "passive": "攻击力+30，先手值+48，闪避率+16%，攻击时40%概率麻痹目标（2回合）"
        },
        {
          "level": 5,
          "passive": "攻击力+35，先手值+55，闪避率+18%，攻击时45%概率麻痹目标（2回合）"
        }
      ],
      "description": "天空霸主与风暴之主融合而成，如风暴般迅捷，先手攻击威力惊人",
      "tags": [
        14,
        4
      ]
    },
    {
      "id": "tal_fusion_thorn_bind",
      "name": "荆棘缠绕",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_vengeful_thorns",
        "tal_world_entangle"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "防御力+28，受到攻击时55%概率反弹50%伤害，攻击时25%概率束缚目标（1回合）"
        },
        {
          "level": 2,
          "passive": "防御力+35，受到攻击时60%概率反弹55%伤害，攻击时30%概率束缚目标（1回合）"
        },
        {
          "level": 3,
          "passive": "防御力+42，受到攻击时65%概率反弹60%伤害，攻击时35%概率束缚目标（1回合）"
        },
        {
          "level": 4,
          "passive": "防御力+48，受到攻击时70%概率反弹65%伤害，攻击时40%概率束缚目标（2回合）"
        },
        {
          "level": 5,
          "passive": "防御力+55，受到攻击时75%概率反弹70%伤害，攻击时45%概率束缚目标（2回合）"
        }
      ],
      "description": "复仇荆棘与世界缠绕融合而成，浑身长满荆棘，触碰者既受伤又被束缚",
      "tags": [
        5,
        12
      ]
    },
    {
      "id": "tal_fusion_infinite_devour",
      "name": "无限吞噬",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_primal_devour",
        "tal_abyssal_devour"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，生命值+70，击杀敌人时回复15%最大生命，吸取造成伤害的9%为生命"
        },
        {
          "level": 2,
          "passive": "攻击力+25，生命值+90，击杀敌人时回复18%最大生命，吸取造成伤害的11%为生命"
        },
        {
          "level": 3,
          "passive": "攻击力+28，生命值+120，击杀敌人时回复22%最大生命，吸取造成伤害的14%为生命"
        },
        {
          "level": 4,
          "passive": "攻击力+35，生命值+150，击杀敌人时回复25%最大生命，吸取造成伤害的17%为生命"
        },
        {
          "level": 5,
          "passive": "攻击力+42，生命值+180，击杀敌人时回复30%最大生命，吸取造成伤害的20%为生命"
        }
      ],
      "description": "原始吞噬与深渊吞噬融合而成，吞噬一切，无限成长，击杀敌人后永久变强",
      "tags": [
        24,
        26
      ]
    },
    {
      "id": "tal_fusion_beast_dragon",
      "name": "百兽龙威",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_dragon_might",
        "tal_beast_intimidation"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，防御力+20，战斗开始时40%概率降低敌人攻击力25%（持续2回合），对首领伤害+20%"
        },
        {
          "level": 2,
          "passive": "攻击力+25，防御力+25，战斗开始时45%概率降低敌人攻击力28%（持续2回合），对首领伤害+25%"
        },
        {
          "level": 3,
          "passive": "攻击力+28，防御力+28，战斗开始时50%概率降低敌人攻击力30%（持续3回合），对首领伤害+30%"
        },
        {
          "level": 4,
          "passive": "攻击力+35，防御力+35，战斗开始时55%概率降低敌人攻击力32%（持续3回合），对首领伤害+35%"
        },
        {
          "level": 5,
          "passive": "攻击力+42，防御力+42，战斗开始时60%概率降低敌人攻击力35%（持续3回合），对首领伤害+40%"
        }
      ],
      "description": "龙威与百兽威慑融合而成，龙之威严震慑百兽，敌人未战先怯",
      "tags": [
        27
      ]
    },
    {
      "id": "tal_fusion_ancient_hunt",
      "name": "远古猎空",
      "quality": 4,
      "isFusion": true,
      "fusionRecipe": [
        "tal_ancient_predator",
        "tal_high_altitude_predator"
      ],
      "maxLevel": 5,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "effects": [
        {
          "level": 1,
          "passive": "攻击力+20，先手值+20，攻击时35%概率造成1.6倍暴击伤害，暴击率+10%"
        },
        {
          "level": 2,
          "passive": "攻击力+25，先手值+25，攻击时40%概率造成1.7倍暴击伤害，暴击率+13%"
        },
        {
          "level": 3,
          "passive": "攻击力+28，先手值+28，攻击时45%概率造成1.8倍暴击伤害，暴击率+16%"
        },
        {
          "level": 4,
          "passive": "攻击力+35，先手值+35，攻击时50%概率造成2.0倍暴击伤害，暴击率+19%"
        },
        {
          "level": 5,
          "passive": "攻击力+42，先手值+42，攻击时55%概率造成2.2倍暴击伤害，暴击率+22%"
        }
      ],
      "description": "远古捕食与高空捕食融合而成，远古猎手翱翔天空，一击必杀",
      "tags": [
        14,
        1
      ]
    },
    {
      "id": "tal_poison_penetration",
      "name": "毒素解构",
      "quality": 3,
      "type": 1,
      "tags": [
        3
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        5,
        8,
        12,
        18,
        25
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "毒素穿透+10%，中毒伤害+10%"
        },
        {
          "level": 2,
          "passive": "毒素穿透+15%，中毒伤害+15%"
        },
        {
          "level": 3,
          "passive": "毒素穿透+20%，中毒伤害+20%"
        },
        {
          "level": 4,
          "passive": "毒素穿透+25%，中毒伤害+25%"
        },
        {
          "level": 5,
          "passive": "毒素穿透+30%，中毒伤害+30%"
        }
      ]
    },
    {
      "id": "tal_burn_penetration",
      "name": "烈焰解构",
      "quality": 3,
      "type": 1,
      "tags": [
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        5,
        8,
        12,
        18,
        25
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "火焰穿透+10%，灼烧伤害+10%"
        },
        {
          "level": 2,
          "passive": "火焰穿透+15%，灼烧伤害+15%"
        },
        {
          "level": 3,
          "passive": "火焰穿透+20%，灼烧伤害+20%"
        },
        {
          "level": 4,
          "passive": "火焰穿透+25%，灼烧伤害+25%"
        },
        {
          "level": 5,
          "passive": "火焰穿透+30%，灼烧伤害+30%"
        }
      ]
    },
    {
      "id": "tal_bleed_penetration",
      "name": "鲜血解构",
      "quality": 3,
      "type": 1,
      "tags": [
        2
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        5,
        8,
        12,
        18,
        25
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "流血穿透+10%，流血伤害+10%"
        },
        {
          "level": 2,
          "passive": "流血穿透+15%，流血伤害+15%"
        },
        {
          "level": 3,
          "passive": "流血穿透+20%，流血伤害+20%"
        },
        {
          "level": 4,
          "passive": "流血穿透+25%，流血伤害+25%"
        },
        {
          "level": 5,
          "passive": "流血穿透+30%，流血伤害+30%"
        }
      ]
    },
    {
      "id": "tal_wither_penetration",
      "name": "凋零解构",
      "quality": 3,
      "type": 1,
      "tags": [
        23
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        5,
        8,
        12,
        18,
        25
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "凋零穿透+10%，凋零伤害+10%"
        },
        {
          "level": 2,
          "passive": "凋零穿透+15%，凋零伤害+15%"
        },
        {
          "level": 3,
          "passive": "凋零穿透+20%，凋零伤害+20%"
        },
        {
          "level": 4,
          "passive": "凋零穿透+25%，凋零伤害+25%"
        },
        {
          "level": 5,
          "passive": "凋零穿透+30%，凋零伤害+30%"
        }
      ]
    },
    {
      "id": "tal_all_dot_penetration",
      "name": "基因解构者",
      "quality": 4,
      "type": 1,
      "tags": [
        25,
        26
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 15,
        "bossCore": null
      },
      "levelCost": [
        10,
        20,
        35
      ],
      "maxLevel": 3,
      "effects": [
        {
          "level": 1,
          "passive": "全持续伤害穿透+10%，对首领伤害+5%"
        },
        {
          "level": 2,
          "passive": "全持续伤害穿透+15%，对首领伤害+10%"
        },
        {
          "level": 3,
          "passive": "全持续伤害穿透+20%，对首领伤害+15%"
        }
      ]
    },
    {
      "id": "tal_psi_shield",
      "name": "灵能护盾",
      "quality": 3,
      "type": 1,
      "tags": [
        23,
        8
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "受到攻击时15%概率获得灵能护盾，吸收8%最大生命伤害"
        },
        {
          "level": 2,
          "passive": "受到攻击时18%概率获得灵能护盾，吸收10%最大生命伤害"
        },
        {
          "level": 3,
          "passive": "受到攻击时21%概率获得灵能护盾，吸收12%最大生命伤害"
        },
        {
          "level": 4,
          "passive": "受到攻击时25%概率获得灵能护盾，吸收15%最大生命伤害"
        },
        {
          "level": 5,
          "passive": "受到攻击时30%概率获得灵能护盾，吸收20%最大生命伤害"
        }
      ]
    },
    {
      "id": "tal_mind_stun",
      "name": "精神冲击",
      "quality": 2,
      "type": 1,
      "tags": [
        23,
        5
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时10%概率使敌人沉默1回合"
        },
        {
          "level": 2,
          "passive": "攻击时12%概率使敌人沉默1回合"
        },
        {
          "level": 3,
          "passive": "攻击时15%概率使敌人沉默1回合"
        },
        {
          "level": 4,
          "passive": "攻击时18%概率使敌人沉默1-2回合"
        },
        {
          "level": 5,
          "passive": "攻击时22%概率使敌人沉默2回合"
        }
      ]
    },
    {
      "id": "tal_psi_burst",
      "name": "灵能爆发",
      "quality": 4,
      "type": 1,
      "tags": [
        23,
        25
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 4,
        "fragCount": 2,
        "bossCore": null
      },
      "levelCost": [
        10,
        20,
        35
      ],
      "maxLevel": 3,
      "effects": [
        {
          "level": 1,
          "passive": "能量满时，下一次攻击造成180%伤害"
        },
        {
          "level": 2,
          "passive": "能量满时，下一次攻击造成220%伤害"
        },
        {
          "level": 3,
          "passive": "能量满时，下一次攻击造成280%伤害，并恢复20%能量"
        }
      ]
    },
    {
      "id": "tal_heat_vision",
      "name": "热感应视觉",
      "quality": 1,
      "type": 1,
      "tags": [
        20,
        21
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 5,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+4%，暴击率+1%"
        },
        {
          "level": 2,
          "passive": "命中率+6%，暴击率+2%"
        },
        {
          "level": 3,
          "passive": "命中率+8%，暴击率+3%"
        },
        {
          "level": 4,
          "passive": "命中率+10%，暴击率+4%"
        },
        {
          "level": 5,
          "passive": "命中率+12%，暴击率+5%"
        }
      ]
    },
    {
      "id": "tal_thermal_absorb",
      "name": "热能吸收",
      "quality": 2,
      "type": 1,
      "tags": [
        20,
        6
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "受到火焰伤害时，30%转化为生命恢复"
        },
        {
          "level": 2,
          "passive": "受到火焰伤害时，40%转化为生命恢复"
        },
        {
          "level": 3,
          "passive": "受到火焰伤害时，50%转化为生命恢复"
        },
        {
          "level": 4,
          "passive": "受到火焰伤害时，60%转化为生命恢复，灼烧抗性+15%"
        },
        {
          "level": 5,
          "passive": "受到火焰伤害时，70%转化为生命恢复，灼烧抗性+25%"
        }
      ]
    },
    {
      "id": "tal_infrared_lock",
      "name": "红外锁定",
      "quality": 3,
      "type": 1,
      "tags": [
        20,
        21
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时12%概率无视敌人闪避"
        },
        {
          "level": 2,
          "passive": "攻击时15%概率无视敌人闪避"
        },
        {
          "level": 3,
          "passive": "攻击时18%概率无视敌人闪避，命中率+5%"
        },
        {
          "level": 4,
          "passive": "攻击时22%概率无视敌人闪避，命中率+8%"
        },
        {
          "level": 5,
          "passive": "攻击时28%概率无视敌人闪避，命中率+10%，暴击率+3%"
        }
      ]
    },
    {
      "id": "tal_hard_bone",
      "name": "骨质硬化",
      "quality": 1,
      "type": 1,
      "tags": [
        13,
        9
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 5,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "防御力+4，暴击抗性+3%"
        },
        {
          "level": 2,
          "passive": "防御力+6，暴击抗性+5%"
        },
        {
          "level": 3,
          "passive": "防御力+8，暴击抗性+7%"
        },
        {
          "level": 4,
          "passive": "防御力+10，暴击抗性+10%"
        },
        {
          "level": 5,
          "passive": "防御力+15，暴击抗性+15%，受到暴击伤害-10%"
        }
      ]
    },
    {
      "id": "tal_bone_counter",
      "name": "骨刺反击",
      "quality": 2,
      "type": 1,
      "tags": [
        13,
        12
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "受到近战攻击时，12%概率反弹15%伤害"
        },
        {
          "level": 2,
          "passive": "受到近战攻击时，15%概率反弹18%伤害"
        },
        {
          "level": 3,
          "passive": "受到近战攻击时，18%概率反弹22%伤害"
        },
        {
          "level": 4,
          "passive": "受到近战攻击时，22%概率反弹28%伤害"
        },
        {
          "level": 5,
          "passive": "受到近战攻击时，28%概率反弹35%伤害，防御力+5"
        }
      ]
    },
    {
      "id": "tal_bone_regen",
      "name": "骨骼再生",
      "quality": 3,
      "type": 1,
      "tags": [
        13,
        10
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 3,
        "fragCount": 20,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "每回合恢复1.5%最大生命，受到暴击伤害后恢复量翻倍"
        },
        {
          "level": 2,
          "passive": "每回合恢复2%最大生命，受到暴击伤害后恢复量翻倍"
        },
        {
          "level": 3,
          "passive": "每回合恢复2.5%最大生命，受到暴击伤害后恢复量翻倍"
        },
        {
          "level": 4,
          "passive": "每回合恢复3%最大生命，受到暴击伤害后恢复量翻倍，防御力+5"
        },
        {
          "level": 5,
          "passive": "每回合恢复4%最大生命，受到暴击伤害后恢复量翻倍，防御力+10"
        }
      ]
    },
    {
      "id": "tal_eagle_eye",
      "name": "鹰眼",
      "quality": 1,
      "type": 1,
      "tags": [
        21,
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 1,
        "fragCount": 5,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "命中率+6%，暴击率+2%"
        },
        {
          "level": 2,
          "passive": "命中率+8%，暴击率+3%"
        },
        {
          "level": 3,
          "passive": "命中率+10%，暴击率+4%"
        },
        {
          "level": 4,
          "passive": "命中率+12%，暴击率+5%"
        },
        {
          "level": 5,
          "passive": "命中率+15%，暴击率+7%，攻击时有5%概率造成120%攻击力伤害"
        }
      ]
    },
    {
      "id": "tal_weakness_insight",
      "name": "弱点洞察",
      "quality": 2,
      "type": 1,
      "tags": [
        21,
        1
      ],
      "isInfiniteGrowth": false,
      "unlockCost": {
        "fragQuality": 2,
        "fragCount": 10,
        "bossCore": null
      },
      "levelCost": [
        2,
        3,
        5,
        8,
        12
      ],
      "maxLevel": 5,
      "effects": [
        {
          "level": 1,
          "passive": "攻击时12%概率造成140%攻击力伤害"
        },
        {
          "level": 2,
          "passive": "攻击时15%概率造成150%攻击力伤害"
        },
        {
          "level": 3,
          "passive": "攻击时18%概率造成160%攻击力伤害"
        },
        {
          "level": 4,
          "passive": "攻击时22%概率造成175%攻击力伤害"
        },
        {
          "level": 5,
          "passive": "攻击时28%概率造成200%攻击力伤害，暴击率+5%"
        }
      ]
    }
  ]
},
  symbionts: {
  "symbionts": [
    {
      "id": "sym_core_1",
      "name": "原始细胞核",
      "slot": "core",
      "quality": 1,
      "stats": {
        "maxHp": 3,
        "defense": 1
      },
      "desc": "最原始的细胞核心，提供基础生命保障"
    },
    {
      "id": "sym_core_2",
      "name": "稳定核膜",
      "slot": "core",
      "quality": 2,
      "stats": {
        "maxHp": 6,
        "defense": 3
      },
      "desc": "稳定的核膜结构，提升生命和防御"
    },
    {
      "id": "sym_core_3",
      "name": "硬化核膜",
      "slot": "core",
      "quality": 3,
      "stats": {
        "maxHp": 12,
        "defense": 6
      },
      "special": "hpRegen",
      "specialValue": 3,
      "desc": "硬化的核膜结构，每回合回复3点生命"
    },
    {
      "id": "sym_core_4",
      "name": "龙之心核",
      "slot": "core",
      "quality": 4,
      "stats": {
        "maxHp": 20,
        "defense": 10
      },
      "special": "healOnKill",
      "specialValue": 5,
      "desc": "巨龙的心脏核心，击杀敌人回复5%生命"
    },
    {
      "id": "sym_core_5",
      "name": "混沌原核",
      "slot": "core",
      "quality": 5,
      "stats": {
        "maxHp": 30,
        "defense": 15
      },
      "special": "damageReduction",
      "specialValue": 10,
      "desc": "混沌之源的原核，受到伤害减少10%"
    },
    {
      "id": "sym_pred_1",
      "name": "锐利口器",
      "slot": "predator",
      "quality": 1,
      "stats": {
        "attack": 3,
        "crit": 1
      },
      "desc": "基础的锐利口器，提升攻击和暴击"
    },
    {
      "id": "sym_pred_2",
      "name": "撕裂颚",
      "slot": "predator",
      "quality": 2,
      "stats": {
        "attack": 6,
        "crit": 3
      },
      "desc": "强力的撕裂颚，显著提升攻击"
    },
    {
      "id": "sym_pred_3",
      "name": "毒牙",
      "slot": "predator",
      "quality": 3,
      "stats": {
        "attack": 12,
        "crit": 6
      },
      "special": "dotOnHit",
      "specialValue": 2,
      "desc": "剧毒的獠牙，攻击附加2层中毒"
    },
    {
      "id": "sym_pred_4",
      "name": "毁灭之爪",
      "slot": "predator",
      "quality": 4,
      "stats": {
        "attack": 20,
        "crit": 10
      },
      "special": "critDamage",
      "specialValue": 20,
      "desc": "毁灭之力凝聚的利爪，暴击伤害+20%"
    },
    {
      "id": "sym_pred_5",
      "name": "吞噬之口",
      "slot": "predator",
      "quality": 5,
      "stats": {
        "attack": 30,
        "crit": 15
      },
      "special": "lifeSteal",
      "specialValue": 10,
      "desc": "吞噬一切的巨口，吸取造成伤害的10%为生命"
    },
    {
      "id": "sym_sensor_1",
      "name": "感光点",
      "slot": "sensor",
      "quality": 1,
      "stats": {
        "hit": 3,
        "perception": 1
      },
      "desc": "基础的感光点，提升命中和感知"
    },
    {
      "id": "sym_sensor_2",
      "name": "复眼",
      "slot": "sensor",
      "quality": 2,
      "stats": {
        "hit": 6,
        "perception": 3
      },
      "desc": "复杂的复眼结构，大幅提升命中"
    },
    {
      "id": "sym_sensor_3",
      "name": "热感应器官",
      "slot": "sensor",
      "quality": 3,
      "stats": {
        "hit": 12,
        "perception": 6
      },
      "special": "firstStrike",
      "specialValue": 5,
      "desc": "热感应器官，先手攻击伤害+5%"
    },
    {
      "id": "sym_sensor_4",
      "name": "天眼",
      "slot": "sensor",
      "quality": 4,
      "stats": {
        "hit": 20,
        "perception": 10
      },
      "special": "dodgeBonus",
      "specialValue": 5,
      "desc": "洞察一切的天眼，闪避率+5%"
    },
    {
      "id": "sym_sensor_5",
      "name": "全知之眼",
      "slot": "sensor",
      "quality": 5,
      "stats": {
        "hit": 30,
        "perception": 15
      },
      "special": "critChance",
      "specialValue": 10,
      "desc": "全知全能的眼睛，暴击率+10%"
    },
    {
      "id": "sym_motor_1",
      "name": "纤毛",
      "slot": "motor",
      "quality": 1,
      "stats": {
        "speed": 3,
        "agility": 1
      },
      "desc": "基础的运动纤毛，提升先手和敏捷"
    },
    {
      "id": "sym_motor_2",
      "name": "鞭毛",
      "slot": "motor",
      "quality": 2,
      "stats": {
        "speed": 6,
        "agility": 3
      },
      "desc": "强力的鞭毛，显著提升移动速度"
    },
    {
      "id": "sym_motor_3",
      "name": "喷水管",
      "slot": "motor",
      "quality": 3,
      "stats": {
        "speed": 12,
        "agility": 6
      },
      "special": "extraAttack",
      "specialValue": 5,
      "desc": "喷水推进器官，5%概率额外行动"
    },
    {
      "id": "sym_motor_4",
      "name": "瞬步肌",
      "slot": "motor",
      "quality": 4,
      "stats": {
        "speed": 20,
        "agility": 10
      },
      "special": "dodgeBonus",
      "specialValue": 8,
      "desc": "瞬步肌肉，闪避率+8%"
    },
    {
      "id": "sym_motor_5",
      "name": "时脉腺",
      "slot": "motor",
      "quality": 5,
      "stats": {
        "speed": 30,
        "agility": 15
      },
      "special": "cooldownReduction",
      "specialValue": 10,
      "desc": "操控时间的腺体，技能冷却-10%"
    },
    {
      "id": "sym_energy_1",
      "name": "线粒体",
      "slot": "energy",
      "quality": 1,
      "stats": {
        "maxEnergy": 3,
        "energyRegen": 1
      },
      "desc": "基础的线粒体，提升能量上限和回复"
    },
    {
      "id": "sym_energy_2",
      "name": "能量囊",
      "slot": "energy",
      "quality": 2,
      "stats": {
        "maxEnergy": 6,
        "energyRegen": 3
      },
      "desc": "储存能量的囊泡，大幅提升能量容量"
    },
    {
      "id": "sym_energy_3",
      "name": "高能线粒体",
      "slot": "energy",
      "quality": 3,
      "stats": {
        "maxEnergy": 12,
        "energyRegen": 6
      },
      "special": "energyOnHit",
      "specialValue": 5,
      "desc": "高能线粒体，攻击命中回复5点能量"
    },
    {
      "id": "sym_energy_4",
      "name": "暗能线粒体",
      "slot": "energy",
      "quality": 4,
      "stats": {
        "maxEnergy": 20,
        "energyRegen": 10
      },
      "special": "damagePct",
      "specialValue": 8,
      "desc": "暗能线粒体，造成伤害+8%"
    },
    {
      "id": "sym_energy_5",
      "name": "奇点线粒体",
      "slot": "energy",
      "quality": 5,
      "stats": {
        "maxEnergy": 30,
        "energyRegen": 15
      },
      "special": "energyRegen",
      "specialValue": 5,
      "desc": "奇点线粒体，每回合额外回复5点能量"
    },
    {
      "id": "sym_evo_1",
      "name": "进化芽",
      "slot": "evolution",
      "quality": 1,
      "stats": {
        "evolution": 3,
        "talentPower": 1
      },
      "desc": "基础的进化芽，提升进化和天赋强度"
    },
    {
      "id": "sym_evo_2",
      "name": "基因重组腺",
      "slot": "evolution",
      "quality": 2,
      "stats": {
        "evolution": 6,
        "talentPower": 3
      },
      "desc": "基因重组腺体，加速进化进程"
    },
    {
      "id": "sym_evo_3",
      "name": "超速进化腺",
      "slot": "evolution",
      "quality": 3,
      "stats": {
        "evolution": 12,
        "talentPower": 6
      },
      "special": "expBonus",
      "specialValue": 10,
      "desc": "超速进化腺体，获得经验+10%"
    },
    {
      "id": "sym_evo_4",
      "name": "始祖基因",
      "slot": "evolution",
      "quality": 4,
      "stats": {
        "evolution": 20,
        "talentPower": 10
      },
      "special": "allStatPct",
      "specialValue": 3,
      "desc": "始祖生物的基因，所有属性+3%"
    },
    {
      "id": "sym_evo_5",
      "name": "无限进化腺",
      "slot": "evolution",
      "quality": 5,
      "stats": {
        "evolution": 30,
        "talentPower": 15
      },
      "special": "talentPower",
      "specialValue": 10,
      "desc": "无限进化的腺体，天赋效果强度+10%"
    }
  ],
  "slotNames": {
    "core": "核心",
    "predator": "猎食器官",
    "sensor": "感知器官",
    "motor": "运动器官",
    "energy": "能量器官",
    "evolution": "进化腺体"
  },
  "qualityNames": {
    "1": "普通",
    "2": "稀有",
    "3": "史诗",
    "4": "传说",
    "5": "神话"
  },
  "qualityColors": {
    "1": "#9e9e9e",
    "2": "#64b5f6",
    "3": "#ba68c8",
    "4": "#ffb74d",
    "5": "#f06292"
  }
},
  talent_sets: {
 "sets": [
  {
   "id": "set_physical",
   "name": "蛮力精通",
   "tag": 1,
   "description": "物理系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "造成的伤害+15%"
    },
    {
     "count": 3,
     "effect": "暴击伤害+30%"
    },
    {
     "count": 4,
     "effect": "攻击无视30%防御"
    }
   ]
  },
  {
   "id": "set_blood",
   "name": "血脉觉醒",
   "tag": 2,
   "description": "血系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "吸取造成伤害的10%为生命"
    },
    {
     "count": 3,
     "effect": "击杀敌人时回复10%最大生命"
    },
    {
     "count": 4,
     "effect": "生命低于30%时造成的伤害+50%"
    }
   ]
  },
  {
   "id": "set_poison",
   "name": "剧毒精通",
   "tag": 3,
   "description": "毒系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "所有持续伤害+20%"
    },
    {
     "count": 3,
     "effect": "中毒层数无上限"
    },
    {
     "count": 4,
     "effect": "所有持续伤害+50%"
    }
   ]
  },
  {
   "id": "set_thunder",
   "name": "超载回路",
   "tag": 4,
   "description": "雷系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "暴击时15%概率追加攻击"
    },
    {
     "count": 3,
     "effect": "所有控制时间+20%"
    },
    {
     "count": 4,
     "effect": "暴击时30%概率追加攻击"
    }
   ]
  },
  {
   "id": "set_bind",
   "name": "蛛网缠绕",
   "tag": 5,
   "description": "缚系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "所有控制时间+20%"
    },
    {
     "count": 3,
     "effect": "攻击时25%概率束缚"
    },
    {
     "count": 4,
     "effect": "所有控制时间+50%"
    }
   ]
  },
  {
   "id": "set_fire",
   "name": "烈焰精通",
   "tag": 6,
   "description": "火系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "所有持续伤害+20%"
    },
    {
     "count": 3,
     "effect": "灼烧不衰减"
    },
    {
     "count": 4,
     "effect": "灼烧伤害+100%"
    }
   ]
  },
  {
   "id": "set_ice",
   "name": "寒冰精通",
   "tag": 7,
   "description": "冰系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "受到的伤害-15%"
    },
    {
     "count": 3,
     "effect": "攻击时20%概率冻结"
    },
    {
     "count": 4,
     "effect": "受到的伤害-30%"
    }
   ]
  },
  {
   "id": "set_body",
   "name": "钢筋铁骨",
   "tag": 8,
   "description": "体魄系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "最大生命+100"
    },
    {
     "count": 3,
     "effect": "防御力+10"
    },
    {
     "count": 4,
     "effect": "最大生命+300，防御力+20，受到的伤害-10%"
    }
   ]
  },
  {
   "id": "set_shell",
   "name": "坚甲壁垒",
   "tag": 9,
   "description": "甲壳系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "受到的伤害-8%"
    },
    {
     "count": 3,
     "effect": "受到的伤害-10%"
    },
    {
     "count": 4,
     "effect": "受到的伤害-25%，近战攻击反弹50点伤害"
    }
   ]
  },
  {
   "id": "set_regen",
   "name": "不死之躯",
   "tag": 10,
   "description": "再生系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "每回合回复10点生命"
    },
    {
     "count": 3,
     "effect": "击杀敌人时回复15%最大生命"
    },
    {
     "count": 4,
     "effect": "生命低于50%时每回合回复5%最大生命"
    }
   ]
  },
  {
   "id": "set_mimic",
   "name": "千变万化",
   "tag": 11,
   "description": "拟态系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "闪避率+10%"
    },
    {
     "count": 3,
     "effect": "受到的伤害-10%"
    },
    {
     "count": 4,
     "effect": "闪避时30%概率反击"
    }
   ]
  },
  {
   "id": "set_reflect",
   "name": "荆棘之甲",
   "tag": 12,
   "description": "反伤系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "受到攻击时20%概率反弹20%伤害"
    },
    {
     "count": 3,
     "effect": "近战攻击反弹30点伤害"
    },
    {
     "count": 4,
     "effect": "受到的伤害-15%，反弹伤害+50%"
    }
   ]
  },
  {
   "id": "set_bone",
   "name": "骨刺丛生",
   "tag": 13,
   "description": "骨骼系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "造成的伤害+10%"
    },
    {
     "count": 3,
     "effect": "暴击伤害+20%"
    },
    {
     "count": 4,
     "effect": "攻击时20%概率造成流血"
    }
   ]
  },
  {
   "id": "set_wing",
   "name": "疾风之翼",
   "tag": 14,
   "description": "翼系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "先手值+10，先手攻击额外伤害+20%"
    },
    {
     "count": 3,
     "effect": "闪避率+8%"
    },
    {
     "count": 4,
     "effect": "先手攻击额外伤害+30%"
    }
   ]
  },
  {
   "id": "set_speed",
   "name": "闪电突袭",
   "tag": 15,
   "description": "速系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "先手值+15"
    },
    {
     "count": 3,
     "effect": "造成的伤害+10%"
    },
    {
     "count": 4,
     "effect": "每回合20%概率额外行动"
    }
   ]
  },
  {
   "id": "set_shadow",
   "name": "暗影潜行",
   "tag": 17,
   "description": "影系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "暴击率+10%"
    },
    {
     "count": 3,
     "effect": "对低血量目标伤害+20%"
    },
    {
     "count": 4,
     "effect": "暴击伤害+50%，暴击时15%概率追加攻击"
    }
   ]
  },
  {
   "id": "set_water",
   "name": "流水不腐",
   "tag": 18,
   "description": "水系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "每回合回复2%最大生命"
    },
    {
     "count": 3,
     "effect": "受到的伤害-10%"
    },
    {
     "count": 4,
     "effect": "技能冷却-20%，每回合回复10点生命"
    }
   ]
  },
  {
   "id": "set_thermal",
   "name": "热感追踪",
   "tag": 20,
   "description": "热感系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "命中率+10%"
    },
    {
     "count": 3,
     "effect": "暴击率+5%"
    },
    {
     "count": 4,
     "effect": "攻击时25%概率造成灼烧"
    }
   ]
  },
  {
   "id": "set_perception",
   "name": "全知感知",
   "tag": 21,
   "description": "感知系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "命中率+15%"
    },
    {
     "count": 3,
     "effect": "暴击率+8%"
    },
    {
     "count": 4,
     "effect": "所有属性+5%"
    }
   ]
  },
  {
   "id": "set_sound",
   "name": "音波震荡",
   "tag": 22,
   "description": "声系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "攻击时15%概率眩晕"
    },
    {
     "count": 3,
     "effect": "所有控制时间+15%"
    },
    {
     "count": 4,
     "effect": "攻击时20%概率麻痹，攻击时20%概率眩晕"
    }
   ]
  },
  {
   "id": "set_psychic",
   "name": "灵能掌控",
   "tag": 23,
   "description": "灵能系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "所有控制时间+20%"
    },
    {
     "count": 3,
     "effect": "攻击时15%概率眩晕"
    },
    {
     "count": 4,
     "effect": "所有控制时间+50%，攻击无法被闪避"
    }
   ]
  },
  {
   "id": "set_evolution",
   "name": "进化之源",
   "tag": 24,
   "description": "进化系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "所有属性+5%"
    },
    {
     "count": 3,
     "effect": "获得经验+30%"
    },
    {
     "count": 4,
     "effect": "所有属性+15%，每回合10%概率额外行动"
    }
   ]
  },
  {
   "id": "set_divine",
   "name": "神之庇护",
   "tag": 25,
   "description": "神系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "受到的伤害-15%"
    },
    {
     "count": 3,
     "effect": "每回合回复5%最大生命"
    },
    {
     "count": 4,
     "effect": "受到致命伤害时30%概率保留1点生命，每局限3次"
    }
   ]
  },
  {
   "id": "set_ultimate",
   "name": "终极形态",
   "tag": 26,
   "description": "终极系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "造成的伤害+20%"
    },
    {
     "count": 3,
     "effect": "暴击伤害+50%"
    },
    {
     "count": 4,
     "effect": "造成的伤害+40%，暴击时50%概率追加攻击"
    }
   ]
  },
  {
   "id": "set_behemoth",
   "name": "巨兽之躯",
   "tag": 27,
   "description": "巨兽系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "最大生命+200"
    },
    {
     "count": 3,
     "effect": "防御力+15，攻击力+10"
    },
    {
     "count": 4,
     "effect": "最大生命+500，受到的伤害-25%，近战攻击反弹100点伤害"
    }
   ]
  },
  {
   "id": "set_swarm",
   "name": "群体意识",
   "tag": 28,
   "description": "群体系天赋套装",
   "thresholds": [
    {
     "count": 2,
     "effect": "攻击时20%概率追加攻击"
    },
    {
     "count": 3,
     "effect": "每回合15%概率额外行动"
    },
    {
     "count": 4,
     "effect": "攻击时40%概率追加攻击，每回合30%概率额外行动"
    }
   ]
  }
 ],
 "crossSets": [
  {
   "id": "cross_ice_fire",
   "name": "冰火交融",
   "requires": [
    7,
    6
   ],
   "effect": "所有持续伤害+15%",
   "description": "冰系+火系"
  },
  {
   "id": "cross_poison_bind",
   "name": "毒缚共生",
   "requires": [
    3,
    5
   ],
   "effect": "所有控制时间+15%",
   "description": "毒系+缚系"
  },
  {
   "id": "cross_blood_thunder",
   "name": "血雷共鸣",
   "requires": [
    2,
    4
   ],
   "effect": "暴击时10%概率追加攻击",
   "description": "血系+雷系"
  },
  {
   "id": "cross_physical_body",
   "name": "蛮力护体",
   "requires": [
    1,
    8
   ],
   "effect": "造成的伤害+10%",
   "description": "物理系+体魄系"
  },
  {
   "id": "cross_fire_thunder",
   "name": "烈焰雷霆",
   "requires": [
    6,
    4
   ],
   "effect": "暴击伤害+20%",
   "description": "火系+雷系"
  },
  {
   "id": "cross_poison_fire",
   "name": "毒火燃烧",
   "requires": [
    3,
    6
   ],
   "effect": "所有持续伤害+25%",
   "description": "毒系+火系"
  },
  {
   "id": "cross_ice_thunder",
   "name": "冰雷交加",
   "requires": [
    7,
    4
   ],
   "effect": "攻击时15%概率冻结",
   "description": "冰系+雷系"
  },
  {
   "id": "cross_speed_shadow",
   "name": "疾风暗影",
   "requires": [
    15,
    17
   ],
   "effect": "暴击率+10%，先手值+10",
   "description": "速系+影系"
  },
  {
   "id": "cross_regen_water",
   "name": "生命之泉",
   "requires": [
    10,
    18
   ],
   "effect": "每回合回复15点生命",
   "description": "再生系+水系"
  },
  {
   "id": "cross_shell_body",
   "name": "铜墙铁壁",
   "requires": [
    9,
    8
   ],
   "effect": "防御力+20，受到的伤害-15%",
   "description": "甲壳系+体魄系"
  },
  {
   "id": "cross_wing_speed",
   "name": "飞天遁地",
   "requires": [
    14,
    15
   ],
   "effect": "先手值+20，闪避率+10%",
   "description": "翼系+速系"
  },
  {
   "id": "cross_bone_reflect",
   "name": "骨刺反伤",
   "requires": [
    13,
    12
   ],
   "effect": "近战攻击反弹50点伤害",
   "description": "骨骼系+反伤系"
  },
  {
   "id": "cross_thermal_perception",
   "name": "热感全知",
   "requires": [
    20,
    21
   ],
   "effect": "命中率+20%，暴击率+10%",
   "description": "热感系+感知系"
  },
  {
   "id": "cross_sound_bind",
   "name": "音波束缚",
   "requires": [
    22,
    5
   ],
   "effect": "所有控制时间+30%",
   "description": "声系+缚系"
  },
  {
   "id": "cross_mimic_regen",
   "name": "拟态再生",
   "requires": [
    11,
    10
   ],
   "effect": "闪避时回复5%最大生命",
   "description": "拟态系+再生系"
  },
  {
   "id": "cross_psychic_ultimate",
   "name": "灵能终极",
   "requires": [
    23,
    26
   ],
   "effect": "所有控制时间+30%，造成的伤害+20%",
   "description": "灵能系+终极系"
  },
  {
   "id": "cross_divine_behemoth",
   "name": "神圣巨兽",
   "requires": [
    25,
    27
   ],
   "effect": "最大生命+300，受到的伤害-20%",
   "description": "神系+巨兽系"
  },
  {
   "id": "cross_evolution_swarm",
   "name": "进化群体",
   "requires": [
    24,
    28
   ],
   "effect": "获得经验+50%，攻击时25%概率追加攻击",
   "description": "进化系+群体系"
  },
  {
   "id": "cross_physical_ultimate",
   "name": "蛮力终极",
   "requires": [
    1,
    26
   ],
   "effect": "造成的伤害+30%，暴击伤害+30%",
   "description": "物理系+终极系"
  },
  {
   "id": "cross_blood_divine",
   "name": "血神共鸣",
   "requires": [
    2,
    25
   ],
   "effect": "吸取造成伤害的15%为生命，每回合回复3%最大生命",
   "description": "血系+神系"
  }
 ],
 "combos": [
  {
   "id": "combo_poison_fang",
   "name": "剧毒獠牙",
   "symbiontId": "sym_pred_3",
   "requires": [
    3
   ],
   "effect": "所有持续伤害+30%",
   "description": "毒牙共生体+毒系天赋"
  },
  {
   "id": "combo_fire_claw",
   "name": "烈焰利爪",
   "symbiontId": "sym_pred_4",
   "requires": [
    6
   ],
   "effect": "攻击时35%概率造成灼烧",
   "description": "毁灭之爪共生体+火系天赋"
  },
  {
   "id": "combo_ice_scale",
   "name": "寒冰鳞片",
   "symbiontId": "sym_core_5",
   "requires": [
    7
   ],
   "effect": "受到的伤害-25%，每回合回复2%最大生命",
   "description": "混沌原核共生体+冰系天赋"
  },
  {
   "id": "combo_thunder_horn",
   "name": "雷霆之角",
   "symbiontId": "sym_motor_3",
   "requires": [
    4
   ],
   "effect": "暴击时20%概率追加攻击",
   "description": "喷水管共生体+雷系天赋"
  },
  {
   "id": "combo_blood_heart",
   "name": "血怒之心",
   "symbiontId": "sym_pred_5",
   "requires": [
    2
   ],
   "effect": "吸取造成伤害的20%为生命",
   "description": "吞噬之口共生体+血系天赋"
  },
  {
   "id": "combo_physical_fist",
   "name": "蛮力之拳",
   "symbiontId": "sym_energy_4",
   "requires": [
    1
   ],
   "effect": "造成的伤害+25%",
   "description": "暗能线粒体共生体+物理系天赋"
  },
  {
   "id": "combo_speed_leg",
   "name": "疾风之腿",
   "symbiontId": "sym_motor_2",
   "requires": [
    15
   ],
   "effect": "先手值+12",
   "description": "鞭毛共生体+速系天赋"
  },
  {
   "id": "combo_shell_armor",
   "name": "重甲壁垒",
   "symbiontId": "sym_core_3",
   "requires": [
    9
   ],
   "effect": "防御力+25，受到的伤害-8%",
   "description": "硬化核膜共生体+甲壳系天赋"
  },
  {
   "id": "combo_ice_wing",
   "name": "冰霜之翼",
   "symbiontId": "sym_motor_4",
   "requires": [
    7,
    14
   ],
   "effect": "闪避率+18%，攻击时25%概率冻结",
   "description": "瞬步肌共生体+冰系+翼系"
  },
  {
   "id": "combo_thunder_sensor",
   "name": "雷霆感知",
   "symbiontId": "sym_sensor_5",
   "requires": [
    4,
    21
   ],
   "effect": "命中率+25%，暴击率+15%",
   "description": "全知之眼共生体+雷系+感知系"
  },
  {
   "id": "combo_poison_core",
   "name": "剧毒核心",
   "symbiontId": "sym_core_1",
   "requires": [
    3
   ],
   "effect": "所有持续伤害+15%",
   "description": "原始细胞核共生体+毒系"
  },
  {
   "id": "combo_fire_motor",
   "name": "烈焰引擎",
   "symbiontId": "sym_sensor_3",
   "requires": [
    6,
    15
   ],
   "effect": "先手值+20，灼烧不衰减",
   "description": "热感应器官共生体+火系+速系"
  }
 ]
},
};
