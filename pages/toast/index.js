var ZUI = require('../../zui/index');

Page(Object.assign({}, ZUI.Toast, {
  data: {},

  showToast() {
    this.showZuiToast('哎呀，出了点小问题');
  }
}));
