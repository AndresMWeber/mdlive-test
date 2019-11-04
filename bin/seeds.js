const path = require('path')
const faker = require('faker');
const { submitDocuments, seed } = require('./seeds-helpers')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const App = require('../models/App')

faker.seed(1234);

async function createDBEntries() {
    await submitDocuments('apps', App, Array.from({ length: 300 }).map((e, i) => {
        return {
            id: i,
            name: generateName()
        }
    }))
}

const capitalize = str => {
    return str[0].toUpperCase() + str.slice(1, str.length)
}

var names_tried = {}
const generateName = () => {
    let name = `${capitalize(faker.hacker.adjective())} ${capitalize(faker.hacker.noun())}`
    while (names_tried[name]) {
        name = `${capitalize(faker.hacker.adjective())} ${capitalize(faker.hacker.noun())}`
    }
    names_tried[name] = true
    return name
}

module.exports = async create => {
    return await seed(createDBEntries, create)
}