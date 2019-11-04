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

const searchArrayByProperty = (array, property, searchTerm, defaultValue) => {
    return array.findIndex(array => String(array[property]) === String(searchTerm)) || defaultValue
}

const limitArray = (apps, { by, max, start, end }) => {
    start = start ? searchArrayByProperty(apps, by, start, 0) : 0
    end = end ? searchArrayByProperty(apps, by, end, null) : null

    start = Math.max(start, 0)
    endIndex = max + start
    end = (endIndex <= end || end === null || end === 0) ? endIndex : end + 1

    return apps.slice(start, end)
}

const parseNestedQueryObject = (queryPrefix, query) => {
    const queryObject = {}
    for (let key in query) {
        if (key.startsWith(queryPrefix)) queryObject[key.split('.')[1]] = query[key]
    }
    return queryObject
}

router.get('/', (req, res, next) => {
    const range = parseNestedQueryObject('range', req.query)

    App.find({})
        .then(apps => {
            range.by = range.by || 'id'
            range.max = +range.max || 50
            range.order = range.order || 'asc'
            if (range.by) sortObjectArray(apps, range.order === 'desc', range.by)
            res.json(limitArray(apps, range))
        })
        .catch(err => next(err))
})

module.exports = router