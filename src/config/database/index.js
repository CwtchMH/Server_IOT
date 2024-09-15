const mongoose = require('mongoose')
const dotenv = require('dotenv')

function connect() {
  dotenv.config()

  const mongodbConnString = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.lv1sm.mongodb.net/${process.env.DB_NAME}`

  mongoose.connect(mongodbConnString)

  mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB successfully!!!')
  })

  mongoose.connection.on('error', (err) => {
    console.log('Connected to MongoDB failure!!!', err)
  })
}

module.exports = { connect }
