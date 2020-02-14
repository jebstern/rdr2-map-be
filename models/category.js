const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  map_id: {
    type: Number,
    required: true
  },
  game_id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Category', CategorySchema);