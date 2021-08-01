/*
Home route service
*/
module.exports = [{
  method: 'GET',
  path: '/health',
  options: {
    tags: ['api', 'health'],
    handler: (request, h) => {
      return {
        message: `Welcome! Server is running up, uptime: ${process.uptime()}`
      }
    }
  }
}]
