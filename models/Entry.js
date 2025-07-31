const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String
});

module.exports = mongoose.model('Entry', entrySchema);
