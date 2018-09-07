import { create } from '../common/create';

const FONT_COLOR = '#f60';
const BG_COLOR = '#fff7cc';

create({
  props: {
    text: {
      type: String,
      value: '',
      observer() {
        this.setData({}, this.init);
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

  attached() {
    if (this.data.mode) {
      this.setData({
        hasRightIcon: true
      });
    }
  },

  detached() {
    const { timer } = this.data;
    timer && clearTimeout(timer);
  },

  methods: {
    init() {
      this.getRect('.van-notice-bar__content').then(rect => {
        if (!rect || !rect.width) {
          return;
        }
        this.setData({
          width: rect.width
        });

        this.getRect('.van-notice-bar__content-wrap').then(rect => {
          if (!rect || !rect.width) {
            return;
          }

          const wrapWidth = rect.width;
          const {
            width, speed, scrollable, delay
          } = this.data;

          if (scrollable && wrapWidth < width) {
            const elapse = width / speed * 1000;
            const animation = wx.createAnimation({
              duration: elapse,
              timeingFunction: 'linear',
              delay
            });
            const resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            });

            this.setData({
              elapse,
              wrapWidth,
              animation,
              resetAnimation
            }, () => {
              this.scroll();
            });
          }
        });
      });
    },

    scroll() {
      const {
        animation, resetAnimation, wrapWidth, elapse, speed
      } = this.data;
      resetAnimation.translateX(wrapWidth).step();
      const animationData = animation.translateX(-(elapse * speed) / 1000).step();
      this.setData({
        animationData: resetAnimation.export()
      });
      setTimeout(() => {
        this.setData({
          animationData: animationData.export()
        });
      }, 100);

      const timer = setTimeout(() => {
        this.scroll();
      }, elapse);

      this.setData({
        timer
      });
    },

    onClickIcon() {
      const { timer } = this.data;
      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
    },

    onClick(event) {
      this.$emit('click', event);
    }
  }
});
