const request = require('supertest')
const app = require('../app')
const { Queue, Customer, Admin } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')

let tokenCustomer
let tokenAdminCashier
let id

beforeAll((done) => {
    const customerLogin = {
        email: "basilius@gmail.com",
        password: "basilius123"
    }
    Customer.findOne({ where: { email: customerLogin.email } })
        .then(customer => {
            if (customer) {
                if (comparePass(customerLogin.password, customer.password)) {
                    let payload = {
                        id: customer.id,
                        email: customer.email,
                        role: customer.role
                    }
                    tokenCustomer = generateToken(payload)
                    done()
                }
            }
        })
        .catch(err => {
            done(err)
        })
    ////////////////////////
    const adminCashierLogin = {
        email: "kristiawan@gmail.com",
        password: "kristiawan123"
    }
    Admin.findOne({ where: { email: adminCashierLogin.email } })
        .then(adminCashier => {
            if (adminCashier) {
                if (comparePass(adminCashierLogin.password, adminCashier.password)) {
                    let payload = {
                        id: adminCashier.id,
                        email: adminCashier.email,
                        role: adminCashier.role
                    }
                    tokenAdminCashier = generateToken(payload)
                    done()
                }
            }
        })
        .catch(err => {
            done(err)
        })
})

// afterAll((done) => {
//     Queue.destroy({ where: { id } })
//         .then(_ => {
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
// })

describe("Create Queue by customer / Success Case", () => {
    test("Shoud sent an Object with keys: id, OutletId, CustomerId, status", (done) => {
        request(app)
            .post('/queues')
            .set("token", tokenCustomer)
            .send({ OutletId: 3 })//masih hardcode
            .end((function (err, res) {
                if (err) throw err;
                else {
                    id = res.body.queue.id
                    expect(res.status).toBe(201)
                    expect(res.body.queue).toHaveProperty('id', expect.any(Number))
                    expect(res.body.queue).toHaveProperty('OutletId', expect.any(Number))
                    expect(res.body.queue).toHaveProperty('CustomerId', expect.any(Number))
                    expect(res.body.queue).toHaveProperty('status', 'queue')
                    expect(res.body.queue).toHaveProperty('updatedAt')
                    expect(res.body.queue).toHaveProperty('createdAt')
                    done()
                }
            }))
    })
})

describe("Create Queue by customer / Error Case", () => {
    test("Failed create queue because empty OutletId", (done) => {
        request(app)
            .post('/queues')
            .set("token", tokenCustomer)
            .end((function (err, res) {
                if (err) throw err;
                else {
                    const errors = ["OutletId is required"]
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(errors)
                    done()
                }
            }))
    })
    test("Failed create queue because invalid token/authentication fail", (done) => {
        request(app)
            .post('/queues')
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .send({ OutletId: 3 })//masih hardcode
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

describe("Get all Queue / Success Case", () => {
    test("Shoud sent an array of Object with keys: id, OutletId, CustomerId, status", (done) => {
        request(app)
            .get('/queues')
            .set("token", tokenCustomer)
            .end((function (err, res) {
                if (err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('queue', expect.any(Array))
                    done()
                }
            }))
    })
})

describe("Get all Queue / Error Case", () => {
    test("Fail get all queue because invalid token / Authentication fail", (done) => {
        request(app)
            .get('/queues')
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
    test("Fail get all queue because there is no token", (done) => {
        request(app)
            .get('/queues')
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

describe("Update Queue by admin or cashier / Success Case", () => {
    test("Shoud sent an Object with keys: status", (done) => {
        request(app)
            .put('/queues/' + id)
            .set("token", tokenAdminCashier)
            .send({ status: 'in' })//masih hardcode
            .end((function (err, res) {
                if (err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('status')
                    done()
                }
            }))
    })
})

describe("Update Queue by admin or cashier / Error Case", () => {
    test("Fail update queue because id not found", (done) => {
        request(app)
            .put('/queues/' + (id + 1))
            .set("token", tokenAdminCashier)
            .send({ status: 'in' })//masih hardcode
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
    test("Fail update queue because invalid token / Authentication fail", (done) => {
        request(app)
            .put('/queues/' + id)
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .send({ status: 'in' })//masih hardcode
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




describe("Delete Queue by admin or cashier / Success Case", () => {
    test("Shoud sent an Object with keys: status", (done) => {
        request(app)
            .delete('/queues/' + id)
            .set("token", tokenAdminCashier)
            .end((function (err, res) {
                if (err) throw err;
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('status')
                    done()
                }
            }))
    })
})

describe("Delete Queue by admin or cashier / Error Case", () => {
    test("Fail delete queue because id not found", (done) => {
        request(app)
            .delete('/queues/' + (id + 1))
            .set("token", tokenAdminCashier)
            .send({ status: 'in' })//masih hardcode
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
    test("Fail delete queue because invalid token / Authentication fail", (done) => {
        request(app)
            .delete('/queues/' + id)
            .set("token", 'abcdefghijklmnopqrstuvwxyz')
            .send({ status: 'in' })//masih hardcode
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
