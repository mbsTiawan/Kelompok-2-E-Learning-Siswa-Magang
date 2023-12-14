const logbookSiswaController = {}
const { Logbook_Siswa, Asisten } = require('../models')
const jwt = require('jsonwebtoken')

const getToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        return decoded.siswaId || null; // Mengembalikan ID siswa dari token atau null jika tidak ada
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

logbookSiswaController.create = async (req, res) => {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const idSiswa = getToken(token);

    try {
        const { id_asisten, materi, catatan } = req.body;

        const findAst = await Asisten.findOne({
            where: {
                id: id_asisten
            }
        })

        if (!findAst) {
            return res.status(404).json({
                message: "Data asisten tidak ditemukan !",
            });
        }

        if (
            !id_asisten ||
            !materi,
            !catatan
        ) {
            return res.status(400).json({
                message: "Field tidak boleh kosong!",
            });
        }

        const createSiswa = await Logbook_Siswa.create({
            id_asisten,
            id_siswa: idSiswa,
            tanggal: Date.now(),
            materi,
            catatan
        });

        return res.status(201).json({
            message: "Data berhasil ditambahkan !",
            data: createSiswa
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Terjadi kesalahan pada server.",
        });
    }
}

logbookSiswaController.getBySiswa = async (req, res) => {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const idSiswa = getToken(token);

    try {
        const getLogbook = await Logbook_Siswa.findAll({
            where: {
                id_siswa: idSiswa
            }
        })

        if (!getLogbook) {
            return res.status(404).json({
                message: 'Data tidak tersedia'
            })
        }

        return res.status(200).json({
            data: getLogbook
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Terjadi kesalahan pada server.",
        });
    }
}

logbookSiswaController.getByID = async (req, res) => {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const idSiswa = getToken(token);

    try {
        const logbookID = req.params.id; //
        const getLogbook = await Logbook_Siswa.findAll({
            where: {
                id_siswa: idSiswa
            }
        });

        if (!getLogbook) {
            return res.status(404).json({
                message: 'Data tidak tersedia'
            });
        }

        const logbookDataById = getLogbook.find(data => data.id == logbookID);

        if (!logbookDataById) {
            return res.status(404).json({
                message: 'Logbook dengan ID tersebut tidak ditemukan'
            });
        }

        return res.status(200).json({
            data: logbookDataById
        });
    } catch (error) {

        return res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
};

logbookSiswaController.update = async (req, res) => {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const idSiswa = getToken(token);

    try {
        const logbookID = req.params.id
        const { id_asisten, materi, catatan } = req.body

        const getLogbook = await Logbook_Siswa.findAll({
            where: {
                id_siswa: idSiswa
            }
        });

        if (!getLogbook) {
            return res.status(404).json({
                message: 'Data tidak tersedia'
            });
        }

        const logbookDataById = getLogbook.find(data => data.id == logbookID);

        if (!logbookDataById) {
            return res.status(404).json({
                message: 'Logbook dengan ID tersebut tidak ditemukan'
            });
        }

        const updateData = await Logbook_Siswa.update({
            id_asisten,
            id_siswa: idSiswa,
            tanggal: Date.now(),
            materi,
            catatan
        }, {
            where: {
                id: logbookID
            }
        })

        return res.status(201).json({
            message: 'Data berhasil diperbarui'
        })

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
}

logbookSiswaController.delete = async (req, res) => {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const idSiswa = getToken(token);

    try {
        const logbookID = req.params.id

        const getLogbook = await Logbook_Siswa.findAll({
            where: {
                id_siswa: idSiswa
            }
        });

        if (!getLogbook) {
            return res.status(404).json({
                message: 'Data tidak tersedia'
            });
        }

        const logbookDataById = getLogbook.find(data => data.id == logbookID);

        if (!logbookDataById) {
            return res.status(404).json({
                message: 'Logbook dengan ID tersebut tidak ditemukan'
            });
        }

        const deleteData = await Logbook_Siswa.destroy({
            where: {
                id: logbookID
            }
        })

        return res.status(200).json({
            message: 'Data berhasil dihapus'
        })

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server."
        });
    }
}


module.exports = logbookSiswaController

