/**
 * The reactor singleton file
 *
 * Creates a reactor and registers cores/actions/computeds
 *
 * Cores determine the initial state and behavior of the app
 *
 * Actions can be invoked by calling reactor.action('todo').METHODNAME()
 *
 * Computeds define additional *computed* state on the system, these values
 * always stay up to date and are evaluated only whenever their underlying
 * dependencies change
 */
var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()

reactor.attachCore('items', require('./items-core'))
reactor.attachCore('filter', require('./filter-core'))

reactor.bindActions('todo', require('./todo-actions'))

reactor.computed('filteredItems', require('./getters/filtered-todos'))
reactor.computed('locationHash', require('./getters/location-hash'))

module.exports = reactor
