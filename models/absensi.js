"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Absensi.belongsTo(models.Siswa, { foreignKey: "id_siswa" });
    }
  }
  Absensi.init(
    {
      id_siswa: {
        type: DataTypes.INTEGER,
        references: {
          model: "Siswas",
          key: "id",
        },
      },
      waktu_absen: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Absensi",
    }
  );
  return Absensi;
};
