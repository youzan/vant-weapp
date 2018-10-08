import { VantComponent } from '../common/component';
var FONT_COLOR = '#ed6a0c';
var BG_COLOR = '#fffbe8';
VantComponent({
  props: {
    text: {
      type: String,
      value: ''
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
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
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
  watch: {
    text: function text() {
      this.setData({}, this.init);
    }
  },
  created: function created() {
    if (this.data.mode) {
      this.setData({
        hasRightIcon: true
      });
    }
  },
  destroyed: function destroyed() {
    var timer = this.data.timer;
    timer && clearTimeout(timer);
  },
  methods: {
    init: function init() {
      var _this = this;

      this.getRect('.van-notice-bar__content').then(function (rect) {
        if (!rect || !rect.width) {
          return;
        }

        _this.setData({
          width: rect.width
        });

        _this.getRect('.van-notice-bar__content-wrap').then(function (rect) {
          if (!rect || !rect.width) {
            return;
          }

          var wrapWidth = rect.width;
          var _this$data = _this.data,
              width = _this$data.width,
              speed = _this$data.speed,
              scrollable = _this$data.scrollable,
              delay = _this$data.delay;

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
              _this.scroll();
            });
          }
        });
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      var _this$data2 = this.data,
          animation = _this$data2.animation,
          resetAnimation = _this$data2.resetAnimation,
          wrapWidth = _this$data2.wrapWidth,
          elapse = _this$data2.elapse,
          speed = _this$data2.speed;
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
        _this2.scroll();
      }, elapse);
      this.setData({
        timer: timer
      });
    },
    onClickIcon: function onClickIcon() {
      var timer = this.data.timer;
      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
});