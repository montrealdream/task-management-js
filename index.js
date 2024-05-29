const express = require('express');
// dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT;



// database
const database = require('./config/database');
database.connect();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})