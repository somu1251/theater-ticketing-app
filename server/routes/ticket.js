/*
Ticket route service
*/
const Joi = require('joi')
const ticketController = require('../controllers/ticket')
const auth = require('../utils/auth')

module.exports = [{
  method: 'GET',
  path: '/api/v1/ticket',
  handler: ticketController.getAll,
  options: {
    tags: ['api'],
    pre: [auth],
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Tickets.',
            schema: Joi.array()
          }
        }
      }
    }
  }
}, {
  method: 'POST',
  path: '/api/v1/ticket',
  handler: ticketController.create,
  options: {
    tags: ['api', 'Ticket'],
    pre: [auth],
    validate: {
      payload: Joi.object({
        customerName: Joi.string()
          .required()
          .description('name of customer')
          .alphanum()
          .min(3)
          .max(30),

        performanceTitle: Joi.string()
          .required()
          .description('performance title')
          .min(3)
          .max(50),

        performanceTime: Joi.date().iso()
          .required()
          .description('Time of perfoemance'),

        price: Joi.number()
          .required()
          .description('price os performance'),

        createdAt: Joi.date().iso()
          .description('created timestamp')
      })
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Result',
            schema: Joi.object()
          }
        }
      }
    }
  }
}, {
  method: 'PUT',
  path: '/api/v1/ticket/{ticketId}',
  handler: ticketController.update,
  options: {
    tags: ['api', 'Ticket'],
    pre: [auth],
    validate: {
      params: Joi.object({
        ticketId: Joi.string()
          .required()
          .description('the id of the Ticket')
      }),
      payload: Joi.object({
        customerName: Joi.string()
          .required()
          .description('name of customer')
          .alphanum()
          .min(3)
          .max(30),

        performanceTitle: Joi.string()
          .required()
          .description('performance title')
          .min(3)
          .max(50),

        performanceTime: Joi.date().iso()
          .required()
          .description('Time of perfoemance'),

        price: Joi.number()
          .required()
          .description('price os performance')
      })
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Update Ticket Result',
            schema: Joi.object().label('Result')
          }
        }
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/api/v1/ticket/{ticketId}',
  handler: ticketController.deleteTicket,
  options: {
    tags: ['api', 'Ticket'],
    pre: [auth],
    validate: {
      params: Joi.object({
        ticketId: Joi.string()
          .required()
          .description('the id of the Ticket')
      })
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Containers.'
          }
        }
      }
    }
  }
}, {
  method: 'POST',
  path: '/api/v1/ticket/analytics/{type}',
  handler: ticketController.analytics,
  options: {
    tags: ['api', 'Ticket'],
    pre: [auth],
    validate: {
      params: Joi.object({
        type: Joi.string()
          .required()
          .valid('visited', 'earnings')
          .description('analytics type: visited / earnings')
      }),
      query: Joi.object().required().keys({
        method: Joi.string()
          .required()
          .valid('js', 'db')
      }),
      payload: Joi.object({
        fromDate: Joi.date()
          .iso()
          .required()
          .description('from date'),

        toDate: Joi.date()
          .iso()
          .required()
          .description('to date')
      })
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Ticket',
            schema: Joi.object()
          }
        }
      }
    }
  }
}]
