const x = 9723.29 // 当前市值
const z = -0.1619 // 当前持有收益率

// 计算新持有收益率的函数
function calculateNewHoldingYield(x, y, z) {
  return (x + y) / (x / (1 + z) + y) - 1
}

// 存储结果的数组
const results = []
const arr = []
const step = 100 // 补仓步长
const maxY = 20000 // 最大补仓金额

// 遍历补仓金额，计算每次补仓后的收益率
for (let y = 0; y <= maxY; y += step) {
  const newHoldingYield = calculateNewHoldingYield(x, y, z)
  results.push({ y, newHoldingYield, x: 1 + newHoldingYield })
  arr.push([y, x])
}

// 计算每次补仓后的收益率变化率和边际效益
let maxMarginalBenefit = 0
let optimalY = 0

for (let i = 1; i < results.length; i++) {
  const currentYield = results[i].newHoldingYield
  const previousYield = results[i - 1].newHoldingYield
  const changeRate = currentYield - previousYield

  // 计算边际效益（单位补仓金额带来的收益率提升）
  const marginalBenefit = changeRate / step

  if (marginalBenefit > maxMarginalBenefit) {
    maxMarginalBenefit = marginalBenefit
    optimalY = results[i].y
  }
}

// 输出结果
console.log('补仓金额与新持有收益率的变化：')
results.forEach((result) => {
  console.log(`补仓金额: ${result.y}, 新持有收益率: ${result.newHoldingYield.toFixed(6)}`)
})
console.log(arr)
// console.log(`\n性价比最佳的补仓金额是：${optimalY}，此时边际效益最高，为 ${maxMarginalBenefit.toFixed(6)}`)
