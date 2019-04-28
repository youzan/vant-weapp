import Page from '../../common/page';

Page({
  data: {
    value1: 3,
    value2: 3,
    value3: 3,
    value4: 4,
    value5: 3
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  }
});
