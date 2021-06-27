import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  data: {
    value1: 3,
    value2: 3,
    value3: 3,
    value4: 2.5,
    value5: 4,
    value6: 3,
    value8: 2,
  },

  onChange(event) {
    Toast('当前值：' + event.detail);
  },
});
