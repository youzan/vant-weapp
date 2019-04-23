import list from '../../config';
import Page from '../../common/page';

Page({
  data: {
    list,
    activeName: []
  },

  onChangeCollapse(event) {
    this.setData({
      activeNames: event.detail
    });
  }
});
