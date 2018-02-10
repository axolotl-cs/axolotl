const User = require('../data/userModel.js');

const loginController = {};

// Handle user login
loginController.login = (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  // Object to respond to client with
  const data = {};
  // Look for the user with the given username and password
  User.find(user, (err, result) => {
    if (err) throw err;
    if (result[0].username) {
      data.user = result;
    } else {
      res.status(400).json('Not found.');
      return next();
    }
  })
    .then(() => {
      User.find({}, (err, userList) => {
        if (err) throw err;
        data.list = userList;
        res.status(200).json(data);
        return next();
      });
    })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });
};

// Handle new user creation
loginController.signup = (req, res, next) => {
  const { username, password, email } = req.body;
  const newUser = new User({ username, password, email });
  // Object to respond to client with
  const data = {};
  // Save the user and send back the user object
  newUser.save()
    .then(() => {
      User.find({ username }, (err, result) => {
        if (err) throw err;
        data.user = result[0];
      });
    })
    .then(() => {
      User.find({}, (err, userList) => {
        if (err) throw err;
        data.list = userList;
        res.status(200).json(data);
        return next();
      });
    })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });
};

module.exports = loginController;
