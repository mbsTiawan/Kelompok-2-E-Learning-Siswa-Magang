const { Notifikasi, User, Role } = require('../models');

const notifikasiController = {};

notifikasiController.create = async (req, res) => {
  try {
    const { penulis, pengumuman } = req.body;

    if (!penulis || !pengumuman) {
      return res.status(400).json({
        message: 'Field tidak boleh kosong!',
      });
    }

    // Dapatkan role user dari token
    const role = req.user.role;

    // Validasi role, hanya admin atau asisten yang dapat membuat notifikasi
    if (role !== 'admin' && role !== 'asisten') {
      return res.status(403).json({
        message: 'Hanya admin atau asisten yang dapat membuat notifikasi!',
      });
    }

    const createNotifikasi = await Notifikasi.create({
      penulis,
      pengumuman,
    });

    return res.status(201).json({
      message: 'Notifikasi berhasil ditambahkan!',
      data: createNotifikasi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

notifikasiController.getAll = async (req, res) => {
  try {
    const getNotifikasi = await Notifikasi.findAll({
      order: [['createdAt', 'DESC']],
    });

    if (getNotifikasi.length === 0) {
      return res.status(404).json({
        message: 'Data notifikasi tidak ditemukan!',
      });
    }

    return res.status(200).json({
      data: getNotifikasi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

notifikasiController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const getNotifikasiById = await Notifikasi.findOne({
      where: {
        id,
      },
    });

    if (getNotifikasiById === null) {
      return res.status(404).json({
        message: 'Data notifikasi tidak ditemukan!',
      });
    }

    return res.status(200).json({
      data: getNotifikasiById,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

notifikasiController.update = async (req, res) => {
  try {
    const { penulis, pengumuman } = req.body;
    const { id } = req.params;

    const getNotifikasiById = await Notifikasi.findOne({
      where: {
        id,
      },
    });

    if (getNotifikasiById === null) {
      return res.status(404).json({
        message: 'Data notifikasi tidak ditemukan!',
      });
    }

    // Dapatkan role user dari token
    const role = req.user.role;

    // Validasi role, hanya admin atau asisten yang dapat mengedit notifikasi
    if (role !== 'admin' && role !== 'asisten') {
      return res.status(403).json({
        message: 'Hanya admin atau asisten yang dapat mengedit notifikasi!',
      });
    }

    const updateNotifikasi = await Notifikasi.update(
      {
        penulis,
        pengumuman,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(201).json({
      message: 'Data notifikasi berhasil diubah!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

notifikasiController.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const getNotifikasiById = await Notifikasi.findOne({
      where: {
        id,
      },
    });

    if (getNotifikasiById === null) {
      return res.status(404).json({
        message: 'Data notifikasi tidak ditemukan!',
      });
    }

    // Dapatkan role user dari token
    const role = req.user.role;

    // Validasi role, hanya admin atau asisten yang dapat menghapus notifikasi
    if (role !== 'admin' && role !== 'asisten') {
      return res.status(403).json({
        message: 'Hanya admin atau asisten yang dapat menghapus notifikasi!',
      });
    }

    const deleteNotifikasiById = await Notifikasi.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Data notifikasi berhasil dihapus!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    });
  }
};

module.exports = notifikasiController;
