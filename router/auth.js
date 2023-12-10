// auth.index.js

const express = require('express');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = express.Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);

// Add logout route
authRoutes.post('/logout', authMiddleware.authenticateUser, authController.logout);

module.exports = authRoutes;
