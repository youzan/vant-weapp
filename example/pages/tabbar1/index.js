import Page from '../../common/page';

Page({
  data: {
    active: 0,
    active2: 0,
    icon: {
      normal:
        'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
      active:
        'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
    }
  },

  onShow() {
    this.getTabBar().init();
  },

  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  }
});
