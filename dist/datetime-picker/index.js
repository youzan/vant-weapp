import { VantComponent } from '../common/component';
import { isDef } from '../common/utils';
var currentYear = new Date().getFullYear();

function isValidDate(date) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function padZero(val) {
  return ("00" + val).slice(-2);
}

function times(n, iteratee) {
  var index = -1;
  var result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

function getTrueValue(formattedValue) {
  if (!formattedValue) return;

  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }

  return parseInt(formattedValue, 10);
}

function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

VantComponent({
  props: {
    value: null,
    title: String,
    loading: Boolean,
    itemHeight: {
      type: Number,
      value: 44
    },
    visibleItemCount: {
      type: Number,
      value: 5
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    type: {
      type: String,
      value: 'datetime'
    },
    showToolbar: {
      type: Boolean,
      value: true
    },
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime()
    },
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime()
    },
    minHour: {
      type: Number,
      value: 0
    },
    maxHour: {
      type: Number,
      value: 23
    },
    minMinute: {
      type: Number,
      value: 0
    },
    maxMinute: {
      type: Number,
      value: 59
    }
  },
  data: {
    innerValue: Date.now(),
    columns: []
  },
  watch: {
    value: function value(val) {
      var _this = this;

      var data = this.data;
      val = this.correctValue(val);
      var isEqual = val === data.innerValue;

      if (!isEqual) {
        this.updateColumnValue(val).then(function () {
          _this.$emit('input', val);
        });
      }
    },
    type: 'updateColumns',
    minHour: 'updateColumns',
    maxHour: 'updateColumns',
    minMinute: 'updateColumns',
    maxMinute: 'updateColumns'
  },
  methods: {
    getPicker: function getPicker() {
      if (this.picker == null) {
        var picker = this.picker = this.selectComponent('.van-datetime-picker');
        var setColumnValues = picker.setColumnValues;

        picker.setColumnValues = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return setColumnValues.apply(picker, [].concat(args, [false]));
        };
      }

      return this.picker;
    },
    updateColumns: function updateColumns() {
      var results = this.getRanges().map(function (_ref, index) {
        var type = _ref.type,
            range = _ref.range;
        var values = times(range[1] - range[0] + 1, function (index) {
          var value = range[0] + index;
          value = type === 'year' ? "" + value : padZero(value);
          return value;
        });
        return {
          values: values
        };
      });
      return this.set({
        columns: results
      });
    },
    getRanges: function getRanges() {
      var data = this.data;

      if (data.type === 'time') {
        return [{
          type: 'hour',
          range: [data.minHour, data.maxHour]
        }, {
          type: 'minute',
          range: [data.minMinute, data.maxMinute]
        }];
      }

      var _this$getBoundary = this.getBoundary('max', data.innerValue),
          maxYear = _this$getBoundary.maxYear,
          maxDate = _this$getBoundary.maxDate,
          maxMonth = _this$getBoundary.maxMonth,
          maxHour = _this$getBoundary.maxHour,
          maxMinute = _this$getBoundary.maxMinute;

      var _this$getBoundary2 = this.getBoundary('min', data.innerValue),
          minYear = _this$getBoundary2.minYear,
          minDate = _this$getBoundary2.minDate,
          minMonth = _this$getBoundary2.minMonth,
          minHour = _this$getBoundary2.minHour,
          minMinute = _this$getBoundary2.minMinute;

      var result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'day',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }];
      if (data.type === 'date') result.splice(3, 2);
      if (data.type === 'year-month') result.splice(2, 3);
      return result;
    },
    correctValue: function correctValue(value) {
      var data = this.data; // validate value

      var isDateType = data.type !== 'time';

      if (isDateType && !isValidDate(value)) {
        value = data.minDate;
      } else if (!isDateType && !value) {
        var minHour = data.minHour;
        value = padZero(minHour) + ":00";
      } // time type


      if (!isDateType) {
        var _value$split = value.split(':'),
            hour = _value$split[0],
            minute = _value$split[1];

        hour = padZero(range(hour, data.minHour, data.maxHour));
        minute = padZero(range(minute, data.minMinute, data.maxMinute));
        return hour + ":" + minute;
      } // date type


      value = Math.max(value, data.minDate);
      value = Math.min(value, data.maxDate);
      return value;
    },
    getBoundary: function getBoundary(type, innerValue) {
      var value = new Date(innerValue);
      var boundary = new Date(this.data[type + "Date"]);
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return {
        [type + "Year"]: year,
        [type + "Month"]: month,
        [type + "Date"]: date,
        [type + "Hour"]: hour,
        [type + "Minute"]: minute
      };
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.data.innerValue);
    },
    onChange: function onChange() {
      var _this2 = this;

      var data = this.data;
      var value;
      var picker = this.getPicker();

      if (data.type === 'time') {
        var indexes = picker.getIndexes();
        value = indexes[0] + data.minHour + ":" + (indexes[1] + data.minMinute);
      } else {
        var values = picker.getValues();
        var year = getTrueValue(values[0]);
        var month = getTrueValue(values[1]);
        var maxDate = getMonthEndDay(year, month);
        var date = getTrueValue(values[2]);

        if (data.type === 'year-month') {
          date = 1;
        }

        date = date > maxDate ? maxDate : date;
        var hour = 0;
        var minute = 0;

        if (data.type === 'datetime') {
          hour = getTrueValue(values[3]);
          minute = getTrueValue(values[4]);
        }

        value = new Date(year, month - 1, date, hour, minute);
      }

      value = this.correctValue(value);
      this.updateColumnValue(value).then(function () {
        _this2.$emit('input', value);

        _this2.$emit('change', picker);
      });
    },
    updateColumnValue: function updateColumnValue(value) {
      var _this3 = this;

      var values = [];
      var data = this.data;
      var picker = this.getPicker();

      if (data.type === 'time') {
        var pair = value.split(':');
        values = [pair[0], pair[1]];
      } else {
        var date = new Date(value);
        values = ["" + date.getFullYear(), padZero(date.getMonth() + 1)];

        if (data.type === 'date') {
          values.push(padZero(date.getDate()));
        }

        if (data.type === 'datetime') {
          values.push(padZero(date.getDate()), padZero(date.getHours()), padZero(date.getMinutes()));
        }
      }

      return this.set({
        innerValue: value
      }).then(function () {
        return _this3.updateColumns();
      }).then(function () {
        return picker.setValues(values);
      });
    }
  },
  created: function created() {
    var _this4 = this;

    var innerValue = this.correctValue(this.data.value);
    this.updateColumnValue(innerValue).then(function () {
      _this4.$emit('input', innerValue);
    });
  }
});