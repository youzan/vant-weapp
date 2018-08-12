import Page from '../../common/page';

Page({
  data: {
    checked: true,
    checked2: true
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  onChange2({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否切换开关？',
      success: res => {
        if (res.confirm) {
          this.setData({ checked2: detail });
        }
      }
    });
  }
});
