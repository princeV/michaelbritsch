'use strict';

//Setting up route
angular.module('contacts').config(['$stateProvider',
	function($stateProvider) {
		// Contacts state routing
		$stateProvider.
		state('contacts', {
			abstract: true,
			url: '/contact',
			template: '<ui-view/>'
		}).
		state('contact', {
			url: '',
			templateUrl: 'modules/contacts/views/view-contact.client.view.html'
		});
	}
]);
