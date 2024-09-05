// models/Sender.js
const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Sender = mongoose.model('Sender', senderSchema);

module.exports = Sender;
