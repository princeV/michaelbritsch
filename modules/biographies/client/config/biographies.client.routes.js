'use strict';

//Setting up route
angular.module('biographies').config(['$stateProvider',
	function($stateProvider) {
		// Biographies state routing
		$stateProvider.
		state('biographies', {
			abstract: true,
			url: '/biografie',
			template: '<ui-view/>'
		}).
		//state('biographies.list', {
		//	url: '',
		//	templateUrl: 'modules/biographies/views/list-biographies.client.view.html'
		//}).
		state('biographies.create', {
			url: '/anlegen',
			templateUrl: 'modules/biographies/views/create-biography.client.view.html'
		}).
		state('biographies.view', {
			url: '',
			templateUrl: 'modules/biographies/views/view-biography.client.view.html'
		}).
		state('biographies.edit', {
			url: '/:biographyId/bearbeiten',
			templateUrl: 'modules/biographies/views/edit-biography.client.view.html'
		});
	}
]);
