'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Impressum = mongoose.model('Impressum'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, impressum;

/**
 * Impressum routes tests
 */
describe('Impressum CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Impressum
		user.save(function() {
			impressum = {
				name: 'Impressum Name'
			};

			done();
		});
	});

	it('should be able to save Impressum instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impressum
				agent.post('/api/impressums')
					.send(impressum)
					.expect(200)
					.end(function(impressumSaveErr, impressumSaveRes) {
						// Handle Impressum save error
						if (impressumSaveErr) done(impressumSaveErr);

						// Get a list of Impressums
						agent.get('/api/impressums')
							.end(function(impressumsGetErr, impressumsGetRes) {
								// Handle Impressum save error
								if (impressumsGetErr) done(impressumsGetErr);

								// Get Impressums list
								var impressums = impressumsGetRes.body;

								// Set assertions
								(impressums[0].user._id).should.equal(userId);
								(impressums[0].name).should.match('Impressum Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Impressum instance if not logged in', function(done) {
		agent.post('/api/impressums')
			.send(impressum)
			.expect(403)
			.end(function(impressumSaveErr, impressumSaveRes) {
				// Call the assertion callback
				done(impressumSaveErr);
			});
	});

	it('should not be able to save Impressum instance if no name is provided', function(done) {
		// Invalidate name field
		impressum.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impressum
				agent.post('/api/impressums')
					.send(impressum)
					.expect(400)
					.end(function(impressumSaveErr, impressumSaveRes) {
						// Set message assertion
						(impressumSaveRes.body.message).should.match('Please fill Impressum name');
						
						// Handle Impressum save error
						done(impressumSaveErr);
					});
			});
	});

	it('should be able to update Impressum instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impressum
				agent.post('/api/impressums')
					.send(impressum)
					.expect(200)
					.end(function(impressumSaveErr, impressumSaveRes) {
						// Handle Impressum save error
						if (impressumSaveErr) done(impressumSaveErr);

						// Update Impressum name
						impressum.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Impressum
						agent.put('/api/impressums/' + impressumSaveRes.body._id)
							.send(impressum)
							.expect(200)
							.end(function(impressumUpdateErr, impressumUpdateRes) {
								// Handle Impressum update error
								if (impressumUpdateErr) done(impressumUpdateErr);

								// Set assertions
								(impressumUpdateRes.body._id).should.equal(impressumSaveRes.body._id);
								(impressumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Impressums if not signed in', function(done) {
		// Create new Impressum model instance
		var impressumObj = new Impressum(impressum);

		// Save the Impressum
		impressumObj.save(function() {
			// Request Impressums
			request(app).get('/api/impressums')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Impressum if not signed in', function(done) {
		// Create new Impressum model instance
		var impressumObj = new Impressum(impressum);

		// Save the Impressum
		impressumObj.save(function() {
			request(app).get('/api/impressums/' + impressumObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', impressum.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Impressum instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Impressum
				agent.post('/api/impressums')
					.send(impressum)
					.expect(200)
					.end(function(impressumSaveErr, impressumSaveRes) {
						// Handle Impressum save error
						if (impressumSaveErr) done(impressumSaveErr);

						// Delete existing Impressum
						agent.delete('/api/impressums/' + impressumSaveRes.body._id)
							.send(impressum)
							.expect(200)
							.end(function(impressumDeleteErr, impressumDeleteRes) {
								// Handle Impressum error error
								if (impressumDeleteErr) done(impressumDeleteErr);

								// Set assertions
								(impressumDeleteRes.body._id).should.equal(impressumSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Impressum instance if not signed in', function(done) {
		// Set Impressum user 
		impressum.user = user;

		// Create new Impressum model instance
		var impressumObj = new Impressum(impressum);

		// Save the Impressum
		impressumObj.save(function() {
			// Try deleting Impressum
			request(app).delete('/api/impressums/' + impressumObj._id)
			.expect(403)
			.end(function(impressumDeleteErr, impressumDeleteRes) {
				// Set message assertion
				(impressumDeleteRes.body.message).should.match('User is not authorized');

				// Handle Impressum error error
				done(impressumDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Impressum.remove().exec(function(){
				done();
			});
		});
	});
});
