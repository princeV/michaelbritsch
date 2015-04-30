'use strict';

describe('Impressums E2E Tests:', function() {
	describe('Test Impressums page', function() {
		it('Should not include new Impressums', function() {
			browser.get('http://localhost:3000/#!/impressums');
			expect(element.all(by.repeater('impressum in impressums')).count()).toEqual(0);
		});
	});
});
