const express = require('express');
const router = express.Router();
const db = require('./database');

router.post('/login', (req, res) => {
  const { identifier, password } = req.body;

  db.checkLogin(identifier, password, (err, success, userId) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Server error' });
    }
    if (success) {
      res.send({ message: 'Login successful', user_id: userId });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});
  

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.registerUser(name, email, password, (err, result) => {
      if (err) return res.status(500).send('Error registering user');
      res.send({ message: 'Registration successful' });
    });
  });
  

module.exports = router;