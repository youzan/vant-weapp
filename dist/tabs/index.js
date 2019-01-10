import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
VantComponent({
  mixins: [touch],
  relation: {
    name: 'tab',
    type: 'descendant',
    linked: function linked(child) {
      this.child.push(child);
      this.updateTabs(this.data.tabs.concat(child.data));
    },
    unlinked: function unlinked(child) {
      var index = this.child.indexOf(child);
      var tabs = this.data.tabs;
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
    swipeThreshold: function swipeThreshold() {
      this.set({
        scrollable: this.child.length > this.data.swipeThreshold
      });
    },
    color: 'setLine',
    lineWidth: 'setLine',
    lineHeight: 'setLine',
    active: 'setActiveTab',
    animated: 'setTrack',
    offsetTop: 'setWrapStyle'
  },
  beforeCreate: function beforeCreate() {
    this.child = [];
  },
  mounted: function mounted() {
    this.setLine();
    this.setTrack();
    this.scrollIntoView();
    this.observerTabScroll();
    this.observerContentScroll();
  },
  destroyed: function destroyed() {
    wx.createIntersectionObserver(this).disconnect();
  },
  methods: {
    updateTabs: function updateTabs(tabs) {
      tabs = tabs || this.data.tabs;
      this.set({
        tabs: tabs,
        scrollable: tabs.length > this.data.swipeThreshold
      });
      this.setActiveTab();
    },
    trigger: function trigger(eventName, index) {
      this.$emit(eventName, {
        index: index,
        title: this.data.tabs[index].title
      });
    },
    onTap: function onTap(event) {
      var index = event.currentTarget.dataset.index;

      if (this.data.tabs[index].disabled) {
        this.trigger('disabled', index);
      } else {
        this.trigger('click', index);
        this.setActive(index);
      }
    },
    setActive: function setActive(active) {
      if (active !== this.data.active) {
        this.trigger('change', active);
        this.set({
          active: active
        });
        this.setActiveTab();
      }
    },
    setLine: function setLine() {
      var _this = this;

      if (this.data.type !== 'line') {
        return;
      }

      var _this$data = this.data,
          color = _this$data.color,
          active = _this$data.active,
          duration = _this$data.duration,
          lineWidth = _this$data.lineWidth,
          lineHeight = _this$data.lineHeight;
      this.getRect('.van-tab', true).then(function (rects) {
        var rect = rects[active];
        var width = lineWidth !== -1 ? lineWidth : rect.width / 2;
        var height = lineHeight !== -1 ? "height: " + lineHeight + "px;" : '';
        var left = rects.slice(0, active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        left += (rect.width - width) / 2;

        _this.set({
          lineStyle: "\n            " + height + "\n            width: " + width + "px;\n            background-color: " + color + ";\n            -webkit-transform: translateX(" + left + "px);\n            -webkit-transition-duration: " + duration + "s;\n            transform: translateX(" + left + "px);\n            transition-duration: " + duration + "s;\n          "
        });
      });
    },
    setTrack: function setTrack() {
      var _this2 = this;

      var _this$data2 = this.data,
          animated = _this$data2.animated,
          active = _this$data2.active,
          duration = _this$data2.duration;
      if (!animated) return '';
      this.getRect('.van-tabs__content').then(function (rect) {
        var width = rect.width;

        _this2.set({
          trackStyle: "\n            width: " + width * _this2.child.length + "px;\n            left: " + -1 * active * width + "px;\n            transition: left " + duration + "s;\n            display: flex;\n          "
        });

        _this2.setTabsProps({
          width: width,
          animated: animated
        });
      });
    },
    setTabsProps: function setTabsProps(props) {
      this.child.forEach(function (item) {
        item.set(props);
      });
    },
    setActiveTab: function setActiveTab() {
      var _this3 = this;

      this.child.forEach(function (item, index) {
        var data = {
          active: index === _this3.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.data.active) {
          item.set(data);
        }
      });
      this.set({}, function () {
        _this3.setLine();

        _this3.setTrack();

        _this3.scrollIntoView();
      });
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView() {
      var _this4 = this;

      if (!this.data.scrollable) {
        return;
      }

      this.getRect('.van-tab', true).then(function (tabRects) {
        var tabRect = tabRects[_this4.data.active];
        var offsetLeft = tabRects.slice(0, _this4.data.active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        var tabWidth = tabRect.width;

        _this4.getRect('.van-tabs__nav').then(function (navRect) {
          var navWidth = navRect.width;

          _this4.set({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.data.swipeable) return;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.data.swipeable) return;
      this.touchMove(event);
    },
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      if (!this.data.swipeable) return;
      var _this$data3 = this.data,
          active = _this$data3.active,
          tabs = _this$data3.tabs;
      var direction = this.direction,
          deltaX = this.deltaX,
          offsetX = this.offsetX;
      var minSwipeDistance = 50;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && active !== 0) {
          this.setActive(active - 1);
        } else if (deltaX < 0 && active !== tabs.length - 1) {
          this.setActive(active + 1);
        }
      }
    },
    setWrapStyle: function setWrapStyle() {
      var _this$data4 = this.data,
          offsetTop = _this$data4.offsetTop,
          position = _this$data4.position;
      var wrapStyle;

      switch (position) {
        case 'top':
          wrapStyle = "\n            top: " + offsetTop + "px;\n            position: fixed;\n          ";
          break;

        case 'bottom':
          wrapStyle = "\n            top: auto;\n            bottom: 0;\n          ";
          break;

        default:
          wrapStyle = '';
      } // cut down `set`


      if (wrapStyle === this.data.wrapStyle) return;
      this.set({
        wrapStyle: wrapStyle
      });
    },
    observerTabScroll: function observerTabScroll() {
      var _this5 = this;

      if (!this.data.sticky) return;
      var offsetTop = this.data.offsetTop;
      wx.createIntersectionObserver(this, {
        thresholds: [1]
      }).relativeToViewport().observe('.van-tabs', function (result) {
        var top = result.boundingClientRect.top;
        var position = '';

        if (offsetTop > top) {
          position = 'top';
        }

        _this5.$emit('scroll', {
          scrollTop: top + offsetTop,
          isFixed: position === 'top'
        });

        _this5.setPosition(position);
      });
    },
    observerContentScroll: function observerContentScroll() {
      var _this6 = this;

      if (!this.data.sticky) return;
      var offsetTop = this.data.offsetTop;
      wx.createIntersectionObserver(this).relativeToViewport().observe('.van-tabs__content', function (result) {
        var top = result.boundingClientRect.top;
        var position = '';

        if (result.intersectionRatio <= 0) {
          position = 'bottom';
        } else if (offsetTop > top) {
          position = 'top';
        }

        _this6.setPosition(position);
      });
    },
    setPosition: function setPosition(position) {
      var _this7 = this;

      if (position !== this.data.position) {
        this.set({
          position: position
        }, function () {
          _this7.setWrapStyle();
        });
      }
    }
  }
});