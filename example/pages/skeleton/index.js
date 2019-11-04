import Page from '../../common/page';

Page({
  data: {
    show: false
  },

  onChange({ detail }) {
    this.setData({ show: detail });
  },
});
