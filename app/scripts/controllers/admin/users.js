'use strict';

/**
 * @ngdoc function
 * @name agentPrivateOfficeFrontendApp.controller:AdminUsersCtrl
 * @description
 * # AdminUsersCtrl
 * Controller of the agentPrivateOfficeFrontendApp
 */
angular.module('agentPrivateOfficeFrontendApp')
    .controller('AdminUsersCtrl', ['$scope', '$resource', 'ngTableParams', '$timeout', '$modal', 'cfpLoadingBar', '$rootScope',
        function ($scope, $resource, ngTableParams, $timeout, $modal, cfpLoadingBar, $rootScope) {
            var usersListResource = $resource($rootScope.apiUrl + 'admin/users/list');

            $scope.currentData = null;
            $scope.currentUser = null;
            $scope.userDummy = {
                banned: null,
                contractNo: null,
                agentId: null,
                ownerId: null,
                email: null,
                lastName: null,
                name: null,
                patronymic: null,
                phone: null
            };

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 0,
                counts: [],
                getData: function ($defer, params) {
                    cfpLoadingBar.start();
                    $scope.usersListPromise = usersListResource.get(params.url(), function (data) {
                        $timeout(function () {
                            params.total(data.total);
                            $defer.resolve(data.data);
                            $scope.currentData = data.data;
                        }, 500);
                    });
                }
            });

            $scope.openEditModal = function (id) {
                $scope.currentUser = _.findWhere($scope.currentData, {id: id});

                $modal.open({
                    templateUrl: 'templates/admin/users/editModal.html',
                    controller: 'AdminUsersEditModalCtrl',
                    resolve: {
                        user: function () {
                            return $scope.currentUser;
                        }
                    }
                });
            };

            $scope.openDeleteModal = function (id) {
                $modal.open({
                    templateUrl: 'templates/admin/users/deleteModal.html',
                    controller: 'AdminUsersDeleteModalCtrl',
                    resolve: {
                        userId: function () {
                            return id;
                        },
                        table: function () {
                            return $scope.tableParams;
                        }
                    }
                });
            };

            $scope.openCreateModal = function () {
                $modal.open({
                    templateUrl: 'templates/admin/users/editModal.html',
                    controller: 'AdminUsersCreateModalCtrl',
                    resolve: {
                        user: function () {
                            return $scope.userDummy;
                        },
                        table: function () {
                            return $scope.tableParams;
                        }
                    }
                });
            };
        }])


    .controller('AdminUsersEditModalCtrl', ['$scope', '$modalInstance', 'user', '$resource', 'cfpLoadingBar', 'SweetAlert', '$rootScope',
        function ($scope, $modalInstance, user, $resource, cfpLoadingBar, SweetAlert, $rootScope) {
            $scope.user = user;

            $scope.close = function () {
                $modalInstance.dismiss('close');
            };

            $scope.save = function () {
                cfpLoadingBar.start();
                var userUpdateResource = $resource($rootScope.apiUrl + 'admin/users/update');
                $scope.userUpdatePromise = userUpdateResource.save(JSON.stringify(user), function (data) {
                    if (data.status == 1) {
                        SweetAlert.success('Готово', 'Пользователь отредактирован.');
                        $scope.close();
                    } else {
                        SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
                    }
                });
            };
        }])


    .controller('AdminUsersCreateModalCtrl', ['$scope', '$modalInstance', 'user', 'table', '$resource', 'cfpLoadingBar', 'SweetAlert', '$rootScope',
        function ($scope, $modalInstance, user, table, $resource, cfpLoadingBar, SweetAlert, $rootScope) {
            $scope.user = user;
            $scope.isCreate = true;
            $scope.user.banned = 1;

            $scope.close = function () {
                _.map($scope.user, function (key, value) {
                    $scope.user[value] = null;
                });

                $modalInstance.dismiss('close');
            };

            $scope.save = function () {
                cfpLoadingBar.start();
                var userCreateResource = $resource($rootScope.apiUrl + 'admin/users/create');
                userCreateResource.save(JSON.stringify(user), function (data) {
                    if (data.status == 1) {
                        SweetAlert.success('Готово', 'Пользователь создан.');
                        table.reload();
                        $scope.close();
                    } else {
                        SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
                    }
                });
            };
        }])


    .controller('AdminUsersDeleteModalCtrl', ['$scope', '$modalInstance', 'userId', 'table', '$resource', 'cfpLoadingBar', 'SweetAlert', '$rootScope',
        function ($scope, $modalInstance, userId, table, $resource, cfpLoadingBar, SweetAlert, $rootScope) {
            $scope.userId = userId;

            $scope.close = function () {
                $modalInstance.dismiss('close');
            };

            $scope.delete = function () {
                cfpLoadingBar.start();
                var userDeleteResource = $resource($rootScope.apiUrl + 'admin/users/delete', null, {'delete': {'method': 'POST'}});
                userDeleteResource.delete({id: userId}, function (data) {
                    if (data.status == 1) {
                        SweetAlert.success('Готово', 'Пользователь удалён.');
                        table.reload();
                        $scope.close();
                    } else {
                        SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
                    }
                });
            };
        }]);
