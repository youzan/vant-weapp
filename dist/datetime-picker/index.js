'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function partStartWithZero(num, strlen) {
  var zeros = '';
  while (zeros.length < strlen) {
    zeros += '0';
  }
  return (zeros + num).slice(-strlen);
}

function genNumber(begin, end, strlen) {
  var nums = [];
  while (begin <= end) {
    nums.push(partStartWithZero(begin, strlen));
    begin++;
  }
  return nums;
}

function moment(date) {
  var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY:MM:DD';

  if (!date && date !== 0) date = new Date();

  date = new Date(date);
  if (date.toString() === 'Invalid Date') throw new Error('Invalid Date');

  var getDateValue = function getDateValue(method, fn) {
    return fn ? fn(date['get' + method]()) : date['get' + method]();
  };
  var map = new Map();

  map.set(/(Y+)/i, function () {
    return getDateValue('FullYear', function (year) {
      return (year + '').substr(4 - RegExp.$1.length);
    });
  });
  map.set(/(M+)/, function () {
    return getDateValue('Month', function (month) {
      return partStartWithZero(month + 1, RegExp.$1.length);
    });
  });
  map.set(/(D+)/i, function () {
    return getDateValue('Date', function (date) {
      return partStartWithZero(date, RegExp.$1.length);
    });
  });
  map.set(/(H+)/i, function () {
    return getDateValue('Hours', function (hour) {
      return partStartWithZero(hour, RegExp.$1.length);
    });
  });
  map.set(/(m+)/, function () {
    return getDateValue('Minutes', function (minute) {
      return partStartWithZero(minute, RegExp.$1.length);
    });
  });
  map.set(/(s+)/, function () {
    return getDateValue('Seconds', function (second) {
      return partStartWithZero(second, RegExp.$1.length);
    });
  });

  for (var _iterator = map, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    var _ref = _ref2;
    var reg = _ref[0];
    var fn = _ref[1];

    if (reg.test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, fn.call(null));
    }
  }

  return formatStr;
}

var LIMIT_YEAR_COUNT = 50;

var DatePicker = function () {
  function DatePicker(format) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
    var cb = arguments[2];

    _classCallCheck(this, DatePicker);

    this.types = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    this.months = genNumber(1, 12, 2);
    this.hours = genNumber(0, 23, 2);
    this.seconds = genNumber(0, 59, 2);
    this.minutes = genNumber(0, 59, 2);
    // this.format(format);
    this.init(date, cb);
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

  DatePicker.prototype.init = function init(date, cb) {
    var d = new Date(date);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var years = this.getYears(y);
    var lastDay = this.lastDay(y, m);

    var days = genNumber(1, lastDay, 2);

    this._years = years;
    this._dataList = [years, this.months, days, this.hours, this.minutes, this.seconds];
    this._indexs = [25, m - 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs
    });
  };

  DatePicker.prototype.update = function update(col, index, cb) {
    var type = this.types[col];
    switch (type) {
      case 'year':
        this._updateYear(col, index, cb);
        break;
      case 'month':
        this._updateMonth(col, index, cb);
        break;
      default:
        this._indexs[col] = index;
        cb && cb({
          dataList: this._dataList,
          indexs: this._indexs,
          updateColumn: col,
          updateIndex: index
        });
    }
  };

  DatePicker.prototype._updateYear = function _updateYear(col, index, cb) {
    var years = this._dataList[col];
    var year = years[index];

    this._dataList[col] = this.getYears(+year);

    this._indexs[col] = Math.floor(LIMIT_YEAR_COUNT / 2);
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs,
      updateColumn: col
    });
  };

  DatePicker.prototype._updateMonth = function _updateMonth(col, index, cb) {
    var month = this._dataList[col][index];
    var year = this._dataList[0][this._indexs[0]];
    var lastDay = this.lastDay(+year, +month);
    this._indexs[col] = index;
    this._dataList[2] = genNumber(1, lastDay, 2);
    this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2];
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs,
      updateColumn: 2,
      updateIndex: this._indexs[2]
    });
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs,
      updateColumn: 1,
      updateIndex: index
    });
  };

  return DatePicker;
}();
// 组件内使用 this.indexs 好像有问题


