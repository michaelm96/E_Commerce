const router = require('express').Router()
const productController = require('../controller/productController')

router.get('/', productController.getProduct)
router.get('/search/:name', productController.getProductByName)
router.get('/category/:category', productController.getProductByCategory)

module.exports = router