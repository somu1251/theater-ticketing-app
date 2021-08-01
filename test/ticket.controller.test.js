// const ticketController = require('../server/controllers/ticket')
// const Ticket = require('../server/models/ticket')
const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Ticket API test', () => {
  let server

  // Create server before each test
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET /health route works', async () => {
    const options = {
      method: 'GET',
      url: '/health'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.an.object()
  })

  lab.test('GET /api/v1/ticket route works', async () => {
    const options = {
      method: 'GET',
      url: '/api/v1/ticket',
      headers: {
        authorization: 'c2NyZXRwYXNzd29yZA=='
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.an.array()
  })

  lab.test('POST /api/v1/ticket route with payload', async () => {
    const options = {
      method: 'POST',
      url: '/api/v1/ticket',
      payload: {
        customerName: `test3${Math.floor(Math.random() * 16) + 5}`,
        performanceTitle: 'sandeep',
        performanceTime: '2021-08-01T00:00:00.000Z',
        price: 12,
        createdAt: '2021-08-01T00:00:00.000Z'
      },
      headers: {
        authorization: 'c2NyZXRwYXNzd29yZA=='
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
