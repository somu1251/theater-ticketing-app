/*
Ticket API controller
*/
const R = require('ramda')
const moment = require('moment')
const Ticket = require('../models/ticket')

const analytic = {}

/*
@function getAll
*/
const getAll = async (req, h) => {
  try {
    const result = await Ticket.find({}).exec()
    return h.response(result)
  } catch (error) {
    return h.response(error).code(500)
  }
}

/*
@function create
*/
const create = async (req, h) => {
  try {
    const payload = req.payload
    payload.updatedAt = new Date().toISOString()
    const ticket = new Ticket(payload)

    const result = await ticket.save()
    return h.response(result)
  } catch (error) {
    return h.response(error).code(500)
  }
}

/*
@function update
*/
const update = async (req, h) => {
  try {
    const payload = req.payload
    payload.updatedAt = new Date().toISOString()
    const result = await Ticket.findByIdAndUpdate(req.params.ticketId, { $set: payload }, { new: true })
    return h.response(result)
  } catch (error) {
    return h.response(error).code(500)
  }
}

/*
@function deleteTicket
*/
const deleteTicket = async (req, h) => {
  try {
    const result = await Ticket.findOneAndDelete(req.params.ticketId)
    return h.response({
      message: 'removed ticket successfully',
      status: 'success',
      result: result
    })
  } catch (error) {
    return h.response(error).code(500)
  }
}

/*
* money earned per month using db aggregation
*/
const moneyEarnedPerMonthDB = async (data) => {
  const query = [{ $match: { createdAt: { $gte: data.fromDate, $lte: data.toDate } } },
    {
      $group: {
        month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        toatlearned: { $sum: '$price' }
      }
    }]

  const result = await Ticket.aggregate(query)
  return result
}

/*
* money earned per month using js aggregation
*/
const moneyEarnedPerMonthJS = async (data) => {
  const query = {
    createdAt: {
      $gte: data.fromDate,
      $lte: data.toDate
    }
  }
  const docs = await Ticket.find(query).sort({ createdAt: 'asc' }).exec()
  const groupByDate = R.groupBy((d) => {
    return moment(d.createdAt).format('YYYY-MM')
  }, docs)
  const result = (Object.keys(groupByDate)).map(v => {
    return {
      month: v,
      toatlearned: groupByDate[v].reduce((a, c) => {
        return a + c.price
      }, 0)
    }
  })
  return result
}

/*
* peopel visted per month using js aggregation
* people visited theater between 2 dates with division
*/
const visitedPerMonthJS = async (data) => {
  const query = {
    createdAt: {
      $gte: data.fromDate,
      $lte: data.toDate
    }
  }
  const docs = await Ticket.find(query).sort({ createdAt: 'asc' }).exec()

  const groupByDate = R.groupBy((d) => {
    return moment(d.createdAt).format('YYYY-MM')
  }, docs)
  const result = (Object.keys(groupByDate)).map(v => {
    return {
      month: v,
      peopleVisits: groupByDate[v].length
    }
  })
  return result
}

/*
* peopel visted per month using db aggregation
*/
const visitedPerMonthDB = async (data) => {
  const query = [{ $match: { createdAt: { $gte: data.fromDate, $lte: data.toDate } } },
    {
      $group: {
        month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        peopleVisits: { $count: {} }
      }
    }]
  const result = await Ticket.aggregate(query)
  return result
}

analytic.earnings = async (method, data) => {
  if (method === 'db') {
    return await moneyEarnedPerMonthDB(data)
  }
  return await moneyEarnedPerMonthJS(data)
}

analytic.visited = async (method, data) => {
  if (method === 'db') {
    return await visitedPerMonthDB(data)
  }
  return await visitedPerMonthJS(data)
}

const analytics = async (req, h) => {
  try {
    const method = req.query.method
    const type = req.params.type
    const data = req.payload
    if (method !== 'db' && method !== 'js') {
      throw new Error('Invalid method!')
    }
    if (type !== 'visited' && type !== 'earnings') {
      throw new Error('Invalid analytics type!')
    }
    return await analytic[type](method, data)
  } catch (error) {
    error.statusCode = error.statusCode || 400
    throw error
  }
}

module.exports = {
  getAll,
  create,
  update,
  deleteTicket,
  analytics
}
