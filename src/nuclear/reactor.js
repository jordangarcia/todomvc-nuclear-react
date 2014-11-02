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

reactor.defineState('items', require('./items-core'))
reactor.defineState('editingId', require('./editing-core'))
reactor.defineState('filter', require('./filter-core'))

reactor.defineComputed('filteredItems', require('./getters/filtered-todos'))
reactor.defineComputed('locationHash', require('./getters/location-hash'))

reactor.bindActions('todo', require('./todo-actions'))

module.exports = reactor
