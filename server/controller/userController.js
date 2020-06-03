const { User } = require('../models')
const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateToken')

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body

        User.create({
            name,
            email,
            password,
            role: "admin"
        })
            .then(user => {
                const access_token = generateToken(user)
                res.status(201).json({access_token})
            })
            .catch(err => {
                let errObj = {}
                if(err.name === 'SequelizeValidationError'){
                    for (let error of err.errors) {
                        errObj[error.path] = error.message
                    }
                    next({name: 'SequelizeValidationError', errObj})
                }else{
                    next(err)
                }
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        const error = { status: 400, name: 'Invalid Email/Password' }
        const forbidden = { status: 403, name: 'Forbidden Access' }
        
        User.findOne({
            where: {email}
        })
        .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    next(error)
                    return
                } else if ( user.role === 'customer') {
                    next(forbidden) 
                    return
                } else {
                    const access_token = generateToken(user)
                    res.headers = access_token
                    res.status(200).json({access_token})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static registerCustomer(req, res, next) {
        const { name, email, password } = req.body

        User.create({
            name,
            email,
            password,
            role: "customer"
        })
            .then(user => {
                const access_token = generateToken(user)
                res.status(201).json({access_token})
            })
            .catch(err => {
                let errObj = {}
                if(err.name === 'SequelizeValidationError'){
                    for (let error of err.errors) {
                        errObj[error.path] = error.message
                    }
                    next({name: 'SequelizeValidationError', errObj})
                }else{
                    next(err)
                }
            })
    }

    static loginCustomer(req, res, next) {
        const { email, password } = req.body
        const error = { status: 400, name: 'Invalid Email/Password' }
        const forbidden = { status: 403, name: 'Forbidden Access' }

        User.findOne({
            where: { email }
        })
            .then(user => {
                console.log(user);
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    next(error)
                    return
                } else if ( user.role === 'admin') {
                    next(forbidden)
                    return
                } else {
                    const access_token = generateToken(user)
                    res.headers = access_token
                    res.status(200).json({access_token})
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController