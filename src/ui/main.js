/** @jsx React.DOM */
var React = require('react')
var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../nuclear/reactor')
var Header = require('./header')
var Footer = require('./footer')
var ItemList = require('./item-list')

/**
 * Root component
 */
module.exports = React.createClass({

  /**
   * ReactorMixin provides automatic data syncing/rendering
   * whenever the app state changes (through the reactor)
   */
  mixins: [ReactorMixin(reactor)],

  /**
   * Returns a map of state values that should be synced
   * with keyPaths on the app state singleton (reactor)
   */
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
