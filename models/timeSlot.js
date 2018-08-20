const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeSlotSchema = new Schema({
  weekday: Number,
  startTime: String,
  endTime: String,
  createdAt: Date,
  updatedAt: Date
})

timeSlotSchema.statics.findAll = () => {
  return TimeSlot.find({})
}

timeSlotSchema.statics.updateAll = timeSlots => {
  return TimeSlot.deleteMany({})
    .then(() => TimeSlot.insertMany(timeSlots))
}

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema)
module.exports = TimeSlot
