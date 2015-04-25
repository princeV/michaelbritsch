'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Appointment = mongoose.model('Appointment'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Appointment
 */
exports.create = function(req, res) {
	var appointment = new Appointment(req.body);
	appointment.user = req.user;

	appointment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appointment);
		}
	});
};

/**
 * Show the current Appointment
 */
exports.read = function(req, res) {
	res.jsonp(req.appointment);
};

/**
 * Update a Appointment
 */
exports.update = function(req, res) {
	var appointment = req.appointment ;

	appointment = _.extend(appointment , req.body);

	appointment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appointment);
		}
	});
};

/**
 * Delete an Appointment
 */
exports.delete = function(req, res) {
	var appointment = req.appointment ;

	appointment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appointment);
		}
	});
};

/**
 * List of Appointments
 */
exports.list = function(req, res) { Appointment.find().sort('date').populate('user', 'displayName').exec(function(err, appointments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appointments);
		}
	});
};

/**
 * Appointment middleware
 */
exports.appointmentByID = function(req, res, next, id) { Appointment.findById(id).populate('user', 'displayName').exec(function(err, appointment) {
		if (err) return next(err);
		if (! appointment) return next(new Error('Failed to load Appointment ' + id));
		req.appointment = appointment ;
		next();
	});
};
