// 轮回难度 T1/T3 单测：难度与奖励函数 + 死档比值分析
const game = {
  permanent: { achievementStats: { reincarnations: 0 } },
  getReincarnationDifficulty() {
    const n = this.permanent.achievementStats ? (this.permanent.achievementStats.reincarnations || 0) : 0;
    return Math.pow(1.05, Math.min(n, 15));
  },
  getGrowthMult() {
    const n = this.permanent.achievementStats ? (this.permanent.achievementStats.reincarnations || 0) : 0;
    return Math.pow(1.05, Math.min(n, 20));
  }
};

console.log('=== T1 函数值单测 ===');
const cases = [0, 1, 9, 15, 30, 999];
let pass = true;
const expect = {0:[1,1],1:[1.05,1.05],9:[1.551,1.551],15:[2.0789,2.0789],30:[2.0789,2.6533],999:[2.0789,2.6533]};
for (const n of cases) {
  game.permanent.achievementStats.reincarnations = n;
  const d = game.getReincarnationDifficulty();
  const g = game.getGrowthMult();
  const ed = expect[n][0], eg = expect[n][1];
  const ok = Math.abs(d-ed) < 0.001 && Math.abs(g-eg) < 0.001;
  if (!ok) pass = false;
  console.log(`n=${n}: 难度×${d.toFixed(4)} (期望${ed}) | 奖励×${g.toFixed(4)} (期望${eg}) ${ok?'OK':'FAIL'}`);
}

console.log('\n=== T3 死档比值（奖励/难度）===');
let minRatio = Infinity, minN = -1;
for (let n = 0; n <= 200; n++) {
  game.permanent.achievementStats.reincarnations = n;
  const ratio = game.getGrowthMult() / game.getReincarnationDifficulty();
  if (ratio < minRatio) { minRatio = ratio; minN = n; }
  if (ratio < 1 - 1e-9) { pass = false; console.log(`n=${n} 比值<1! 奖励追不上难度`); }
}
console.log(`最低比值 n=${minN}: ×${minRatio.toFixed(4)}（≥1 则玩家奖励增长恒不低于难度增长）`);
// 检查单调不降
let monotonic = true;
let prev = 0;
for (let n = 0; n <= 200; n++) {
  game.permanent.achievementStats.reincarnations = n;
  const ratio = game.getGrowthMult() / game.getReincarnationDifficulty();
  if (n > 0 && ratio < prev - 1e-9) { monotonic = false; console.log(`n=${n} 比值下降 ${prev}->${ratio}`); }
  prev = ratio;
}
console.log('比值单调不降:', monotonic);
console.log('\n结论:', pass && monotonic ? 'PASS — 无死档（奖励增速恒≥难度增速，且难度封顶2.08 < 奖励封顶2.65）' : 'FAIL');
