const { Queue } = require('../models')

class QueueController {
    static getQueue(req, res, next) {
        Queue.findAll()
            .then(queue => {
                res.status(200).json({ queue })
            })
            .catch(err => next(err))
    }

    static addQueue(req, res, next) {
        const { OutletId } = +req.body
        const CustomerId = +req.userData.id
        const status = 'queue'

        Queue.create({ OutletId, CustomerId, status })
            .then(queue => {
                res.status(201).json({ queue })
            })
            .catch(err => next(err))
    }

    static updateQueue(req, res, next) {
        const { status } = req.body
        const { id } = +req.params

        Queue.update({ status }, { where: { id } })
            .then(data => {
                console.log(data, '<<<<<< ini data update')
                res.status(200).json({status: `success update queue id ${id}`})
            })
            .catch(err => next(err))
    }

    static deleteQueue(req, res, next) {
        const { id } = +req.params

        Queue.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({status: `success delete queue id ${id}`})
            })
            .catch(err => next(err))

    }
}

module.exports = QueueController