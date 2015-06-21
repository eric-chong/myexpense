'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * BudgetItem Schema
 */
var BudgetItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Budget item name cannot be blank'
  },
  amount: {
    type: Number,
    default: 0,
    required: 'Amount cannot be blank'
  },
  budget: {
    type: Schema.ObjectId,
    ref: 'Budget'
  }
});

mongoose.model('BudgetItem', BudgetItemSchema);
