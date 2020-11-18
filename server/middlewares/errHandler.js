function errHandler(err, req, res, next) {
	console.log(err, "<<<<<<<<< ini dari error handler");
	let errors = [];
	let statusCode = 500;

	// proses error disini
	switch (err.name) {
		case "JsonWebTokenError":
			errors.push("Fail to authenticate!");
			statusCode = 401;
			break;
		case "SequelizeValidationError":
			statusCode = 400;
			err.errors.forEach((el) => {
				errors.push(el.message);
			});
			break;
		case "UnAuthorized":
			console.log("><><><><><><>><><><><< Cek masuk pak eko");
			statusCode = 400;
			errors.push(err.message);
			break;
		// case "SequelizeUniqueConstraintError":
		// 	statusCode = 400;
		// 	err.errors.forEach((el) => {
		// 		errors.push(el.message);
		// 	});
		// 	break;
		// case "SequelizeForeignKeyConstraintError":
		// 	statusCode = 400;
		// 	errors.push(`ForeignKey error!`);
		// 	break;
		// case "NotFoundError":
		// case "ForbiddenError":
		// case "UnauthorizedError":
		// 	statusCode = 403;
		// case "BadRequestError":
		// 	statusCode = err.statusCode;
		// 	errors.push(err.message);
		// 	break;
		// case "TokenExpiredError":
		// 	statusCode = 401;
		// 	errors.push("Failed to authenticate");
		// 	break;
		// case "UnprocessibleEntity":
		// 	statusCode = 422;
		// 	errors = err.errors;
		// 	break;
		default:
			errors.push(err.msg || "internal server error");
			statusCode = err.statusCode || 500;
	}
	res.status(statusCode).json({
		errors: errors,
	});
}

module.exports = errHandler;
