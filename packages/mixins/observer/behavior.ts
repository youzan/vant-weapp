export const behavior = Behavior({
  methods: {
    set(data: object, callback: Function) {
      return new Promise(resolve => {
        this.setData(data, () => {
          if (callback && typeof callback === 'function') {
            callback.call(this);
          }
          resolve();
        });
      });
    }
  }
});
