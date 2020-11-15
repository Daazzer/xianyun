export function timeFormat (time) {
  if (isNaN(time)) {
    return '-- :'
  }

  const date = new Date(time)
  const MM = date.getMonth() + 1
  const DD = date.getDate()
  const mm = date.getMinutes()

  const YYYYMMDD = [
    date.getFullYear(),
    MM < 10 ? `0${MM}` : MM,
    DD < 10 ? `0${DD}` : DD
  ].join('-')

  const hhmm = [
    date.getHours(),
    mm < 10 ? `0${MM}` : mm
  ].join(':')

  return YYYYMMDD + ' ' + hhmm
}

export default {
  timeFormat
}
