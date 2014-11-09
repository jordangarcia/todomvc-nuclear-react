/**
 * Define a computed for what the window location hash
 * should be based on the fitlerValue
 */
var Nuclear = require('nuclear-js')

module.exports = Nuclear.Computed(
  ['filter'],
  (filterValue) => {
    if (filterValue === 'all') {
      return '/'
    }
    return '/' + filterValue
  }
)
