'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * ExpenseItem Schema
 */
var ExpenseItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  expenseDate: {
    type: Date,
    default: Date.now,
    required: 'Date cannot be blank'
  },
  amount: {
    type: Number,
    default: 0,
    required: 'Amount cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  budgetItem: {
    type: Schema.ObjectId,
    ref: 'BudgetItem'
  }
});

mongoose.model('ExpenseItem', ExpenseItemSchema);
