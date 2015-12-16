import chai from 'chai';
import {describe, it, before, after} from 'mocha';
import supertest from 'supertest';
import api from './../api';
chai.expect();
chai.should();

const port = 1337;

describe('api', () => {
  let server;

  before(() => {
    api.listen(port);
    server = supertest.agent('http://localhost:' + port);
  });

  after(() => {
    api.close();
  });

  it('should see players in waiting room', (done) => {
    server
    .get('/snapshots')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      res.status.should.equal(200);
      done();
    });
  });
});
