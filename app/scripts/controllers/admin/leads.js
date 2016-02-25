'use strict';

/**
 * @ngdoc function
 * @name agentPrivateOfficeFrontendApp.controller:AdminleadsCtrl
 * @description
 * # AdminleadsCtrl
 * Controller of the agentPrivateOfficeFrontendApp
 */
angular.module('agentPrivateOfficeFrontendApp')
    .controller('AdminLeadsCtrl', function ($scope, ngTableParams, cfpLoadingBar, $rootScope, $resource, $timeout) {
        var leadsListResource = $resource($rootScope.apiUrl + 'admin/leads/list');

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10
        }, {
            total: 0,
            counts: [],
            getData: function ($defer, params) {
                cfpLoadingBar.start();
                $scope.usersListPromise = leadsListResource.get(params.url(), function (data) {
                    $timeout(function () {
                        params.total(data.total);
                        $defer.resolve(data.data);
                        $scope.currentData = data.data;
                    }, 500);
                });
            }
        });

    });
