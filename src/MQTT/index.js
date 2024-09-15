const mqtt = require('mqtt');
const client = mqtt.connect('ws://localhost:9001/mqtt'); 
const topic = 'test-topic';
const message = 'test message';
const Device = require('../app/models/Devices');

function mqttFunction() {
    client.on('connect', () => {
        console.log(`Is client connected: ${client.connected}`);    
        if (client.connected === true) {
            console.log(`message: ${message}, topic: ${topic}`); 
        }
    
        // subscribe to a topic
        client.subscribe(topic);
    });
    
    // receive a message from the subscribed topic
    client.on('message',(topic, message) => {
        console.log(`message: ${message}, topic: ${topic}`); 
        const device = new Device(JSON.parse(message.toString()));
        device.save()
    });
    
    // error handling
    client.on('error',(error) => {
        console.error(error);
        process.exit(1);
    });
}

module.exports = mqttFunction;