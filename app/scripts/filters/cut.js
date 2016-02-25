'use strict';

/**
 * @ngdoc filter
 * @name agentPrivateOfficeFrontendApp.filter:filters/cut
 * @function
 * @description
 * # filters/cut
 * Filter in the agentPrivateOfficeFrontendApp.
 */
angular.module('agentPrivateOfficeFrontendApp')
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
