const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('COnected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database ERROR! ' + err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser Middleware
app.use(bodyParser.json());

// Route
app.use('/users', users); // f để cái này lên trên thằng app.use('')

app.use('', (req, res) => {
  res.send('Invalid Endpoint');
});

// Server started
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});