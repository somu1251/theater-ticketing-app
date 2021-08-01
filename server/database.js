/*
DB connector
*/
const Mongoose = require('mongoose')
const config = require('config')

// load database
Mongoose.connect(config.get('MONGODB.url'), { useNewUrlParser: true, useUnifiedTopology: true })
const db = Mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Connection with database succeeded.')
})

exports.db = db
