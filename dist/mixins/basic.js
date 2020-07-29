export const basic = Behavior({
  methods: {
    $emit(...args) {
      this.triggerEvent(...args);
    },
    set(data, callback) {
      this.setData(data, callback);
      return new Promise((resolve) => wx.nextTick(resolve));
    },
    getRect(selector, all) {
      return new Promise((resolve) => {
        wx.createSelectorQuery()
          .in(this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
  },
});
