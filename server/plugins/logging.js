/*
Logging pluginn
*/
const config = require('config')
const pino = require('pino')
const logrotate = require('logrotator')
const fs = require('fs')
const path = require('path')
const rotator = logrotate.rotator

fs.existsSync(path.join(__dirname, '../../logs')) || fs.mkdirSync(path.join(__dirname, '../../logs'))
rotator.register('../../log/myfile.log', { schedule: '59m', size: '10m', compress: true, count: 3 })

module.exports = {
  plugin: require('hapi-pino'),
  options: {
    logRequestStart: true,
    redact: ['req.headers'],
    level: config.get('isDev') ? 'info' : 'warn', // take this value from config
    enabled: true, // take this value from config
    logEvents: ['onPostStart', 'onPostStop', 'response', 'request-error'],
    timestamp: pino.stdTimeFunctions.isoTime,
    stream: pino.destination({
      dest: path.join(__dirname, '../../logs/service.log'),
      sync: false
    })
  }
}
