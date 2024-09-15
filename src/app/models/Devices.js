const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Counter = require('./Counter')

// Device schema
const DeviceSchema = new Schema({
  id: { type: Number, unique: true },
  device: { type: String, required: true },
  deviceId: { type: String, required: true },
  status: {
    type: String,
    enum: ['on', 'off'],
    default: 'off'
  }
}, { timestamps: true })

// Pre-save hook to auto-increment id
DeviceSchema.pre('save', function(next) {
  if (!this.isNew) {
    next()
    return
  }

  Counter.findOneAndUpdate(
    { id: 'deviceId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  .then(counter => {
    this.id = counter.seq
    next()
  })
  .catch(error => next(error))
})

// Create and export the model
module.exports = mongoose.model('devices', DeviceSchema)
