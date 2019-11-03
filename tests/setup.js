const mongoose = require('mongoose')
const App = require('../models/App')
const createDB = require('../configs/database')

process.env.MONGODB_LOCAL = "mdlive-test"

beforeEach(done => {
    clearDB = () => {
        App.deleteMany()
        return done()
    }

    if (mongoose.connection.readyState === 0) createDB(clearDB())
    else return clearDB()
})

afterEach(async done => {
    await mongoose.disconnect()
    return done()
})

afterAll(done => done())