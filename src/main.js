var Immutable = require('immutable')
var React = require('react')
var reactor = require('./nuclear/reactor')
var TodoApp = require('./ui/main')

var stateToLoad = window.localStorage.getItem('todomvc')
if (stateToLoad) {
  reactor.initialize(Immutable.fromJS(JSON.parse(stateToLoad)))
} else {
  reactor.initialize()
}

reactor.changeEmitter.addChangeListener(state => {
  window.localStorage.setItem('todomvc', JSON.stringify(state.toJS()))
})
React.renderComponent(TodoApp(), document.getElementById('app'))
