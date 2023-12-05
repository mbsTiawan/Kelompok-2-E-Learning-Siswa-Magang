const express = require('express');
const exampleController = require('../controller/exampleController');
const authRoutes = require('./auth');
const routeSekolah = require('./sekolah');
const routeKategori = require('./kategori');
const routeAsisten = require('./asisten');
const routeModul = require('./modul');
const authMiddleware = require('../middleware/authMiddleware');

const route = express.Router();

route.get('/', exampleController.index);
route.use('/auth', authRoutes);

// Middleware to authenticate and authorize users
route.use(authMiddleware.authenticateUser);

// Routes for authenticated and authorized users
route.use('/kategori', authMiddleware.authorizeRole('admin'), routeKategori);
route.use('/asisten', authMiddleware.authorizeRole('asisten'), routeAsisten);
route.use('/sekolah', authMiddleware.authorizeRole('siswa'), routeSekolah);
route.use('/modul', authMiddleware.authorizeRole('siswa'), routeModul);

module.exports = route;
