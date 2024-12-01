const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Directory = require('../core/models/directory.model');
const { expect } = chai;

chai.use(chaiHttp);

let token = '';
let testDirectoryId = '';
const randomDirectoryName = `TestDir_${Date.now()}`;

describe('Directory API', function () {
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
        done();
      });
  });

  after(async function () {
    if (testDirectoryId) {
      await Directory.findByIdAndDelete(testDirectoryId);
    }
  });

  it('should create a new directory successfully', (done) => {
    chai
      .request(app)
      .post('/api/directories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: randomDirectoryName })
      .end((err, res) => {
        if (err) {
          console.error('Directory creation error:', res.body || err);
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Successfully created directory');
        testDirectoryId = res.body.data._id; // Store directory ID
        done();
      });
  }).timeout(15000);
});
