"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Siswa.belongsTo(models.User, { foreignKey: 'id_user' })

      Siswa.hasMany(models.Tugas, {
        foreignKey: 'id_siswa'
      })
    }
  }

  Siswa.init(
    {
      id_asisten: {
        type: DataTypes.INTEGER,
        references: {
          model: "Asistens",
          key: "id",
        },
      },
      id_sekolah: {
        type: DataTypes.INTEGER,
        references: {
          model: "Sekolahs",
          key: "id",
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      nis: DataTypes.STRING,
      nama: DataTypes.STRING,
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      jurusan: DataTypes.STRING,
      tanggal_masuk: DataTypes.DATE,
      tanggal_keluar: DataTypes.DATE,
      tahun_ajaran: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      no_hp_ortu: DataTypes.STRING,
      shift: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Siswa",
    }
  );
  return Siswa;
};
