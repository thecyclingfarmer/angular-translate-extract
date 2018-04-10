'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PotAdapter = exports.PotObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pofile = require('pofile');

var _pofile2 = _interopRequireDefault(_pofile);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PotObject = exports.PotObject = function () {
  function PotObject(id) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, PotObject);

    this.id = id;
    this.msg = msg;
    this.ctx = ctx;
  }

  _createClass(PotObject, [{
    key: 'toString',
    value: function toString() {
      return 'msgctxt "' + PotObject.escapeString(this.ctx) + '"\nmsgid "' + PotObject.escapeString(this.id) + '"\nmsgstr "' + PotObject.escapeString(this.msg) + '"';
    }
  }]);

  return PotObject;
}();

PotObject.escapeString = function (str) {
  return ("" + str).replace(/"/g, '\\"');
};

var PotAdapter = exports.PotAdapter = function (_Adapter) {
  _inherits(PotAdapter, _Adapter);

  function PotAdapter(log, basePath) {
    _classCallCheck(this, PotAdapter);

    var _this = _possibleConstructorReturn(this, (PotAdapter.__proto__ || Object.getPrototypeOf(PotAdapter)).call(this, log, basePath));

    _this.params = {
      dest: '.',
      prefix: '',
      suffix: '.pot'
    };
    return _this;
  }

  _createClass(PotAdapter, [{
    key: 'persist',
    value: function persist(translations) {
      var catalog = new _pofile2.default();

      catalog.headers = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding': '8bit',
        'Project-Id-Version': ''
      };

      _lodash2.default.forEach(translations.getFlatTranslations(), function (value, msg) {
        catalog.items.push(new PotObject(msg, value));
      });

      catalog.items.sort(function (a, b) {
        return a.id.toLowerCase().localeCompare(b.id.toLowerCase());
      });

      var fullPath = _path2.default.resolve(this.basePath, this.params.dest, this.params.prefix + this.params.suffix);
      _fs2.default.writeFileSync(fullPath, catalog.toString());
    }
  }]);

  return PotAdapter;
}(_adapter2.default);