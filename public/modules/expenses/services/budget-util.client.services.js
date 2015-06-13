'use strict';

//Budget util service used for budgets manipulations
angular.module('expenses').factory('BudgetUtil', ['Budgets',
  function(Budgets) {
    return {
      getBudgetInMonth: function(budgets, month) {
        var now = month ? moment(month, 'YYYY-MM') : moment();
        return _.find(budgets, function(b) {
          var budgetStart = moment(b.startMonth, 'YYYY-MM').startOf('month');
          var budgetEnd;
          if (b.endMonth) {
              budgetEnd = moment(b.endMonth, 'YYYY-MM').endOf('month');
          }
          return now.isAfter(budgetStart) && (!budgetEnd || now.isBefore(budgetEnd));
        });
      },
      getBudgetIndex: function(budgets, budget) {
        return _.indexOf(budgets, budget);
      },
      fillBudgetGapAt: function(accountId, budgets, month) {
        if (!month || _.isUndefined(budgets) || !budgets.length) return undefined;

        if (this.getBudgetInMonth(budgets, month)) return this.getBudgetInMonth(budgets, month);

        var newStartMonth = moment(month, 'YYYY-MM').startOf('year');
        var newEndMonth = moment(month, 'YYYY-MM').endOf('year');
        var prevIndex = -1;
        var nextIndex = -1;
        _.each(budgets, function(b, index) {
          var bStartMonth = moment(b.startMonth, 'YYYY-MM');
          var bEndMonth = moment(b.endMonth, 'YYYY-MM');
          if (newStartMonth.isAfter(bStartMonth) && newStartMonth.isBefore(bEndMonth)) {
            newStartMonth = bEndMonth;
          }
          if (newEndMonth.isAfter(bStartMonth) && newEndMonth.isBefore(bEndMonth)) {
            newEndMonth = b.startMonth;
          }
          if (newEndMonth.isBefore(bStartMonth)) {
            nextIndex = index;
          }
        });
        var newBudget = new Budgets({
          accountId: accountId,
          startMonth: newStartMonth.format('YYYY-MM'),
          endMonth: newEndMonth.format('YYYY-MM')
        });
        if (nextIndex === -1) {
          budgets.push(newBudget);
        } else {
          budgets.splice(nextIndex, 0, newBudget);
        }
        return newBudget;
      }
    };
  }
]);