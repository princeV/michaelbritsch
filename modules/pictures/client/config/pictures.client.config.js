'use strict';

// Configuring the Pictures module
angular.module('pictures').run(['Menus',
	function(Menus) {
		// Add the Pictures dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Bilder',
			isPublic: true,
			state: 'pictures',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'pictures', {
			title: 'Bilder anzeigen',
			isPublic: true,
			state: 'pictures.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'pictures', {
			title: 'Bild anlegen',
			isPublic: false,
			roles:['admin', 'user'],
			state: 'pictures.create'
		});
	}
]);
