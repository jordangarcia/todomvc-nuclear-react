var Nuclear = require('nuclear-js')

module.exports = Nuclear.Computed(
  ['items'],
  (items) => {
    return items.every(item => {
      return item.get('isComplete')
    })
  }
)
