const { Appointment, Schedule, History, Doctor } = require('../models')
const { Op, Sequelize } = require("sequelize");
class appointmentController {
    static async createAppointment(req, res) {
        const { idUser, idDokter, waktu } = req.body
        //Check if schedule available
        const d = new Date(waktu)
        let day = d.getDay()
        let time = d.toLocaleTimeString();
        const dayofweek = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        let schedule = await Schedule.findAll({
            where: {
                idDokter: idDokter,
                hari: dayofweek[day],
                startTime: {
                    [Op.lt]: time,
                },
                endTime: {
                    [Op.gt]: time,
                }
            }
          })
        console.log(schedule)
        let count = await Appointment.sequelize.query(`SELECT count(*) FROM "Appointments" WHERE "idDokter" = '${idDokter}' AND DATE_TRUNC('day', "waktu") = DATE_TRUNC('day', '${d.toISOString().split('T')[0]}'::date)`, {
            type: Sequelize.QueryTypes.SELECT,
          });
        let noUrut = count[0].count++
        //console.log(noUrut)
        if (schedule && noUrut <= schedule[0].kuota) {
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
    static async updateAppointmentById(req, res) {
        let id = req.params.id
        const authUser = res.locals.user
        const { idDokter } = req.body
        const app = await Appointment.findOne({
            where: {
                id: id
            },
        })
        //console.log(app)
        if (authUser.id == app.idUser) {
            Appointment.update({
                idDokter
            }, {
                where: {
                    id: id
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
    static async deleteAppointmentById(req, res) {
        let id = req.params.id
        const authUser = res.locals.user
        const app = await Appointment.findOne({
            where: {
                id: id
            },
        })
        //console.log(app)
        const biaya = await Doctor.findOne({
            where: {
                id: app.idDokter
            },
        })
        //console.log(biaya)
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
                History.create({
                    idUser: app.idUser,
                    idDokter: app.idDokter,
                    waktu: app.waktu,
                    biayaKonsultasi: biaya.hargaKonsultasi
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