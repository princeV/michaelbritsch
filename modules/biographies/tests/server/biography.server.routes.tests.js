'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Biography = mongoose.model('Biography'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, biography;

/**
 * Biography routes tests
 */
describe('Biography CRUD tests', function() {
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

		// Save a user to the test db and create new Biography
		user.save(function() {
			biography = {
				name: 'Biography Name'
			};

			done();
		});
	});

	it('should be able to save Biography instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biography
				agent.post('/api/biographies')
					.send(biography)
					.expect(200)
					.end(function(biographySaveErr, biographySaveRes) {
						// Handle Biography save error
						if (biographySaveErr) done(biographySaveErr);

						// Get a list of Biographies
						agent.get('/api/biographies')
							.end(function(biographiesGetErr, biographiesGetRes) {
								// Handle Biography save error
								if (biographiesGetErr) done(biographiesGetErr);

								// Get Biographies list
								var biographies = biographiesGetRes.body;

								// Set assertions
								(biographies[0].user._id).should.equal(userId);
								(biographies[0].name).should.match('Biography Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Biography instance if not logged in', function(done) {
		agent.post('/api/biographies')
			.send(biography)
			.expect(403)
			.end(function(biographySaveErr, biographySaveRes) {
				// Call the assertion callback
				done(biographySaveErr);
			});
	});

	it('should not be able to save Biography instance if no name is provided', function(done) {
		// Invalidate name field
		biography.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biography
				agent.post('/api/biographies')
					.send(biography)
					.expect(400)
					.end(function(biographySaveErr, biographySaveRes) {
						// Set message assertion
						(biographySaveRes.body.message).should.match('Please fill Biography name');
						
						// Handle Biography save error
						done(biographySaveErr);
					});
			});
	});

	it('should be able to update Biography instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biography
				agent.post('/api/biographies')
					.send(biography)
					.expect(200)
					.end(function(biographySaveErr, biographySaveRes) {
						// Handle Biography save error
						if (biographySaveErr) done(biographySaveErr);

						// Update Biography name
						biography.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Biography
						agent.put('/api/biographies/' + biographySaveRes.body._id)
							.send(biography)
							.expect(200)
							.end(function(biographyUpdateErr, biographyUpdateRes) {
								// Handle Biography update error
								if (biographyUpdateErr) done(biographyUpdateErr);

								// Set assertions
								(biographyUpdateRes.body._id).should.equal(biographySaveRes.body._id);
								(biographyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Biographies if not signed in', function(done) {
		// Create new Biography model instance
		var biographyObj = new Biography(biography);

		// Save the Biography
		biographyObj.save(function() {
			// Request Biographies
			request(app).get('/api/biographies')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Biography if not signed in', function(done) {
		// Create new Biography model instance
		var biographyObj = new Biography(biography);

		// Save the Biography
		biographyObj.save(function() {
			request(app).get('/api/biographies/' + biographyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', biography.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Biography instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Biography
				agent.post('/api/biographies')
					.send(biography)
					.expect(200)
					.end(function(biographySaveErr, biographySaveRes) {
						// Handle Biography save error
						if (biographySaveErr) done(biographySaveErr);

						// Delete existing Biography
						agent.delete('/api/biographies/' + biographySaveRes.body._id)
							.send(biography)
							.expect(200)
							.end(function(biographyDeleteErr, biographyDeleteRes) {
								// Handle Biography error error
								if (biographyDeleteErr) done(biographyDeleteErr);

								// Set assertions
								(biographyDeleteRes.body._id).should.equal(biographySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Biography instance if not signed in', function(done) {
		// Set Biography user 
		biography.user = user;

		// Create new Biography model instance
		var biographyObj = new Biography(biography);

		// Save the Biography
		biographyObj.save(function() {
			// Try deleting Biography
			request(app).delete('/api/biographies/' + biographyObj._id)
			.expect(403)
			.end(function(biographyDeleteErr, biographyDeleteRes) {
				// Set message assertion
				(biographyDeleteRes.body.message).should.match('User is not authorized');

				// Handle Biography error error
				done(biographyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Biography.remove().exec(function(){
				done();
			});
		});
	});
});
