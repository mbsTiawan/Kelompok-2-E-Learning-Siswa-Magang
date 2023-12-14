const {
  Logbook_Pembelajaran,
  Materi_Mentoring,
  Asisten,
} = require("../models");

const logbookPembelajaranController = {};

logbookPembelajaranController.create = async (req, res) => {
  try {
    const { id_materi, id_asisten, deskripsi, catatan, tanggal } = req.body;

    if (!id_materi || !id_asisten || !deskripsi || !catatan || !tanggal) {
      return res.status(400).json({
        message: "Field tidak boleh kosong!",
      });
    }

    const findMateri = await Materi_Mentoring.findOne({
      where: {
        id: id_materi,
      },
    });

    const findAsisten = await Asisten.findOne({
      where: {
        id: id_asisten,
      },
    });

    if (!findMateri) {
      return res.status(404).json({
        message: `id_materi ${id_materi} tidak ditemukan!`,
      });
    }
    if (!findAsisten) {
      return res.status(404).json({
        message: `id_asisten ${id_asisten} tidak ditemukan!`,
      });
    }

    const createLogbook = await Logbook_Pembelajaran.create({
      id_materi,
      id_asisten,
      deskripsi,
      catatan,
      tanggal,
    });
    return res.status(201).json({
      message: "Data berhasil ditambahkan !",
      data: createLogbook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

module.exports = logbookPembelajaranController;
