const express = require('express');
// dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// database
const database = require('./config/database');
database.connect();

// router
const router = require('./v1/routes/index.route');

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})