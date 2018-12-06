export const behavior = Behavior({
  created() {
    if (!this.$options) {
      return;
    }

    const cache = {};
    const { computed } = this.$options();
    const keys = Object.keys(computed);

    this.calcComputed = () => {
      const needUpdate = {};
      keys.forEach(key => {
        const value = computed[key].call(this);

        if (cache[key] !== value) {
          cache[key] = needUpdate[key] = value;
        }
      });

      return needUpdate;
    };
  },

  attached() {
    this.set();
  },

  methods: {
    // set data and set computed data
    set(data, callback) {
      if (data) {
        this.setData(data, callback);
      }

      if (this.calcComputed) {
        this.setData(this.calcComputed());
      }
    }
  }
});
