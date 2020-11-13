const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')
const {authentication} = require('../middlewares/authentication')

router.use(authentication)

router.post('/login', CustomerController.login)
router.post('/register', CustomerController.register)
router.post('/googleSign', CustomerController.googleSign)

module.exports = router