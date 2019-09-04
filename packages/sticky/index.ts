import { VantComponent } from '../common/component';

type Position = 'top' | 'bottom' | '';

VantComponent({
  props: {
    zIndex: {
      type: Number,
      value: 1
    },
    offsetTop: {
      type: Number,
      value: 0
    }
  },
  data: {
    position: '', // 当前定位
    height: 0,
    containerClass: '',
    wrapStyle: '',
    containerStyle: ''
  },
  methods: {
    setWrapStyle() {
      const { offsetTop, position } = this.data as {
        offsetTop: number
        position: Position
      };
      let wrapStyle: string;
      let containerStyle: string;

      switch (position) {
        case 'top':
          wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
          containerStyle = `height: ${this.itemHeight}px;`;
          break;
        case 'bottom':
          wrapStyle = `
            top: auto;
            bottom: 0;
          `;
          containerStyle = '';
          break;
        default:
          wrapStyle = '';
          containerStyle = '';
      }

      // cut down `set`x
      if (wrapStyle !== this.data.wrapStyle) this.set({ wrapStyle });
      if (containerStyle !== this.data.containerStyle) this.set({ containerStyle });
    },

    setPosition(position: Position) {
      if (position !== this.data.position) {
        this.set({ position }).then(() => {
          this.setWrapStyle();
        });
      }
    },

    observerContentScroll() {
      const { offsetTop = 0, child = '', containerClass } = this.data;
      const { windowHeight } = wx.getSystemInfoSync();

      // @ts-ignore
      this.createIntersectionObserver().disconnect();

      // @ts-ignore
      this.createIntersectionObserver()
        .relativeToViewport({ top: - (this.itemHeight + offsetTop) })
        .observe(`.${containerClass}`, (res: WechatMiniprogram.ObserveCallbackResult) => {
          const { top } = res.boundingClientRect;

          if (top > offsetTop) {
            return;
          }

          const position: Position = 'top';

          this.$emit('scroll', {
            scrollTop: top + offsetTop,
            isFixed: position === 'top'
          });

          this.setPosition(position);
        });

      // @ts-ignore
      this.createIntersectionObserver()
        .relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) })
        .observe(`.${containerClass}`, (res: WechatMiniprogram.ObserveCallbackResult) => {
          const { top, bottom } = res.boundingClientRect;

          if (bottom <= this.itemHeight - 1) {
            return;
          }

          const position: Position = res.intersectionRatio > 0 ? 'top' : '';

          this.$emit('scroll', {
            scrollTop: top + offsetTop,
            isFixed: position === 'top'
          });

          this.setPosition(position);
        });
    }
  },
  mounted() {
    const containerClass = `van-sticky-${Math.random().toString().slice(-6)}`;
    this.set({
      containerClass  
    }).then(() => {
      this.getRect(`.${containerClass}`).then(
        (rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
          this.itemHeight = rect.height;
          this.itemTop = rect.top;
          this.observerContentScroll();
        }
      );
    });
  },
  destroyed() {
    // @ts-ignore
    this.createIntersectionObserver().disconnect();
  }
});
