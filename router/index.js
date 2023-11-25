const express = require("express");
const exampleController = require("../controller/exampleController");
const routeKategori = require("./kategori");
const routeAsisten = require("./asisten");
const route = express.Router();

route.get("/", exampleController.index);
route.use("/kategori", routeKategori);
route.use("/asisten", routeAsisten);

module.exports = route;
