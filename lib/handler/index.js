const { babelHandler } = require('./babelHandler.js')
const { tsHandler } = require('./tsHandler.js')
const { eslintHandler } = require('./eslintHandler.js')
const { commonHandler } = require('./commonHandler.js')
const { huskyHandler } = require('./huskyHandler.js')

module.exports = {
  babelHandler,
  tsHandler,
  eslintHandler,
  commonHandler,
  huskyHandler
}
