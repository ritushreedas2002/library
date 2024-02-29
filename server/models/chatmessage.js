const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [
    {
      text: { type: String, required: true },
      type: { type: String, required: true }, // "incoming" or "outgoing"
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
