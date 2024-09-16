const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Counter = require('./Counter')

const SensorSchema = new Schema({
    id: { type: Number, unique: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    light: { type: Number, required: true },
    createdAt: { type: String, default: () => new Date().toLocaleString() }
})

SensorSchema.pre('save', function(next) {
    if (!this.isNew) {
        next()
        return
    }

    Counter.findOneAndUpdate(
        { id: 'sensorId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    )
    .then(counter => {
        this.id = counter.seq
        next()
    })
    .catch(error => next(error))
})

module.exports = mongoose.model('sensors', SensorSchema)
