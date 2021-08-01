/*
Ticket API model
*/
const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Ticket definition
 * @typedef {Object} Ticket
 * @property {date} createdAt
 * @property {string} customerName
 * @property {string} performanceTitle
 * @property {date} performanceTime
 * @property {number} price
 * @property {date} updatedAt
 */
const TicketSchema = new Schema({
  createdAt: Date,
  customerName: String,
  performanceTitle: String,
  performanceTime: Date,
  price: Number,
  updatedAt: Date
})

module.exports = mongoose.model('Ticket', TicketSchema)
