'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Picture Schema
 */
var PictureSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Picture name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Picture', PictureSchema);