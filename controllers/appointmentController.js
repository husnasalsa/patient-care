const { Appointment, Schedule } = require('../models')
class appointmentController {
    static createAppointment(req, res) {
        const { idUser, idDokter, waktu, noUrut } = req.body
        //Check if schedule available
        //WIP
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
        const authUser = res.locals.user
        Appointment.findAll({
            where: {
                idUser: authUser.id
            },
          })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getAppointmentById(req, res) {
        const authUser = res.locals.user
        const id = req.params.id
        Appointment.findOne({
            where: {
                idUser: authUser.id,
                id: id
            },
          })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static updateAppointmentById(req, res) {
        let id = req.params.id
        const authUser = res.locals.user
        const { idUser, idDokter, waktu, noUrut } = req.body
        if (authUser.id == idUser) {
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
        } else {
            let response = {
                "message": `User with id '${authUser.id}' is not authorized to update appointment` 
            }
            return res.status(403).json(response)
        }
    }
    static deleteAppointmentById(req, res) {
        let id = req.params.id
        const authUser = res.locals.user
        const app = Appointment.findOne({
            where: {
                id: id
            },
        })
        if (app) {
            if (app.idUser == authUser.id) {
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
            } else {
                let response = {
                    "message": `User with id '${authUser.id}' is not authorized to update appointment '${id}'` 
                }
                return res.status(403).json(response)
            }
        } else {
            let response = {
                "message": `Appointment with id '${id}' is not found` 
            }
            return res.status(404).json(response)      
        }
    }
}
module.exports = appointmentController