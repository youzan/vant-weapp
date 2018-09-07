import { create } from '../common/create';

create({
  relations: {
    '../tab/index': {
      type: 'descendant',

      linked(target) {
        const { tabs } = this.data;
        tabs.push({
          instance: target,
          data: target.data
        });
        this.setData({
          tabs,
          scrollable: tabs.length > this.data.swipeThreshold
        });
        this.setActiveTab();
      },

      unlinked(target) {
        const tabs = this.data.tabs.filter(item => item.instance !== target);
        this.setData({
          tabs,
          scrollable: tabs.length > this.data.swipeThreshold
        });
        this.setActiveTab();
      }
    }
  },

  props: {
    color: {
      type: String,
      observer: 'setLine'
    },
    lineWidth: {
      type: Number,
      observer: 'setLine'
    },
    active: {
      type: null,
      value: 0
    },
    type: {
      type: String,
      value: 'line'
    },
    duration: {
      type: Number,
      value: 0.2
    },
    swipeThreshold: {
      type: Number,
      value: 4,
      observer() {
        this.setData({
          scrollable: this.data.tabs.length > this.data.swipeThreshold
        });
      }
    }
  },

  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0
  },

  ready() {
    this.setLine();
    this.scrollIntoView();
  },

  methods: {
    trigger(eventName, index) {
      this.$emit(eventName, {
        index,
        title: this.data.tabs[index].data.title
      });
    },

    onTap(event) {
      const { index } = event.currentTarget.dataset;
      if (this.data.tabs[index].data.disabled) {
        this.trigger('disabled', index);
      } else {
        this.trigger('click', index);
        this.setActive(index);
      }
    },

    setActive(active) {
      if (active !== this.data.active) {
        this.trigger('change', active);
        this.setData({ active });
        this.setActiveTab();
        this.setLine();
        this.scrollIntoView();
      }
    },

    setLine() {
      if (this.data.type !== 'line') {
        return;
      }

      this.getRect('.van-tab', true).then(rects => {
        const rect = rects[this.data.active];
        const width = this.data.lineWidth || rect.width;
        let left = rects
          .slice(0, this.data.active)
          .reduce((prev, curr) => prev + curr.width, 0);
        left += (rect.width - width) / 2;

        this.setData({
          lineStyle: `
            width: ${width}px;
            background-color: ${this.data.color};
            transform: translateX(${left}px);
            transition-duration: ${this.data.duration}s;
          `
        });
      });
    },

    setActiveTab() {
      this.data.tabs.forEach((item, index) => {
        const data = {
          active: index === this.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.instance.data.active) {
          item.instance.setData(data);
        }
      });
    },

    // scroll active tab into view
    scrollIntoView(immediate) {
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
          this.setData({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    }
  }
});
