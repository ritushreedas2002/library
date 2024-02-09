const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String] // Changed to array of strings for multiple tags
});

const userNoteSchema = new mongoose.Schema({
  uid: String,
  notes: [noteSchema]
});

const UserNote = mongoose.model('UserNote', userNoteSchema);

module.exports = UserNote;