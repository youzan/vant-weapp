import Page from '../../common/page';

Page({
  data: {
    checked: true
  },

  onChange(event) {
    this.setData({ checked: event.detail });
  }
});
