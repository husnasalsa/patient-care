class historyController {
    static createHistory(req, res) {
        const { idUser, idDokter, waktu } = req.body
        Appointment.create({
            idUser, 
            idDokter, 
            waktu
        })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
module.exports = historyController