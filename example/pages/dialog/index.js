import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';

Page({
  data: {
    show: false,
    username: '',
    password: ''
  },

  showCustomDialog() {
    this.setData({ show: true });
  },

  onClickAlert() {
    Dialog.alert({
      title: '标题',
      message: '内容'
    });
  },

  onClickAlert2() {
    Dialog.alert({
      message: '内容'
    });
  },

  onClickConfirm() {
    Dialog.confirm({
      title: '标题',
      message: '内容'
    });
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
  }
});
