import Page from '../../common/page';

Page({
  data: {
    container: null,
    scrollTop: 0,
    offsetTop: 0,
  },

  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container'),
    });
  },

  onScroll(event) {
    wx.createSelectorQuery()
      .select('#scroller')
      .boundingClientRect((res) => {
        this.setData({
          scrollTop: event.detail.scrollTop,
          offsetTop: res.top,
        });
      })
      .exec();
  },
});
