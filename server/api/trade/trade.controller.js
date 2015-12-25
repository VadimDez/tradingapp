/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/trades              ->  index
 * POST    /api/trades              ->  create
 * GET     /api/trades/:id          ->  show
 * PUT     /api/trades/:id          ->  update
 * DELETE  /api/trades/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Trade = require('./trade.model');
var mongoose = require('mongoose');
var Album = require('./../album/album.model');

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
      Album.findByIdAsync(entity.album)
        .then(album => {
          if (album) {
            album.trade = null;

            album.saveAsync()
              .spread();
          }
        });

      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Trades
export function index(req, res) {
  Trade.findAsync({user: req.user._id})
    .then(entity => {
      Trade.populate(entity, {path: 'album'}, (err, _entity) => {
        if (err) {
          res.status(400).end();
          return;
        }

        res.status(200).json(_entity).end();
      });
    })
    .catch(handleError(res));
}

// Gets a single Trade from the DB
export function show(req, res) {
  Trade.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

function checkTrading(userId, res) {
  return function(album) {
    if (album.trade || album.user === userId) {
      res.status(400).end();
      return null;
    }
    return album;
  };
}

// Creates a new Trade in the DB
export function create(req, res) {

  if (!req.body.album) {
    res
      .status(400)
      .json({errors: [{
        status: 400,
        title: 'album is missing'
      }]}).end();
    return;
  }

  Album.findByIdAsync(req.body.album)
    .then(handleEntityNotFound(res))
    .then(checkTrading(req.user._id, res))
    .then(album => {

      Trade.createAsync({
          accepted: null,
          date: null,
          user: req.user._id,
          album: album._id
        })
        .then(trade => {
          album.trade = trade._id;

          album.saveAsync()
            .then(() => {
              trade.album = album;
              res
                .status(201)
                .json(trade)
                .end();
            })
            .catch(handleError(res, 400));
        })
        .catch(handleError(res, 400));
    })
    .catch(handleError(res, 400));
}

// Updates an existing Trade in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Trade.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Trade from the DB
export function destroy(req, res) {
  Trade.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
