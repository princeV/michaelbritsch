'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Biography Schema
 */
var BiographySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Biography name',
		trim: true
	},
	htmlContent:{
		type: String,
		default: '',
		required: 'Please fill Biography content',
		trim: true
	},
	changed: {
		type: Date,
		default: Date.now
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

mongoose.model('Biography', BiographySchema);
