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
    // state('createArticle', {
    //     url: '/articles/create',
    //     templateUrl: 'modules/articles/views/create-article.client.view.html'
    // }).
    // state('viewArticle', {
    //     url: '/articles/:articleId',
    //     templateUrl: 'modules/articles/views/view-article.client.view.html'
    // }).
    // state('editArticle', {
    //     url: '/articles/:articleId/edit',
    //     templateUrl: 'modules/articles/views/edit-article.client.view.html'
    // });
  }
]);