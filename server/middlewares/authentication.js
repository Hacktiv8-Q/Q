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
		next();
	} catch (err) {
		//console.log(err, "<<<<<<<< ERROR AUTHENTICATION")
		//res.status(500).json({ error: err.msg || "internal server error" })
		next(err);
	}
}

// async function outletAuthentication(req, res, next) {
// 	try {
// 		let { token } = req.headers;
// 		let decoded = verifyToken(token);
// 		let outlet = await Outlet.findOne({
// 			where: { email: decoded.email },
// 		});
// 		if (!outlet) throw { msg: "authentication failed", statusCode: 401 };
// 		req.userData = decoded;
// 		next();
// 	} catch (err) {
// 		//console.log(err, "<<<<<<<< ERROR AUTHENTICATION")
// 		//res.status(500).json({ error: err.msg || "internal server error" })
// 		next(err);
// 	}
// }
async function customerAuthentication(req, res, next) {
	try {
		let { token } = req.headers;
		let decoded = verifyToken(token);
		let customer = await Customer.findOne({
			where: { email: decoded.email },
		});
		if (!customer) throw { msg: "authentication failed", statusCode: 401 };
		req.userData = decoded;
		next();
	} catch (err) {
		//console.log(err, "<<<<<<<< ERROR AUTHENTICATION")
		//res.status(500).json({ error: err.msg || "internal server error" })
		next(err);
	}
}

module.exports = {
	adminAuthentication,
	customerAuthentication,
	outletAuthentication,
};
