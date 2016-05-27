(function () {
  'use strict';
  
  class MyCtrl {
    constructor(albumService, $timeout, $state) {
      this.albums = [];
      this.newAlbum = {};
      this.albumService = albumService;
      this.covers = [];
      this.$timeout = $timeout;
      this.timeoutCb = null;
      this.loading = false;
      this.$state = $state;
  
      albumService.filter({mine: true})
        .then(data => {
          this.albums = data.data;
        });
    }
  
    create() {
      this.albumService.create(this.newAlbum)
        .then(() => {
          this.newAlbum = {};
          this.covers = [];
          this.$state.go('albums');
        });
    }
  
    searchCover(artist, album) {
      if (this.timeoutCb) {
        this.loading = false;
        this.$timeout.cancel(this.timeoutCb);
      }
  
      this.timeoutCb = this.$timeout(() => {
        this.search(artist, album);
      }, 800);
    }
  
    search(artist, album) {
      this.loading = true;
      this.albumService.getCover(artist, album)
        .then(data => {
          this.loading = false;
          this.covers = data.data.results;
        });
    }
  }
  angular.module('tradingappApp')
    .controller('MyCtrl', MyCtrl);
}());