const { json } = require('sequelize')
const { Doctor } = require('../models')
class DoctorController {
    static getAllDoctor(req, res) {
        Doctor.findAll()
            .then(result => {
                let response = {
                    "statusCode": 200,
                    "data": [json(result)]
                }
                res.status(200).json(response)
            })
            .catch(err => {
                let response = {
                    "statusCode": 500,
                    "error": {
                        "message": "Internal Server Error"
                    }
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
                        "data": [json(result)]
                    }
                    res.status(200).json(result)
                } else {
                    
                }
                
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = DoctorController