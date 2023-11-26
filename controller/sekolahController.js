const { Sekolah } = require('../models');

const sekolahController = {};

sekolahController.index = async (req, res) => {
  res.json({
    message: "Data sekolah"
  });
};

sekolahController.create = async (req, res) => {
  const { npsn, nama_sekolah, alamat } = req.body;

  try {
    const createdSekolah = await Sekolah.create({
      npsn,
      nama_sekolah,
      alamat
    });

    return res.status(201).json({
      message: 'Sekolah created successfully!',
      data: createdSekolah
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

sekolahController.getAll = async (req, res) => {
  try {
    const sekolahs = await Sekolah.findAll();

    return res.status(200).json({
      data: sekolahs
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

sekolahController.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const sekolah = await Sekolah.findOne({
      where: {
        id: id
      }
    });

    return res.status(200).json({
      data: sekolah
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

sekolahController.update = async (req, res) => {
  const { npsn, nama_sekolah, alamat } = req.body;
  const { id } = req.params;

  try {
    const sekolah = await Sekolah.findOne({
      where: {
        id: id
      }
    });

    if (!sekolah) {
      return res.status(404).json({
        message: 'Sekolah not found!'
      });
    }

    await sekolah.update({
      npsn,
      nama_sekolah,
      alamat
    });

    return res.status(200).json({
      message: 'Sekolah updated successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

sekolahController.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSekolah = await Sekolah.destroy({
      where: {
        id: id
      }
    });

    return res.status(200).json({
      message: 'Sekolah deleted successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = sekolahController;
