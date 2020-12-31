export const basic = Behavior({
  methods: {
    $emit(
      name: string,
      detail?: Record<string, unknown>,
      options?: WechatMiniprogram.Component.TriggerEventOption
    ) {
      this.triggerEvent(name, detail, options);
    },

    set(data: Record<string, unknown>) {
      this.setData(data);

      return new Promise((resolve) => wx.nextTick(resolve));
    },
  },
});
