var Record = require('immutable').Record

/**
 * Define an immutable Record for a todo item
 */
module.exports = Record({
  id: null,
  title: null,
  isComplete: null,
})
