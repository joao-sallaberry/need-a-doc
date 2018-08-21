const moment = require('moment')

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
        })
        // get same day appointments
        .then(() => {
          const nextDay = new Date(date)
          nextDay.setDate(date.getDate() + 1)
          return Appointment.find({
            date: { $gte: date, $lt: nextDay }
          })
        })
        // remove times already used
        .then(appointments => {
          const timesUsed = appointments.map(a => moment(a.date).format('HH:mm'))
          timesUsed.forEach(t => times.delete(t))
          console.log(times)
        })
        // render view
        .then(() => {
          if (times.size === 0) {
            res.render('appointment/final', { message: 'Não há mais horários para esse dia' })
          } else {
            res.render('appointment/time', { times: [...times], ...req.body })
          }
        })
        .catch(err => {
          console.error(err)
          res.render('appointment/final', { message: 'Erro ao exibir horários', error: err })
        })
    }
  },
  time: {
    post: (req, res) => {
      const { name, email, phone, date, time } = req.body
      const now = new Date()
      const appointment = new Appointment({
        name,
        email,
        phone,
        date: new Date(`${date} ${time}`),
        createdAt: now,
        updatedAt: now
      })
      appointment.save()
        .then(() => res.render('appointment/final', {
          message: `Obrigado ${name}!
          Sua consulta foi agendada para ${moment(appointment.date).format('DD/MM/YY HH:mm')}.`
        }))
        .catch(err => {
          console.error(err)
          res.render('appointment/final', { message: 'Erro ao cadastrar agendamento', error: err })
        })
    }
  }
}
