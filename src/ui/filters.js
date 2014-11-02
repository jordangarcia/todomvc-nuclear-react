/** @jsx React.DOM */
var React = require('react')
var reactor = require('../nuclear/reactor')

/**
 * Filter controls for showing all/active/completed
 * items
 */
module.exports = React.createClass({

  /**
   * Set the filter value (all|active|completed)
   */
  filter(val) {
    reactor.action('todo').filter(val)
  },

  render() {
    var value = this.props.filterValue

    return (
      <ul id="filters">
        <li>
          <a
            href="javascript:void(0)"
            className={value === 'all' ? 'selected' : ''}
            href="#/all"
          >
            All
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className={value === 'active' ? 'selected' : ''}
            href="#/active"
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className={value === 'completed' ? 'selected' : ''}
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>
    )
  }
})
