/** @jsx React.DOM */
var React = require('react')
var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../nuclear/reactor')

var Header = require('./header')
var Footer = require('./footer')
var ItemList = require('./item-list')

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      'areAllChecked': 'todo.areAllChecked',
      'items': 'filteredTodos',
    }
  },

  render() {
    // items is immutable at this point, coerce to plain JS Array
    var items = this.state.items.toJS()
    return (
      <section id="todoapp">
        <Header />
        <ItemList
          items={items}
          areAllChecked={this.state.areAllChecked} />
        <Footer />
      </section>
    )
  }

})
