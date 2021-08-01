module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: 'theater-app',
    script: 'index.js',
    instances: '2',
    exec_mode: 'cluster',
    env: {},
    env_dev: {
      NODE_ENV: 'dev'
    }
  }]
}
