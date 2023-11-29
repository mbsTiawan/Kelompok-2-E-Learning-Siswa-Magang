const express = require("express");
const sekolahController = require("../controller/sekolahController");
const routeSekolah = express.Router();

routeSekolah.post('/create', sekolahController.create);
routeSekolah.get('/get', sekolahController.getAll);
routeSekolah.get('/get/:id', sekolahController.getById);
routeSekolah.put('/update/:id', sekolahController.update);
routeSekolah.delete('/delete/:id', sekolahController.delete);

module.exports = routeSekolah;
