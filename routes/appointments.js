const epxress = require('express')

const router = epxress.Router();
const appointmentController = require('../controllers/appointmentController')

router.get('/', appointmentController.goToAppointments)

module.exports = router