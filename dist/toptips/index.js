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
        isShow: false,
        backgroundColor: BG_COLOR
      });
    }
  }
});