const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

// Register
/** https://.../users/register */
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authentification
/** https://.../users/authenticate */
router.post('/authentificate', (req, res, next) => {
  res.send('AUTHENTIFICATION');
});

// Profile
/** https://.../users/profile */
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});

module.exports = router;