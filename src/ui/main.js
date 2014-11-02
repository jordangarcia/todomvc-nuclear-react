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
   * Declare all state data that should be kept in sync whenever
   * the app state changes from the reactor
   *
   * Returns a map of state properties to reactor keyPaths
   */
  getDataBindings() {
    return {
      'items': 'filteredItems',
      'active': 'items.active',
      'filterValue': 'filter',
      'areAllChecked': 'items.areAllChecked',
      'editingId': 'editingId',
    }
  },

  render() {
    // items is immutable at this point, coerce to plain JS Array
    var items = this.state.items.toJS()
    var numActive = this.state.items.toJS().length
    var numCompleted = items.length - numActive

    return (
      <section id="todoapp">
        <Header />
        <ItemList
          items={items}
          editingId={this.state.editingId}
          areAllChecked={this.state.areAllChecked}
        />
        <Footer 
          numActive={numActive}
          numCompleted={numCompleted}
          filterValue={this.state.filterValue}
        />
      </section>
    )
  }
})
