const { Admin } = require("../models");
const { comparePass } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class Controller {
	static registerAdmin(req, res, next) {
		const { firstName, lastName, email, password } = req.body;
		const obj = { firstName, lastName, email, password };
		Admin.create(obj)
			.then((data) => {
				data = {
					id: data.id,
					email: data.email,
				};
				res.status(201).json({ message: "berhasil register", data });
			})
			.catch(next);
	}
	static loginAdmin(req, res, next) {
		console.log(req.body, "asup ti loginadmin");
		const { email, password } = req.body;
		let errors = [];
		//	if (!email.length) errors.push("please insert email");
		//	if (!password.length) errors.push("please insert password");
		//	if (errors.length) next({ name: "UnprocessibleEntity", errors });
		Admin.findOne({ where: { email } })
			.then((data) => {
				if (!data || !comparePass(password, data.password)) {
					throw {
						name: "UnAuthorized",
						message: "invalid email or password",
						statusCode: 400,
					};
				} else {
					let payload = {
						id: data.id,
						email: data.email,
						role: data.role,
					};
					const id = +data.id;
					let token = generateToken(payload);
					res
						.status(200)
						.json({ message: "berhasil login", token, id, payload });
				}
			})
			.catch(next);
	}
}

module.exports = Controller;
