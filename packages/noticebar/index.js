const VALID_MODE = ['closeable'];
const FONT_COLOR = '#f60';
const BG_COLOR = '#fff7cc';

Component({
  properties: {
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

  attached() {
    const { mode } = this.data;
    if (mode && this._checkMode(mode)) {
      this.setData({
        hasRightIcon: true
      });
    }
  },

  detached() {
    const { timer } = this.data;
    timer && clearTimeout(timer);
  },

  ready() {
    this._init();
  },

  methods: {
    _checkMode(val) {
      const isValidMode = ~VALID_MODE.indexOf(val);
      if (!isValidMode) {
        console.warn(`mode only accept value of ${VALID_MODE}, now get ${val}.`);
      }
      return isValidMode;
    },

    _init() {
      wx.createSelectorQuery()
      .in(this)
      .select('.zan-noticebar__content')
      .boundingClientRect(rect => {
        if (!rect || !rect.width) {
          throw new Error('页面缺少 noticebar 元素');
          return;
        }
        this.setData({
          width: rect.width
        });

        wx.createSelectorQuery()
          .in(this)
          .select('.zan-noticebar__content-wrap')
          .boundingClientRect((rect) => {
            if (!rect || !rect.width) {
              return;
            }

            const wrapWidth = rect.width;
            const { width, speed, scrollable, delay } = this.data;

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
                this._scroll();
              });
            }
          })
          .exec();
      })
      .exec();
    },

    _scroll() {
      const { animation, resetAnimation, wrapWidth, elapse, speed } = this.data;
      const resetAnimationData = resetAnimation.translateX(wrapWidth).step();
      const animationData = animation.translateX(-elapse * speed / 1000).step();
      this.setData({
        animationData: resetAnimation.export()
      });
      setTimeout(() => {
        this.setData({
          animationData: animationData.export()
        })
      }, 100);

      const timer = setTimeout(() => {
        this._scroll();
      }, elapse);

      this.setData({
        timer
      });
    },

    _handleButtonClick() {
      const { timer } = this.data;
      timer && clearTimeout(timer);
      this.setData({
        show: false,
        timer: null
      });
    }
  }
})
