'use strict';

/**
 * @ngdoc function
 * @name agentPrivateOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the agentPrivateOfficeFrontendApp
 */
angular.module('agentPrivateOfficeFrontendApp')
    .controller('MainCtrl', ['$scope', '$resource', 'AuthenticationService', 'ngTableParams', 'cfpLoadingBar', '$timeout', 'SweetAlert', '$rootScope',
        function ($scope, $resource, AuthenticationService, ngTableParams, cfpLoadingBar, $timeout, SweetAlert, $rootScope) {

            var leadListResource = $resource($rootScope.apiUrl + 'leads/list');
            var leadCreateResource = $resource($rootScope.apiUrl + 'leads/create');

            $scope.dummyLead = {
                firstName: '',
                lastName: '',
                patronymic: '',
                phone: '',
                summ: null,
                notice: ''
            };

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 0,
                counts: [],
                getData: function ($defer, params) {
                    cfpLoadingBar.start();
                    leadListResource.get(params.url(), function (data) {
                        $timeout(function () {
                            params.total(data.total);
                            $defer.resolve(data.data);
                        }, 500);
                    });
                }
            });

            $scope.create = function () {
                var nameArray = $scope.dummyLead.fullName.split(' ');
                delete $scope.dummyLead.fullName;

                if (nameArray.length === 1)
                    $scope.dummyLead.firstName = $scope.dummyLead.lastName = nameArray[0];
                else {
                    $scope.dummyLead.lastName = nameArray[0];
                    $scope.dummyLead.firstName = nameArray[1];
                    $scope.dummyLead.patronymic = nameArray[2];
                }
                /*leadCreateResource.save($scope.dummyLead, function (data) {
                    if (data.status == 1) {
                        _.map($scope.dummyLead, function (key, value) {
                            $scope.dummyLead[value] = null;
                        });
                        $scope.tableParams.reload();

                        SweetAlert.success('Готово', 'Лид успешно добавлен!');
                    } else {
                        SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
                    }
                });*/
                leadCreateResource.save($scope.dummyLead, function (data) {
                    _.map($scope.dummyLead, function (key, value) {
                        $scope.dummyLead[value] = null;
                    });
                    $scope.tableParams.reload();

                    SweetAlert.success('Готово', 'Лид успешно добавлен!');
                });
            };

        }]);
