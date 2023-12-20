const tugasController = {}
const { Tugas, Asisten, Siswa } = require('../models')
/*
    this is auto generate example, you can continue 

*/
tugasController.index = async (req, res) => {
    res.json({
        message: "Hello tugasController"
    })
}

tugasController.create = async (req, res) => {
    try {
        const { id_asisten, id_siswa, deskripsi, catatan, tenggat } = req.body

        const findAst = await Asisten.findOne({
            where: {
                id: id_asisten
            }
        })

        const findSiswa = await Siswa.findOne({
            where: {
                id: id_siswa
            }
        })

        if (!findAst) {
            return res.status(404).json({
                message: "Data asisten tidak ditemukan !",
            });
        }

        if (!findSiswa) {
            return res.status(404).json({
                message: "Data siswa tidak ditemukan !",
            });
        }

        if (
            !id_asisten || !id_siswa || !deskripsi || !catatan || !tenggat
        ) {
            return res.status(400).json({
                message: "Field tidak boleh kosong!",
            });
        }

        if (Array.isArray(id_siswa)) {
            const tasks = id_siswa.map(siswaId => ({
                id_asisten,
                id_siswa: siswaId,
                deskripsi,
                catatan,
                tenggat
            }));

            const createdTasks = await Tugas.bulkCreate(tasks);

            return res.status(201).json({
                message: "Tugas baru berhasil ditambahkan untuk beberapa siswa",
                createdTasks,
            });
        } else {
            const createTugas = await Tugas.create({
                id_asisten,
                id_siswa,
                deskripsi,
                catatan,
                tenggat,
            });

            return res.status(201).json({
                message: "Tugas baru berhasil ditambahkan",
                createdTask: createTugas,
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server.",
        })
    }
}

tugasController.getAll = async (req, res) => {
    try {
        const getTugas = await Tugas.findAll({
            order: [["createdAt", "DESC"]]
        })

        return res.status(200).json({
            data: getTugas
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

tugasController.getBySiswa = async (req, res) => {
    try {
        const getTugasBySiswa= await Siswa.findAll({
            include: [
                {
                    model: Tugas
                }
            ]
        })

        return res.status(200).json({
            data: getTugasBySiswa
        })
    } catch (error) {
        return res.status(500).json({
            data: error
        })
    }
}

tugasController.update = async (req, res) => {
    const { id } = req.params
    const { id_asisten, id_siswa, deskripsi, catatan, tenggat } = req.body
    
    try {
        const getData = await Tugas.findOne({
            where: {
                id: id
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang ingin anda perbarui tidak tersedia !'
            })
        }

        if (!id_asisten || !id_siswa || !deskripsi || !catatan || !tenggat) {
            return res.status(400).json({
                message: 'Field tidak boleh kosong !'
            })
        }

        const updateData = await Tugas.update({
            id_asisten, id_siswa, deskripsi, catatan, tenggat
        }, {
            where: {
                id: id
            }
        })

        return res.status(201).json({
            message: 'Data berhasil diperbarui !'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

tugasController.delete = async (req, res) => {
    try {
        const { id } = req.params

        const deleteData = await Tugas.destroy({
            where: {
                id: id
            }
        })

        if (!deleteData) {
            return res.status(404).json({
                message: 'Data yang ingin anda hapus tidak tersedia !'
            })
        }

        return res.status(200).json({
            message: 'Data berhasil dihapus !'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

module.exports = tugasController

