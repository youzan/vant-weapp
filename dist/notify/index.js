'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Component({
  properties: {
    text: String,
    color: {
      type: String,
      value: '#fff'
    },
    backgroundColor: {
      type: String,
      value: '#e64340'
    },
    duration: {
      type: Number,
      value: 3000
    }
  },

  methods: {
    show: function show() {
      var _this = this;

      var duration = this.data.duration;


      clearTimeout(this.timer);
      this.setData({
        show: true
      });

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(function () {
          _this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      clearTimeout(this.timer);
      this.setData({
        show: false
      });
    }
  }
});

var defaultOptions = {
  selector: '#van-notify',
  duration: 3000
};

function Notify() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];

  options = Object.assign({}, defaultOptions, parseParam(options));

  var el = ctx.selectComponent(options.selector);
  delete options.selector;

  if (el) {
    el.setData(_extends({}, options));
    el.show();
  }
}

function parseParam() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return typeof params === 'object' ? params : { text: params };
}

module.exports = Notify;