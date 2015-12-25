'use strict';

class userService {
  constructor($http) {
    this.$http = $http;
  }

  updateInfo(info) {
    return this.$http.put('/api/users/me/info', info);
  }
}

angular.module('tradingappApp')
  .service('userService', userService);