var _indexs = [];
Component({
  properties: {
    placeholder: {
      type: String,
      value: '请选择时间'
    },
    format: {
      type: String,
      value: 'YYYY-MM-DD HH:mm:ss'
    },
    native: {
      type: Boolean
    },
    pickerView: {
      type: Boolean
    },
    date: {
      type: String,
      value: new Date()
    },
    notUse: {
      type: Array
    }
  },
  externalClasses: ['placeholder-class'],
  data: {
    transPos: [0, 0, 0, 0, 0, 0]
  },
  attached: function attached() {
    var _this = this;

    this.use = {};['years', 'months', 'days', 'hours', 'minutes', 'seconds'].forEach(function (item) {
      if ((_this.data.notUse || []).indexOf(item) === -1) {
        _this.use[item] = true;
      }
    });
    this.setData({ use: this.use });
    this.data.pickerView && !this.data.native && this.showPicker();
  },
  ready: function ready() {
    // 微信 bug，如果不先定义会导致不能选中
    this.setData({
      "dataList": [["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043"], genNumber(1, 12, 2), genNumber(0, 31, 2), genNumber(0, 23, 2), genNumber(0, 59, 2), genNumber(0, 59, 2)]
    });
    this.picker = new DatePicker(this.data.format, this.data.date, this.updatePicker.bind(this));
  },

  methods: {
    updatePicker: function updatePicker(_ref3) {
      var dataList = _ref3.dataList,
          indexs = _ref3.indexs,
          updateColumn = _ref3.updateColumn,
          updateIndex = _ref3.updateIndex;

      var updateData = {};
      _indexs = indexs;
      // 指定更新某列数据，表示某列数据更新
      if (updateColumn) {
        updateData['transPos[' + updateColumn + ']'] = -36 * _indexs[updateColumn];
        updateData['dataList[' + updateColumn + ']'] = dataList[updateColumn];
      }
      // 指定更新某列索引，表示某列数据选中的索引已更新
      if (typeof updateIndex !== 'undefined') {
        updateData['transPos[' + updateColumn + ']'] = -36 * _indexs[updateColumn];
        updateData['selected[' + updateColumn + ']'] = indexs[updateColumn];
      }

      // 只在初始化时设置全部的值，其他的都局部更新
      if (!updateColumn && typeof updateIndex === 'undefined') {
        updateData = { dataList: dataList, selected: indexs };
        _indexs.forEach(function (item, index) {
          updateData['transPos[' + index + ']'] = -item * 36;
        });
      }

      this.setData(updateData);
    },
    touchmove: function touchmove(e) {
      var changedTouches = e.changedTouches,
          target = e.target;

      var col = target.dataset.col;
      var clientY = changedTouches[0].clientY;

      if (!col) return;

      var updateData = {};
      var itemLength = this.data.dataList[col].length;
      updateData['transPos[' + col + ']'] = this.startTransPos + (clientY - this.startY);
      if (updateData['transPos[' + col + ']'] >= 0) {
        updateData['transPos[' + col + ']'] = 0;
      } else if (-(itemLength - 1) * 36 >= updateData['transPos[' + col + ']']) {
        updateData['transPos[' + col + ']'] = -(itemLength - 1) * 36;
      }
      this.setData(updateData);
    },
    touchStart: function touchStart(e) {
      var target = e.target,
          changedTouches = e.changedTouches;

      var col = target.dataset.col;
      var touchData = changedTouches[0];
      if (!col) return;

      this.startY = touchData.clientY;
      this.startTime = e.timeStamp;
      this.startTransPos = this.data.transPos[col];
    },
    touchEnd: function touchEnd(e) {
      var col = e.target.dataset.col;

      if (!col) return;
      var pos = this.data.transPos[col];
      var itemIndex = Math.round(pos / 36);

      this.columnchange({ detail: { column: +col, value: -itemIndex } });
    },
    columnchange: function columnchange(e) {
      var _e$detail = e.detail,
          column = _e$detail.column,
          value = _e$detail.value;

      _indexs[column] = value;
      this.picker.update(column, value, this.updatePicker.bind(this));
      this.data.pickerView && !this.data.native && this.change({ detail: { value: _indexs } });
    },
    getFormatStr: function getFormatStr() {
      var _this2 = this;

      var date = new Date();['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'].forEach(function (key, index) {
        var value = _this2.data.dataList[index][_indexs[index]];
        if (key === 'Month') {
          value = +_this2.data.dataList[index][_indexs[index]] - 1;
        }
        date['set' + key](+value);
      });

      return moment(date, this.data.format);
    },
    showPicker: function showPicker() {
      this.setData({ show: true });
    },
    hidePicker: function hidePicker(e) {
      var action = e.currentTarget.dataset.action;

      this.setData({ show: false });
      if (action === 'cancel') {
        this.cancel({ detail: {} });
      } else {
        this.change({ detail: { value: _indexs } });
      }
    },
    change: function change(e) {
      var value = e.detail.value;


      var data = this.data.dataList.map(function (item, index) {
        return +item[value[index]];
      });

      this.triggerEvent('change', { value: data });

      // 为了支持原生 picker view，每次 change 都需要手动 columnchange
      if (this.data.pickerView && this.data.native) {
        for (var index = 0; index < value.length; index++) {
          if (_indexs[index] !== value[index]) {
            this.columnchange({
              detail: {
                column: index, value: value[index]
              }
            });
            break; // 这里每次只处理一列，否则会出现日期值为 undefined 的情况
          }
        }
      }

      this.setData({ text: this.getFormatStr() });
    },
    cancel: function cancel(e) {
      this.triggerEvent('cancel', e.detail);
    }
  }
});