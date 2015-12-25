'use strict';

var app = require('../..');
import request from 'supertest';

var newAlbum;

describe('Album API:', function() {

  describe('GET /api/albums', function() {
    var albums;

    beforeEach(function(done) {
      request(app)
        .get('/api/albums')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          albums = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      albums.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/albums', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/albums')
        .send({
          name: 'New Album',
          info: 'This is the brand new album!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAlbum = res.body;
          done();
        });
    });

    it('should respond with the newly created album', function() {
      newAlbum.name.should.equal('New Album');
      newAlbum.info.should.equal('This is the brand new album!!!');
    });

  });

  describe('GET /api/albums/:id', function() {
    var album;

    beforeEach(function(done) {
      request(app)
        .get('/api/albums/' + newAlbum._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          album = res.body;
          done();
        });
    });

    afterEach(function() {
      album = {};
    });

    it('should respond with the requested album', function() {
      album.name.should.equal('New Album');
      album.info.should.equal('This is the brand new album!!!');
    });

  });

  describe('PUT /api/albums/:id', function() {
    var updatedAlbum;

    beforeEach(function(done) {
      request(app)
        .put('/api/albums/' + newAlbum._id)
        .send({
          name: 'Updated Album',
          info: 'This is the updated album!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAlbum = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAlbum = {};
    });

    it('should respond with the updated album', function() {
      updatedAlbum.name.should.equal('Updated Album');
      updatedAlbum.info.should.equal('This is the updated album!!!');
    });

  });

  describe('DELETE /api/albums/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/albums/' + newAlbum._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when album does not exist', function(done) {
      request(app)
        .delete('/api/albums/' + newAlbum._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
