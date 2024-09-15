const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const db = require('./config/database')
const route = require('./routes')
const mqttFunction = require('./MQTT')

// Connect to DB
db.connect()

// Log code of programme
app.use(morgan('combined'))

app.use(express.urlencoded())
app.use(express.json())


route(app)
mqttFunction()


app.listen(port, () => {
  console.log('Server is running on port 3000')
})
