const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const timeSlotSchema = new Schema({
  weekday: String,
  startTime: String,
  endTime: String,
  created_at: Date,
  updated_at: Date
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
