import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    value: 1,
  },

  methods: {
    onChange(event) {
      Toast.loading({
        context: this,
        forbidClick: true,
      });

      setTimeout(() => {
        Toast.clear();
        this.setData({ value: event.detail });
      }, 500);
    },
  },
});
