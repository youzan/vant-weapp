export const behavior = Behavior({
  methods: {
    set(data: object, callback: Function) {
      this.setData(data, callback);

      return new Promise(resolve => wx.nextTick(resolve));
    }
  }
});
