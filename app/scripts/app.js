'use strict';

/**
 * @ngdoc overview
 * @name agentPrivateOfficeFrontendApp
 * @description
 * # agentPrivateOfficeFrontendApp
 *
 * Main module of the application.
 *
 */

angular
    .module('agentPrivateOfficeFrontendApp', [
        'ngResource',
        'ngRoute',
        'Authentication',
        'ngTable',
        'angular-loading-bar',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                level: 1
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                level: 1
            })
            .when('/verify_email/:userId/:verifyCode/:forgot', {
                templateUrl: 'views/emailVerify.html',
                controller: 'EmailVerifyCtrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin/index.html',
                controller: 'AdminIndexCtrl',
                level: 10
            })
            .when('/admin/users', {
                templateUrl: 'views/admin/users.html',
                controller: 'AdminUsersCtrl',
                level: 10
            })
            .when('/admin/leads', {
                templateUrl: 'views/admin/leads.html',
                controller: 'AdminLeadsCtrl',
                level: 10
            })
            .when('/support', {
                templateUrl: 'views/support.html',
                controller: 'SupportCtrl',
                level: 1
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .run(function ($rootScope, $location, AuthenticationService) {
        $rootScope.apiUrl = 'http://agent.finotdel.ru/backend/index.php/api/';
        //$rootScope.apiUrl = 'http://agent:82/backend/index.php/api/';
        //$rootScope.apiUrl = 'http://localhost:19503/index.php/api/';

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            
            if (next.$$route.level && !AuthenticationService.isLoggedIn()) {
                // no logged user, we should be going to #login
                if (next.templateUrl != "views/login.html" && next.templateUrl != "views/support.html") {
                    $location.path('/login');
                }
            } else {
                // user logged in, check level
                var level = next.$$route.level;
                if (level && AuthenticationService.isLoggedIn() && AuthenticationService.getUserData().level < level)
                    $location.path('/');
            }
            
        });
    });

        
