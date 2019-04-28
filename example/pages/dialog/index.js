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

  onClickAlert() {
    Dialog.alert({
      title: '标题',
      message
    });
  },

  getUserInfo(event) {
    console.log(event.detail);
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

  onClose(event) {
    this.setData({
      show: false
    });
  }
});
