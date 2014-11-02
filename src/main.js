var Immutable = require('immutable')
var React = require('react')
var reactor = require('./nuclear/reactor')
var TodoApp = require('./ui/main')

// whenever the app state changes, write to localStorage
reactor.changeEmitter.addChangeListener(state => {
  window.localStorage.setItem('todomvc', JSON.stringify(state.toJS()))
})

// check localStorage if there is data to load
var stateToLoad = window.localStorage.getItem('todomvc')
if (stateToLoad) {
  // initialize with the Immutable representation of localStorage state
  var initialState = Immutable.fromJS(JSON.parse(stateToLoad))
  reactor.initialize(initialState)
} else {
  reactor.initialize()
}

// add hashchange listener
window.addEventListener('hashchange', (e) => {
  reactor.action('todo').parseHash(window.location.hash)
})

// ensure a valid hash when loading the page
window.location.hash = reactor.get('locationHash')

React.renderComponent(TodoApp(), document.getElementById('app'))
