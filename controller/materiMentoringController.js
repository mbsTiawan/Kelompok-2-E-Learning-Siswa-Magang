const { Materi_Mentoring } = require("../models");

const materiMentoringController = {};

/*
    this is auto generate example, you can continue 

*/
materiMentoringController.index = async (req, res) => {
  res.json({
    message: "Hello materiMentoringController",
  });
};

materiMentoringController.create = async (req, res) => {
  try {
    const { nama_materi } = req.body;

    if (!nama_materi) {
      return res.status(404).json({
        message: "field tidak boleh kosong!",
      });
    }

    const findMateri = await Materi_Mentoring.findOne({
      where: {
        nama_materi: nama_materi,
      },
    });

    if (findMateri) {
      return res.status(400).json({
        message: `materi dengan nama ${nama_materi} sudah ada!`,
      });
    }

    const createMateri = await Materi_Mentoring.create({
      nama_materi,
    });

    return res.status(201).json({
      message: "Data baru berhasil ditambahkan !",
      data: createMateri,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

materiMentoringController.getAll = async (req, res) => {
  try {
    const getMateri = await Materi_Mentoring.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (getMateri.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    return res.status(200).json({
      data: getMateri,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

materiMentoringController.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const getMateri = await Materi_Mentoring.findOne({
      where: {
        id,
      },
    });

    if (!getMateri) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    return res.status(200).json({
      data: getMateri,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

materiMentoringController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_materi } = req.body;

    const getMateri = await Materi_Mentoring.findOne({
      where: {
        id,
      },
    });

    if (!getMateri) {
      return res.status(404).json({
        message: "Tidak ada data yang tersedia !",
      });
    }

    if (!nama_materi) {
      return res.status(400).json({
        message: "Field tidak boleh kosong !",
      });
    }

    const updateMateri = await Materi_Mentoring.update(
      {
        nama_materi,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      message: "data berhasil diperbarui!",
      data: getMateri,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
};

materiMentoringController.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMateri = await Materi_Mentoring.destroy({
      where: {
        id,
      },
    });

    if (!deleteMateri) {
      return res.status(404).json({
        message: "Data yang ingin anda hapus tidak tersedia !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

module.exports = materiMentoringController;
