var Const = require('./constants')

var VALID_FILTERS = ['all', 'completed', 'active']

var DEFAULT_FILTER = 'all'


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

exports.updateItemTitle = function(reactor, id, newTitle) {
  reactor.dispatch(Const.UPDATE_ITEM, {
    id: id,
    title: newTitle
  })
}

exports.setEditingItem = function(reactor, item) {
  reactor.dispatch(Const.SET_EDITING_ITEM, item.id)
}

exports.clearEditingItem = function(reactor) {
  reactor.dispatch(Const.CLEAR_EDITING_ITEM)
}

exports.toggleAll = function(reactor, val) {
  if (val) {
    reactor.dispatch(Const.CHECK_ALL_ITEMS)
  } else {
    reactor.dispatch(Const.UNCHECK_ALL_ITEMS)
  }
}

exports.filter = function(reactor, val) {
  if (VALID_FILTERS.indexOf(val) === -1) {
    console.warn('invalid filter', val)
    val = DEFAULT_FILTER
  }
  reactor.dispatch(Const.SET_COMPLETED_FILTER, val)
}

/**
 * Parses the window location hash and sets the necessary
 * app state
 */
exports.parseHash = function(reactor, hash) {
  var matches = hash.match(/\/(\w+)/)

  if (matches) {
    exports.filter(reactor, matches[1])
  }
}
