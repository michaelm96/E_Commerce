const { Banner } = require('../models')

class BannerController {
    static getBanner(req, res, next) {

        Banner.findAll({
            order: [['id', 'ASC']]
        })
        .then(banner => {
            res.status(200).json(banner)
        })
        .catch(err => {
            next(err)
        })
    }

    static getBannerById(req, res, next) {
        const { id } = req.params

        Banner.findByPk(id)
        .then(banner => {
            if (banner === null) {
                next({ name: 'Banner not found' })
            } else {
                res.status(200).json(banner)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static postBanner(req, res, next) {

        const { name, image_url } = req.body
        Banner.create({
            name,
            image_url
        })
        .then(banner => {
            res.status(201).json(banner)
        })
        .catch(err => {
            let errObj = {}
            if (err.name === 'SequelizeValidationError') {
                for (let error of err.errors) {
                    errObj[error.path] = error.message
                }
                next({ name: 'SequelizeValidationError', errObj })
            } else {
                next(err)
            }
        })
    }

    static updateBanner(req, res, next) {
        const { name, image_url } = req.body
        const { id } = req.params

        Banner.update({
            name,
            image_url
        }, { where: { id } })
        .then(banner => {
            if (banner == 0) {
                next({ name: 'Banner not found' })
            } else {
                res.status(200).json({ name: 'Banner Succesfully Updated'})
            }
        })
        .catch(err => {
            let errObj = {}
            if (err.name === 'SequelizeValidationError') {
                for (let error of err.errors) {
                    errObj[error.path] = error.message
                }
                next({ name: 'SequelizeValidationError', errObj })
            } else {
                next(err)
            }
        })
    }

    static deleteBanner(req, res, next) {
        const { id } = req.params

        Banner.destroy({
            where: { id }
        })
        .then(banner => {
            if (banner == 0) {
                next({ name: 'Banner not found' })
            } else {
                res.status(200).json({ name: "Banner successfully deleted" })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = BannerController