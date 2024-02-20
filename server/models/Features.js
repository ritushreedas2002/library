const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFeaturesSchema = new Schema({
  uid: String,
  favourites: {
    type: [String],
    default: []
  },
  bookmarks: {
    type: [String],
    default: []
  },
  currentRead: {
    type: [String], // Assuming currentRead is an array of strings (book IDs)
    validate: {
      validator: function(arr) {
        return arr.length <= 1; // Only allow an array length of 0 or 1
      },
      message: props => `The array ${props.value} must have a length of 0 or 1!`
    }
  },
  recentlyviewed: {
    type: [String], // Array of recently viewed book IDs
    validate: {
      validator: function(arr) {
        return arr.length <= 12; // Maximum of 10 recently viewed books
      },
      message: props => `The array ${props.value} must have a length of 0 to 10!`
    }
  }
});

const UserFeatures = mongoose.model('UserFeatures', userFeaturesSchema);

module.exports = UserFeatures;
