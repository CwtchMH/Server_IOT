const Device = require('../models/Devices')

class DeviceController {

    show(req, res, next) {
        const { searchTerm, searchType } = req.query
        // This line performs a search query on the Device model
        // It uses the searchType and searchTerm from the request query
        // [searchType] dynamically sets the field to search based on searchType
        // $regex: `^${searchTerm}` creates a regular expression that matches strings starting with searchTerm
        // $options: 'i' makes the search case-insensitive
        if (searchTerm && searchType) {
            let query = {}
            if (searchType === "createdAt") {
                query = { [searchType]: { $regex: searchTerm, $options: 'i' } }
            } else {
                query = { device: searchType, status: { $regex: `^${searchTerm}`, $options: 'i' } }
            }
            Device.find(query)
                .then(devices => res.json(devices))
                .catch(next)
        } else {
            Device.find({})
            .then(devices => res.json(devices))
            .catch(next)
        }
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
