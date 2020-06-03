const router = require('express').Router()
const userController = require('../controller/userController')

router.post('/register', userController.registerCustomer)
router.post('/login', userController.loginCustomer)

module.exports = router