const express = require("express");
const kategoriController = require("../controller/kategoriController");
const routeKategori = express.Router()

routeKategori.post('/', kategoriController.create)
routeKategori.get('/', kategoriController.getAll)
routeKategori.get('/:id', kategoriController.getById)
routeKategori.put('/:id', kategoriController.update)
routeKategori.delete('/:id', kategoriController.delete)

module.exports = routeKategori
