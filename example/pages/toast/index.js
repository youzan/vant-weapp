import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  showToast() {
    Toast('提示内容');
  },

  showLongToast() {
    Toast('这是一条长文字提示，超过一定字数就会换行');
  },

  showLoadingToast() {
    Toast.loading({ mask: true, message: '加载中...' });
  },

  showSuccessToast() {
    Toast.success('成功文案');
  },

  showFailToast() {
    Toast.fail('失败提示');
  },

  showCustomizedToast(duration) {
    const text = second => `倒计时 ${second} 秒`;
    const toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner',
      message: text(3)
    });

    let second = 3;
    const timer = setInterval(() => {
      second--;
      if (second) {
        toast.setData({ message: text(second) });
      } else {
        clearInterval(timer);
        Toast.clear();
      }
    }, 1000);
  }
});
