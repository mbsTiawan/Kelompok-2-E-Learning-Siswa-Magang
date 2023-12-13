const express = require("express");
const logbookSiswaController = require("../controller/logbookSiswaController");
const routeLogbookSiswa = express.Router()

routeLogbookSiswa.post('/create', logbookSiswaController.create)
routeLogbookSiswa.get('/get', logbookSiswaController.getBySiswa)
routeLogbookSiswa.get('/get/:id', logbookSiswaController.getByID)
routeLogbookSiswa.put('/update/:id', logbookSiswaController.update)
routeLogbookSiswa.delete('/delete/:id', logbookSiswaController.delete)

module.exports = routeLogbookSiswa
 