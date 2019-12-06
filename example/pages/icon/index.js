import icons from '../../dist/@vant/icons/src/config';
import Page from '../../common/page';

Page({
  data: {
    icons,
    active: 0,
    demoIcon: 'success'
  },

  onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  }
});
