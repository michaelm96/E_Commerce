const router = require('express').Router()
const cartController = require('../controller/cartController')
const authetication = require('../middlewares/authentication')

router.use(authetication)
router.get('/', cartController.getCart)
router.post('/', cartController.postCart)
router.put('/decrease/:id', cartController.decreaseCart)
router.put('/:id', cartController.updateCart)

module.exports = router