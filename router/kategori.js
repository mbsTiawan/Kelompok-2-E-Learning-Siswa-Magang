const express = require("express");
const kategoriController = require("../controller/kategoriController");
const routeKategori = express.Router()

routeKategori.post('/create', kategoriController.create)
routeKategori.get('/get', kategoriController.getAll)
routeKategori.get('/get/:id', kategoriController.getById)
routeKategori.put('/update/:id', kategoriController.update)
routeKategori.delete('/delete/:id', kategoriController.delete)

module.exports = routeKategori
