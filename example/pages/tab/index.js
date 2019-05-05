import Page from '../../common/page';

Page({
  data: {
    tabs: [1, 2, 3, 4],
    tabsMore: [1, 2, 3, 4, 5, 6, 7, 8]
  },

  onClickDisabled(event) {
    wx.showToast({
      title: `标签 ${event.detail.index + 1} 已被禁用`,
      icon: 'none'
    });
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  onClickNavRight() {
    wx.showToast({
      title: '点击 right nav',
      icon: 'none'
    });
  },

  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  }
});
