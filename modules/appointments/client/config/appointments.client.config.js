'use strict';

// Configuring the Appointments module
angular.module('appointments').run(['Menus',
	function(Menus) {
		// Add the Appointments dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Referenzen',
			state: 'appointments.list',
			position: 3
		});
	}
]);
