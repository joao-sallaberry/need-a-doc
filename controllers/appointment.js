const Appointment = require('../models/appointment')
const TimeSlot = require('../models/timeSlot')
const dateTime = require('../utils/dateTime')

module.exports = {
  init: {
    get: (req, res) => {
      res.render('appointment/init')
    },
    post: (req, res) => {
      const date = new Date(req.body.date)
      const times = new Set()

      // get possible times based on time slots configured
      TimeSlot.find({ weekday: date.getDay() })
        .then(slots => {
          slots.forEach(slot => {
            dateTime.getPossibleTimes(
              dateTime.timeStringToNumber(slot.startTime),
              dateTime.timeStringToNumber(slot.endTime))
              .forEach(t => times.add(t))
          })

          // render view
          if (times.size === 0) {
            res.render('appointment/final', { message: 'Não há mais horários para esse dia' })
          } else {
            res.render('appointment/time', { times: [...times], ...req.body })
          }
        })
        .catch(console.error)
    }
  },
  time: {
    post: (req, res) => {
      console.log(req.body)
      const { name, email, phone, date, time } = req.body
      const now = new Date()
      const appointment = new Appointment({
        name,
        email,
        phone,
        date: `${date} ${time}`,
        createdAt: now,
        updatedAt: now
      })
      appointment.save()
        .then(() => res.render('appointment/final', { message: 'Horário agendado com sucesso!' }))
        .catch(err => {
          console.error(err)
          res.render('appointment/final', { message: 'Erro ao cadastrar agendamento', error: err })
        })
    }
  }
}
