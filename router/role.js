const express = require("express");
const roleController = require("../controller/roleController");
const routeRole = express.Router()

routeRole.post('/create', roleController.create)
routeRole.get('/get', roleController.getAll)
routeRole.get('/get/:id', roleController.getById)
routeRole.put('/update/:id', roleController.update)
routeRole.delete('/delete/:id', roleController.delete)

module.exports = routeRole
 