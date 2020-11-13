const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { customerAuthentication } = require('../middlewares/authentication')


router.get('/', QueueController.getQueue)
router.post('/', QueueController.addQueue)

//authorisasi dari Outlet
router.put('/', customerAuthentication, QueueController.updateQueue)
router.delete('/', customerAuthentication, QueueController.deleteQueue)

module.exports = router