const bcrypt = require("bcrypt")
require("dotenv").config();
const saltRounds = parseInt(process.env.GARAM)
function hashPassword(userPwd){
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(userPwd, salt)
    return hash
}

function comparePassword(userPwd, hashPwd){
    return bcrypt.compareSync(userPwd, hashPwd)
}

module.exports = { hashPassword, comparePassword }