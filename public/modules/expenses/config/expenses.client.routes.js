'use strict';

// Setting up route
angular.module('expenses').config(['$stateProvider',
  function($stateProvider) {
    // Expenses state routing
    $stateProvider.
    state('listExpenses', {
        url: '/accounts/:accountId/expenses',
        templateUrl: 'modules/expenses/views/list-expenses.client.view.html'
    }).
    state('listExpensesForMonth', {
        url: '/accounts/:accountId/expenses/:expenseMonth',
        templateUrl: 'modules/expenses/views/list-expenses.client.view.html'
    });
  }
]);