'use strict';

describe('Controller: EmailverifyctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('agentPrivateOfficeFrontendApp'));

  var EmailverifyctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailverifyctrlCtrl = $controller('EmailverifyctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
