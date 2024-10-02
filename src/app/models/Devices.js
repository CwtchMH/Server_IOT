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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdAtDate: {
    type: String,
  }
})

DeviceSchema.pre('save', function(next) {
  const now = this.createdAt; // Đảm bảo 'this' là đối tượng tài liệu

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  this.createdAtDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`; // Định dạng dd/mm/yyyy hh:mm:ss

  next(); // Chuyển sang middleware tiếp theo
});

// Để đảm bảo Mongoose sử dụng virtual field
DeviceSchema.set('toObject', { virtuals: true })
DeviceSchema.set('toJSON', { virtuals: true })

// Pre-save hook to auto-increment id
DeviceSchema.pre('save', function (next) {
  if (!this.isNew) {
    next()
    return
  }

  Counter.findOneAndUpdate(
    { id: 'deviceId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      this.id = counter.seq
      next()
    })
    .catch((error) => next(error))
})

// Create and export the model
module.exports = mongoose.model('devices', DeviceSchema)
