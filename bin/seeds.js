const path = require('path')
const { submitDocuments, seed } = require('./seeds-helpers')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const App = require('../models/App')


async function createDBEntries() {
    await submitDocuments('apps', App, Array.from({ length: 300 }).map((e, i) => {
        return {
            id: i,
            name: `my-app-${(''+i).padStart(3,0)}`,
        }
    }))
}


module.exports = async disconnect => {
    return await seed(createDBEntries, disconnect)
}