const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const Directory = require('../core/models/directory.model');
const { expect } = chai;

chai.use(chaiHttp);

let token = '';
let testDirectoryId = '';
const filePath = path.join(__dirname, '../uploads/logobuss.png');

describe('File Upload API', function () {
  before((done) => {
    const currentuser = {
      email: 'test@gmail.com',
      password: 'Beritha123',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(currentuser)
      .end((err, res) => {
        if (err) {
          console.error('Login error:', res.body || err);
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token'); // Ensure token is present
        token = res.body.token; // Assign token for future use

        // Create a test directory for file uploads
        chai
          .request(app)
          .post('/api/directories')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: `TestDir_${Date.now()}` })
          .end((err, res) => {
            if (err) {
              console.error('Directory creation error:', res.body || err);
              return done(err);
            }
            expect(res).to.have.status(200);
            testDirectoryId = res.body.data._id; // Store directory ID for uploads
            done();
          });
      });
  });

  after(async () => {
    if (testDirectoryId) {
      await Directory.findByIdAndDelete(testDirectoryId);
    }
  });

  it('should upload a file successfully', (done) => {
    chai
      .request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .field('directory', testDirectoryId)
      .attach('file', fs.readFileSync(filePath), 'logobuss.png')
      .end((err, res) => {
        if (err) {
          console.error('File upload error:', res.body || err);
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('File uploaded successfully');
        done();
      });
  }).timeout(10000);
});
