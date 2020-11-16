'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Cashier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cashier.belongsTo(models.Outlet)
    }
  };
  Cashier.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    OutletId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cashier',
    hooks: {
      beforeCreate: (cashier, opt) => {
        cashier.role = 'cashier',
        cashier.password = hashPass(cashier.password)
      }
    }
  });
  return Cashier;
};