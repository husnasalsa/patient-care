const router = require('express').Router(); 

const userController = require('../controllers/userController')
const doctorController = require('../controllers/doctorController')
const appointmentController = require('../controllers/appointmentController');
const scheduleController = require('../controllers/scheduleController');
const historyController = require('../controllers/historyController');
const auth = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/doctor', doctorController.getAllDoctor)
router.get('/doctor/:id', doctorController.getDoctorById)
router.get('/doctor-filter', doctorController.getDoctorScheduleFilterByDay)

router.get('/schedule', scheduleController.getAllSchedule)
router.get('/schedule/:id', scheduleController.getScheduleByDoctorId)

router.post('/appointment', auth, appointmentController.createAppointment)
router.get('/appointment', auth, appointmentController.getAllAppointment)
router.get('/appointment/:id', auth, appointmentController.getAppointmentById)
router.put('/appointment/:id', auth, appointmentController.updateAppointmentById)
router.delete('/appointment/:id', auth, appointmentController.deleteAppointmentById)

router.post('/history', auth, historyController.createHistory)
router.get('/history', auth, historyController.getAllHistory)
router.get('/history/:page', auth, historyController.getHistoryPagination)
module.exports = router;