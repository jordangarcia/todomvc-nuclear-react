var Getter = require('nuclear-js').Getter

var filterFns = {
  'completed': function(item) {
    return item.get('isComplete')
  },
  'active': function(item) {
    return !item.get('isComplete')
  },
}

/**
 * Returns a Vector of filtered items based on the current
 * filter.value
 */
module.exports = Getter({
  deps: ['todo.items', 'filter.value'],
  compute(items, filterValue) {
    if (filterValue === 'all') {
      return items.toVector()
    }
    var filterFn = filterFns[filterValue]
    return items.filter(filterFn).toVector()
  }
})
