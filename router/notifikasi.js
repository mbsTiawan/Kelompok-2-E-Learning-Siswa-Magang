const express = require('express');
const notifikasiController = require('../controller/notifikasiController');
const routeNotifikasi = express.Router();

// Import the authorization middleware
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware for all routes after '/notifikasi'
routeNotifikasi.use(authMiddleware.authenticateUser);

routeNotifikasi.post(
  '/create',
  authMiddleware.authorizeRole('admin', 'asisten'),
  notifikasiController.create
);
routeNotifikasi.get(
  '/get',
  authMiddleware.authorizeRole('admin', 'asisten', 'siswa'),
  notifikasiController.getAll
);
routeNotifikasi.get(
  '/get/:id',
  authMiddleware.authorizeRole('admin', 'asisten', 'siswa'),
  notifikasiController.getById
);
routeNotifikasi.put(
  '/update/:id',
  authMiddleware.authorizeRole('admin', 'asisten'),
  notifikasiController.update
);
routeNotifikasi.delete(
  '/delete/:id',
  authMiddleware.authorizeRole('admin', 'asisten'),
  notifikasiController.deleteById
);

module.exports = routeNotifikasi;
