const { User } = require('../models')
class userController {
    static register(req, res) {
        const {username, email, password, phoneNumber} = req.body
        User.create({
            username, 
            email, 
            password, 
            phoneNumber
        })
            .then(result => {
                let response = {
                    id: result.id,
                    email: result.email,
                    username: result.username,
                    phoneNumber: result.phoneNumber
                }
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static login(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) {
                    throw {
                        name: "Login Error",
                        devMessage: `User with e-mail "${email}" not found`
                    }
                }
                const correctPass = comparePassword(password, user.password)
                if (!correctPass) {
                    throw {
                        name: "Login Error",
                        devMessage: `Email and username doesn't match`
                    }
                }
                let response = {
                    id: result.id,
                    email: result.email,
                    username: result.username,
                    phoneNumber: result.phoneNumber
                }
                res.status(201).json(response)
            })
            .catch(res.status(401).json(err))
    }
}
module.exports = userController