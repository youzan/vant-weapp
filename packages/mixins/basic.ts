export const basic = Behavior({
  methods: {
    $emit(
      name: string,
      detail?: Record<string, unknown>,
      options?: Record<string, unknown>
    ) {
      this.triggerEvent(name, detail, options);
    },

    set(data: object, callback: () => void) {
      this.setData(data, callback);

      return new Promise((resolve) => wx.nextTick(resolve));
    },
  },
});
