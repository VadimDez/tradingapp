class AddAlbumCtrl {
  constructor(albumService) {
    this.newAlbum = {};
    this.albumService = albumService;
  }

  create() {
    this.albumService.create(this.newAlbum)
      .then(() => {
        this.newAlbum = {};
      });
  }
}
angular.module('tradingappApp')
  .controller('AddAlbumCtrl', AddAlbumCtrl);