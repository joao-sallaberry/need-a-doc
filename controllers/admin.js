const TimeSlot = require('../models/timeSlot')
const dateTime = require('../utils/dateTime')

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
      const now = new Date()
      for (let i = 0; i < len; i++) {
        slots.push({
          weekday: weekday[i],
          startTime: startTime[i],
          endTime: endTime[i],
          createdAt: now,
          updatedAt: now
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
        weekdays: dateTime.getWeekdays(),
        times: dateTime.getPossibleTimes(),
        ...options
      })
    })
    .catch(err => renderConfigView(res, {
      answer: {
        error: err, message: 'Erro ao obter horários'
      }}))
}
