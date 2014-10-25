var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()

reactor.attachCore('todo', require('./todo-core'))
reactor.attachCore('filter', require('./filter-core'))

reactor.bindActions('todo', require('./todo-actions'))

reactor.computed('filteredTodos', require('./getters/filtered-todos'))

module.exports = reactor
