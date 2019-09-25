import Page from '../../common/page';

Page({
  data: {
    active: 0,
    active2: 'home',
    active3: 0
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  }
});
