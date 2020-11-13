const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { adminAuthentication, customerAuthentication } = require('../middlewares/authentication')
const { customerAuthorization, adminCashierAuthorization } = require('../middlewares/authorization')

router.use(customerAuthentication)
router.get('/', customerAuthorization, QueueController.getQueue)
router.post('/', customerAuthorization, QueueController.addQueue)
router.use(adminAuthentication)
router.put('/:id', adminCashierAuthorization, QueueController.updateQueue)
router.delete('/:id', adminCashierAuthorization, QueueController.deleteQueue)

module.exports = router