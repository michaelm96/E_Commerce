const router = require('express').Router()
const bannerController = require('../controller/bannerController')
const authetication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', bannerController.getBanner)
router.use(authetication)
router.use(authorization)
router.get('/:id', bannerController.getBannerById)
router.post('/', bannerController.postBanner)
router.put('/:id', bannerController.updateBanner)
router.delete('/:id', bannerController.deleteBanner)

module.exports = router