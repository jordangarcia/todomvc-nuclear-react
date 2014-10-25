/** @jsx React.DOM */
var React = require('react')
var reactor = require('../nuclear/reactor')

module.exports = React.createClass({

  _addItem(e) {
    e.preventDefault()
    var input = e.target.querySelector('input')
    reactor.action('todo').addItem(input.value)
    input.value = ''
  },

  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <form onSubmit={this._addItem}>
          <input id="new-todo" placeholder="What needs to be done?" autofocus />
        </form>
      </header>
    )
  }
})
