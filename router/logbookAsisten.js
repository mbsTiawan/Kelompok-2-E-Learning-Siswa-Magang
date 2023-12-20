const express = require("express");
const logbookPembelajaranController = require("../controller/logbookPembelajaranController");
const routeLogbookPembelajaran = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware for all routes after '/kategori'
routeLogbookPembelajaran.use(authMiddleware.authenticateUser);

routeLogbookPembelajaran.post("/create", authMiddleware.authorizeRole('asisten'), logbookPembelajaranController.create);
routeLogbookPembelajaran.get("/get/:id", authMiddleware.authorizeRole('asisten'), logbookPembelajaranController.getById);
routeLogbookPembelajaran.put(
  "/update/:id",
  authMiddleware.authorizeRole('asisten'), logbookPembelajaranController.update
);
routeLogbookPembelajaran.get(
  "/get", authMiddleware.authorizeRole('asisten'),
  logbookPembelajaranController.getByAsisten
);
routeLogbookPembelajaran.delete(
  "/delete/:id", authMiddleware.authorizeRole('asisten'),
  logbookPembelajaranController.delete
);

module.exports = routeLogbookPembelajaran;
