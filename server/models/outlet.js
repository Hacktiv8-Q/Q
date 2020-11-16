"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Outlet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Outlet.belongsTo(models.Admin);
			Outlet.belongsToMany(models.Customer, { through: models.Queue });
			Outlet.hasMany(models.Queue);
			Outlet.hasMany(models.Cashier)
		}
	}
	Outlet.init(
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "name is required",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: { msg: "description is required" },
				},
			},
			category: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: { msg: "category is required" },
				},
			},
			AdminId: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: { msg: "AdminId is required" },
				},
			},
			image_url: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: { msg: "image_url is required" },
				},
			},
		},
		{
			sequelize,
			modelName: "Outlet",
		}
	);
	return Outlet;
};
