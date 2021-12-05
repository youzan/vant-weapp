import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  methods: {
    showToast() {
      Toast({ context: this, message: '提示内容' });
    },

    showLongToast() {
      Toast({
        context: this,
        message: '这是一条长文字提示，超过一定字数就会换行',
      });
    },

    showLoadingToast() {
      Toast.loading({ context: this, message: '加载中...', forbidClick: true });
    },

    showCustomLoadingToast() {
      Toast.loading({
        context: this,
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
    },

    showSuccessToast() {
      Toast.success({ context: this, message: '成功文案' });
    },

    showFailToast() {
      Toast.fail({ context: this, message: '失败提示' });
    },

    showCustomizedToast() {
      const text = (second) => `倒计时 ${second} 秒`;
      const toast = Toast.loading({
        context: this,
        duration: 0,
        forbidClick: true,
        message: text(3),
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast?.setData({ message: text(second) });
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);
    },
  },
});
