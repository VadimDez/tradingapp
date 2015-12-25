'use strict';

angular.module('tradingappApp.auth', [
  'tradingappApp.constants',
  'tradingappApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
