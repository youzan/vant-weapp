import { VantComponent } from '../common/component';

const currentYear = new Date().getFullYear();
const isValidDate = date => !isNaN(new Date(date).getTime());

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
    columns() {
      const results = this.getRanges().map(({ type, range }) => {
        const values = this.times(range[1] - range[0] + 1, index => {
          let value = range[0] + index;
          value = type === 'year' ? `${value}` : this.pad(value);
          return value;
        });

        return values;
      });

      return results;
    }
  },

  watch: {
    value(val) {
      const { data } = this;
      val = this.correctValue(val);
      const isEqual = val === data.innerValue;
      if (!isEqual) {
        this.setData({ innerValue: val }, () => {
          this.updateColumnValue(val);
          this.$emit('input', val);
        });
      }
    }
  },

  methods: {
    getRanges(): object[] {
      const { data } = this;
      if (data.type === 'time') {
        return [
          {
            type: 'hour',
            range: [data.minHour, data.maxHour]
          },
          {
            type: 'minute',
            range: [data.minMinute, data.maxMinute]
          }
        ];
      }

      const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary('max', data.innerValue);
      const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary('min', data.innerValue);

      const result = [
        {
          type: 'year',
          range: [minYear, maxYear]
        },
        {
          type: 'month',
          range: [minMonth, maxMonth]
        },
        {
          type: 'day',
          range: [minDate, maxDate]
        },
        {
          type: 'hour',
          range: [minHour, maxHour]
        },
        {
          type: 'minute',
          range: [minMinute, maxMinute]
        }
      ];

      if (data.type === 'date') result.splice(3, 2);
      if (data.type === 'year-month') result.splice(2, 3);
      return result;
    },

    pad(val: string | number): string {
      return `00${val}`.slice(-2);
    },

    correctValue(value) {
      const { data, pad } = this;
      // validate value
      const isDateType = data.type !== 'time';
      if (isDateType && !isValidDate(value)) {
        value = data.minDate;
      } else if (!isDateType && !value) {
        const { minHour } = data;
        value = `${pad(minHour)}:00`;
      }

      // time type
      if (!isDateType) {
        let [hour, minute] = value.split(':');
        hour = pad(range(hour, data.minHour, data.maxHour));
        minute = pad(range(minute, data.minMinute, data.maxMinute));

        return `${hour}:${minute}`;
      }

      // date type
      const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary('max', value);
      const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary('min', value);
      const minDay = new Date(minYear, minMonth - 1, minDate, minHour, minMinute);
      const maxDay = new Date(maxYear, maxMonth - 1, maxDate, maxHour, maxMinute);
      value = Math.max(value, minDay.getTime());
      value = Math.min(value, maxDay.getTime());

      return value;
    },

    times(n: number, iteratee: (number) => string): string[] {
      let index = -1;
      const result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    },

    getBoundary(type: string, innerValue: number): object {
      const value = new Date(innerValue);
      const boundary = new Date(this.data[`${type}Date`]);
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;

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
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    },

    getTrueValue(formattedValue: string): number {
      if (!formattedValue) return;
      while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1);
      }
      return parseInt(formattedValue, 10);
    },

    getMonthEndDay(year, month): number {
      return 32 - new Date(year, month - 1, 32).getDate();
    },

    onCancel() {
      this.$emit('cancel');
    },

    onConfirm(): void {
      this.$emit('confirm', this.data.innerValue);
    },

    onChange(event: Weapp.Event): void {
      const { data } = this;
      const pickerValue = event.detail.value;
      const values = pickerValue.map((value, index) => data.columns[index][value]);
      let value;

      if (data.type === 'time') {
        value = values.join(':');
      } else {
        const year = this.getTrueValue(values[0]);
        const month = this.getTrueValue(values[1]);
        const maxDate = this.getMonthEndDay(year, month);
        let date = this.getTrueValue(values[2]);
        if (data.type === 'year-month') {
          date = 1;
        }
        date = date > maxDate ? maxDate : date;
        let hour = 0;
        let minute = 0;
        if (data.type === 'datetime') {
          hour = this.getTrueValue(values[3]);
          minute = this.getTrueValue(values[4]);
        }
        value = new Date(year, month - 1, date, hour, minute);
      }
      value = this.correctValue(value);

      this.setData({ innerValue: value }, () => {
        this.updateColumnValue(value);
        this.$emit('input', value);
        this.$emit('change', this);
      });
    },

    getColumnValue(index) {
      return this.getValues()[index];
    },

    setColumnValue(index, value) {
      const { pickerValue, columns } = this.data;
      pickerValue[index] = columns[index].indexOf(value);
      this.setData({ pickerValue });
    },

    getColumnValues(index) {
      return this.data.columns[index];
    },

    setColumnValues(index, values) {
      const { columns } = this.data;
      columns[index] = values;
      this.setData({ columns });
    },

    getValues() {
      const { pickerValue, columns } = this.data;
      return pickerValue.map((value, index) => columns[index][value])
    },

    setValues(values) {
      const { columns } = this.data;
      this.setData({
        pickerValue: values.map((value, index) => columns[index].indexOf(value))
      });
    },

    updateColumnValue(value): void {
      let values = [];
      const { pad, data } = this;
      const { columns } = data;

      if (data.type === 'time') {
        const currentValue = value.split(':');
        values = [
          columns[0].indexOf(currentValue[0]),
          columns[1].indexOf(currentValue[1])
        ];
      } else {
        const date = new Date(value);
        values = [
          columns[0].indexOf(`${date.getFullYear()}`),
          columns[1].indexOf(pad(date.getMonth() + 1))
        ];
        if (data.type === 'date') {
          values.push(columns[2].indexOf(pad(date.getDate())));
        }
        if (data.type === 'datetime') {
          values.push(
            columns[2].indexOf(pad(date.getDate())),
            columns[3].indexOf(pad(date.getHours())),
            columns[4].indexOf(pad(date.getMinutes()))
          );
        }
      }

      this.setData({ pickerValue: values });
    }
  },

  created() {
    const innerValue = this.correctValue(this.data.value);
    this.setData({ innerValue }, () => {
      this.updateColumnValue(innerValue);
      this.$emit('input', innerValue);
    });
  }
});
