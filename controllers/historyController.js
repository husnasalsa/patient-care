const { History } = require('../models')
class historyController {
    static createHistory(req, res) {
        const { idUser, idDokter, waktu } = req.body
       History.create({
            idUser, 
            idDokter, 
            waktu
        })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getAllHistory(req, res) {
        const authUser = res.locals.user
        History.findAll({
            where: {
                idUser: parseInt(authUser.id)
            },
          })
            .then(result => {
                let response = {
                    "statusCode": 200,
                    "data": result
                }
                res.status(200).json(response)
            })
            .catch(err => {
                let response = {
                    "statusCode": 500,
                    "error": err
                }
                res.status(500).json(response)
            })
    }
    static getHistoryPagination(req, res) {
        const authUser = res.locals.user
        const page = req.params.page
        const limit = 3
        History.findAndCountAll({
            where: {idUser: authUser.id},
            order: ['createdAt'],
            limit: limit,
            offset: limit * (page - 1),
        })
            .then((result) => {
                let response = {
                    "statusCode": 200,
                    "data": result
                }
                res.status(200).json(response)
            })
            .catch(err => {
                let response = {
                    "statusCode": 500,
                    "error": err
                }
                res.status(500).json(response)
            })
    }
}
module.exports = historyController