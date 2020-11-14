"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Admin.hasMany(models.Outlet);
		}
	}
	Admin.init(
		{
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
		},
		{
			sequelize,
			modelName: "Admin",
			hooks: {
				beforeCreate: (admin, opt) => {
					(admin.password = hashPass(admin.password)), (admin.role = "admin");
				},
			},
		}
	);
	return Admin;
};
