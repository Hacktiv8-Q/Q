const router = require('express').Router()
const OutletController = require('../controllers/OutletController')
const { adminAuthentication, customerAuthentication } = require('../middlewares/authentication')
const { adminAuthorization } = require('../middlewares/authorization')

router.get('/customer', customerAuthentication, OutletController.outlets)
router.use(adminAuthentication)
router.get('/admin', OutletController.outletsAdmin)
router.get('/:id', adminAuthorization, OutletController.outletById)
router.post('/', adminAuthorization, OutletController.addOutlet)
router.put('/:id', adminAuthorization, OutletController.editOutlet)
router.delete('/:id', adminAuthorization, OutletController.deleteOutlet)

module.exports = router