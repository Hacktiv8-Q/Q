const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { customerAuthentication, adminAuthentication } = require('../middlewares/authentication')
const { adminAuthorization } = require('../middlewares/authorization')

router.get('/', customerAuthentication, QueueController.getQueue)
router.post('/', customerAuthentication, QueueController.addQueue)
//authorisasi dari Outlet
router.use(adminAuthentication)
router.put('/:id', adminAuthorization, QueueController.updateQueue)
router.delete('/:id', adminAuthorization, QueueController.deleteQueue)

module.exports = router