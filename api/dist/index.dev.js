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
          return regeneratorRuntime.awrap(Chr.find({
            name: {
              $nin: ["當期限定角色2", "當期限定角色3"]
            }
          }));

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
  var randomNum, randomChr, randomRateUp, randomRateUpChrNumber, randomBoolean;
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

          if (!(randomNum >= 1.5 && randomNum <= 10)) {
            _context2.next = 18;
            break;
          }

          // once the user get the 5-star, he will have 50% chance to get the rateUp chr
          randomRateUp = Math.random() < 0.5 ? 0 : 1;
          randomRateUpChrNumber = Math.random() < 0.5 ? 2 : 3;

          if (!(randomRateUp === 0)) {
            _context2.next = 12;
            break;
          }

          _context2.t0 = randomChr;
          _context2.next = 15;
          break;

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(Chr.findOne({
            name: "\u7576\u671F\u9650\u5B9A\u89D2\u8272".concat(randomRateUpChrNumber)
          }));

        case 14:
          _context2.t0 = _context2.sent;

        case 15:
          randomChr = _context2.t0;
          _context2.next = 28;
          break;

        case 18:
          if (!(randomNum >= 0 && randomNum < 1.5)) {
            _context2.next = 28;
            break;
          }

          // once the user get the 6-star, he will have 50% chance to get the rateUp chr
          randomBoolean = Math.random() < 0.5 ? 0 : 1;

          if (!(randomBoolean === 0)) {
            _context2.next = 24;
            break;
          }

          _context2.t1 = randomChr;
          _context2.next = 27;
          break;

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(Chr.findOne({
            name: "當期限定角色"
          }));

        case 26:
          _context2.t1 = _context2.sent;

        case 27:
          randomChr = _context2.t1;

        case 28:
          res.json(randomChr);

        case 29:
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
          // every ten summons(once ten) will get at least one 4-star(or above) chr
          randomNum = Math.random() * 50; // 4 star charactor start from rateStart = 10 to rateEnd = 50
          // 5 star charactor start from rateStart = 1.5 to rateEnd = 10
          // 6 star charactor start from rateStart = 0 to rateEnd = 1.5 

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