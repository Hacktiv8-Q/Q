const { Customer } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')


class Controller {
  static register(req, res, next) {
    const { firstName, lastName, email, password } = req.body
    Customer.create({ firstName, lastName, email, password })
      .then(customer => {
        res.status(201).json({ id: customer.id, email: customer.email, firstName: customer.firstName, lastName: customer.lastName})
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body
    Customer.findOne({ where: { email } })
      .then(customer => {
        if (!customer) throw { msg: "invalid email or password", statusCode: 400 }
        let verifyPass = comparePass(password, customer.password)
        if (!verifyPass) throw { msg: "invalid email or password", statusCode: 400 }
        let payload = {
          id: customer.id,
          email: customer.email,
          role: customer.role
        }
        let token = generateToken(payload)
        res.status(200).json({ token })
      })
      .catch(next)
  }
  static googleSign(req, res, next) {
    let email
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.tokenGoogle,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        let payload = ticket.getPayload()
        email = payload.email
        return Customer.findOne({
          where: { email }
        })
      })
      .then(customer => {
        if (customer) return customer
        else {
          return Customer.create({
            email,
            password: 'masukpakeko'
          })
        }
      })
      .then(customer => {
        let payload = {
          email: customer.email,
          id: customer.id
        }
        let token = generateToken(payload)
        res.status(200).json({ token })
      })
      .catch(err => next(err))
  }
}

module.exports = Controller