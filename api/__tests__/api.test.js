import chai from 'chai';
import {describe, it, before, after, beforeEach, afterEach} from 'mocha';
import supertest from 'supertest';
import Datastore from 'nedb';
import api from './../api';
import fs from 'fs';

chai.expect();
chai.should();

const port = 1337;

describe('api', () => {
  let server;
  let testDb;

  before(() => {
    fs.unlinkSync('test-snapshots.db');
    testDb = new Datastore({ filename: 'test-snapshots.db', autoload: true });
    api.listen(port, testDb);
    server = supertest.agent('http://localhost:' + port);
  });

  after(() => {
    api.close();
  });

  afterEach((done) => {
    testDb.remove({}, { multi: true }, ()=> {
      done();
    });
  });

  describe('list', () => {
    beforeEach((done) => {
      const snapshots = [
        {
          name: 'jira bug 421: cannot add long names',
          data: {foo: 'bar1', test: 'ok1'},
          createdAt: new Date('2015-01-01'),
        }, {
          name: 'jira bug 299: padding issues on profile screen',
          data: {foo: 'bar2', test: 'ok2'},
          createdAt: new Date('2015-01-02'),
        }, {
          name: 'credit card flow: test data',
          data: {foo: 'bar3', test: 'ok3'},
          createdAt: new Date('2015-01-03'),
        },
      ];
      testDb.insert(snapshots, ()=> {
        done();
      });
    });

    it('should return the list of all snapshots in reverse order of their addition', (done) => {
      server
      .get('/snapshots')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        const snapshots = res.body;
        snapshots.length.should.equal(3);
        snapshots[0].name.should.eql('credit card flow: test data');
        done();
      });
    });

    it('should return snapshots whose name matches with the provided key', (done) => {
      server
      .get('/snapshots?key=jira')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.length.should.equal(2);
        done();
      });
    });
  });

  describe('create', () => {
    it('should create a snapshot', (done) => {
      const snapshot = {
        name: 'credit card flow: test data',
        data: {foo: 'bar3', test: 'ok3'},
        createdAt: new Date('2015-01-03'),
      };

      server
      .post('/snapshots')
      .set('Accept', 'application/json')
      .send(snapshot)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        const savedSnapshot = res.body;
        savedSnapshot.name.should.eql('credit card flow: test data');
        done();
      });
    });
  });
});
