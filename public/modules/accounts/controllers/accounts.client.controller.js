'use strict';

// Accounts controller
angular.module('accounts').controller('AccountsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Accounts',
  function($scope, $stateParams, $location, Authentication, Accounts) {
    $scope.authentication = Authentication;

    // Create new Account
    $scope.create = function() {
      // Create new Account object
      var account = new Accounts({
        name: $scope.newAccount.name,
        description: $scope.newAccount.description
      });

      // Redirect after save
      account.$save(function(response) {
        // $location.path('accounts/' + response._id);
        $scope.find();

        // Clear form fields
        delete $scope.newAccount;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.cancelNewAccount = function() {
      delete $scope.newAccount;
    };

    $scope.showNewAccountForm = function() {
      $scope.newAccount = {};
    };

    // Update existing Account
    $scope.save = function(account) {
      account.$update(function() {
        account.editMode = false;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Account
    $scope.remove = function(account) {
      if (account) {
        account.$remove();

        for (var i in $scope.accounts) {
          if ($scope.accounts[i] === account) {
            $scope.accounts.splice(i, 1);
          }
        }
      } else {
        $scope.account.$remove(function() {
          // $location.path('accounts');
        });
      }
    };


    // Find a list of Accounts
    $scope.find = function() {
      $scope.accounts = Accounts.query();
    };

        // // Find existing Account
        // $scope.findOne = function() {
        //     $scope.account = Accounts.get({
        //         accountId: $stateParams.accountId
        //     });
        // };
  }
]);