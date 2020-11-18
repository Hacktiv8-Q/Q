const request = require("supertest");
const app = require("../app");
const { Admin, Cashier } = require("../models");

let id;
let idCashier;
let token;

afterAll((done) => {
  Admin.destroy({ where: { id } })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });

  Cashier.destroy({ where: { id: idCashier } })
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
        email: "kristiawan@gmail.com",
        password: "kristiawan123",
      })
      .end(function (err, res) {
        if (err) throw err;
        else {
          token = res.body.token
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

describe("Register Cashier / Succes Case", () => {
  test("Should return an object with key: message", (done) => {
    request(app)
      .post("/admins/register-cashier")
      .set("token", token)
      .send({
        email: "cashier@gmail.com",
        password: "tes cashier",
        firstName: "tes cashier",
        lastName: "tes cashier",
        OutletId: 3
      })
      .end((err, res) => {
        if (err) throw err;
        else {
          idCashier = res.body.data.id
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          done();
        }
      });
  });
});

describe("Login Cashier / Success Case", () => {
  test("Should sent an Object with keys: token", (done) => {
    request(app)
      .post("/admins/login-cashier")
      .send({
        email: "cashier@gmail.com",
        password: "tes cashier",
      })
      .end(function (err, res) {
        if (err) throw err;
        else {
          console.log(res.body, '<<<<<<<<< ini body login cashier')
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("token");
          done();
        }
      });
  });
});

describe("Login Cashier / Error Case", () => {
  test("Invalid email or password", (done) => {
    request(app)
      .post("/admins/login-cashier")
      .send({
        email: "cashier@gmail.com",
        password: "tes casher",
      })
      .end(function (err, res) {
        if (err) throw err;
        else {
          expect(res.status).toBe(400);
          done();
        }
      });
  });
});