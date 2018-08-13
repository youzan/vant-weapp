import config from '../../config';
import Page from '../../common/page';

Page({
  data: {
    list: config
  },

  onShareAppMessage() {
    return {
      title: 'Vant Weapp 组件库演示'
    };
  }
});
