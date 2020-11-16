function adminAuthorization(req, res, next) {
	if (req.userData.role === "admin") {
		next();
	} else {
		throw { msg: "kamu bukan pemilik outlet", statusCode: 403 };
	}
}
function adminCashierAuthorization(req, res, next) {
	console.log(req.userData.role, 'ini role admin')
	if (req.userData.role === 'admin' || req.userData.role === 'cashier') {
		next()
	} else {
		throw { msg: "kamu bukan cashier maupun pemilik outlet" }
	}
}
function customerAuthorization(req, res, next) {
	if (req.userData.role === "customer") {
		next();
	} else {
		throw { msg: "kamu bukan customer", statusCode: 403 };
	}
}

module.exports = { adminAuthorization, adminCashierAuthorization, customerAuthorization };
