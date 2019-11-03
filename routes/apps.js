const express = require('express')
const App = require('../models/App')
const router = express.Router()

router.get('/', (req, res, next) => {
    let { start, end } = req.query

    App.find()
        .sort({ id: 1 - 1 })
        .skip(start)
        .limit(end)
        .then(app => {
            res.json(app)
        })
        .catch(err => next(err))
})

router.get('/test', async(req, res) => {
    res.json({ message: 'pass!' })
})

module.exports = router