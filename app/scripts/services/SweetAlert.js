'use strict';

/**
 * @ngdoc service
 * @name agentPrivateOfficeFrontendApp.swal
 * @description
 * # swal
 * Service in the agentPrivateOfficeFrontendApp.
 */

function sweetAlertService() {
    this.success = function (title, message) {
        swal(title, message, 'success');
    };

    this.error = function (title, message) {
        swal(title, message, 'error');
    };

    this.warning = function (title, message) {
        swal(title, message, 'warning');
    };

    this.info = function (title, message) {
        swal(title, message, 'info');
    };

    this.custom = function (configObject) {
        swal(configObject);
    }
};

angular.module('agentPrivateOfficeFrontendApp')
    .service('SweetAlert', sweetAlertService);
