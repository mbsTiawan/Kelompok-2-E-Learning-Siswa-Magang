'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asisten extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asisten.init({
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kelas: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    tanggal_masuk: DataTypes.DATE,
    jabatan: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Asisten',
  });
  return Asisten;
};