Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'home-o',
        text: 'tabbar示例1',
        url: '/pages/tabbar/index'
      },
      {
        icon: 'search',
        text: 'tabbar示例2',
        url: '/pages/tabbar1/index'
      }
    ]
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
