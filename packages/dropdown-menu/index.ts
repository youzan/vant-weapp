import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

interface ToggleOptions {
  immediate?: Boolean;
}

let ARRAY: WechatMiniprogram.Component.TrivialInstance[] = [];

VantComponent({
  field: true,

  relation: {
    name: 'dropdown-item',
    type: 'descendant',
    linked(target) {
      this.children = this.children || [];
      // 透传 props 给 dropdown-item
      const { overlay, duration, activeColor, closeOnClickOverlay, direction } = this.data;
      this.updateChildData(target, {
        overlay,
        duration,
        activeColor,
        closeOnClickOverlay,
        direction,
        childIndex: this.children.length
      });

      this.children.push(target);
      // 收集 dorpdown-item 的 data 挂在 data 上
      target &&
        this.setData({
          itemListData: this.data.itemListData.concat([target.data])
        });
    },
    unlinked(target) {
      this.children = this.children.filter((child: WechatMiniprogram.Component.TrivialInstance) => child !== target);
    }
  },

  props: {
    activeColor: String,
    overlay: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 10
    },
    duration: {
      type: Number,
      value: 200
    },
    direction: {
      type: String,
      value: 'down'
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOutside: {
      type: Boolean,
      value: true
    }
  },

  data: {
    itemListData: []
  },

  created() {
    ARRAY.push(this);
  },

  destroyed() {
    ARRAY = ARRAY.filter(item => item !== this);
  },

  methods: {
    updateChildData(childItem: WechatMiniprogram.Component.TrivialInstance, newData, needRefreshList: Boolean = false) {
      childItem.setData(newData);

      if (needRefreshList) {
        // dropdown-item data 更新，涉及到 title 的展示，触发模板更新
        this.setData({ itemListData: this.data.itemListData });
      }
    },

    toggleItem(active: Number) {
      this.children.forEach((item: WechatMiniprogram.Component.TrivialInstance, index: Number) => {
        const { showPopup } = item.data;
        if (index === active) {
          this.toggleChildItem(item);
        } else if (showPopup) {
          this.toggleChildItem(item, false, { immediate: true });
        }
      });
    },

    toggleChildItem(childItem: WechatMiniprogram.Component.TrivialInstance, show: boolean, options: ToggleOptions = {}) {
      const { showPopup, duration } = childItem.data;

      if (show === undefined) show = !showPopup;

      if (show === showPopup) {
        return;
      }

      const newChildData = { transition: !options.immediate, showPopup: show };

      if (!show) {
        const time = options.immediate ? 0 : duration;
        this.updateChildData(childItem, { ...newChildData }, true);

        setTimeout(() => {
          this.updateChildData(childItem, { showWrapper: false }, true);
        }, time);
        return;
      }

      this.getChildWrapperStyle().then((wrapperStyle: String = '') => {
        this.updateChildData(
          childItem,
          {
            ...newChildData,
            wrapperStyle,
            showWrapper: true
          },
          true
        );
      });
    },

    close() {
      this.children.forEach((item: WechatMiniprogram.Component.TrivialInstance) => {
        this.toggleChildItem(item, false, { immediate: true });
      });
    },

    getChildWrapperStyle() {
      const { windowHeight } = wx.getSystemInfoSync();
      const { zIndex, direction } = this.data;
      let offset = 0;

      return this.getRect('.van-dropdown-menu').then(rect => {
        const { top = 0, bottom = 0 } = rect;
        if (direction === 'down') {
          offset = bottom;
        } else {
          offset = windowHeight - top;
        }

        let wrapperStyle = `z-index: ${zIndex};`;

        if (direction === 'down') {
          wrapperStyle += `top: ${addUnit(offset)};`;
        } else {
          wrapperStyle += `bottom: ${addUnit(offset)};`;
        }

        return Promise.resolve(wrapperStyle);
      });
    },

    onTitleTap(event: Weapp.Event) {
      // item ---> dropdown-item
      const { item, index } = event.currentTarget.dataset;

      if (!item.disabled) {
        // menuItem ---> dropdown-menu
        ARRAY.forEach(menuItem => {
          if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== this) {
            menuItem.close();
          }
        });

        this.toggleItem(index);
      }
    }
  }
});
