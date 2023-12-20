'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tugas.belongsTo(models.Siswa, {
        foreignKey: 'id_siswa'
      })
    }
  }
  Tugas.init({
    id_asisten: DataTypes.INTEGER,
    id_siswa: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    catatan: DataTypes.STRING,
    tenggat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tugas',
  });
  return Tugas;
};