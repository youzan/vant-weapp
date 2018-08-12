import Page from '../../common/page';

Page({
  data: {
    value: ''
  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onSearch(event) {
    if (event.detail) {
      wx.showToast({
        title: '搜索：' + event.detail,
        icon: 'none'
      });
    }
  },

  onCancel() {
    wx.showToast({
      title: '取消',
      icon: 'none'
    });
  }
});
