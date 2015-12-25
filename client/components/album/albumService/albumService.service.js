'use strict';

class albumService {
  constructor($http) {
    this.$http = $http;
  }

  get(id) {
    if (id) {
      return this.$http.get('/api/albums/' + id);
    }

    return this.$http.get('/api/albums');
  }

  requested() {
    return this.$http.get('/api/albums/requested');
  }

  create(album) {
    return this.$http.post('/api/albums', album);
  }

  filter(filter) {
    return this.$http({
      method: 'GET',
      url: '/api/albums',
      params: filter
    });
  }

  trade(id) {
    return this.$http.post(`/api/albums/${id}/trade`);
  }
}

angular.module('tradingappApp')
  .service('albumService', albumService);
