const { Product } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

class ProductController {
    static getProduct(req, res, next) {

        Product.findAll({
            order: [['id', 'ASC']]
        })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProductById(req, res, next) {
        const { id } = req.params

        Product.findByPk(id)
            .then(product => {
                if (product === null) {
                    next({ name: 'Product not found' })
                } else {
                    res.status(200).json(product)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getProductByCategory(req, res, next) {
        const { category } = req.params

        Product.findOne({
            where: { category }
        })
            .then(product => {
                if (product === null) {
                    next({ name: 'Product not found' })
                } else {
                    res.status(200).json(product)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static postProduct(req, res, next) {

        const { name, image_url, price, stock, category } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock,
            category
        })
            .then(product => {
                res.status(201).json(product)
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

    static updateProduct(req, res, next) {
        const { name, image_url, price, stock, category } = req.body
        const { id } = req.params

        Product.update({
            name,
            image_url,
            price,
            stock,
            category

        }, { where: { id } })
            .then(product => {
                if (product == 0) {
                    next({ name: 'Product not found' })
                } else {
                    res.status(200).json({ name: 'Product Succesfully Updated' })
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

    static deleteProduct(req, res, next) {
        const { id } = req.params

        Product.destroy({
            where: { id }
        })
            .then(product => {
                if (product == 0) {
                    next({ name: 'Product not found' })
                } else {
                    res.status(200).json({ name: "Product successfully deleted" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    
    static getProductByName(req, res, next) {
        const { name } = req.params
        
        Product.findAll({
            where: { name: { [Op.iLike]: '%' + name + '%' },}
        })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController