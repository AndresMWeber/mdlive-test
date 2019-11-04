const mongoose = require('mongoose')
const databaseEntries = {}
const createDB = require('../configs/database')

const errors = []

const submitDocuments = async(name, model, jsonData, drop = true) => {
    var documents
    try {
        drop && await model.deleteMany()
        documents = await model.create(jsonData)
        databaseEntries[name] = documents
    } catch (err) {
        console.log(err)
        errors.push(`${name} - Could not finish populating documents: ${err.name} - ${err.errmsg}`)
    } finally {
        const count = await model.countDocuments()
        console.log(`${count} ${name} created.`)
    }
}

const seed = async(cb,) => {
    console.log('Starting to create DB Entries.')
    await createDB()
    await cb()
        .then(() => {
            console.log('--> Successfully finished populating database.')
        })
        .catch(err => {
            console.log('Error populating the database:  ', err)
        })
        .finally(() => {
            if (errors.length) {
                console.log('\n\nRan into these errors:')
                console.log('\n\t' + errors.join('\n\t') + '\n\n')
            }
            mongoose.disconnect()
        })
}

module.exports = {
    seed,
    submitDocuments,
    databaseEntries
}