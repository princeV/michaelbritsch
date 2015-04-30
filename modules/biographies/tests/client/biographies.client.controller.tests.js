'use strict';

(function() {
	// Biographies Controller Spec
	describe('Biographies Controller Tests', function() {
		// Initialize global variables
		var BiographiesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Biographies controller.
			BiographiesController = $controller('BiographiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Biography object fetched from XHR', inject(function(Biographies) {
			// Create sample Biography using the Biographies service
			var sampleBiography = new Biographies({
				name: 'New Biography'
			});

			// Create a sample Biographies array that includes the new Biography
			var sampleBiographies = [sampleBiography];

			// Set GET response
			$httpBackend.expectGET('api/biographies').respond(sampleBiographies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.biographies).toEqualData(sampleBiographies);
		}));

		it('$scope.findOne() should create an array with one Biography object fetched from XHR using a biographyId URL parameter', inject(function(Biographies) {
			// Define a sample Biography object
			var sampleBiography = new Biographies({
				name: 'New Biography'
			});

			// Set the URL parameter
			$stateParams.biographyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/biographies\/([0-9a-fA-F]{24})$/).respond(sampleBiography);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.biography).toEqualData(sampleBiography);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Biographies) {
			// Create a sample Biography object
			var sampleBiographyPostData = new Biographies({
				name: 'New Biography'
			});

			// Create a sample Biography response
			var sampleBiographyResponse = new Biographies({
				_id: '525cf20451979dea2c000001',
				name: 'New Biography'
			});

			// Fixture mock form input values
			scope.name = 'New Biography';

			// Set POST response
			$httpBackend.expectPOST('api/biographies', sampleBiographyPostData).respond(sampleBiographyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Biography was created
			expect($location.path()).toBe('/biographies/' + sampleBiographyResponse._id);
		}));

		it('$scope.update() should update a valid Biography', inject(function(Biographies) {
			// Define a sample Biography put data
			var sampleBiographyPutData = new Biographies({
				_id: '525cf20451979dea2c000001',
				name: 'New Biography'
			});

			// Mock Biography in scope
			scope.biography = sampleBiographyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/biographies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/biographies/' + sampleBiographyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid biographyId and remove the Biography from the scope', inject(function(Biographies) {
			// Create new Biography object
			var sampleBiography = new Biographies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Biographies array and include the Biography
			scope.biographies = [sampleBiography];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/biographies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBiography);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.biographies.length).toBe(0);
		}));
	});
}());