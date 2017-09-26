var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.NoticeBar, {
  onShow() {
    this.initZanNoticeBar()
  }
}))
