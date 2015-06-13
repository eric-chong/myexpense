'use strict';

//Budgets service used for communicating with the accounts REST endpoints
angular.module('expenses').factory('Budgets', ['$resource',
    function($resource) {
        return $resource('accounts/:accountId/budgets/:budgetId', {
            accountId: '@accountId',
            budgetId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            getCurrent: {
                method: 'GET',
                url: 'accounts/:accountId/budgets/month/:month',
            }
        });
    }
]);