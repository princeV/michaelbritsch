'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Biography = mongoose.model('Biography'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Biography
 */
exports.create = function(req, res) {
	var biography = new Biography(req.body);
	biography.user = req.user;

	biography.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biography);
		}
	});
};

/**
 * Show the current Biography
 */
exports.read = function(req, res) {
	res.jsonp(req.biography);
};

/**
 * Update a Biography
 */
exports.update = function(req, res) {
	var biography = req.biography ;

	biography = _.extend(biography , req.body);

	biography.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biography);
		}
	});
};

/**
 * Delete an Biography
 */
exports.delete = function(req, res) {
	var biography = req.biography ;

	biography.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biography);
		}
	});
};

/**
 * List of Biographies
 */
exports.list = function(req, res) { Biography.find().sort('-created').populate('user', 'displayName').exec(function(err, biographies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(biographies);
		}
	});
};

/**
 * Biography middleware
 */
exports.biographyByID = function(req, res, next, id) { Biography.findById(id).populate('user', 'displayName').exec(function(err, biography) {
		if (err) return next(err);
		if (! biography) return next(new Error('Failed to load Biography ' + id));
		req.biography = biography ;
		next();
	});
};