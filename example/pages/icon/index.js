import icons from '../../dist/@vant/icons/src/config';
import Page from '../../common/page';

Page({
  data: {
    icons,
    active: 0,
    demoIcon: 'chat-o',
    demoImage: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  },

  onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  }
});
