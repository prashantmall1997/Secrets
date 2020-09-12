//jshint esversion:8

require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
