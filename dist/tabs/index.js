import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { getAllRect, getRect, isDef } from '../common/utils';
VantComponent({
  mixins: [touch],
  classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
  relation: {
    name: 'tab',
    type: 'descendant',
    current: 'tabs',
    linked(target) {
      target.index = this.children.length - 1;
      this.updateTabs();
    },
    unlinked() {
      this.children = this.children.map((child, index) => {
        child.index = index;
        return child;
      });
      this.updateTabs();
    },
  },
  props: {
    sticky: Boolean,
    border: Boolean,
    swipeable: Boolean,
    titleActiveColor: String,
    titleInactiveColor: String,
    color: String,
    animated: {
      type: Boolean,
      observer() {
        this.children.forEach((child, index) =>
          child.updateRender(index === this.data.currentIndex, this)
        );
      },
    },
    lineWidth: {
      type: [String, Number],
      value: 40,
      observer: 'setLine',
    },
    lineHeight: {
      type: [String, Number],
      value: -1,
    },
    active: {
      type: [String, Number],
      value: 0,
      observer(name) {
        if (name !== this.getCurrentName()) {
          this.setCurrentIndexByName(name);
        }
      },
    },
    type: {
      type: String,
      value: 'line',
    },
    ellipsis: {
      type: Boolean,
      value: true,
    },
    duration: {
      type: Number,
      value: 0.3,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    swipeThreshold: {
      type: Number,
      value: 5,
      observer(value) {
        this.setData({
          scrollable: this.children.length > value || !this.data.ellipsis,
        });
      },
    },
    offsetTop: {
      type: Number,
      value: 0,
    },
    lazyRender: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0,
    scrollable: false,
    trackStyle: '',
    currentIndex: 0,
    container: null,
    skipTransition: true,
    lineOffsetLeft: 0,
  },
  mounted() {
    wx.nextTick(() => {
      this.setLine(true);
      this.scrollIntoView();
    });
  },
  methods: {
    updateContainer() {
      this.setData({
        container: () => this.createSelectorQuery().select('.van-tabs'),
      });
    },
    updateTabs() {
      const { children = [], data } = this;
      this.setData({
        tabs: children.map((child) => child.data),
        scrollable:
          this.children.length > data.swipeThreshold || !data.ellipsis,
      });
      this.setCurrentIndexByName(this.getCurrentName() || data.active);
    },
    trigger(eventName, child) {
      const { currentIndex } = this.data;
      const currentChild = child || this.children[currentIndex];
      if (!isDef(currentChild)) {
        return;
      }
      this.$emit(eventName, {
        index: currentChild.index,
        name: currentChild.getComputedName(),
        title: currentChild.data.title,
      });
    },
    onTap(event) {
      const { index } = event.currentTarget.dataset;
      const child = this.children[index];
      if (child.data.disabled) {
        this.trigger('disabled', child);
      } else {
        this.setCurrentIndex(index);
        wx.nextTick(() => {
          this.trigger('click');
        });
      }
    },
    // correct the index of active tab
    setCurrentIndexByName(name) {
      const { children = [] } = this;
      const matched = children.filter(
        (child) => child.getComputedName() === name
      );
      if (matched.length) {
        this.setCurrentIndex(matched[0].index);
      }
    },
    setCurrentIndex(currentIndex) {
      const { data, children = [] } = this;
      if (
        !isDef(currentIndex) ||
        currentIndex >= children.length ||
        currentIndex < 0
      ) {
        return;
      }
      children.forEach((item, index) => {
        const active = index === currentIndex;
        if (active !== item.data.active || !item.inited) {
          item.updateRender(active, this);
        }
      });
      if (currentIndex === data.currentIndex) {
        return;
      }
      const shouldEmitChange = data.currentIndex !== null;
      this.setData({ currentIndex });
      wx.nextTick(() => {
        this.setLine();
        this.scrollIntoView();
        this.updateContainer();
        this.trigger('input');
        if (shouldEmitChange) {
          this.trigger('change');
        }
      });
    },
    getCurrentName() {
      const activeTab = this.children[this.data.currentIndex];
      if (activeTab) {
        return activeTab.getComputedName();
      }
    },
    setLine(skipTransition = false) {
      if (this.data.type !== 'line') {
        return;
      }
      const { currentIndex } = this.data;
      Promise.all([
        getAllRect.call(this, '.van-tab'),
        getRect.call(this, '.van-tabs__line'),
      ]).then(([rects = [], lineRect]) => {
        const rect = rects[currentIndex];
        if (rect == null) {
          return;
        }
        let lineOffsetLeft = rects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);
        lineOffsetLeft += (rect.width - lineRect.width) / 2;
        this.setData({
          lineOffsetLeft,
          skipTransition,
        });
      });
    },
    // scroll active tab into view
    scrollIntoView() {
      const { currentIndex, scrollable } = this.data;
      if (!scrollable) {
        return;
      }
      Promise.all([
        getAllRect.call(this, '.van-tab'),
        getRect.call(this, '.van-tabs__nav'),
      ]).then(([tabRects, navRect]) => {
        const tabRect = tabRects[currentIndex];
        const offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);
        this.setData({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
        });
      });
    },
    onTouchScroll(event) {
      this.$emit('scroll', event.detail);
    },
    onTouchStart(event) {
      if (!this.data.swipeable) return;
      this.touchStart(event);
    },
    onTouchMove(event) {
      if (!this.data.swipeable) return;
      this.touchMove(event);
    },
    // watch swipe touch end
    onTouchEnd() {
      if (!this.data.swipeable) return;
      const { direction, deltaX, offsetX } = this;
      const minSwipeDistance = 50;
      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        const index = this.getAvaiableTab(deltaX);
        if (index !== -1) {
          this.setCurrentIndex(index);
        }
      }
    },
    getAvaiableTab(direction) {
      const { tabs, currentIndex } = this.data;
      const step = direction > 0 ? -1 : 1;
      for (
        let i = step;
        currentIndex + i < tabs.length && currentIndex + i >= 0;
        i += step
      ) {
        const index = currentIndex + i;
        if (
          index >= 0 &&
          index < tabs.length &&
          tabs[index] &&
          !tabs[index].disabled
        ) {
          return index;
        }
      }
      return -1;
    },
  },
});
