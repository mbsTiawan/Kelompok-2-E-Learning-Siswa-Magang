const { Asisten } = require("../models");

const asistenController = {};

asistenController.create = async (req, res) => {
  const { nim, nama, alamat, kelas, no_hp, tanggal_masuk, shift, image } =
    req.body;
  try {
    if (
      !nim ||
      !nama ||
      !alamat ||
      !kelas ||
      !no_hp ||
      !tanggal_masuk ||
      !shift ||
      !image
    ) {
      return res.status(400).json({
        message: "Field tidak boleh kosong!",
      });
    }

    const findAsisten = await Asisten.findOne({
      where: {
        nim: nim,
      },
    });
    console.log(findAsisten);
    if (findAsisten) {
      return res.status(409).json({
        message: `NIM ${nim} sudah digunakan!`,
      });
    }

    const createAsisten = await Asisten.create({
      nim,
      nama,
      alamat,
      kelas,
      no_hp,
      tanggal_masuk,
      shift,
      image,
    });

    return res.status(201).json({
      message: "Data berhasil ditambahkan !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

asistenController.getAll = async (req, res) => {
  try {
    const getAsisten = await Asisten.findAll({
      order: [["createdAt", "DESC"]],
    });
    if (getAsisten.length === 0) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }

    return res.status(200).json({
      Data: getAsisten,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};

asistenController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const getAsistenById = await Asisten.findOne({
      where: {
        id,
      },
    });
    if (getAsistenById === null) {
      return res.status(404).json({
        message: "Data Tidak Ditemukan!",
      });
    }

    return res.status(200).json({
      data: getAsistenById,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

asistenController.update = async (req, res) => {
  const { nim, nama, alamat, kelas, no_hp, tanggal_masuk, shift, image } =
    req.body;
  const { id } = req.params;
  try {
    const getAsistenById = await Asisten.findOne({
      where: {
        id,
      },
    });
    if (getAsistenById === null) {
      return res.status(404).json({
        message: "Data Tidak Ditemukan!",
      });
    }

    if (
      !nim ||
      !nama ||
      !alamat ||
      !kelas ||
      !no_hp ||
      !tanggal_masuk ||
      !shift ||
      !image
    ) {
      return res.status(400).json({
        message: "Field tidak boleh kosong!",
      });
    }

    const updateAsisten = await Asisten.update(
      {
        nim,
        nama,
        alamat,
        kelas,
        no_hp,
        tanggal_masuk,
        shift,
        image,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(201).json({
      message: "Data Berhasil Diubah!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};

asistenController.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const getAsistenById = await Asisten.findOne({
      where: {
        id: id,
      },
    });
    if (getAsistenById === null) {
      return res.status(404).json({
        message: "Data Tidak Ditemukan!",
      });
    }

    const deleteAsistenById = await Asisten.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      data: "Data Berhasil Dihapus!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};

module.exports = asistenController;
