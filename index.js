const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// enable all cors request
app.use(cors());

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