'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Budget = mongoose.model('Budget'),
    _ = require('lodash');

/**
 * Get budget of a specific month
 */
exports.getByMonth = function(req, res) {
  res.json(req.budget);
};

/**
 * Create a budget
 */
exports.create = function(req, res) {
    var budget = new Budget(req.body);
    budget.owner = req.user;

    budget.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(budget);
        }
    });
};

/**
 * Show the current budget
 */
exports.read = function(req, res) {
    res.json(req.budget);
};

/**
 * Update a budget
 */
exports.update = function(req, res) {
    var budget = req.budget;

    budget = _.extend(budget, req.body);

    budget.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(budget);
        }
    });
};

/**
 * Delete an budget
 */
exports.delete = function(req, res) {
    var budget = req.budget;

    budget.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(budget);
        }
    });
};

/**
 * List of Budgets
 */
exports.list = function(req, res) {
  Budget.find().sort('startMonth').populate('owner', 'displayName').exec(function(err, budgets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(budgets);
    }
  });
};

/**
 * Budget middleware
 */
exports.budgetByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Budget is invalid'
    });
  }

  Budget.findById(id).populate('account').exec(function(err, budget) {
    if (err) return next(err);
    if (!budget) {
      return res.status(404).send({
        message: 'Budget not found'
      });
    }
    req.budget = budget;
    next();
  });
};

exports.budgetByMonth = function(req, res, next, id) {
  Budget.find({account: req.account}).populate('account').exec(function(err, budgets) {
    if (err) return next(err);
    console.log(budgets);
    if (budgets && budgets.length === 0) {
      return res.status(404).send({
        message: 'Budget not found'
      });
    }
    next();
  });
};

/**
 * Budget authorization middleware
 */
// exports.hasAuthorization = function(req, res, next) {
//     if (req.budget.owner.id !== req.user.id) {
//         return res.status(403).send({
//             message: 'User is not authorized'
//         });
//     }
//     next();
// };
