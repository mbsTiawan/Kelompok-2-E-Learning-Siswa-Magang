const express = require("express");
const modulController = require("../controller/modulController");
const routeModul = express.Router();

routeModul.post("/upload", modulController.upload);
routeModul.get("/download/:id", modulController.download);
routeModul.get("/get", modulController.getAll);
routeModul.get("/get/modulKategori", modulController.getByKategori);
routeModul.get("/get/modulAsisten", modulController.getByAst);
routeModul.get("/get/:id", modulController.getById);
routeModul.get("/get/modulKategori/:id", modulController.getByIdKategory)
routeModul.get("/get/modulAsisten/:id", modulController.getByIdAst)
routeModul.put("/update/:id", modulController.update)
routeModul.delete("/delete/:id", modulController.delete)

module.exports = routeModul;

