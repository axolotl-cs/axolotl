const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Controllers to handle login and user functions
const loginController = require('./controllers/loginController.js');
const userController = require('./controllers/userController.js');

// Function to set test data in db
const testData = require('./data/testData.js');

const app = express();

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json());

// Send root react page
app.get('/', (req, res) => { res.sendFile('index.html'); });

// User logs in
app.post('/login', loginController.login);

// User signs up
app.post('/signup', loginController.signup);

// User sends an invite
app.post('/invite', userController.invite);

// User accepts an invite
app.post('/connect', userController.connect);

// Update user info
app.post('/profile', userController.update);

// Return list of users to render in feed
app.get('/feed', userController.getUsers);

// REMOVE ME!!!
// I set fake data for testing
testData();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
