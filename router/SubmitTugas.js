const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Import your submitTugas controller
const submitTugasController = require('../controller/submitTugasController');

// Import the authorization middleware
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware for all routes after '/submit-tugas'
router.use(authMiddleware.authenticateUser);

// Apply role-based authorization middleware for specific routes
router.post('/submit', upload.single('file'), authMiddleware.authorizeRole('siswa'), submitTugasController.submitTugas);
router.get('/get-tugas', authMiddleware.authorizeRole('siswa'), submitTugasController.getTugasBySiswa);
router.put('/update/:id', upload.single('file'), authMiddleware.authorizeRole('siswa'), submitTugasController.updateSubmitTugas);
router.delete('/delete/:id', authMiddleware.authorizeRole('siswa'), submitTugasController.deleteSubmitTugas);

module.exports = router;
