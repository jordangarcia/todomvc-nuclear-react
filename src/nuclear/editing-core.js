var Nuclear = require('nuclear-js')
var Const = require('./constants')

/**
 * State which item is being edited
 */
module.exports = Nuclear.createCore({
  getInitialState() {
    return null
  },

  initialize() {
    this.on(Const.SET_EDITING_ITEM, setEditing)
    this.on(Const.CLEAR_EDITING_ITEM, clearEditingItem)
  }
})

function clearEditingItem(state)  {
  return null
}

function setEditing(state, payload) {
  return payload.id
}
