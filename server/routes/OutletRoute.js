const router = require('express').Router()
const OutletController = require('../controllers/OutletController')
const { adminAuthentication } = require('../middlewares/authentication')
const { adminAuthorization } = require('../middlewares/authorization')

router.get('/', OutletController.outlets)
router.use(adminAuthentication)
router.get('/:id', adminAuthorization, OutletController.outletById)
router.post('/', adminAuthorization, OutletController.addOutlet)
router.put('/:id', adminAuthorization, OutletController.editOutlet)
router.delete('/:id', adminAuthorization, OutletController.deleteOutlet)

module.exports = router