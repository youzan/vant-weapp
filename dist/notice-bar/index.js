import { VantComponent } from '../common/component';
import { requestAnimationFrame } from '../common/utils';
VantComponent({
  props: {
    text: {
      type: String,
      value: '',
      observer() {
        wx.nextTick(() => {
          this.init();
        });
      },
    },
    mode: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    openType: {
      type: String,
      value: 'navigate',
    },
    delay: {
      type: Number,
      value: 1,
    },
    speed: {
      type: Number,
      value: 50,
      observer() {
        wx.nextTick(() => {
          this.init();
        });
      },
    },
    scrollable: {
      type: Boolean,
      value: true,
    },
    leftIcon: {
      type: String,
      value: '',
    },
    color: String,
    backgroundColor: String,
    background: String,
    wrapable: Boolean,
  },
  data: {
    show: true,
  },
  created() {
    this.resetAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    });
  },
  destroyed() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    init() {
      Promise.all([
        this.getRect('.van-notice-bar__content'),
        this.getRect('.van-notice-bar__wrap'),
      ]).then((rects) => {
        const [contentRect, wrapRect] = rects;
        if (
          contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width
        ) {
          return;
        }
        const { speed, scrollable, delay } = this.data;
        if (scrollable && wrapRect.width < contentRect.width) {
          const duration = (contentRect.width / speed) * 1000;
          this.wrapWidth = wrapRect.width;
          this.contentWidth = contentRect.width;
          this.duration = duration;
          this.animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
            delay,
          });
          this.scroll();
        }
      });
    },
    scroll() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.setData({
        animationData: this.resetAnimation
          .translateX(this.wrapWidth)
          .step()
          .export(),
      });
      requestAnimationFrame(() => {
        this.setData({
          animationData: this.animation
            .translateX(-this.contentWidth)
            .step()
            .export(),
        });
      });
      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration);
    },
    onClickIcon(event) {
      if (this.data.mode === 'closeable') {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.setData({ show: false });
        this.$emit('close', event.detail);
      }
    },
    onClick(event) {
      this.$emit('click', event);
    },
  },
});
