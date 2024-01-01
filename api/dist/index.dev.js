"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
/* ============================== Schema of 1999 and genshin ============================== */

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
/* ============================== connect to the database of 1999 ============================== */

var Reversed1999DBConnection = mongoose.createConnection('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority'); // .then(() => console.log("Connect to MongoDB"))
// .catch( error => console.log(error));

var Chr1999 = Reversed1999DBConnection.model("summonPool", CharacterSchema, "summonPool");
app.get('/allChrs', function _callee(req, res) {
  var chrs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Chr1999.find({
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
          return regeneratorRuntime.awrap(Chr1999.findOne({
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
          return regeneratorRuntime.awrap(Chr1999.findOne({
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
          return regeneratorRuntime.awrap(Chr1999.findOne({
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
          return regeneratorRuntime.awrap(Chr1999.findOne({
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
app.get('/getGuarantee6star', function _callee4(req, res) {
  var detector, randomBoolean, randomNum, randomChr;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          detector = Math.random();
          randomBoolean = detector < 0.5 ? 1 : 0;
          randomNum = randomBoolean === 0 ? Math.random() * 1.3636363 : 1.4; // use randomNum 1.4 to fetch the rateUpChr

          console.log("The random guarantee 6 star item is : ".concat(randomNum));
          _context4.next = 6;
          return regeneratorRuntime.awrap(Chr1999.findOne({
            rateEnd: {
              $gte: randomNum
            },
            rateStart: {
              $lte: randomNum
            }
          }));

        case 6:
          randomChr = _context4.sent;
          res.json(randomChr);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get('/getGuaranteeRateUp6star', function _callee5(req, res) {
  var returnChr;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Chr1999.findOne({
            rateUp: true,
            star: 6
          }));

        case 2:
          returnChr = _context5.sent;
          res.json(returnChr);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
/* ============================== connect to the database of genshin ============================== */

var genshinDBConnection = mongoose.createConnection('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/Genshin?retryWrites=true&w=majority');
var ChrGenshin = genshinDBConnection.model("Genshin-num1", CharacterSchema, "Genshin-num1");
app.get('/allChrs_2', function _callee6(req, res) {
  var chrs;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(ChrGenshin.find({
            name: {
              $nin: ["當期限定角色2", "當期限定角色3", "當期限定角色4"]
            }
          }));

        case 2:
          chrs = _context6.sent;
          res.json(chrs);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.get('/randomSelectOne_2', function _callee7(req, res) {
  var randomNum, randomChr, randomRateUp, randomRateUpChrNumber, randomBoolean;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          randomNum = Math.random() * 100;
          console.log("The random item is : ".concat(randomNum));
          _context7.next = 4;
          return regeneratorRuntime.awrap(ChrGenshin.findOne({
            rateEnd: {
              $gte: randomNum
            },
            rateStart: {
              $lte: randomNum
            }
          }));

        case 4:
          randomChr = _context7.sent;

          if (!(randomNum > 0.6 && randomNum < 5.7)) {
            _context7.next = 18;
            break;
          }

          // once the user get the 5-star, he will have 50% chance to get the rateUp chr
          randomRateUp = Math.random() < 0.5 ? 0 : 1;
          randomRateUpChrNumber = Math.random() < 0.5 ? 2 : 3;

          if (!(randomRateUp === 0)) {
            _context7.next = 12;
            break;
          }

          _context7.t0 = randomChr;
          _context7.next = 15;
          break;

        case 12:
          _context7.next = 14;
          return regeneratorRuntime.awrap(ChrGenshin.findOne({
            name: "\u7576\u671F\u9650\u5B9A\u89D2\u8272".concat(randomRateUpChrNumber)
          }));

        case 14:
          _context7.t0 = _context7.sent;

        case 15:
          randomChr = _context7.t0;
          _context7.next = 28;
          break;

        case 18:
          if (!(randomNum >= 0 && randomNum <= 0.6)) {
            _context7.next = 28;
            break;
          }

          // once the user get the 6-star, he will have 50% chance to get the rateUp chr
          randomBoolean = Math.random() < 0.5 ? 0 : 1;

          if (!(randomBoolean === 0)) {
            _context7.next = 24;
            break;
          }

          _context7.t1 = randomChr;
          _context7.next = 27;
          break;

        case 24:
          _context7.next = 26;
          return regeneratorRuntime.awrap(ChrGenshin.findOne({
            name: "當期限定角色"
          }));

        case 26:
          _context7.t1 = _context7.sent;

        case 27:
          randomChr = _context7.t1;

        case 28:
          res.json(randomChr);

        case 29:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get('/getGuarantee4star_2', function _callee8(req, res) {
  var randomNum, randomChr;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          // every ten summons(once ten) will get at least one 4-star(or above) chr
          randomNum = Math.random() * 5.7; // IDK

          console.log("The random guarantee item is : ".concat(randomNum));
          _context8.next = 4;
          return regeneratorRuntime.awrap(ChrGenshin.findOne({
            rateEnd: {
              $gte: randomNum
            },
            rateStart: {
              $lte: randomNum
            }
          }));

        case 4:
          randomChr = _context8.sent;
          res.json(randomChr);

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get('/getGuarantee5star_2', function _callee9(req, res) {
  var detector, randomBoolean, randomNum, randomChr;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          detector = Math.random();
          randomBoolean = detector < 0.5 ? 1 : 0;
          randomNum = randomBoolean === 0 ? Math.random() * 0.469 : 0.5; // use randomNum 1.4 to fetch the rateUpChr

          console.log("The random guarantee 5 star item is : ".concat(randomNum));
          _context9.next = 6;
          return regeneratorRuntime.awrap(ChrGenshin.findOne({
            rateEnd: {
              $gte: randomNum
            },
            rateStart: {
              $lte: randomNum
            }
          }));

        case 6:
          randomChr = _context9.sent;
          res.json(randomChr);

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.get('/getGuaranteeRateUp5star_2', function _callee10(req, res) {
  var returnChr;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(ChrGenshin.findOne({
            rateUp: true,
            star: 5
          }));

        case 2:
          returnChr = _context10.sent;
          res.json(returnChr);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  return console.log("Server started on PORT : ".concat(PORT));
});