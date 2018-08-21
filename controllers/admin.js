const TimeSlot = require('../models/timeSlot')
const Appointment = require('../models/appointment')
const dateTime = require('../utils/dateTime')

module.exports = {
  config: {
    get: (req, res) => {
      renderConfigView(res)
    },
    post: (req, res) => {
      const {weekday, startTime, endTime} = req.body
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

      // validate startTime < endTime
      for (let i = 0; i < slots.length; i++) {
        if (startTime[i] >= endTime[i]) {
          return renderConfigView(res, {
            answer: {
              error: 'ValidationError', message: 'Horário final deve ser maior que Horário Inicial'
            }
          })
        }
      }

      // update database
      TimeSlot.updateAll(slots)
        .then(() => renderConfigView(res, {
          answer: {message: 'Horários atualizados!'}
        }))
        .catch(err => renderConfigView(res, {
          answer: {
            error: err, message: 'Erro ao configurar horários'
          }
        }))
    }
  },
  timetable: {
    get: (req, res) => {
      Appointment.find({})
        .then(appointments => {
          appointments = appointments.sort((a, b) => a.date - b.date) // sort by date
          res.render('admin/timetable', { appointments })
        })
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
