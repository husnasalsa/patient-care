const { json } = require('sequelize')
const { Doctor } = require('../models')
class DoctorController {
    static getAllDoctor(req, res) {
        Doctor.findAll()
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
    static getDoctorById(req, res) {
        let id = req.params.id
        Doctor.findByPk(id)
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
                        "message": `Data with id '${id}' is not found` 
                    }
                    throw(res.status(404).json(response))
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = DoctorController