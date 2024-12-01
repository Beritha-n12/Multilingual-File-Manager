const chai = require('chai'); // Chai assertion library
const chaiHttp = require('chai-http'); // Chai plugin to test HTTP requests
const fs = require('fs'); // Node.js fs module to read files
const path = require('path'); // Node.js path module to handle file paths
const app = require('../app'); // Import the Express app
const Directory = require('../core/models/directory.model'); // Directory model to interact with the DB
const { expect } = chai; // Destructure `expect` from chai for assertions

chai.use(chaiHttp); // Using chai-http to make HTTP requests in tests

let token = ''; // Variable to store the authentication token
let testDirectoryId = ''; // Variable to store the created directory ID
const filePath = path.join(__dirname, '../uploads/logobuss.png'); // Path to the test file

describe('File Upload API', function () {
  
  // `before` hook to log in, get a token, and create a directory before running tests
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
        token = res.body.token; // Store the token for use in future requests

        // Create a test directory for file uploads
        chai
          .request(app)
          .post('/api/directories')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: `TestDir_${Date.now()}` }) // Create a unique directory name
          .end((err, res) => {
            if (err) {
              console.error('Directory creation error:', res.body || err);
              return done(err);
            }
            expect(res).to.have.status(200); // Assert successful directory creation
            testDirectoryId = res.body.data._id; // Store directory ID for future use
            done(); // Indicate that the `before` hook is complete
          });
      });
  });

  // `after` hook to clean up by deleting the created directory
  after(async () => {
    if (testDirectoryId) {
      await Directory.findByIdAndDelete(testDirectoryId); // Delete the created directory after tests
    }
  });

  // Test case to upload a file to the server
  it('should upload a file successfully', (done) => {
    chai
      .request(app)
      .post('/api/files') // Endpoint to upload the file
      .set('Authorization', `Bearer ${token}`) // Authorization header with the token
      .field('directory', testDirectoryId) // Include the directory ID in the request body
      .attach('file', fs.readFileSync(filePath), 'logobuss.png') // Attach the file to the request
      .end((err, res) => {
        if (err) {
          console.error('File upload error:', res.body || err);
          return done(err); // If there's an error, log it and terminate the test
        }
        // Assert that the file upload was successful
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('File uploaded successfully');
        done(); // Indicate that the test is complete
      });
  }).timeout(10000); // Set timeout for the test to 10 seconds
});
