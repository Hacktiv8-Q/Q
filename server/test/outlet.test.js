const request = require("supertest");
const app = require("../app");
const { Outlet, Queue, Admin } = require("../models");
const { generateToken } = require("../helper/jwt");
const { comparePass } = require("../helper/bcrypt");

let token;
let idOutlet;

beforeAll((done) => {
	const adminLogin = {
		email: "kristiawan@gmail.com",
		password: "kristiawan123",
	};

	Admin.findOne({ where: { email: adminLogin.email } })
		.then((admin) => {
			if (admin) {
				if (comparePass(adminLogin.password, admin.password)) {
					let payload = {
						id: admin.id,
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
// afterAll((done) => {
// 	Outlet.destroy({ where: { id: idOutlet } })
// 		.then(_ => {
// 			done()
// 		})
// 		.catch(err => {
// 			done(err)
// 		})
// })
//name, description, category, image_url

describe("Add Outlet / Success Case", () => {
	test("Should return an object with key: name, description, category, image_url", (done) => {
		request(app)
			.post('/outlets')
			.set("token", token)
			.send({
				name: "tes",
				description: "tes",
				category: "tes",
				image_url: "tes"
			})
			.end((function (err, res) {
				if (err) throw err;
				else {
					idOutlet = res.body.data.id
					expect(res.status).toBe(201)
					expect(res.body).toHaveProperty('message')
					done()
				}
			}))
	})
})

describe("Add Outlet / Error Case", () => {
	test("Fail because empty field", (done) => {
		request(app)
			.post('/outlets')
			.set("token", token)
			.send({
				name: "",
				description: "tes",
				category: "tes",
				image_url: "tes"
			})
			.end((function (err, res) {
				if (err) throw err;
				else {
					const errors = ["name is required"]
					expect(res.status).toBe(400)
					expect(res.body.errors).toEqual(errors)
					done()
				}
			}))
	})
	test("Fail because wrong token", (done) => {
		request(app)
			.post('/outlets')
			.set("token", "abcdefg")
			.send({
				name: "tes",
				description: "tes",
				category: "tes",
				image_url: "tes"
			})
			.end((function (err, res) {
				if (err) throw err;
				else {
					const errors = ["Fail to authenticate!"]
					expect(res.status).toBe(401)
					expect(res.body.errors).toEqual(errors)
					done()
				}
			}))
	})
})

describe("Get all outlet / Success Case", () => {
	test("Shoud sent an array of Object with keys: id, name, description, category, image_url", (done) => {
		request(app)
			.get('/outlets/admin')
			.set("token", token)
			.end((function (err, res) {
				if (err) throw err;
				else {
					expect(res.status).toBe(200)
					expect(res.body).toHaveProperty('Outlets', expect.any(Array))
					done()
				}
			}))
	})
})

describe("Get all outlet / Error Case", () => {
    test("Fail get all outlet because invalid token / Authentication fail", (done) => {
        request(app)
            .get('/outlets')
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ['Fail to authenticate!']
                    expect(res.status).toBe(401)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
    test("Fail get all outlet because there is no token", (done) => {
        request(app)
            .get('/outlets')
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ['Fail to authenticate!']
                    expect(res.status).toBe(401)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
})

describe("Get outlet by id / Success Case", () => {
	test("Shoud sent an array of Object with keys: id, name, description, category, image_url", (done) => {
		request(app)
			.get('/outlets/' + idOutlet)
			.set("token", token)
			.end((function (err, res) {
				if (err) throw err;
				else {
					expect(res.status).toBe(200)
					expect(res.body.data.id).toBe(idOutlet)
					expect(res.body.data).toHaveProperty('name', expect.any(String))
					expect(res.body.data).toHaveProperty('description', expect.any(String))
					expect(res.body.data).toHaveProperty('category', expect.any(String))
					expect(res.body.data).toHaveProperty('image_url', expect.any(String))
					done()
				}
			}))
	})
})

describe("Get outlet by id / Error Case", () => {
    test("Fail get outlet by id because invalid token / Authentication fail", (done) => {
        request(app)
            .get('/outlets/' + idOutlet)
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ['Fail to authenticate!']
                    expect(res.status).toBe(401)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
    test("Fail get outlet by id because there is no token", (done) => {
        request(app)
            .get('/outlets/' + idOutlet)
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ['Fail to authenticate!']
                    expect(res.status).toBe(401)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
})

describe("Update outlet by admin / Success Case", () => {
	test("Shoud sent an Object with keys: message", (done) => {
		request(app)
			.put('/outlets/' + idOutlet)
			.set("token", token)
			.send({ name: 'edit' })
			.end((function (err, res) {
				if (err) throw err;
				else {
					expect(res.status).toBe(200)
					expect(res.body).toHaveProperty('message')
					done()
				}
			}))
	})
})

describe("Update outlet by admin / Error Case", () => {
    test("Fail update outlet because id not found", (done) => {
        request(app)
            .put('/outlets/' + (idOutlet + 1))
            .set("token", token)
            .send({ name: 'edit' })
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ["Id Not Found"]
                    expect(res.status).toBe(404)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
    test("Fail update outlet because invalid token / Authentication fail", (done) => {
        request(app)
            .put('/outlets/' + idOutlet)
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .send({ name: 'edit' })
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ["Fail to authenticate!"]
                    expect(res.status).toBe(401)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
})

describe("Delete outlet by admin / Success Case", () => {
	test("Shoud sent an Object with keys: message", (done) => {
		request(app)
			.delete('/outlets/' + idOutlet)
			.set("token", token)
			.end((function (err, res) {
				if (err) throw err;
				else {
					expect(res.status).toBe(200)
					expect(res.body).toHaveProperty('message')
					done()
				}
			}))
	})
})

describe("Delete outlet by admin / Error Case", () => {
    test("Fail delete outlet because id not found", (done) => {
        request(app)
            .delete('/outlets/' + (idOutlet + 1))
            .set("token", token)
            .end((function (err, res) {
                if (err) throw err;
                else {
					const errors = ["Id Not Found"]
                    expect(res.status).toBe(404)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
    test("Fail delete outlet because invalid token / Authentication fail", (done) => {
        request(app)
            .delete('/outlets/' + idOutlet)
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ["Fail to authenticate!"]
                    expect(res.status).toBe(401)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
})

