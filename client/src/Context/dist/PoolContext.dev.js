"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PoolContext = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PoolContext = (0, _react.createContext)();
exports.PoolContext = PoolContext;

var PoolContextProvider = function PoolContextProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentPool = _useState2[0],
      setCurrentPool = _useState2[1];

  (0, _react.useEffect)(function () {
    var fetchCurrentPoolInfo = function fetchCurrentPoolInfo() {
      var response, jsonData;
      return regeneratorRuntime.async(function fetchCurrentPoolInfo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(fetch('/PoolData1999.json'));

            case 3:
              response = _context.sent;

              if (response.ok) {
                _context.next = 6;
                break;
              }

              throw new Error("Failed to fetch JSON, status: ".concat(response.status));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(response.json());

            case 8:
              jsonData = _context.sent;
              setCurrentPool(jsonData);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.error("Error during fetching curPoolData from public json file: ".concat(_context.t0.message));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 12]]);
    };

    fetchCurrentPoolInfo();
  }, []);
};

(0, _react.useEffect)(function () {});