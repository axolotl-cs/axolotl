/**
 * File that sets up test data.
 */

const User = require('./userModel.js');

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
  });

  const john = new User({
    username: 'john',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'john@gmail.com',
    bio: 'I love programming!',
  });

  const max = new User ({
    username: 'max',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'max@gmail.com',
    bio: 'I love programming!',
  });

  const star = new User ({
    username: 'star',
    password: 'ilovetesting',
    location: 'Playa Vista',
    email: 'star@gmail.com',
    bio: 'I love programming!',
  });

  andrew.save();
  john.save();
  max.save();
  star.save();
};

module.exports = testData;
