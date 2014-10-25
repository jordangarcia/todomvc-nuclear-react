var Map = require('immutable').Map
var Nuclear = require('nuclear-js')
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
    this.on(Const.CHECK_ALL_ITEMS, checkAllItems)
    this.on(Const.UNCHECK_ALL_ITEMS, uncheckAllItems)
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
      isChecked: false,
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

function checkAllItems(state) {
  return state.update('items', items => {
    return items.map(item => {
      item.set('isChecked', true)
    })
  })
}

function uncheckAllItems(state) {
  return state.update('items', items => {
    return items.map(item => {
      item.set('isChecked', false)
    })
  })
}
