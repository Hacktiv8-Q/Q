const request = require('supertest')
const app = require('../app')
const { Queue, Customer, Cashier } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')

let tokenCustomer
let tokenCashier
let id
let uniqueCode

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
  const cashierLogin = {
    email: "tes@mail.com",
    password: "tes123"
  }
  Cashier.findOne({ where: { email: cashierLogin.email } })
    .then(cashier => {
      if (cashier) {
        if (comparePass(cashierLogin.password, cashier.password)) {
          let payload = {
            id: cashier.id,
            email: cashier.email,
            role: cashier.role,
            OutletId: cashier.OutletId
          }
          tokenCashier = generateToken(payload)
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
      .post('/queues/3')
      .set("token", tokenCustomer)
      .send({ deviceToken: 3 })//masih hardcode
      .end((function (err, res) {
        if (err) throw err;
        else {
          id = res.body.data.id
          uniqueCode = res.body.data.uniqueCode
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('data')
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
          expect(res.status).toBe(404)
          done()
        }
      }))
  })
  test("Failed create queue because invalid token/authentication fail", (done) => {
    request(app)
      .post('/queues/3')
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

describe("Get all Queue by cashier / Success Case", () => {
  test("Shoud sent an array of Object with keys: id, OutletId, CustomerId, status", (done) => {
    request(app)
      .get('/queues/cashier/3')
      .set("token", tokenCashier)
      .end((function (err, res) {
        if (err) throw err;
        else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('data')
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
          expect(res.body).toHaveProperty('data', expect.any(Array))
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

describe("Get all Queue by OutletId / Success Case", () => {
  test("Shoud sent an array of Object with keys: id, OutletId, CustomerId, status", (done) => {
    request(app)
      .get('/queues/3')
      .set("token", tokenCustomer)
      .end((function (err, res) {
        if (err) throw err;
        else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('data')
          expect(res.body).toHaveProperty('queueDetail')
          done()
        }
      }))
  })
})

describe("Update Queue by admin or cashier / Success Case", () => {
  test("Shoud sent an Object with keys: status", (done) => {
    request(app)
      .put('/queues/' + id)
      .set("token", tokenCashier)
      .send({ status: 'in', uniqueCode, OutletId: 3 })//masih hardcode
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
      .set("token", tokenCashier)
      .send({ status: 'in', uniqueCode, OutletId: 3 })//masih hardcode
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
      .send({ status: 'in', uniqueCode, OutletId: 3 })//masih hardcode
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
      .set("token", tokenCashier)
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
      .set("token", tokenCashier)
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
