const epxress = require('express')

const router = epxress.Router();
const appointmentController = require('../controllers/appointmentController')

router.get('/', appointmentController.goToAppointments)
router.get('/microsoft_login', appointmentController.goToAppointmentsMS)

module.exports = router