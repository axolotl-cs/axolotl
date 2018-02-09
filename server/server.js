const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getResults = require('./controllers/getResults');
const storeResult = require('./controllers/storeResult');
const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/results', getResults);
app.post('/results', storeResult);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
