const mongoose = require('mongoose');

const { Schema } = mongoose;

// mongoose.connect('mongodb://localhost/axolotl');

// Hosting db on mlab
mongoose.connect('mongodb://axol:ilovetesting@ds231228.mlab.com:31228/axolotl');
console.log('Connected to mongodb');

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  location: { type: String, default: '' },
  email: String,
  invited: [String], // Store the userId of the people you've invited to pair
  connected: [String], // Store the userId of the people you've connected with
  bio: { type: String, default: '' },
  skills: { type: String, default: '' },
  interests: { type: String, default: '' },
  image: { data: Buffer, contentType: String },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
