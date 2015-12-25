'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TradeSchema = new mongoose.Schema({
  accepted: Boolean,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }
});

export default mongoose.model('Trade', TradeSchema);
