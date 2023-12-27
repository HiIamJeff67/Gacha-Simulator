"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CharacterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    required: true
  },
  rateUp: {
    type: Boolean,
    required: true
  },
  rateEnd: {
    type: Number,
    required: true
  },
  rateStart: {
    type: Number,
    required: true
  }
});
var Chr = mongoose.model("summonPool", CharacterSchema, "summonPool");
module.exports = Chr;