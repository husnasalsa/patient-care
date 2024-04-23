const { Appointment } = require('../models')
class appointmentController {
    static createAppointment(req, res) {
        const { idUser, idDokter, waktu, noUrut } = req.body
        Appointment.create({
            idUser, 
            idDokter, 
            waktu, 
            noUrut
        })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getAllAppointment(req, res) {
        Appointment.findAll()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static updateAppointmentById(req, res) {
        let id = req.params.id
        const { idUser, idDokter, waktu, noUrut } = req.body

        Appointment.update({
            idUser, 
            idDokter, 
            waktu, 
            noUrut
        }, {
            where: {
                id
            },
            returning : true
            }
        )
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        
    }
    static deleteAppointmentById(req, res) {
        let id = req.params.id
        Appointment.destroy({
            where: {
                id
            }
        })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = appointmentController