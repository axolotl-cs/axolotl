const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/axolotl');

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  location: { type: String },
  email: { type: String, unique: true },
  invited: [String], // Store the userId of the people you've invited to pair
  connected: [String], // Store the userId of the people you've connected with
  bio: { type: String },
  skills: [String],
  interests: [String],
  image: { data: Buffer, contentType: String },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
