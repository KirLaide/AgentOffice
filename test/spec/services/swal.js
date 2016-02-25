'use strict';

describe('Service: swal', function () {

  // load the service's module
  beforeEach(module('agentPrivateOfficeFrontendApp'));

  // instantiate service
  var swal;
  beforeEach(inject(function (_swal_) {
    swal = _swal_;
  }));

  it('should do something', function () {
    expect(!!swal).toBe(true);
  });

});
