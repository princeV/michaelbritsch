'use strict';

describe('Biographies E2E Tests:', function() {
	describe('Test Biographies page', function() {
		it('Should not include new Biographies', function() {
			browser.get('http://localhost:3000/#!/biographies');
			expect(element.all(by.repeater('biography in biographies')).count()).toEqual(0);
		});
	});
});
