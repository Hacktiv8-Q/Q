const { Admin, Cashier } = require("../models");
const { comparePass } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class Controller {
  static registerAdmin(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    const obj = { firstName, lastName, email, password };
    Admin.create(obj)
      .then((data) => {
        data = {
          id: data.id,
          email: data.email,
        };
        res.status(201).json({ message: "register success", data });
      })
      .catch(next);
  }
  static loginAdmin(req, res, next) {
    const { email, password } = req.body;
    Admin.findOne({ where: { email } })
      .then((data) => {
        if (!data || !comparePass(password, data.password)) {
          throw {
            name: "UnAuthorized",
            message: "invalid email or password",
            statusCode: 400,
          };
        } else {
          let payload = {
            id: data.id,
            email: data.email,
            role: data.role
          };
          const id = +data.id;
          let token = generateToken(payload);
          res
            .status(200)
            .json({ message: "login success", token, id, payload });
        }
      })
      .catch(next);
  }
  static registerCashier(req, res, next) {
    const { firstName, lastName, email, password, OutletId } = req.body
    const obj = { firstName, lastName, email, password, OutletId }
    Cashier.create(obj)
      .then(data => {
        res.status(201).json({ message: 'cashier register success', data })
      })
      .catch(next)
  }
  static loginCashier(req, res, next) {
    const { email, password } = req.body;
    Cashier.findOne({ where: { email } })
      .then((data) => {
        if (!data || !comparePass(password, data.password)) {
          throw {
            name: "UnAuthorized",
            message: "invalid email or password",
            statusCode: 400,
          };
        } else {
          let payload = {
            id: data.id,
            email: data.email,
            role: data.role,
            OutletId: data.OutletId
          };
          const id = +data.id;
          let token = generateToken(payload);
          res
            .status(200)
            .json({ message: "login success", token, id, payload });
        }
      })
      .catch(next);
  }
}

module.exports = Controller;
