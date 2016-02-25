'use strict';

/**
 * @ngdoc function
 * @name agentPrivateOfficeFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the agentPrivateOfficeFrontendApp
 */
angular.module('agentPrivateOfficeFrontendApp')
    .controller('LoginCtrl', function ($scope, $location, $http, AuthenticationService, $modal) {
        $scope.email = '';
        $scope.password = '';
        $scope.failedAuth = false;


        $scope.auth = AuthenticationService;
        $scope.dontShowLoginButton = function () {
            //@todo: do something with this nightmare
            return $location.path() === '/login' || $location.path().indexOf('verify_email') >= 0;
        };

        $scope.login = function () {
            AuthenticationService.Login(
                $scope.email,
                $scope.password,
                function (userData) {
                    if (userData.level == 10)
                        $location.path('/admin');
                    else
                        $location.path('/');
                },
                function (error) {
                    if (error.error) {
                        $scope.failedAuth = true;
                    }
                }
            );
        };

        $scope.logout = function () {
            AuthenticationService.Logout();
        };

        $scope.openForgotPasswordModal = function (id) {
            $modal.open({
                templateUrl: 'templates/forgotPasswordModal.html',
                controller: 'ForgotPasswordModalCtrl',
                resolve: {
                    email: function () {
                        return $scope.email;
                    }
                }
            });
        };

        $scope.openRegistrationModal = function (id) {
            $modal.open({
                templateUrl: 'templates/registrationModal.html',
                controller: 'RegistrationModalCtrl',
            });
        };

    })
    .controller('ForgotPasswordModalCtrl', function ($scope, $modalInstance, $resource, cfpLoadingBar, SweetAlert, email, $rootScope) {

        $scope.close = function () {
            $modalInstance.dismiss('close');
        };

        $scope.submit = function () {
            cfpLoadingBar.start();
            var userForgotPasswordResource = $resource($rootScope.apiUrl + 'auth/forgotpass');
            userForgotPasswordResource.get({ email: $scope.email }, function (data) {
                if (data.status == 1) {
                        SweetAlert.success('Готово', 'На Ваш e-mail отправлено письмо с инструкциями по восстановлению пароля.');
                        $scope.close();
                } else {
                    SweetAlert.error('Такого E-mail нет в системе. Попробуйте другой E-mail');
                }
            });
        };
    })
    .controller('RegistrationModalCtrl', function ($scope, $modalInstance, $resource, cfpLoadingBar, SweetAlert, $rootScope) {

        $scope.close = function () {
            $modalInstance.dismiss('close');
        };
        $scope.registr = function () {
            cfpLoadingBar.start();
            var userRegistrationResource = $resource($rootScope.apiUrl + 'auth/registration');
            userRegistrationResource.get({ reg: $scope.reg },function (data) {
                if (data.status == 1) {
                    SweetAlert.success('Готово', 'В скором времени с Вами свяжутся');
                    $scope.close();
                } else {
                    SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
                }
            });
        };
    });