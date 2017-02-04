var ZUI = require('../../dist/index');

Page(Object.assign({}, ZUI.TopTips, {
  data: {},

  showTopTips() {
    this.showZuiTopTips('toptips的内容');
  }
}));
