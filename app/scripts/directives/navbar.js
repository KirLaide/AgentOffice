'use strict';

/**
 * @ngdoc directive
 * @name agentPrivateOfficeFrontendApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('agentPrivateOfficeFrontendApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'templates/navbar.html',
      restrict: 'E'
    };
  });
