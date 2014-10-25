var Getter = require('nuclear-js').Getter

var filterFns = {
  'completed': function(item) {
    return item.get('isCompleted')
  },
  'active': function(item) {
    return !item.get('isCompleted')
  },
}

module.exports = Getter({
  deps: ['todo.items', 'filter.value'],
  compute(items, filterValue) {
    if (filterValue === 'all') {
      return items
    }
    return items.filter(filterFns[filterValue])
  }
})
