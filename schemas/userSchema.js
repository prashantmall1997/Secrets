//jshint esversion:8

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;