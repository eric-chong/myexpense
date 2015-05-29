'use strict';

//Accounts service used for communicating with the accounts REST endpoints
angular.module('accounts').factory('Accounts', ['$resource',
    function($resource) {
        return $resource('accounts/:accountId', {
            accountId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);