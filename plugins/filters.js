export function timeFormat (time) {
  if (isNaN(time)) {
    return '-- :'
  }
  const date = new Date(time)
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  const YYYYMMDD = [
    date.getFullYear(),
    MM < 10 ? `0${MM}` : MM,
    DD < 10 ? `0${DD}` : DD
  ].join('-')
  const hhmm = [
    date.getHours(),
    date.getMinutes()
  ].join(':')
  return YYYYMMDD + ' ' + hhmm
}

export default {
  timeFormat
}
