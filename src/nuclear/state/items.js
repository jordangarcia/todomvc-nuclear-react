"use strict";

var Immutable = require('immutable')
var Map = Immutable.Map
var Nuclear = require('nuclear-js')
var Const = require('../constants')
var uuid = require('uuid')

/**
 * The todo-core defines the initial state and behavior
 * of all todo model state
 */
module.exports = Nuclear.ReactiveState({
  /**
   * Define the initial state of the 'todo' core of the app state
   */
  getInitialState() {
    return []
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
  }
})

/**
 * Adds a todo item
 */
function addItem(state, payload) {
  var id = uuid()
  return state.push(Map({
    id: id,
    isComplete: false,
    title: payload.title
  }))
}

/**
 * Merges the payload with an existing todo item
 */
function updateItem(state, payload) {
  return state.update(itemIndex(state, payload.id), item => {
    return item.merge(payload)
  })
}

/**
 * Deletes an item by id
 */
function deleteItem(state, payload) {
  return state.remove(itemIndex(state, payload.id))
}

/**
 * Deletes all completed items
 */
function deleteCompleted(state) {
  return state.filter(item => {
    return !item.get('isComplete')
  })
}

/**
 * Marks all items as complete
 */
function checkAllItems(state) {
  return state.map(item => {
    return item.set('isComplete', true)
  })
}

/**
 * Mark all items as not complete
 */
function uncheckAllItems(state) {
  return state.map(item => {
    return item.set('isComplete', false)
  })
}

/**
 * Gets the index of an item matching the id
 */
function itemIndex(state, id) {
  var ind = state.findIndex(item => {
    return item.get('id') === id
  })
  if (ind === -1) {
    throw new Error("Cannot find item by id=" + id)
  }
  return ind
}
