'use strict';

// Setting up route
angular.module('accounts').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // make list of accounts default route
    $urlRouterProvider.otherwise('/accounts');

    // Accounts state routing
    $stateProvider.
    state('listAccounts', {
        url: '/accounts',
        templateUrl: 'modules/accounts/views/list-accounts.client.view.html'
    });
  }
]);