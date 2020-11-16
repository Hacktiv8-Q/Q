const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const { adminAuthentication } = require('../middlewares/authentication')
const { adminAuthorization } = require('../middlewares/authorization')

router.post('/register', AdminController.registerAdmin)
router.post('/login', AdminController.loginAdmin)
router.post('/register-cashier/', adminAuthentication, adminAuthorization, AdminController.registerCashier)
router.post('/login-cashier', AdminController.loginCashier)

module.exports = router