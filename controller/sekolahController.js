const { Sekolah } = require('../models');

const sekolahController = {};

sekolahController.index = async (req, res) => {
  res.json({
    message: "Data sekolah"
  });
};

sekolahController.create = async (req, res) => {
  try {
    const { npsn, nama_sekolah, alamat } = req.body;
    const regex = /^[A-Za-z0-9\s]+$/;

    // Validasi field tidak boleh kosong
    if (!npsn || !nama_sekolah || !alamat) {
      return res.status(400).json({
        message: 'Field tidak boleh kosong!'
      });
    }

    // Validasi field hanya boleh huruf, angka, dan spasi
    if (!regex.test(npsn) || !regex.test(nama_sekolah) || !regex.test(alamat)) {
      return res.status(400).json({
        message: 'Simbol dan karakter khusus tidak diperbolehkan!'
      });
    }

    // Validasi apakah npsn sudah ada
    const existingNpsn = await Sekolah.findOne({
      where: {
        npsn: npsn
      }
    });

    if (existingNpsn) {
      return res.status(400).json({
        message: 'NPSN sudah terdaftar!'
      });
    }

    // Validasi apakah nama_sekolah sudah ada
    const existingNamaSekolah = await Sekolah.findOne({
      where: {
        nama_sekolah: nama_sekolah
      }
    });

    if (existingNamaSekolah) {
      return res.status(400).json({
        message: 'Nama Sekolah sudah terdaftar!'
      });
    }

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
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
};


sekolahController.getAll = async (req, res) => {
  try {
    const sekolahs = await Sekolah.findAll();

    if (sekolahs.length === 0) {
      return res.status(404).json({
        message: 'Tidak ada data yang tersedia!'
      });
    }

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
  try {
    const { id } = req.params;

    const sekolah = await Sekolah.findOne({
      where: {
        id: id
      }
    });

    if (!sekolah) {
      return res.status(404).json({
        message: 'Data yang Anda cari tidak ada'
      });
    }

    return res.status(200).json({
      data: sekolah
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
};

sekolahController.update = async (req, res) => {
   const { id } = req.params;
   const { npsn, nama_sekolah, alamat } = req.body;
   const regex = /^[A-Za-z0-9\s]+$/;
  
   try {
    const sekolah = await Sekolah.findOne({
     where: {
      id: id
     }
    });
  
    if (!sekolah) {
     return res.status(404).json({
      message: 'Sekolah tidak ditemukan!'
     });
    }
  
    // Validasi field tidak boleh kosong
    if (!npsn || !nama_sekolah || !alamat) {
     return res.status(400).json({
      message: 'Field tidak boleh kosong!'
     });
    }
  
    // Validasi field hanya boleh huruf, angka, dan spasi
    if (!regex.test(npsn) || !regex.test(nama_sekolah) || !regex.test(alamat)) {
     return res.status(400).json({
      message: 'Simbol dan karakter khusus tidak diperbolehkan!'
     });
    }
  
    // Validasi apakah npsn sudah ada
    const existingNpsn = await Sekolah.findOne({
     where: {
      npsn: npsn
     }
    });
  
    if (existingNpsn && existingNpsn.id !== id) {
     return res.status(400).json({
      message: 'NPSN sudah terdaftar!'
     });
    }
  
    // Validasi apakah nama_sekolah sudah ada
    const existingNamaSekolah = await Sekolah.findOne({
     where: {
      nama_sekolah: nama_sekolah
     }
    });
  
    if (existingNamaSekolah && existingNamaSekolah.id !== id) {
     return res.status(400).json({
      message: 'Nama Sekolah sudah terdaftar!'
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

    if (!deletedSekolah) {
      return res.status(404).json({
        message: 'Sekolah tidak ditemukan!'
      });
    }

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
