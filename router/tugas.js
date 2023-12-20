const express = require("express");
const tugasController = require("../controller/tugasController");
const routeTugas = express.Router()

// Import the authorization middleware
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware for all routes after '/kategori'
routeTugas.use(authMiddleware.authenticateUser);

// Apply role-based authorization middleware for specific routes
routeTugas.post('/create', authMiddleware.authorizeRole('admin', 'asisten'), tugasController.create);
routeTugas.get('/get', authMiddleware.authorizeRole('admin', 'asisten'), tugasController.getAll)
routeTugas.get('/get/siswa', authMiddleware.authorizeRole('admin', 'asisten'), tugasController.getBySiswa);
routeTugas.put('/update/:id', authMiddleware.authorizeRole('admin', 'asisten'), tugasController.update);
routeTugas.delete('/delete/:id', authMiddleware.authorizeRole('admin', 'asisten'), tugasController.delete);

module.exports = routeTugas;
