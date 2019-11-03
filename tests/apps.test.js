const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)

describe('Apps', () => {
    beforeEach(() => {})

    describe('READ', () => {
        beforeEach(async() => {
            // systems = await factory.makeSystems(50)
        })

        it('gets the test endpoint', async done => {
            const response = await request.get('/apps/test')
            expect(response.status).toBe(200)
            expect(response.body.message).toBe('pass!')
            done()
        })

    })

})