const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);