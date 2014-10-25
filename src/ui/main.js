/** @jsx React.DOM */
var React = require('react')
var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../nuclear/reactor')

var TodoHeader = require('./todo-header')

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      'items': 'todo.items',
    }
  },

  render() {
    var body
    if (this.state.items.length > 0) {
      //body = ()
    }
    return (
      <section id="todoapp">
        <TodoHeader />
        {body}
      </section>
    )
  }

})
