const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CollectibleSchema = new Schema({
  collectibleId: {
    type: Number,
    required: true
  },
  found: {
    type: Boolean,
    required: true,
    default: false
  },
});


// Export the model
module.exports = mongoose.model('Collectible', CollectibleSchema);