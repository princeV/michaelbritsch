'use strict';

//Setting up route
angular.module('biographies').config(['$stateProvider',
	function($stateProvider) {
		// Biographies state routing
		$stateProvider.
		state('biographies', {
			abstract: true,
			url: '/biographies',
			template: '<ui-view/>'
		}).
		state('biographies.list', {
			url: '',
			templateUrl: 'modules/biographies/views/list-biographies.client.view.html'
		}).
		state('biographies.create', {
			url: '/create',
			templateUrl: 'modules/biographies/views/create-biography.client.view.html'
		}).
		state('biographies.view', {
			url: '/view',
			templateUrl: 'modules/biographies/views/view-biography.client.view.html'
		}).
		state('biographies.edit', {
			url: '/:biographyId/edit',
			templateUrl: 'modules/biographies/views/edit-biography.client.view.html'
		});
	}
]);
