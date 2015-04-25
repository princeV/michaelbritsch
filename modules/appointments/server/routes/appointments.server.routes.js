'use strict';

module.exports = function(app) {
	var appointments = require('../controllers/appointments.server.controller');
	var appointmentsPolicy = require('../policies/appointments.server.policy');

	// Appointments Routes
	app.route('/api/appointments').all()
		.get(appointments.list).all(appointmentsPolicy.isAllowed)
		.post(appointments.create);

	app.route('/api/appointments/:appointmentId').all(appointmentsPolicy.isAllowed)
		.get(appointments.read)
		.put(appointments.update)
		.delete(appointments.delete);

	// Finish by binding the Appointment middleware
	app.param('appointmentId', appointments.appointmentByID);
};