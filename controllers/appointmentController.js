const { Appointment } = require('../models')
class appointmentController {
    static createAppointment(req, res) {
        const { idUser, idDokter, waktu, keterangan } = req.body

        Appointment.create({
            idUser, 
            idDokter, 
            waktu, 
            keterangan
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getAllAppointment(req, res) {
        Appointment.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static updateAppointmentById(req, res) {
        let id = req.params.id
        const { idUser, idDokter, waktu, keterangan } = req.body

        Appointment.update({
            idUser, 
            idDokter, 
            waktu, 
            keterangan
        }, {
            where: {
                id
            },
            returning : true
            }
        )
            .then(result => {
                res.status(201).json(result)
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
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = appointmentController