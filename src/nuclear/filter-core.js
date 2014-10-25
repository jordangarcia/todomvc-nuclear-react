var Nuclear = require('nuclear-js')
var Const = require('./constants')

/**
 * Filter core updates all filtering state
 */
module.exports = Nuclear.createCore({
  getInitialState() {
    return {
      value: 'all'
    }
  },

  initialize() {
    this.on(Const.SET_COMPLETED_FILTER, setFilter)
  }
})

function setFilter(state, payload) {
  return state.set('value', payload.value)
}
