const Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Toast, {
  data: {},

  showToast() {
    this.showZanToast('toast的内容');
  }
}));
