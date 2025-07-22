
const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const router = express.Router();

// Route for user registration with validation
router.post('/register', validateRegister, register);

// Route for user login with validation
router.post('/login', validateLogin, login);

module.exports = router;
