import { VantComponent } from '../common/component';

const ROOT_ELEMENT = '.van-sticky';

VantComponent({
  props: {
    zIndex: {
      type: Number,
      value: 99
    },
    offsetTop: {
      type: Number,
      value: 0,
      observer: 'observeContent'
    },
    disabled: {
      type: Boolean,
      observer(value) {
        if (!this.mounted) {
          return;
        }
        value ? this.disconnectObserver() : this.initObserver();
      }
    },
    container: {
      type: null,
      observer(target: () => WechatMiniprogram.NodesRef) {
        if (typeof target !== 'function' || !this.data.height) {
          return;
        }

        this.observeContainer();
      }
    }
  },

  data: {
    height: 0,
    fixed: false
  },

  methods: {
    getContainerRect() {
      const nodesRef: WechatMiniprogram.NodesRef = this.data.container();

      return new Promise(resolve =>
        nodesRef.boundingClientRect(resolve).exec()
      );
    },

    initObserver() {
      this.disconnectObserver();

      this.getRect(ROOT_ELEMENT).then(
        (rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
          this.setData({ height: rect.height });

          wx.nextTick(() => {
            this.observeContent();
            this.observeContainer();
          });
        }
      );
    },

    disconnectObserver(observerName?: string) {
      if (observerName) {
        const observer: WechatMiniprogram.IntersectionObserver = this[
          observerName
        ];
        observer && observer.disconnect();
      } else {
        this.contentObserver && this.contentObserver.disconnect();
        this.containerObserver && this.containerObserver.disconnect();
      }
    },

    observeContent() {
      const { offsetTop } = this.data;

      this.disconnectObserver('contentObserver');
      const contentObserver = this.createIntersectionObserver({
        thresholds: [0.9, 1]
      });
      contentObserver.relativeToViewport({ top: -offsetTop });
      contentObserver.observe(ROOT_ELEMENT, res => {
        if (this.data.disabled) {
          return;
        }

        this.setFixed(res.boundingClientRect.top);
      });

      this.contentObserver = contentObserver;
    },

    observeContainer() {
      if (typeof this.data.container !== 'function') {
        return;
      }

      const { height } = this.data;

      this.getContainerRect().then(
        (rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
          this.containerHeight = rect.height;

          this.disconnectObserver('containerObserver');
          const containerObserver = this.createIntersectionObserver({
            thresholds: [0.9, 1]
          });
          this.containerObserver = containerObserver;
          containerObserver.relativeToViewport({
            top: this.containerHeight - height
          });
          containerObserver.observe(ROOT_ELEMENT, res => {
            if (this.data.disabled) {
              return;
            }

            this.setFixed(res.boundingClientRect.top);
          });
        }
      );
    },

    setFixed(top) {
      const { offsetTop, height } = this.data;
      const { containerHeight } = this;

      const fixed =
        containerHeight && height
          ? top >= height - containerHeight && top < offsetTop
          : top < offsetTop;

      this.$emit('scroll', {
        scrollTop: top,
        isFixed: fixed
      });

      this.setData({ fixed });
    }
  },

  mounted() {
    this.mounted = true;

    if (!this.data.disabled) {
      this.initObserver();
    }
  },

  destroyed() {
    this.disconnectObserver();
  }
});
