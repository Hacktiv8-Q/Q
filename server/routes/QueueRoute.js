const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { customerAuthentication, cashierAuthentication } = require('../middlewares/authentication')
const { customerAuthorization, adminCashierAuthorization } = require('../middlewares/authorization')

<<<<<<< HEAD
router.get('/:outletId', cashierAuthentication, QueueController.getAllQueue)
=======
router.get('/', customerAuthentication, customerAuthorization, QueueController.getQueueByCustomer)
>>>>>>> 5403df80589c71933f0de9f73efc6a9b5c7aee7c
router.get('/:outletId', customerAuthentication, customerAuthorization, QueueController.getQueue)
router.post('/:outletId', customerAuthentication, customerAuthorization, QueueController.addQueue)
router.put('/:id', cashierAuthentication, adminCashierAuthorization, QueueController.updateQueue)
router.delete('/:id', cashierAuthentication, adminCashierAuthorization, QueueController.deleteQueue)

module.exports = router
