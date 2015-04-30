'use strict';

module.exports = function(app) {
	var contacts = require('../controllers/contacts.server.controller');
	var contactsPolicy = require('../policies/contacts.server.policy');

	// Contacts Routes
	app.route('/api/contact').all()
		.get(contacts.getContact).all(contactsPolicy.isAllowed)
		.post(contacts.sendEmailHtml);
};
