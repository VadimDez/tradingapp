/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/albums              ->  index
 * POST    /api/albums              ->  create
 * GET     /api/albums/:id          ->  show
 * PUT     /api/albums/:id          ->  update
 * DELETE  /api/albums/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Album = require('./album.model');
var Trade = require('./../trade/trade.model');
var https = require('https');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Albums
export function index(req, res) {
  var filter = {trade: null};

  if (req.query.mine) {
    filter = {user: req.user._id};
  }


  Album.findAsync(filter)
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Album from the DB
export function show(req, res) {
  Album.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Album in the DB
export function create(req, res) {
  var album = req.body;
  album.user = req.user._id;

  if (album.image) {
    album.image = album.image.replace(/100x100/ig, '300x300');
  }

  Album.createAsync(album)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Album in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Album.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Album from the DB
export function destroy(req, res) {
  Album.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function requested(req, res) {
  Album.findAsync({user: req.user._id, trade: {$ne: null}})
    .then(albums => {
      Album.populate(albums, {path: 'trade'}, (err, docs) => {
        if (err) {
          res.status(400).end();
          return;
        }

        res
          .status(200)
          .json(docs)
          .end();
      });
    })
    .catch(handleError(res, 400));
}

export function cover(req, res) {
  //https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/wsSearch
  https.get(`https://itunes.apple.com/search?media=music&entity=album&term=${req.query.term}`, (resp) => {
    var data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res
        .status(200)
        .json(JSON.parse(data))
        .end();
    });
  }).on('error', err => {
    res.status(400).send(err).end();
  });
}