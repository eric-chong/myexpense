'use strict';

// Expenses controller
angular.module('expenses').controller('BudgetsController', ['$scope', '$stateParams', '$location', '$modal', '$modalInstance', 'Authentication', 'Budgets', 'BudgetItems', 'BudgetUtil', 'account', 'budgets', 'currentBudgetIndex', 'budgetMonth', 'message',
  function($scope, $stateParams, $location, $modal, $modalInstance, Authentication, Budgets, BudgetItems, BudgetUtil, account, budgets, currentBudgetIndex, budgetMonth, message) {
    $scope.authentication = Authentication;
    
    $scope.message = message;
    $scope.budgets = budgets;
    $scope.currentBudgetIndex = currentBudgetIndex;

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
      if (message && message.no_budget) {
        $scope.budget = new Budgets({
          accountId: account._id,
          startMonth: moment(budgetMonth, 'YYYY-MM').startOf('year').format('YYYY-MM'),
          endMonth: moment(budgetMonth, 'YYYY-MM').endOf('year').format('YYYY-MM'),
          isNew: true
        });
        $scope.budgets.push($scope.budget);
      } else if ($scope.currentBudgetIndex === -1) {
        $scope.budget = BudgetUtil.fillBudgetGapAt(account._id, $scope.budgets, budgetMonth);
      } else {
        $scope.budget = $scope.budgets[$scope.currentBudgetIndex];
      }
      periodModelToViewModel($scope.budget);        
    };

    var hasCurrentBudget = function() {
      return ($scope.currentBudgetIndex && 
        $scope.currentBudgetIndex > -1 && 
        $scope.currentBudgetIndex < $scope.budgets.length);
    };

    $scope.showNextBtn = function() {
      return BudgetUtil.getBudgetIndex($scope.budgets, $scope.budget) < $scope.budgets.length - 1;
    };

    $scope.showPrevBtn = function() {
      return BudgetUtil.getBudgetIndex($scope.budgets, $scope.budget) > 0;
    };

    $scope.showPrevGap = function() {
      var prevMonth = moment($scope.budget.startMonth, 'YYYY-MM').subtract(1, 'month');
      return !BudgetUtil.getBudgetInMonth($scope.budgets, prevMonth.format('YYYY-MM'));
    };

    $scope.showNextGap = function() {
      var nextMonth = moment($scope.budget.endMonth, 'YYYY-MM').add(1, 'month');
      return !BudgetUtil.getBudgetInMonth($scope.budgets, nextMonth.format('YYYY-MM'));
    };

    $scope.saveBudget = function() {
      periodViewModelToModel($scope.budget);
      if ($scope.budget.isNew) {      
        $scope.budget.$save({
          accountId: account._id
        },
        function(result) {
          var budget = result;
          $scope.budgets = Budgets.query({
            accountId: account._id
          }, function() {          
            $scope.budget = BudgetUtil.getBudgetById($scope.budgets, budget._id);
            $scope.currentBudgetIndex = BudgetUtil.getBudgetIndex($scope.budgets, $scope.budget);
            periodModelToViewModel($scope.budget);
          });
        });
      } else {
        $scope.budget.$update({
          accountId: account._id
        },
        function(result) {
          var budget = result;
          $scope.budgets = Budgets.query({
            accountId: account._id
          }, function() {          
            $scope.budget = BudgetUtil.getBudgetById($scope.budgets, budget._id);
            $scope.currentBudgetIndex = BudgetUtil.getBudgetIndex($scope.budgets, $scope.budget);
            periodModelToViewModel($scope.budget);
          });
        });
      }
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

    $scope.$watch('budget', function(newBud) {
      $scope.budgetItems = BudgetItems.query({
        accountId: account._id,
        budgetId: $scope.budget._id
      });
    });
  }
]);