const express = require('express')
const App = require('../models/App')
const router = express.Router()

const sortObjectArray = (array, reverse, objectProperty) => {
    sortFunction = null
    switch (objectProperty + reverse) {
        case 'idfalse':
            sortFunction = (n1, n2) => n1[objectProperty] - n2[objectProperty]
            break
        case 'namefalse':
            sortFunction = (s1, s2) => s1[objectProperty].localeCompare(s2[objectProperty])
            break
        case 'idtrue':
            sortFunction = (n1, n2) => n2[objectProperty] - n1[objectProperty]
            break
        case 'nametrue':
            sortFunction = (s1, s2) => s2[objectProperty].localeCompare(s1[objectProperty])
            break
    }
    array.sort(sortFunction)
}

const limitArray = (array, max, start, end) => {
    endIndex = max + start
    end = (endIndex < end || end == 0) ? endIndex : end
    return array.slice(start, end)
}

const createNestedQueryObject = (queryPrefix, query) => {
    const queryObject = {}
    for (let key in query) {
        if (key.startsWith(queryPrefix)) queryObject[key.split('.')[1]] = query[key]
    }
    return queryObject
}

router.get('/', (req, res, next) => {
    const range = createNestedQueryObject('range', req.query)
    range.start = range.start || 0
    range.end = range.end || null
    range.max = range.max || 50
    range.order = range.order || 'asc'

    App.find({})
        .then(result => {
            if (range.by) sortObjectArray(result, range.order === 'desc', range.by)
            res.json(limitArray(result, +range.max, +range.start, +range.end))
        })
        .catch(err => next(err))
})

module.exports = router