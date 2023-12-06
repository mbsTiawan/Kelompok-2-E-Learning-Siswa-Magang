const express = require('express');
const authController = require('../controller/authController');
const authRoutes = require('./auth');
const routeSekolah = require('./sekolah');
const routeKategori = require('./kategori');
const routeAsisten = require('./asisten');
const routeModul = require('./modul');
const authMiddleware = require('../middleware/authMiddleware');

const route = express.Router();

route.get('/', (req, res) => res.send('Hello World'));
route.use('/auth', authRoutes);

route.use(authMiddleware.authenticateUser);

route.use('/sekolah', authMiddleware.authorizeRole('siswa'), routeSekolah);
route.use('/kategori', authMiddleware.authorizeRole('admin'), routeKategori);
route.use('/asisten', authMiddleware.authorizeRole('asisten'), routeAsisten);
route.use('/modul', authMiddleware.authorizeRole('siswa'), routeModul);

module.exports = route;
