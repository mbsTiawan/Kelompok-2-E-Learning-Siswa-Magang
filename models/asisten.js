"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asisten extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asisten.hasMany(models.Siswa, {
        foreignKey: "id_asisten",
      });

      Asisten.hasMany(models.Modul, {
        foreignKey: "id_asisten",
      });

      Asisten.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });

      Asisten.hasMany(models.Logbook_Pembelajaran, {
        foreignKey: "id_asisten",
      });
    }
  }
  Asisten.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      nim: DataTypes.STRING,
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      kelas: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      tanggal_masuk: DataTypes.DATE,
      shift: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Asisten",
    }
  );
  return Asisten;
};
