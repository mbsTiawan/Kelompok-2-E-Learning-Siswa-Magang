const express = require('express');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = express.Router();

// Login
authRoutes.post('/login', authController.login);

// Register
authRoutes.post('/register', authController.register);

module.exports = authRoutes;
