const bcrypt = require("bcrypt")

function hashPassword(userPwd){
    const saltRounds = 5
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(userPwd, salt)
    return hash
}

function comparePassword(userPwd, hashPwd){
    return bcrypt.compareSync(userPwd, hashPwd)
}

module.exports = { hashPassword, comparePassword }