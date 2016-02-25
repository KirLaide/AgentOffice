'use strict';

/**
 * @ngdoc function
 * @name agentPrivateOfficeFrontendApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the agentPrivateOfficeFrontendApp
 */
angular.module('agentPrivateOfficeFrontendApp')
    .controller('SupportCtrl', function ($scope, $resource, $rootScope, SweetAlert) {
        $scope.supportRequest = '';
        var supportResource = $resource($rootScope.apiUrl + 'support');

        $scope.send = function() {
            supportResource.get({message: $scope.supportRequest}, function(){
                SweetAlert.success('Готово', 'Спасибо за обращение, в ближайшее время с Вами свяжутся наши специалисты.');
            });
        }
    });
