var Const = require('./constants')

/**
 * adds a new todo item
 */
exports.addItem = function(reactor, val) {
  reactor.dispatch(Const.ADD_ITEM, {
    title: val
  })
}

exports.deleteItem = function(reactor, item) {
  reactor.dispatch(Const.DELETE_ITEM, {
    id: item.id
  })
}

exports.deleteCompleted = function(reactor) {
  reactor.dispatch(Const.DELETE_COMPLETED)
}

exports.toggleItem = function(reactor, item) {
  reactor.dispatch(Const.UPDATE_ITEM, {
    id: item.id,
    isComplete: !item.isComplete,
  })
}

exports.toggleAll = function(reactor, val) {
  if (val) {
    reactor.dispatch(Const.CHECK_ALL_ITEMS)
  } else {
    reactor.dispatch(Const.UNCHECK_ALL_ITEMS)
  }
}

exports.filter = function(reactor, val) {
  reactor.dispatch(Const.SET_COMPLETED_FILTER, {
    value: val
  })
}
