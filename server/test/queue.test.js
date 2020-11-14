const request = require("supertest");
const app = require("../app");
const { Queue, Customer } = require("../models");
const { generateToken } = require("../helper/jwt");
const { comparePass } = require("../helper/bcrypt");

let token;
let id;

beforeAll((done) => {
	const customerLogin = {
		email: "customer@gmail.com",
		password: "customer",
	};

	Customer.findOne({ where: { email: customerLogin.email } })
		.then((customer) => {
			if (customer) {
				if (comparePass(customerLogin.password, customer.password)) {
					let payload = {
						id: customer.id,
						email: customer.email,
						role: customer.role,
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

afterAll((done) => {
	Queue.destroy({ where: { id } })
		.then((_) => {
			done();
		})
		.catch((err) => {
			done(err);
		});
});

describe("Create Queue by customer / Success Case", () => {
	test("Shoud sent an Object with keys: id, OutletId, CustomerId, status", (done) => {
		request(app)
			.post("/queues")
			.set("token", token)
			.send({ OutletId: 1 }) //masih hardcode
			.end(function (err, res) {
				if (err) throw err;
				else {
					id = res.body.queue.id;
					expect(res.status).toBe(201);
					expect(res.body.queue).toHaveProperty("id", expect.any(Number));
					expect(res.body.queue).toHaveProperty("OutletId", expect.any(Number));
					expect(res.body.queue).toHaveProperty(
						"CustomerId",
						expect.any(Number)
					);
					expect(res.body.queue).toHaveProperty("status", "queue");
					expect(res.body.queue).toHaveProperty("updatedAt");
					expect(res.body.queue).toHaveProperty("createdAt");
					done();
				}
			});
	});
});

// describe("Create Queue by customer / Error Case", () => {
//     test("Failed create queue because empty OutletId", (done) => {
//         request(app)
//             .post('/queues')
//             .set("token", token)
//             .end((function (err, res) {
//                 if (err) throw err;
//                 else {
//                     console.log(res.body.errors, '<<<<<<<<<<<<<<ini error')
//                     expect(res.status).toBe(400)
//                     // expect(res.body.errors).toHaveProperty('id', expect.any(Number))
//                     done()
//                 }
//             }))
//     })
// })
