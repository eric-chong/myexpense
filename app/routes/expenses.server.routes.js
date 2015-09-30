'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  accounts = require('../../app/controllers/accounts.server.controller'),
  expenses = require('../../app/controllers/expenses.server.controller');

module.exports = function(app) {
  // Expense Routes
  app.route('/accounts/:accountId/expenses')
    .get(users.requiresLogin, expenses.list)
    .post(users.requiresLogin, expenses.create);

  app.route('/accounts/:accountId/expenses/:expenseId')
    .get(expenses.read)
    .put(users.requiresLogin, accounts.hasAuthorization, expenses.update)
    .delete(users.requiresLogin, accounts.hasAuthorization, expenses.delete);

  // Finish by binding the account middleware
  app.param('accountId', accounts.accountByID);
  app.param('expenseId', expenses.expenseItemByID);
};
