var Getter = require('nuclear-js').Getter

var VALID_FILTERS = ['all', 'completed', 'active']


/**
 * Returns a Vector of filtered items based on the current
 * filter.value
 */
module.exports = Getter({
  deps: ['items', 'filter'],
  compute(items, filter) {
    if (VALID_FILTERS.indexOf(filter) === -1) {
      throw new Error("Invalid filter " + filter)
    }
    return items.get(filter)
  }
})
