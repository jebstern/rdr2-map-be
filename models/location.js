const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocationSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  map_id: {
    type: Number,
    required: true
  },
  category_id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  found: {
    type: Boolean,
    required: true
  },
});

// Export the model
module.exports = mongoose.model('Location', LocationSchema);