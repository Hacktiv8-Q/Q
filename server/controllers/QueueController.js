const { Queue, Outlet } = require('../models')
const { generateToken, verifyToken } = require('../helper/jwt')
const uniqueCodeGenerator = require('../helper/uniqueCodeGen')

class Controller {
  static getQueue(req, res, next) {
    const id = +req.params.outletId
    Outlet.findOne({ where: { id }, include: [Queue] })
      .then(data => {
        console.log(data.dataValues.Queues.length, 'ASUP TI FETCH QUEUE')
        data = {
          name: data.dataValues.name,
          imageUrl: data.dataValues.image_url,
          totalQueue: data.dataValues.Queues.length
        }
        res.status(200).json({ data })
      })
      .catch(err => next(err))
  }
  static addQueue(req, res, next) {
    const OutletId = +req.params.outletId
    const CustomerId = 1 //+req.userData.id
    const status = 'queue'
    const email = 'basilius@gmail.com' //req.userData.email
    const uniqueCode = uniqueCodeGenerator(email)
    Queue.create({ OutletId, CustomerId, status, uniqueCode })
      .then(queue => {
        queue.uniqueCode = verifyToken(queue.uniqueCode)
        console.log(queue, 'ASUP TI ADD QUEUE')
        res.status(201).json({ queue })
      })
      .catch(err => next(err))
  }
  static updateQueue(req, res, next) {
    const { status, uniqueCode, OutletId } = req.body
    const cashierOutletId = req.userData.OutletId
    const { id } = req.params
    console.log(status, uniqueCode, OutletId, cashierOutletId, id, 'asup ti update queue')
    if (cashierOutletId == OutletId) {
      Queue.findOne({ where: { id } })
        .then(data => {
          if (!data) throw { msg: "Id Not Found", statusCode: 404 }
          if (verifyToken(data.uniqueCode) !== uniqueCode) throw { msg: 'Unique Code did not match', statusCode: 401 }
          return data.update({ status }, { where: { id } })
        })
        .then(data => {
          res.status(200).json({ status: `success update queue id ${id}` })
        })
        .catch(err => next(err))
    } else {
      throw { msg: "not working here", statusCode: 400 }
    }
  }
  static deleteQueue(req, res, next) {
    const { id } = req.params
    Queue.findOne({ where: { id } })
      .then(data => {
        if (!data) throw { msg: "Id Not Found", statusCode: 404 }
        return data.destroy({ where: { id } })
      })
      .then(data => {
        res.status(200).json({ status: `success delete queue id ${id}` })
      })
      .catch(err => next(err))
  }
}

module.exports = Controller