const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    uid: String,
    search: {
    type: [String], // Assuming currentRead is an array of strings (book IDs)
    validate: {
      validator: function(arr) {
        return arr.length <= 4; // Only allow an array length of 0 or 1
      },
      message: props => `The array ${props.value} must have a length of 0 or 1!`
    }
    }
  });
  
  const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

  module.exports=SearchHistory;