const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    uid: String,
    searches: {
    type: [String], // Assuming currentRead is an array of strings (book IDs)
    validate: {
      validator: function(arr) {
        return arr.length <= 50; // Only allow an array length of 0 or 1
      },
      message: props => `The array ${props.value} must have a length of 0 or 1!`
    }
    }
  });
  
  const Search = mongoose.model('Search', searchHistorySchema);

  module.exports=Search;