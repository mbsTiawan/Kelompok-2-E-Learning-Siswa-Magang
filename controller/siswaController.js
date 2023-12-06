const siswaController = {}
const { Siswa, Asisten, User, Sekolah } = require('../models')

/*
    this is auto generate example, you can continue 

*/
siswaController.index = async (req, res) => {
    res.json({
        message: "Hello siswaController"
    })
}

siswaController.create = async (req, res) => {
    try {
        const { id_asisten, id_sekolah, id_user, nis, nama, alamat, jurusan, tanggal_masuk, tanggal_keluar, tahun_ajaran, no_hp, no_hp_ortu, shift, image } = req.body;

        const findAst = await Asisten.findOne({
            where: {
                id: id_asisten
            }
        })
        const findSekolah = await Sekolah.findOne({
            where: {
                id: id_sekolah
            }
        })
        const findUser = await User.findOne({
            where: {
                id: id_user
            }
        })

        if (!findAst) {
            return res.status(404).json({
                message: "Data asisten tidak ditemukan !",
            });
        }
        if (!findSekolah) {
            return res.status(404).json({
                message: "Data sekolah tidak ditemukan !",
            });
        }
        if (!findUser) {
            return res.status(404).json({
                message: "Data user tidak ditemukan !",
            });
        }

        if (
            !id_asisten ||
            !id_sekolah ||
            !id_user ||
            !nis ||
            !nama ||
            !alamat ||
            !jurusan ||
            !tanggal_masuk ||
            !tanggal_keluar ||
            !tahun_ajaran ||
            !no_hp ||
            !no_hp_ortu ||
            !shift ||
            !image
        ) {
            return res.status(400).json({
                message: "Field tidak boleh kosong!",
            });
        }

        const findSiswa = await Siswa.findOne({
            where: {
                nis: nis,
            },
        });

        if (findSiswa) {
            return res.status(409).json({
                message: `NIS ${nis} sudah digunakan!`,
            });
        }

        const createSiswa = await Siswa.create({
            id_asisten,
            id_sekolah,
            id_user,
            nis,
            nama,
            alamat,
            jurusan,
            tanggal_masuk,
            tanggal_keluar,
            tahun_ajaran,
            no_hp,
            no_hp_ortu,
            shift,
            image,
        });

        return res.status(201).json({
            message: "Data berhasil ditambahkan !",
            data: createSiswa
        });
    } catch (error) {

        return res.status(500).json({
            message: "Terjadi kesalahan pada server.",
        });
    }
};

siswaController.getAll = async (req, res) => {
    try {
        const getSiswa = await Siswa.findAll({
            order: [["createdAt", "DESC"]],
        });
        if (getSiswa.length === 0) {
            return res.status(404).json({
                message: "Data tidak ditemukan!",
            });
        }

        return res.status(200).json({
            data: getSiswa,
        });
    } catch (error) {

        return res.status(500).json({
            message: error,
        });
    }
};

siswaController.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const getSiswaById = await Siswa.findOne({
            where: {
                id,
            },
        });
        if (getSiswaById === null) {
            return res.status(404).json({
                message: "Data Tidak Ditemukan!",
            });
        }

        return res.status(200).json({
            data: getSiswaById,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

siswaController.update = async (req, res) => {
    try {

        const { id_asisten, id_sekolah, id_user, nis, nama, alamat, jurusan, tanggal_masuk, tanggal_keluar, tahun_ajaran, no_hp, no_hp_ortu, shift, image } = req.body;

        const { id } = req.params;

        const getSiswaById = await Siswa.findOne({
            where: {
                id,
            },
        });

        if (getSiswaById === null) {
            return res.status(404).json({
                message: "Data Tidak Ditemukan!",
            });
        }

        const findAst = await Asisten.findOne({
            where: {
                id: id_asisten
            }
        })
        const findSekolah = await Sekolah.findOne({
            where: {
                id: id_sekolah
            }
        })
        const findUser = await User.findOne({
            where: {
                id: id_user
            }
        })

        if (!findAst) {
            return res.status(404).json({
                message: "Data asisten tidak ditemukan !",
            });
        }
        if (!findSekolah) {
            return res.status(404).json({
                message: "Data sekolah tidak ditemukan !",
            });
        }
        if (!findUser) {
            return res.status(404).json({
                message: "Data user tidak ditemukan !",
            });
        }

        if (
            !id_asisten ||
            !id_sekolah ||
            !id_user ||
            !nis ||
            !nama ||
            !alamat ||
            !jurusan ||
            !tanggal_masuk ||
            !tanggal_keluar ||
            !tahun_ajaran ||
            !no_hp ||
            !no_hp_ortu ||
            !shift ||
            !image
        ) {
            return res.status(400).json({
                message: "Field tidak boleh kosong!",
            });
        }

        const updateSiswa = await Siswa.update(
            {
                id_asisten,
                id_sekolah,
                id_user,
                nis,
                nama,
                alamat,
                jurusan,
                tanggal_masuk,
                tanggal_keluar,
                tahun_ajaran,
                no_hp,
                no_hp_ortu,
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
            message: "Data Berhasil Diubah!"
        });
    } catch (error) {

        return res.status(500).json({
            message: error,
        });
    }
};

siswaController.deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const getSiswaById = await Siswa.findOne({
            where: {
                id: id,
            },
        });
        if (getSiswaById === null) {
            return res.status(404).json({
                message: "Data Tidak Ditemukan!",
            });
        }

        const deleteSiswa = await Siswa.destroy({
            where: {
                id: id,
            },
        });
        return res.status(200).json({
            data: "Data Berhasil Dihapus!",
        });
    } catch (error) {

        return res.status(500).json({
            message: error,
        });
    }
};



module.exports = siswaController

