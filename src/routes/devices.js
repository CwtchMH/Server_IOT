const express = require('express')
const router = express.Router()

const deviceController = require('../app/controllers/DeviceController')

router.get('/devices-status/:id', deviceController.showOne)
router.get('/devices-status', deviceController.show)
router.post('/devices-addition', deviceController.add)

module.exports = router
