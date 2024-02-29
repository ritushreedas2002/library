const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  color:String,
  tags: [String], // Changed to array of strings for multiple tags
  lastEdited: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  },
  favorite: { // New field to indicate if a note is a favorite
    type: Boolean,
    default: false
  }
});

const userNoteSchema = new mongoose.Schema({
  uid: String,
  notes: [noteSchema],
  favorites: [noteSchema] // New array to store favorite notes
});

const UserNote = mongoose.model('UserNote', userNoteSchema);

module.exports = UserNote;