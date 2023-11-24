'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logbook_Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logbook_Siswa.init({
    id_siswa: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Siswas',
        key: 'id'
      }
    },
    id_asisten: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Asistens',
        key: 'id'
      }
    },
    tanggal: DataTypes.DATE,
    materi: DataTypes.STRING,
    catatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Logbook_Siswa',
  });
  return Logbook_Siswa;
};