const { decode } = require("jsonwebtoken");
const { verifyToken } = require("../helper/jwt");
const { Admin, Outlet, Customer } = require("../models");

async function adminAuthentication(req, res, next) {
	try {
		let { token } = req.headers;
		let decoded = verifyToken(token);
		let admin = await Admin.findOne({
			where: { email: decoded.email },
		});
		if (!admin) throw { msg: "authentication failed", statusCode: 401 };
		req.userData = decoded;
		console.log(decoded, "ini admin auth");
		next();
	} catch (err) {
		next(err);
	}
}
async function customerAuthentication(req, res, next) {
	try {
		let { token } = req.headers;
		let decoded = verifyToken(token);
		let customer = await Customer.findOne({
			where: { email: decoded.email },
		});
		if (!customer) throw { message: "authentication failed", statusCode: 401 };
		req.userData = decoded;
		next();
	} catch (err) {
		next(err);
	}
}

module.exports = {
	adminAuthentication,
	customerAuthentication,
	// outletAuthentication,
};
