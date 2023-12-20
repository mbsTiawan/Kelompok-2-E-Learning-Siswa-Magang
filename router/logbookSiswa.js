const express = require("express");
const logbookSiswaController = require("../controller/logbookSiswaController");
const routeLogbookSiswa = express.Router()

const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware for all routes after '/kategori'
routeLogbookSiswa.use(authMiddleware.authenticateUser);

routeLogbookSiswa.post('/create', authMiddleware.authorizeRole('siswa'), logbookSiswaController.create)
routeLogbookSiswa.get('/get', authMiddleware.authorizeRole('siswa'), logbookSiswaController.getBySiswa)
routeLogbookSiswa.get('/get/:id', authMiddleware.authorizeRole('siswa'), logbookSiswaController.getByID)
routeLogbookSiswa.put('/update/:id', authMiddleware.authorizeRole('siswa'), logbookSiswaController.update)
routeLogbookSiswa.delete('/delete/:id', authMiddleware.authorizeRole('siswa'), logbookSiswaController.delete)

module.exports = routeLogbookSiswa
