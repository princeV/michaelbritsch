'use strict';

// Configuring the Appointments module
angular.module('appointments').run(['Menus',
	function(Menus) {
		// Add the Appointments dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Referenzen',
			state: 'appointments',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'appointments', {
			title: 'Referenzen anzeigen',
			state: 'appointments.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'appointments', {
			title: 'Referenz anlegen',
			state: 'appointments.create'
		});
	}
]);
