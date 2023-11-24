'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logbook_Pembelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logbook_Pembelajaran.init({
    id_materi: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Materi_Mentorings',
        key: 'id'
      }
    },
    deskripsi: DataTypes.STRING,
    catatan: DataTypes.STRING,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Logbook_Pembelajaran',
  });
  return Logbook_Pembelajaran;
};