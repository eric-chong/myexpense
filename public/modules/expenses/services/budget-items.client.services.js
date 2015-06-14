'use strict';

//Budgets service used for communicating with the accounts REST endpoints
angular.module('expenses').factory('BudgetItems', ['$resource',
  function($resource) {
    return $resource('accounts/:accountId/budgets/:budgetId/budgetItems/:budgetItemId', {
      accountId: '@accountId',
      budgetId: '@budgetId',
      budgetItemId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);