'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Modul.belongsTo(models.Kategori, {
        foreignKey: 'id_kategori'
      })

      Modul.belongsTo(models.Asisten, {
        foreignKey: 'id_asisten'
      })
    }
  }
  Modul.init({
    id_asisten:  {
      type: DataTypes.INTEGER,
      references: {
        model: 'Asistens',
        key: 'id'
      }
    },
    id_kategori:  {
      type: DataTypes.INTEGER,
      references: {
        model: 'Kategoris',
        key: 'id'
      }
    },
    judul: DataTypes.STRING,
    nama_file: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.INTEGER,
    tipe_file: DataTypes.STRING,
    tanggal_upload: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Modul',
  });
  return Modul;
};