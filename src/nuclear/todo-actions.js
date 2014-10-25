var Const = require('./constants')

/**
 * adds a new todo item
 */
exports.addItem = function(reactor, val) {
  reactor.dispatch(Const.ADD_ITEM, {
    title: val
  })
}
