'use strict';

angular.module('tradingappApp', [
  'tradingappApp.auth',
  'tradingappApp.admin',
  'tradingappApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
