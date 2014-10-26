/** @jsx React.DOM */
var React = require('react')
var Filters = require('./filters')

module.exports = React.createClass({

  /**
   * Removes all completed items
   */
  clearCompleted() {
    reactor.action('todo').deleteCompleted()
  },

  render() {
    var filterValue = this.props.filterValue
    var numActive = this.props.numActive
    var numCompleted = this.props.numCompleted
    var itemString = (numActive === 1) ? 'item' : 'items'

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>{numActive}</strong> {itemString} left
        </span>
        <Filters filterValue={filterValue} />
        <button id="clear-completed" onClick={this.clearCompleted}>
          Clear completed ({numCompleted})
        </button>
      </footer>
    )
  }
})
