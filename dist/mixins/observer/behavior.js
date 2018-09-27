export var behavior = Behavior({
  created: function created() {
    var _this = this;

    if (!this.$options) {
      return;
    }

    var cache = {};
    var setData = this.setData;

    var _this$$options = this.$options(),
        computed = _this$$options.computed;

    var keys = Object.keys(computed);

    var calcComputed = function calcComputed() {
      var needUpdate = {};
      keys.forEach(function (key) {
        var value = computed[key].call(_this);

        if (cache[key] !== value) {
          cache[key] = needUpdate[key] = value;
        }
      });
      return needUpdate;
    };

    Object.defineProperty(this, 'setData', {
      writable: true
    });

    this.setData = function (data, callback) {
      data && setData.call(_this, data, callback);
      setData.call(_this, calcComputed());
    };
  },
  attached: function attached() {
    this.setData();
  }
});