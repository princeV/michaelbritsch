'use strict';

(function() {
	// Impressums Controller Spec
	describe('Impressums Controller Tests', function() {
		// Initialize global variables
		var ImpressumsController,
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

			// Initialize the Impressums controller.
			ImpressumsController = $controller('ImpressumsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Impressum object fetched from XHR', inject(function(Impressums) {
			// Create sample Impressum using the Impressums service
			var sampleImpressum = new Impressums({
				name: 'New Impressum'
			});

			// Create a sample Impressums array that includes the new Impressum
			var sampleImpressums = [sampleImpressum];

			// Set GET response
			$httpBackend.expectGET('api/impressums').respond(sampleImpressums);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.impressums).toEqualData(sampleImpressums);
		}));

		it('$scope.findOne() should create an array with one Impressum object fetched from XHR using a impressumId URL parameter', inject(function(Impressums) {
			// Define a sample Impressum object
			var sampleImpressum = new Impressums({
				name: 'New Impressum'
			});

			// Set the URL parameter
			$stateParams.impressumId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/impressums\/([0-9a-fA-F]{24})$/).respond(sampleImpressum);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.impressum).toEqualData(sampleImpressum);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Impressums) {
			// Create a sample Impressum object
			var sampleImpressumPostData = new Impressums({
				name: 'New Impressum'
			});

			// Create a sample Impressum response
			var sampleImpressumResponse = new Impressums({
				_id: '525cf20451979dea2c000001',
				name: 'New Impressum'
			});

			// Fixture mock form input values
			scope.name = 'New Impressum';

			// Set POST response
			$httpBackend.expectPOST('api/impressums', sampleImpressumPostData).respond(sampleImpressumResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Impressum was created
			expect($location.path()).toBe('/impressums/' + sampleImpressumResponse._id);
		}));

		it('$scope.update() should update a valid Impressum', inject(function(Impressums) {
			// Define a sample Impressum put data
			var sampleImpressumPutData = new Impressums({
				_id: '525cf20451979dea2c000001',
				name: 'New Impressum'
			});

			// Mock Impressum in scope
			scope.impressum = sampleImpressumPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/impressums\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/impressums/' + sampleImpressumPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid impressumId and remove the Impressum from the scope', inject(function(Impressums) {
			// Create new Impressum object
			var sampleImpressum = new Impressums({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Impressums array and include the Impressum
			scope.impressums = [sampleImpressum];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/impressums\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleImpressum);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.impressums.length).toBe(0);
		}));
	});
}());