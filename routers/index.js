const router = require('express').Router(); 

const userController = require('../controllers/userController')
const doctorController = require('../controllers/doctorController')
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/doctor', doctorController.getAllDoctor)
router.get('/doctor/:id', doctorController.getDoctorById)

router.post('/appointment', appointmentController.createAppointment)
router.get('/appointment', appointmentController.getAllAppointment)
router.put('/appointment:id', appointmentController.updateAppointmentById)
router.delete('/appointment:id', appointmentController.deleteAppointmentById)

module.exports = router;