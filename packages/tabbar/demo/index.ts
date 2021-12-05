import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    active: 0,
    active2: 'home',
    active3: 0,
    active4: 0,
    active5: 0,
    active6: 0,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png',
    },
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({ [key]: event.detail });
    },

    handleChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({ [key]: event.detail });
      wx.showToast({ title: `点击标签 ${event.detail + 1}`, icon: 'none' });
    },
  },
});
