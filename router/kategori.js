const express = require("express");
const kategoriController = require("../controller/kategoriController");
const routeKategori = express.Router()

// Import the authorization middleware
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware for all routes after '/kategori'
routeKategori.use(authMiddleware.authenticateUser);

// Apply role-based authorization middleware for specific routes
routeKategori.post('/create', authMiddleware.authorizeRole('admin'), kategoriController.create);
routeKategori.get('/get', authMiddleware.authorizeRole('admin'), kategoriController.getAll);
routeKategori.get('/get/:id', authMiddleware.authorizeRole('admin'), kategoriController.getById);
routeKategori.put('/update/:id', authMiddleware.authorizeRole('admin'), kategoriController.update);
routeKategori.delete('/delete/:id', authMiddleware.authorizeRole('admin'), kategoriController.delete);

module.exports = routeKategori;
