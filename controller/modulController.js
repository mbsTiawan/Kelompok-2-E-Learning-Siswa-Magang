const modulController = {}
const multer = require('multer')
const path = require('path')
const { Modul, Asisten, Kategori } = require('../models')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/Server Abal-Abal/Module Tutor/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


modulController.upload = async (req, res) => {

    //Fungsi delete file yang sudah terupload
    const deleteFile = () => {

        fs.unlink(req.file.path, (error) => {
            if (error) {
                console.error('Gagal menghapus file:', error);
            }
            console.log('File dihapus setelah validasi gagal.');
        });
    }

    try {
        upload.single('modulFile')(req, res, async (err) => {
            const regex = /^[A-Z\s]+$/;
            const { id_kategori, id_asisten, judul } = req.body

            const getKategori = await Kategori.findOne({
                where: {
                    id: id_kategori
                }
            })

            const getAst = await Asisten.findOne({
                where: {
                    id: id_asisten
                }

            })

            if (!getKategori) {
                deleteFile()
                return res.status(404).json({
                    message: 'Kategori yang anda input tidak ditemukan !'
                })
            }

            if (!getAst) {
                deleteFile()
                return res.status(404).json({
                    message: 'Asisten yang anda input tidak ditemukan !'
                })
            }

            if (!regex.test(judul)) {
                deleteFile()
                return res.status(400).json({
                    message: 'Simbol, angka dan huruf non-kapital tidak diperbolehkan !'
                })
            }

            const filePart = req.file.originalname.split('.') //Membagi originalName file menjadi array berdasarkan titik
            const extension = filePart[filePart.length - 1] //Mengambil data array dari index 1
            const fileName = filePart.slice(0, -1).join('.') //Mengambil semua data dalam array kecuali data index terakhir

            const createData = await Modul.create({
                id_kategori: getKategori.id,
                id_asisten: getAst.id,
                judul,
                nama_file: fileName,
                path: path.join('D:/Server Abal-Abal/Module Tutor/', req.file.filename),
                size: req.file.size,
                tipe_file: extension,
                tanggal_upload: Date.now()
            })

            return res.status(201).json({
                message: 'Module berhasil diupload !'
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }

}

modulController.download = async (req, res) => {
    try {
        const { id } = req.params
        const getModul = await Modul.findOne({
            where: {
                id: id
            }
        })

        if (!getModul) {
            return res.status(404).json({
                message: 'Modul tidak ditemukan'
            })
        }

        res.download(getModul.path)
    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}

modulController.getAll = async (req, res) => {
    try {
        const getModul = await Modul.findAll({
            order: [["createdAt", "DESC"]]
        })

        return res.status(200).json({
            data: getModul
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

modulController.getByKategori = async (req, res) => {
    try {
        const getModulByCategory = await Kategori.findAll({
            include: [
                {
                    model: Modul
                }
            ]
        })

        return res.status(200).json({
            data: getModulByCategory
        })
    } catch (error) {
        return res.status(500).json({
            data: error
        })
    }
}

modulController.getByAst = async (req, res) => {
    try {
        const getModulByAst = await Asisten.findAll({
            include: [
                {
                    model: Modul
                }
            ]
        })

        return res.status(200).json({
            data: getModulByAst
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

modulController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const getModulById = await Modul.findOne({
            where: {
                id: id
            }
        })

        if (!getModulById) {
            return res.status(404).json({
                message: 'Data yang anda cari tidak ada'
            })
        }

        return res.status(200).json({
            data: getModulById
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

modulController.getByIdKategory = async (req, res) => {
    try {
        const { id } = req.params
        const getModulByIdKategori = await Kategori.findOne({
            include: [
                {
                    model: Modul
                }
            ], where: {
                id: id
            }
        })

        if (!getModulByIdKategori) {
            return res.status(404).json({
                message: 'Data yang anda cari tidak ada'
            })
        }

        return res.status(200).json({
            data: getModulByIdKategori
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

modulController.getByIdAst = async (req, res) => {
    try {
        const { id } = req.params
        const getModulByIdAst = await Asisten.findOne({
            include: [
                {
                    model: Modul
                }
            ], where: {
                id: id
            }
        })

        if (!getModulByIdAst) {
            return res.status(404).json({
                message: 'Data yang anda cari tidak ada'
            })
        }

        return res.status(200).json({
            data: getModulByIdAst
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

modulController.update = async (req, res) => {
    try {
        upload.single('modulFile')(req, res, async (err) => {
            const deleteFile = () => {

                fs.unlink(req.file.path, (error) => {
                    if (error) {
                        console.error('Gagal menghapus file:', error);
                    }
                    console.log('File dihapus setelah validasi gagal.');
                });
            }


            const { id } = req.params; // Mengambil ID dari parameter URL

            const { id_kategori, id_asisten, judul } = req.body;

            const getKategori = await Kategori.findOne({
                where: {
                    id: id_kategori
                }
            });

            const getAst = await Asisten.findOne({
                where: {
                    id: id_asisten
                }
            });

            if (!getKategori) {
                deleteFile()
                return res.status(404).json({
                    message: 'Kategori yang anda input tidak ditemukan !'
                });
            }

            if (!getAst) {
                deleteFile()
                return res.status(404).json({
                    message: 'Asisten yang anda input tidak ditemukan !'
                });
            }

            const regex = /^[A-Z\s]+$/;
            if (!regex.test(judul)) {
                deleteFile()
                return res.status(400).json({
                    message: 'Simbol, angka dan huruf non-kapital tidak diperbolehkan !'
                });
            }

            // Lakukan update data Modul berdasarkan ID
            const modulToUpdate = await Modul.findByPk(id);
            if (!modulToUpdate) {
                return res.status(404).json({
                    message: 'Modul tidak ditemukan !'
                });
            }

            if (req.file) {

                fs.unlink(modulToUpdate.path, (error) => {
                    if (error) {
                        console.error('Gagal menghapus file lama:', error);
                    }
                    console.log('File lama dihapus.');
                });

                const filePart = req.file.originalname.split('.');
                const extension = filePart[filePart.length - 1];
                const fileName = filePart.slice(0, -1).join('.');

                modulToUpdate.judul = judul;
                modulToUpdate.nama_file = fileName;
                modulToUpdate.path = path.join('D:/Server Abal-Abal/Module Tutor/', req.file.filename);
                modulToUpdate.size = req.file.size;
                modulToUpdate.tipe_file = extension;
            }

            await modulToUpdate.save();

            return res.status(200).json({
                message: 'Module berhasil diupdate !'
            });
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || 'Terjadi kesalahan saat melakukan update'
        });
    }
}

modulController.delete = async (req, res) => {
    const deleteFile = (path) => {
        fs.unlink(path, (error) => {
            if (error) {
                console.error('Gagal menghapus file:', error);
            }
            console.log('File dihapus setelah validasi gagal.');
        });
    }

    try {
        upload.single('modulFile')(req, res, async (err) => {
            const { id } = req.params
            const deleteModul = await Modul.findOne({ where: { id } })

            if (!deleteModul) {
                return res.status(404).json({
                    message: 'Data yang anda cari tidak ditemukan !'
                })
            }

            deleteFile(deleteModul.path)
            await deleteModul.destroy()
            return res.status(200).json({
                message: 'Data berhasil terhapus !'
            })
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}


module.exports = modulController

