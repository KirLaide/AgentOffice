'use strict';

/**
 * @ngdoc service
 * @name agentPrivateOfficeFrontendApp.tokenInterceptor
 * @description
 * # tokenInterceptor
 * Factory in the agentPrivateOfficeFrontendApp.
 */
angular.module('agentPrivateOfficeFrontendApp')
    .factory('tokenInterceptor', function ($location) {
        return {
            /**
             * @param config
             * @returns {*}
             */
            request: function (config) {
                var userData = null;
                if (localStorage.getItem('userData'))
                    userData = JSON.parse(localStorage.getItem('userData'));

                config.headers = config.headers || {};
                if (userData && userData.token) {
                    config.headers['X-API-KEY'] = userData.token;

                    if (!config.params) config.params = {};
                    if (!config.data) config.data = {};

                    if (config.url.indexOf('api') >= 0)
                        switch (config.method) {
                            case "GET":
                                config.params.user_id = userData.id;
                            case "POST":
                                if (typeof config.data !== 'string')
                                    config.data.user_id = userData.id;
                        }
                }

                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response || $q.when(response);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    });
