import { VantComponent } from '../../common/component';
import Notify from '../../notify/notify';

VantComponent({
  methods: {
    showNotify() {
      Notify({ context: this, message: '通知内容' });
    },

    showCustomColor() {
      Notify({
        context: this,
        message: '自定义颜色',
        color: '#ad0000',
        background: '#ffe1e1',
      });

      Notify.clear();
    },

    showCustomDuration() {
      Notify({
        context: this,
        duration: 1000,
        message: '自定义时长',
      });
    },

    showNotifyByType(event) {
      const { type } = event.currentTarget.dataset;
      Notify({
        type,
        context: this,
        message: '通知内容',
      });
    },

    showSafe() {
      Notify({
        context: this,
        message: '通知内容',
        safeAreaInsetTop: true,
      });
    },
  },
});
