const bcrypt = require("bcryptjs");

function hashPass(password) {
	let salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}

function comparePass(password, hashedpassword) {
	return bcrypt.compareSync(password, hashedpassword);
}

module.exports = { hashPass, comparePass };
