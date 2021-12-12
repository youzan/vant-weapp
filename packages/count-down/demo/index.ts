import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    time: 30 * 60 * 60 * 1000,
    timeData: {},
  },

  methods: {
    onChange(e) {
      this.setData({
        timeData: e.detail,
      });
    },

    start() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.start();
    },

    pause() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.pause();
    },

    reset() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.reset();
    },

    finished() {
      Toast({
        context: this,
        message: '倒计时结束',
      });
    },
  },
});
