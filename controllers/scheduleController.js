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
                return res.status(200).json(response)
            })
            .catch(err => {
                let response = {
                    "statusCode": 500,
                    "error": err
                }
                return res.status(500).json(response)
            })
    }
    static getScheduleByDoctorId(req, res) {
        let id = req.params.id
        if (id) {
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
                            "message": `Schedule of doctor with id '${id}' is not found` 
                        }
                        return (res.status(404).json(response))
                    }
                })
                .catch(err => {
                    return res.status(500).json(err)
                })
        }
    }
    
}
module.exports = ScheduleController