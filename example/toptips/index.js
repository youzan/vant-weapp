var ZUI = require('../../dist/index');

Page(Object.assign({}, ZUI.TopTips, {
  data: {},

  showTopTips() {
    this.showZuiTopTips('哎呀，出了点小问题');
  }
}));
