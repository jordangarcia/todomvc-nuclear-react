"use strict";

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
    return {
      all: [],
    }
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
      deps: ['all'],
      compute(items) {
        return items.every(item => {
          return item.get('isComplete')
        })
      }
    }))

    /**
     * Returns a vector (array) of completed todo items
     */
    this.computed('completed', Getter({
      deps: ['all'],
      compute(items) {
        return items.filter(item => {
          return item.get('isComplete')
        })
      }
    }))

    /**
     * Returns a vector (array) of active todo items
     */
    this.computed('active', Getter({
      deps: ['all'],
      compute(items) {
        return items.filter(item => {
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
  return state.update('all', items => {
    return items.push(Map({
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
  var ind = itemIndex(state, payload.id)
  return state.updateIn(['all', ind], item => {
    return item.merge(payload)
  })
}

/**
 * Deletes an item by id
 */
function deleteItem(state, payload) {
  var ind = itemIndex(state, payload.id)
  return state.remove('all', items => {
    return items.delete(ind)
  })
}

/**
 * Deletes all completed items
 */
function deleteCompleted(state) {
  return state.update('all', items => {
    return items.filter(item => {
      return !item.get('isComplete')
    })
  })
}

/**
 * Marks all items as complete
 */
function checkAllItems(state) {
  return state.update('all', items => {
    return items.map(item => {
      return item.set('isComplete', true)
    }).toVector()
  })
}

/**
 * Mark all items as not complete
 */
function uncheckAllItems(state) {
  return state.update('all', items => {
    return items.map(item => {
      return item.set('isComplete', false)
    }).toVector()
  })
}

/**
 * Gets the index of an item matching the id
 */
function itemIndex(state, id) {
  var ind = state.get('all').findIndex(item => {
    return item.get('id') === id
  })
  if (ind === -1) {
    throw new Error("Cannot find item by id=" + id)
  }
  return ind
}
