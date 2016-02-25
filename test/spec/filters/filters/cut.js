'use strict';

describe('Filter: filters/cut', function () {

  // load the filter's module
  beforeEach(module('agentPrivateOfficeFrontendApp'));

  // initialize a new instance of the filter before each test
  var filters/cut;
  beforeEach(inject(function ($filter) {
    filters/cut = $filter('filters/cut');
  }));

  it('should return the input prefixed with "filters/cut filter:"', function () {
    var text = 'angularjs';
    expect(filters/cut(text)).toBe('filters/cut filter: ' + text);
  });

});
