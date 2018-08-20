const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  date: Date,
  createdAt: Date,
  updatedAt: Date
})

appointmentSchema.statics.findAll = () => {
  return Appointment.find({})
}

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment
