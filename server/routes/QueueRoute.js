const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { customerAuthentication, cashierAuthentication } = require('../middlewares/authentication')
const { customerAuthorization, adminCashierAuthorization } = require('../middlewares/authorization')

router.get('/:outletId', customerAuthentication, customerAuthorization, QueueController.getQueue)
router.post('/:outletId', customerAuthentication, customerAuthorization, QueueController.addQueue)
router.put('/:id', cashierAuthentication, adminCashierAuthorization, QueueController.updateQueue)
router.delete('/:id', cashierAuthentication, adminCashierAuthorization, QueueController.deleteQueue)

module.exports = router