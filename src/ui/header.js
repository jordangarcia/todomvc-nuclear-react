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
    var input = React.DOM.input({
      id: 'new-todo',
      placeholder: "What needs to be done?",
      autoFocus: true,
      autoComplete: 'off'
    })
    return (
      <header id="header">
        <h1>todos</h1>
        <form onSubmit={this._addItem}>
          {input}
        </form>
      </header>
    )
  }
})