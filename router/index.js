const express = require("express");
const exampleController = require("../controller/exampleController");
const routeSekolah = require("./sekolah");
const routeKategori = require("./kategori");
const routeAsisten = require("./asisten");
const routeModul = require("./modul");
const routeRole = require("./role");
const routeSiswa = require("./siswa");
const route = express.Router();

route.get("/", exampleController.index);
route.use("/kategori", routeKategori);
route.use("/asisten", routeAsisten);
route.use('/sekolah', routeSekolah);
route.use('/modul', routeModul);
route.use('/role', routeRole);
route.use('/siswa', routeSiswa);

module.exports = route;
