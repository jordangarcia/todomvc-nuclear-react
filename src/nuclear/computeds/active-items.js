var Nuclear = require('nuclear-js')

module.exports = Nuclear.Computed(
  ['items'],
  (items) => {
    return items.filter(item => {
      return !item.get('isComplete')
    })
  }
)
