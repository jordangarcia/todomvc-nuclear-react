var Nuclear = require('nuclear-js')

var VALID_FILTERS = ['all', 'completed', 'active']

var filterFns = {
  'completed': function(item) {
    return item.get('isCompleted')
  },
  'active': function(item) {
    return !item.get('isCompleted')
  }
}

/**
 * Returns a Vector of filtered items based on the current
 * filter.value
 */
module.exports = Nuclear.Computed(
  ['items', 'filter'],
  (items, filter) => {
    if (VALID_FILTERS.indexOf(filter) === -1) {
      console.warn('Invalid filter', filter)
    }
    if (filter === 'all') {
      return items
    }

    return items.filter(filterFns[filter])
  }
)
