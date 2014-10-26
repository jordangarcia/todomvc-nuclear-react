var Immutable = require('immutable')
var React = require('react')
var reactor = require('./nuclear/reactor')
var TodoApp = require('./ui/main')
var getLocationHash = require('./nuclear/getters/location-hash')

reactor.createChangeObserver().onChange(
  ['locationHash'],
  (hash) => {
    window.location.hash = hash
  }
)

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

// whenever the hash parse it and update app state
window.addEventListener('hashchange', (e) => {
  reactor.action('todo').parseHash(window.location.hash)
})

// always derive the filter state from URL
// this will override any persisted filter state
reactor.action('todo').parseHash(window.location.hash)

React.renderComponent(TodoApp(), document.getElementById('app'))
