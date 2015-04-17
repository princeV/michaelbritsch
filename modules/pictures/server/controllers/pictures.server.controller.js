'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Picture = mongoose.model('Picture'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Picture
 */
exports.create = function(req, res) {
	var picture = new Picture(req.body);
	picture.user = req.user;

	picture.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(picture);
		}
	});
};

/**
 * Show the current Picture
 */
exports.read = function(req, res) {
	res.jsonp(req.picture);
};

/**
 * Update a Picture
 */
exports.update = function(req, res) {
	var picture = req.picture ;

	picture = _.extend(picture , req.body);

	picture.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(picture);
		}
	});
};

/**
 * Delete an Picture
 */
exports.delete = function(req, res) {
	var picture = req.picture ;

	picture.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(picture);
		}
	});
};

/**
 * List of Pictures
 */
exports.list = function(req, res) { Picture.find().sort('-created').populate('user', 'displayName').exec(function(err, pictures) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pictures);
		}
	});
};

/**
 * Picture middleware
 */
exports.pictureByID = function(req, res, next, id) { Picture.findById(id).populate('user', 'displayName').exec(function(err, picture) {
		if (err) return next(err);
		if (! picture) return next(new Error('Failed to load Picture ' + id));
		req.picture = picture ;
		next();
	});
};