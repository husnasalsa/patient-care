const jwt = require("jsonwebtoken")
require("dotenv").config();
const secret = process.env.SECRET_KEY

function generateToken(payload) {
    const token = jwt.sign(payload, secret)
    return token
}

function verifyToken(token) {
    const decoded = jwt.verify(token, secret)
    return decoded
}
module.exports = { generateToken, verifyToken }