const chai = require('chai'); // Assertion library for testing
const sinon = require('sinon'); // Library for creating spies, stubs, and mocks
const expect = chai.expect; // Chai's assertion style
const request = require('supertest'); // Library for testing HTTP requests
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens
const User = require('../core/models/user.model'); // Importing the User model
const app = require('../app'); // Importing the Express app

// Main describe block for Authentication Routes
describe('Authentication Routes', function() {
  let sandbox;

  // Create a new sandbox before each test to isolate mocks/stubs
  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  // Restore the sandbox after each test to clean up mocks/stubs
  afterEach(function() {
    sandbox.restore();
  });

  // Test block for the Signup route
  describe('POST /api/auth/signup', function() {
    
    // Test case for successful user signup
    it('should successfully create a new user with valid input', function(done) {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        gender: 'other',
        telephone: '+250123456789',
        password: 'strongpassword123'
      };

      // Stub `User.findOne` to simulate a new user (no existing user found)
      sandbox.stub(User, 'findOne').resolves(null);

      // Stub `bcrypt.hash` to return a hashed password
      const hashStub = sandbox.stub(bcrypt, 'hash').resolves('hashedpassword');

      // Stub `User.prototype.save` to simulate saving the user to the database
      sandbox.stub(User.prototype, 'save').resolves(userData);

      // Simulate a POST request to the signup route
      request(app)
        .post('/api/auth/signup')
        .send(userData)
        .end(function(err, response) {
          expect(response.status).to.equal(201); // Expect HTTP status 201 (Created)
          expect(response.body.message).to.include('success'); // Expect success message
          sinon.assert.calledWith(hashStub, userData.password, 10); // Assert that bcrypt was called with the correct arguments
          done(); // Mark the test as done
        });
    });

    // Test case for signup failure when username already exists
    it('should return 400 if username already exists', function(done) {
      const userData = {
        username: 'existinguser',
        email: 'test@example.com',
        gender: 'other',
        telephone: '+250123456789',
        password: 'strongpassword123'
      };

      // Stub `User.findOne` to simulate an existing user
      sandbox.stub(User, 'findOne').resolves({ username: 'existinguser' });

      // Simulate a POST request to the signup route
      request(app)
        .post('/api/auth/signup')
        .send(userData)
        .end(function(err, response) {
          expect(response.status).to.equal(400); // Expect HTTP status 400 (Bad Request)
          expect(response.body.message).to.equal('Username is already in use'); // Expect appropriate error message
          done(); // Mark the test as done
        });
    });
  });

  // Test block for the Login route
  describe('POST /auth/login', function() {
    
    // Test case for successful login with valid credentials
    it('should successfully login with correct credentials', function(done) {
      const userData = {
        email: 'test@example.com',
        password: 'correctpassword'
      };

      // Mock user object to simulate a found user in the database
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        email: userData.email,
        password: 'hashedpassword' // Simulated hashed password
      };

      // Stub `User.findOne` to simulate finding a user in the database
      sandbox.stub(User, 'findOne').resolves(mockUser);

      // Stub `bcrypt.compare` to simulate successful password comparison
      sandbox.stub(bcrypt, 'compare').resolves(true);

      // Stub `jwt.sign` to simulate generating a JWT token
      sandbox.stub(jwt, 'sign').returns('mocktoken');

      // Simulate a POST request to the login route
      request(app)
        .post('/api/auth/login')
        .send(userData)
        .end(function(err, response) {
          expect(response.status).to.equal(200); // Expect HTTP status 200 (OK)
          expect(response.body.message).to.equal('Successfully logged in'); // Expect success message
          done(); // Mark the test as done
        });
    });
  });
});
