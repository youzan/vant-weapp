import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';

type TabItemData = {
  width?: number;
  active: boolean;
  inited?: boolean;
  animated?: boolean;
};

VantComponent({
  mixins: [touch],

  relation: {
    name: 'tab',
    type: 'descendant',
    linked(child: Weapp.Component) {
      this.child.push(child);
      this.updateTabs(this.data.tabs.concat(child.data));
    },
    unlinked(child: Weapp.Component) {
      const index = this.child.indexOf(child);
      const { tabs } = this.data;
      tabs.splice(index, 1);
      this.child.splice(index, 1);
      this.updateTabs(tabs);
    }
  },

  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lineWidth: {
      type: Number,
      value: -1
    },
    lineHeight: {
      type: Number,
      value: -1
    },
    active: {
      type: Number,
      value: 0
    },
    type: {
      type: String,
      value: 'line'
    },
    border: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 0.3
    },
    zIndex: {
      type: Number,
      value: 1
    },
    swipeThreshold: {
      type: Number,
      value: 4
    },
    offsetTop: {
      type: Number,
      value: 0
    },
    scrollTop: {
      type: Number,
      value: 0
    }
  },

  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0,
    scrollable: false,
    trackStyle: '',
    wrapStyle: '',
    position: ''
  },

  watch: {
    swipeThreshold() {
      this.set({
        scrollable: this.child.length > this.data.swipeThreshold
      });
    },
    color: 'setLine',
    lineWidth: 'setLine',
    lineHeight: 'setLine',
    active: 'setActiveTab',
    animated: 'setTrack',
    scrollTop: 'onScroll',
    offsetTop: 'setWrapStyle'
  },

  beforeCreate() {
    this.child = [];
  },

  mounted() {
    this.setLine();
    this.setTrack();
    this.scrollIntoView();
  },

  destroyed() {
    wx.createIntersectionObserver(this).disconnect();
  },

  methods: {
    updateTabs(tabs) {
      tabs = tabs || this.data.tabs;
      this.set({
        tabs,
        scrollable: tabs.length > this.data.swipeThreshold
      });
      this.setActiveTab();
    },

    trigger(eventName: string, index: number) {
      this.$emit(eventName, {
        index,
        title: this.data.tabs[index].title
      });
    },

    onTap(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      if (this.data.tabs[index].disabled) {
        this.trigger('disabled', index);
      } else {
        this.trigger('click', index);
        this.setActive(index);
      }
    },

    setActive(active: number) {
      if (active !== this.data.active) {
        this.trigger('change', active);
        this.set({ active });
        this.setActiveTab();
      }
    },

    setLine() {
      if (this.data.type !== 'line') {
        return;
      }

      const {
        color,
        active,
        duration,
        lineWidth,
        lineHeight
      } = this.data;

      this.getRect('.van-tab', true).then(rects => {
        const rect = rects[active];
        const width = (lineWidth !== -1) ? lineWidth : rect.width / 2;
        const height = lineHeight !== -1 ? `height: ${lineHeight}px;` : '';

        let left = rects
          .slice(0, active)
          .reduce((prev, curr) => prev + curr.width, 0);

        left += (rect.width - width) / 2;

        this.set({
          lineStyle: `
            ${height}
            width: ${width}px;
            background-color: ${color};
            -webkit-transform: translateX(${left}px);
            -webkit-transition-duration: ${duration}s;
            transform: translateX(${left}px);
            transition-duration: ${duration}s;
          `
        });
      });
    },

    setTrack() {
      const {
        animated,
        active,
        duration
      } = this.data;

      if (!animated) return '';

      this.getRect('.van-tabs__content').then(rect => {
        const { width } = rect;

        this.set({
          trackStyle: `
            width: ${width * this.child.length}px;
            left: ${-1 * active * width}px;
            transition: left ${duration}s;
            display: flex;
          `
        });
        this.setTabsProps({
          width,
          animated
        })
      })
    },

    setTabsProps(props) {
      this.child.forEach(item => {
        item.set(props);
      });
    },

    setActiveTab() {
      this.child.forEach((item, index) => {
        const data: TabItemData = {
          active: index === this.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.data.active) {
          item.set(data);
        }
      });

      this.set({}, () => {
        this.setLine();
        this.setTrack();
        this.scrollIntoView();
      });
    },

    // scroll active tab into view
    scrollIntoView() {
      if (!this.data.scrollable) {
        return;
      }

      this.getRect('.van-tab', true).then(tabRects => {
        const tabRect = tabRects[this.data.active];
        const offsetLeft = tabRects
          .slice(0, this.data.active)
          .reduce((prev, curr) => prev + curr.width, 0);
        const tabWidth = tabRect.width;

        this.getRect('.van-tabs__nav').then(navRect => {
          const navWidth = navRect.width;
          this.set({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    },

    onTouchStart(event: Weapp.TouchEvent) {
      if (!this.data.swipeable) return;

      this.touchStart(event);
    },

    onTouchMove(event: Weapp.TouchEvent) {
      if (!this.data.swipeable) return;

      this.touchMove(event);
    },

    // watch swipe touch end
    onTouchEnd() {
      if (!this.data.swipeable) return;

      const { active, tabs } = this.data;

      const { direction, deltaX, offsetX } = this;
      const minSwipeDistance = 50;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && active !== 0) {
          this.setActive(active - 1);
        } else if (deltaX < 0 && active !== tabs.length - 1) {
          this.setActive(active + 1);
        }
      }
    },

    setWrapStyle() {
      const { offsetTop, position } = this.data;
      let wrapStyle;

      switch (position) {
        case 'top':
          wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
          break;
        case 'bottom':
          wrapStyle = `
            top: auto;
            bottom: 0;
          `;
          break;
        default:
          wrapStyle = '';
      }

      // cut down `set`
      if (wrapStyle === this.data.wrapStyle) return;

      this.set({
        wrapStyle
      });
    },

    // adjust tab position
    onScroll(scrollTop) {
      if (!this.data.sticky) return;

      const { offsetTop } = this.data;

      this.getRect('.van-tabs').then(rect => {
        const { top, height } = rect;

        this.getRect('.van-tabs__wrap').then(rect => {
          const { height: wrapHeight } = rect;
          let position = '';

          if (offsetTop > top + height - wrapHeight) {
            position = 'bottom';
          } else if (offsetTop > top) {
            position = 'top';
          }

          this.$emit('scroll', {
            scrollTop: scrollTop + offsetTop,
            isFixed: position === 'top'
          });

          if (position !== this.data.position) {
            this.set({
              position
            }, () => {
              this.setWrapStyle();
            });
          }
        });
      });
    }
  }
});
