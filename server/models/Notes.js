const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  color:String,
  tags: [String], // Changed to array of strings for multiple tags
  lastEdited: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  }
});

const userNoteSchema = new mongoose.Schema({
  uid: String,
  notes: [noteSchema]
});

const UserNote = mongoose.model('UserNote', userNoteSchema);

module.exports = UserNote;