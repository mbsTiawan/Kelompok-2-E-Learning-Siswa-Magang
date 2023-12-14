const { Op } = require("sequelize");
const { Asisten, User, Role } = require("../models");

const asistenController = {};

asistenController.create = async (req, res) => {
  try {
    const {
      id_user,
      nim,
      nama,
      alamat,
      kelas,
      no_hp,
      tanggal_masuk,
      shift,
      image,
    } = req.body;

    const findUser = await User.findOne({
      where: {
        id: id_user,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        message: "Data user tidak ditemukan !",
      });
    }

    if (
      !id_user ||
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
    // validasi shift
    if (shift !== "pagi" && shift !== "siang") {
      return res.status(400).json({
        message: "Shift hanya boleh diisi dengan 'pagi' atau 'siang'!",
      });
    }

    const findAsisten = await Asisten.findOne({
      where: {
        nim: nim,
      },
    });

    if (findAsisten) {
      return res.status(409).json({
        message: `NIM ${nim} sudah digunakan!`,
      });
    }

    const createAsisten = await Asisten.create({
      id_user,
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
      data: createAsisten,
    });
  } catch (error) {
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
  try {
    const {
      id_user,
      nim,
      nama,
      alamat,
      kelas,
      no_hp,
      tanggal_masuk,
      shift,
      image,
    } = req.body;

    const { id } = req.params;

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
      !id_user ||
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
    // jika nim sudah digunakan
    const isNimTaken = await Asisten.findOne({
      where: {
        nim,
        id: {
          [Op.not]: id, // kecualikan nim yang sedang/akan diupdate
        },
      },
    });

    if (isNimTaken) {
      return res.status(400).json({
        message: "NIM sudah digunakan!",
      });
    }

    const updateAsisten = await Asisten.update(
      {
        id_user,
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

asistenController.getByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const roleData = await Role.findOne({
      where: { nama_role: role },
      include: {
        model: User,
        as: "users",
        include: {
          model: Asisten,
          as: "asisten",
        },
      },
    });

    if (!roleData) {
      return res.status(404).json({ message: "Role tidak ditemukan!" });
    }

    const asistenData = roleData.users.map((user) => user.asisten);

    return res.status(200).json(asistenData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = asistenController;
