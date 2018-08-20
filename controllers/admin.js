const TimeSlot = require('../models/timeSlot')

module.exports = {
  config: {
    get: (req, res) => {
      renderConfigView(res)
    },
    post: (req, res) => {
      // TODO: validate
      const { weekday, startTime, endTime } = req.body
      const len = weekday.length

      // make list of slots
      const slots = []
      for (let i = 0; i < len; i++) {
        slots.push({
          weekday: weekday[i],
          startTime: startTime[i],
          endTime: endTime[i]
        })
      }

      // update database
      TimeSlot.updateAll(slots)
        .then(() => renderConfigView(res, {
          answer: { message: 'Horários atualizados!' }
        }))
        .catch(err => renderConfigView(res, {
          answer: {
            error: err, message: 'Erro ao configurar horários'
          }}))
    }
  }
}

function renderConfigView (res, options = {}) {
  TimeSlot.findAll()
    .then(slots => {
      res.render('admin/config', {
        timeSlots: slots,
        weekdays: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
        times: getPossibleTimes(),
        ...options
      })
    })
    .catch(err => renderConfigView(res, {
      answer: {
        error: err, message: 'Erro ao obter horários'
      }}))
}

function getPossibleTimes () {
  const asNumbers = []
  for (let x = 0; x < 2400; x += 100) {
    asNumbers.push(x)
    asNumbers.push(x + 30)
  }
  return asNumbers.map(timeNumberToString)
}

function timeNumberToString (num) {
  const hour = Math.floor(num / 100).toString().padStart(2, '0')
  const minute = (num % 100).toString().padStart(2, '0')
  return `${hour}:${minute}`
}
