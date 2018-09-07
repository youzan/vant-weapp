import { create } from '../common/create';

const ITEM_HEIGHT = 44;

create({
  props: {
    items: {
      type: Array,
      observer() {
        this.updateSubItems();
        this.updateMainHeight();
      }
    },
    mainActiveIndex: {
      type: Number,
      value: 0,
      observer: 'updateSubItems'
    },
    activeId: {
      type: Number,
      value: 0
    },
    maxHeight: {
      type: Number,
      value: 300,
      observer() {
        this.updateItemHeight();
        this.updateMainHeight();
      }
    }
  },

  data: {
    subItems: [],
    mainHeight: 0,
    itemHeight: 0
  },

  methods: {
    // 当一个子项被选择时
    onSelectItem(event) {
      this.$emit('click-item', event.currentTarget.dataset.item);
    },

    // 当一个导航被点击时
    onClickNav(event) {
      const { index } = event.currentTarget.dataset;
      this.$emit('click-nav', { index });
    },

    // 更新子项列表
    updateSubItems() {
      const selectedItem = this.data.items[this.data.mainActiveIndex] || {};

      this.setData({ subItems: selectedItem.children || [] });

      this.updateItemHeight();
    },

    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight() {
      const maxHeight = Math.max(this.data.items.length * ITEM_HEIGHT, this.data.subItems.length * ITEM_HEIGHT);

      this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
    },

    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight() {
      this.setData({ itemHeight: Math.min(this.data.subItems.length * ITEM_HEIGHT, this.data.maxHeight) });
    }
  }
});
