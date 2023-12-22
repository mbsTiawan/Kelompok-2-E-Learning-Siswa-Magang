'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submit_Tugas extends Model {
    static associate(models) {
      Submit_Tugas.belongsTo(models.Tugas, {
        foreignKey: 'id_tugas'
      });
      Submit_Tugas.belongsTo(models.Siswa, {
        foreignKey: 'id_siswa'
      });
    }
  }
  Submit_Tugas.init({
    id_tugas: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tugas',
        key: 'id'
      }
    },
    id_siswa: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Siswas',
        key: 'id'
      }
    },
    name_file: DataTypes.STRING,
    waktu_submit: DataTypes.DATE,
    catatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Submit_Tugas',
  });
  return Submit_Tugas;
};
