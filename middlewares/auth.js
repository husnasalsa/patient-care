const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function auth(req, res, next) {
    const token = req.cookies.token;
    const userDecoded = verifyToken(token)
    await User.findOne({
        where: {
            id: userDecoded.id,
            email:userDecoded.email
        }
    })
    .then (user => {
        if(!user) {
            return res.status(404).json({
                error: `User with id '${userDecoded.id}' is not found`
            })
        }
        res.locals.user = user
        return next()
    })
    .catch(err => {
        return res.status(500).json(err)
    })
}
module.exports = auth