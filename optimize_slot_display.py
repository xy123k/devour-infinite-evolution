with open('game.js', 'r', encoding='utf-8') as f:
    c = f.read()

# ============================================================
# 优化天赋和技能槽显示：添加扩充条件和进度
# ============================================================

old_slot_display = """        // 资源显示
        html += `<div style="margin-bottom:10px;padding:8px;background:var(--bg-card);border-radius:6px;font-size:13px">`;
        html += `<span style="color:var(--accent-warning)">天赋点：${this.permanent.talentPoints || 0}</span>`;
        html += `<span style="margin-left:15px;color:var(--accent-success)">被动槽：${equipped.length}/${passiveSlots}</span>`;
        html += `<span style="margin-left:15px;color:var(--accent-info)">主动槽：${this.getActiveSlots()}</span>`;
        html += `</div>`;"""

new_slot_display = """        // 资源显示
        html += `<div style="margin-bottom:10px;padding:10px;background:var(--bg-card);border-radius:8px;font-size:13px">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">`;
        html += `<span style="color:var(--accent-warning);font-weight:bold"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg> 天赋点：${this.permanent.talentPoints || 0}</span>`;
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
        
        html += `<div style="margin-bottom:8px;padding:8px;background:var(--bg-secondary);border-radius:6px;border-left:3px solid var(--accent-success)">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">`;
        html += `<span style="color:var(--accent-success);font-weight:bold;font-size:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg> 天赋槽（被动）：${equipped.length}/${passiveSlots}</span>`;
        html += `<span style="color:var(--text-faint);font-size:11px">初始4 + 天赋点${talentSlotFromPoints} + 精粹${talentSlotFromEssence}</span>`;
        html += `</div>`;
        html += `<div style="font-size:11px;color:var(--text-muted);line-height:1.6">`;
        html += `<div>已花天赋点：${totalSpent} / ${nextPointSlot}（再花${nextPointSlot - totalSpent}点+1槽）</div>`;
        html += `<div>局外精粹：${essence} / ${nextEssenceSlot}（再获得${nextEssenceSlot - essence}点+1槽）</div>`;
        html += `</div>`;
        html += `</div>`;
        
        // 计算技能槽扩充进度
        const activeSlots = this.getActiveSlots();
        const playerLevel = this.player.level || 1;
        let activeSlotDetail = '初始3';
        if (playerLevel >= 25) activeSlotDetail += ' + 等级25';
        if (playerLevel >= 50) activeSlotDetail += ' + 等级50';
        if (essence >= 100) activeSlotDetail += ' + 精粹100';
        
        html += `<div style="padding:8px;background:var(--bg-secondary);border-radius:6px;border-left:3px solid var(--accent-info)">`;
        html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">`;
        html += `<span style="color:var(--accent-info);font-weight:bold;font-size:12px"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width:1em;height:1em;vertical-align:middle\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg> 技能槽（主动）：${activeSlots}/6</span>`;
        html += `<span style="color:var(--text-faint);font-size:11px">${activeSlotDetail}</span>`;
        html += `</div>`;
        html += `<div style="font-size:11px;color:var(--text-muted);line-height:1.6">`;
        if (playerLevel < 25) {
            html += `<div>当前等级：${playerLevel} / 25（达到25级+1槽）</div>`;
        } else if (playerLevel < 50) {
            html += `<div>当前等级：${playerLevel} / 50（达到50级+1槽）</div>`;
        } else {
            html += `<div>当前等级：${playerLevel}（已达到最高等级奖励）</div>`;
        }
        if (essence < 100) {
            html += `<div>局外精粹：${essence} / 100（达到100点+1槽）</div>`;
        } else {
            html += `<div>局外精粹：${essence}（已达到精粹奖励）</div>`;
        }
        html += `<div style="color:var(--accent-warning);margin-top:2px">默认3个基础技能不占槽，始终可用</div>`;
        html += `</div>`;
        html += `</div>`;
        
        html += `</div>`;"""

if old_slot_display in c:
    c = c.replace(old_slot_display, new_slot_display)
    print('✅ 已优化天赋和技能槽显示，添加扩充条件和进度')
else:
    print('❌ 未找到槽位显示代码')

with open('game.js', 'w', encoding='utf-8') as f:
    f.write(c)

print('\n✅ game.js天赋和技能槽显示优化完成！')
