'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  Login.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING

    
  }, {
    sequelize,
    modelName: 'Login',
  });

  // Method to compare hashed password
  Login.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Login;
};
