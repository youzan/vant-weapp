var ZanNoticeBar = {
  initZanNoticeBar: function () {
    this.zanNoticeBarNode = {};
    var _this = this
    wx.createSelectorQuery().select('#zan-noticebar__content').boundingClientRect(function (rect) {
      if (rect.width) {
        _this.zanNoticeBarNode.width = rect.width;
        wx.createSelectorQuery().select('#zan-noticebar__content-wrap').boundingClientRect(function (rect) {
          _this.zanNoticeBarNode.wrapWidth = rect.width;
          if (_this.zanNoticeBarNode.wrapWidth < _this.zanNoticeBarNode.width) {
            var mstime = _this.zanNoticeBarNode.width / 40 * 1000;
            _this.zanNoticeBarAnime = wx.createAnimation({
              duration: mstime,
              timingFunction: 'linear'
            });
            _this.zanNoticeBarResetAnime = wx.createAnimation({
              duration: 0,
              timingFunction: 'linear'
            });
            _this.scrollZanNoticeBar(mstime);
          }
        }).exec();
      } else {
        console.warn('页面缺少 noticebar 元素');
      }
    }).exec();
  },
  scrollZanNoticeBar: function (mstime) {
    var resetAnimationData = this.zanNoticeBarResetAnime.translateX(this.zanNoticeBarNode.wrapWidth).step();
    this.setData({
      zanNoticeBarAnimeData: resetAnimationData.export()
    });
    var aninationData = this.zanNoticeBarAnime.translateX(-mstime * 40 / 1000).step();
    var _this = this;
    setTimeout(function () {
      _this.setData({
        zanNoticeBarAnimeData: aninationData.export()
      });
    }, 100);

    setTimeout(function () {
      _this.scrollZanNoticeBar(mstime);
    }, mstime);
  }
};

module.exports = ZanNoticeBar;
