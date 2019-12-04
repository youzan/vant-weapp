import Page from '../../common/page';

Page({
  data: {
    show: false,
    showEmbedded: false
  },

  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },

  onClickShowEmbedded() {
    this.setData({ showEmbedded: true });
  },

  onClickHideEmbedded() {
    this.setData({ showEmbedded: false });
  },

  noop() {}
});
