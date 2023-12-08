const express = require("express");
const modulController = require("../controller/modulController");
const routeModul = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

routeModul.use(authMiddleware.authenticateUser);

routeModul.post("/upload", authMiddleware.authorizeRole('admin', 'asisten'), modulController.upload);
routeModul.get("/download/:id", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.download);
routeModul.get("/get", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.getAll);
routeModul.get("/get/modulKategori", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.getByKategori);
routeModul.get("/get/modulAsisten", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.getByAst);
routeModul.get("/get/:id", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.getById);
routeModul.get("/get/modulKategori/:id", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.getByIdKategory)
routeModul.get("/get/modulAsisten/:id", authMiddleware.authorizeRole('admin', 'asisten', 'siswa'), modulController.getByIdAst)
routeModul.put("/update/:id", authMiddleware.authorizeRole('admin'), modulController.update)
routeModul.delete("/delete/:id", authMiddleware.authorizeRole('admin'), modulController.delete)

module.exports = routeModul;

