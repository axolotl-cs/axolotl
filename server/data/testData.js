/**
 * File that sets up test data.
 */

const User = require('./userModel.js');
const fs = require('fs');
const path = require('path');

// Path to test image
const imgPath = path.join(__dirname, 'images/axolotl.jpg');

const image = {};
image.data = fs.readFileSync(imgPath);
image.contentType = 'image/jpg';
// Clear database
const testData = () => {
  User.remove({}, (err) => {
    if (err) throw err;
  })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });

  const andrew = new User({
    username: 'andrew',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'afuselier23@gmail.com',
    bio: 'I love programming!',
    skills: 'Javascript',
  });

  const eric = new User({
    username: 'eric',
    password: 'ilovetesting',
    location: 'Venice',
    email: 'eric.rudolph.carrillo@gmail.com',
    bio: 'I love surfing!',
    skills: 'Javascript',
  });

  const john = new User({
    username: 'john',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'john@gmail.com',
    bio: 'I love programming!',
    skills: 'Javascript',
  });

  const max = new User({
    username: 'max',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'max@gmail.com',
    bio: 'I love programming!',
    skills: 'Javascript',
  });

  const star = new User({
    username: 'star',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'star@gmail.com',
    bio: 'I love programming!',
    skills: 'Javascript',
  });

  andrew.save();
  eric.save();
  john.save();
  max.save();
  star.save();
};

module.exports = testData;
