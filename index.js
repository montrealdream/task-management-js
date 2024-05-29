const express = require('express');
// dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// body-parser
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());

// database
const database = require('./config/database');
database.connect();

// router
const router = require('./v1/routes/index.route');

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})