import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;
let ARRAY: TrivialInstance[] = [];

VantComponent({
  field: true,

  relation: {
    name: 'dropdown-item',
    type: 'descendant',
    current: 'dropdown-menu',
    linked() {
      this.updateItemListData();
    },
    unlinked() {
      this.updateItemListData();
    }
  },

  props: {
    activeColor: {
      type: String,
      observer: 'updateChildrenData'
    },
    overlay: {
      type: Boolean,
      value: true,
      observer: 'updateChildrenData'
    },
    zIndex: {
      type: Number,
      value: 10
    },
    duration: {
      type: Number,
      value: 200,
      observer: 'updateChildrenData'
    },
    direction: {
      type: String,
      value: 'down',
      observer: 'updateChildrenData'
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
      observer: 'updateChildrenData'
    },
    closeOnClickOutside: {
      type: Boolean,
      value: true
    }
  },

  data: {
    itemListData: []
  },

  beforeCreate() {
    const { windowHeight } = wx.getSystemInfoSync();
    this.windowHeight = windowHeight;
    ARRAY.push(this);
  },

  destroyed() {
    ARRAY = ARRAY.filter(item => item !== this);
  },

  methods: {
    updateItemListData() {
      this.setData({
        itemListData: this.children.map((child: TrivialInstance) => child.data)
      });
    },

    updateChildrenData() {
      this.children.forEach((child: TrivialInstance) => {
        child.updateDataFromParent();
      });
    },

    toggleItem(active: number) {
      this.children.forEach((item: TrivialInstance, index: number) => {
        const { showPopup } = item.data;
        if (index === active) {
          item.toggle();
        } else if (showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    },

    close() {
      this.children.forEach((child: TrivialInstance) => {
        child.toggle(false, { immediate: true });
      });
    },

    getChildWrapperStyle() {
      const { zIndex, direction } = this.data;

      return this.getRect('.van-dropdown-menu').then(
        (rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
          const { top = 0, bottom = 0 } = rect;
          const offset = direction === 'down' ? bottom : this.windowHeight - top;

          let wrapperStyle = `z-index: ${zIndex};`;

          if (direction === 'down') {
            wrapperStyle += `top: ${addUnit(offset)};`;
          } else {
            wrapperStyle += `bottom: ${addUnit(offset)};`;
          }

          return wrapperStyle;
        }
      );
    },

    onTitleTap(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      const child = this.children[index];

      if (!child.data.disabled) {
        ARRAY.forEach(menuItem => {
          if (
            menuItem &&
            menuItem.data.closeOnClickOutside &&
            menuItem !== this
          ) {
            menuItem.close();
          }
        });

        this.toggleItem(index);
      }
    }
  }
});
