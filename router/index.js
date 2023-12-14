// index.js

const express = require('express');
const authController = require('../controller/authController');
const exampleController = require("../controller/exampleController");
const authRoutes = require('./auth');
const routeSekolah = require('./sekolah');
const routeKategori = require('./kategori');
const routeAsisten = require('./asisten');
const routeModul = require('./modul');
const routeRole = require("./role");
const routeSiswa = require("./siswa");
const authMiddleware = require('../middleware/authMiddleware');
const routeLogbookSiswa = require('./logbookSiswa');
const route = express.Router();

route.use('/auth', authRoutes);
route.use(authMiddleware.authenticateUser);
route.use(authMiddleware.isTokenBlacklisted); // Add this middleware to check for blacklisted tokens

route.get("/", exampleController.index);
route.use('/sekolah', routeSekolah);
route.use('/kategori', routeKategori);
route.use('/asisten', routeAsisten);
route.use('/modul', routeModul);

route.use('/role', routeRole);
route.use('/siswa', routeSiswa);
route.use('/logbookSiswa', routeLogbookSiswa);

module.exports = route;
