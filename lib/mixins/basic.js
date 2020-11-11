'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.basic = void 0;
exports.basic = Behavior({
  methods: {
    $emit: function (name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    set: function (data, callback) {
      this.setData(data, callback);
      return new Promise(function (resolve) {
        return wx.nextTick(resolve);
      });
    },
    getRect: function (selector, all) {
      var _this = this;
      return new Promise(function (resolve) {
        wx.createSelectorQuery()
          .in(_this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(function (rect) {
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
