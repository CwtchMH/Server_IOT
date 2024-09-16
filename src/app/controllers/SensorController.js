const Sensor = require('../models/Sensors')

class SensorController {

    show(req, res, next) {
        const { searchTerm, searchType } = req.query
        if (searchTerm && searchType) {
            Sensor.find({ [searchType]: searchType !== "createdAt" ? { $gte: searchTerm } : { $regex: searchTerm, $options: 'i' } })
                .then(sensors => {
                    res.json(sensors)
                    console.log(typeof searchTerm)
                })
                .catch(next)
        } else {
            Sensor.find({})
                .then(sensors => {
                    res.json(sensors)
                })
                .catch(next)
        }
    }

    showOne(req, res, next) {
        Sensor.findOne({ id: req.params.id })
            .then(sensor => {
                res.json(sensor)
            })
            .catch(next)
    }

    add(req, res, next) {
        const sensor = new Sensor(req.body)
        sensor.save()
            .then(sensor => {
                res.json(sensor)
            })
            .catch(next)
    }

}

module.exports = new SensorController()
