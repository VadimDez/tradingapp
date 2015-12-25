'use strict';

angular.module('tradingappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('albums', {
        url: '/albums',
        templateUrl: 'app/albums/albums.html',
        controller: 'AlbumsCtrl',
        controllerAs: 'albumsCtrl'
      })
      .state('add-album', {
        url: '/albums/add',
        templateUrl: 'app/albums/add/add.html',
        controller: 'AddAlbumCtrl',
        controllerAs: 'addAlbumCtrl'
      });
  });
