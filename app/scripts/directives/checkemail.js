'use strict';

/**
 * @ngdoc directive
 * @name agentPrivateOfficeFrontendApp.directive:checkEmail
 * @description
 * # emailvacant
 */
angular.module('agentPrivateOfficeFrontendApp')
    .directive('emailvacant', ['$resource', '$rootScope',
        function ($resource, $rootScope) {
            var vacantCheck = $resource($rootScope.apiUrl + 'admin/users/checkemail', null, {
                get: {
                    method: 'GET',
                    ignoreLoadingBar: true
                }
            });

            return {
                require: 'ngModel',

                link: function postLink(scope, elm, attrs, ctrl) {

                    var userId;
                    scope.$watch(attrs.emailvacant, function (value) {
                        userId = typeof value !== 'undefined' ? value : 0;
                    });

                    scope.$watch(attrs.ngModel, function () {
                        if (!ctrl.$error.email && ctrl.$viewValue)
                            vacantCheck.get({email: ctrl.$viewValue, id: userId}, function (data) {

                                if (data.status == 1) {
                                    ctrl.$setValidity('vacantEmail', false);
                                } else {
                                    ctrl.$setValidity('vacantEmail', true);
                                }

                            });

                    });

                }

            };

        }]);
