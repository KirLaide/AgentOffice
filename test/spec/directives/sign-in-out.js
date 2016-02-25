'use strict';

describe('Directive: signInOut', function () {

  // load the directive's module
  beforeEach(module('agentPrivateOfficeFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sign-in-out></sign-in-out>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the signInOut directive');
  }));
});
