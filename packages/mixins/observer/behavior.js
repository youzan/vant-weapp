export const behavior = Behavior({
  created() {
    if (!this.$options) {
      return;
    }

    const cache = {};
    const keys = Object.keys(computed);
    const { setData } = this;
    const { computed } = this.$options();

    const calcComputed = () => {
      const needUpdate = {};
      keys.forEach(key => {
        const value = computed[key].call(this);

        if (cache[key] !== value) {
          cache[key] = needUpdate[key] = value;
        }
      });

      return needUpdate;
    };

    this.setData = (data, callback) => {
      data && setData.call(this, data, callback);
      setData.call(this, calcComputed());
    };
  },

  attached() {
    this.setData();
  }
});
