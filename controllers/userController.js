const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { User } = require('../models')
class userController {
    static async register(req, res) {
        const {username, email, password, phoneNumber} = req.body
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
        } 
        if (password.length < 5 || password.length > 20) {
        return res.status(400).json({ error: 'Password must be between 5 to 20 character long.' });
        }
        if (username && email && password && phoneNumber) {
            await User.create({
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
        } else {
            return res.status(400).json({
                error: 'Required input not complete'
            })
        }
    }
    static async login(req, res) {
        const { email, password } = req.body
        if (email && password) {
            let options = {
                maxAge: 1000 * 60 * 60, // 60 minutes
                httpOnly: true,
                sameSite: "none",
                secure: true
                
            }
            await User.findOne({
                where: {
                    email
                }
            })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({
                            error: `User with e-mail "${email}" not found`
                        })
                    }
                    const correctPass = comparePassword(password, user.password)
                    if (!correctPass) {
                        return res.status(401).json({
                            error: `Email and username doesn't match`
                        })
                    }
                    let payload = {
                        id: user.id,
                        email: user.email,
                        username: user.username
                    }
                    const token = generateToken(payload)
                    delete user.password
                    res.cookie('token', token, options)
                    return res.status(200).json(
                        { token : token,
                          id: user.id,
                          email: user.email,
                          username: user.username })
                })
                .catch(err => {
                    return res.data.status(500).json(err)})
        } else {
            return res.status(400).json({
                error: 'Required input not complete'
            })
        }
    }
}
module.exports = userController