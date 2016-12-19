var topTips = require('../../zui/toptips/index');

Page(Object.assign({}, topTips, {
  data: {},

  showTopTips() {
    this.showZuiTopTips('哎呀，出了点小问题');
  }
}));
