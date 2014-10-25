/** @jsx React.DOM */
var React = require('react')
var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../nuclear/reactor')

var Filters = require('./filters')

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      'completed': 'todo.completedItems',
      'active': 'todo.activeItems',
      'filterValue': 'filter.value',
    }
  },

  _clearCompleted() {
    reactor.action('todo').deleteCompleted()
  },

  render() {
    var numActive = this.state.active.toJS().length
    var numCompleted = this.state.completed.toJS().length

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>{numActive}</strong> item left
        </span>
        <Filters filterValue={this.state.filterValue} />
        <button id="clear-completed" onClick={this._clearCompleted}>
          Clear completed ({numCompleted})
        </button>
      </footer>
    )
  }

})
