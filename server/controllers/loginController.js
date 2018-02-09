const User = require('../data/userModel.js');

const loginController = {};

// Handle user login
loginController.login = (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  // data is the object that is sent back to the client
  const data = {};
  // Look for the user with the given username and password
  User.find(user, (err, result) => {
    if (err) throw err;
    if (result[0].username) {
      data.user = result;
    } else {
      res.json('Not found.');
      return next();
    }
  })
  // If you found the username add the list of users to data and send back with response
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

  // Save the user and send back the user object
  newUser.save()
    .then(() => {
      User.find({ username }, (err, user) => {
        if (err) throw err;
        res.json(user);
        return next();
      });
    })
    .catch((err) => {
      // Add error handling...
      console.log(err);
    });
};

module.exports = loginController;
