'use strict';

// Configuring the Biographies module
angular.module('biographies').run(['Menus',
	function(Menus) {
		// Add the Biographies dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Biografie',
			state: 'biographies.view',
			position: 0
		});
	}
]);
