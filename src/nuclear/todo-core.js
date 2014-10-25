var Map = require('immutable').Map
var Nuclear = require('nuclear-js')
var Getter = Nuclear.Getter
var Const = require('./constants')
var uuid = require('uuid')

/**
 * The todo-core defines the initial state and behavior
 * of all todo model state
 */
module.exports = Nuclear.createCore({
  getInitialState() {
    return {
      items: {}
    }
  },

  initialize() {
    this.on(Const.ADD_ITEM, addItem)
    this.on(Const.UPDATE_ITEM, updateItem)
    this.on(Const.DELETE_ITEM, deleteItem)
    this.on(Const.DELETE_COMPLETED, deleteCompleted)
    this.on(Const.CHECK_ALL_ITEMS, checkAllItems)
    this.on(Const.UNCHECK_ALL_ITEMS, uncheckAllItems)

    this.computed('completedItems', Getter({
      deps: ['items'],
      compute(items) {
        return items.valueSeq().filter(item => {
          return item.get('isComplete')
        })
      }
    }))

    this.computed('activeItems', Getter({
      deps: ['items'],
      compute(items) {
        return items.valueSeq().filter(item => {
          return !item.get('isComplete')
        })
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

function updateItem(state, payload) {
  return state.updateIn(['items', payload.id], item => {
    return item.merge(payload)
  })
}

function deleteItem(state, payload) {
  return state.update('items', items => {
    return items.delete(payload.id)
  })
}

function deleteCompleted(state) {
  return state.update('items', items => {
    return items.filter(item => {
      return !item.get('isComplete')
    }).toMap()
  })
}

function checkAllItems(state) {
  return state.update('items', items => {
    return items.map(item => {
      return item.set('isComplete', true)
    })
  })
}

function uncheckAllItems(state) {
  return state.update('items', items => {
    return items.map(item => {
      return item.set('isComplete', false)
    })
  })
}
