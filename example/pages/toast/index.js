const Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Toast, {
  data: {},

  showToast() {
    this.showZanToast('toast的内容');
  },

  showIconToast() {
    this.showZanToast({
      title: 'toast的内容',
      icon: 'fail'
    });
  },

  showImageToast() {
    this.showZanToast({
      title: 'toast的内容',
      image: 'https://b.yzcdn.cn/v2/image/dashboard/secured_transaction/suc_green@2x.png'
    });
  },

  showLoadingToast() {
    this.showZanToast({
      title: 'toast的内容',
      icon: 'loading'
    });
  },

  showOnlyIcon() {
    this.showZanToast({
      icon: 'fail'
    });
  },

  showLoading() {
    this.showZanLoading('加载中');
  }
}));
