import Page from '../../common/page';

Page({
  data: {
    value1: 3,
    value2: 4,
    value3: 2
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  }
});
