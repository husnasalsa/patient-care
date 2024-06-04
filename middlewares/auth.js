const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        const userDecoded = verifyToken(token)
        User.findOne({
            where: {
                id: userDecoded.id,
                email:userDecoded.email
            }
        })
        .then (user => {
            if(!user) {
                throw res.status(401).json({
                    error: `User with id '${userDecoded.id}' is not found`
                })
            }
            res.locals.user = user
            return next()
        })
        .catch(err => {
            throw res.status(401).json(err)
        })
    } catch (err) {
        return res.status(401).json(err)
    }
}
module.exports = auth