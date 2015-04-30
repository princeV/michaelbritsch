'use strict';

//Setting up route
angular.module('impressums').config(['$stateProvider',
	function($stateProvider) {
		// Impressums state routing
		$stateProvider.
		state('impressums', {
			abstract: true,
			url: '/impressum',
			template: '<ui-view/>'
		}).
		state('impressum', {
			url: '',
			templateUrl: 'modules/impressums/views/view-impressum.client.view.html'
		});
	}
]);
