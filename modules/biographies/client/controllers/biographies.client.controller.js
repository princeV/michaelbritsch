'use strict';

// Biographies controller
angular.module('biographies').controller('BiographiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Biographies',
	function($scope, $stateParams, $location, Authentication, Biographies ) {
		$scope.authentication = Authentication;

		// Create new Biography
		$scope.create = function() {
			// Create new Biography object
			var biography = new Biographies ({
				name: this.name,
				htmlContent: this.htmlContent
			});

			// Redirect after save
			biography.$save(function(response) {
				$location.path('biographies/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.htmlContent = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Biography
		$scope.remove = function( biography ) {
			if ( biography ) { biography.$remove();

				for (var i in $scope.biographies ) {
					if ($scope.biographies [i] === biography ) {
						$scope.biographies.splice(i, 1);
					}
				}
			} else {
				$scope.biography.$remove(function() {
					$location.path('biographies');
				});
			}
		};

		// Update existing Biography
		$scope.update = function() {
			var biography = $scope.biography ;
			biography.changed = new Date();

			biography.$update(function() {
				$location.path('biographies/' + biography._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Biographies
		$scope.find = function() {
			$scope.biographies = Biographies.query(function(biographyResults){
				//set the first to be the active biography:
				$scope.biography = biographyResults[0];
			});



		};

		// Find existing Biography
		$scope.findOne = function() {
			$scope.biography = Biographies.get({ 
				biographyId: $stateParams.biographyId
			});
		};
	}
]);
