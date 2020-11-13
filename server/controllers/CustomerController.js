const { customer } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')


class CustomerController {

    static register(req,res,next){
        const { email, password } = req.body

        User.create({email, password})
            .then(user=>{
                console.log(user, '<<< ini user dari register')
                res.status(201).json({id: user.id, email: user.email, organization: user.organization})
            })
            .catch(err=>{
                console.log(err, "<<< ini error register")
                next(err)
            })
    }

    static login(req,res,next){
        const {email, password} = req.body

        User.findOne({where: {email}})
            .then(user=>{
                if(!user) throw {msg: "invalid email or password"}
                let verifyPass = comparePass(password, user.password)
                if(!verifyPass) throw {msg: "invalid email or password"}

                let payload = {
                    id: user.id,
                    email: user.email
                }

                let token = generateToken(payload)
                res.status(200).json({token})
            })
            .catch(err=>{
                console.log(err, "<<< ini error login")
                next(err)
            })
        
    }
}

module.export = CustomerController