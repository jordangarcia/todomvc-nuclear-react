var Nuclear = require('nuclear-js')
var Const = require('./constants')

/**
 * Filter core updates all filtering state
 */
module.exports = Nuclear.createCore({
  getInitialState() {
    return 'all'
  },

  initialize() {
    this.on(Const.SET_COMPLETED_FILTER, setFilter)
  }
})

function setFilter(state, payload) {
  return payload.value
}
