'use strict';

describe('Appointments E2E Tests:', function() {
	describe('Test Appointments page', function() {
		it('Should not include new Appointments', function() {
			browser.get('http://localhost:3000/#!/appointments');
			expect(element.all(by.repeater('appointment in appointments')).count()).toEqual(0);
		});
	});
});
