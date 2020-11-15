const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { adminAuthentication, customerAuthentication } = require('../middlewares/authentication')
const { customerAuthorization, adminCashierAuthorization } = require('../middlewares/authorization')

router.get('/:outletId', customerAuthentication, customerAuthorization, QueueController.getQueue)
router.post('/:outletId', customerAuthentication, customerAuthorization, QueueController.addQueue)
router.put('/:id', adminAuthentication, adminCashierAuthorization, QueueController.updateQueue)
router.delete('/:id', adminAuthentication, adminCashierAuthorization, QueueController.deleteQueue)

module.exports = router