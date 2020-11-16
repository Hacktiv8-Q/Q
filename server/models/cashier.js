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
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "firstname is required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "lastname is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "email is required",
        },
        isEmail: {
          msg: "invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required",
        },
        notNull: {
          msg: "password can not null",
        },
      },
    },
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