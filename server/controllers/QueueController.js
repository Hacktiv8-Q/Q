const { Queue } = require('../models')
const { generateToken, verifyToken } = require('../helper/jwt')

class Controller {
  static getQueue(req, res, next) {
    Queue.findAll()
      .then(queue => {
        res.status(200).json({ queue })
      })
      .catch(err => next(err))
  }
  static addQueue(req, res, next) {
    const { OutletId } = req.body
    const CustomerId = +req.userData.id
    const status = 'queue'
    const email = req.userData.email
    let uniqueCode = ''
    for (let i = 0; i < 5; i++) {
      uniqueCode += email[Math.floor(Math.random() * email.length)]
    }
    uniqueCode = generateToken(uniqueCode)
    Queue.create({ OutletId, CustomerId, status, uniqueCode })
      .then(queue => {
        queue.uniqueCode = verifyToken(queue.uniqueCode)
        console.log(queue, 'ASUP TI ADD QUEUE')
        res.status(201).json({ queue })
      })
      .catch(err => next(err))
  }
  static updateQueue(req, res, next) {
    const { status, uniqueCode } = req.body
    const { id } = req.params
    Queue.findOne({where: {id}})
      .then(data => {
        if(!data) throw { msg: "Id Not Found" , statusCode: 404 }
        if(verifyToken(data.uniqueCode) !== uniqueCode) throw { msg: 'Unique Code did not match', statusCode: 401}
        return data.update({ status }, { where: { id } })
      })
      .then(data => {
        res.status(200).json({ status: `success update queue id ${id}` })
      })
      .catch(err => next(err))
  }
  static deleteQueue(req, res, next) {
    const { id } = req.params
    Queue.findOne({where: {id}})
      .then(data => {
        if(!data) throw { msg: "Id Not Found" , statusCode: 404 }
        return data.destroy({ where: { id } })
      })
      .then(data => {
        res.status(200).json({ status: `success delete queue id ${id}` })
      })
      .catch(err => next(err))
  }
}

module.exports = Controller