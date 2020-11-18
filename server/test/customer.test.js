const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");

let id;
afterAll((done) => {
  Customer.destroy({ where: { id } })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Register Customer / Succes Case", () => {
  test("Should return an object with key: id, firstName, lastName, email", (done) => {
    request(app)
      .post('/customers/register')
      .send({
        email: "tes@gmail.com",
        password: "tes123",
        firstName: "nama depan",
        lastName: "nama belakang"
      })
      .end((err, res) => {
        if (err) throw err
        else {
          id = res.body.id
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('id', expect.any(Number))
          expect(res.body).toHaveProperty('email')
          expect(res.body).toHaveProperty('firstName')
          expect(res.body).toHaveProperty('lastName')
          done()
        }
      })
  })
})

describe("Register Customer / Error Case", () => {
  test("Failed because empty field", (done) => {
    request(app)
      .post("/customers/register")
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
      .post("/customers/register")
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
      .post("/customers/register")
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

describe("Login Customer / Success Case", () => {
  test("Should sent an Object with keys: token", (done) => {
    request(app)
      .post("/customers/login")
      .send({
        email: "basilius@gmail.com",
        password: "basilius123",
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

describe("Login Customer / Error Case", () => {
  test("Failed because wrong password", (done) => {
    request(app)
      .post("/customers/login")
      .send({
        email: "basilius@gmail.com",
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
      .post("/customers/login")
      .send({
        email: "salahemail@mail.com",
        password: "basilius123",
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
      .post("/customers/login")
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
