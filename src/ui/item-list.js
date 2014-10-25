/** @jsx React.DOM */
var React = require('react')
var Item = require('./item')

var reactor = require('../nuclear/reactor')

module.exports = React.createClass({

  _toggleAll(e) {
    reactor.action('todo').toggleAll(e.target.checked)
  },

  render() {
    var ItemComponents = this.props.items.map(item => {
      return Item({
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
