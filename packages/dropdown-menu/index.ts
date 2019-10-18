import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

interface ToggleOptions {
  immediate?: Boolean;
}

VantComponent({
  field: true,

  relation: {
    name: 'dropdown-item',
    type: 'descendant',
    linked(target) {
      this.children = this.children || [];
      // 透传 props 给 dropdown-item
      const { overlay, duration, activeColor, closeOnClickOverlay, direction } = this.data;
      this.updateChildData(target, { overlay, duration, activeColor, closeOnClickOverlay, direction, childIndex: this.children.length });

      this.children.push(target);
      // 收集 dorpdown-item 的 data 挂在 data 上
      target && this.setData({ itemListData: this.data.itemListData.concat([target.data]) });
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
    }
  },

  data: {
    itemListData: [],
    toggleSourceIndex: -1
  },

  mounted() {
    setTimeout(() => {
      this.setData({ toggleSourceIndex: 1 });
    });
  },

  methods: {
    test() {
      console.log('---test----');
    },
    updateChildData(childItem: WechatMiniprogram.Component.TrivialInstance, newData, needRefreshList: Boolean = false) {
      childItem.setData(newData);

      if (needRefreshList) {
        // dropdown-item data 更新，涉及到 title 的展示，触发模板更新
        this.setData({ itemListData: this.data.itemListData });
      }
    },

    toggleItem(active: Number) {
      this.children.forEach((item: WechatMiniprogram.Component.TrivialInstance, index: Number) => {
        if (index === active) {
          this.toggleChildItem(item);
        } else if (item.showPopup) {
          this.toggleChildItem(item, false, { immediate: true });
        }
      });
    },

    toggleChildItem(childItem: WechatMiniprogram.Component.TrivialInstance, show: boolean, options: ToggleOptions = {}) {
      const { showPopup } = childItem.data;

      if (show === undefined) show = !showPopup;

      if (show === showPopup) {
        return;
      }

      const newChildData = { transition: !options.immediate, showPopup: show };

      if (!show) {
        this.updateChildData(childItem, newChildData, true);
        return;
      }

      this.getChildWrapperStyle().then((wrapperStyle: String = '') => {
        this.updateChildData(
          childItem,
          {
            ...newChildData,
            showWrapper: true,
            wrapperStyle
          },
          true
        );
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
      const { item, index } = event.currentTarget.dataset;
      if (!item.disabled) {
        this.toggleItem(index);
      }
    }
  }
});
