var Immutable = require('immutable')
var React = require('react')
var reactor = require('./nuclear/reactor')
var TodoApp = require('./ui/main')

// check localStorage if there is data to load
var stateToLoad = window.localStorage.getItem('todomvc')
if (stateToLoad) {
  // initialize with the Immutable representation of localStorage state
  // TODO: implmement transit-js to get items to be in a OrderedMap
  reactor.initialize(Immutable.fromJS(JSON.parse(stateToLoad)))
} else {
  reactor.initialize()
}

// whenever the app state changes, write to localStorage
reactor.changeEmitter.addChangeListener(state => {
  window.localStorage.setItem('todomvc', JSON.stringify(state.toJS()))
})

React.renderComponent(TodoApp(), document.getElementById('app'))
