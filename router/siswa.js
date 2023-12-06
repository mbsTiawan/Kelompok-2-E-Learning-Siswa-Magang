const express = require("express");
const siswaController = require("../controller/siswaController");
const routeSiswa = express.Router();

routeSiswa.post("/create", siswaController.create);
routeSiswa.get("/get", siswaController.getAll);
routeSiswa.get("/get/:id", siswaController.getById);
routeSiswa.put("/update/:id", siswaController.update);
routeSiswa.delete("/delete/:id", siswaController.deleteById);

module.exports = routeSiswa;
