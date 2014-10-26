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

reactor.attachCore('todo', require('./todo-core'))
reactor.attachCore('filter', require('./filter-core'))

reactor.bindActions('todo', require('./todo-actions'))

reactor.computed('filteredTodos', require('./getters/filtered-todos'))

module.exports = reactor
