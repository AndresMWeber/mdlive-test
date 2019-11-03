const { submitDocuments, seed } = require('./seed_helpers')
const path = require('path')
const bcrypt = require('bcryptjs')
const faker = require('faker');

require('dotenv').config({ path: path.join(__dirname, '../.env') })
require('../configs/database')

const App = require('../models/App')
faker.seed(123);

async function createDBEntries() {
    await submitDocuments('users', User, Array.from({ length: 200 }).map(() => {
        return {
            username: faker.name.findName(),
            password: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(bcryptSalt)),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
            location: { coordinates: [faker.finance.amount(-80.03, -81.84, 6), faker.finance.amount(25.13, 27.12, 6)] }
        }
    }))
}

seed(createDBEntries)