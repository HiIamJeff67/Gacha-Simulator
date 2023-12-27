"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority'); // .then(() => console.log("Connect to MongoDB"))
// .catch( error => console.log(error));
// mongoose.connection('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority');

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
app.get('/getGuarantee4star', function _callee3(req, res) {
  var randomNum, randomChr;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          randomNum = Math.random() * 50; // 4 star charactor start from rateStart = 10 to rateEnd = 50
          // 5 star charactor start from rateStart = 1.5 to rateEnd = 10

          console.log("The random guarantee item is : ".concat(randomNum));
          _context3.next = 4;
          return regeneratorRuntime.awrap(Chr.findOne({
            rateEnd: {
              $gte: randomNum
            },
            rateStart: {
              $lte: randomNum
            }
          }));

        case 4:
          randomChr = _context3.sent;
          res.json(randomChr);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  return console.log("Server started on PORT : ".concat(PORT));
});