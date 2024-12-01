const chai = require('chai'); // Chai assertion library
const chaiHttp = require('chai-http'); // Chai plugin to test HTTP requests
const app = require('../app'); // Importing the Express app
const Directory = require('../core/models/directory.model'); // Directory model for database interaction
const { expect } = chai; // Destructuring `expect` from chai

chai.use(chaiHttp); // Using chai-http to make HTTP requests in tests

let token = ''; // Variable to store the authentication token
let testDirectoryId = ''; // Variable to store the created directory's ID
const randomDirectoryName = `TestDir_${Date.now()}`; // Generate a unique directory name using timestamp

describe('Directory API', function () {
  
  // `before` hook to log in and get an authentication token before tests run
  before((done) => {
    const currentuser = {
      email: 'test@gmail.com',
      password: 'Beritha123',
    };

    // Send login request to get the token
    chai
      .request(app)
      .post('/api/auth/login')
      .send(currentuser)
      .end((err, res) => {
        if (err) {
          console.error('Login error:', res.body || err);
          return done(err); // If there's an error, log it and terminate the test
        }
        // Assert that the response status is 200 and the token is returned
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token; // Assign the token for use in future requests
        done(); // Indicate that the `before` hook is done
      });
  });

  // `after` hook to clean up the created directory after tests complete
  after(async function () {
    if (testDirectoryId) {
      // If a directory was created during the test, delete it
      await Directory.findByIdAndDelete(testDirectoryId);
    }
  });

  // Test case to create a new directory
  it('should create a new directory successfully', (done) => {
    chai
      .request(app)
      .post('/api/directories') // Endpoint to create a new directory
      .set('Authorization', `Bearer ${token}`) // Add the authorization token in the header
      .send({ name: randomDirectoryName }) // Send the directory data (name)
      .end((err, res) => {
        if (err) {
          console.error('Directory creation error:', res.body || err);
          return done(err); // If there's an error, log it and terminate the test
        }
        // Assert that the directory creation was successful
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Successfully created directory');
        testDirectoryId = res.body.data._id; // Store the directory ID for cleanup in `after`
        done(); // Indicate that the test is complete
      });
  }).timeout(15000); // Set timeout for the test to 15 seconds
});
