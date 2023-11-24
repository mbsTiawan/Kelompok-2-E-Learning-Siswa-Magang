'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submit_Tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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