const { Absensi, Siswa } = require("../models");
const jwt = require("jsonwebtoken");

const absensiController = {};

const getToken = (token) => {
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    return decoded.siswaId || null; // Mengembalikan ID siswa dari token atau null jika tidak ada
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isAlreadyAbsenToday = async (idSiswa) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingAbsensi = await Absensi.findOne({
      id_siswa: idSiswa,
      waktu_absen: { $gte: todayStart, $lt: todayEnd },
    });

    return !!existingAbsensi; // Mengembalikan true jika sudah absen hari ini, false jika belum
  } catch (error) {
    console.error("Error checking existing absensi:", error);
    return false;
  }
};

absensiController.create = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  const idSiswa = getToken(token);

  try {
    if (!idSiswa) {
      console.error(
        "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan."
      );
      return res.status(401).json({
        message:
          "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan.",
      });
    }

    const hasAlreadyAbsenToday = await isAlreadyAbsenToday(idSiswa);

    if (hasAlreadyAbsenToday) {
      return res.status(400).json({
        message: "Anda sudah melakukan absensi hari ini.",
      });
    }

    const createAbsensi = await Absensi.create({
      id_siswa: idSiswa,
      waktu_absen: Date.now(),
    });

    return res.status(201).json({
      message: "Data berhasil ditambahkan!",
      data: createAbsensi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

absensiController.getBySiswa = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  const idSiswa = getToken(token);
  try {
    const getAbsensi = await Absensi.findAll({
      where: {
        id_siswa: idSiswa,
      },
    });
    if (!getAbsensi) {
      return res.status(404).json({
        message: "Data tidak tersedia",
      });
    }
    return res.status(200).json({
      data: getAbsensi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

absensiController.getByIdSiswa = async (req, res) => {
  try {
    const { id_siswa } = req.params;
    const getAbsensi = await Absensi.findOne({
      where: {
        id_siswa,
      },
    });
    if (!getAbsensi) {
      return res.status(404).json({
        message: "Data tidak tersedia",
      });
    }

    const getSiswaAbsensi = await Siswa.findAll({
      where: {
        id: id_siswa,
      },
      include: [
        {
          model: Absensi,
        },
      ],
    });
    if (!getSiswaAbsensi) {
      return res.status(404).json({
        message: "Tidak ada data siswa!",
      });
    }
    return res.status(200).json({
      data: getSiswaAbsensi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

absensiController.update = async (req, res) => {
  //   const authorizationHeader = req.header("Authorization");
  //   const token = authorizationHeader.replace("Bearer ", "");
  //   const idSiswa = getToken(token);
  try {
    const { id } = req.params;
    const { id_siswa, waktu_absen } = req.body;
    const getAbsensi = await Absensi.findAll({
      where: {
        id_siswa,
      },
    });
    if (!getAbsensi) {
      return res.status(404).json({
        message: "Data tidak tersedia",
      });
    }

    // const dataAbsensi = getAbsensi.find((data) => data.id === id);
    // if (!dataAbsensi) {
    //     return res.status(404).json({
    //         message: `Data Absensi dengan ID ${id} tidak ditemukan`
    //     });
    // }

    const updateAbsensi = await Absensi.update(
      {
        id_siswa,
        waktu_absen,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(201).json({
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

absensiController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const getAbsensi = await Absensi.findOne({
      where: {
        id,
      },
    });
    if (!getAbsensi) {
      return res.status(404).json({
        message: "Data tidak tersedia",
      });
    }

    const deleteAbsensi = await Absensi.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

module.exports = absensiController;
