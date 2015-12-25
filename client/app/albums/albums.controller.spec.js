'use strict';

describe('Controller: AlbumsCtrl', function () {

  // load the controller's module
  beforeEach(module('tradingappApp'));

  var AlbumsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlbumsCtrl = $controller('AlbumsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
