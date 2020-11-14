const router = require('express').Router()
const Admin =  require('./AdminRoute')
const Customer =  require('./CustomerRoute')
const Outlet =  require('./OutletRoute')
const Queue =  require('./QueueRoute')

router.use('/admins', Admin)
router.use('/customers', Customer)
router.use('/outlets', Outlet)
router.use('/queues', Queue)

module.exports = router