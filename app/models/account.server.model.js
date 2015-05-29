'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Account Schema
 */
var AccountSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Account name cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  accessList: [
    {
      user: { type: Schema.ObjectId, ref: 'User' },
      accessLevel: String
    }
  ]
});

mongoose.model('Account', AccountSchema);
