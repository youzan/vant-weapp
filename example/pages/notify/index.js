import Page from '../../common/page';
import Notify from '../../dist/notify/notify';

Page({
  showNotify() {
    Notify('通知内容');
  },

  showCustomColor() {
    Notify({
      message: '自定义颜色',
      color: '#ad0000',
      background: '#ffe1e1'
    });
  },

  showCustomDuration() {
    Notify({
      duration: 1000,
      message: '自定义时长'
    });
  },

  showNotifyByType(event) {
    const { type } = event.currentTarget.dataset;
    Notify({
      type,
      message: '通知内容'
    });
  },

  showSafe() {
    Notify({
      message: '通知内容',
      safeAreaInsetTop: true
    });
  }
});
