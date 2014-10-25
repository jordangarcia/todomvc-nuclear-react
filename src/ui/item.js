/** @jsx React.DOM */
var React = require('react')
var reactor = require('../nuclear/reactor')

module.exports = React.createClass({
  _delete(e) {
    reactor.action('todo').deleteItem(this.props.item)
  },

  _change(e) {
    reactor.action('todo').toggleItem(this.props.item)
  },

  render() {
    var item = this.props.item
    var classNames = (item.isComplete) ? 'completed' : ''

    var checkbox = React.DOM.input({
      type: 'checkbox',
      className: 'toggle',
      checked: item.isComplete,
      onChange: this._change
    })

    return (
      <li className={classNames}>
        <div className="view">
          {checkbox}
          <label>{item.title}</label>
          <button className="destroy" onClick={this._delete} />
        </div>
      </li>
    )
  }
})
