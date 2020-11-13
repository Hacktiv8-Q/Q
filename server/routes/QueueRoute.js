const router = require('express').Router()
const QueueController = require('../controllers/QueueController')
const { customerAuthentication } = require('../middlewares/authentication')


router.get('/', customerAuthentication, QueueController.getQueue)
router.post('/', customerAuthentication, QueueController.addQueue)

//authorisasi dari Outlet
router.put('/:id', QueueController.updateQueue)
router.delete('/:id', QueueController.deleteQueue)

module.exports = router