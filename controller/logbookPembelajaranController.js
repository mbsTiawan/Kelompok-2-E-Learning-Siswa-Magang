const {
  Logbook_Pembelajaran,
  Materi_Mentoring,
  Asisten,
} = require("../models");
const jwt = require("jsonwebtoken");

const logbookPembelajaranController = {};

const getToken = (token) => {
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    return decoded.asistenId || null; // Mengembalikan ID asisten dari token atau null jika tidak ada
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

logbookPembelajaranController.create = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  console.log("token", token);
  const idAsisten = getToken(token);
  try {
    const { id_materi, deskripsi, catatan } = req.body;

    if (!id_materi || !deskripsi || !catatan) {
      return res.status(400).json({
        message: "Field tidak boleh kosong!",
      });
    }
    if (!idAsisten) {
      console.error(
        "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan."
      );
      return res.status(401).json({
        message:
          "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan.",
      });
    }

    const createLogbook = await Logbook_Pembelajaran.create({
      id_materi,
      id_asisten: idAsisten,
      deskripsi,
      catatan,
      tanggal: Date.now(),
    });
    return res.status(201).json({
      message: "Data berhasil ditambahkan !",
      data: createLogbook,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

logbookPembelajaranController.getByAsisten = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  const idAsisten = getToken(token);

  try {
    if (!idAsisten) {
      console.error(
        "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan."
      );
      return res.status(401).json({
        message:
          "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan.",
      });
    }

    const getLogbook = await Logbook_Pembelajaran.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        id_asisten: idAsisten,
      },
    });
    if (getLogbook.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    return res.status(200).json({
      data: getLogbook,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

logbookPembelajaranController.getById = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  const idAsisten = getToken(token);

  try {
    if (!idAsisten) {
      console.error(
        "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan."
      );
      return res.status(401).json({
        message:
          "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan.",
      });
    }
    const { id } = req.params;

    const getLogbook = await Logbook_Pembelajaran.findAll({
      where: {
        id_asisten: idAsisten,
      },
    });
    if (getLogbook.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    const getLogbookById = getLogbook.find((data) => data.id == id);

    if (!getLogbookById) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    return res.status(200).json({
      data: getLogbookById,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

logbookPembelajaranController.update = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  const idAsisten = getToken(token);

  try {
    if (!idAsisten) {
      console.error(
        "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan."
      );
      return res.status(401).json({
        message:
          "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan.",
      });
    }
    const { id } = req.params;
    const { id_materi, deskripsi, catatan } = req.body;

    const getLogbook = await Logbook_Pembelajaran.findAll({
      where: {
        id_asisten: idAsisten,
      },
    });
    if (getLogbook.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    const getLogbookById = getLogbook.find((data) => data.id == id);

    if (!getLogbookById) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    const updateLogbook = await Logbook_Pembelajaran.update(
      {
        id_materi,
        id_asisten: idAsisten,
        deskripsi,
        catatan,
        tanggal: Date.now(),
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
    return res.status(500).json({
      message: error,
    });
  }
};

logbookPembelajaranController.delete = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.replace("Bearer ", "");
  const idAsisten = getToken(token);

  try {
    if (!idAsisten) {
      console.error(
        "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan."
      );
      return res.status(401).json({
        message:
          "Token tidak valid atau tidak memiliki informasi asisten yang diperlukan.",
      });
    }
    const { id } = req.params;

    const getLogbook = await Logbook_Pembelajaran.findAll({
      where: {
        id_asisten: idAsisten,
      },
    });
    if (getLogbook.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    const getLogbookById = getLogbook.find((data) => data.id == id);

    if (!getLogbookById) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    const deleteLogbook = await Logbook_Pembelajaran.destroy({
      where: {
        id,
      },
    });

    return res.status(201).json({
      message: "Data berhasil dihapus!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

module.exports = logbookPembelajaranController;
