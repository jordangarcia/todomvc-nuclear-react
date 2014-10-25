var React = require('react')
var reactor = require('./nuclear/reactor')
var TodoApp = require('./ui/main')

reactor.initialize()

React.renderComponent(TodoApp(), document.getElementById('app'))
