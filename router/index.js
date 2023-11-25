const express = require("express");
const exampleController = require("../controller/exampleController");
const routeSekolah = require("./sekolah");
const routeKategori = require("./kategori");
const route = express.Router()

route.get('/',exampleController.index)
route.use('/kategori', routeKategori)
route.use('/sekolah', routeSekolah);

module.exports = route