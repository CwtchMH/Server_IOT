const mqtt = require('mqtt')
const Sensor = require('../app/models/Sensors')
const { broadcast } = require('../Websocket/index')

const client = mqtt.connect({
  host: '192.168.89.195',
  port: 1883,
  username: 'ManhHieu',
  password: 'b21dccn364',
  clientId: 'uniqueClientId'
})

function mqttFunction() {
  client.on('connect', () => {
    console.log(`Is client connected: ${client.connected}`)
    if (client.connected === true) {
      console.log('Connected MQTT')
    }

    // subscribe to a topic
    client.subscribe('sensors/data')
  })

  // receive a message from the subscribed topic
  client.on('message', (topic, message) => {
    console.log(`message: ${message}, topic: ${topic}`)
    const sensor = new Sensor(JSON.parse(message.toString()))
    sensor.save()
    broadcast({ type: 'SENSOR_CREATE' })
  })

  // error handling
  client.on('error', (error) => {
    console.error("Can't connect to MQTT broker")
    process.exit(1)
  })
}

module.exports = mqttFunction
