'use strict';

describe('Service: albumService', function () {

  // load the service's module
  beforeEach(module('tradingappApp'));

  // instantiate service
  var albumService;
  beforeEach(inject(function (_albumService_) {
    albumService = _albumService_;
  }));

  it('should do something', function () {
    expect(!!albumService).toBe(true);
  });

});
