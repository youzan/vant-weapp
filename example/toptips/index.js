var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.TopTips, {
  data: {},

  showTopTips() {
    this.showZanTopTips('toptips的内容');
  }
}));
