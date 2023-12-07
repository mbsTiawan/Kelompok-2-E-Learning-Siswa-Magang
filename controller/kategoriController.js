const kategoriController = {}
const { Kategori } = require('../models')

kategoriController.create = async (req, res) => {

    try {
        const { nama_kategori } = req.body
        const regex = /^[A-Z\s]+$/;

        //validasi field tidak boleh kosong
        if (!nama_kategori) {
            return res.status(400).json({
                message: 'Field tidak boleh kosong !'
            })
        }

        //validasi field hanya boleh huruf kapital
        if (!regex.test(nama_kategori)) {
            return res.status(400).json({
                message: 'Simbol, angka dan huruf non-kapital tidak diperbolehkan !'
            })
        }

        const createData = await Kategori.create({
            nama_kategori
        })

        return res.status(201).json({
            message: 'Data baru berhasil ditambahkan !'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

kategoriController.getAll = async (req, res) => {
    try {
        const getData = await Kategori.findAll({
            order: [['createdAt', "DESC"]]
        })

        if (getData.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada data yang tersedia !'
            })
        }

        return res.status(200).json({
            data: getData
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

kategoriController.getById = async (req, res) => {
    try {
        const { id } = req.params

        const getData = await Kategori.findOne({
            where: {
                id: id
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang anda cari tidak ada'
            })
        }

        return res.status(200).json({
            message: getData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

kategoriController.update = async (req, res) => {
    const { id } = req.params
    const { nama_kategori } = req.body
    const regex = /^[A-Z\s]+$/;

    try {
        const getData = await Kategori.findOne({
            where: {
                id: id
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang ingin anda perbarui tidak tersedia !'
            })
        }

        if (!nama_kategori) {
            return res.status(400).json({
                message: 'Field tidak boleh kosong !'
            })
        }

        if (!regex.test(nama_kategori)) {
            return res.status(400).json({
                message: 'Simbol, angka dan huruf non-kapital tidak diperbolehkan !'
            })
        }

        const updateData = await Kategori.update({
            nama_kategori
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

kategoriController.delete = async (req, res) => {
    try {
        const { id } = req.params

        const deleteData = await Kategori.destroy({
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

module.exports = kategoriController

