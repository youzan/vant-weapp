import { VantComponent } from '../common/component';

type TabItemData = {
  active: boolean;
  inited?: boolean;
  animated?: boolean;
  width?: Number;
};

VantComponent({
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
    animated: Boolean
  },

  data: {
    tabs: [],
    lineStyle: '',
    scrollLeft: 0,
    scrollable: false,
    trackStyle: ''
  },

  watch: {
    swipeThreshold() {
      this.setData({
        scrollable: this.child.length > this.data.swipeThreshold
      });
    },
    color: 'setLine',
    lineWidth: 'setLine',
    active: 'setActiveTab',
    animated: 'setTrack'
  },

  beforeCreate() {
    this.child = [];
  },

  mounted() {
    this.setLine();
    this.setTrack();
    this.scrollIntoView();
  },

  methods: {
    updateTabs(tabs) {
      tabs = tabs || this.data.tabs;
      this.setData({
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
        this.setData({ active });
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
        lineWidth
      } = this.data;

      this.getRect('.van-tab', true).then(rects => {
        const rect = rects[active];
        const width = (lineWidth !== -1) ? lineWidth : rect.width / 2;

        let left = rects
          .slice(0, active)
          .reduce((prev, curr) => prev + curr.width, 0);

        left += (rect.width - width) / 2;

        this.setData({
          lineStyle: `
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

        this.setData({
          trackStyle: `
            width: ${width * this.child.length}px;
            transform: translateX(${-1 * active * width}px);
            transition-duration: ${duration}s;
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
        item.setData(props);
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
          item.setData(data);
        }
      });

      this.setData({}, () => {
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
          this.setData({
            scrollLeft: offsetLeft - (navWidth - tabWidth) / 2
          });
        });
      });
    }
  }
});
