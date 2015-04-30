'use strict';

//Biographies service used to communicate Biographies REST endpoints
angular.module('biographies').factory('Biographies', ['$resource',
	function($resource) {
		return $resource('api/biographies/:biographyId', { biographyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);