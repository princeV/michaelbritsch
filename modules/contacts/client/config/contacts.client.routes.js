'use strict';

//Setting up route
angular.module('contacts').config(['$stateProvider',
	function($stateProvider) {
		// Contacts state routing
		$stateProvider.
		state('contact', {
			abstract: true,
			url: '/kontakt',
			template: '<ui-view/>'
		}).
		state('contact.view', {
			url: '',
			templateUrl: 'modules/contacts/views/view-contact.client.view.html'
		}).
		state('contact.create', {
			url: '/anlegen',
			templateUrl: 'modules/contacts/views/create-contact.client.view.html'
		}).
		state('contact.edit', {
			url: '/:contactId/bearbeiten',
			templateUrl: 'modules/contacts/views/edit-contact.client.view.html'
		});
	}
]);
