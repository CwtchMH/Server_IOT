const express = require('express')
const router = express.Router()

const sensorController = require('../app/controllers/SensorController')

router.get('/sensors-status/:id', sensorController.showOne)
router.get('/sensors-status', sensorController.show)
router.post('/sensors-addition', sensorController.add)

module.exports = router
