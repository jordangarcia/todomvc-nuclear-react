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
  toggleAll(event) {
    reactor.action('todo').toggleAll(event.target.checked)
  },

  render() {
    console.log('editing id', this.props.editingId)
    var ItemComponents = this.props.items.map(item => {
      console.log('is editing', item.id === this.props.editingId)
      return Item({
        key: item.id,
        item: item,
        isEditing: (item.id === this.props.editingId)
      })
    })
    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={this.props.areAllChecked}
        />
        <ul id="todo-list">
          {ItemComponents}
        </ul>
      </section>
    )
  }
})
