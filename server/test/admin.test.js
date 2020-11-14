const request = require("supertest");
const app = require("../app");
const { Admin } = require("../models");

let id;
afterAll((done) => {
	Admin.destroy({ where: { id } })
		.then((_) => {
			done();
		})
		.catch((err) => {
			done(err);
		});
});
describe("Register Admin / Succes Case", () => {
	test("Should return an object with key: id, firstName, lastName, email", (done) => {
		request(app)
			.post("/admins/register")
			.send({
				email: "tes@gmail.com",
				password: "tes admin",
				firstName: "tes admin",
				lastName: "tes admin",
			})
			.end((err, res) => {
				if (err) throw err;
				else {
					id = res.body.data.id;
					expect(res.status).toBe(201);
					expect(res.body.data).toHaveProperty("id", expect.any(Number));
					expect(res.body.data).toHaveProperty("email");
					done();
				}
			});
	});
});

describe("Register Admin / Error Case", () => {
	test("Failed because empty field", (done) => {
		request(app)
			.post("/admins/register")
			.send({
				email: "",
				password: "tes123",
				firstName: "tes depan",
				lastName: "tes belakang",
			})
			.end((err, res) => {
				if (err) throw err;
				else {
					const errors = ["email is required", "invalid email format"];
					expect(res.status).toBe(400);
					expect(res.body.errors).toEqual(errors);
					done();
				}
			});
	});
	test("Failed because wrong email format", (done) => {
		request(app)
			.post("/admins/register")
			.send({
				email: "tes",
				password: "tes123",
				firstName: "tes depan",
				lastName: "tes belakang",
			})
			.end((err, res) => {
				if (err) throw err;
				else {
					const errors = ["invalid email format"];
					expect(res.status).toBe(400);
					expect(res.body.errors).toEqual(errors);
					done();
				}
			});
	});
	test("Failed because password is null", (done) => {
		request(app)
			.post("/admins/register")
			.send({
				email: "tes@gmail.com",
				password: null,
				firstName: "tes depan",
				lastName: "tes belakang",
			})
			.end((err, res) => {
				if (err) throw err;
				else {
					const errors = ["password can not null"];
					expect(res.status).toBe(400);
					expect(res.body.errors).toEqual(errors);
					done();
				}
			});
	});
});

describe("Login Admin / Success Case", () => {
	test("Should sent an Object with keys: token", (done) => {
		request(app)
			.post("/admins/login")
			.send({
				email: "admin@gmail.com",
				password: "admin",
			})
			.end(function (err, res) {
				if (err) throw err;
				else {
					expect(res.status).toBe(200);
					expect(res.body).toHaveProperty("token");
					done();
				}
			});
	});
});

describe("Login Admin / Error Case", () => {
	test("Failed because wrong password", (done) => {
		request(app)
			.post("/admins/login")
			.send({
				email: "admin@gmail.com",
				password: "salahpassword",
			})
			.end(function (err, res) {
				const errors = ["invalid email or password"];
				if (err) throw err;
				else {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("errors", expect.any(Array));
					expect(res.body.errors).toEqual(errors);
					done();
				}
			});
	});

	test("Failed because wrong email", (done) => {
		request(app)
			.post("/admins/login")
			.send({
				email: "salahemail@mail.com",
				password: "admin",
			})
			.end(function (err, res) {
				const errors = ["invalid email or password"];
				if (err) throw err;
				else {
					console.log(res.status, res.body, "<<<<<<<<<<<<<<<<<<<<< cek test");
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("errors", expect.any(Array));
					expect(res.body.errors).toEqual(errors);
					done();
				}
			});
	});

	test("Failed because empty email or password", (done) => {
		request(app)
			.post("/admins/login")
			.send({
				email: "",
				password: "",
			})
			.end(function (err, res) {
				const errors = ["invalid email or password"];
				if (err) throw err;
				else {
					expect(res.status).toBe(400);
					expect(res.body).toHaveProperty("errors", expect.any(Array));
					expect(res.body.errors).toEqual(errors);
					done();
				}
			});
	});
});
