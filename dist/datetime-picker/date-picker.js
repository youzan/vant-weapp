'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LIMIT_YEAR_COUNT = 50;

var _require = require('./utils'),
    genNumber = _require.genNumber,
    iso2utc = _require.iso2utc;

module.exports = function () {
  function DatePicker() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    _classCallCheck(this, DatePicker);

    this.types = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    this.months = genNumber(1, 12, 2);
    this.hours = genNumber(0, 23, 2);
    this.seconds = genNumber(0, 59, 2);
    this.minutes = genNumber(0, 59, 2);
    this._date = date;
  }

  DatePicker.prototype.getYears = function getYears(year) {
    var mid = Math.floor(LIMIT_YEAR_COUNT / 2);
    var min = year - mid;
    var max = year + (LIMIT_YEAR_COUNT - mid);
    return genNumber(min, max, 4);
  };

  DatePicker.prototype.lastDay = function lastDay(year, month) {
    return month !== 12 ? new Date(new Date(year + '/' + (month + 1) + '/1').getTime() - 24 * 60 * 60 * 1000).getDate() : 31;
  };

  DatePicker.prototype.getData = function getData(date) {
    date = date || this._date || new Date();

    // toUTCString ISO 格式部分 ios 手机会失败
    if (new Date(date).toString() === 'Invalid Date' && typeof date === 'string' && date.indexOf('-') > 0) {
      date = iso2utc(date);
    }

    var d = new Date(date);

    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var years = this.getYears(y);
    var lastDay = this.lastDay(y, m);
    var days = genNumber(1, lastDay, 2);

    this._years = years;
    this._dataList = [years, this.months, days, this.hours, this.minutes, this.seconds];
    this._indexs = [25, m - 1, d.getDate() - 1, d.getHours(), d.getMinutes(), d.getSeconds()];

    return {
      dataList: this._dataList,
      selected: this._indexs
    };
  };

  DatePicker.prototype.update = function update(col, index) {
    var type = this.types[col];
    switch (type) {
      case 'year':
        return this._updateYear(col, index);
      case 'month':
        return this._updateMonth(col, index);
      default:
        this._indexs[col] = index;
        return [{ col: col, index: index }];
    }
  };

  DatePicker.prototype._updateYear = function _updateYear(col, index, cb) {
    var years = this._dataList[col];
    var year = years[index];

    this._dataList[col] = this.getYears(+year);

    this._indexs[col] = Math.floor(LIMIT_YEAR_COUNT / 2);

    return [{ col: 0, index: this._indexs[col], data: this._dataList[col] }];
  };

  DatePicker.prototype._updateMonth = function _updateMonth(col, index) {
    var month = this._dataList[col][index];
    var year = this._dataList[0][this._indexs[0]];
    var lastDay = this.lastDay(+year, +month);
    this._indexs[col] = index;
    this._dataList[2] = genNumber(1, lastDay, 2);
    this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2];

    return [{
      col: 1,
      index: index
    }, {
      col: 2,
      index: this._indexs[2],
      data: this._dataList[2]
    }];
  };

  return DatePicker;
}();