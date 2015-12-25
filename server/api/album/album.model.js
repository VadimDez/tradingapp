'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AlbumSchema = new mongoose.Schema({
  name: String,
  artist: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade'
  }
});

export default mongoose.model('Album', AlbumSchema);
