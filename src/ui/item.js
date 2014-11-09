/** @jsx React.DOM */
var React = require('react')
var reactor = require('../nuclear/reactor')

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;


/**
 * A single todo item
 */
module.exports = React.createClass({
  /**
   * This component has local state of the current editing value
   * of the title
   */
  getInitialState() {
    return {
      editingValue: this.props.item.title
    }
  },

  /**
   * Removes the current item
   */
  delete() {
    reactor.actions('todo').deleteItem(this.props.item)
  },

  /**
   * Toggles the item's isComplete attribute
   */
  toggleComplete() {
    reactor.actions('todo').toggleItem(this.props.item)
  },

  /**
   * Updates app state to set the current editing item
   */
  setEditing() {
    reactor.actions('todo').setEditingItem(this.props.item)
  },

  /**
   * Keyup handler on the edit title input
   * @param {Event} e
   */
  handleEdit(e) {
    if (e.keyCode === ENTER_KEY) {
      reactor.actions('todo').updateItemTitle(
        this.props.item.id,
        this.state.editingValue
      )
      reactor.actions('todo').clearEditingItem()
    } else if (e.keyCode === ESCAPE_KEY) {
      reactor.actions('todo').clearEditingItem()
    }
  },

  /**
   * Sync the component local state
   * with the input value
   * @param {Event} e
   */
  onEditChange(e) {
    this.setState({
      editingValue: e.target.value
    })
  },

  render() {
    var item = this.props.item
    var classNames = []
    if (item.isComplete) {
      classNames.push('completed')
    }
    if (this.props.isEditing) {
      classNames.push('editing')
    }
    classNames = classNames.join(' ')

    var checkbox = React.DOM.input({
      type: 'checkbox',
      className: 'toggle',
      checked: item.isComplete,
      onChange: this.toggleComplete
    })

    return (
      <li className={classNames}>
        <div className="view">
          {checkbox}
          <label onClick={this.setEditing}>{item.title}</label>
          <button className="destroy" onClick={this.delete} />
        </div>
        <input className="edit"
          onChange={this.onEditChange}
          onKeyUp={this.handleEdit}
          value={this.state.editingValue}
          />
      </li>
    )
  }
})
