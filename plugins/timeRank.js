/**
 * 计算到出发日期时间与到达日期时间之差
 * @param {string} depDateTime 出发日期
 * @param {string} arrDateTime 到达日期
 * @returns {string} 出发与到达的小时与分钟差
 */
export default function timeDiff (depDateTime, arrDateTime) {
  const depDate = new Date(depDateTime)
  const arrDate = new Date(arrDateTime)

  const depYear = depDate.getFullYear()
  const arrYear = arrDate.getFullYear()

  const depMonth = depDate.getMonth() + 1
  const arrMonth = arrDate.getMonth() + 1

  // UTC 表示世界时间（0时区的时间），这里应该使用 getDate
  const depDay = depDate.getDate()
  const arrDay = arrDate.getDate()

  const depHours = depDate.getHours()
  const arrHours = arrDate.getHours()

  const depMinutes = depDate.getMinutes()
  const arrMinutes = arrDate.getMinutes()

  // 从年份开始计算，计算到达与出发的小时与分钟之差
  const diffMonth = (arrYear - depYear) * 12 + Math.abs(arrMonth - depMonth)
  const diffDay = diffMonth * 30 + Math.abs(arrDay - depDay)
  const diffHours = diffDay * 24 + Math.abs(arrHours - depHours)
  const diffMinutes = Math.abs(arrMinutes - depMinutes)
  return `${diffHours}时${diffMinutes}分`
}
