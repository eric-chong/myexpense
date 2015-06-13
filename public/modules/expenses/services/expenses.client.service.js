'use strict';

//Expenses service used for communicating with the accounts REST endpoints
angular.module('expenses').factory('Expenses', ['$resource',
  function($resource) {
    return $resource('accounts/:accountId/expenses/:expenseId', {
      accountId: '@accountId',
      expenseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      queryForMonth: {
        method: 'GET',
        url: 'accounts/:accountId/expenses/:expenseMonth',
        isArray: true
      }
    });
  }
]);