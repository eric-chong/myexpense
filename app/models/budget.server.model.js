'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Budget Schema
 */
var BudgetSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  account: {
    type: Schema.ObjectId,
    ref: 'Account'
  },
  startMonth: {
    type: String,
    required: 'Start month cannot be blank'
  },
  endMonth: String
});

mongoose.model('Budget', BudgetSchema);
