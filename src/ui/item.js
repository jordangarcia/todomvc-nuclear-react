/** @jsx React.DOM */
var React = require('react')
var reactor = require('../nuclear/reactor')

/**
 * A single todo item
 */
module.exports = React.createClass({
  /**
   * Removes the current item
   */
  delete() {
    reactor.action('todo').deleteItem(this.props.item)
  },

  /**
   * Toggles the item's isComplete attribute
   */
  toggleComplete() {
    reactor.action('todo').toggleItem(this.props.item)
  },

  render() {
    var item = this.props.item
    var classNames = (item.isComplete) ? 'completed' : ''

    var checkbox = React.DOM.input({
      type: 'checkbox',
      className: 'toggle',
      checked: item.isComplete,
      onChange: this.toggleComplete
    })

    return (
      <li className={classNames}>
        <div className="view">
          {checkbox}
          <label>{item.title}</label>
          <button className="destroy" onClick={this.delete} />
        </div>
      </li>
    )
  }
})
