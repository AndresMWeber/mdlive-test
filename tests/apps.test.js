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

    describe('PDF Examples', () => {
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

    describe('START testing', () => {

        it('start being negative: start=-1', async done => {
            const response = await request.get('/apps?range.start=-1')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(0)
            done()
        })

        it('start overflowing model size: start=280', async done => {
            const response = await request.get('/apps?range.start=280')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(20)
            expect(response.body[0].id).toBe(280)
            expect(response.body[response.body.length - 1].id).toBe(299)
            done()
        })
    })

    describe('DESC/ASC/BY testing', () => {

        it('sort by id: by=id', async done => {
            const response = await request.get('/apps?range.by=id')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(0)
            expect(response.body[response.body.length - 1].id).toBe(49)
            done()
        })

        it('sort by id and asc: by=id and order=asc', async done => {
            const response = await request.get('/apps?range.by=id&range.order=asc')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(0)
            expect(response.body[response.body.length - 1].id).toBe(49)
            done()
        })

        it('sort by id and desc: by=id and order=desc', async done => {
            const response = await request.get('/apps?range.by=id&range.order=desc')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(299)
            expect(response.body[response.body.length - 1].id).toBe(250)
            done()
        })

        it('sort by name and desc: by=name and order=asc', async done => {
            const response = await request.get('/apps?range.by=name&range.order=asc')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(0)
            expect(response.body[response.body.length - 1].id).toBe(49)
            done()
        })

        it('sort by name and desc: by=name and order=desc', async done => {
            const response = await request.get('/apps?range.by=name&range.order=desc')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(299)
            expect(response.body[response.body.length - 1].id).toBe(250)
            done()
        })

        it('sort by name and desc and start in the middle: by=name and order=asc and start=\'my-app-150\'', async done => {
            const response = await request.get('/apps?range.by=name&range.order=asc&range.start=my-app-150')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(150)
            expect(response.body[response.body.length - 1].id).toBe(199)
            done()
        })
    })

    describe('MAX/END relationships', () => {
        it('end identifier extending beyond max and both are set: start=5 and end=40 and max=25', async done => {
            const response = await request.get('/apps?range.start=5&range.end=40&range.max=25')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(25)
            expect(response.body[0].id).toBe(5)
            expect(response.body[response.body.length - 1].id).toBe(29)
            done()
        })

        it('end identifier equaling max and both are set: start=5 and end=30 and max=25', async done => {
            const response = await request.get('/apps?range.start=5&range.end=30&range.max=25')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(25)
            expect(response.body[0].id).toBe(5)
            expect(response.body[response.body.length - 1].id).toBe(29)
            done()
        })

        it('end identifier one more than max and both are set: start=5 and end=30 and max=25', async done => {
            const response = await request.get('/apps?range.start=5&range.end=30&range.max=25')
            expect(response.status).toBe(200)
            expect(response.body[0].id).toBe(5)
            expect(response.body[response.body.length - 1].id).toBe(29)
            expect(response.body.length).toBe(25)
            done()
        })

        it('end identifier one less than max and both are set: start=5 and end=28 and max=25', async done => {
            const response = await request.get('/apps?range.start=5&range.end=28&range.max=25')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(24)
            expect(response.body[0].id).toBe(5)
            expect(response.body[response.body.length - 1].id).toBe(28)
            done()
        })

        it('end identifier extending beyond max and only end is set: start=5 and end=60', async done => {
            const response = await request.get('/apps?range.start=5&range.end=60')
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(50)
            expect(response.body[0].id).toBe(5)
            expect(response.body[response.body.length - 1].id).toBe(54)
            done()
        })
    })

})