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

module.exports = Nuclear.Reactor({
  state: {
    items: require('./state/items'),
    filter: require('./state/filter-value'),
    editingId: require('./state/editing-id'),

    // computed state
    activeItems: require('./computeds/active-items'),
    completedItems: require('./computeds/completed-items'),
    filteredItems: require('./computeds/filtered-items'),
    areAllChecked: require('./computeds/are-all-items-checked'),
    locationHash: require('./computeds/location-hash'),
  },

  actions: {
    todo: require('./todo-actions')
  }
})
