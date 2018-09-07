export const basic = Behavior({
  methods: {
    $emit() {
      this.triggerEvent.apply(this, arguments);
    },

    getRect(selector, all) {
      return new Promise((resolve, reject) => {
        wx.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            rect && resolve(rect);
          })
          .exec();
      });
    }
  }
});
