'use strict';

// Appointments controller
angular.module('appointments').controller('AppointmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Appointments',
	function($scope, $stateParams, $location, Authentication, Appointments ) {
		$scope.authentication = Authentication;

		// Create new Appointment
		$scope.create = function() {
			// Create new Appointment object
			var appointment = new Appointments ({
				name: this.name,
				description: this.description,
				location: this.location,
				date: this.date
			});
			console.log(appointment);
			console.log(this);

			// Redirect after save
			appointment.$save(function(response) {
				$location.path('appointments/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.location = '';
				$scope.date = new Date();

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Appointment
		$scope.remove = function( appointment ) {
			if ( appointment ) { appointment.$remove();

				for (var i in $scope.appointments ) {
					if ($scope.appointments [i] === appointment ) {
						$scope.appointments.splice(i, 1);
					}
				}
			} else {
				$scope.appointment.$remove(function() {
					$location.path('appointments');
				});
			}
		};

		// Update existing Appointment
		$scope.update = function() {
			var appointment = $scope.appointment ;

			appointment.$update(function() {
				$location.path('appointments/' + appointment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Appointments
		$scope.find = function() {
			$scope.appointments = Appointments.query();
		};

		// Find existing Appointment
		$scope.findOne = function() {
			$scope.appointment = Appointments.get({ 
				appointmentId: $stateParams.appointmentId
			});
		};

		//Filter for Appointment in the future:
		$scope.isInFuture = function(appointment){
			//date format in mongoose: yyyy-mm-dd
			var mongoDate =  new Date(appointment.date);
			var todaysDate = new Date(new Date().setDate(new Date().getDate()-1));
			todaysDate.setHours(0,0,0);

			if(mongoDate > todaysDate){
				return true;
			}
			return false;
		};

		//DATEPICKER SETTINGS
		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

	}


]);
