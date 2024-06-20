const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
