'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your first name'
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your last name'
	},
	street: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your street'
	},
	postalCode: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your postal code'
	},
	city: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your city'
	},
	telephone: {
		type: String,
		trim: true,
		default: ''
	},
	mobile: {
		type: String,
		trim: true,
		default: ''
	},
	fax: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill in your email',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	changed: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Contact', ContactSchema);
