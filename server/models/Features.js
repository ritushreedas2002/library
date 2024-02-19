const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFeaturesSchema = new Schema({
  uid: String,
  favourites: {
    type: [String], // Assuming favourites is an array of strings (book IDs)
    default: [] // Default value is an empty array
  },
  bookmarks: {
    type: [String], // Assuming bookmarks is an array of strings (book IDs)
    default: [] // Default value is an empty array
  }
});

const UserFeatures = mongoose.model('UserFeatures', userFeaturesSchema);

module.exports = UserFeatures;
