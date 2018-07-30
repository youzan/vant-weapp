const Toast = require('../../dist/toast/toast');

Page({
  data: {},

  showToast() {
    Toast.setDefaultOptions({
      selector: '#van-toast-test'
    });

    Toast('toast的内容');
  },

  showIconToast() {
    Toast({
      type: 'fail',
      message: 'toast的内容',
      selector: '#van-toast-test'
    });
  },

  showImageToast() {
    Toast({
      message: 'toast的内容',
      selector: '#van-toast-test',
      image: 'https://b.yzcdn.cn/v2/image/dashboard/secured_transaction/suc_green@2x.png'
    });
  },

  showLoadingToast() {
    Toast({
      type: 'loading',
      message: 'toast的内容',
      selector: '#van-toast-test'
    });
  },

  showOnlyIcon() {
    Toast({
      type: 'fail',
      selector: '#van-toast-test'
    });
  },

  showEverToast() {
    Toast({
      message: 'toast的内容',
      selector: '#van-toast-test',
      timeout: -1
    });
  },

  showLoading() {
    Toast.loading({
      message: '加载中',
      selector: '#van-toast-test'
    });
  }
});
