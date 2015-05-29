'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Account = mongoose.model('Account'),
    _ = require('lodash');

/**
 * Create a account
 */
exports.create = function(req, res) {
    var account = new Account(req.body);
    account.owner = req.user;

    account.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(account);
        }
    });
};

/**
 * Show the current account
 */
exports.read = function(req, res) {
    res.json(req.account);
};

/**
 * Update a account
 */
exports.update = function(req, res) {
    var account = req.account;

    account = _.extend(account, req.body);

    account.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(account);
        }
    });
};

/**
 * Delete an account
 */
exports.delete = function(req, res) {
    var account = req.account;

    account.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(account);
        }
    });
};

/**
 * List of Accounts
 */
exports.list = function(req, res) {
  Account.find({'owner': req.user}).sort('-created').populate('owner', 'displayName').exec(function(err, accounts) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(accounts);
    }
  });
};

/**
 * Account middleware
 */
exports.accountByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Account is invalid'
        });
    }

    Account.findById(id).populate('owner', 'displayName').exec(function(err, account) {
        if (err) return next(err);
        if (!account) {
            return res.status(404).send({
                message: 'Account not found'
            });
        }
        req.account = account;
        next();
    });
};

/**
 * Account authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.account.owner.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
