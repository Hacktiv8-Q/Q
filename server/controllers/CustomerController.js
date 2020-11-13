const { Customer } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')


class CustomerController {

    static register(req, res, next) {
        const { firstName, lastName, email, password } = req.body

        Customer.create({ firstName, lastName, email, password })
            .then(customer => {
                console.log(customer, '<<< ini user dari register')
                res.status(201).json({ id: customer.id, email: customer.email, organization: customer.organization })
            })
            .catch(err => {
                console.log(err, "<<< ini error register")
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        Customer.findOne({ where: { email } })
            .then(customer => {
                console.log(customer, 'ini login customer')
                if (!customer) throw { msg: "invalid email or password" }
                let verifyPass = comparePass(password, customer.password)
                if (!verifyPass) throw { msg: "invalid email or password" }

                let payload = {
                    id: customer.id,
                    email: customer.email
                }

                let token = generateToken(payload)
                res.status(200).json({ token })
            })
            .catch(err => {
                console.log(err, "<<< ini error login")
                next(err)
            })
    }

    static googleSign(req, res, next) {
        let email
        console.log(req.body.tokenGoogle, '<<< ini token google')
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

module.exports = CustomerController