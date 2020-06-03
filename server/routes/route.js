const router = require('express').Router()
const userController = require('../controller/userController')
const productRoutes = require('./productRoutes')
const productCustomerRoutes = require('./productCustomerRoutes')
const customerRoutes = require('./customerRoutes')
const bannerRoutes = require('./bannerRoutes')
const cartRoutes = require('./cartRoutes')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/product', productRoutes)
router.use('/customer', customerRoutes)
router.use('/productCustomer', productCustomerRoutes)
router.use('/banner', bannerRoutes)
router.use('/cart', cartRoutes)

module.exports = router