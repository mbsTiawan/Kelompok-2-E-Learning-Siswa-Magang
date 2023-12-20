const express = require("express");
const materiMentoringController = require("../controller/materiMentoringController");
const routeMateri = express.Router();

const authMiddleware = require('../middleware/authMiddleware')
routeMateri.use(authMiddleware.authenticateUser)

routeMateri.post("/create", authMiddleware.authorizeRole('admin'), materiMentoringController.create);
routeMateri.get("/get", authMiddleware.authorizeRole('admin'), materiMentoringController.getAll);
routeMateri.get("/get/:id", authMiddleware.authorizeRole('admin'), materiMentoringController.getById);
routeMateri.put("/update/:id", authMiddleware.authorizeRole('admin'), materiMentoringController.update);
routeMateri.delete("/delete/:id", authMiddleware.authorizeRole('admin'), materiMentoringController.delete);

module.exports = routeMateri; 
