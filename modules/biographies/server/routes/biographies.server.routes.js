'use strict';

module.exports = function(app) {
	var biographies = require('../controllers/biographies.server.controller');
	var biographiesPolicy = require('../policies/biographies.server.policy');

	// Biographies Routes
	app.route('/api/biographies').all()
		.get(biographies.list).all(biographiesPolicy.isAllowed)
		.post(biographies.create);

	app.route('/api/biographies/:biographyId').all(biographiesPolicy.isAllowed)
		.get(biographies.read)
		.put(biographies.update)
		.delete(biographies.delete);

	// Finish by binding the Biography middleware
	app.param('biographyId', biographies.biographyByID);
};