'use strict';

//Setting up route
angular.module('appointments').config(['$stateProvider',
	function($stateProvider) {
		// Appointments state routing
		$stateProvider.
		state('appointments', {
			abstract: true,
			url: '/appointments',
			template: '<ui-view/>'
		}).
		state('appointments.list', {
			url: '',
			templateUrl: 'modules/appointments/views/list-appointments.client.view.html'
		}).
		state('appointments.create', {
			url: '/create',
			templateUrl: 'modules/appointments/views/create-appointment.client.view.html'
		}).
		state('appointments.view', {
			url: '/:appointmentId',
			templateUrl: 'modules/appointments/views/view-appointment.client.view.html'
		}).
		state('appointments.edit', {
			url: '/:appointmentId/edit',
			templateUrl: 'modules/appointments/views/edit-appointment.client.view.html'
		});
	}
]);