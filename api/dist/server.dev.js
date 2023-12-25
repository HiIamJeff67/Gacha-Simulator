"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority').then(function () {
  return console.log("Connect to MongoDB");
})["catch"](function (error) {
  return console.log(error);
});

var Chr = require('./models/Character');

app.get('/allChrs', function _callee(req, res) {
  var chrs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Chr.find());

        case 2:
          chrs = _context.sent;
          res.json(chrs);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get('/randomSelectOne', function _callee2(req, res) {
  var randomNum, randomChr;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          randomNum = Math.random() * 100;
          console.log("The random item is : ".concat(randomNum));
          _context2.next = 4;
          return regeneratorRuntime.awrap(Chr.findOne({
            rateEnd: {
              $gte: randomNum
            },
            rateStart: {
              $lte: randomNum
            }
          }));

        case 4:
          randomChr = _context2.sent;
          res.json(randomChr);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  return console.log("Server started on PORT : ".concat(PORT));
});