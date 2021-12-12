import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2018, 0, 1).getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate1: new Date(2018, 2, 31).getTime(),
    currentDate2: null,
    currentDate3: new Date(2018, 0, 1),
    currentDate4: '12:00',
    loading: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
      }

      return options;
    },
  },

  methods: {
    onInput(event) {
      const { detail, currentTarget } = event;
      const result = this.getResult(detail, currentTarget.dataset.type);

      Toast({
        context: this,
        message: result,
      });
    },

    getResult(time, type) {
      const date = new Date(time);
      switch (type) {
        case 'datetime':
          return date.toLocaleString();
        case 'date':
          return date.toLocaleDateString();
        case 'year-month':
          return `${date.getFullYear()}/${date.getMonth() + 1}`;
        case 'time':
          return time;
        default:
          return '';
      }
    },
  },
});
