const express = require("express");
const logbookPembelajaranController = require("../controller/logbookPembelajaranController");
const routeLogbookPembelajaran = express.Router();

routeLogbookPembelajaran.post("/create", logbookPembelajaranController.create);
routeLogbookPembelajaran.get("/get/:id", logbookPembelajaranController.getById);
routeLogbookPembelajaran.put(
  "/update/:id",
  logbookPembelajaranController.update
);
routeLogbookPembelajaran.get(
  "/get",
  logbookPembelajaranController.getByAsisten
);
routeLogbookPembelajaran.delete(
  "/delete/:id",
  logbookPembelajaranController.delete
);

module.exports = routeLogbookPembelajaran;
