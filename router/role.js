const express = require("express");
const roleController = require("../controller/roleController");
const routeRole = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
routeRole.use(authMiddleware.authenticateUser)

routeRole.post('/create', authMiddleware.authorizeRole('admin'), roleController.create)
routeRole.get('/get', authMiddleware.authorizeRole('admin'), roleController.getAll)
routeRole.get('/get/:id', authMiddleware.authorizeRole('admin'), roleController.getById)
routeRole.put('/update/:id', authMiddleware.authorizeRole('admin'), roleController.update)
routeRole.delete('/delete/:id', authMiddleware.authorizeRole('admin'), roleController.delete)

module.exports = routeRole
