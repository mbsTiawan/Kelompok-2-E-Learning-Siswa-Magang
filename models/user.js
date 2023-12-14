"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "id_role", as: "role" });
      User.hasOne(models.Asisten, { foreignKey: "id_user", as: "asisten" });
    }
  }

  User.init(
    {
      id_role: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      passwordSalt: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeCreate", async (user) => {
    // Generate and store password salt securely
    const saltRounds = 10;
    user.passwordSalt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, user.passwordSalt);
  });

  return User;
};
