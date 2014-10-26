/** @jsx React.DOM */
var React = require('react')
var Item = require('./item')
var reactor = require('../nuclear/reactor')

/**
 * Item List comonponent, is passed in a plain javascript array
 * of items as props.
 */
module.exports = React.createClass({

  /**
   * Checks or unchecks all items
   */
  _toggleAll(event) {
    reactor.action('todo').toggleAll(event.target.checked)
  },

  render() {
    var ItemComponents = this.props.items.map(item => {
      return Item({
        key: item.id,
        item: item
      })
    })
    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._toggleAll}
          checked={this.props.areAllChecked}
        />
        <ul id="todo-list">
          {ItemComponents}
        </ul>
      </section>
    )
  }
})
