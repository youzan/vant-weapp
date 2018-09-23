import Page from '../../common/page';

Page({
  data: {
    radio1: '1',
    radio2: '2',
    radio3: '1'
  },

  onChange1(e) {
    this.setData({
      radio1: e.detail
    });
  },

  onChange2(e) {
    this.setData({
      radio2: e.detail
    });
  },

  onChange3(e) {
    this.setData({
      radio3: e.detail
    });
  },

  onClick(event) {
    const { value } = event.currentTarget.dataset;
    this.setData({
      radio3: value
    });
  }
});
