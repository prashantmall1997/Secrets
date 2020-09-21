//jshint esversion:8

const mongoose = require('mongoose');
const findOrCreatePlugin = require('mongoose-findorcreate');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const passportLocalMongoose = require('passport-local-mongoose');
var findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose, {
  usernameUnique: false
});
userSchema.plugin(findOrCreate);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;