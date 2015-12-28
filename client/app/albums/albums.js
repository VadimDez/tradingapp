'use strict';

angular.module('tradingappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('albums', {
        url: '/',
        templateUrl: 'app/albums/albums.html',
        controller: 'AlbumsCtrl',
        controllerAs: 'albumsCtrl'
      })
      .state('my', {
        url: '/albums/my',
        templateUrl: 'app/albums/my/my.html',
        controller: 'MyCtrl',
        controllerAs: 'myCtrl'
      });
  });
