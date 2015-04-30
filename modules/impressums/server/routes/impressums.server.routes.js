'use strict';

module.exports = function(app) {
	var impressumsPolicy = require('../policies/impressums.server.policy');

	// Impressums Routes
	app.route('/api/impressums').all(impressumsPolicy.isAllowed);
};
