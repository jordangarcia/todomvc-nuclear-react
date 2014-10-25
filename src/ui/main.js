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
      'items': 'filteredTodos',
    }
  },

  render() {
    // dereference immutable objs
    var items = this.state.items.valueSeq().toJS()
    return (
      <section id="todoapp">
        <Header />
        <ItemList items={items} />
        <Footer />
      </section>
    )
  }

})
