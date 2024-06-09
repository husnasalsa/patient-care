const { Doctor } = require('../models')
const { QueryTypes, sequelize } = require('sequelize');
class DoctorController {
    static async getAllDoctor(req, res) {
        await Doctor.findAll()
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
    static async getDoctorById(req, res) {
        let id = req.params.id
        if (id) {
            await Doctor.findByPk(id)
            .then(result => {
                if (result) {
                    let response = {
                        "statusCode": 200,
                        "data": result
                    }
                    return res.status(200).json(response)
                } else {
                    let response = {
                        "error": `Data with id '${id}' is not found` 
                    }
                    return (res.status(404).json(response))
                }
            })
            .catch(err => {
                return res.status(500).json(err)
            })
        } else {
            let err = {
                name: 'Bad Request',
                msg: 'Invalid Input'
            }
            return res.status(400).json(err)
        }
    }
    static async getDoctorScheduleFilterByDay(req, res) {
        const day = req.body.day
        const dayofweek = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
            if (dayofweek.includes(day)) {
                await Doctor.sequelize.query(`select * FROM "Doctors" AS "Doctor" WHERE "Doctor"."id" in 
                (SELECT "idDokter" FROM "Schedules" AS "Schedule" WHERE "Schedule"."hari" = '${day}')`, {
                    type: QueryTypes.SELECT,
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
                        "error": err
                    }
                    return res.status(500).json(response)
                })
                } else {
                    return res.status(400).json({
                        error: 'Invalid day name'
                    })
                }
            } 
}
module.exports = DoctorController