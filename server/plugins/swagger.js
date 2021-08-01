/*
Swagger pluginn
*/
console.log(__dirname)

module.exports = {
  plugin: require('hapi-swagger'),
  options: {
    info: {
      title: 'Theater API Documentation',
      version: '1.0.0',
      description: 'Theater Service APIs'
    },
    basePath: '/',
    jsonPath: '/app/swagger.json',
    tags: [
      {
        name: 'api',
        description: 'Ticket APIs'
      }
    ],
    swaggerUI: true,
    // swaggerUIPath: '/app/swaggerui/',
    documentationPage: true,
    documentationPath: '/app/explorer',
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{ api_key: [] }]
  }
}
