const express = require("express");
const sekolahController = require("../controller/sekolahController");
const routeSekolah = express.Router();

routeSekolah.post('/', sekolahController.create);
routeSekolah.get('/', sekolahController.getAll);
routeSekolah.get('/:id', sekolahController.getById);
routeSekolah.put('/:id', sekolahController.update);
routeSekolah.delete('/:id', sekolahController.delete);

module.exports = routeSekolah;
