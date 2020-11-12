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

  /*
  这里需要校正时间基准问题
  航班系统计算时间：
  01:00:00 算作当天的开始时刻
  00:59:59 算作当天的结束时刻
  而 ECMAScript 计算时间：
  00:00:00 算作当天的开始时刻
  23:59:59 算作当天的结束时刻
  所以如果相差分钟值出现负数的话，就是出现到达时间为 0 点当中造成的，按照 ECMAScript 的算法
  则算作当天的开始，因此如果对准航班系统进行校正的话需要加上 24 小时
   */
  const diffMinutes = arrMinutes - depMinutes > 0 ? arrMinutes - depMinutes : arrMinutes + (24 * 60) - depMinutes // 实际相差的分钟
  const diffHours = parseInt(diffMinutes / 60)  // 相差的小时数，可能不为两位数，已排除分钟
  const mm = diffMinutes - diffHours * 60

  return `${diffHours}时${mm}分`
}
