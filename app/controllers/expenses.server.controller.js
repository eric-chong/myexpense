'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    ExpenseItem = mongoose.model('ExpenseItem'),
    _ = require('lodash');

/**
 * Create a expenseItem
 */
exports.create = function(req, res) {
    var expenseItem = new ExpenseItem(req.body);

    expenseItem.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(expenseItem);
        }
    });
};

/**
 * Show the current expenseItem
 */
exports.read = function(req, res) {
    res.json(req.expenseItem);
};

/**
 * Update a expenseItem
 */
exports.update = function(req, res) {
    var expenseItem = req.expenseItem;

    expenseItem = _.extend(expenseItem, req.body);

    expenseItem.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(expenseItem);
        }
    });
};

/**
 * Delete an expenseItem
 */
exports.delete = function(req, res) {
    var expenseItem = req.expenseItem;

    expenseItem.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(expenseItem);
        }
    });
};

/**
 * List of ExpenseItems
 */
exports.list = function(req, res) {
  if (_.isUndefined(req.query.expenseMonth)) {  
    ExpenseItem.find().sort('expenseDate').populate('budgetItem').exec(function(err, expenseItems) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(expenseItems);
      }
    });
  } else {
    ExpenseItem.find().sort('expenseDate').populate('budgetItem').exec(function(err, expenseItems) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(expenseItems);
      }
    });    
  }
};

/**
 * ExpenseItem middleware
 */
exports.expenseItemByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'ExpenseItem is invalid'
    });
  }

  ExpenseItem.findById(id).populate('account').exec(function(err, expenseItem) {
    if (err) return next(err);
    if (!expenseItem) {
      return res.status(404).send({
        message: 'ExpenseItem not found'
      });
    }
    req.expenseItem = expenseItem;
    next();
  });
};

/**
 * Budget authorization middleware
 */
// exports.hasAuthorization = function(req, res, next) {
//     if (req.expenseItem.owner.id !== req.user.id) {
//         return res.status(403).send({
//             message: 'User is not authorized'
//         });
//     }
//     next();
// };
