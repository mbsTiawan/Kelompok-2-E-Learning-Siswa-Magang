'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materi_Mentoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materi_Mentoring.init({
    nama_materi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materi_Mentoring',
  });
  return Materi_Mentoring;
};