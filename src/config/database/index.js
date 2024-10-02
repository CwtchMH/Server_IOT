const mongoose = require('mongoose')
const dotenv = require('dotenv')

function connect() {
  dotenv.config()

  const mongodbConnString = `mongodb://localhost:27017/Cwtch_B21DCCN364`

  mongoose.connect(mongodbConnString)

  mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB successfully!!!')
  })

  mongoose.connection.on('error', (err) => {
    console.log('Connected to MongoDB failure!!!', err)
  })
}

module.exports = { connect }
