'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifikasi.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Tandai kolom 'id' sebagai primaryKey
      autoIncrement: true, // Atur sebagai auto-increment
    },
    penulis: DataTypes.STRING,
    pengumuman: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notifikasi',
  });
  return Notifikasi;
};
