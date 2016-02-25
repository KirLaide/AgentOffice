'use strict';

/**
 * @ngdoc directive
 * @name agentPrivateOfficeFrontendApp.directive:signInOut
 * @description
 * # signInOut
 */
angular.module('agentPrivateOfficeFrontendApp')
    .directive('signInOut', ['$rootScope', 'AuthenticationService',
        function ($rootScope, AuthenticationService) {
            var templates = {
                login: 'templates/login-btn.html',
                logout: 'templates/logout-btn.html'
            };

            return {
                template: '<div ng-include="templateUrl"></div>',
                restrict: 'E',
                scope: true,
                controller: 'LoginCtrl',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        var isLoggedIn = AuthenticationService.isLoggedIn();
                        if (isLoggedIn) scope.username = AuthenticationService.getUserData().name + ' ' + AuthenticationService.getUserData().patronymic;

                        return isLoggedIn;
                    }, function (newValue, oldValue) {
                        scope.templateUrl = newValue === true ? templates.logout : templates.login;
                    });
                }
            };
        }]);
