const request = require("supertest");
const app = require("../app");
const { Outlet, Queue, Admin } = require("../models");
const { generateToken } = require("../helper/jwt");
const { comparePass } = require("../helper/bcrypt");

let token;
let AdminId;

beforeAll((done) => {
	const adminLogin = {
		email: "admin@gmail.com",
		password: "admin",
	};

	Admin.findOne({ where: { email: adminLogin.email } })
		.then((admin) => {
			if (admin) {
				if (comparePass(adminLogin.password, admin.password)) {
					let payload = {
						AdminId: admin.id,
						email: admin.email,
						role: admin.role,
					};
					token = generateToken(payload);
					done();
				}
			}
		})
		.catch((err) => {
			done(err);
		});
});

describe("Register Outlet / Succes Case", () => {
	test("Should return an object with key: id, firstName, lastName, email", (done) => {
		request(app)
			.post("/outlets/register")
			.set(("token", token))
			.send({
				name: "tes",
				description: "tes",
				category: "tes depan",
				image_url: "tes belakang",
			})
			.end((err, res) => {
				if (err) throw err;
				else {
					expect(res.status).toBe(201);
					expect(res.body).toHaveProperty("message");
				}
			});
	});
});

//name, description, category, image_url
