const { Appointment, Schedule, History, Doctor } = require('../models')
const { Op, Sequelize } = require("sequelize");
class appointmentController {
    static async createAppointment(req, res) {
        const { idDokter, waktu } = req.body
        const idUser = res.locals.user.id
        if (new Date(waktu) < Date.now()) {
            return res.status(400).json({error: 'Appointment time is invalid'})
        }
        if (!idUser) {
            return res.status(401).json({error: 'Not Authenticated'})
        } else if (idDokter && waktu) {
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
            let count = await Appointment.sequelize.query(`SELECT (count(*)+1) FROM "Appointments" 
            WHERE "idDokter" = '${idDokter}' 
            AND DATE_TRUNC('day', "waktu") = DATE_TRUNC('day', '${d.toISOString().split('T')[0]}'::date)`, {
                type: Sequelize.QueryTypes.SELECT,
            });
            let noUrut = count[0].count++
            if (schedule && noUrut <= schedule[0].kuota) {
                Appointment.create({
                    idUser, 
                    idDokter, 
                    waktu,
                    noUrut
                })
                    .then(response => {
                        return res.status(201).json(response)
                    })
                    .catch(err => {
                        return res.status(500).json(err)
                    })
            } else {
                let err = {
                    error: `Doctor Schedule in ${dayofweek[day]} at ${time} is not found`
                }
                return res.status(404).json(err)
            }
        } else {
            let err = {
                error: 'Required input not complete'
            }
            res.status(400).json(err)
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
                return res.status(200).json(response)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    static getAppointmentById(req, res) {
        const authUser = res.locals.user
        const id = req.params.id
        if (!authUser) {
            return res.status(401).json({error: 'Not Authenticated'})
        } else {
            Appointment.findOne({
                where: {
                    id: id
                },
                })
                .then(response => {
                    if (response) {
                        return res.status(200).json(response)
                    }
                    else {
                        return res.status(404).json({error: 'Appointment not found'})
                    }
                    
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    }
    static async updateAppointmentById(req, res) {
        let id = req.params.id
        const authUser = res.locals.user
        const { waktu } = req.body
        if (new Date(waktu) < Date.now()) {
            return res.status(400).json({error: 'Appointment time is invalid'})
        }
        if (id && waktu) {
            const app = await Appointment.findOne({
                where: {
                    id: id
                },
            })
            if (!app) return res.status(404).json({error: 'Appointment is not found'})
            if (authUser?.id == app?.idUser) {
                const d = new Date(waktu)
                let day = d.getDay()
                let time = d.toLocaleTimeString();
                const dayofweek = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
                let schedule = await Schedule.findAll({
                    where: {
                        idDokter: app.idDokter,
                        hari: dayofweek[day],
                        startTime: {
                            [Op.lt]: time,
                        },
                        endTime: {
                            [Op.gt]: time,
                        }
                    }
                })
                let count = await Appointment.sequelize.query(`SELECT count(*) FROM "Appointments" WHERE "idDokter" = '${app.idDokter}' AND DATE_TRUNC('day', "waktu") = DATE_TRUNC('day', '${d.toISOString().split('T')[0]}'::date)`, {
                    type: Sequelize.QueryTypes.SELECT,
                });
                let noUrut = count[0].count++
                if (schedule && noUrut <= schedule[0]?.kuota){
                    Appointment.update({
                        waktu
                    }, {
                        where: {
                            id: id
                        },
                        returning : true
                        }
                    )
                        .then(response => {
                           return res.status(200).json(response)
                        })
                        .catch(err => {
                           return res.status(500).json(err)
                    })
                } else {
                    let err = {
                        error: `Doctor Schedule in ${dayofweek[day]} at ${time} is not found`
                    }
                    return res.status(404).json(err)
                }
            } else {
                let response = {
                    error: `User with id '${authUser.id}' is not authorized to update appointment` 
                }
                return res.status(403).json(response)
            }
        } else {
            let err = {
                error: 'Required input not complete'
            }
            return res.status(400).json(err)
        }
    }
    static async deleteAppointmentById(req, res) {
        let id = req.params.id
        const authUser = res.locals.user
        if (id) {
            const app = await Appointment.findOne({
                where: {
                    id: id
                },
            })
            if (app) {
                if (app.idUser == authUser.id) {
                    const biaya = await Doctor.findOne({
                        where: {
                            id: app.idDokter
                        },
                    })
                    Appointment.destroy({
                        where: {
                            id
                        }
                    })
                        .then(response => {
                            return res.status(200).json(response)
                        })
                        .catch(err => {
                            return res.status(500).json(err)
                        })
                    History.create({
                        idUser: app.idUser,
                        idDokter: app.idDokter,
                        waktu: app.waktu,
                        biayaKonsultasi: biaya.hargaKonsultasi
                    })
                } else {
                    let response = {
                        "error": `User with id '${authUser.id}' is not authorized to delete appointment '${id}'` 
                    }
                    return res.status(401).json(response)
                }
            } else {
                let response = {
                    "error": `Appointment with id '${id}' is not found` 
                }
                return res.status(404).json(response)      
            }
        } else {
            let err = {
                error: 'Required input not complete'
            }
            res.status(400).json(err)
        }
    }
}
module.exports = appointmentController