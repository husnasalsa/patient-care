const { Schedule } = require('../models')
const { Op } = require("sequelize");
class ScheduleController {
    static getAllSchedule(req, res) {
        Schedule.findAll()
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
    static getScheduleByDoctorId(req, res) {
        let id = req.params.id
        Schedule.findAll({
            where: {
                idDokter: id
            },
          })
            .then(result => {
                if (result) {
                    let response = {
                        "statusCode": 200,
                        "data": result
                    }
                    res.status(200).json(response)
                } else {
                    let response = {
                        "statusCode": 404,
                        "message": `Schedule with id '${id}' is not found` 
                    }
                    throw(res.status(404).json(response))
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getScheduleFilterByDay(req, res) {
        const day = req.body.day
        Schedule.findAll({
            where: {
                [Op.and]: [{hari: day}, { kuota: {[Op.gt]: 0}}]
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
}
module.exports = ScheduleController