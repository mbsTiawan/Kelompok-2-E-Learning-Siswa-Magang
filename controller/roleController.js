const roleController = {}
const { Role } = require('../models')
/*
    this is auto generate example, you can continue 

*/
roleController.index = async (req, res) => {
    res.json({
        message: "Hello roleController"
    })
}

roleController.create = async (req, res) => {
    try {
        const { nama_role } = req.body
        //validasi field tidak boleh kosong
        if (!nama_role) {
            return res.status(400).json({
                message: 'Field tidak boleh kosong !'
            })
        }

        const existingNameRole = await Role.findOne({
            where: {
                nama_role: nama_role
            }
        });

        if (existingNameRole) {
            return res.status(400).json({
                message: 'Role sudah terdaftar!'
            });
        }

        const createData = await Role.create({
            nama_role
        })

        return res.status(201).json({
            message: 'Data baru berhasil ditambahkan !',
            data: createData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

roleController.getAll = async (req, res) => {
    try {
        const roles = await Role.findAll({
            order: [['createdAt', "DESC"]]
        });

        if (roles.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada data yang tersedia!'
            });
        }

        return res.status(200).json({
            data: roles
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

roleController.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findOne({
            where: {
                id: id
            }
        });

        if (!role) {
            return res.status(404).json({
                message: 'Data yang Anda cari tidak ada'
            });
        }

        return res.status(200).json({
            data: role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

roleController.update = async (req, res) => {
    const { id } = req.params
    const { nama_role } = req.body

    try {
        const getData = await Role.findOne({
            where: {
                id: id
            }
        })

        if (!getData) {
            return res.status(404).json({
                message: 'Data yang ingin anda perbarui tidak tersedia !'
            })
        }

        if (!nama_role) {
            return res.status(400).json({
                message: 'Field tidak boleh kosong !'
            })
        }

        const updateData = await Role.update({
            nama_role
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

roleController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRole = await Role.destroy({
            where: {
                id: id
            }
        });

        if (!deletedRole) {
            return res.status(404).json({
                message: 'Role tidak ditemukan!'
            });
        }

        return res.status(200).json({
            message: 'Role deleted successfully!'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


module.exports = roleController

