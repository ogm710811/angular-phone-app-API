/*jslint node: true */
'use strict';

const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({  
  brand: {
    type: String,
    required: [true, 'The phone brand is required']
  },
  name: {
    type: String,
    required: [true, 'The phone name is required']
  },
  specs: {
    type: Array,
    default: []
  },
  image: {
    type: String, default: ''
  }
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;