const express = require("express");
const materiMentoringController = require("../controller/materiMentoringController");
const routeMateri = express.Router();

routeMateri.post("/create", materiMentoringController.create);
routeMateri.get("/get", materiMentoringController.getAll);
routeMateri.get("/get/:id", materiMentoringController.getById);
routeMateri.put("/update/:id", materiMentoringController.update);
routeMateri.delete("/delete/:id", materiMentoringController.delete);

module.exports = routeMateri;
