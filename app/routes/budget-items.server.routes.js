'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  accounts = require('../../app/controllers/accounts.server.controller'),
  budgets = require('../../app/controllers/budgets.server.controller'),
  budgetItems = require('../../app/controllers/budget-items.server.controller');

module.exports = function(app) {
  // Budget item Routes
  app.route('/accounts/:accountId/budgets/:budgetId/budgetItems')
    .get(users.requiresLogin, accounts.hasAuthorization, budgetItems.list)
    .post(users.requiresLogin, accounts.hasAuthorization, budgetItems.create);

  app.route('/accounts/:accountId/budgets/:budgetId/budgetItems/:budgetItemId')
    .get(budgetItems.read)
    .put(users.requiresLogin, accounts.hasAuthorization, budgetItems.update)
    .delete(users.requiresLogin, accounts.hasAuthorization, budgetItems.delete);

  // Finish by binding the account middleware
  app.param('accountId', accounts.accountByID);
  app.param('budgetId', budgets.budgetByID);
  app.param('budgetItemId', budgetItems.budgetItemByID);
};
