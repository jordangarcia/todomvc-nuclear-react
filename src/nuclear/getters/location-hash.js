/**
 * Define a computed for what the window location hash
 * should be based on the fitlerValue
 */
var Getter = require('nuclear-js').Getter

module.exports = Getter({
  deps: ['filter'],
  compute(filterValue) {
    if (filterValue === 'all') {
      return '/'
    }
    return '/' + filterValue
  }
})
