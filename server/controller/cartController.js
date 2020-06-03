const { Cart } = require('../models')
const { Product } = require('../models')

class CartController {
    static getCart(req, res, next) {
        const { id } = req.userData

        Cart.findAll({
            where: { UserId: id }
        })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                next(err)
            })
    }

    static postCart(req, res, next) {
        const { name, image_url, price, stock, category, buy } = req.body
        const { id } = req.userData
        let stockInCart = 0
        let proStock = 0

        Product.findOne({
            where: { name }
        })
            .then(proPro => {
                proStock = proPro.stock
                return Cart.findOne({
                    where: { name }
                })
                    .then(product => {
                        if (!product) {
                            if (Number(buy) > Number(proStock)) {
                                Number(buy) = Number(proStock)
                            }
                            return Cart.create({
                                name,
                                image_url,
                                price,
                                stock: 0 + Number(buy),
                                category,
                                UserId: id
                            })
                        } else {
                            if ((product.stock + Number(buy)) >= Number(proStock)) {
                                stockInCart = Number(proStock)
                            } else {
                                stockInCart = product.stock + Number(buy)
                            }
                            return Cart.update({
                                name: product.name,
                                image_url: product.image_url,
                                price: product.price,
                                stock: stockInCart,
                                category: product.category,
                                UserId: id,
                            }, { where: { name: product.name } })
                        }
                    })
                    .then(data => {
                        if(data[0] === 1) {
                            res.status(200).json({ name: 'Cart succesfully updated' })
                        } else {
                            res.status(201).json(data)
                        }
                    })
                    .catch(err => {
                        next(err)
                    })

            })
    }

    static updateCart(req, res, next) {
        const { name, image_url, price, stock, category, buy } = req.body
        const { UserId } = req.userData
        const { id } = req.params
        let stockInCart = Number(stock) - Number(buy)
        let newStock = 0

        Cart.findOne({
            where : { id }
        })
        .then(product => {
            if(!product) {
                next({ name: 'Product not found'})
            } else if(stockInCart <= 0) {
                return Cart.destroy({
                    where: { id }
                })
            } else {
                return Cart.update({
                    name,
                    image_url,
                    price,
                    stock: stockInCart,
                    category,
                    UserId,
                }, {
                    where: { id }
                })
            }
        })
        .then(product => {
            if(!product) {
                next({ name: 'Product not found'})
            } else {
                return Product.findOne({
                    where: {name}
                })
            }
        })
        .then(product1 => {
            if(!product1) {
                next({ name: 'Product not found'})
            } else {
                newStock = product1.stock - Number(buy)
                if(newStock < 0) {
                    newStock = 0
                }
                return Product.update({
                    name: product1.name,
                    image_url: product1.image_url,
                    price: product1.price,
                    stock: newStock,
                    category: product1.category,
                    UserId: product1.UserId,
                }, {
                    where: { id:product1.id }
                })
            }
        })
        .then(product2 => {
            if(!product2) {
                next({ name: 'Product not found'})
            } else {
                res.status(200).json({name: 'Cart succesfully updated'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static decreaseCart(req,res,next) {
        const { buy } = req.body
        const { id } = req.params
        let decrease = 0
        let proName = ''

        Cart.findOne({
            where: {id}
        })
        .then(product => {
            proName = product.name
            decrease = product.stock - buy
            if(Number(product.stock) - Number(buy) === 0) {
                return Cart.destroy({
                    where: {id}
                })
            } else {
                return Cart.update({
                    stock: decrease
                },{where: {id}})
            }
        })
        .then(product1 => {
            console.log(product1);
            if(!product1) {
                next({ name: 'Product not found'})
            } else {
                res.status(200).json({name: proName})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}


module.exports = CartController