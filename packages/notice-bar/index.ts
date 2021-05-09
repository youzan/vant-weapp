import { VantComponent } from '../common/component';
import { getRect, requestAnimationFrame } from '../common/utils';

VantComponent({
  props: {
    text: {
      type: String,
      value: '',
      observer: 'init',
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
      observer: 'init',
    },
    scroll: {
      type: String,
      value: 'auto',
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
    scrollable: true,
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

  mounted() {
    this.init();
  },

  methods: {
    init() {
      requestAnimationFrame(() => {
        Promise.all([
          getRect(this, '.van-notice-bar__content'),
          getRect(this, '.van-notice-bar__wrap'),
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

          const { speed, scroll, delay } = this.data;

          if ((scroll === 'auto' && wrapRect.width < contentRect.width) || scroll === 'on') {
            this.setData({ scrollable: true })

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
          } else {
            this.setData({ scrollable: false })
          }
        });
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

    onClick(event: WechatMiniprogram.TouchEvent) {
      this.$emit('click', event);
    },
  },
});
