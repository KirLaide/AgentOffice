'use strict';

/**
 * @ngdoc function
 * @name agentPrivateOfficeFrontendApp.controller:EmailVerifyCtrl
 * @description
 * # EmailVerifyCtrl
 * Controller of the agentPrivateOfficeFrontendApp
 */
angular.module('agentPrivateOfficeFrontendApp')
    .controller('EmailVerifyCtrl', function ($scope, $routeParams, $resource, $location, SweetAlert, $rootScope) {
        if ($routeParams.forgot === 'forgot')
            $resource($rootScope.apiUrl + 'auth/resetpass').get($routeParams, function (data) {
                if (data.status == 1)
                    SweetAlert.success('Готово', 'На Ваш e-mail отправлен новый пароль. Запишите его пожалуйста.');

                else
                    SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
            });
        else
            $resource($rootScope.apiUrl + 'verify_email').get($routeParams, function (data) {
                if (data.status == 1)
                    $location.path('/login');
                else
                    SweetAlert.error('Ой...', 'Возникла ошибка. Обратитесь к администратору.');
            });

    })

    .controller('SlideController', ['$scope', '$location',function($scope, $location){ 
        $scope.go = function (hash) { 
            $location.path(hash);
        };
    }]);
    