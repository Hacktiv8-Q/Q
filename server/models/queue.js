'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Queue.belongsTo(models.Customer)
      Queue.belongsTo(models.Outlet)
    }
  };
  Queue.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    CustomerId: DataTypes.INTEGER,
    OutletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'OutletId is required'
        },
        notNull: {
          msg: 'OutletId is required'
        }
      }
    },
    status: DataTypes.STRING,
    uniqueCode: DataTypes.STRING,
    deviceToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Queue',
  });
  return Queue;
};
