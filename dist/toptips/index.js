'use strict';

var FONT_COLOR = '#fff';
var BG_COLOR = '#e64340';

Component({
  properties: {
    content: String,
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    },
    isShow: {
      type: Boolean,
      value: false
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


      this._timer && clearTimeout(this._timer);
      this.setData({
        isShow: true
      });

      if (duration > 0 && duration !== Infinity) {
        this._timer = setTimeout(function () {
          _this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      this._timer = clearTimeout(this._timer);

      this.setData({
        isShow: false
      });
    }
  }
});

function Toptips() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];
  var defaultOptions = {
    selector: '#zan-toptips',
    duration: 3000
  };

  options = Object.assign(defaultOptions, parseParam(options));

  var $toptips = ctx.selectComponent(options.selector);
  delete options.selector;

  $toptips.setData(Object.assign({}, options));
  $toptips && $toptips.show();
}

function parseParam() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return typeof params === 'object' ? params : { content: params };
}

module.exports = Toptips;