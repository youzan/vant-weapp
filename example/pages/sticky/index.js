import Page from '../../common/page';

Page({
  data: {
    container: null
  },

  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container')
    });
  }
});
