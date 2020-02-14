const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  locations: {
    type: Array,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);