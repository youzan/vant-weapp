import Page from '../../common/page';

Page({
  data: {
    activeTab: 0,
  },

  onChange(event) {
    this.setData({
      activeTab: event.detail.name,
    });
  },
});
