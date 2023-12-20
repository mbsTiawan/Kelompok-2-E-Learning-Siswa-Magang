const express = require("express");
const siswaController = require("../controller/siswaController");
const routeSiswa = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
routeSiswa.use(authMiddleware.authenticateUser)

routeSiswa.post("/create", authMiddleware.authorizeRole('admin'), siswaController.create);
routeSiswa.get("/get", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), siswaController.getAll);
routeSiswa.get("/get/:id", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), siswaController.getById);
routeSiswa.put("/update/:id", authMiddleware.authorizeRole('admin'), siswaController.update);
routeSiswa.delete("/delete/:id", authMiddleware.authorizeRole('admin'), siswaController.deleteById);

module.exports = routeSiswa;
