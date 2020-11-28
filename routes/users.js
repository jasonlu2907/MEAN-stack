const express = require('express');
const router = express.Router();

// Register
/** https://.../users/register */
router.get('/register', (req, res, next) => {
  res.send('REGISTER');
})

// Authentification
/** https://.../users/authenticate */
router.post('/authentificate', (req, res, next) => {
  res.send('AUTHENTIFICATION');
})

// Profile
/** https://.../users/profile */
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
})

// Validate
/** https://.../users/validate */
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
})
module.exports = router;