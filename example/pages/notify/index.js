import Page from '../../common/page';
import Notify from '../../dist/notify/notify';

Page({
  showNotify() {
    Notify('通知内容');
  },

  showNotify2() {
    Notify({
      duration: 1000,
      text: '通知内容',
      selector: '#custom-selector',
      backgroundColor: '#1989fa',
      safeAreaInsetTop: true
    });
  },

  onClickLeft() {
    wx.navigateBack();
  }
});
