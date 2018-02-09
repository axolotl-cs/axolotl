const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/axolotl');

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  location: { type: String },
  email: { type: String, unique: true, require: true },
  invited: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  connected: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  bio: { type: String },
  skills: [String],
  interests: [String],
  image: { data: Buffer, contentType: String }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
