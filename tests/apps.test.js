const mongoose = require('mongoose')
const supertest = require('supertest')
const seedDB = require('../bin/seeds')
const app = require('../app')

process.env.MONGODB_LOCAL = "mdlive-test"

describe('Apps', () => {
    let request = null
    let server = null

    beforeAll(async done => {
        await seedDB(false)
        server = await app.listen(done)
        request = await supertest.agent(server)
    })

    afterAll(async done => {
        await mongoose.disconnect()
        await server.close(done)
    })

    describe('READ', () => {
        it('tests by=id', async done => {
            const response = await request.get('/apps?range.by=id')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(0)
            expect(response.body[49].id).toBe(49)
            done()
        })

        it('tests by=id and start=1', async done => {
            const response = await request.get('/apps?range.by=id&range.start=1')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(1)
            expect(response.body[49].id).toBe(50)
            done()
        })

        it('tests by=id and start=1 and end=5', async done => {
            const response = await request.get('/apps?range.by=id&range.start=1&range.end=5')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(5)
            expect(response.body[0].id).toBe(1)
            expect(response.body[4].id).toBe(5)
            done()
        })

        it('tests by=id and start=5', async done => {
            const response = await request.get('/apps?range.by=id&range.start=5')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(5)
            expect(response.body[49].id).toBe(54)
            done()
        })

        it('tests by=id and start=1 and max=5', async done => {
            const response = await request.get('/apps?range.by=id&range.start=1&range.max=5')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(5)
            expect(response.body[0].id).toBe(1)
            expect(response.body[4].id).toBe(5)
            done()
        })

        it('tests by=id and start=1 and order=desc', async done => {
            const response = await request.get('/apps?range.by=id&range.start=1&range.order=desc')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(298)
            expect(response.body[49].id).toBe(249)
            done()
        })

        it('tests by=id and start=5 and end=10 and max=10 and order=asc', async done => {
            const response = await request.get('/apps?range.by=id&range.start=5&range.end=10&range.max=10&range.order=asc')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(6)
            expect(response.body[0].id).toBe(5)
            expect(response.body[5].id).toBe(10)
            done()
        })
    })

})