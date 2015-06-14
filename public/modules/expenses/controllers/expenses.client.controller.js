'use strict';

// Expenses controller
angular.module('expenses').controller('ExpensesController', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', 'Budgets', 'Expenses', 'BudgetUtil',
  function($scope, $stateParams, $location, $modal, Authentication, Budgets, Expenses, BudgetUtil) {
    $scope.authentication = Authentication;

    // // Create new Expense
    // $scope.create = function() {
    //   // Create new Expense object
    //   var expense = new Expenses({
    //     name: $scope.newExpense.name,
    //     description: $scope.newExpense.description
    //   });

    //   // Redirect after save
    //   expense.$save(function(response) {
    //     // $location.path('expenses/' + response._id);
    //     $scope.find();

    //     // Clear form fields
    //     delete $scope.newExpense;
    //   }, function(errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // $scope.cancelNewExpense = function() {
    //   delete $scope.newExpense;
    // };

    // $scope.showNewExpenseForm = function() {
    //   $scope.newExpense = {};
    // };

    // // Update existing Expense
    // $scope.save = function(expense) {
    //   expense.$update(function() {
    //     expense.editMode = false;
    //   }, function(errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // // Remove existing Expense
    // $scope.remove = function(expense) {
    //   if (expense) {
    //     expense.$remove();

    //     for (var i in $scope.expenses) {
    //       if ($scope.expenses[i] === expense) {
    //         $scope.expenses.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.expense.$remove(function() {
    //       // $location.path('expenses');
    //     });
    //   }
    // };

    var getCurrentBudget = function() {
      return BudgetUtil.getBudgetInMonth($scope.budgets, $stateParams.expenseMonth);
    };

    $scope.showBudgetModal = function(message) {
      var modalInstance = $modal.open({
        templateUrl: 'modules/expenses/views/budgets-modal.client.view.html',
        controller: 'BudgetsController',
        backdrop: 'static',
        keyboard: false,
        resolve: {
          account: function() {
            return {_id: $stateParams.accountId};
          },
          budgets: function () {
            return $scope.budgets;
          },
          currentBudgetIndex: function() {
            return BudgetUtil.getBudgetIndex($scope.budgets, $scope.budget);
          },
          budgetMonth: function() {
            return $stateParams.expenseMonth || moment().format('YYYY-MM');
          },
          message: function() {
            return message;
          }
        }
      });

      modalInstance.result.then(function (budget) {
        $scope.budget = budget;
      });
    };

    // Find a list of Expenses
    $scope.find = function() {
      $scope.budgets = Budgets.query({
        accountId: $stateParams.accountId
      }, function(budgets) {
        // $scope.budgets = budgets;
        var now = moment();
        var currentMonth = $stateParams.expenseMonth || now.format('YYYY-MM');
        $scope.budget = BudgetUtil.getBudgetInMonth($scope.budgets, currentMonth);
        var message = {};
        message.no_budget = $scope.budgets.length === 0;
        message.no_active_budget = !$scope.budget;
        if (message.no_budget || message.no_active_budget) {
          $scope.showBudgetModal(message);
        } else {
          $scope.expenses = Expenses.queryForMonth({
            accountId: $stateParams.accountId,
            expenseMonth: $stateParams.expenseMonth || now.format('YYYY-MM')
          });
        }
      });
    };

        // // Find existing Expense
        // $scope.findOne = function() {
        //     $scope.expense = Expenses.get({
        //         expenseId: $stateParams.expenseId
        //     });
        // };
  }
]);