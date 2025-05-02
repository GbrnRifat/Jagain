const express = require('express');
const { getAllUsers, login, Register } = require('../controllers/Users');
const { refreshToken } = require('../controllers/retoken');

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', Register);
router.post('/login', login);
router.get('/token', refreshToken);

module.exports = router;
