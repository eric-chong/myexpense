'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    accounts = require('../../app/controllers/accounts.server.controller');

module.exports = function(app) {
    // Article Routes
    app.route('/accounts')
        .get(accounts.list)
        .post(users.requiresLogin, accounts.create);

    app.route('/accounts/:accountId')
        .get(accounts.read)
        .put(users.requiresLogin, accounts.hasAuthorization, accounts.update)
        .delete(users.requiresLogin, accounts.hasAuthorization, accounts.delete);

    // Finish by binding the account middleware
    app.param('accountId', accounts.accountByID);
};
