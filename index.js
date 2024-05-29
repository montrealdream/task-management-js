const express = require('express');
const app = express();
const port = 3000;

// dotenv
require('dotenv').config();

// database
const database = require('./config/database');
database.connect();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})