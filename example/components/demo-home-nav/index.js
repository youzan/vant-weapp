Component({
  properties: {
    group: Object,
  },

  methods: {
    onClick(event) {
      const { url } = event.target.dataset;
      if (getCurrentPages().length > 9) {
        wx.redirectTo({ url });
      } else {
        wx.navigateTo({ url });
      }
    },
  },
});
