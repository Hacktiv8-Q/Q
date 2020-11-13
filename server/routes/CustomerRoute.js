const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')

router.post('/login', CustomerController.login)
router.post('/register', CustomerController.register)
router.post('/googleSign', CustomerController.googleSign)

module.exports = router