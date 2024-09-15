const devicesRouter = require('./devices')
const sensorsRouter = require('./sensors')

function route(app) {
    app.use('/sensors', sensorsRouter)
    app.use('/devices', devicesRouter)
}

module.exports = route