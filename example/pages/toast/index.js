const Zan = require('../../dist/index');
const Toast = require('../../dist/toast/toast');

Page({
  data: {},

  showToast() {
    // this.showZanToast('toast的内容');
    Toast({
      message: 'toast的内容',
      selector: '#zan-toast-test'
    })
  },

  showIconToast() {
    Toast({
      type: 'fail',
      message: 'toast的内容',
      selector: '#zan-toast-test'
    });
  },

  showImageToast() {
    Toast({
      message: 'toast的内容',
      selector: '#zan-toast-test',
      image: 'https://b.yzcdn.cn/v2/image/dashboard/secured_transaction/suc_green@2x.png'
    });
  },

  showLoadingToast() {
    Toast({
      type: 'loading',
      message: 'toast的内容',
      selector: '#zan-toast-test'
    });
    // this.showZanToast({
    //   title: 'toast的内容',
    //   icon: 'loading'
    // });
  },

  showOnlyIcon() {
    // this.showZanToast({
    //   icon: 'fail'
    // });
    Toast({
      type: 'fail',
      selector: '#zan-toast-test'
    });
  },

  // showLoading() {
  //   this.showZanLoading('加载中');
  // }
});
