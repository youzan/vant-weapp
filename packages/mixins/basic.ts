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

    getRect(selector: string, all: boolean) {
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
