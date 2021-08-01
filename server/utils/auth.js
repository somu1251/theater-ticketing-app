const boom = require('@hapi/boom')
/*
* authentication token
* c2NyZXRwYXNzd29yZA==
*/
module.exports = (request, reply) => {
  if (!request.headers || !request.headers.authorization || request.headers.authorization !== 'c2NyZXRwYXNzd29yZA==') {
    return boom.unauthorized('api token should br valid')
  }
  return request
}
