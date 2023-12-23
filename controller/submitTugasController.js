const submitTugasController = {};
const { Submit_Tugas, Tugas, Siswa } = require('../models');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs'); // Import module 'fs' untuk menghapus file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/tugas/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const getToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded.siswaId || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

submitTugasController.submitTugas = async (req, res) => {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');
  const idSiswa = getToken(token);

  try {
    const { id_tugas, catatan } = req.body;
    const name_file = req.file.filename;

    const findTugas = await Tugas.findOne({
      where: {
        id: id_tugas,
        id_siswa: idSiswa,
      },
    });

    if (!findTugas) {
      // Hapus file yang sudah diupload jika tugas tidak ditemukan
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        message: 'Tugas tidak ditemukan untuk siswa ini!',
      });
    }

    // Check if the submission is before the deadline
    const currentTime = new Date();
    const deadline = new Date(findTugas.tenggat);

    // Extract hour, minute, and second components from the deadline
    const deadlineHour = deadline.getHours();
    const deadlineMinute = deadline.getMinutes();
    const deadlineSecond = deadline.getSeconds();

    // Set the submission time to the same date as the deadline
    currentTime.setHours(deadlineHour, deadlineMinute, deadlineSecond);

    if (currentTime > deadline) {
      // Hapus file yang sudah diupload jika melewati tenggat waktu
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: 'Tugas tidak dapat di-submit setelah tenggat waktu!',
      });
    }

    const submitTugas = await Submit_Tugas.create({
      id_tugas,
      id_siswa: idSiswa,
      name_file,
      waktu_submit: Date.now(),
      catatan,
    });

    return res.status(201).json({
      message: 'Tugas berhasil di-submit!',
      data: submitTugas,
    });
  } catch (error) {
    // Hapus file yang sudah diupload jika terjadi kesalahan
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

// ... (kode lainnya)


submitTugasController.getTugasBySiswa = async (req, res) => {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');
  const idSiswa = getToken(token);

  try {
    const getTugas = await Submit_Tugas.findAll({
      include: [
        {
          model: Tugas,
          where: {
            id_siswa: idSiswa,
          },
        },
      ],
    });

    return res.status(200).json({
      data: getTugas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

submitTugasController.updateSubmitTugas = async (req, res) => {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');
  const idSiswa = getToken(token);

  try {
    const submitTugasID = req.params.id;
    const { id_tugas, catatan } = req.body;

    const getSubmitTugas = await Submit_Tugas.findOne({
      where: {
        id: submitTugasID,
        id_siswa: idSiswa,
      },
    });

    if (!getSubmitTugas) {
      return res.status(404).json({
        message: 'Data tidak tersedia',
      });
    }

    const findTugas = await Tugas.findOne({
      where: {
        id: id_tugas,
        id_siswa: idSiswa,
      },
    });

    if (!findTugas) {
      return res.status(404).json({
        message: 'Tugas tidak ditemukan untuk siswa ini!',
      });
    }

    // Pastikan tenggat sudah terdefinisi sebelum mengakses propertinya
    if (!findTugas.tenggat) {
      return res.status(500).json({
        message: 'Tenggat waktu tugas tidak terdefinisi!',
      });
    }

    const currentTime = new Date();
    const deadline = new Date(findTugas.tenggat);

    // Extract hour, minute, and second components from the deadline
    const deadlineHour = deadline.getHours();
    const deadlineMinute = deadline.getMinutes();
    const deadlineSecond = deadline.getSeconds();

    // Set the submission time to the same date as the deadline
    currentTime.setHours(deadlineHour, deadlineMinute, deadlineSecond);

    // Jika waktu sekarang kurang dari tenggat waktu, izinkan update file
    if (currentTime <= deadline) {
      const updateData = await Submit_Tugas.update(
        {
          id_tugas,
          id_siswa: idSiswa,
          name_file: req.file.filename,
          waktu_submit: Date.now(),
          catatan,
        },
        {
          where: {
            id: submitTugasID,
          },
        }
      );

      return res.status(201).json({
        message: 'Data berhasil diperbarui',
      });
    } else {
      // Hapus file yang sudah diupload jika melewati tenggat waktu
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        message: 'Tugas tidak dapat di-submit setelah tenggat waktu!',
      });
    }
  } catch (error) {
    // Hapus file yang sudah diupload jika terjadi kesalahan
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};



submitTugasController.deleteSubmitTugas = async (req, res) => {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader.replace('Bearer ', '');
  const idSiswa = getToken(token);

  try {
    const submitTugasID = req.params.id;

    const getSubmitTugas = await Submit_Tugas.findOne({
      where: {
        id: submitTugasID,
        id_siswa: idSiswa,
      },
    });

    if (!getSubmitTugas) {
      return res.status(404).json({
        message: 'Data tidak tersedia',
      });
    }

    const deleteData = await Submit_Tugas.destroy({
      where: {
        id: submitTugasID,
      },
    });

    return res.status(200).json({
      message: 'Data berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

module.exports = submitTugasController;
