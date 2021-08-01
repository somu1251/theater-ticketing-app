const hapi = require('@hapi/hapi')
const config = require('config')

async function createServer () {
  // Create the hapi server
  const server = await hapi.server({
    port: config.get('port') || 3000,
    host: '0.0.0.0',
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })
  const routes = [].concat(
    require('./routes/home'),
    require('./routes/ticket')
  )

  const db = require('./database').db
  await server.register(require('@hapi/inert'))
  await server.register(require('@hapi/vision'))
  await server.register([require('./plugins/swagger')])
  await server.register(require('./plugins/logging'))
  // await server.register(require('blipp'))
  server.DB = db

  server.route(routes)

  server.logger.info({ message: `Server is running at ${server.info.uri}` })

  /*
  * handling uncaught exceptions
  */
  process.on('uncaughtException', err => {
    if (server && server.logger) {
      server.logger.error({ message: 'Fatal Error', data: err })
    }
    console.error('Fatal Error', err)
  })

  return server
}

module.exports = createServer
