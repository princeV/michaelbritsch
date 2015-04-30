'use strict';

// Configuring the Pictures module
angular.module('pictures').run(['Menus',
	function(Menus) {
		// Add the Pictures dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Bilder',
			isPublic: true,
			state: 'pictures.slick',
			position: 1
		});
	}
]);
