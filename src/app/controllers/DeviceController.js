const Device = require('../models/Devices')

class DeviceController {

    show(req, res, next) {
        Device.find({})
            .then(devices => res.json(devices))
            .catch(next)
    }

    showOne(req, res, next) {
        Device.findOne({ id: req.params.id })
            .then(device => res.json(device))
            .catch(next)
    }

    add(req, res, next) {
        const device = new Device(req.body)
        device.save()
            .then(device => res.json(device))
            .catch(next)
    }
}

module.exports = new DeviceController()
