/** @jsx React.DOM */
var React = require('react')
var reactor = require('../nuclear/reactor')

module.exports = React.createClass({

  _filter(val) {
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
            onClick={this._filter.bind(this, 'all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className={value === 'active' ? 'selected' : ''}
            onClick={this._filter.bind(this, 'active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            className={value === 'completed' ? 'selected' : ''}
            onClick={this._filter.bind(this, 'completed')}
          >
            Completed
          </a>
        </li>
      </ul>
    )
  }

})