const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Counter = require('./Counter')

const SensorSchema = new Schema({
  id: { type: Number, unique: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  light: { type: Number, required: true },
  createdAt: {
    type: String,
    default: () => {
      const now = new Date()

      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-indexed, so add 1
      const year = now.getFullYear()

      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}` // Format as dd/mm/yyyy hh:mm:ss
    }
  }
})

SensorSchema.pre('save', function (next) {
  if (!this.isNew) {
    next()
    return
  }

  Counter.findOneAndUpdate(
    { id: 'sensorId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      this.id = counter.seq
      next()
    })
    .catch((error) => next(error))
})

module.exports = mongoose.model('sensors', SensorSchema)
