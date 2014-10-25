var Nuclear = require('nuclear-js')

var reactor = Nuclear.createReactor()

reactor.attachCore('todo', require('./todo-core'))

reactor.bindActions('todo', require('./todo-actions'))

module.exports = reactor
