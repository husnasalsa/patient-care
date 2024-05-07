const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
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
                console.log(err)
                res.status(500).json(err)
            })
    }
    static login(req, res) {
        const { email, password } = req.body
        let options = {
            maxAge: 1000 * 60 * 15, // 15 minutes
            httpOnly: true,
            sameSite: "none",
            secure: true
        }
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) {
                    //console.log("NOT USER")
                    throw {
                        name: "Login Error",
                        devMessage: `User with e-mail "${email}" not found`
                    }
                }
                const correctPass = comparePassword(password, user.password)
                if (!correctPass) {
                    //console.log("PASS WRONG")
                    throw {
                        name: "Login Error",
                        devMessage: `Email and username doesn't match`
                    }
                }
                let payload = {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
                const token = generateToken(payload)
                delete user.password
                res.cookie('token', token, options)
                res.status(200).json({token : token})
            })
            .catch(err => {
                console.log(err)
                res.status(401).json(err)})
    }
    static logout(req, res) {
        delete res.locals.user
        let response = {
            msg: 'Log out berhasil. Token dihapus',
        }
        return res.clearCookie("token").status(200).json(response)
    }
}
module.exports = userController