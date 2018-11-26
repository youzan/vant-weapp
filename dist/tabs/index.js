import { VantComponent } from '../common/component';
VantComponent({
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
    lineWidth: {
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
      value: 0.2
    },
    zIndex: {
      type: Number,
      value: 1
    },
    swipeThreshold: {
      type: Number,
      value: 4
    }
  },
  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0,
    scrollable: false
  },
  watch: {
    swipeThreshold: function swipeThreshold() {
      this.setData({
        scrollable: this.child.length > this.data.swipeThreshold
      });
    },
    color: 'setLine',
    lineWidth: 'setLine',
    active: 'setActiveTab'
  },
  beforeCreate: function beforeCreate() {
    this.child = [];
  },
  mounted: function mounted() {
    this.setLine();
    this.scrollIntoView();
  },
  methods: {
    updateTabs: function updateTabs(tabs) {
      tabs = tabs || this.data.tabs;
      this.setData({
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
        this.setData({
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
          lineWidth = _this$data.lineWidth;
      this.getRect('.van-tab', true).then(function (rects) {
        var rect = rects[active];
        var width = lineWidth !== -1 ? lineWidth : rect.width / 2;
        var left = rects.slice(0, active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        left += (rect.width - width) / 2;

        _this.setData({
          lineStyle: "\n            width: " + width + "px;\n            background-color: " + color + ";\n            -webkit-transform: translateX(" + left + "px);\n            -webkit-transition-duration: " + duration + "s;\n            transform: translateX(" + left + "px);\n            transition-duration: " + duration + "s;\n          "
        });
      });
    },
    setActiveTab: function setActiveTab() {
      var _this2 = this;

      this.child.forEach(function (item, index) {
        var data = {
          active: index === _this2.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.data.active) {
          item.setData(data);
        }
      });
      this.setData({}, function () {
        _this2.setLine();

        _this2.scrollIntoView();
      });
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView() {
      var _this3 = this;

      if (!this.data.scrollable) {
        return;
      }

      this.getRect('.van-tab', true).then(function (tabRects) {
        var tabRect = tabRects[_this3.data.active];
        var offsetLeft = tabRects.slice(0, _this3.data.active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        var tabWidth = tabRect.width;

        _this3.getRect('.van-tabs__nav').then(function (navRect) {
          var navWidth = navRect.width;

          _this3.setData({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    }
  }
});