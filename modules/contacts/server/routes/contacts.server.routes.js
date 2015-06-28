'use strict';

module.exports = function(app) {
	var contacts = require('../controllers/contacts.server.controller');
	var contactsPolicy = require('../policies/contacts.server.policy');

	// Contacts Routes
	app.route('/api/contacts').all(contactsPolicy.isAllowed)
		.get(contacts.list)
		.post(contacts.create);

	app.route('/api/contacts/:contactId').all(contactsPolicy.isAllowed)
		.get(contacts.read)
		.put(contacts.update)
		.delete(contacts.delete);

	app.route('/api/contactform/send')
		.post(contacts.sendEmailHtml);

	// Finish by binding the Contact middleware
	app.param('contactId', contacts.contactById);

};
