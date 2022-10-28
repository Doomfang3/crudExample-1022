const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  label: {
    type: String,
    required: true,
    maxlength: [20, 'Label should be less than 20 chars'],
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
})

const Product = model('product', productSchema)

module.exports = Product
