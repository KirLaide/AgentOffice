'use strict';

describe('Controller: AdminleadsCtrl', function () {

  // load the controller's module
  beforeEach(module('agentPrivateOfficeFrontendApp'));

  var AdminleadsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminleadsCtrl = $controller('AdminleadsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
