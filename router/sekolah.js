const express = require("express");
const sekolahController = require("../controller/sekolahController");
const routeSekolah = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware for all routes after '/kategori'
routeSekolah.use(authMiddleware.authenticateUser);

routeSekolah.post('/create', authMiddleware.authorizeRole('admin'), sekolahController.create);
routeSekolah.get('/get', authMiddleware.authorizeRole('admin'), sekolahController.getAll);
routeSekolah.get('/get/:id', authMiddleware.authorizeRole('admin'), sekolahController.getById);
routeSekolah.put('/update/:id', authMiddleware.authorizeRole('admin'), sekolahController.update);
routeSekolah.delete('/delete/:id', authMiddleware.authorizeRole('admin'), sekolahController.delete);

module.exports = routeSekolah;
