/**
 * 从年份开始考虑，通过时间戳计算出发与到达的时间差，并转换为小时分钟数
 * @param {string} depDateStr 出发日期
 * @param {string} arrDateStr 到达日期
 * @returns {string} 出发与到达的时间差
 */
export default function timeDiff (depDateStr, arrDateStr) {
  const depDate = new Date(depDateStr)
  const arrDate = new Date(arrDateStr)

  // 获取时间戳毫秒数
  const depTime = depDate.getTime()
  const arrTime = arrDate.getTime()

  // 将时间戳毫秒转换为分钟数
  const depMinutes = parseInt(depTime / 1000 / 60)
  const arrMinutes = parseInt(arrTime / 1000 / 60)

  const diffMinutes = arrMinutes - depMinutes  // 实际相差的分钟
  const diffHours = parseInt(diffMinutes / 60)  // 相差的小时数，可能不为两位数，已排除分钟
  const mm = diffMinutes - diffHours * 60

  return `${diffHours}时${mm}分`
}
