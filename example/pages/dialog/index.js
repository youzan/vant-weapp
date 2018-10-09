import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';

const message = '有赞是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者';

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
