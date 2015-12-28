'use strict';

class tradeService {
  constructor($http) {
    this.$http = $http;
  }

  get() {
    return this.$http.get('/api/trades');
  }

  create(id) {
    return this.$http.post('/api/trades', {album: id});
  }

  cancel(id) {
    return this.$http.delete(`/api/trades/${id}`);
  }

  accept(id) {
    return this.$http.put(`/api/trades/${id}`);
  }
}

angular.module('tradingappApp')
  .service('tradeService', tradeService);
