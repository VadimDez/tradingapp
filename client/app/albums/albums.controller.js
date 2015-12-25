'use strict';

class Albums {
  constructor(albumService, Auth, tradeService) {
    this.albums = [];
    this.requestedTrades = [];
    this.requestedAlbums = [];
    this.albumService = albumService;
    this.tradeService = tradeService;

    this.currentUser = Auth.getCurrentUser();

    this.albumService.get().then(data => {
        this.albums = data.data;
    });

    tradeService.get().then(data => {
      this.requestedTrades = data.data;
    });

    this.albumService.requested().then(data => {
      this.requestedAlbums = data.data;
    });
  }

  trade(album) {
    this.tradeService.create(album._id)
      .then((data) => {
        this.albums.splice(this.albums.indexOf(album), 1);
        this.requestedTrades.push(data.data);
      });
  }

  cancelTrade(trade) {
    this.tradeService.cancel(trade._id)
      .then(() => {
        this.albums.push(trade.album);
        this.requestedTrades.splice(this.requestedTrades.indexOf(trade), 1);
      });
  }

  cancelRequestedAlbum(album) {
    this.tradeService.cancel(album.trade._id)
      .then(() => {
        this.requestedAlbums.splice(this.requestedAlbums.indexOf(album), 1);
      });
  }
}

angular.module('tradingappApp')
  .controller('AlbumsCtrl', Albums);