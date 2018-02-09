const User = require('../data/userModel.js');

const loginController = {};

loginController.login = (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  User.find(user, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.username) {
      res.status(200).json(result);
    } else {
      res.json('Not found.');
    }
    return next();
  });
};

loginController.signup = (req, res, next) => {
  const { username, password, email } = req.body;
  const newUser = new User({ username, password, email });
  newUser.save();
  return next();
};

module.exports = loginController;
