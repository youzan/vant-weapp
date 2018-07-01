'use strict';

var VALID_MODE = ['closeable'];
var FONT_COLOR = '#f60';
var BG_COLOR = '#fff7cc';

Component({
  properties: {
    text: {
      type: String,
      value: '',
      observer: function observer(newVal) {
        this.setData({}, this._init);
      }
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 0
    },
    speed: {
      type: Number,
      value: 40
    },
    scrollable: {
      type: Boolean,
      value: false
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    }
  },

  data: {
    show: true,
    hasRightIcon: false,
    width: undefined,
    wrapWidth: undefined,
    elapse: undefined,
    animation: null,
    resetAnimation: null,
    timer: null
  },

  attached: function attached() {
    var mode = this.data.mode;

    if (mode && this._checkMode(mode)) {
      this.setData({
        hasRightIcon: true
      });
    }
  },
  detached: function detached() {
    var timer = this.data.timer;

    timer && clearTimeout(timer);
  },


  methods: {
    _checkMode: function _checkMode(val) {
      var isValidMode = ~VALID_MODE.indexOf(val);
      if (!isValidMode) {
        console.warn('mode only accept value of ' + VALID_MODE + ', now get ' + val + '.');
      }
      return isValidMode;
    },
    _init: function _init() {
      var _this = this;

      wx.createSelectorQuery().in(this).select('.zan-noticebar__content').boundingClientRect(function (rect) {
        if (!rect || !rect.width) {
          return;
        }
        _this.setData({
          width: rect.width
        });

        wx.createSelectorQuery().in(_this).select('.zan-noticebar__content-wrap').boundingClientRect(function (rect) {
          if (!rect || !rect.width) {
            return;
          }

          var wrapWidth = rect.width;
          var _data = _this.data,
              width = _data.width,
              speed = _data.speed,
              scrollable = _data.scrollable,
              delay = _data.delay;


          if (scrollable && wrapWidth < width) {
            var elapse = width / speed * 1000;
            var animation = wx.createAnimation({
              duration: elapse,
              timeingFunction: 'linear',
              delay: delay
            });
            var resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            });

            _this.setData({
              elapse: elapse,
              wrapWidth: wrapWidth,
              animation: animation,
              resetAnimation: resetAnimation
            }, function () {
              _this._scroll();
            });
          }
        }).exec();
      }).exec();
    },
    _scroll: function _scroll() {
      var _this2 = this;

      var _data2 = this.data,
          animation = _data2.animation,
          resetAnimation = _data2.resetAnimation,
          wrapWidth = _data2.wrapWidth,
          elapse = _data2.elapse,
          speed = _data2.speed;

      resetAnimation.translateX(wrapWidth).step();
      var animationData = animation.translateX(-(elapse * speed) / 1000).step();
      this.setData({
        animationData: resetAnimation.export()
      });
      setTimeout(function () {
        _this2.setData({
          animationData: animationData.export()
        });
      }, 100);

      var timer = setTimeout(function () {
        _this2._scroll();
      }, elapse);

      this.setData({
        timer: timer
      });
    },
    _handleButtonClick: function _handleButtonClick() {
      var timer = this.data.timer;

      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
    }
  }
});