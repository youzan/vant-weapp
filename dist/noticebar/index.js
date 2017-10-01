var ZanNoticeBar = {
  initZanNoticeBarScroll: function (componentId) {
    this.zanNoticeBarNode = this.zanNoticeBarNode || {};
    this.zanNoticeBarNode[`${componentId}`] = {
      width: undefined,
      wrapWidth: undefined,
      animation: null,
      resetAnimation: null
    };
    var currentComponent = this.zanNoticeBarNode[`${componentId}`];
    var _this = this;
    wx.createSelectorQuery().select(`#${componentId}__content`).boundingClientRect(function (rect) {
      if (rect.width) {
        currentComponent.width = rect.width;
        wx.createSelectorQuery().select(`#${componentId}__content-wrap`).boundingClientRect(function (rect) {
          currentComponent.wrapWidth = rect.width;
          if (currentComponent.wrapWidth < currentComponent.width) {
            var mstime = currentComponent.width / 40 * 1000;
            currentComponent.animation = wx.createAnimation({
              duration: mstime,
              timingFunction: 'linear'
            });
            currentComponent.resetAnimation = wx.createAnimation({
              duration: 0,
              timingFunction: 'linear'
            });
            _this.scrollZanNoticeBar(componentId, mstime);
          }
        }).exec();
      } else {
        console.warn('页面缺少 noticebar 元素');
      }
    }).exec();
  },
  scrollZanNoticeBar: function (componentId, mstime) {
    var currentComponent = this.zanNoticeBarNode[`${componentId}`];
    var resetAnimationData = currentComponent.resetAnimation.translateX(currentComponent.wrapWidth).step();
    this.setData({
      [`${componentId}.animationData`]: resetAnimationData.export()
    });
    var aninationData = currentComponent.animation.translateX(-mstime * 40 / 1000).step();
    var _this = this;
    setTimeout(function () {
      _this.setData({
        [`${componentId}.animationData`]: aninationData.export()
      });
    }, 100);

    setTimeout(function () {
      _this.scrollZanNoticeBar(componentId, mstime);
    }, mstime);
  }
};

module.exports = ZanNoticeBar;
