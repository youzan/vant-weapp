import Page from '../../common/page';

Page({
  data: {
    value1: 3,
    value2: 3,
    value3: 4,
    value4: 2
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  }
});
