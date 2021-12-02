import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    value1: 3,
    value2: 3,
    value3: 3,
    value4: 2.5,
    value5: 4,
    value6: 3,
    value8: 2,
  },

  methods: {
    onChange(event) {
      Toast({
        context: this,
        message: '当前值：' + event.detail,
      });
    },
  },
});
