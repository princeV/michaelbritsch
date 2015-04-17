'use strict';

// Configuring the Pictures module
angular.module('pictures').run(['Menus',
	function(Menus) {
		// Add the Pictures dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Pictures',
			isPublic: true,
			state: 'pictures',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'pictures', {
			title: 'List Pictures',
			isPublic: true,
			state: 'pictures.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'pictures', {
			title: 'Create Picture',
			isPublic: false,
			roles:['test'],
			state: 'pictures.create'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'pictures', {
			title: 'TEst Picture',
			isPublic: false,
			roles:['user'],
			state: 'pictures.create'
		});
	}
]);
