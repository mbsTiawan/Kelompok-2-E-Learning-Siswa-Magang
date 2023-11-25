const express = require("express");
const asistenController = require("../controller/asistenController");
const routeAsisten = express.Router();

routeAsisten.post("/create", asistenController.create);
routeAsisten.get("/get", asistenController.getAll);
routeAsisten.get("/get/:id", asistenController.getById);
routeAsisten.put("/update/:id", asistenController.update);
routeAsisten.delete("/delete/:id", asistenController.deleteById);

module.exports = routeAsisten;
