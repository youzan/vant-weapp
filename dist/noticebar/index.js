var ZanNoticeBar = {
  initZanNoticeBar: function () {
    var node = {};
    var _this = this
    wx.createSelectorQuery().select('#zan-noticebar__content').boundingClientRect(function (rect) {
      node.width = rect.width;
      if (node.width) {
        wx.createSelectorQuery().select('#zan-noticebar__content-wrap').boundingClientRect(function (rect) {
          node.wrapWidth = rect.width;
          if (node.wrapWidth < node.width) {
            var mstime = node.width / 40 * 1000;
            _this.zanNoticeBarAnime = wx.createAnimation({
              duration: mstime,
              timingFunction: 'linear'
            });
            _this.zanNoticeBarResetAnime = wx.createAnimation({
              duration: 0,
              timingFunction: 'linear'
            })
            _this.scrollZanNoticeBar(mstime);
          }
        }).exec();
      } else {
        console.warn('页面缺少 noticebar 元素');
      }
    }).exec();
  },
  scrollZanNoticeBar: function (mstime) {
    var resetAnimationData = this.zanNoticeBarResetAnime.translateX(0).step();
    this.setData({
      zanNoticeBarAnimeData: resetAnimationData.export()
    });
    var aninationData = this.zanNoticeBarAnime.translateX(-mstime * 40 / 1000).step();
    var _this = this;
    setTimeout(function () {
      _this.setData({
        zanNoticeBarAnimeData: aninationData.export()
      });
    }, 100)

    setTimeout(function () {
      _this.scrollZanNoticeBar(mstime);
    }, mstime);
  }
};

module.exports = ZanNoticeBar;
