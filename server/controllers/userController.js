const User = require('../data/userModel.js');

const userController = {};

// Return the entire list of users
userController.getUsers = (req, res) => {
  User.find({}, (err, userList) => {
    if (userList.length > 0) {
      res.status(200).json(userList);
    }
  });
};

// Add a user to the invite array
userController.invite = (req, res) => {
  const { username, target } = req.body;
  User.update({ username }, { $push: { invited: target } })
    .then(() => {
      User.find({}, (err, userList) => {
        res.status(200).json(userList);
      });
    })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });
};

// Accept a request to pair
userController.connect = (req, res) => {
  const { username, target } = req.body;
  User.update({ username }, { $push: { connected: target } })
    .then(() => {
      User.find({}, (err, userList) => {
        res.status(200).json(userList);
      });
    })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });
};

// Update user info
userController.update = (req, res) => {
  // The post request includes a user property that stores the
  // contents of the user object with updates
  const { user } = req.body;
  User.update({ username: user.username }, user)
    .then(() => {
      User.find({}, (err, userList) => {
        res.status(200).json(userList);
      });
    })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });
}

module.exports = userController;
