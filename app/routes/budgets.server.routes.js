'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  accounts = require('../../app/controllers/accounts.server.controller'),
  budgets = require('../../app/controllers/budgets.server.controller');

module.exports = function(app) {
  // Budget Routes
  app.route('/accounts/:accountId/budgets')
    .get(users.requiresLogin, budgets.list)
    .post(users.requiresLogin, budgets.create);

  app.route('/accounts/:accountId/budgets/:budgetId')
    .get(budgets.read)
    .put(users.requiresLogin, accounts.hasAuthorization, budgets.update)
    .delete(users.requiresLogin, accounts.hasAuthorization, budgets.delete);

  app.route('/accounts/:accountId/budgets/month/:budgetMonth')
    .get(users.requiresLogin, accounts.hasAuthorization, budgets.getByMonth);

  // Finish by binding the account middleware
  app.param('accountId', accounts.accountByID);
  app.param('budgetMonth', budgets.budgetByMonth);
};
