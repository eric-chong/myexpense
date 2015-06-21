'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    BudgetItem = mongoose.model('BudgetItem'),
    _ = require('lodash');

/**
 * Create a budgetItem
 */
exports.create = function(req, res) {
    var budgetItem = new BudgetItem(req.body);

    budgetItem.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(budgetItem);
        }
    });
};

/**
 * Show the current budgetItem
 */
exports.read = function(req, res) {
    res.json(req.budgetItem);
};

/**
 * Update a budgetItem
 */
exports.update = function(req, res) {
    var budgetItem = req.budgetItem;

    budgetItem = _.extend(budgetItem, req.body);

    budgetItem.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(budgetItem);
        }
    });
};

/**
 * Delete an budgetItem
 */
exports.delete = function(req, res) {
    var budgetItem = req.budgetItem;

    budgetItem.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(budgetItem);
        }
    });
};

/**
 * List of BudgetItems
 */
exports.list = function(req, res) {
  BudgetItem.find().sort('name').populate('budget').exec(function(err, budgetItems) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(budgetItems);
    }
  });
};

/**
 * BudgetItem middleware
 */
exports.budgetItemByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'BudgetItem is invalid'
    });
  }

  BudgetItem.findById(id).populate('account').exec(function(err, budgetItem) {
    if (err) return next(err);
    if (!budgetItem) {
      return res.status(404).send({
        message: 'BudgetItem not found'
      });
    }
    req.budgetItem = budgetItem;
    next();
  });
};

/**
 * Budget authorization middleware
 */
// exports.hasAuthorization = function(req, res, next) {
//     if (req.budgetItem.owner.id !== req.user.id) {
//         return res.status(403).send({
//             message: 'User is not authorized'
//         });
//     }
//     next();
// };
