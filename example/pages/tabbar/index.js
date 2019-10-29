import Page from '../../common/page';

Page({
  data: {
    active: 0,
    active2: 'home',
    active3: 0,
    active4: 0,
    active5: 0,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  }
});
