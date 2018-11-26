import { VantComponent } from '../common/component';
import { isDef } from '../common/utils';
var currentYear = new Date().getFullYear();

var isValidDate = function isValidDate(date) {
  return isDef(date) && !isNaN(new Date(date).getTime());
};

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
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
    pickerValue: [],
    innerValue: Date.now()
  },
  computed: {
    columns: function columns() {
      var _this = this;

      var results = this.getRanges().map(function (_ref) {
        var type = _ref.type,
            range = _ref.range;

        var values = _this.times(range[1] - range[0] + 1, function (index) {
          var value = range[0] + index;
          value = type === 'year' ? "" + value : _this.pad(value);
          return value;
        });

        return values;
      });
      return results;
    }
  },
  watch: {
    value: function value(val) {
      var _this2 = this;

      var data = this.data;
      val = this.correctValue(val);
      var isEqual = val === data.innerValue;

      if (!isEqual) {
        this.setData({
          innerValue: val
        }, function () {
          _this2.updateColumnValue(val);

          _this2.$emit('input', val);
        });
      }
    }
  },
  methods: {
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
    pad: function pad(val) {
      return ("00" + val).slice(-2);
    },
    correctValue: function correctValue(value) {
      var data = this.data,
          pad = this.pad; // validate value

      var isDateType = data.type !== 'time';

      if (isDateType && !isValidDate(value)) {
        value = data.minDate;
      } else if (!isDateType && !value) {
        var minHour = data.minHour;
        value = pad(minHour) + ":00";
      } // time type


      if (!isDateType) {
        var _value$split = value.split(':'),
            hour = _value$split[0],
            minute = _value$split[1];

        hour = pad(range(hour, data.minHour, data.maxHour));
        minute = pad(range(minute, data.minMinute, data.maxMinute));
        return hour + ":" + minute;
      } // date type


      value = Math.max(value, data.minDate);
      value = Math.min(value, data.maxDate);
      return value;
    },
    times: function times(n, iteratee) {
      var index = -1;
      var result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }

      return result;
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
        date = this.getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
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
    getTrueValue: function getTrueValue(formattedValue) {
      if (!formattedValue) return;

      while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1);
      }

      return parseInt(formattedValue, 10);
    },
    getMonthEndDay: function getMonthEndDay(year, month) {
      return 32 - new Date(year, month - 1, 32).getDate();
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.data.innerValue);
    },
    onChange: function onChange(event) {
      var _this3 = this;

      var data = this.data;
      var pickerValue = event.detail.value;
      var values = pickerValue.map(function (value, index) {
        return data.columns[index][value];
      });
      var value;

      if (data.type === 'time') {
        value = values.join(':');
      } else {
        var year = this.getTrueValue(values[0]);
        var month = this.getTrueValue(values[1]);
        var maxDate = this.getMonthEndDay(year, month);
        var date = this.getTrueValue(values[2]);

        if (data.type === 'year-month') {
          date = 1;
        }

        date = date > maxDate ? maxDate : date;
        var hour = 0;
        var minute = 0;

        if (data.type === 'datetime') {
          hour = this.getTrueValue(values[3]);
          minute = this.getTrueValue(values[4]);
        }

        value = new Date(year, month - 1, date, hour, minute);
      }

      value = this.correctValue(value);
      this.setData({
        innerValue: value
      }, function () {
        _this3.updateColumnValue(value);

        _this3.$emit('input', value);

        _this3.$emit('change', _this3);
      });
    },
    getColumnValue: function getColumnValue(index) {
      return this.getValues()[index];
    },
    setColumnValue: function setColumnValue(index, value) {
      var _this$data = this.data,
          pickerValue = _this$data.pickerValue,
          columns = _this$data.columns;
      pickerValue[index] = columns[index].indexOf(value);
      this.setData({
        pickerValue: pickerValue
      });
    },
    getColumnValues: function getColumnValues(index) {
      return this.data.columns[index];
    },
    setColumnValues: function setColumnValues(index, values) {
      var columns = this.data.columns;
      columns[index] = values;
      this.setData({
        columns: columns
      });
    },
    getValues: function getValues() {
      var _this$data2 = this.data,
          pickerValue = _this$data2.pickerValue,
          columns = _this$data2.columns;
      return pickerValue.map(function (value, index) {
        return columns[index][value];
      });
    },
    setValues: function setValues(values) {
      var columns = this.data.columns;
      this.setData({
        pickerValue: values.map(function (value, index) {
          return columns[index].indexOf(value);
        })
      });
    },
    updateColumnValue: function updateColumnValue(value) {
      var values = [];
      var pad = this.pad,
          data = this.data;
      var columns = data.columns;

      if (data.type === 'time') {
        var currentValue = value.split(':');
        values = [columns[0].indexOf(currentValue[0]), columns[1].indexOf(currentValue[1])];
      } else {
        var date = new Date(value);
        values = [columns[0].indexOf("" + date.getFullYear()), columns[1].indexOf(pad(date.getMonth() + 1))];

        if (data.type === 'date') {
          values.push(columns[2].indexOf(pad(date.getDate())));
        }

        if (data.type === 'datetime') {
          values.push(columns[2].indexOf(pad(date.getDate())), columns[3].indexOf(pad(date.getHours())), columns[4].indexOf(pad(date.getMinutes())));
        }
      }

      this.setData({
        pickerValue: values
      });
    }
  },
  created: function created() {
    var _this4 = this;

    var innerValue = this.correctValue(this.data.value);
    this.setData({
      innerValue: innerValue
    }, function () {
      _this4.updateColumnValue(innerValue);

      _this4.$emit('input', innerValue);
    });
  }
});