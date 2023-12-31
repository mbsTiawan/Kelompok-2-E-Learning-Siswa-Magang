const express = require("express");
const asistenController = require("../controller/asistenController");
const routeAsisten = express.Router();

// Import the authorization middleware
const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware for all routes after '/kategori'
routeAsisten.use(authMiddleware.authenticateUser);

routeAsisten.post(
  "/create",
  authMiddleware.authorizeRole("admin"),
  asistenController.create
);
routeAsisten.get(
  "/role/:role",
  authMiddleware.authorizeRole("admin", "asisten", "siswa"),
  asistenController.getByRole
);
routeAsisten.get(
  "/get",
  authMiddleware.authorizeRole("admin", "asisten", "siswa"),
  asistenController.getAll
);
routeAsisten.get(
  "/get/:id",
  authMiddleware.authorizeRole("admin", "asisten", "siswa"),
  asistenController.getById
);
routeAsisten.put(
  "/update/:id",
  authMiddleware.authorizeRole("admin"),
  asistenController.update
);
routeAsisten.delete(
  "/delete/:id",
  authMiddleware.authorizeRole("admin"),
  asistenController.deleteById
);
// ...



routeAsisten.get(
  "/get-all-submitted-tugas",
  authMiddleware.authorizeRole("admin", "asisten"),
  asistenController.getAllSubmittedTugas
);

// ...

routeAsisten.get(
  "/get-submitted-tugas/:id_tugas",
  authMiddleware.authorizeRole("admin", "asisten"),
  asistenController.getSubmittedTugasByTugasId
);

module.exports = routeAsisten;
