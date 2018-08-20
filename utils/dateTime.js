const moment = require('moment')

const weekdays = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
]

function getWeekdays () {
  return weekdays
}

function weekdayToId (day) {
  for (let i = 0; i < weekdays.length; i++) {
    if (day === weekdays[i]) return i
  }
  return -1
}

function getPossibleTimes (startTime = 0, endTime = 2400) {
  const asNumbers = []
  startTime = timeNumberToMoment(startTime)
  endTime = timeNumberToMoment(endTime)
  for (let x = startTime; x < endTime; x = x.add(30, 'minutes')) {
    asNumbers.push(timeMomentToNumber(x))
  }
  return asNumbers.map(timeNumberToString)
}

function timeNumberToString (num) {
  const hour = Math.floor(num / 100).toString().padStart(2, '0')
  const minute = (num % 100).toString().padStart(2, '0')
  return `${hour}:${minute}`
}

function timeStringToNumber (str) {
  return parseInt(str.substr(0, 2)) * 100 + parseInt(str.substr(3, 2))
}

function timeNumberToMoment (num) {
  return moment.duration(Math.floor(num / 100), 'hours')
    .add(num % 100, 'minutes')
}

function timeMomentToNumber (mom) {
  return mom.hours() * 100 + mom.minutes()
}

module.exports = {
  getWeekdays,
  weekdayToId,
  getPossibleTimes,
  timeStringToNumber
}
