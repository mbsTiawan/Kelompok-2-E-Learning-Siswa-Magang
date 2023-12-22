const express = require("express");
const absensiController = require("../controller/absensiController");
const routeAbsensi = express.Router();

// Import the authorization middleware
const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware for all routes after '/kategori'
routeAbsensi.use(authMiddleware.authenticateUser);

routeAbsensi.post(
  "/create",
  authMiddleware.authorizeRole("admin", "siswa"),
  absensiController.create
);
routeAbsensi.get(
  "/get/myabsensi",
  authMiddleware.authorizeRole("siswa"),
  absensiController.getBySiswa
);
routeAbsensi.get(
  "/get/:id_siswa",
  authMiddleware.authorizeRole("admin", "asisten"),
  absensiController.getByIdSiswa
);
routeAbsensi.put(
  "/update/:id",
  authMiddleware.authorizeRole("admin"),
  absensiController.update
);
routeAbsensi.delete(
  "/delete/:id",
  authMiddleware.authorizeRole("admin"),
  absensiController.delete
);

module.exports = routeAbsensi;
