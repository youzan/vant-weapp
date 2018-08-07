'use strict';

var DatePicker = require('./date-picker');

var _require = require('./utils'),
    genNumber = _require.genNumber,
    moment = _require.moment;

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
    pickerView: {
      type: Boolean
    },
    date: {
      type: String,
      observer: function observer(value) {
        if (value === {}.toString()) {
          throw new Error('参数必须是一个字符串');
        }
        if (/^[0-9]+$/.test(value)) {
          value = +value;
        }
        !this._inited && this._init();
        this.updateDate(value);
      }
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
    !this._inited && this._init();
  },


  methods: {
    _init: function _init() {
      var _this = this;

      this._inited = true;
      this.use = {};

      ['years', 'months', 'days', 'hours', 'minutes', 'seconds'].forEach(function (item) {
        if ((_this.data.notUse || []).indexOf(item) === -1) {
          _this.use[item] = true;
        }
      });

      this.picker = new DatePicker(this.data.date);

      var _picker$getData = this.picker.getData(this.data.date),
          dataList = _picker$getData.dataList,
          selected = _picker$getData.selected;

      // 鬼他么知道为什么 dataList, selected 不能一起 setData


      this.setData({
        use: this.use,
        dataList: dataList
      }, function () {
        _this.setData({
          selected: selected
        });
      });

      this._indexs = selected;
    },
    updatePicker: function updatePicker() {
      var updateData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var _updateData = {};

      for (var _iterator = updateData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
        var col = _ref.col,
            index = _ref.index,
            data = _ref.data;

        if (~index && this._indexs[col] !== index || col === 0) {
          _updateData['selected[' + col + ']'] = index; // 更新索引
          this._indexs[col] = index;
        }

        if (data) {
          _updateData['dataList[' + col + ']'] = data;
        }
      }

      this.setData(_updateData);
    },
    updateDate: function updateDate(date) {
      var _this2 = this;

      var _picker$getData2 = this.picker.getData(date),
          dataList = _picker$getData2.dataList,
          selected = _picker$getData2.selected;

      this._indexs = selected;

      // 好像必须要等到 datalist 完成
      this.setData({ dataList: dataList }, function () {
        _this2.setData({
          selected: selected,
          text: _this2.getFormatStr()
        });
      });
    },
    getFormatStr: function getFormatStr() {
      var _this3 = this;

      var date = new Date();
      ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'].forEach(function (key, index) {
        var value = _this3.data.dataList[index][_this3._indexs[index]];
        if (key === 'Month') {
          value = +_this3.data.dataList[index][_this3._indexs[index]] - 1;
        }
        date['set' + key](+value);
      });

      return moment(date, this.data.format);
    },
    showPicker: function showPicker() {
      this.setData({
        show: true
      });
    },
    hidePicker: function hidePicker(e) {
      var action = e.currentTarget.dataset.action;


      this.setData({
        show: false
      });

      if (action === 'cancel') {
        this.cancel({
          detail: {}
        });
      } else {
        this.change({
          detail: {
            value: this._indexs
          }
        });
      }
    },
    columnchange: function columnchange(e) {
      var _e$detail = e.detail,
          column = _e$detail.column,
          value = _e$detail.value;

      var updateData = this.picker.update(column, value);
      this.updatePicker(updateData);
    },
    change: function change(e) {
      var value = e.detail.value;


      var data = this.data.dataList.map(function (item, index) {
        return +item[value[index]];
      });

      var day = data.slice(0, 3);
      var time = data.slice(3, 6);
      var date = new Date(day.join('/') + ' ' + time.join(':'));

      this.triggerEvent('change', {
        value: data,
        date: date
      });

      // 手动触发 columnchange
      for (var index = 0; index < value.length; index++) {
        if (this._indexs[index] !== value[index]) {
          this.columnchange({
            detail: {
              column: index,
              value: value[index]
            }
          });
        }
      }

      this.setData({
        text: this.getFormatStr()
      });
    },
    cancel: function cancel(e) {
      this.triggerEvent('cancel', e.detail);
    }
  }
});