function adminAuthorization(req, res, next) {
	if (req.userData.role === "admin") {
		next();
	} else {
		throw { msg: "kamu bukan admin", statusCode: 403 };
	}
}

function outletAuthorization(req, res, next) {
	if (req.userData.role === "outlet") {
		next();
	} else {
		throw { msg: "kamu bukan pemilik outlet!", statusCode: 403 };
	}
}

module.exports = { adminAuthorization, outletAuthorization };
