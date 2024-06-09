const { History } = require('../models')
class historyController {
    static async createHistory(req, res) {
        const idUser = res.locals.user.id
        const { idDokter, waktu } = req.body
        if (!idUser) {
            return res.status(401).json({error: 'Not Authenticated'})
        } else if (idDokter && waktu) {
            await History.create({
                idUser, 
                idDokter, 
                waktu
            })
                .then(response => {
                    return res.status(201).json(response)
                })
                .catch(err => {
                    return res.status(500).json(err)
                })
        } else {
            let err = {
                error: 'Required input not complete'
            }
            return res.status(400).json(err)
        }
    }
    static async getAllHistory(req, res) {
        const authUser = res.locals.user
        await History.findAll({
            where: {
                idUser: parseInt(authUser.id)
            },
          })
            .then(result => {
                let response = {
                    "statusCode": 200,
                    "data": result
                }
                return res.status(200).json(response)
            })
            .catch(err => {
                let response = {
                    "statusCode": 500,
                    "err": err
                }
                return res.status(500).json(response)
            })
    }
    static async getHistoryPagination(req, res) {
        const idUser = res.locals.user.id
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 3;
        const offset = (page - 1) * limit;
        if (!idUser) {
            return res.status(401).json({error: 'Not Authenticated'})
        } else if (page && limit) {
            await History.findAndCountAll({
                where: {idUser: idUser},
                order: ['createdAt'],
                limit: limit,
                offset: offset,
            })
                .then((result) => {
                    let response = {
                        "statusCode": 200,
                        "data": result
                    }
                    return res.status(200).json(response)
                })
                .catch(err => {
                    let response = {
                        "statusCode": 500,
                        "error": err
                    }
                    return res.status(500).json(response)
                })
        } else {
            let err = {
                error: 'Required input not complete'
            }
            return res.status(400).json(err)
        }
        
    }
}
module.exports = historyController