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
  "/:role",
  authMiddleware.authorizeRole("admin"),
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

module.exports = routeAsisten;
