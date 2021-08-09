const { Schema, model } = require('mongoose')

const schema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    default: false
  }
})

module.exports = model('User', schema)
