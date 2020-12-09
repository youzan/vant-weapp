export const basic = Behavior({
  methods: {
    $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    set(data, callback) {
      this.setData(data, callback);
      return new Promise((resolve) => wx.nextTick(resolve));
    },
  },
});
