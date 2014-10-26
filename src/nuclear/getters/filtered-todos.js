var Getter = require('nuclear-js').Getter

var VALID_FILTERS = ['all', 'completed', 'active']


/**
 * Returns a Vector of filtered items based on the current
 * filter.value
 */
module.exports = Getter({
  deps: ['items', 'filter.value'],
  compute(items, filterValue) {
    if (VALID_FILTERS.indexOf(filterValue) === -1) {
      throw new Error("Invalid filter " + filterValue)
    }
    return items.get(filterValue)
  }
})
