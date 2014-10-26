var Immutable = require('immutable')
var Map = Immutable.Map
var OrderedMap = Immutable.OrderedMap
var Nuclear = require('nuclear-js')
var Getter = Nuclear.Getter
var Const = require('./constants')
var uuid = require('uuid')

/**
 * The todo-core defines the initial state and behavior
 * of all todo model state
 */
module.exports = Nuclear.createCore({
  /**
   * Define the initial state of the 'todo' core of the app state
   */
  getInitialState() {
    return Map({
      items: OrderedMap()
    })
  },

  /**
   * Setup all the message handlers
   */
  initialize() {
    this.on(Const.ADD_ITEM, addItem)
    this.on(Const.UPDATE_ITEM, updateItem)
    this.on(Const.DELETE_ITEM, deleteItem)
    this.on(Const.DELETE_COMPLETED, deleteCompleted)
    this.on(Const.CHECK_ALL_ITEMS, checkAllItems)
    this.on(Const.UNCHECK_ALL_ITEMS, uncheckAllItems)

    // Define computeds to make the state more consumable

    this.computed('areAllChecked', Getter({
      deps: ['items'],
      compute(items) {
        return items.every(item => {
          return item.get('isComplete')
        })
      }
    }))

    /**
     * Returns a vector (array) of completed todo items
     */
    this.computed('completedItems', Getter({
      deps: ['items'],
      compute(items) {
        return items.filter(item => {
          return item.get('isComplete')
        }).toVector()
      }
    }))

    /**
     * Returns a vector (array) of active todo items
     */
    this.computed('activeItems', Getter({
      deps: ['items'],
      compute(items) {
        return items.filter(item => {
          return !item.get('isComplete')
        }).toVector()
      }
    }))
  }
})

/**
 * Adds a todo item
 */
function addItem(state, payload) {
  var id = uuid()
  return state.update('items', items => {
    return items.set(id, Map({
      id: id,
      isComplete: false,
      title: payload.title
    }))
  })
}

/**
 * Merges the payload with an existing todo item
 */
function updateItem(state, payload) {
  return state.updateIn(['items', payload.id], item => {
    return item.merge(payload)
  })
}

/**
 * Deletes an item by id
 */
function deleteItem(state, payload) {
  return state.update('items', items => {
    return items.delete(payload.id)
  })
}

/**
 * Deletes all completed items
 */
function deleteCompleted(state) {
  return state.update('items', items => {
    return items.filter(item => {
      return !item.get('isComplete')
    }).toMap()
  })
}

/**
 * Marks all items as complete
 */
function checkAllItems(state) {
  var items = state.get('items').withMutations(items => {
    items.forEach((item, key) => {
      items.set(key, item.set('isComplete', true))
    })
    return items
  })
  return state.set('items', items)
}

/**
 * Mark all items as not complete
 */
function uncheckAllItems(state) {
  return state.update('items', items => {
    return items.map(item => {
      return item.set('isComplete', false)
    }).toOrderedMap()
  })
}
