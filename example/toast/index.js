var ZUI = require('../../dist/index');

Page(Object.assign({}, ZUI.Toast, {
  data: {},

  showToast() {
    this.showZuiToast('toast的内容');
  }
}));
