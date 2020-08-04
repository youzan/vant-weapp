import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';

const message = '代码是写出来给人看的，附带能在机器上运行';

Page({
  data: {
    show: false
  },

  showCustomDialog() {
    this.setData({ show: true });
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClickThemeAlert() {
    Dialog.alert({
      title: '标题',
      theme: 'round-button',
      message
    });
  },

  onClickThemeAlert2() {
    Dialog.alert({
      theme: 'round-button',
      message
    });
  },

  onClickAlert() {
    Dialog.alert({
      title: '标题',
      message
    });
  },

  onClickAlert2() {
    Dialog.alert({
      message
    });
  },

  onClickConfirm() {
    Dialog.confirm({
      title: '标题',
      message
    });
  },

  onClickAsyncClose() {
    Dialog.confirm({
      title: '标题',
      message,
      asyncClose: true
    })
      .then(() => {
        setTimeout(() => {
          Dialog.close();
        }, 1000);
      })
      .catch(() => {
        Dialog.close();
      });
  },

  onClose() {
    this.setData({
      show: false
    });
  }
});
