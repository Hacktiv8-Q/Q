'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.Outlet)
    }
  };
  Admin.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    hooks: {
      beforeCreate: (admin, opt) => {
        admin.password = hashPass(admin.password)
      }
    }
  });
  return Admin;
};