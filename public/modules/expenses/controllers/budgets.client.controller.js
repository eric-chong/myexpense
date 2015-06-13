'use strict';

// Expenses controller
angular.module('expenses').controller('BudgetsController', ['$scope', '$stateParams', '$location', '$modal', '$modalInstance', 'Authentication', 'Budgets', 'BudgetUtil', 'account', 'budgets', 'currentBudgetIndex', 'budgetMonth', 'message',
  function($scope, $stateParams, $location, $modal, $modalInstance, Authentication, Budgets, BudgetUtil, account, budgets, currentBudgetIndex, budgetMonth, message) {
    $scope.authentication = Authentication;
    
    $scope.message = message;
    $scope.budgets = budgets;

    $scope.years = ['2010','2011','2012','2013','2014','2015','2016','2017'];
    $scope.months = [{value: '01', display: 'January'},
      {value: '02', display: 'February'},
      {value: '03', display: 'March'},
      {value: '04', display: 'April'},
      {value: '05', display: 'May'},
      {value: '06', display: 'June'},
      {value: '07', display: 'July'},
      {value: '08', display: 'August'},
      {value: '09', display: 'September'},
      {value: '10', display: 'October'},
      {value: '11', display: 'November'},
      {value: '12', display: 'December'}];

    $scope.initBudget = function() {
      if (message.no_budget) {
        $scope.budget = new Budgets({
          accountId: account._id,
          startMonth: moment(budgetMonth, 'YYYY-MM').startOf('year').format('YYYY-MM'),
          endMonth: moment(budgetMonth, 'YYYY-MM').endOf('year').format('YYYY-MM'),
          isNew: true
        });
        $scope.budgets.push($scope.budget);
      } else if (!hasCurrentBudget()) {
        $scope.budget = BudgetUtil.fillBudgetGapAt(account._id, $scope.budgets, budgetMonth);
      } else {
        $scope.budget = $scope.budgets[currentBudgetIndex];
      }
      periodModelToViewModel($scope.budget);        
    };

    var hasCurrentBudget = function() {
      return (currentBudgetIndex && currentBudgetIndex > -1 && currentBudgetIndex < $scope.budgets.length);
    };

    $scope.showNextBtn = function() {
      return _.indexOf($scope.budgets, $scope.budget) < $scope.budgets.length;
    };

    $scope.showPrevBtn = function() {
      return _.indexOf($scope.budgets, $scope.budget) > 0;
    };

    $scope.showPrevGap = function() {
      return true;
    };

    $scope.showNextGap = function() {
      return true;
    };

    $scope.saveBudget = function() {
      periodViewModelToModel($scope.budget);
      $scope.budget.$save(function(result) {
        $scope.budgets = Budgets.query({
          accountId: account._id
        });
        $scope.budget = result;
        periodModelToViewModel($scope.budget);
      });
    };

    var periodModelToViewModel = function(budget) {
      budget.viewModel = {
        startYear: budget.startMonth.split('-')[0],
        startMonth: _.find($scope.months, function(m) { return m.value === budget.startMonth.split('-')[1]; }), 
        endYear: budget.endMonth.split('-')[0],
        endMonth: _.find($scope.months, function(m) { return m.value === budget.endMonth.split('-')[1]; }),
      };
    };

    var periodViewModelToModel = function(budget) {
      if (budget.viewModel) {
        budget.startMonth = budget.viewModel.startYear + '-' + budget.viewModel.startMonth.value;
        budget.endMonth = budget.viewModel.endYear + '-' + budget.viewModel.endMonth.value;
      }
    };
  }
]);