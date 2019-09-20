import Page from '../../common/page';

Page({
  data: {
    show: false
  },
  onClickShow() {
    this.setData({ show: true });
  },
  onClickHide() {
    this.setData({ show: false });
  }
});
