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
    hasRightIcon: false
  },
  watch: {
    text: function text() {
      this.set({}, this.init);
    }
  },
  created: function created() {
    if (this.data.mode) {
      this.set({
        hasRightIcon: true
      });
    }

    this.resetAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    });
  },
  destroyed: function destroyed() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    init: function init() {
      var _this = this;

      Promise.all([this.getRect('.van-notice-bar__content'), this.getRect('.van-notice-bar__content-wrap')]).then(function (rects) {
        var contentRect = rects[0],
            wrapRect = rects[1];

        if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
          return;
        }

        var _this$data = _this.data,
            speed = _this$data.speed,
            scrollable = _this$data.scrollable,
            delay = _this$data.delay;

        if (scrollable && wrapRect.width < contentRect.width) {
          var duration = contentRect.width / speed * 1000;
          _this.wrapWidth = wrapRect.width;
          _this.contentWidth = contentRect.width;
          _this.duration = duration;
          _this.animation = wx.createAnimation({
            duration: duration,
            timingFunction: 'linear',
            delay: delay
          });

          _this.scroll();
        }
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.set({
        animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
      });
      setTimeout(function () {
        _this2.set({
          animationData: _this2.animation.translateX(-_this2.contentWidth).step().export()
        });
      }, 20);
      this.timer = setTimeout(function () {
        _this2.scroll();
      }, this.duration);
    },
    onClickIcon: function onClickIcon() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.set({
        show: false
      });
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
});