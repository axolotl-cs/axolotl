const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const loginController = require('./controllers/loginController.js');

const app = express();

app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/login', loginController.login);
app.post('/signup', loginController.signup);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
